import BlogStructure from "@/components/blog/BlogStructure";
import { UserContext } from "@/components/context/UserContextProvider";
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { RiHeartAddLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import ScrollMotion from "@/components/motions/ScrollMotion";

const BlogPage = () => {
  const { axiosJWT } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const param = useParams();
  const [blog, setBlog] = useState({});
  const { profile: { profile_img, fullname, username }} = useSelector((state) => state.user.data);
  useEffect(() => {
    axiosJWT.get(`/v1/blogs/${param.blogId}`).then(({data}) => {
      setBlog(data);
    }).catch((error) => {
      console.log(error);
      toast.error(error);
    });
  }, [param.blogId]);

  const handleScroll = (event) => {
    event.preventDefault();
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  return (
    <>
      <ScrollMotion />
      <div className="max-w-screen-xl mx-auto flex my-4 gap-4 scroll-smooth">
        <div className="w-12 ml-2 flex flex-col items-center py-16 h-fit">
          <div className={`flex flex-col gap-8 ${isScrolled ? 'fixed' : ''}`}>
            <div className="flex flex-col items-center gap-1">
              <RiHeartAddLine className="w-6 h-6 cursor-pointer hover:text-red-600" />
              <span className="text-sm text-gray-600">{blog.reactions?.likes}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <FaRegComment className="w-5 h-5 cursor-pointer hover:text-yellow-600" />
              <span className="text-sm text-gray-600">{blog.reactions?.comments}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MdOutlineSaveAlt className="w-6 h-6 cursor-pointer hover:text-indigo-600" />
            </div>
          </div>
        </div>
        <div className="max-w-[830px] w-full bg-white flex flex-col rounded-md border border-gray-300 overflow-hidden">
          {
            blog ?
            <BlogStructure tags={blog.tags} cover_image={blog.cover_image} createdAt={blog.createdAt} title={blog.title} content={blog.content} profile_img={profile_img} fullname={fullname} username={username} />
            :
            <Navigate to={`/${username}`} />
          }
        </div>
        <div className="flex-1 bg-blue-400">Profile</div>
      </div>
    </>
  )
}

export default BlogPage
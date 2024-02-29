import BlogStructure from "@/components/blog/BlogStructure";
import { UserContext } from "@/components/context/UserContextProvider";
import { useContext, useEffect, useRef, useState } from "react"
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router-dom";
import { RiHeartAddLine } from "react-icons/ri";
import { FaRegComment } from "react-icons/fa";
import { MdOutlineSaveAlt } from "react-icons/md";
import ScrollMotion from "@/components/motions/ScrollMotion";
import UserCard from "@/components/cards/UserCard";

const BlogPage = () => {
  const { axiosJWT } = useContext(UserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const param = useParams();
  const [blog, setBlog] = useState({});
  const [author, setAuthor] = useState({});
  const [isOwner, setIsOwner] = useState(false);
  const subSectionRef = useRef();

  useEffect(() => {
    axiosJWT.get(`/v1/blogs/${param.username}/${param.blogId}`).then(({data}) => {
      const { blog: { author, ...blog}, isOwner } = data;
      setBlog(blog);
      setAuthor(author);
      setIsOwner(isOwner);
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
        <div className="w-12 mr-2 flex flex-col items-center py-16 h-fit">
          <div className={`flex flex-col gap-8 ${isScrolled ? 'fixed' : ''}`}>
            <div className="relative group flex flex-col items-center gap-1 cursor-pointer">
              <RiHeartAddLine className="w-6 h-6 cursor-pointer hover:text-red-600" />
              <span className="text-sm text-gray-600">{blog.reactions?.likes}</span>
              <div className="absolute z-10 origin-top duration-150 scale-0 transition-all opacity-85 top-12 bg-black text-white rounded-md text-sm text-center p-2 group-hover:scale-100">Add reactions</div>
            </div>
            <div className="group relative flex flex-col items-center gap-1 cursor-pointer">
              <FaRegComment className="w-5 h-5 cursor-pointer hover:text-yellow-600" />
              <span className="text-sm text-gray-600">{blog.reactions?.comments}</span>
              <div className="absolute z-10 origin-top duration-150 scale-0 transition-all opacity-85 top-12 bg-black text-white rounded-md text-sm text-center p-2 group-hover:scale-100">Add comments</div>
            </div>
            <div className="relative group flex flex-col items-center gap-1 cursor-pointer">
              <MdOutlineSaveAlt className="w-6 h-6 cursor-pointer hover:text-indigo-600" />
              <div className="absolute z-10 origin-top duration-150 scale-0 transition-all opacity-85 top-8 bg-black text-white rounded-md text-sm text-center p-2 group-hover:scale-100">Save</div>
            </div>
          </div>
        </div>
        <div className="max-w-[830px] w-full bg-white flex flex-col rounded-md border border-gray-200 overflow-hidden">
          {
            blog ?
            <BlogStructure tags={blog.tags} cover_image={blog.cover_image} createdAt={blog.createdAt} title={blog.title} content={blog.content} profile_img={author.profile?.profile_img} fullname={author.profile?.fullname} username={author.profile?.username} isOwner={isOwner}/>
            :
            <Navigate to={`/${author.username}`} />
          }
        </div>
        <div ref={subSectionRef} className="relative flex-1 flex flex-col">
          <div className={`fixed w-[362px]`}>
            <UserCard author={author} isOwner={isOwner}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default BlogPage
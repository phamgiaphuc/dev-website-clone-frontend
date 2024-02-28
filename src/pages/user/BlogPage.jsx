import BlogStructure from "@/components/blog/BlogStructure";
import { UserContext } from "@/components/context/UserContextProvider";
import { useContext, useEffect, useState } from "react"
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";

const BlogPage = () => {
  const { axiosJWT } = useContext(UserContext);
  const param = useParams();
  const [blog, setBlog] = useState({});
  const { profile: { profile_img, fullname, username }} = useSelector((state) => state.user.data);
  useEffect(() => {
    axiosJWT.get(`/v1/blogs/${param.blogId}`).then(({data}) => {
      setBlog(data);
      console.log(data);
    }).catch((error) => {
      console.log(error);
      toast.error(error);
    })
  }, [param.blogId]);
  return (
    <div className="max-w-screen-xl mx-auto flex my-4 gap-4">
      <div className="bg-slate-400 w-20">Reactions</div>
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
  )
}

export default BlogPage
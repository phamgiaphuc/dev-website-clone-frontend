import { UserContext } from "@/components/context/UserContextProvider";
import { useContext, useEffect, useState } from "react"
import DraftPostCard from "@/components/cards/DraftPostCard";
import PublishPostCard from "@/components/cards/PublishPostCard";
import { useSelector } from "react-redux";

const PostPage = () => {
  const [blogs, setBlogs] = useState();
  const { axiosJWT } = useContext(UserContext);
  const { profile: { username }} = useSelector((state) => state.user.data);

  useEffect(() => {
    axiosJWT.get(`/v1/blogs/dashboard?sort=desc`)
      .then(({data}) => {
        console.log(data);
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [])
  
  return (
    blogs ?
    <div className="flex flex-col gap-2">
      <div className="my-2 flex justify-between">
        <span className="text-xl font-semibold">Posts</span>
        <select className="p-2 rounded-md border border-gray-200">
          <option>Newest blogs</option>
          <option>Oldest blogs</option>
        </select>
      </div>
      {
        blogs.map((blog, index) => {
          if (blog.draft && !blog.publish) {
            return <DraftPostCard key={index} blog={blog} username={username}/>
          } else {
            return <PublishPostCard key={index} blog={blog} username={username}/>
          }
        })
      }
    </div>
    :
    <div className="flex items-center justify-center border text-lg border-gray-200 bg-white">
      You don&apos;t have any posts yet...
    </div>
  )
}

export default PostPage
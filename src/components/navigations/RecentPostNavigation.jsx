import { compareDate } from "@/common/formatDate";
import axios from "axios";
import { useEffect, useState } from "react"
import { Link } from "react-router-dom";

const RecentPostNavigation = () => {
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get('/v1/blogs/recent?publish=true&limit=5').then(({data}) => {
      setRecentBlogs(data);
    }).catch((error) => {
      console.log(error);
    });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [])

  return (
    <div className="flex flex-col h-fit bg-white rounded-md border border-gray-200 divide-y">
      <span className="p-4 text-xl font-semibold">Recent posts</span>
      {
        isLoading ? 
        Array(5).fill(0).map((_, index) => {
          return (
            <div key={index} className="flex flex-col gap-4 p-4 bg-white animate-pulse">
              <div className="h-2 w-full rounded-md bg-gray-400"></div>
              <div className="h-2 w-32 rounded-md bg-gray-400"></div>
            </div>
          )
        })
        :
        recentBlogs.map((blog) => {
          return (
            <Link to={`/${blog.author?.profile?.username}/${blog._id}`} key={blog._id} className="p-4 flex flex-col font-light group cursor-pointer gap-2">
              <span className="group-hover:text-indigo-600">{blog.title}</span>
              <div key={blog._id} className="flex items-center justify-between text-sm text-gray-600">
                <span>{blog.reactions?.likes.length} {blog.reactions?.likes.length > 1 ? 'comments' : 'comment'}</span>
                {
                  compareDate(blog.createdAt) && <div className="px-2 py-1 rounded-full text-white bg-indigo-600">New post</div>
                }
              </div>
            </Link>
          )
        })
      }
    </div>
  )
}

export default RecentPostNavigation
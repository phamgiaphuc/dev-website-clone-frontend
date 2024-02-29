import MainCard from "@/components/cards/MainCard";
import SubCard from "@/components/cards/SubCard";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get('/v1/blogs?sort=desc').then(({ data }) => {
      console.log(data);
      setBlogs(data);
    }).catch((error) => {
      console.log(error);
    });
  }, [])

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-[230px_auto_330px] my-4 gap-4 scroll-smooth">
      <div className="bg-blue-400">
        Navigation
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <button className={`flex gap-1 items-center py-2 px-4 rounded-md border border-gray-200 bg-white hover:border-gray-400 hover:underline hover:underline-offset-2 cursor-pointer`}>
            <BiSortDown className="w-6 h-6"/>
            Newest
          </button>
          <button className={`flex gap-1 items-center py-2 px-4 rounded-md border border-gray-200 bg-white hover:border-gray-400 hover:underline hover:underline-offset-2 cursor-pointer`}>
            <BiSortUp className="w-6 h-6"/>
            Oldest
          </button>
        </div>
        {
          blogs.map((blog, index) => {
            if (index === 0) {   
              return <MainCard key={blog._id} profile_img={blog.author?.profile?.profile_img} username={blog.author?.profile?.username} fullname={blog.author?.profile?.fullname} blog={blog}/>
            }
            return <SubCard key={blog._id} profile_img={blog.author?.profile?.profile_img} username={blog.author?.profile?.username} fullname={blog.author?.profile?.fullname} blog={blog} />
          })
        }
      </div>
      <div className="bg-blue-400">
        Notification
      </div>
    </div>
  )
}

export default HomePage
import axios from 'axios';
import { useEffect, useState } from 'react'
import { BiSortDown, BiSortUp } from 'react-icons/bi';
import MainSkeletonCard from '../cards/MainSkeletonCard';
import SubSkeletonCard from '../cards/SubSkeletonCard';
import PageTransformMotion from '../motions/PageTransformMotion';
import MainCard from '../cards/MainCard';
import SubCard from '../cards/SubCard';
import { MdError } from "react-icons/md";

const BlogsList = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [blogs, setBlogs] = useState();
  const [sort, setSort] = useState();

  useEffect(() => {
    axios.get(`/v1/blogs?publish=true&sort=${sort ? sort : 'desc'}`).then(({ data }) => {
      setBlogs(data);
    }).catch((error) => {
      console.log(error);
    });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [sort]);

  const descendingSort = () => {
    setSort('desc')
    setIsLoading(true);
  }

  const ascendingSort = () => {
    setSort('asc')
    setIsLoading(true);
  }

  return (
    blogs ?
    <div className="flex flex-col gap-2">
      <div className="flex gap-2 font-light">
        <button onClick={descendingSort} className={`flex gap-1 items-center py-2 px-4 rounded-md border border-gray-200 bg-white hover:border-gray-400 hover:underline hover:underline-offset-2 cursor-pointer ${sort === 'desc' ? 'font-semibold border-gray-600' : ''}`}>
          <BiSortDown className="w-6 h-6"/>
          Newest
        </button>
        <button onClick={ascendingSort} className={`flex gap-1 items-center py-2 px-4 rounded-md border border-gray-200 bg-white hover:border-gray-400 hover:underline hover:underline-offset-2 cursor-pointer ${sort === 'asc' ? 'font-semibold border-gray-600' : ''}`}>
          <BiSortUp className="w-6 h-6"/>
          Oldest
        </button>
      </div>
      {
        isLoading ?
        <>
          <MainSkeletonCard />
          <SubSkeletonCard />
        </>
        :
        <PageTransformMotion>
          <div className="flex flex-col gap-2">
            {
              blogs.map((blog, index) => {
                if (index === 0) {   
                  return <MainCard key={blog._id} profile_img={blog.author?.profile?.profile_img} username={blog.author?.profile?.username} fullname={blog.author?.profile?.fullname} blog={blog}/>
                }
                return <SubCard key={blog._id} profile_img={blog.author?.profile?.profile_img} username={blog.author?.profile?.username} fullname={blog.author?.profile?.fullname} blog={blog} />
              })
            }
          </div>
        </PageTransformMotion>
      }
    </div>
    :
    <div className='flex flex-col gap-2 font-light'>
      { !isLoading &&
        <div className="bg-white rounded-md border flex gap-2 border-gray-200 p-4 h-fit">
          <MdError className='w-6 h-6 fill-red-500' />
          <span>Server is reloading. Please reload the page after 10 or 15 seconds</span>
        </div>
      }
      <div className="bg-white rounded-md border border-gray-200 p-4 font-semibold text-xl h-fit">
        <span>No posts yet</span>
      </div>
    </div>
  )
}

export default BlogsList
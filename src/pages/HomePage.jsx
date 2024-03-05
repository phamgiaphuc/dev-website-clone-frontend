import MainCard from "@/components/cards/MainCard";
import MainSkeletonCard from "@/components/cards/MainSkeletonCard";
import SubCard from "@/components/cards/SubCard";
import SubSkeletonCard from "@/components/cards/SubSkeletonCard";
import PageTransformMotion from "@/components/motions/PageTransformMotion";
import AdsNavigation from "@/components/navigations/AdsNavigation";
import HomeNavigation from "@/components/navigations/HomeNavigation";
import RecentPostNavigation from "@/components/navigations/RecentPostNavigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { BiSortDown, BiSortUp } from "react-icons/bi";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [sort, setSort] = useState('');
  const [adsOpen, setAdsOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get(`/v1/blogs?publish=true&sort=${sort ? sort : 'desc'}`).then(({ data }) => {
      setBlogs(data);
    }).catch((error) => {
      console.log(error);
    });
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
    <div className="max-w-screen-xl mx-auto grid grid-cols-[240px_auto_330px] my-4 gap-4 scroll-smooth">
      <HomeNavigation />
      <div className="flex flex-col gap-2">
        {
          blogs.length > 0 ?
          <>
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
                {
                  Array(3).fill(0).map((_, index) => <SubSkeletonCard key={index} />)
                }
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
          </>
          :
          <div className="bg-white flex rounded-md border border-gray-200 p-4 font-semibold text-xl">
            <span>No posts yet</span>
          </div>
        }
      </div>
      <div className="flex flex-col gap-4">
        <RecentPostNavigation /> 
        { adsOpen && <AdsNavigation setAdsOpen={setAdsOpen}/> }
      </div>
    </div>
  )
}

export default HomePage
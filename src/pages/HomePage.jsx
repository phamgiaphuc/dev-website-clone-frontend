import BlogsList from "@/components/home/BlogList";
import AdsNavigation from "@/components/navigations/AdsNavigation";
import HomeNavigation from "@/components/navigations/HomeNavigation";
import RecentPostNavigation from "@/components/navigations/RecentPostNavigation";
import { useState } from "react";

const HomePage = () => {
  const [adsOpen, setAdsOpen] = useState(true);

  return (
    <div className="max-w-screen-xl mx-auto grid grid-cols-[240px_auto_330px] my-4 gap-4 scroll-smooth">
      <HomeNavigation />
      <BlogsList />
      <div className="flex flex-col gap-4">
        <RecentPostNavigation /> 
        { adsOpen && <AdsNavigation setAdsOpen={setAdsOpen}/> }
      </div>
    </div>
  )
}

export default HomePage
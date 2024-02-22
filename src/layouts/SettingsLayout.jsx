import SettingsNavigation from "@/components/navigations/SettingsNavigation";
import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom";

const SettingsLayout = () => {
  const { profile } = useSelector((state) => state.user.data);
  return (
    <div className="max-w-screen-lg grid grid-cols-4 mt-4 mx-auto gap-4 font-light">
      <SettingsNavigation />
      <div className='flex flex-col col-span-3 gap-4'>
        <span className="text-2xl font-semibold text-indigo-600">@{profile?.username}</span>
        <Outlet/>
      </div>
    </div>
  )
}

export default SettingsLayout
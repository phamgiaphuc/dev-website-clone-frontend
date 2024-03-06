import DashboardCards from "@/components/cards/DashboardCards";
import DashboardNavigation from "@/components/navigations/DashboardNavigation";
import { useSelector } from "react-redux";
import { Outlet, useLocation } from "react-router-dom";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";

const listOfDashboardNav = {
  user_followers: 'Followers',
  following_tags: 'Following tags',
  following_users: 'Following users',
  following_organizations: 'Following organizations',
  following_podcasts: 'Following podcasts',
  hidden_tags: 'Hidden tags'
}

const DashboardLayout = () => {
  const { profile: { username }} = useSelector((state) => state.user.data);
  const { pathname } = useLocation();
  let subpage = pathname.split('/')?.[2];
  return (
    <div className="max-w-screen-xl mx-auto my-4 gap-4 flex flex-col font-light">
      <div className="text-3xl font-semibold flex items-center">
        <span className="mr-2">Dashboard</span>
        {
          subpage !== undefined &&
          <div className="flex items-center gap-2">
            <MdKeyboardDoubleArrowRight className="w-6 h-6" />
            {listOfDashboardNav[subpage]}
          </div>
        }
      </div>
      { subpage === undefined && <DashboardCards /> }
      <div className="grid grid-cols-[240px_auto] gap-4">
        <DashboardNavigation subpage={subpage === undefined ? 'dashboard' : subpage} username={username} />
        <Outlet />
      </div>
    </div>
  )
}

export default DashboardLayout
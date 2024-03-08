import { DashboardContext } from "@/layouts/DashboardLayout";
import { useContext } from "react";
import { Link } from "react-router-dom";

const DashboardNavigation = ({subpage, username}) => {
  const { totalBlogs, dashboard } = useContext(DashboardContext);
  const linkClass = (type) => {
    return `p-2 rounded-md flex items-center justify-between ${type === subpage ? 'bg-white border border-gray-200 font-semibold' : 'text-gray-600 hover:bg-indigo-100 hover:text-indigo-600'}`;
  }
  return (
    <div className="flex flex-col">
      <Link to={'/dashboard'} className={linkClass('dashboard')}>
        <span>Posts</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">{totalBlogs}</span>
      </Link>
      <Link to={`/${username}/series`} className={linkClass('series')}>
        <span>Series</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
      </Link>
      <Link to={'/dashboard/user_followers'} className={linkClass('user_followers')}>
        <span>Followers</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
      </Link>
      <Link to={'/dashboard/following_tags'} className={linkClass('following_tags')}>
        <span>Following tags</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
      </Link>
      <Link to={'/dashboard/following_users'} className={linkClass('following_users')}>
        <span>Following users</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">{dashboard?.followingUsers.length || 0}</span>
      </Link>
      <Link to={'/dashboard/following_organizations'} className={linkClass('following_organizations')}>
        <span>Following organizations</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
      </Link>
      <Link to={'/dashboard/following_podcasts'} className={linkClass('following_podcasts')}>
        <span>Following podcasts</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
      </Link>
      <Link to={'/dashboard/analytics'} className={linkClass('analytics')}>
        <span>Analytics</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
      </Link>
      <Link to={'/dashboard/hidden_tags'} className={linkClass('hidden_tags')}>
        <span>Hidden tags</span>
        <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
      </Link>
      <Link to={'/videos/new'} className="py-2 w-full mt-6 bg-gray-300 text-center font-medium hover:bg-gray-400 rounded-md">Upload a video</Link>
    </div>
  )
}

export default DashboardNavigation
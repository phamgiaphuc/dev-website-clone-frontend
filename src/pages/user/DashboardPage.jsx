import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom"

const DashboardPage = () => {
  const { profile: { username }} = useSelector((state) => state.user.data);
  const { pathname } = useLocation();
  let subpage = pathname;

  const linkClass = (type) => {
    let classes = 'flex items-center gap-2 px-4 py-2 w-full rounded-md '
    if (type === subpage) {
      classes += 'bg-indigo-100 font-semibold'
    }
    return classes;
  }

  return (
    <div className="max-w-screen-xl mx-auto my-4 gap-4 flex flex-col">
      <span className="text-3xl font-semibold">Dashboard</span>
      <div className="grid grid-cols-3 gap-4">
        <div className="p-6 rounded-md border border-gray-200 flex flex-col bg-white">
          <span className="text-3xl font-semibold">1</span>
          <span className="text-gray-600">Total number of posts</span>
        </div>
        <div className="p-6 rounded-md border border-gray-200 flex flex-col bg-white">
          <span className="text-3xl font-semibold">1</span>
          <span className="text-gray-600">Total number of reactions</span>
        </div>
        <div className="p-6 rounded-md border border-gray-200 flex flex-col bg-white">
          <span className="text-3xl font-semibold">1</span>
          <span className="text-gray-600">Total number of comments</span>
        </div>
      </div>
      <div className="grid grid-cols-[240px_auto] gap-4">
        <div className="flex flex-col">
          <Link to={'/dashboard'} className="p-2 bg-white rounded-md border border-gray-200 flex items-center justify-between">
            <span>Posts</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">1</span>
          </Link>
          <Link to={`/${username}/series`} className="p-2 text-gray-600 flex items-center justify-between rounded-md hover:bg-indigo-100 hover:text-indigo-600">
            <span>Series</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
          </Link>
          <Link to={'/dashboard/user_followers'} className="p-2 text-gray-600 flex items-center justify-between rounded-md hover:bg-indigo-100 hover:text-indigo-600">
            <span>Followers</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
          </Link>
          <Link to={'/dashboard/following_tags'} className="p-2 text-gray-600 flex items-center justify-between rounded-md hover:bg-indigo-100 hover:text-indigo-600">
            <span>Following tags</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
          </Link>
          <Link to={'/dashboard/following_users'} className="p-2 text-gray-600 flex items-center justify-between rounded-md hover:bg-indigo-100 hover:text-indigo-600">
            <span>Following users</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
          </Link>
          <Link to={'/dashboard/following_organizations'} className="p-2 text-gray-600 flex items-center justify-between rounded-md hover:bg-indigo-100 hover:text-indigo-600">
            <span>Following organizations</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
          </Link>
          <Link to={'/dashboard/following_podcasts'} className="p-2 text-gray-600 flex items-center justify-between rounded-md hover:bg-indigo-100 hover:text-indigo-600">
            <span>Following podcasts</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
          </Link>
          <Link to={'/dashboard/analytics'} className="p-2 text-gray-600 flex items-center justify-between rounded-md hover:bg-indigo-100 hover:text-indigo-600">
            <span>Analytics</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
          </Link>
          <Link to={'/dashboard/hidden_tags'} className="p-2 text-gray-600 flex items-center justify-between rounded-md hover:bg-indigo-100 hover:text-indigo-600">
            <span>Hidden tags</span>
            <span className="px-1 py-0.5 text-sm bg-gray-300 rounded-md">0</span>
          </Link>
          <Link to={'/videos/new'} className="py-2 w-full mt-6 bg-gray-300 text-center font-medium hover:bg-gray-400 rounded-md">Upload a video</Link>
        </div>
        <div>Content</div>
      </div>
    </div>
  )
}

export default DashboardPage
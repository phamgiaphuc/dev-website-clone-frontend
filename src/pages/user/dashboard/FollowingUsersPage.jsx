import { DashboardContext } from "@/layouts/DashboardLayout"
import { useContext } from "react"
import { Link } from "react-router-dom";

const FollowingUsersPage = () => {
  const { dashboard } = useContext(DashboardContext);
  return (
    dashboard?.followingUsers.length > 0 ?
    <div className="grid grid-cols-3 gap-4">
      {
        dashboard?.followingUsers.map((user, index) => {
          return (
            <Link to={`/${user.profile?.username}`} key={index} className="bg-white border border-gray-200 rounded-md p-6 h-fit flex flex-col items-center hover:border-gray-600 cursor-pointer">
              <img src={user.profile?.profile_img} alt={user.profile?.username} className="rounded-full w-14 h-14 mb-2"/>
              <span className="text-lg text-indigo-600 font-bold">{user.profile?.fullname}</span>
              <span className="text-gray-600">@{user.profile?.username}</span>
            </Link>
          )
        })
      }
    </div>
    :
    <div className="flex items-center justify-center border text-lg border-gray-200 bg-white">
      You don&apos;t follow any users yet...
    </div>
  )
}

export default FollowingUsersPage
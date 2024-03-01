import { formatDate } from "@/common/formatDate"
import { useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"

const UserCard = ({author, isOwner}) => {
  const user = useSelector((state) => state.user.data);
  const navigate = useNavigate();

  const handleFollowBtn = (event) => {
    event.preventDefault();
    if (!user) {
      return navigate('/signin');
    }
    console.log(`Followed ${author.profile?.username}`);
  }

  return (
    <div className="bg-white relative h-fit w-full flex flex-col rounded-md border border-gray-200 overflow-hidden">
      <div className="h-8" style={{ backgroundColor: `${author.profile?.branding_color}` }}></div>
      <Link to={`/${author.profile?.username}`} className="absolute flex m-4 gap-2 cursor-pointer w-full">
        <img src={author.profile?.profile_img} alt={author.profile?.username} className="h-14 w-14 rounded-full"/>
        <div className="flex flex-col-reverse mb-1 text-xl font-semibold hover:text-indigo-600">{author.profile?.fullname}</div>
      </Link>
      <div className="flex flex-col p-4 mt-10 gap-4 text-gray-600 font-light">
        {
          isOwner ?
          <Link to={'/settings'} className="py-2 px-4 rounded-md bg-indigo-600 text-center text-white hover:bg-indigo-700 hover:underline hover:underline-offset-2 cursor-pointer">
            Edit profile
          </Link>
          :
          <button onClick={handleFollowBtn} className="py-2 px-4 rounded-md bg-indigo-600 text-center text-white hover:bg-indigo-700 hover:underline hover:underline-offset-2 cursor-pointer">
            Follow
          </button>
        }
        <div className="flex flex-col leading-snug">
          <span className="uppercase text-sm font-semibold tracking-wide">Email</span>
          <span>{author.email}</span>
        </div>
        <div className="flex flex-col leading-snug">
          <span className="uppercase text-sm font-semibold tracking-wide">Joined</span>
          <span>{formatDate(author.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

export default UserCard
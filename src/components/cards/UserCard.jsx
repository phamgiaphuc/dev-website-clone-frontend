import { formatDate } from "@/common/formatDate"
import { userFollowAnotherUser, userUnfollowAnotherUser } from "@/redux/userApi";
import { useDispatch, useSelector } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { createAxios } from "@/common/axiosJWT";
import { useEffect, useState } from "react";

const UserCard = ({author, isOwner}) => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch);
  const navigate = useNavigate();
  const [isFollow, setIsFollow] = useState(false);

  const handleFollowBtn = async (event) => {
    event.preventDefault();
    if (!user) {
      return navigate('/signin');
    }
    isFollow ? 
    await userUnfollowAnotherUser(axiosJWT, author._id, setIsFollow)
    :
    await userFollowAnotherUser(axiosJWT, author._id, setIsFollow);
  }

  useEffect(() => {
    if (author._id && !isOwner) {
      axiosJWT.post('/v1/users/check_follow', {
        authorId: author._id
      }).then(({ data: { isFollowed }}) =>  {
        setIsFollow(isFollowed);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [author._id, isOwner]);

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
          isFollow ?
          <button onClick={handleFollowBtn} className="font-medium py-2 px-4 rounded-md bg-gray-100 text-center ring-2 ring-gray-300 hover:ring-gray-400 hover:bg-gray-200 hover:underline hover:underline-offset-2 cursor-pointer">
            Following
          </button>
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
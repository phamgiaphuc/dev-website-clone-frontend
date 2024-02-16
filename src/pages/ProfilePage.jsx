import { IoMdMail, IoLogoYoutube, IoLogoFacebook, IoLogoInstagram, IoLogoTwitter, IoLogoGithub } from "react-icons/io";
import { LuUserSquare } from "react-icons/lu";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";
import { useSelector } from "react-redux";

const ProfilePage = () => {
  const user = useSelector((state) => state.auth.user.data);
  return (
    <div className='max-w-screen-lg grid grid-cols-3 gap-4 w-full mx-auto mt-4 font-light'>
      <div className='bg-white flex flex-col justify-center items-center  rounded-md border border-gray-200 p-4'>
        <div className="overflow-hidden rounded-full mt-8 mb-4">
          <img src={user.profile?.profile_img} alt={user.profile?.username} className="w-28 h-28 object-cover"/>
        </div>
        <span className="text-xl font-semibold tracking-wide">{user.profile?.fullname}</span>
        <span className="text-sm text-gray-500 mb-4">@{user.profile?.username}</span>
        <div className="flex flex-col items-center justify-center gap-4 w-full">
          <div className="w-full text-center">
            {
              user.profile?.bio.length > 0 ? user.profile?.bio : '404 bio not found'
            }
          </div>
          <Link to={'/settings'} className="py-2 px-4 rounded-md bg-indigo-600 font-semibold text-center text-white w-full hover:bg-indigo-700 hover:underline hover:underline-offset-2">
            Edit profile
          </Link>
          <div className="flex flex-col w-full gap-6">
              <a href={`mailto:${user.email}`} className="flex items-center gap-2">
                <IoMdMail className="w-6 h-6" />
                <span>{user.email}</span>
              </a>
            <a href={user.profile?.social_links?.youtube} className="flex items-center gap-2">
              <IoLogoYoutube className="w-6 h-6" />
              <span>{user.profile?.social_links?.youtube ? user.profile?.social_links?.youtube : 'No link'}</span>
            </a>
            <a href={user.profile?.social_links?.facebook} className="flex items-center gap-2">
              <IoLogoFacebook className="w-6 h-6" />
              <span>{user.profile?.social_links?.facebook ? user.profile?.social_links?.facebook : 'No link'}</span>
            </a>
            <a href={user.profile?.social_links?.instagram} className="flex items-center gap-2">
              <IoLogoInstagram className="w-6 h-6" />
              <span>{user.profile?.social_links?.instagram ? user.profile?.social_links?.instagram : 'No link'}</span>
            </a>
            <a href={user.profile?.social_links?.twitter} className="flex items-center gap-2">
              <IoLogoTwitter className="w-6 h-6" />
              <span>{user.profile?.social_links?.twitter ? user.profile?.social_links?.twitter : 'No link'}</span>
            </a>
            <a href={user.profile?.social_links?.github} className="flex items-center gap-2">
              <IoLogoGithub className="w-6 h-6" />
              <span>{user.profile?.social_links?.github ? user.profile?.social_links?.github : 'No link'}</span>
            </a>
            <a href={user.profile?.social_links?.website} className="flex items-center gap-2">
              <LuUserSquare className="w-6 h-6" />
              <span>{user.profile?.social_links?.website ? user.profile?.social_links?.website : 'No link'}</span>
            </a>
          </div>
        </div>
      </div>
      <div className='col-span-2 flex flex-col gap-2'>
        <div className="flex flex-col bg-white rounded-md border p-4 border-gray-200 hover:border-gray-400 cursor-pointer group">
          <div className="h-10 flex items-center overflow-hidden">
            <img src={user.profile?.profile_img} alt={user.profile?.username} className="w-10 h-10 rounded-full mr-2"/>
            <div className="flex justify-between flex-col">
              <span className="font-medium">{user.profile?.fullname}</span>
              <span className="text-sm text-gray-600">Feb 14, 2024</span>
            </div>
          </div>
          <div className="ml-12 mt-2 flex flex-col gap-1">
            <span className="text-xl font-semibold group-hover:text-indigo-600">TypeScript Core Concepts Explained for Absolute Beginners</span>
            <div className="flex gap-2">
              <div className="p-1 w-fit text-gray-600 hover:text-black hover:ring-1 hover:ring-gray-400 hover:bg-gray-100 cursor-pointer text-sm rounded-md">
                #webdev
              </div>
              <div className="p-1 w-fit text-gray-600 hover:text-black hover:ring-1 hover:ring-gray-400 hover:bg-gray-100 cursor-pointer text-sm rounded-md">
                #typescript
              </div>
              <div className="p-1 w-fit text-gray-600 hover:text-black hover:ring-1 hover:ring-gray-400 hover:bg-gray-100 cursor-pointer text-sm rounded-md">
                #beginners
              </div>
              <div className="p-1 w-fit text-gray-600 hover:text-black hover:ring-1 hover:ring-gray-400 hover:bg-gray-100 cursor-pointer text-sm rounded-md">
                #javascript
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-2 text-sm">
                <div className="py-1 px-2 w-fit flex items-center gap-1 rounded-md cursor-pointer text-gray-600 hover:text-black hover:bg-gray-100">
                  <FaHeart className="w-4 h-4 fill-red-500"/>
                  <span>16 reactions</span>
                </div>
                <div className="py-1 px-2 w-fit flex items-center gap-1 rounded-md cursor-pointer text-gray-600 hover:text-black hover:bg-gray-100">
                  <FaComment className="w-4 h-4 fill-gray-800"/>
                  <span>8 comments</span>
                </div>
              </div>
              <div className="flex flex-col text-gray-600 justify-end h-full">
                <span className="text-[0.8rem]">
                  2 min read
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-md border p-4 border-gray-200">
          Blog 2
        </div>
        <div className="bg-white rounded-md border p-4 border-gray-200">
          Blog 3
        </div>
        <div className="bg-white rounded-md border p-4 border-gray-200">
          Blog 4
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
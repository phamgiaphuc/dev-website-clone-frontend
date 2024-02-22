/* eslint-disable react/prop-types */
import { FaHeart } from "react-icons/fa";
import { FaComment } from "react-icons/fa6";

const SubCard = ({profile_img, username, fullname}) => {
  return (
    <div className="flex flex-col bg-white rounded-md border p-4 border-gray-200 hover:border-gray-400 cursor-pointer group">
      <div className="h-10 flex items-center overflow-hidden">
        <img src={profile_img} alt={username} className="w-10 h-10 rounded-full mr-2"/>
        <div className="flex justify-between flex-col">
          <span className="font-medium">{fullname}</span>
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
  )
}

export default SubCard
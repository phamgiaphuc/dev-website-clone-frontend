import { formatDate } from "@/common/formatDate"
import { Link } from "react-router-dom"
import { BsThreeDots } from "react-icons/bs";
import { FaRegHeart, FaRegComment } from "react-icons/fa";

const PublishPostCard = ({blog, username}) => {
  return (
    <Link to={`/${username}/${blog._id}`} className="bg-white rounded-md border border-gray-200 p-4 flex items-center hover:border-gray-600 cursor-pointer">
      <div className="flex flex-col w-1/2">
        <span className="text-lg font-semibold text-indigo-600">{blog.title}</span>
        <span>Published: {formatDate("2024-03-05T17:47:49.107Z")}</span>
      </div>
      <div className="flex-1 flex justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <FaRegHeart className="w-4 h-4" />
            <span>{blog.reactions?.likes.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaRegComment className="w-4 h-4" />
            <span>{blog.reactions?.comments.length}</span>
          </div>
        </div>
        <div className="flex items-center">
          <Link className="p-2 rounded-md hover:bg-gray-200">
            Manage
          </Link>
          <Link className="p-2 rounded-md hover:bg-gray-200">
            Edit
          </Link>
          <button className="p-2 rounded-md hover:bg-gray-200">
            <BsThreeDots className="w-6 h-6" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default PublishPostCard
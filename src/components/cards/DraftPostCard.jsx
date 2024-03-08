import { formatDate } from "@/common/formatDate"
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";

const DraftPostCard = ({blog, username}) => {
  return (
    <Link to={`/${username}/${blog._id}`} className="bg-white rounded-md border border-gray-200 p-4 flex items-center hover:border-gray-600 cursor-pointer">
      <div className="flex flex-col w-1/2">
        <span className="text-lg font-semibold text-indigo-600">{blog.title}</span>
        <span>Saved: {formatDate(blog.createdAt)}</span>
      </div>
      <div className="flex-1 flex justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="py-0.5 px-1 rounded-md bg-yellow-500">Draft</span>
        </div>
        <div className="flex items-center">
          <button className="p-2 text-red-600 rounded-md hover:bg-gray-200">
            Delete
          </button>
          <button className="p-2 rounded-md hover:bg-gray-200">
            Edit
          </button>
          <button className="p-2 rounded-md hover:bg-gray-200">
            <BsThreeDots className="w-6 h-6" />
          </button>
        </div>
      </div>
    </Link>
  )
}

export default DraftPostCard
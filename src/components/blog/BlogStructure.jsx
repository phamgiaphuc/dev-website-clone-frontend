import { formatDate } from "@/common/formatDate"
import { randomColors } from "@/common/generateRandomColor"
import BlogContent from "./BlogContent"
import { Link, useParams } from "react-router-dom"

const BlogStructure = ({tags, cover_image, createdAt, title, content, profile_img, username, fullname, isOwner}) => {
  const url = useParams();
  return (
    <>
      <img src={cover_image} className="h-[350px] object-cover"/>
      <div className="flex flex-col gap-4 py-6 px-12">
        <div className="h-12 flex items-center overflow-hidden">
          <img src={profile_img} alt={username} className="w-12 h-12 rounded-full mr-2"/>
          <div className="flex justify-between flex-col">
            <span className="font-medium">{fullname}</span>
            <span className="text-sm text-gray-600 font-light">Posted on {formatDate(createdAt)}</span>
          </div>
          {
            isOwner
            &&
            <div className="ml-auto bg-yellow-50 p-1 flex rounded-md font-light text-sm border border-yellow-300">
              <Link to={`/${username}/${url.blogId}/edit`} className="p-2 rounded-md hover:bg-yellow-100">Edit</Link>
              <Link to={`/${username}/${url.blogId}/manage`} className="p-2 rounded-md hover:bg-yellow-100">Manage</Link>
              <Link to={`/${username}/${url.blogId}/stats`} className="p-2 rounded-md hover:bg-yellow-100">Stats</Link>
            </div>
          }
        </div>
        <div className="flex flex-col gap-2 mb-2">
          <span className="text-5xl font-bold leading-tight">{title}</span>
          {
            tags &&
            <div className="flex gap-2 items-center flex-wrap">
              {
                tags.map((tag, index) => 
                  <div key={index} className={`${randomColors[tag.color]}`}>
                    {tag.value}
                  </div>
                )
              }
            </div>
          }
        </div>
        {
          content ?
          <div className="flex flex-col gap-2">
            {
              content?.blocks.map((block, index) => {
                return (
                  <div key={index} className={block.type === 'heading' && index === 0 ? '-mt-2' : ''}>
                    <BlogContent block={block}/>
                  </div>
                )
              })
            }
          </div>
          :
          <></>
        }
      </div>
    </>
  )
}

export default BlogStructure
import { formatDate } from "@/common/formatDate"
import { randomColors } from "@/common/generateRandomColor"
import BlogContent from "./BlogContent"

const BlogStructure = ({tags, cover_image, createdAt, title, content, profile_img, username, fullname}) => {
  return (
    <>
      <img src={cover_image} className="h-[350px] object-cover"/>
      <div className="flex flex-col gap-4 py-6 px-12">
        <div className="h-12 flex items-center overflow-hidden">
          <img src={profile_img} alt={username} className="w-12 h-12 rounded-full mr-2"/>
          <div className="flex justify-between flex-col">
            <span className="font-medium">{fullname}</span>
            <span className="text-sm text-gray-600">{formatDate(createdAt)}</span>
          </div>
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
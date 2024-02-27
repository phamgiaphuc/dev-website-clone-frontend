import { formatDate } from "@/common/formatDate";
import { randomColors } from "@/common/generateRandomColor";
import { EditorContext } from "@/pages/user/EditorPage"
import { useContext } from "react"
import { useSelector } from "react-redux";
import BlogContent from "../blog/BlogContent";

const PreviewComponent = () => {
  const { profile: { profile_img, username, fullname }} = useSelector((state) => state.user.data)
  const { blog: { cover_image, title, tags, content, date }} = useContext(EditorContext);
  return (
    <div className="ml-16 bg-white flex flex-col rounded-md border border-gray-300 overflow-hidden">
      <img src={cover_image} className="h-[320px] object-cover"/>
      <div className="flex flex-col gap-4 py-6 px-10">
        <div className="h-12 flex items-center overflow-hidden">
          <img src={profile_img} alt={username} className="w-12 h-12 rounded-full mr-2"/>
          <div className="flex justify-between flex-col">
            <span className="font-medium">{fullname}</span>
            <span className="text-sm text-gray-600">{formatDate(date)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-5xl font-bold leading-tight">{title}</span>
          {
            tags.length > 0 &&
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
        <div className="flex flex-col gap-2">
          {
            content?.blocks.map((block, index) => {
              return (
                <div key={index} className={block.type === 'heading' && index === 0 && '-mt-2'}>
                  <BlogContent block={block}/>
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default PreviewComponent
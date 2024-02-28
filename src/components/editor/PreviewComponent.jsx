import { EditorContext } from "@/pages/user/EditorPage"
import { useContext } from "react"
import { useSelector } from "react-redux";
import BlogStructure from "../blog/BlogStructure";

const PreviewComponent = () => {
  const { profile: { profile_img, username, fullname }} = useSelector((state) => state.user.data)
  const { blog: { cover_image, title, tags, content, createdAt }} = useContext(EditorContext);
  return (
    <div className="ml-16 bg-white flex flex-col rounded-md border border-gray-300 overflow-hidden">
      <BlogStructure tags={tags} cover_image={cover_image} createdAt={createdAt} title={title} content={content} profile_img={profile_img} fullname={fullname} username={username} />
    </div>
  )
}

export default PreviewComponent
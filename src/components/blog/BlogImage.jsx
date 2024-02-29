const BlogImage = ({file, caption}) => {
  return (
    <div className="flex flex-col gap-2 my-4">
      <img src={file.url} />
      { caption && <span className="text-center italic text-gray-600">{caption}</span> }
    </div>
  )
}

export default BlogImage
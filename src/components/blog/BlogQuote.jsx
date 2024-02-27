const BlogQuote = ({text, caption}) => {
  return (
    <div className="flex flex-col p-4 gap-2 bg-indigo-100 border-l-2 border-indigo-600">
      <span dangerouslySetInnerHTML={{ __html: text }}></span>
      { caption && <span className="text-gray-600 italic">{caption}</span> }
    </div>
  )
}

export default BlogQuote
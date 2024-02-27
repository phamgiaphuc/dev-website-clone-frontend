const BlogList = ({items, style}) => {
  if (style === 'ordered') {
    return (
      <ol className="text-lg list-decimal list-inside space-y-2">
        {
          items.map((item, index) => {
            return <li key={index} className="text-justify leading-relaxed">{item}</li>
          })
        }
      </ol>
    )
  } else {
    return (
      <ul className="text-lg list-disc list-inside space-y-2">
        {
          items.map((item, index) => {
            return <li key={index} className="text-justify leading-relaxed">{item}</li>
          })
        }
      </ul>
    )
  }
}

export default BlogList
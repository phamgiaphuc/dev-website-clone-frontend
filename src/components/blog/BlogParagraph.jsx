const BlogParagraph = ({text}) => {
  return <p className="text-lg text-justify leading-relaxed" dangerouslySetInnerHTML={{ __html: text}}></p>
}

export default BlogParagraph
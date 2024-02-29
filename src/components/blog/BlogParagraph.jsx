const BlogParagraph = ({text}) => {
  return <p className="text-lg text-justify leading-relaxed font-light" dangerouslySetInnerHTML={{ __html: text}}></p>
}

export default BlogParagraph
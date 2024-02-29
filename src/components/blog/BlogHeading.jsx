const BlogHeading = ({text, level}) => {
  switch(level) {
    case 1: 
      return <h1 className="mt-2 text-4xl font-bold" dangerouslySetInnerHTML={{ __html: text}}></h1>;
    case 2: 
      return <h2 className="mt-2 text-2xl font-bold" dangerouslySetInnerHTML={{ __html: text}}></h2>;
    case 3: 
      return <h3 className="mt-2 text-xl font-semibold" dangerouslySetInnerHTML={{ __html: text}}></h3>;
    case 4: 
      return <h4 className="mt-2 text-lg font-semibold" dangerouslySetInnerHTML={{ __html: text}}></h4>;
    case 5: 
      return <h5 className="mt-2 font-light" dangerouslySetInnerHTML={{ __html: text}}></h5>;
    case 6: 
      return <h6 className="mt-2 font-light" dangerouslySetInnerHTML={{ __html: text}}></h6>;
    default:
      return <label className="mt-2 font-light" dangerouslySetInnerHTML={{ __html: text }}></label>
  }
}

export default BlogHeading
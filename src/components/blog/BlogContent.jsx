import BlogParagraph from './BlogParagraph';
import BlogHeading from './BlogHeading';
import BlogQuote from './BlogQuote';
import BlogList from './BlogList';
import BlogCode from './BlogCode';
import BlogImage from './BlogImage';

const BlogContent = ({block}) => {
  const { type, data } = block

  if (type === 'paragraph') {
    return <BlogParagraph text={data.text} />
  }

  if (type === 'heading') {
    const { text, level } = data;
    return <BlogHeading text={text} level={level}/>
  }

  if (type === 'image') {
    const { caption, file } = data
    return <BlogImage caption={caption} file={file} />
  }

  if (type === 'quote') {
    const { text, caption } = data;
    return <BlogQuote text={text} caption={caption} />
  }

  if (type === 'list') {
    const { items, style } = data;
    return <BlogList items={items} style={style} />
  }

  if (type === 'code') {
    return (
      <BlogCode code={data.code} language='js' />
    )
  }
}

export default BlogContent
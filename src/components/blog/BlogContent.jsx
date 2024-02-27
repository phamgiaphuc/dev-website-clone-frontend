/* eslint-disable react/prop-types */
import { CodeBlock } from 'react-code-block';
import { useCopyToClipboard } from 'react-use';

function CodeBlockDemo({ code, language }) {
  const [state, copyToClipboard] = useCopyToClipboard();

  const copyCode = () => {
    // Logic to copy `code`
    copyToClipboard(code);
  };

  return (
    <CodeBlock code={code} language={language}>
      <div className="relative">
        <CodeBlock.Code className="bg-gray-900 p-6 rounded-md shadow-lg text-sm">
          <div className="table-row">
            <CodeBlock.LineNumber className="table-cell pr-4 text-sm text-gray-500 text-right select-none" />
            <CodeBlock.LineContent className="table-cell">
              <CodeBlock.Token />
            </CodeBlock.LineContent>
          </div>
        </CodeBlock.Code>

        <button
          className="bg-white rounded-full px-3.5 py-1.5 absolute top-2 right-2 text-sm font-semibold"
          onClick={copyCode}
        >
          {state.value ? 'Copied ✅' : 'Copy code'}
        </button>
      </div>
    </CodeBlock>
  );
} 


const BlogContent = ({block}) => {
  const { type, data } = block

  if (type === 'paragraph') {
    return <p className="text-justify leading-8" dangerouslySetInnerHTML={{ __html: data.text}}></p>
  }

  if (type === 'heading') {
    const { text, level } = data;
    switch(level) {
      case 1: 
        return <h1 className="text-4xl font-bold" dangerouslySetInnerHTML={{ __html: text}}></h1>;
      case 2: 
        return <h2 className="text-2xl font-semibold" dangerouslySetInnerHTML={{ __html: text}}></h2>;
      case 3: 
        return <h3 className="text-xl font-semibold" dangerouslySetInnerHTML={{ __html: text}}></h3>;
      case 4: 
        return <h4 className="text-lg font-semibold" dangerouslySetInnerHTML={{ __html: text}}></h4>;
      case 5: 
        return <h5 className="font-light" dangerouslySetInnerHTML={{ __html: text}}></h5>;
      case 6: 
        return <h6 className="font-light" dangerouslySetInnerHTML={{ __html: text}}></h6>;
      default:
        return <label className="font-light" dangerouslySetInnerHTML={{ __html: text }}></label>
    }
  }

  if (type === 'image') {
    return (
      <div className="flex flex-col gap-2 my-4">
        <img src={data.file.url} />
        { data.caption && <span className="text-center italic text-gray-600">{data.caption}</span> }
      </div>
    )
  }

  if (type === 'quote') {
    const { text, caption } = data;
    return (
      <div className="flex flex-col p-4 gap-2 bg-indigo-100 border-l-2 border-indigo-600">
        <span dangerouslySetInnerHTML={{ __html: text }}></span>
        { caption && <span className="text-gray-600 italic">{caption}</span> }
      </div>
    )
  }

  if (type === 'list') {
    const { items, style } = data;
    if (style === 'ordered') {
      return (
        <ol className="list-decimal list-inside ml-8 space-y-2">
          {
            items.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ol>
      )
    } else {
      return (
        <ul className="list-disc list-inside ml-8 space-y-2">
          {
            items.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ul>
      )
    }
  }

  if (type === 'code') {
    return (
      <CodeBlockDemo code={data.code} language='js' />
    )
  }
}

export default BlogContent
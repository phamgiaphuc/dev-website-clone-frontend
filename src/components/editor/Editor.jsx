import { useContext, useEffect } from "react";
import EditorJS from "@editorjs/editorjs";
import { UserContext } from "../context/UserContextProvider";
import { blogUploadImg } from "@/redux/blogApi";
import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import List from "@editorjs/list";
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';
import InlineCode from '@editorjs/inline-code';
import { EditorContext } from "@/pages/user/EditorPage";

const Editor = () => {
  const { axiosJWT } = useContext(UserContext);
  const { setTextEditor, blog: { content }, setMouseFocus } = useContext(EditorContext);

  const uploadImageByUrl = async (event) => {
    const link = new Promise((resolve, reject) => {
      try {
        resolve(event)
      } catch (error) {
        reject(error)
      }
    });
    return link.then(url => {
      return {
        success: 1,
        file: { url }
      }
    })
  }
  
  const uploadImageByFile = async (event) => {
    console.log(event);
    return {
      success: 1,
      file: { url: await blogUploadImg(axiosJWT, event) }
    }
  }

  const editorTools = {
    heading: {
      class: Header,
      inlineToolbar: true,
      config: {
        placeholder: 'Enter a header',
        defaultLevel: 3
      }
    },
    paragraph: {
      class: Paragraph,
    },
    quote: {
      class: Quote,
    },
    list: {
      class: List,
    },
    image: {
      class: ImageTool,
      config: {
        uploader: {
          uploadByUrl: uploadImageByUrl,
          uploadByFile: uploadImageByFile
        }
      }
    },
    embed: {
      class: Embed,
    },
    marker: {
      class: Marker,
    },
    code: {
      class: CodeTool,
    },
    inlineCode: {
      class: InlineCode,
    },
  }

  useEffect(() => {
    setTextEditor(new EditorJS({
      holder: 'editor-js',
      data: content,
      placeholder: 'Enter some text here',
      tools: editorTools
    }));
  }, [])

  return (
    <div id="editor-js" className="editor-js-css" onFocus={() => setMouseFocus('blog_content')}></div>
  )
}

export default Editor
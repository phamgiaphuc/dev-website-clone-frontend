import Header from '@editorjs/header';
import Paragraph from '@editorjs/paragraph';
import Quote from '@editorjs/quote';
import List from "@editorjs/list";
import Checklist from '@editorjs/checklist';
import ImageTool from '@editorjs/image';
import Embed from '@editorjs/embed';
import Marker from '@editorjs/marker';
import CodeTool from '@editorjs/code';

const uploadImageByUrl = (event) => {
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

export const editorTools = {
  header: {
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
  checklist: {
    class: Checklist,
  },
  image: {
    class: ImageTool,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        // uploadByFile: 
      }
    }
  },
  embed: {
    class: Embed,
  },
  marker: {
    class: Marker,
    inlineToolbar: true
  },
  code: {
    class: CodeTool,
  }
}
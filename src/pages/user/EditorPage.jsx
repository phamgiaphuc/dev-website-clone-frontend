import { createContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import EditorComponent from "@/components/editor/EditorComponent";
import PreviewComponent from "@/components/editor/PreviewComponent";
import toast from "react-hot-toast";

export const EditorContext = createContext({});
const blogStructure = {
  title: '',
  cover_image: '',
  content: [],
  tags: [],
  description: '',
  date: Date.now()
}

const EditorPage = () => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState('edit');
  const [blog, setBlog] = useState(blogStructure);
  const [textEditor, setTextEditor] = useState({ isReady: false });

  const handlePreviewPublishBtn = () => {
    // if (!blog.cover_image) {
    //   return toast.error('Upload a cover image to preview and publish it');
    // }
    // if (!blog.title) {
    //   return toast.error('Write a title to preview and publish it');
    // }
    if (textEditor.isReady && editorState === 'edit') {
      textEditor.save().then((data) => {
        if (data.blocks.length) {
          setBlog({...blog, content: data})
          setEditorState('preview');
        } else {
          return toast.error('Write some content to preview and publish it');
        }
      })
    } else {
      console.log('Publish form');
    }
  }

  return (
    <EditorContext.Provider value={{blog, setBlog, textEditor, setTextEditor}}>
      <div className="relative font-light">
        <div className="w-screen max-w-screen-xl mx-auto min-h-screen flex gap-4">
          <div className="max-w-[886px] w-full flex flex-col">
            <div className="flex justify-between">
              <div className="flex flex-wrap items-center py-2 gap-4">
                <Link to={'/'}> 
                  <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" alt="Dev Logo" className="h-10 w-12" />
                </Link>
                <span>Create post</span>
              </div>
              <div className="flex h-fit mt-auto mb-1 gap-2">
                <button onClick={() => setEditorState('edit')} className={`py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset ${editorState === 'edit' ? 'font-semibold' : ''}`}>Edit</button>
                <button onClick={handlePreviewPublishBtn} className={`py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2 ${editorState === 'preview' ? 'font-semibold' : ''}`}>Preview</button>
              </div>
            </div>
            {
              editorState === 'edit' ?
              <EditorComponent />
              :
              <PreviewComponent />
            }
            <div className="ml-16 flex gap-2 my-6">
              <button onClick={handlePreviewPublishBtn} className='py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:underline hover:underline-offset-2'>
                Publish
              </button>
              <button className="py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2">
                Save draft
              </button>
            </div>
          </div>
          <div className="bg-blue-200 flex-1">
            Instructions
          </div>
        </div>
        <button onClick={() => navigate(-1)} className="absolute right-0 top-0 m-2 p-2 rounded-md hover:bg-indigo-100 hover:text-indigo-600">
          <IoClose className="w-6 h-6" />
        </button>
      </div>
    </EditorContext.Provider>
  )
}

export default EditorPage
import { createContext, useContext, useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import EditorComponent from "@/components/editor/EditorComponent";
import PreviewComponent from "@/components/editor/PreviewComponent";
import toast from "react-hot-toast";
import { UserContext } from "@/components/context/UserContextProvider";
import { useSelector } from "react-redux";
import { createNewBlog } from "@/redux/blogApi";

export const EditorContext = createContext({});
const blogStructure = {
  title: '',
  cover_image: '',
  content: {},
  tags: [],
  publish: false,
  draft: false
}

const EditorPage = () => {
  const navigate = useNavigate();
  const [editorState, setEditorState] = useState('edit');
  const [blog, setBlog] = useState(blogStructure);
  const [textEditor, setTextEditor] = useState({ isReady: false });
  const [mouseFocus, setMouseFocus] = useState('');
  const [published, setPublished] = useState(false);
  const user = useSelector((state) => state.user.data);
  const { axiosJWT } = useContext(UserContext);

  const handleCreateNewBlog = async (action) => {
    if (!blog.cover_image) {
      toast.error('Upload a cover image to preview and publish it');
      return false;
    }
    if (!blog.title) {
      toast.error('Write a title to preview and publish it');
      return false;
    } 
    if (textEditor.isReady && editorState === 'edit') {
      setMouseFocus('');
      textEditor.save().then((data) => {
        if (data.blocks.length) {
          setBlog({...blog, content: data})
          setEditorState('preview');
          return true;
        } else {
          return false;
        }
      });
    }
    if (editorState === 'preview') {
      const blogData = {
        ...blog,
        publish: action === 'publish' ? true : false,
        draft: action === 'draft' ? true : false
      }
      await createNewBlog(axiosJWT, blogData, navigate, user.profile?.username, setPublished, action);
    }
  }

  const handlePreviewPublishBtn = async () => {
    await handleCreateNewBlog('publish');
  }

  const handleSaveDraftButton = async () => {
    await handleCreateNewBlog('draft');
  }

  return (
    <EditorContext.Provider value={{blog, setBlog, textEditor, setTextEditor, mouseFocus, setMouseFocus}}>
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
              <button onClick={handlePreviewPublishBtn} className='py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:underline hover:underline-offset-2 disabled:cursor-not-allowed disabled:no-underline disabled:opacity-75 disabled:bg-indigo-600' disabled={published}>
                Publish
              </button>
              <button onClick={handleSaveDraftButton} className="py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2">
                Save draft
              </button>
            </div>
          </div>
          <div className="relative flex-1">
            {
              mouseFocus === 'blog_title'
              &&
              <div className={`absolute left-0 w-full flex flex-col gap-2 ${blog.cover_image ? 'top-[25rem]' : 'top-40'}`}>
                <span className="text-lg font-semibold">Writing a Great Post Title</span>
                <ul className="list-disc list-outside text-pretty text-gray-600 space-y-2 ml-6">
                  <li>Think of your post title as a super short (but compelling!) description — like an overview of the actual post in one short sentence.</li>
                  <li>Use keywords where appropriate to help ensure people can find your post by search.</li>
                </ul>
              </div>
            }
            {
              mouseFocus === 'blog_tags'
              &&
              <div className={`absolute left-0 w-full flex flex-col gap-2 ${blog.cover_image ? 'top-[30rem]' : 'top-60'}`}>
                <span className="text-lg font-semibold">Tagging Guidelines</span>
                <ul className="list-disc list-outside text-pretty text-gray-600 space-y-2 ml-6">
                  <li>Tags help people find your post - think of them as the topics or categories that best describe your post.</li>
                  <li>Add up to four comma-separated tags per post. Use existing tags whenever possible.</li>
                  <li>Some tags have special posting guidelines - double check to make sure your post complies with them.</li>
                </ul>
              </div>
            }
            {
              mouseFocus === 'blog_content'
              &&
              <div className={`absolute left-0 w-full flex flex-col gap-2 ${blog.cover_image ? 'top-[34rem]' : 'top-72'}`}>
                <span className="text-lg font-semibold">Editor Basics</span>
                <ul className="list-disc list-outside text-pretty text-gray-600 space-y-2 ml-6">
                  <li>Structure your content using appropriate headings, and proofread for spelling and grammar errors before publishing.</li>
                  <li>Explore different block types, collaborate effectively, and respect copyrights and guidelines when adding external media.</li>
                </ul>
              </div>
            }
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
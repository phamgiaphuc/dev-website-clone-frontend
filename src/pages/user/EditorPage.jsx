import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { MdNumbers } from "react-icons/md";
import { generateRandomColor, randomColors } from "@/common/generateRandomColor";

const EditorPage = () => {
  const [addTagInput, setAddTagInput] = useState(false);
  const [tags, setTags] = useState([]);
  const [coverImg, setCoverImg] = useState('');
  const navigate = useNavigate();

  const handleTitleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  const handleTitleChange = (event) => {
    let input = event.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
  }

  const handleTagKeyDown = (event) => {
    if (event.keyCode === 13) {
      const color = generateRandomColor();
      const tag = {
        value: `#${event.target.value}`,
        color
      }
      setTags([...tags, tag]);
      setAddTagInput(false);
    }
  }

  const handleDeleteTagBtn = (value) => {
    setTags(tags.filter((_, index) => index !== value));
  }

  return (
    <div className="relative font-light">
      <div className="w-screen max-w-screen-xl mx-auto min-h-screen flex gap-4">
        <div className="max-w-[886px] w-full flex flex-col">
          <div className="flex justify-between">
            <div className="flex items-center py-2 gap-4">
              <Link to={'/'}> 
                <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" alt="Dev Logo" className="h-10 w-12" />
              </Link>
              <span>Create post</span>
            </div>
            <div className="flex h-fit mt-auto mb-1 gap-2">
              <button className="py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2">Edit</button>
              <button className="py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2">Preview</button>
            </div>
          </div>
          <div className="ml-16 h-full bg-white flex flex-col rounded-md border border-gray-200 overflow-hidden">
            {
              coverImg ?
              <div className="h-[320px] flex relative">
                <img src={coverImg} className="object-cover"/>
                <label htmlFor="upload-cover-img" className="absolute bottom-8 font-medium left-10 rounded-md py-2 px-4 bg-gray-300 hover:bg-gray-400 cursor-pointer">
                  Add a cover image
                  <input id="upload-cover-img" type='file' accept='.png, .jpg, .jpeg' hidden />
                </label>
              </div>
              :
              <label htmlFor="upload-cover-img" className="w-fit mx-10 mt-10 font-medium rounded-md py-2 px-4 bg-gray-300 hover:bg-gray-400 cursor-pointer">
                Add a cover image
                <input id="upload-cover-img" type='file' accept='.png, .jpg, .jpeg' hidden />
              </label>
            }
            <div className="flex flex-col gap-4 py-4 px-10">
              <textarea 
                placeholder="New post title here..."
                rows={1}
                className="text-4xl font-bold outline-none border-none h-12 resize-none leading-tight placeholder:text-gray-800 focus:placeholder:opacity-60"
                onKeyDown={handleTitleKeyDown}
                onChange={handleTitleChange}
              />
              <div className="flex gap-2 items-center flex-wrap">
                {
                  tags.map((tag, index) => {
                    return (
                      <div key={index} className={`${randomColors[tag.color]}`}>
                        {tag.value}
                        <button onClick={() => handleDeleteTagBtn(index)}>
                          <IoClose className="h-6 w-6 hover:fill-red-600 cursor-pointer" />
                        </button>
                      </div>
                    )
                  })
                }
                {
                  addTagInput &&
                  <div className="relative flex items-center gap-2 w-1/3">
                    <input className="input-add-tag" onKeyDown={handleTagKeyDown}/>
                    <MdNumbers className="w-6 h-6 absolute left-1" />
                    <IoClose onClick={() => setAddTagInput(false)} className="w-6 h-6 absolute right-1 cursor-pointer hover:fill-red-600" />
                  </div>
                }
                {
                  tags.length < 4 
                  &&
                  <>
                    <button onClick={() => setAddTagInput(!addTagInput)} className={`py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:underline hover:underline-offset-2 ${addTagInput ? 'hidden' : 'block'}`}>
                      Add tag
                    </button>
                    <span className="text-gray-600">
                      {tags.length === 0 ? 'Add up to 4 tags...' : 'Add another...'}
                    </span>
                  </>
                }
              </div>
            </div>
          </div>
          <div className="ml-16 flex gap-2 my-6">
            <button className='py-2 px-4 rounded-md text-white bg-indigo-600 hover:bg-indigo-700 hover:underline hover:underline-offset-2'>
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
  )
}

export default EditorPage
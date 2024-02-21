import { useState } from "react";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { MdNumbers } from "react-icons/md";
import { generateRandomColor, randomColors } from "@/common/generateRandomColor";

const EditorPage = () => {
  const [addTagInput, setAddTagInput] = useState(false);
  const [tags, setTags] = useState([]);
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
              <button className="py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600">Edit</button>
              <button className="py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600">Preview</button>
            </div>
          </div>
          <div className="ml-16 h-full bg-white flex flex-col rounded-md border border-gray-200 overflow-hidden">
            <div className="h-[320px] bg-blue-400 flex">
              <img src="https://images.unsplash.com/photo-1500964757637-c85e8a162699?q=80&w=2103&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="object-cover"/>
            </div>
            <div className="flex flex-col gap-4 py-8 px-10">
              <textarea 
                placeholder="New post title here..."
                rows={1}
                className="text-4xl font-bold outline-none border-none h-12 resize-none leading-tight placeholder:text-gray-800 focus:placeholder:opacity-60"
                onKeyDown={handleTitleKeyDown}
                onChange={handleTitleChange}
              />
              <div className="flex gap-2 items-center">
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
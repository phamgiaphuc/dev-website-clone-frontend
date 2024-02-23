import { generateRandomColor, randomColors } from "@/common/generateRandomColor";
import { blogUploadImg } from "@/redux/blogApi";
import { useContext, useState } from "react";
import { MdNumbers } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { EditorContext } from "@/pages/user/EditorPage";
import Editor from "./Editor";
import { UserContext } from "../context/UserContextProvider";

const EditorComponent = () => {
  const { blog, blog: { cover_image, title, tags }, setBlog } = useContext(EditorContext);
  const { axiosJWT } = useContext(UserContext);
  const [addTagInput, setAddTagInput] = useState(false);

  const handleTitleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  const handleTitleChange = (event) => {
    let input = event.target;
    input.style.height = 'auto';
    input.style.height = input.scrollHeight + 'px';
    setBlog({
      ...blog,
      title: input.value
    })
  }

  const handleTagKeyDown = (event) => {
    if (event.keyCode === 13) {
      const color = generateRandomColor();
      const tag = {
        value: `#${event.target.value}`,
        color
      }
      setBlog({
        ...blog,
        tags: [...tags, tag]
      })
      setAddTagInput(false);
    }
  }

  const handleDeleteTagBtn = (value) => {
    setBlog({
      ...blog,
      tags: tags.filter((_, index) => index !== value)
    })
  }

  const handleUploadCoverImg = async (event) => {
    event.preventDefault();
    setBlog({
      ...blog,
      cover_image: await blogUploadImg(axiosJWT, event.target.files[0])
    });
  }

  return (
    <div className="ml-16 h-full bg-white flex flex-col rounded-md border border-gray-200 overflow-hidden">
      {
        cover_image ?
        <div className="h-[320px] flex relative">
          <img src={cover_image} className="object-cover"/>
          <label htmlFor="upload-cover-img" className="absolute bottom-8 font-medium left-10 rounded-md py-2 px-4 bg-gray-300 hover:bg-gray-400 cursor-pointer">
            Add a cover image
            <input id="upload-cover-img" type='file' accept='.png, .jpg, .jpeg' hidden onChange={handleUploadCoverImg} />
          </label>
        </div>
        :
        <label htmlFor="upload-cover-img" className="w-fit mx-10 mt-10 font-medium rounded-md py-2 px-4 bg-gray-300 hover:bg-gray-400 cursor-pointer">
          Add a cover image
          <input id="upload-cover-img" type='file' accept='.png, .jpg, .jpeg' hidden onChange={handleUploadCoverImg} />
        </label>
      }
      <div className="flex flex-col gap-4 py-6 px-10">
        <textarea 
          placeholder="New post title here..."
          rows={1}
          className="text-5xl font-bold outline-none border-none h-fit leading-tight resize-none text-pretty placeholder:text-gray-800 focus:placeholder:opacity-60"
          onKeyDown={handleTitleKeyDown}
          onChange={handleTitleChange}
          value={title}
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
        <Editor />
      </div>
    </div>
  )
}

export default EditorComponent
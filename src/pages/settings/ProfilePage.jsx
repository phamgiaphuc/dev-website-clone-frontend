import { createAxios } from "@/common/axiosJWT";
import { emailRegex } from "@/constants/regexVars";
import { userUpdateProfile, userUploadProfileImg } from "@/redux/userApi";
import { useRef, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux"

const ProfilePage = () => {
  const user = useSelector((state) => state.user.data);
  const profileImgSpanRef = useRef();
  const inputColorRef = useRef();
  const dispatch = useDispatch();
  const [color, setColor] = useState(user.profile?.branding_color);
  const [imgUrl, setImgUrl] = useState(user.profile?.profile_img);
  const [bio, setBio] = useState(user.profile?.bio);
  const [colorPicker, setColorPicker] = useState(false);
  const axiosJWT = createAxios(user, dispatch);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: {
      email: user.email,
      fullname: user.profile?.fullname,
      username: user.profile?.username,
      youtube: user.profile?.social_links?.youtube,
      instagram: user.profile?.social_links?.instagram,
      facebook: user.profile?.social_links?.facebook,
      github: user.profile?.social_links?.github,
      twitter: user.profile?.social_links?.twitter,
      website: user.profile?.social_links?.website
    }
  });

  const handleUploadFile = async (event) => {
    event.preventDefault();
    await userUploadProfileImg(profileImgSpanRef, setImgUrl, axiosJWT, event)
  }

  const handleColorChange = (color) => {
    setColor(color);
    inputColorRef.current.value = color;
  }

  const handleInputColorChange = (event) => {
    inputColorRef.current.value = event.target.value;
    setColor(event.target.value);
  }

  const onSubmitForm = async (data) => {
    const { email, fullname, username, ...rest } = data;
    const userData = {
      email,
      profile: {
        fullname,
        username,
        bio,
        social_links: {
          ...rest
        },
        profile_img: imgUrl,
        branding_color: color
      }
    };
    await userUpdateProfile(user, userData, dispatch, axiosJWT);
    setColorPicker(false);
  }

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} className="flex flex-col gap-4">
      <div className="w-full p-4 rounded-md border border-gray-200 bg-white flex flex-col">
        <span className="mb-4 text-xl font-semibold">User</span>
        <span className="font-medium mb-1">Full name</span>
        <input type="text" {...register('fullname', {
          required: 'Full name is required'
        })} placeholder={'Full name'} className="mb-4"/>
        <span className="font-medium mb-1">Email</span>
        <input type="email" {...register('email', {
          required: 'Email is required',
          pattern: {
            value: emailRegex,
            message: 'Invalid email'
          }
        })} placeholder='example@mail.com' defaultValue={user.email} className="mb-4"/>
        <span className="font-medium mb-1">Username</span>
        <input type="text" {...register('username', {
          required: 'Username is required'
        })}  placeholder='example@mail.com' defaultValue={user.profile?.username} className="mb-4"/>
        <span className="font-medium mb-1">Profile image</span>
        <div className="flex items-center gap-4">
          <img src={imgUrl} alt={user.profile?.profile_img} className="w-16 h-16 rounded-full border border-gray-300"/>
          <div className="flex-1 gap-2 flex items-center rounded-md border border-gray-300 h-full p-4">
            <div>
              <label htmlFor="upload-file" className="px-4 py-2 bg-gray-300 font-medium hover:bg-gray-400 rounded-md cursor-pointer">
                Choose file
                <input id="upload-file" type='file' accept='.png, .jpg, .jpeg' hidden onChange={handleUploadFile}/>
              </label>
            </div>
            <span ref={profileImgSpanRef}>No file choosen</span>
          </div>
        </div>
      </div>
      <div className="w-full p-4 rounded-md border border-gray-200 bg-white flex flex-col">
        <span className="mb-4 text-xl font-semibold">Basic</span>
        <span className="font-medium mb-1">Bio</span>
        <textarea placeholder="A short bio" maxLength={250} onChange={(event) => setBio(event.target.value)} className="mb-1 text-area-form" defaultValue={user.profile?.bio}></textarea>
        <div className="flex text-sm text-gray-600 justify-end mb-2">
          <span>{bio.length}</span>/250
        </div>
        <span className="font-medium mb-1">Youtube</span>
        <input type="url" {...register('youtube')} placeholder={'Youtube'} defaultValue={user.profile?.social_links?.youtube} maxLength={100} className="mb-1"/>
        <div className="flex text-sm text-gray-600 justify-end mb-2">
          <span>{watch('youtube') ? watch('youtube').length : 0}</span>/100
        </div>
        <span className="font-medium mb-1">Instagram</span>
        <input type="url" {...register('instagram')} placeholder={'Instagram'} defaultValue={user.profile?.social_links?.instagram} className="mb-1"/>
        <div className="flex text-sm text-gray-600 justify-end mb-2">
          <span>{watch('instagram') ? watch('instagram').length : 0}</span>/100
        </div>
        <span className="font-medium mb-1">Facebook</span>
        <input type="url" {...register('facebook')} placeholder={'Facebook'} defaultValue={user.profile?.social_links?.facebook} className="mb-1"/>
        <div className="flex text-sm text-gray-600 justify-end mb-2">
          <span>{watch('facebook') ? watch('facebook').length : 0}</span>/100
        </div>
        <span className="font-medium mb-1">Twitter</span>
        <input type="url" {...register('twitter')} placeholder={'Twitter'} defaultValue={user.profile?.social_links?.twitter} className="mb-1"/>
        <div className="flex text-sm text-gray-600 justify-end mb-2">
          <span>{watch('twitter') ? watch('twitter').length : 0}</span>/100
        </div>
        <span className="font-medium mb-1">Github</span>
        <input type="url" {...register('github')} placeholder={'Github'} defaultValue={user.profile?.social_links?.github} className="mb-1"/>
        <div className="flex text-sm text-gray-600 justify-end mb-2">
          <span>{watch('github') ? watch('github').length : 0}</span>/100
        </div>
        <span className="font-medium mb-1">Website</span>
        <input type="url" {...register('website')} placeholder={'Website'} defaultValue={user.profile?.social_links?.website} className="mb-1"/>
        <div className="flex text-sm text-gray-600 justify-end mb-2">
          <span>{watch('website') ? watch('website').length : 0}</span>/100
        </div>
      </div>
      <div className="w-full p-4 rounded-md border border-gray-200 bg-white flex flex-col">
        <span className="mb-4 text-xl font-semibold">Branding</span>
        <div className="flex flex-col mb-1">
          <span className="font-medium">Brand color</span>
          <span className="text-sm text-gray-600">Used for backgrounds, borders etc.</span>
        </div>
        <div className="relative w-1/2">
          <input maxLength={7} ref={inputColorRef} placeholder="Color" defaultValue={color} onChange={handleInputColorChange} className="pr-2 py-1.5 w-full rounded-md ring-1 ring-gray-300 placeholder-gray-600 focus:ring-2 hover:ring-gray-500 focus:outline-none focus:ring-indigo-600 pl-10"/>
          <div onClick={() => setColorPicker(!colorPicker)} style={{ backgroundColor: color }} className={`absolute h-8 left-0.5 top-0.5 w-8 rounded-md cursor-pointer`}></div>
          {
            colorPicker &&
            <HexColorPicker color={color} onChange={handleColorChange} className="absolute top-1"/>
          }
        </div>
      </div>
      <div className="w-full p-4 rounded-md border border-gray-200 bg-white">
        <button type="submit" className="py-2 px-4 w-full bg-indigo-600 text-white rounded-md hover:underline hover:underline-offset-2">Save profile information</button>
      </div>
    </form>
  )
}

export default ProfilePage
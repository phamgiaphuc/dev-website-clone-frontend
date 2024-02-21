import toast from "react-hot-toast";
import { userUpdate } from "./userSlice";

export const userUpdateProfile = async (user, userData, dispatch, axiosJWT) => {
  const loadingToast = toast.loading('Updating');
  try {
    const { data } = await axiosJWT.post('/v1/users/update-profile', userData);
    const updatedUser = {
      ...user,
      email: data?.email,
      profile: data?.profile
    };
    dispatch(userUpdate(updatedUser));
    toast.dismiss(loadingToast);
    setTimeout(() => {
      window.scrollTo(0, 0);
      toast.success('Updated success 👍');
    }, 500);
  } catch (error) {
    console.log(error);
    toast.dismiss(loadingToast);
  }
}

export const userUploadProfileImg = async (profileImgSpanRef, setImgUrl, axiosJWT) => {
  const loadingToast = toast.loading('Uploading image');
    let img = event.target.files[0];
    if (img === '') {
      toast.dismiss(loadingToast);
      return toast.error('No images found');
    }
    const formData = new FormData();
    formData.append('profile_img', img);
    try {
      const { data } = await axiosJWT.post('/v1/users/upload-profile-img', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      setImgUrl(data?.url);
      profileImgSpanRef.current.innerText = img.name;
      toast.dismiss(loadingToast);
      toast.success('Uploaded 👍');
    } catch (error) {
      console.log(error);
      toast.dismiss(loadingToast);
      toast.error(error);
    }
}
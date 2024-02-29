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
    toast.success('Updated success 👍');
  } catch (error) {
    const { response: { data }} = error
    toast.dismiss(loadingToast);
    toast.error(data.error);
  }
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 500);
}

export const userUploadProfileImg = async (profileImgSpanRef, setImgUrl, axiosJWT, event) => {
  const loadingToast = toast.loading('Uploading image');
  let img = event.target.files[0];
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
    const { response: { data }} = error
    toast.dismiss(loadingToast);
    toast.error(data.error);
  }
}
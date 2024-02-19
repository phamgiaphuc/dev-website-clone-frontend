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
import toast from "react-hot-toast"

export const blogUploadImg = async (axiosJWT, img) => {
  const loadingToast = toast.loading('Uploading');
  const formData = new FormData();
  formData.append('blog_img', img);
  try {
    const { data } = await axiosJWT.post('/v1/blogs/upload-img', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    toast.dismiss(loadingToast);
    toast.success('Uploaded 👍');
    return data?.url;
  } catch (error) {
    console.log(error);
    toast.dismiss(loadingToast);
    toast.error(error);
  }
}

export const createNewBlog = async (axiosJWT, blogData, navigate, username, setPublished, action) => {
  const loadingToast = toast.loading(action === 'publish' ? 'Publishing' : 'Saving');
  try {
    setPublished(true);
    const { data } = await axiosJWT.post('/v1/blogs/create', blogData);
    toast.dismiss(loadingToast);
    toast.success(action === 'publish' ? 'Published 👍' : 'Saved 👍');
    navigate(action === 'publish' ? `/${username}/${data._id}` : `/dashboard`);
  } catch (error) {
    setPublished(false);
    console.log(error);
    toast.dismiss(loadingToast);
    toast.error(error);
  }
}
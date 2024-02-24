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
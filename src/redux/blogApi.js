import toast from "react-hot-toast"

export const blogUploadCoverImg = async (setBlog, blog, axiosJWT, event) => {
  const loadingToast = toast.loading('Uploading');
  let img = event.target.files[0];
  const formData = new FormData();
  formData.append('blog_cover_img', img);
  try {
    const { data } = await axiosJWT.post('/v1/blogs/upload-cover-img', formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });
    setBlog({
      ...blog,
      cover_image: data?.url
    })
    toast.dismiss(loadingToast);
    toast.success('Uploaded 👍');
  } catch (error) {
    console.log(error);
    toast.dismiss(loadingToast);
    toast.error(error);
  }
}
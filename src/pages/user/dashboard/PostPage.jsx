import { UserContext } from "@/components/context/UserContextProvider";
import { useContext, useEffect, useState } from "react"
import DraftPostCard from "@/components/cards/DraftPostCard";
import PublishPostCard from "@/components/cards/PublishPostCard";
import { useSelector } from "react-redux";
import ReactPaginate from "react-paginate";
import { DashboardContext } from "@/layouts/DashboardLayout";

const PostPage = () => {
  const { axiosJWT } = useContext(UserContext);
  const { profile: { username }} = useSelector((state) => state.user.data);
  const { totalBlogs } = useContext(DashboardContext);
  const pageCount = totalBlogs ? Math.ceil(totalBlogs / 2) : 0;
  const [currentPage, setCurrentPage] = useState(0);
  const [sort, setSort] = useState('desc');
  const [blogs, setBlogs] = useState();

  useEffect(() => {
    axiosJWT.get(`/v1/blogs/dashboard?page=${currentPage}&sort=${sort}`)
      .then(({data}) => {
        setBlogs(data);
      })
      .catch((error) => {
        console.log(error);
      })
  }, [axiosJWT, currentPage, sort]);

  const handlePageClick = ({selected}) => {
    setCurrentPage(selected)
  };

  const handleSelectSort = (event) => {
    setSort(event.target.value === 'Oldest blogs' ? 'asc' : 'desc');
  }
  
  return (
    blogs ?
    <div className="flex flex-col gap-2">
      <div className="flex justify-between">
        <span className="text-xl font-semibold">Posts</span>
        <select onChange={handleSelectSort} className="p-2 rounded-md border border-gray-200">
          <option>Newest blogs</option>
          <option>Oldest blogs</option>
        </select>
      </div>
      {
        blogs.map((blog, index) => {
          if (blog.draft && !blog.publish) {
            return <DraftPostCard key={index} blog={blog} username={username}/>
          } else {
            return <PublishPostCard key={index} blog={blog} username={username}/>
          }
        })
      }
      <div className="flex justify-center">
        <ReactPaginate 
          breakLabel={
            <span className="mr-2">...</span>
          }
          nextLabel={
            <button className="p-2 border border-gray-200 bg-white rounded-md hover:border-gray-400">Next</button>
          }
          previousLabel={
            <button className="mr-2 p-2 border border-gray-200 bg-white rounded-md hover:border-gray-400">Previous</button>
          }
          pageCount={pageCount}
          renderOnZeroPageCount={null}
          containerClassName="flex items-center justify-center"
          pageClassName="w-8 h-8 mr-2 flex justify-center items-center rounded-md hover:bg-gray-300 hover:text-black cursor-pointer"
          activeClassName="bg-indigo-600 text-white"
          onPageChange={handlePageClick}
        />
      </div>
    </div>
    :
    <div className="flex items-center justify-center border text-lg border-gray-200 bg-white">
      You don&apos;t have any posts yet...
    </div>
  )
}

export default PostPage
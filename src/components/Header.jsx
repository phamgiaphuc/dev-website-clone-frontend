import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";

const Header = () => {
  return (
    <div className="bg-white border-b border-gray-200 fixed w-full">
      <header className="container flex justify-between items-center mx-auto h-14 font-light">
        <div className="flex items-center">
          <Link to={'/'}> 
            <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" alt="Dev Logo" className="h-10 w-12" />
          </Link>
          <div className='mx-4 w-96 relative'>
            <input type="text" placeholder='Search...' />
            <div className="flex items-center absolute right-0 bottom-0 p-1.5 bg-white rounded-md hover:text-indigo-600 hover:bg-gray-100 cursor-pointer">
              <IoSearchOutline className="w-6 h-6"/>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-center">
          <Link to={'/signin'} className='py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
            Sign in
          </Link>
          <Link to={'/signup'} className='py-2 px-4 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white hover:underline hover:underline-offset-2'>
            Create account
          </Link>
        </div>
      </header>
    </div>
  )
}

export default Header
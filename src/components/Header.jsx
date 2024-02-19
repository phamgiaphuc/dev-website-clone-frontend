import { Link } from 'react-router-dom'
import { IoSearchOutline } from "react-icons/io5";
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { FaRegBell } from "react-icons/fa";
import UserNavigation from './UserNavigation';
import { FaBars } from "react-icons/fa";

const Header = () => {
  const { isSignedIn, data } = useSelector((state) => state.user);
  const [userNav, setUserNav] = useState(false);
  const handleBlur = () => {
    setTimeout(() => {
      setUserNav(false);
    }, 200)
  }
  return (
    <div className="bg-white border-b border-gray-200 fixed z-20 w-full">
      <header className="container flex justify-between items-center mx-auto h-14 font-light">
        <div className="flex items-center ml-2 xl:ml-0">
          <div className='mr-2 p-1.5 hover:text-indigo-600 hover:bg-gray-100 cursor-pointer rounded-md md:hidden'>
            <FaBars className='h-6 w-6' />
          </div>
          <Link to={'/'}> 
            <img src="https://dev-to-uploads.s3.amazonaws.com/uploads/logos/resized_logo_UQww2soKuUsjaOGNB38o.png" alt="Dev Logo" className="h-10 w-13" />
          </Link>
          <div className='mx-4 w-96 relative hidden md:block'>
            <input type="text" placeholder='Search...' />
            <div className="items-center absolute right-0 bottom-0 p-1.5 bg-white rounded-md hover:text-indigo-600 hover:bg-gray-100 cursor-pointer flex">
              <IoSearchOutline className="w-6 h-6"/>
            </div>
          </div>
        </div>
        {
          isSignedIn ?
          <div className="relative flex items-center gap-4 text-center mr-2 xl:mr-0">
            <Link to={'/new'} className='py-2 px-4 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white hover:underline hover:underline-offset-2'>
              Create post
            </Link>
            <Link to={'/notifications'} className='py-2 px-2 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
              <FaRegBell className='h-6 w-6'/>
            </Link>
            <button onClick={() => setUserNav(!userNav)} onBlur={handleBlur} className='ring-1 ring-gray-400 overflow-hidden rounded-full hover:ring-indigo-600'>
              <img src={data.profile?.profile_img} className='w-10 h-10 object-cover' />
            </button>
            {
              userNav ?
              <UserNavigation />
              :
              <></>
            }
          </div>
          :
          <div className="flex items-center gap-2 md:gap-4 text-center mr-2 xl:mr-0">
            <div className='p-1.5 hover:text-indigo-600 hover:bg-gray-100 cursor-pointer rounded-md md:hidden'>
              <IoSearchOutline className="w-6 h-6"/>
            </div>
            <Link to={'/signin'} className='py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2 hidden md:block'>
              Sign in
            </Link>
            <Link to={'/signup'} className='py-2 px-4 border border-indigo-600 rounded-md text-indigo-600 hover:bg-indigo-600 hover:text-white hover:underline hover:underline-offset-2'>
              Create account
            </Link>
          </div>
        }
      </header>
    </div>
  )
}

export default Header
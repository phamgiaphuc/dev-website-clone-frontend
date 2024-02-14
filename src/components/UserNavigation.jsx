import { Link } from "react-router-dom"
import PropTypes from 'prop-types';
import { authSignOut } from "@/redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const UserNavigation = () => {
  const { profile } = useSelector((state) => state.auth.login.currentUser);
  const dispatch = useDispatch();
  const handleSignOutBtn = async () => {
    await authSignOut(dispatch);
  }
  return (
    <div className='bg-white absolute border right-0 top-11 border-gray-200 rounded-md duration-200'>
      <div className='p-2 w-64 flex flex-col text-left'>
        <Link to={'/' + profile?.username} className='flex flex-col mb-2 py-2 px-4 rounded-md group hover:text-indigo-600 hover:bg-indigo-100 hover:underline hover:underline-offset-2'>
          <span className='font-medium'>{profile?.fullname}</span>
          <span className='text-sm text-gray-500 group-hover:text-indigo-600'>
            @{profile?.username}
          </span>
        </Link>
        <div className='border-y border-gray-200 flex flex-col'>
          <Link to={'/dashboard'} className='py-2 px-4 mt-2 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
            Dashboard
          </Link>
          <Link to={'/new'} className='py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
            Create post
          </Link>
          <Link to={'/readinglist'} className='py-2 px-4 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
            Reading list
          </Link>
          <Link to={'/settings'} className='py-2 px-4 mb-2 rounded-md hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
            Settings
          </Link>
        </div>
        <button onClick={handleSignOutBtn} className='py-2 px-4 rounded-md w-full text-left mt-2 hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
          Sign out
        </button>
      </div>
    </div>
  )
}

UserNavigation.propTypes = {
  username: PropTypes.string.isRequired,
  fullname: PropTypes.string.isRequired
};

export default UserNavigation
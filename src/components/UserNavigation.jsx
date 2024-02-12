import { UserContext } from '@/common/UserContext';
import { removeFromSession } from '@/common/session';
import { SERVER_BASE_URL } from '@/constants/vars';
import axios from 'axios';
import { useContext } from 'react'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const UserNavigation = () => {
  const { userAuth: { profile }, setUserAuth} = useContext(UserContext);

  const signOutUser = async () => {
    try {
      const { data } = await axios.get(SERVER_BASE_URL + '/v1/users/signout');
      if (data) {
        removeFromSession('user_at');
        setUserAuth({ access_token: null });
        toast.success('Sign out');
      }
    } catch(error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }

  return (
    <div className='bg-white absolute border right-0 top-11 border-gray-200 rounded-md duration-200'>
      <div className='p-2 w-64 flex flex-col text-left'>
        <Link to={'/' + profile.username} className='flex flex-col mb-2 py-2 px-4 rounded-md group hover:text-indigo-600 hover:bg-indigo-100 hover:underline hover:underline-offset-2'>
          <span className='font-medium'>{profile.fullname}</span>
          <span className='text-sm text-gray-400 group-hover:text-indigo-600'>
            @{profile.username}
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
        <button onClick={signOutUser} className='py-2 px-4 rounded-md text-left mt-2 hover:bg-indigo-100 hover:text-indigo-600 hover:underline hover:underline-offset-2'>
          Sign out
        </button>
      </div>
    </div>
  )
}

export default UserNavigation
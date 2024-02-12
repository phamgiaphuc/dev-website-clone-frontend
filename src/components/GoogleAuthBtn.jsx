/* eslint-disable react/prop-types */
import { authWithGoogle } from "@/common/firebase";
import { storeInSession } from "@/common/session";
import { SERVER_BASE_URL } from "@/constants/vars";
import axios from "axios";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

const GoogleAuthBtn = ({setUserAuth}) => {
  const handleGoogleAuth = (event) => {
    event.preventDefault();
    authWithGoogle()
      .then((user) => {
        axios.post(SERVER_BASE_URL + '/v1/users/google-auth', { token: user.accessToken })
          .then(({data}) => {
            storeInSession('user_rt', JSON.stringify(data));
            setUserAuth(data);
            toast.success('Signed in 👍');
          })
      })
      .catch((error) => {
        toast.error('Trouble sign in through Google');
        return console.log(error);
      });
  }

  return (
    <button onClick={handleGoogleAuth} className="flex items-center justify-center gap-2 py-2 px-4 rounded-md mt-4 bg-white border border-black font-medium text-center w-full hover:bg-gray-200 hover:underline hover:underline-offset-2">
      <FcGoogle className='h-6 w-6' />
      Sign in with Google
    </button>
  )
}

export default GoogleAuthBtn
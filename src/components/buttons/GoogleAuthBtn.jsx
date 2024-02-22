import { authGoogleSignIn } from "@/redux/authApi";
import { FcGoogle } from "react-icons/fc";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const GoogleAuthBtn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async (event) => {
    event.preventDefault();
    await authGoogleSignIn(dispatch, navigate);
  }

  return (
    <button onClick={handleGoogleAuth} className="flex items-center justify-center gap-2 py-2 px-4 rounded-md mt-4 bg-white border border-black font-medium text-center w-full hover:bg-gray-200 hover:underline hover:underline-offset-2">
      <FcGoogle className='h-6 w-6' />
      Sign in with Google
    </button>
  )
}

export default GoogleAuthBtn
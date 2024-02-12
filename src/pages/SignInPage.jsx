import { Link, Navigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { emailRegex, passwordRegex } from '@/common/regexVars';
import { useContext, useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { SERVER_BASE_URL } from '@/constants/vars';
import axios from 'axios';
import { storeInSession } from '@/common/session';
import { UserContext } from '@/common/UserContext';

const SignInPage = () => {

  const { register, handleSubmit } = useForm();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [redirect, setRedirect] = useState(null);
  const { userAuth: { access_token }, setUserAuth } = useContext(UserContext);

  const onSubmitForm = async (credentials) => {
    const loadingToast = toast.loading('Signing in...');
    try {
      const { data } = await axios.post(SERVER_BASE_URL + `/v1/users/signin`, credentials);
      if (data?.message) {
        toast.dismiss(loadingToast);
        return setRedirect('/verification/' + data?.id);
      }
      if (data?.access_token) {
        storeInSession('user_at', JSON.stringify(data));
        setUserAuth(data);
        toast.dismiss(loadingToast);
        toast.success('Signed in 👍');
        return setRedirect('/');
      }
    } catch ({ response: { data }}) {
      console.log(data.error);
      toast.dismiss(loadingToast);
      toast.error(data.error);
    }
  }

  const onErrors = (errors) => {
    const { email, password } = errors;
    if (email) {
      toast.error(email.message);
    }
    if (password) {
      toast.error(password.message);
    }
  }
  if (redirect) {
    return <Navigate to={redirect} />
  }
  
  return (
    access_token ?
    <Navigate to={'/'} />
    :
    <div className="-mt-14 flex items-center justify-center min-h-screen font-light">
      <div className="max-w-md w-full">
        <form onSubmit={handleSubmit(onSubmitForm, onErrors)}>
          <div className="flex flex-col text-center gap-1">
            <span className="text-2xl font-bold">Sign in page</span>
            <span>Enter your credentials to sign in</span>
          </div>
          <div className="flex flex-col mt-4 gap-1">
            <span className="font-medium">Email</span>
            <input {...register('email', {
              required: 'Email is required',
              pattern: {
                value: emailRegex,
                message: 'Invalid email'
              }
            })} type="email" placeholder='example@mail.com'/>
          </div>
          <div className="relative flex flex-col mt-4 gap-1">
            <span className="font-medium">Password</span>
            <input {...register('password', {
              required: 'Password is required',
              pattern: {
                value: passwordRegex,
                message: 'Invalid password'
              }
            })} type={passwordVisible ? 'text' : 'password'} placeholder='Password'/>
            <div onClick={() => setPasswordVisible(!passwordVisible)} className="flex items-center absolute right-2 bottom-2 bg-white rounded-md hover:text-indigo-600 cursor-pointer">
              {
                passwordVisible ? 
                <IoEyeOutline className="w-5 h-5"/>
                :
                <IoEyeOffOutline className="w-5 h-5"/>
              }
            </div>
          </div>
          <button className="py-2 px-4 rounded-md mt-4 bg-indigo-600 font-semibold text-center text-white w-full hover:bg-indigo-700 hover:underline hover:underline-offset-2">
            Sign in
          </button>
          <div className="mt-4 text-center">
            <span>Do not have an account? </span>
            <Link to={'/signup'} className="text-indigo-600 hover:underline hover:underline-offset-2">Sign up</Link>
          </div>
          <div className="flex items-center mt-4">
            <div className="flex-grow border-t border-black"></div>
            <span className="flex-shrink mx-4 text-sm font-light">OR CONTINUE WITH</span>
            <div className="flex-grow border-t border-black"></div>
          </div>
          <button className="flex items-center justify-center gap-2 py-2 px-4 rounded-md mt-4 bg-white border border-black font-medium text-center w-full hover:bg-gray-200 hover:underline hover:underline-offset-2">
            <FcGoogle className='h-6 w-6' />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  )
}

export default SignInPage
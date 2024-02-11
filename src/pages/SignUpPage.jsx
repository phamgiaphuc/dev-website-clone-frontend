import { Link, Navigate } from 'react-router-dom'
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form';
import { emailRegex, passwordRegex } from '@/common/regexVars';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from 'react';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/constants/vars';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [redirect, setRedirect] = useState(null);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const onSubmitForm = async (data) => {
    let loadingToast = toast.loading('Registering...')
    const { data: { is_verified, id }} = await axios.post(SERVER_BASE_URL + '/v1/users/signup', data);
    if (is_verified === false) {
      toast.dismiss(loadingToast);
      let successToast = toast.success('Created 👍');
      setTimeout(() => {
        toast.dismiss(successToast);
        setRedirect('/verification/' + id);
      }, 2000);
    }
  }
  if (redirect) {
    return <Navigate to={redirect}/>
  }
  return (
    <div className="-mt-14 flex items-center justify-center min-h-screen font-light">
      <div className="max-w-md w-full">
        <form onSubmit={handleSubmit(onSubmitForm)}>
          <div className="flex flex-col text-center gap-1">
            <span className="text-2xl font-bold">Sign up page</span>
            <span>Enter your credentials to create account</span>
          </div>
          <div className="flex flex-col mt-4 gap-1">
            <span className="font-medium">Full name</span>
            <input {...register('fullname', {
              required: true,
              minLength: 3
            })} type="text" placeholder='Full name'/>
          </div>
          <div className="flex flex-col mt-4 gap-1">
            <span className="font-medium">Email</span>
            <input {...register('email', {
              required: true,
              pattern: {
                value: emailRegex,
                message: 'Invalid email'
              }
            })} type="email" placeholder='example@mail.com'/>
          </div>
          <div className="relative flex flex-col mt-4 gap-1">
            <span className="font-medium">Password</span>
            <input {...register('password', {
              required: true,
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
          <div className="flex flex-col mt-4 gap-1">
            <span className="font-medium">Password confirmation</span>
            <input {...register('confirm_password', {
              required: true,
              validate: (value) => {
                if (watch('password') !== value) return 'Passwords do not match'
              }
            })} type="password" placeholder='Password'/>
          </div>
          <button type='submit' className="py-2 px-4 rounded-md mt-4 bg-indigo-600 font-semibold text-center text-white w-full hover:bg-indigo-700 hover:underline hover:underline-offset-2">
            Sign up
          </button>
          <div className="mt-4 text-center">
            <span>Already have an account? </span>
            <Link to={'/signin'} className="text-indigo-600 hover:underline hover:underline-offset-2">Sign in</Link>
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

export default SignUpPage
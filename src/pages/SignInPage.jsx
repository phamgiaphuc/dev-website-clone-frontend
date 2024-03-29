import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { emailRegex, passwordRegex } from '@/constants/regexVars';
import { useState } from 'react';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import GoogleAuthBtn from '@/components/buttons/GoogleAuthBtn';
import { authSignIn } from '@/redux/authApi';
import { useDispatch } from 'react-redux';
import PageTransformMotion from '@/components/motions/PageTransformMotion';

const SignInPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitForm = async (credentials) => {
    await(authSignIn(credentials, dispatch, navigate));
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
  
  return (
    <PageTransformMotion>
      <div className="-mt-14 flex items-center justify-center min-h-screen font-light">
          <div className="max-w-lg w-full mx-4 md:mx-0">
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
                    message: 'Invalid password. Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase.'
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
              <button type='submit' className="py-2 px-4 rounded-md mt-4 bg-indigo-600 font-semibold text-center text-white w-full hover:bg-indigo-700 hover:underline hover:underline-offset-2">
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
              <GoogleAuthBtn />
            </form>
          </div>
      </div>
    </PageTransformMotion>
  )
}

export default SignInPage
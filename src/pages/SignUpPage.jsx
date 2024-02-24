import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { emailRegex, passwordRegex } from '@/constants/regexVars';
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { useState } from 'react';
import toast from 'react-hot-toast';
import GoogleAuthBtn from '@/components/buttons/GoogleAuthBtn';
import { authSignUp } from '@/redux/authApi';
import { useDispatch } from 'react-redux';

const SignUpPage = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const { register, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmitForm = async (credentials) => {
    await authSignUp(credentials, dispatch, navigate)
  }

  const onErrors = (errors) => {
    const { email, password, confirm_password } = errors;
    if (email) {
      toast.error(email.message);
    }
    if (password) {
      toast.error(password.message);
    }
    if (confirm_password) {
      toast.error(confirm_password.message);
    }
  }

  return (
    <div className="-mt-14 flex items-center justify-center min-h-screen font-light">
      <div className="max-w-lg w-full mx-4 md:mx-0">
        <form onSubmit={handleSubmit(onSubmitForm, onErrors)}>
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
              required: {
                value: true,
                message: 'Email is missing'
              },
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
          <div className="flex flex-col mt-4 gap-1">
            <span className="font-medium">Password confirmation</span>
            <input {...register('confirm_password', {
              required: true,
              validate: (value) => {
                if (watch('password') !== value) { 
                  return 'Passwords do not match'
                }
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
          <GoogleAuthBtn/>
        </form>
      </div>
    </div>
  )
}

export default SignUpPage
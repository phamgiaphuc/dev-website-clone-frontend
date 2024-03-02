import { UserContext } from "@/components/context/UserContextProvider";
import { userDeleteAccount, userResetPassword } from "@/redux/userApi";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { IoClose } from "react-icons/io5";

const AccountPage = () => {
  const user = useSelector((state) => state.user.data);
  const { axiosJWT } = useContext(UserContext);
  const dispatch = useDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const [isOpen, setIsOpen] = useState(false);

  const onSubmitForm = async (data) => {
    await userResetPassword(axiosJWT, data)
  }

  const onErrors = (errors) => {
    const { currentPassword, newPassword, confirmPassword } = errors;
    if (currentPassword) {
      toast.error(currentPassword.message);
    }
    if (newPassword) {
      toast.error(newPassword.message);
    }
    if (confirmPassword) {
      toast.error(confirmPassword.message);
    }
  }

  const handleDialogParentClick = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  }

  const handleDeleteAccountBtn = async (event) => {
    event.preventDefault();
    await userDeleteAccount(axiosJWT, dispatch);
  }

  return (
    <div className="flex flex-col gap-4">
      <form onSubmit={handleSubmit(onSubmitForm, onErrors)} className="p-6 flex flex-col rounded-md border border-gray-200 bg-white font-light">
        <span className="text-2xl font-semibold">Reset password</span>
        {
          user.google_auth ?
          <span className="text-sm text-gray-600 mb-4">Your account ({user.email}) is created with Google Auth. It is unable to reset the password.</span>
          :
          <span className="text-sm text-gray-600 mb-4">Reset the password for {user.email}</span>
        }
        <div className="relative flex flex-col gap-1 mb-4">
          <span className="font-medium">Current password <label className="text-sm italic">{user.google_auth && '(disabled)'}</label></span>
          <input {...register('currentPassword', {
            required: {
              value: true,
              message: 'Current password is missing'
            },
          })} type="password" defaultValue={''} className={`${user.google_auth && 'disabled:cursor-not-allowed'} ${errors.currentPassword && 'error'}`} disabled={user.google_auth ? true : false}/>
          { errors.currentPassword && <span role="alert" className="text-sm text-red-600">Current password is missing</span> }
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <span className="font-medium">New password <label className="text-sm italic">{user.google_auth && '(disabled)'}</label></span>
          <input {...register('newPassword', {
            required: {
              value: true,
              message: 'New password is missing'
            },
          })} type="password" defaultValue={''} className={`${user.google_auth && 'disabled:cursor-not-allowed'} ${errors.newPassword && 'error'}`} disabled={user.google_auth ? true : false}/>
          { errors.newPassword && <span role="alert" className="text-sm text-red-600">New password is missing</span> }
        </div>
        <div className="flex flex-col gap-1 mb-4">
          <span className="font-medium ">Confirm new password <label className="text-sm italic">{user.google_auth && '(disabled)'}</label></span>
          <input {...register('confirmPassword', {
            validate: (value) => {
              if (watch('newPassword') !== value) { 
                return 'New passwords do not match'
              }
            }
          })} type="password" defaultValue={''} className={`${user.google_auth && 'disabled:cursor-not-allowed'} ${errors.confirmPassword && 'error'}`} disabled={user.google_auth ? true : false}/>
          { errors.confirmPassword && <span role="alert" className="text-sm text-red-600">New passwords do not match</span> }
        </div>
        <button type="submit" className={`text-white bg-indigo-600 py-2 px-4 rounded-md w-fit hover:bg-indigo-700 hover:underline hover:underline-offset-2 ${user.google_auth ? 'disabled:cursor-not-allowed' : ''}`} disabled={user.google_auth ? true : false}>Set new password</button>
      </form>
      <div className="p-6 flex flex-col rounded-md border border-gray-200 bg-white font-light">
        <span className="text-2xl text-red-600 font-semibold mb-4">Danger Zone</span>
        <span className="font-medium text-lg">Delete account</span>
        <div className="flex flex-col mb-2">
          <span className="my-2">Deleting your account will:</span>
          <ul className="list-disc list-inside">
            <li>Delete your profile, along with your authentication associations. This does not include applications permissions. You will have to remove them yourself.</li>
            <li>Delete any and all content you have, such as articles, comments, or your reading list.</li>
            <li>Allow your username to become available to anyone.</li>
          </ul>
        </div>
        <button onClick={() => setIsOpen(true)} className={`text-white bg-red-600 py-2 px-4 rounded-md w-fit hover:bg-red-700 hover:underline hover:underline-offset-2`}>Delete account</button>
        <span className="mt-4">
          <Link className="text-indigo-600 hover:underline">Contact us</Link> if you have any questions.
        </span>
      </div>
      {
        isOpen &&
        <div onClick={handleDialogParentClick} id="dialog" className="fixed inset-0 z-30 flex justify-center items-center">
          <div className="bg-white p-6 rounded-md flex flex-col font-light gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xl font-semibold">Delete account</span>
              <IoClose onClick={() => setIsOpen(false)} className="w-6 h-6 hover:fill-red-600 cursor-pointer"/>
            </div>
            <span>Are you sure you want to delete your account ?</span>
            <div className="flex flex-col gap-2">
              <button onClick={handleDeleteAccountBtn} className="bg-red-600 text-white rounded-md py-2 px-4 hover:bg-red-700">Yes, delete account</button>
              <button onClick={() => setIsOpen(false)} className="rounded-md py-2 px-4 bg-gray-300 hover:bg-gray-400">No, go back</button>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default AccountPage
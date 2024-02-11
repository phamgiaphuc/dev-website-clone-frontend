import { SERVER_BASE_URL } from "@/constants/vars";
import axios from "axios";
import { useState } from "react"
import toast from "react-hot-toast";
import { Navigate, useParams } from "react-router";

const VerificationPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const [redirect, setRedirect] = useState(null);
  const onSubmitForm = async (event) => {
    event.preventDefault();
    try {
      const loadingToast = toast.loading('Verifying...');
      const { data } = await axios.post(SERVER_BASE_URL + `/v1/users/verification/${id}`, { code });
      if (data) {
        toast.dismiss(loadingToast);
        setRedirect('/')
      }
    } catch(error) {
      console.log(error.message);
      toast.error(error.message);
    }
  }
  if (redirect) {
    return <Navigate to={redirect} />
  }
  return (
    <div className="-mt-14 flex items-center justify-center min-h-screen font-light">
      <div className="max-w-md w-full">
        <form onSubmit={onSubmitForm}>
          <div className="flex flex-col text-center gap-1">
            <span className="text-2xl font-bold">Verification page</span>
            <span>Enter the code to verify your account</span>
          </div>
          <div className="flex flex-col mt-4 gap-1">
            <span className="font-medium">Verification code</span>
            <input onChange={(event) => setCode(event.target.value)} type="text" placeholder='Code'/>
          </div>
          {
            code.length >= 6 ?
            <button type="submit" className="py-2 px-4 rounded-md mt-4 bg-indigo-600 font-semibold text-center text-white w-full hover:bg-indigo-700 hover:underline hover:underline-offset-2">
              Send the code
            </button>
            :
            ''
          }
        </form>
      </div>
    </div>
  )
}

export default VerificationPage
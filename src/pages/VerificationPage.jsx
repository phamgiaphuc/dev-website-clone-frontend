import { authVerification } from "@/redux/apiRequest";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';

const VerificationPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onSubmitForm = async (event) => {
    event.preventDefault();
    await authVerification(id, code, dispatch, navigate);
  }
  
  return (
    <div className="-mt-14 flex items-center justify-center min-h-screen font-light">
      <div className="max-w-md w-full">
        <form onSubmit={onSubmitForm}>
          <div className="flex flex-col text-center gap-1">
            <span className="text-2xl font-bold">Verification page</span>
            <span>The code is sent to your mail.</span>
          </div>
          <div className="flex flex-col mt-4 gap-1">
            <span className="font-medium">Enter the code to verify your account</span>
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
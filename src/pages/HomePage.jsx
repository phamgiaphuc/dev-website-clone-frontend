import { createAxios } from "@/common/axiosJWT";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const [ data, setData ] = useState('');
  let axiosJWT = createAxios(user?.data, dispatch); 

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axiosJWT.get('/v1/users', {
        headers: {
          'Authorization': 'Bearer ' + user.data?.accessToken
        }
      });
      setData(data);
    }

    getAllUsers();
  }, []);

  if (!user?.isAuthenticated) {
    return <Navigate to={'/signin'} />
  }

  return (
    <div>
      {data?.message}
    </div>
  )
}

export default HomePage
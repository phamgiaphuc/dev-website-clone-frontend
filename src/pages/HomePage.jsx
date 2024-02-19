/* eslint-disable react-hooks/exhaustive-deps */
import { createAxios } from "@/common/axiosJWT";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [ data, setData ] = useState('');
  let axiosJWT = createAxios(user?.data, dispatch); 

  useEffect(() => {
    const getAllUsers = async () => {
      const { data } = await axiosJWT.get('/v1/users');
      setData(data);
    }
    if (user.data) {
      getAllUsers();
      if (!user?.isAuthenticated) {
        return <Navigate to={'/signin'} />
      }
    }
  }, []);

  return (
    <div>
      {data?.message}
    </div>
  )
}

export default HomePage
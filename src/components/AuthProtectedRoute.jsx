import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthProtectedRoute = () => {
  const { isSignedIn } = useSelector((state) => state.auth.user);
  let location = useLocation();
  if (isSignedIn) {
    return <Navigate to={'/'} state={{from: location}} replace/>
  }
  return <Outlet />;
}

export default AuthProtectedRoute
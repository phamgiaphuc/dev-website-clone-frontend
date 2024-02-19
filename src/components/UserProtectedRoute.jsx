import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const UserProtectedRoute = () => {
  const { isAuthenticated } = useSelector((state) => state.user);
  let location = useLocation();
  if (!isAuthenticated) {
    return <Navigate to={'/signin'} state={{from: location}} replace/>
  }
  return <Outlet />;
}

export default UserProtectedRoute
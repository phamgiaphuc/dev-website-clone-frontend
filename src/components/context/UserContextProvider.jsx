import { createAxios } from '@/common/axiosJWT';
import { createContext } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
  const user = useSelector((state) => state.user.data);
  const dispatch = useDispatch();
  const axiosJWT = createAxios(user, dispatch);

  return (
    <UserContext.Provider value={{axiosJWT}}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node
}

export default UserContextProvider
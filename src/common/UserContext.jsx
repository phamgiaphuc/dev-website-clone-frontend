import { createContext, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { lookInSession, storeInSession } from './session';
import toast from 'react-hot-toast';
import axios from 'axios';
import { SERVER_BASE_URL } from '@/constants/vars';

export const UserContext = createContext({});

const UserContextProvider = ({children}) => {
  const [userAuth, setUserAuth] = useState({});
  useEffect(() => {
    let userInSession = lookInSession('user_at');
    if (userInSession) {
      return setUserAuth(JSON.parse(userInSession));
    }
    axios.get(SERVER_BASE_URL + '/v1/users/refresh')
      .then(({data}) => {
        console.log(data);
        if (data?.error) {
          setUserAuth({ access_token: null })
          return toast.error('Please sign in');
        }
        if (data?.access_token) {
          storeInSession('user_at', JSON.stringify(data));
          setUserAuth(data);
          return toast.success('Signed in 👍');
        }
        setUserAuth({ access_token: null });
      })
      .catch(({ response: { data }}) => {
        console.log(data.error);
        toast.error(data.error + '. Please sign in');
      })
  }, []);
  return (
    <UserContext.Provider value={{userAuth, setUserAuth}}>
      {children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.node
}

export default UserContextProvider
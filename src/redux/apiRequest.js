import axios from "axios";
import { loginStart, loginSuccess, loginFailed, registerStart, registerSuccess, refreshStart, refreshSuccess, logoutStart, logoutSuccess, logoutFailed, refreshFailed } from "./authSlice";
import toast from "react-hot-toast";
import { authWithGoogle } from "@/common/firebase";

export const authSignIn = async (credentials, dispatch, navigate) => {
  dispatch(loginStart());
  const loadingToast = toast.loading('Signing in');
  try {
    const { data } = await axios.post('/v1/auth/signin', credentials);
    if (data?.is_verified === false) {
      dispatch(loginFailed());
      toast.dismiss(loadingToast);
      return navigate(`/verification/${data?.id}`);
    }
    dispatch(loginSuccess(data));
    toast.dismiss(loadingToast);
    toast.success('Sign in 👍');
    navigate('/');
  } catch (error) {
    const { data } = error.response;
    dispatch(loginFailed());
    toast.dismiss(loadingToast);
    toast.error(data.error);
  }
}

export const authSignUp = async (credentials, dispatch, navigate) => {
  dispatch(registerStart());
  const loadingToast = toast.loading('Signing up');
  try {
    const { data } = await axios.post('/v1/auth/signup', credentials);
    dispatch(registerSuccess());
    toast.dismiss(loadingToast);
    toast.success('Sign up 👍');
    setTimeout(() => {
      navigate(`/verification/${data?.id}`);
    }, 2000);
  } catch (error) {
    const { data } = error.response;
    dispatch(loginFailed());
    toast.dismiss(loadingToast);
    toast.error(data.error);
  }
}

export const authSignOut = async (dispatch) => {
  console.log('1');
  dispatch(logoutStart());
  const loadingToast = toast.loading('Signing out');
  try {
    await axios.get('/v1/auth/signout');
    dispatch(logoutSuccess());
    toast.dismiss(loadingToast);
    toast.success('Sign out 👍')
  } catch (error) {
    const { data } = error.response;
    dispatch(logoutFailed());
    toast.dismiss(loadingToast);
    toast.error(data.error);
  }
}

export const authVerification = async (id, code, dispatch, navigate) => {
  dispatch(loginStart());
  const loadingToast = toast.loading('Verifying');
  try {
    const { data } = await axios.post(`/v1/auth/verification/${id}`, { code });
    if (data?.is_verified === true) {
      dispatch(loginFailed());
      toast.dismiss(loadingToast);
      toast.error(data?.message);
      return navigate('/signin');
    }
    dispatch(loginSuccess(data));
    toast.dismiss(loadingToast);
    toast.success('Sign in 👍');
    navigate('/');
  } catch (error) {
    const { data } = error.response;
    dispatch(loginFailed());
    toast.dismiss(loadingToast);
    toast.error(data.error);
  }
}

export const authRefreshToken = async (dispatch) => {
  dispatch(refreshStart())
  try {
    const { data } = await axios.get('/v1/auth/refresh');
    dispatch(refreshSuccess());
    return data;
  } catch (error) {
    const { data } = error.response;
    dispatch(refreshFailed());
    toast.error(data.error);
  }
}

export const authGoogle = (dispatch, navigate) => {
  dispatch(loginStart());
  authWithGoogle().then((user) => {
    axios.post('/v1/auth/google-auth', { token: user.accessToken })
      .then(({data}) => {
        dispatch(loginSuccess(data));
        toast.success('Sign in 👍');
        navigate('/');
      })
      .catch((error) => {
        const { data } = error.response;
        dispatch(loginFailed());
        toast.error(data.error);
      })
  });
}
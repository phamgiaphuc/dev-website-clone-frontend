import axios from "axios";
import toast from "react-hot-toast";
import { signInFailed, signInStart, signInSuccess, signOutFailed, signOutStart, signOutSuccess, signUpFailed, signUpStart, signUpSuccess, verificationFailed, verificationStart, verificationSuccess } from "./authSlice";
import { authWithGoogle } from "@/common/firebase";
import { userSignIn, userSignOut, userVerify } from "./userSlice";

export const authSignIn = async (credentials, dispatch, navigate) => {
  dispatch(signInStart());
  const loadingToast = toast.loading('Signing in');
  try {
    const { data } = await axios.post('/v1/auth/signin', credentials);
    if (data?.is_verified === false) {
      dispatch(signInFailed());
      toast.dismiss(loadingToast);
      return navigate(`/verification/${data?.id}`);
    }
    dispatch(signInSuccess(data));
    dispatch(userSignIn(data));
    toast.dismiss(loadingToast);
    toast.success('Sign in 👍');
    navigate(-1);
  } catch ({response: {data}}) {
    dispatch(signInFailed());
    toast.dismiss(loadingToast);
    toast.error(data.error);
  }
}

export const authSignOut = async (dispatch) => {
  dispatch(signOutStart());
  try {
    await axios.get('/v1/auth/signout');
    dispatch(signOutSuccess());
    dispatch(userSignOut());
    toast.success('Sign out 👍');
  } catch ({response: {data}}) {
    dispatch(signOutFailed());
    toast.error(data.error);
  }
}

export const authSignUp = async (credentials, dispatch, navigate) => {
  dispatch(signUpStart());
  const loadingToast = toast.loading('Signing up');
  try {
    const { data } = await axios.post('/v1/auth/signup', credentials);
    dispatch(signUpSuccess());
    toast.dismiss(loadingToast);
    toast.success('Sign up 👍');
    navigate(`/verification/${data?.id}`);
  } catch ({ response: {data}}) {
    dispatch(signUpFailed());
    toast.dismiss(loadingToast);
    toast.error(data.error);
  }
}

export const authVerification = async (id, code, dispatch, navigate) => {
  dispatch(verificationStart());
  const loadingToast = toast.loading('Verifying');
  try {
    const { data } = await axios.post(`/v1/auth/verification/${id}`, { code });
    if (data?.is_verified === true) {
      dispatch(verificationFailed());
      toast.dismiss(loadingToast);
      return toast.error(data.message);
    }
    dispatch(verificationSuccess(data));
    dispatch(userVerify(data));
    toast.dismiss(loadingToast);
    toast.success('Sign in 👍');
    navigate('/');
  } catch ({ response: {data}}) {
    console.log(data);
    dispatch(verificationFailed());
    toast.dismiss(loadingToast);
    toast.error(data.error[0]?.msg);
  }
}

export const authGoogleSignIn = async (dispatch, navigate) => {
  dispatch(signInStart());
  try {
    const { accessToken } = await authWithGoogle();
    const { data } = await axios.post('/v1/auth/google-auth', {
      token: accessToken
    });
    dispatch(signInSuccess(data));
    dispatch(userSignIn(data));
    toast.success('Sign in 👍');
    navigate(-1);
  } catch ({ response: {data}}) {
    dispatch(signInFailed());
    toast.error(data.error);
  }
}
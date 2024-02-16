import { refreshFailed, refreshStart, refreshSuccess } from "@/redux/authSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import toast from "react-hot-toast";

const refreshToken = async (user, dispatch) => {
  dispatch(refreshStart());
  try {
    const { data } = await axios.get("/v1/auth/refresh-token");
    const refreshUser = {
      ...user,
      accessToken: data.accessToken,
      refreshToken: data.refreshToken
    };
    dispatch(refreshSuccess(refreshUser));
    return data.accessToken;
  } catch ({ response: {data}}) {
    dispatch(refreshFailed());
    toast.error(data.error);
  }
};

export const createAxios = (user, dispatch) => {
  const newInstance = axios.create();
  newInstance.interceptors.request.use(
    async (config) => {
      const date = new Date();
      const decodedToken = jwtDecode(user?.accessToken);
      if (decodedToken.exp < (date.getTime() / 1000)) {
        const data = await refreshToken(user, dispatch);
        config.headers['Authorization'] = 'Bearer ' + data;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );
  return newInstance;
};
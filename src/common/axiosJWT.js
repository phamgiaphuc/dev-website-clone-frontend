import { authRefreshToken } from "@/redux/apiRequest";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const createCustomAxios = (user, dispatch, loginSuccess) => {
  const axiosJWT = axios.create();
  axiosJWT.interceptors.request.use(async (config) => {
    let date = new Date();
    const decodedToken = jwtDecode(user?.access_token);
    if (decodedToken.exp < date.getTime() / 1000) {
      const data = await authRefreshToken(dispatch);
      const refreshUser = {
        ...user,
        accessToken: data?.accessToken,
        refreshToken: data?.refreshToken
      };
      dispatch(loginSuccess(refreshUser));
      config.headers['Authentication'] = `Bearer ${data?.accessToken}`;
    }
    return config;
  },(error) => {
    return Promise.reject(error);
  });
}
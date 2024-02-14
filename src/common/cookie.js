import Cookies from "universal-cookie";

const cookie = new Cookies();

export const setCookie = (key, value, option) => {
  cookie.set(key, value, option);
}

export const getCookie = (key) => {
  return cookie.get(key);
}

export const removeCookie = (key) => {
  cookie.remove(key);
}
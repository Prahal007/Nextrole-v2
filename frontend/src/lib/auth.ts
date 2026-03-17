import Cookies from "js-cookie";

export const setToken = (token: string) =>
  Cookies.set("token", token, { expires: 1, sameSite: "strict" });

export const getToken = () => Cookies.get("token");

export const clearToken = () => Cookies.remove("token");

export const isLoggedIn = () => !!getToken();

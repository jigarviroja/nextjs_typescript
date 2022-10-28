import Router from "next/router";

export const getCookie = () => {
  const value = document?.cookie?.split("=")[1];
  return value;
};

export const getItem = (key: string) => {
  return localStorage.getItem(key);
};

export const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

export const nextLocalStorage = (): Storage | void => {
  if (isBrowser()) {
    return window.localStorage;
  }
};

export const authenticate = () =>
  new Promise((resolve, reject) => {
    if (localStorage.getItem("userToken")) {
      resolve("user is logged in");
    } else {
      Router.push("/login");
    }
  });

import { useEffect } from "react";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.css";
import type { AppProps } from "next/app";
import { getCookie, getItem } from "../utils/Cookies";

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    let isGuest = getItem("userToken") ? false : true;
    if (isGuest) {
      document.cookie = "isGuest=true";
    } else {
      document.cookie = "isGuest=false";
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;

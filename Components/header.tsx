import React, { useState, useEffect } from "react";
import Router from "next/router";
import { getCookie, getItem, nextLocalStorage } from "../utils/Cookies";

const Navigation: React.FC = () => {
  const [isUserGuest, setIsUserguest] = useState<Boolean>(false);
  const username = nextLocalStorage()
    ?.getItem("email")
    ?.split("@")[0] as string;

  useEffect(() => {
    setIsUserguest(getItem("userToken") ? false : true);
  }, []);

  const logouthandler = () => {
    if (isUserGuest) {
      Router.push("/login");
    } else {
      document.cookie = "isGuest=true";
      localStorage.removeItem("userToken");
      localStorage.removeItem("email");
      Router.push("/login");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg position-sticky navbar-dark bg-dark px-3 headerSticky">
      <a className="navbar-brand cursorPtr" onClick={() => Router.push("/")}>
        CRUD
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div
        className="collapse navbar-collapse w-100"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav mr-auto col">
          {!isUserGuest && (
            <li className="nav-item text-white cursorPtr"
              onClick={()=> Router.push("/createUser")}
            >Add User</li>
          )}
        </ul>
        {username && (
          <div className="cursorPtr mx-2 my-2 my-lg-0 text-white text-right">
            {username}
          </div>
        )}
        <div
          className="my-2 my-lg-0 cursorPtr mx-2 text-danger text-right"
          onClick={() => logouthandler()}
        >
          {isUserGuest ? "Login" : "Logout"}
        </div>
      </div>
      <style jsx>{`
        .headerSticky {
          top: 0;
          z-index: 99;
          background: #fff;
        }
      `}</style>
    </nav>
  );
};

export default Navigation;

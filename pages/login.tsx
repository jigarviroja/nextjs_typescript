import React, { useState } from "react";
import Router from "next/router";
import Navigation from "../Components/header";
import { LoginFormInterFace } from "../utils/loginStateInterfaces";

let validRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const emailField = "email";
const passwordField = "password";

const Login: React.FC = () => {
  const [loginForm, setLoginForm] = useState<LoginFormInterFace>({
    [emailField]: {
      name: "email",
      label: "email",
      type: "email",
      placeholder: "Enter email",
      error: true,
      id: "exampleInputEmail1",
      errMsg: "Please enter valid email address",
      value: "",
    },
    [passwordField]: {
      name: "password",
      label: "password",
      type: "password",
      placeholder: "Enter password",
      error: true,
      id: "exampleInputPassword1",
      value: "",
    },
  });

  enum FieldType {
    EMAIL = "email",
  }

  const submitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    localStorage.setItem("email", loginForm[emailField]?.value);
    localStorage.setItem("userToken", "askjdh9485skldfnsdf8s9fsdnfskdfnskd");
    Router.push("/");
  };

  const formValidator = (event: any) => {
    let isValidEmail: boolean = false;
    let isValidPass: boolean = false;
    if (event.target.name === FieldType.EMAIL) {
      isValidEmail = validRegex.test(event.target.value);
    } else {
      event.target.value ? (isValidPass = false) : (isValidPass = true);
    }

    let dummyObj = { ...loginForm };
    dummyObj[event.target.name] = {
      ...dummyObj[event.target.name],
      error:
        dummyObj[event.target.name].name == "email"
          ? !isValidEmail
          : isValidPass,
      value: event.target.value,
    };
    setLoginForm({ ...dummyObj });
  };

  return (
    <div>
      <Navigation />
      <div className="loginPage col-10 d-flex flex-column justify-content-center align-items-center w-100">
        <h3>Login Page</h3>
        <form onSubmit={submitHandler} className="px-3 py-4 loginBoxShadow" style={{ width: "50%" }}>
          <div className="form-group pt-2">
            <label htmlFor="exampleInputEmail1">Email address</label>
            <input
              className="form-control"
              aria-describedby="emailHelp"
              onChange={(e) => formValidator(e)}
              {...loginForm[emailField]}
            />
            {loginForm[emailField]?.error &&
              loginForm[emailField]?.value.length > 0 && (
                <small id="emailHelp" className="form-text text-danger">
                  {loginForm[emailField]?.errMsg}
                </small>
              )}
          </div>
          <div className="form-group pt-2">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input
              className="form-control"
              {...loginForm[passwordField]}
              onChange={(e) => formValidator(e)}
            />
          </div>
          {/* <div className="form-check pt-2">
            <input
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" htmlFor="exampleCheck1">
              Check me out
            </label>
          </div> */}
          <button
            type="submit"
            disabled={
              loginForm[emailField]?.error || loginForm[passwordField]?.error
            }
            className="mt-3 btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
      <style jsx>{`
        .loginPage {
          height: calc(100vh - 60px);
        }
        
      `}</style>
    </div>
  );
};

export default Login;

import React, { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import { LoginFormInterFace } from "../../utils/loginStateInterfaces";
import {
  createUserInterface,
  getUserData,
  postUserData,
  putUserData,
} from "../../Services/crud";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

let validRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const UserForm: React.FC = () => {
  const router = useRouter();

  type ObjType = {
    type: string;
    id: string;
  };

  const routerQuery: ObjType = router.query as any;
  console.log(routerQuery);

  useEffect(() => {
    if (routerQuery?.type == "edit") {
      getExistingUser();
    }
  }, []);

  const [userForm, setUserForm] = useState<LoginFormInterFace>({
    name: {
      name: "name",
      label: "Enter fullname",
      inputType: "text",
      value: "",
      required: true,
      error: false,
      errMsg: "Please enter fullname",
      placeholder: "Enter fullname",
      id: "emailField",
    },
    username: {
      name: "username",
      label: "Enter username",
      inputType: "text",
      value: "",
      error: false,
      required: true,
      errMsg: "Please enter username",
      placeholder: "Enter username",
      id: "usernameField",
    },
    email: {
      name: "email",
      label: "Enter email",
      inputType: "email",
      value: "",
      error: false,
      errMsg: "Please enter valid email",
      required: true,
      placeholder: "Enter email",
      id: "emailField",
    },
    company: {
      name: "company",
      label: "Enter company",
      inputType: "text",
      value: "",
      error: false,
      errMsg: "Please enter company",
      placeholder: "Enter company",
      id: "companyField",
      required: true,
    },
  });

  const getExistingUser = async () => {
    const response = await getUserData({
      id: +routerQuery?.id,
    });
    const dummyUpdationForm: LoginFormInterFace = { ...userForm };
    for (let keyname in userForm) {
      dummyUpdationForm[keyname] = {
        ...dummyUpdationForm[keyname],
        value: response?.data[keyname],
      };
    }
    setUserForm(dummyUpdationForm);
  };

  const handleFunctionValidator = (event: any, keyname: string) => {
    let formDummypayload: LoginFormInterFace = { ...userForm };
    let isValidEmail: boolean = true;
    if (keyname == "email") {
      isValidEmail = validRegex.test(event.target.value);
      formDummypayload[keyname] = {
        ...formDummypayload[keyname],
        value: event.target.value,
        error: !isValidEmail,
      };
    } else {
      formDummypayload[keyname] = {
        ...formDummypayload[keyname],
        value: event.target.value,
      };
    }

    setUserForm(formDummypayload);
  };

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    let payloadObj: createUserInterface = {
      name: "",
      username: "",
      company: "",
      email: "",
    };
    for (let keyname in userForm) {
      payloadObj[keyname] = userForm[keyname].value;
    }
    try {
      if (routerQuery?.type == "edit") {
        payloadObj["id"] = routerQuery?.id;
        const resPut = await putUserData(payloadObj);
      } else {
        const res = await postUserData(payloadObj);
      }
      Router.push("/user");
    } catch (e) {
      console.log("error in submit handler", e);
    }
  };

  const btnvalidation = () => {
    let isValid: boolean = true;
    for (let keyname in userForm) {
      if (userForm[keyname].error) {
        isValid = false;
        break;
      } else {
        if (
          userForm[keyname]?.required &&
          userForm[keyname]?.value.length == 0
        ) {
          isValid = false;
          break;
        }
      }
    }
    return isValid;
  };

  return (
    <div>
      <ArrowBackIcon
        className="cursorPtr"
        style={{ color: "red", height: "35px", width: "35px" }}
        onClick={() => Router.back()}
      />
      <h3 className="text-primary">{`User ${
        routerQuery.type == "edit" ? "updation" : "creation"
      } form`}</h3>
      <form onSubmit={(event) => submitHandler(event)}>
        <div className="form-group my-2">
          {Object.keys(userForm).length > 0 &&
            Object.keys(userForm).map((formkey, index) => (
              <div key={index} className="my-3">
                <label
                  style={{ fontWeight: "700" }}
                  htmlFor="exampleFormControlInput1"
                  className="pb-1"
                >
                  {userForm[formkey]?.label}
                  {userForm[formkey]?.required && (
                    <span className="text-danger">*</span>
                  )}
                </label>
                <input
                  className="form-control"
                  {...userForm[formkey]}
                  autoComplete="off"
                  onChange={(event) => handleFunctionValidator(event, formkey)}
                />
                {userForm[formkey]?.error && (
                  <small className="text-danger">
                    {userForm[formkey]?.errMsg}
                  </small>
                )}
              </div>
            ))}
        </div>
        <button
          type="submit"
          disabled={!btnvalidation()}
          className="btn mt-3 btn-primary"
        >
          {`${routerQuery.type == "edit" ? "Update" : "Create"} User`}
        </button>
      </form>
    </div>
  );
};

export default UserForm;

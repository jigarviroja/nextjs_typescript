import React, { useEffect } from "react";
import type { NextPage } from "next";
import Navigation from "../Components/header";
import UserForm from "../Components/CRUD_user/userForm";
import { authenticate } from "../utils/Cookies";

const CreateUser: NextPage = () => {
  useEffect(() => {
    authenticate().then((e) => console.log(e));
  }, []);

  return (
    <div>
      <Navigation />
      <div className="col-10 mx-auto mt-1 px-3 pt-2">
        <UserForm />
      </div>
    </div>
  );
};

export default CreateUser;

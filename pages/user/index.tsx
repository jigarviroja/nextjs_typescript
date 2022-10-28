import { useEffect } from "react";
import Head from 'next/head'
import type { NextPage } from "next";
import UserRecord from "../../Components/CRUD_user/userRecord";
import Navigation from "../../Components/header";
import { authenticate } from "../../utils/Cookies";

const UserList: NextPage = () => {
  useEffect(() => {
    authenticate().then((e) => console.log(e));
  }, []);

  return (
    <div>
      <Head>
        <title>CRUD app</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <div
        className="globalHeight mt-1 pt-2 d-flex flex-coloumn justify-content-center align-items-center"
        style={{ marginTop: "-70px" }}
      >
        <UserRecord />
      </div>
    </div>
  );
};

export default UserList;

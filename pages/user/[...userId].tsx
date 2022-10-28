import React, { useEffect, useState } from "react";
import Head from "next/head";
import Router, { useRouter } from "next/router";
import type { NextPage } from "next";
import Navigation from "../../Components/header";
import { UserListInfo } from "../../utils/loginStateInterfaces";
import { getUserData } from "../../Services/crud";

const UserDetail: NextPage = () => {
  const router = useRouter();
  const [userDetail, setUserDetail] = useState<any[]>([]);

  useEffect(() => {
    handelUserDetail();
  }, []);

  const handelUserDetail = async () => {
    const response = await getUserData({
      id: +router?.query?.userId as number,
    });
    setUserDetail([response?.data]);
  };

  return (
    <div>
      <Head>
        <title>{userDetail[0]?.username}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Navigation />
      <div className=" col-12 px-4 mt-4 d-flex flex-column align-items-center justify-content-center">
        <h3>User Detail</h3>
        <div className="col-6 p-4 userDetailShadow">
          <button
            type="button"
            className="btn col-2 mb-3 btn-warning"
            onClick={() => Router.back()}
          >
            Back
          </button>
          {userDetail.length > 0 &&
            userDetail.map((user: any, index: number) => (
              <div key={index}>
                <ul className="list-group">
                  <li className="list-group-item">
                    Name :{" "}
                    <span className="text-primary font-weight-bold font-size-25">
                      {user.name}
                    </span>
                  </li>
                  <li className="list-group-item">
                    Username :{" "}
                    <span className="text-primary font-weight-bold font-size-25">
                      {user.username}
                    </span>
                  </li>
                  <li className="list-group-item">
                    Email :{" "}
                    <span className="text-primary font-weight-bold font-size-25">
                      {user.email}
                    </span>
                  </li>
                  <li className="list-group-item">
                    Company :{" "}
                    <span className="text-primary font-weight-bold font-size-25">
                      {user.company}
                    </span>
                  </li>
                </ul>
              </div>
            ))}
        </div>
      </div>
      <style jsx>{`
        .userDetailShadow {
          box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
        }
      `}</style>
    </div>
  );
};

export default UserDetail;

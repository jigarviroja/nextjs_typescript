import React, { useState, useEffect } from "react";
import Router from "next/router";
import { UserListInfo } from "../../utils/loginStateInterfaces";
import UserPagination from "./userPagination";
import AlertDialog from "../../utils/alertDialog";
import { deleteUser, getUserData } from "../../Services/crud";
import SelectOptionDialog from "../../utils/dropdown";

const UserRecord: React.FC = () => {
  const [isDialogopen, setIsDialogOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(5);
  const [deleteUserId, setDeleteuserId] = useState<number | null>(null);
  const [paginationPage, setPaginationPage] = useState<number>(10);
  const [userList, setUserList] = useState<UserListInfo[]>([]);

  useEffect(() => {
    handleUserList();
  }, []);

  useEffect(() => {
    handleUserList();
  }, [limit]);

  const handleUserList = async (pageNo?: number) => {
    try {
      const paginationPage = await getUserData({});
      setPaginationPage(Math.ceil(paginationPage?.data.length / limit));

      const userList = await getUserData({
        page: pageNo || page,
        limit: limit,
      });
      setUserList(userList?.data);
    } catch (e: any) {
      alert(e.message);
    }
  };

  const handleDialog = (isOpen?: boolean, userId?: number): any => {
    if (isOpen) {
      setIsDialogOpen(!isOpen);
    } else {
      setIsDialogOpen((prev) => !prev);
    }
  };

  const handlePagination = (_?: React.FormEvent, page?: number): any => {
    if (page) {
      setPage(page);
      handleUserList(page);
    }
  };

  const handleDeleteUser = async (e?: any) => {
    try {
      deleteUser({ id: deleteUserId as number }).then((res) => {
        handlePagination(e, page);
      });
    } catch (e) {
      console.log("error in handleDeleteUser", e);
    }
  };

  const handleSearchResult = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchKey = event.target.value;
    if (searchKey.length == 0) {
      handleUserList();
      return;
    }
    const filterData = userList.filter((user, index) =>
      user.username.toLowerCase().includes(searchKey.toLowerCase())
    );
    setUserList([...filterData]);
  };

  return (
    <div className="col-10 d-flex flex-column align-items-center justify-content-center">
      <h5 className="text-success text-bold mb-3">
        CRUD OPERATION WITH TYPESCRIPT AND NEXTJS
      </h5>
      <div className="d-flex justify-content-start" style={{ width: "70%" }}>
        <input
          className="userInput col-6 p-2"
          type="text"
          placeholder="Search by username"
          onChange={(e) => handleSearchResult(e)}
        />
      </div>
      <div className="mt-3">
        {userList.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th scope="col">Sno</th>
                <th scope="col">User Id</th>
                <th scope="col">Fullname</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Company</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {userList.length > 0 &&
                userList.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="row">{index + 1}</th>
                    <th scope="row">{user.id}</th>
                    <td>{user.name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td>{user?.company}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn mx-1 btn-primary"
                          onClick={() => Router.push(`/user/${user.id}`)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn mx-1 btn-warning"
                          onClick={() =>
                            Router.push(`/createUser?id=${user.id}&&type=edit`)
                          }
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          className="btn mx-1 btn-danger"
                          onClick={() => {
                            setDeleteuserId(user?.id ? +user.id : 1);
                            handleDialog();
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        ) : (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: "250px" }}
          >
            <h2 className="text-muted">No Data Found...</h2>
          </div>
        )}
      </div>
      {userList.length > 0 && (
        <div
          className="d-flex align-items-center justify-content-end mb-3"
          style={{ width: "70%" }}
        >
          <SelectOptionDialog
            paginationPage={paginationPage}
            handleDataPerRow={(pageData: number) => {
              setLimit(pageData);
            }}
          />
          <UserPagination
            handlePagination={handlePagination}
            paginationPage={paginationPage}
            pageNo={page}
          />
        </div>
      )}
      <AlertDialog
        open={isDialogopen}
        handleDialog={handleDialog}
        deleteUserData={handleDeleteUser}
        deleteId={deleteUserId}
      />

      <style jsx>{`
        .userInput {
          border-radius: 5px;
          border: 1px solid silver;
        }
        input:focus {
          border: 1px solid blue !important;
        }
      `}</style>
    </div>
  );
};

export default UserRecord;

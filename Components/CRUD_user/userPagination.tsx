import React from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface paginationProp {
  handlePagination: (e?: React.FormEvent, page?: number) => void;
  pageNo: number;
  userID?: number;
  paginationPage: number;
}

const UserPagination: React.FC<paginationProp> = (props) => {
  return (
    <div>
      <Stack spacing={2}>
        <Pagination onChange={props.handlePagination} page={props.pageNo} count={props?.paginationPage} color="primary" />
      </Stack>
    </div>
  );
};

export default UserPagination;

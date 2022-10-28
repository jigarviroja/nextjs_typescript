import axios from "axios";

type getAPIPayloadType = {
  page?: number;
  limit?: number;
  searchKey?: string;
  id?: number;
};

export type createUserInterface = {
  [prop: string]: string | number;
};

// GET user data
export const getUserData = async (payload: getAPIPayloadType) => {
  let url = "http://localhost:3004/users";
  if (payload.page && payload.limit) {
    url = `${url}?_sort=id&_order=desc&_page=${payload.page}&&_limit=${payload.limit}`;
  }
  if (payload?.id) {
    url = `${url}/${payload?.id}`;
  }
  const response = await axios.get(url);
  const data = await response;
  console.log(response);
  return { data: data.data, status: data.status };
};

// Delete user
export const deleteUser = async (payload: { id: number }) => {
  let url = "http://localhost:3004/users";
  if (payload.id) {
    url = `${url}/${payload.id}`;
  }
  return await axios.delete(url);
};

// POST user data
export const postUserData = async (payload: createUserInterface) => {
  let url = "http://localhost:3004/users";

  const response = await axios.post(url, payload);
  const data = await response;
  console.log(response);
  return { data };
};

// Update user info
export const putUserData = async (payload: createUserInterface) => {
  let url = `http://localhost:3004/users/${payload?.id}`;

  const response = await axios.put(url, payload);
  const data = await response;
  console.log(response);
  return { data };
};

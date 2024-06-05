import axiosClient from "./axiosClient";

const Users = {
  getAll: () => {
    const url = "api/v1/manage/category";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDataUsers: () => {
    const url = "api/v1/users";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  }
 
};
export default Users;

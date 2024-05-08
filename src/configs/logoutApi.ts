

import axiosClient from "./axiosClient";

const logoutApi = {
  getAll: () => {
    const url = "/api/v1/auth/login";
    return axiosClient.get(url);
  },
  postMessage: () => {
    const url = "/api/v1/auth/logout";
    return axiosClient.post(url);
  },
  // delete: () => {

  // }
//   postMessageRegister: (params) => {
//     const url = "/api/v1/auth/register";
//     return axiosClient.post(url, params);
//   }
postAddImageCategory: (data, token) => {
  const url = "api/v1/manage/category";
  return axiosClient.post(url, data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}
};
export default logoutApi;
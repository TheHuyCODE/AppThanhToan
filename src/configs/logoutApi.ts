

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
//   postMessageRegister: (params) => {
//     const url = "/api/v1/auth/register";
//     return axiosClient.post(url, params);
//   }
};
export default logoutApi;
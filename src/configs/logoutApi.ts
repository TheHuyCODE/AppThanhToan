

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
  postAddImageCategory: (data: any, token: any) => {
    const url = "api/v1/manage/category";
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  },
  deleteTokenLogout: (token: any) => {
    const url = "api/v1/auth/logout";
    return axiosClient.delete(url, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
};

export default logoutApi;

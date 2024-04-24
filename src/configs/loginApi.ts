import axiosClient from "./axiosClient";

const loginApi = {
  getAll: (params) => {
    const url = "/api/v1/auth/login";
    return axiosClient.get(url, { params: params });
  },
  postMessage: (params) => {
    const url = "/api/v1/auth/login";
    return axiosClient.post(url, params);
  },
  postMessageRegister: (params) => {
    const url = "/api/v1/auth/register";
    return axiosClient.post(url, params);
  }
};

export default loginApi;

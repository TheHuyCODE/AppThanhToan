import axiosClient from "./axiosClient";

const loginApi = {
  getAll: (params: any) => {
    const url = "/api/v1/auth/login";
    return axiosClient.get(url, { params: params });
  },
  postMessage: (params: object) => {
    const url = "/api/v1/auth/login";
    return axiosClient.post(url, params);
  },
  postMessageRegister: (params: any) => {
    const url = "/api/v1/auth/register";
    return axiosClient.post(url, params);
  },
  changePassword: (data: object) => {
    const url = "api/v1/auth/change_password";
    return axiosClient.put(url, data);
  },
  forgotPassword: (data: object) => {
    const url = "api/v1/auth/forgot_password ";
    return axiosClient.put(url, data);
  },
};

export default loginApi;

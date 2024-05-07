

import axiosClient from "./axiosClient";

const uploadApiImage = {
  getAll: () => {
    const url = "/api/v1/upload_file";
    return axiosClient.get(url);
  },
  postMessage: () => {
    const url = "/api/v1/upload_file";
    return axiosClient.post(url);
  },
//   postMessageRegister: (params) => {
//     const url = "/api/v1/auth/register";
//     return axiosClient.post(url, params);
//   }
};
export default uploadApiImage;
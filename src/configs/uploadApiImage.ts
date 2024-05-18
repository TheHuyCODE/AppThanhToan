import axiosClient from "./axiosClient";

const uploadApiImage = {
  getAll: () => {
    const url = "/api/v1/upload_file";
    return axiosClient.get(url);
  },
  postImage: (data, prefix) => {
    const url = `/api/v1/upload_file?prefix=${prefix}`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  postAddItemCategory: (data, token) => {
    const url = "api/v1/manage/category";
    return axiosClient.post(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};
export default uploadApiImage;

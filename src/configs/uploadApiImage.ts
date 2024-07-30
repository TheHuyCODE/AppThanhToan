import axiosClient from "./axiosClient";

const uploadApiImage = {
  getAll: () => {
    const url = "/api/v1/upload_file";
    return axiosClient.get(url);
  },
  postImage: (data: any, prefix: any) => {
    const url = `/api/v1/upload_file?prefix=${prefix}`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  postAddItemCategory: (data: object) => {
    const url = "api/v1/manage/category";
    return axiosClient.post(url, data, {});
  },
  postImageCategoryChild: (data: any) => {
    const formData = new FormData();
    formData.append("file", data);
    const prefixImage = "category";
    const url = `/api/v1/upload_file?prefix=${prefixImage}`;
    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  //add image items child 1
  postAddItemCategoryChild: (data: any) => {
    const url = "api/v1/manage/category";
    return axiosClient.post(url, data, {});
  },
};
export default uploadApiImage;

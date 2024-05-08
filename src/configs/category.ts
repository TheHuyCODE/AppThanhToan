import axiosClient from "./axiosClient";

const category = {
  getAll: async (accessToken) => { 
    const url = "api/v1/manage/category/get";
    return axiosClient.get(url, {
      headers: {
        Authorization: `Bearer ${accessToken}` 
      }
    });
  },
  postNameCatalog: () => {
    const url = "/api/v1/auth/login";
    return axiosClient.post(url);
  },
  postImageCatalog: () => {
    const url = "api/v1/upload_file";
    const formData = new FormData();
    formData.append('file', value1);
    return axiosClient.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
};
export default category;

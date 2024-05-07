import axiosClient from "./axiosClient";

const category = {
  getAll: async () => {
    const url = "api/v1/manage/category";
    // console.log('getting category', await axiosClient.get(url))
    return axiosClient.get(url);
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

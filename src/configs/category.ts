import axiosClient from "./axiosClient";

const category = {
  getAll: async () => {
    const url = "api/v1/manage/category/";
    // console.log('getting category', await axiosClient.get(url))
    return axiosClient.get(url);
  },
};
export default category;

import axiosClient from "./axiosClient";

const products = {
  getAll: () => {
    const url = "api/v1/manage/product";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getCategoryProduct: () => {
    const url = "api/v1/manage/category/category-dropdown";

    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  //   postNameCatalog: () => {
  //     const url = "/api/v1/auth/login";
  //     return axiosClient.post(url);
  //   },
  //   postImageCatalog: () => {
  //     const url = "api/v1/upload_file";
  //     const formData = new FormData();
  //     formData.append("file", value1);
  //     return axiosClient.post(url, formData, {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     });
  //   },
  //   deleteCategory: (idItems) => {
  //     const url = `api/v1/manage/category/${idItems}`;
  //     return axiosClient.delete(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "ngrok-skip-browser-warning": "true",
  //       },
  //     });
  //   },

  //   deleteCategoryChild: (idItems) => {
  //     const url = `api/v1/manage/category/${idItems}`;
  //     return axiosClient.delete(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "ngrok-skip-browser-warning": "true",
  //       },
  //     });
  //   },
  postImageProduct: (data) => {
    const prefixImage = "products";
    const url = `/api/v1/upload_file?prefix=${prefixImage}`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  //   putModifyCategoryChild: (idItems, data) => {
  //     const url = `api/v1/manage/category/${idItems}`;
  //     return axiosClient.put(url, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "ngrok-skip-browser-warning": "true",
  //       },
  //     });
  //   },
};
export default products;

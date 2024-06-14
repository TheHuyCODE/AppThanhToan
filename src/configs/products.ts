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
  getDetailProduct: (idItems) => {
    const url = `api/v1/manage/product/${idItems}`;
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDataSearchProduct: (parent_id) => {
    const url = `api/v1/manage/product`;
    const params = {
      category_id: parent_id,
    };
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      params,
    });
  },
  // getModifyProduct: (parent_id) => {
  //   const url = "api/v1/manage/category";
  //   const params = {
  //     parent_id: parent_id,
  //   };
  //   return axiosClient.get(url, {
  //     headers: {
  //       // Authorization: `Bearer ${accessToken}`,
  //       "Content-Type": "application/json",
  //       "ngrok-skip-browser-warning": "true",
  //     },
  //     params,
  //   });
  // },
  postAddProduct: (data) => {
    const url = "api/v1/manage/product";
    return axiosClient.post(url, data, {});
  },

  postImageModifyProduct: (data) => {
    const url = "api/v1/manage/product";
    return axiosClient.post(url, data, {});
  },
  deleProduct: (idItems) => {
    const url = `api/v1/manage/category/${idItems}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },

  deleteProduct: (idItems) => {
    const url = `api/v1/manage/product/${idItems}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  postImageProduct: (data) => {
    const prefixImage = "products";
    const url = `/api/v1/upload_file?prefix=${prefixImage}`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  putModifyProduct: (idItems, data) => {
    const url = `api/v1/manage/product/${idItems}`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
};
export default products;

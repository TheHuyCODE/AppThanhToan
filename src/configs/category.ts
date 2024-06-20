import axiosClient from "./axiosClient";

const category = {
  getAll: () => {
    const url = "api/v1/manage/category";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getAllChild: (parent_id) => {
    const url = "api/v1/manage/category";
    const params = {
      parent_id: parent_id,
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
  postNameCatalog: () => {
    const url = "/api/v1/auth/login";
    return axiosClient.post(url);
  },
  postImageCatalog: () => {
    const url = "api/v1/upload_file";
    const formData = new FormData();
    formData.append("file", value1);
    return axiosClient.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  deleteCategory: (idItems) => {
    const url = `api/v1/manage/category/${idItems}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },

  deleteCategoryChild: (idItems) => {
    const url = `api/v1/manage/category/${idItems}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  putModifyCategory: (idItems, data) => {
    const url = `api/v1/manage/category/${idItems}`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  putModifyCategoryChild: (idItems, data) => {
    const url = `api/v1/manage/category/${idItems}`;
    return axiosClient.put(url, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
};
export default category;

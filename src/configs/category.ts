import axiosClient from "./axiosClient";

const category = {
  getAll: () => {
    const url = "api/v1/manage/category";
    const params = {
      page: 1,
      page_size: 10,
    }
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      params,
    });
  },
   getDataCategoryPagination: (current: number, size: number) => {
    const url = "api/v1/manage/category";
    const params = {
      page: current,
      page_size: size,
    }
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      params,
    });
  },
  getDataCategoryPaginationChild: (isChild: string, current: number, size: number) => {
    const url = "api/v1/manage/category";
    const params = {
      parent_id: isChild,
      page: current,
      page_size: size,
    }
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      params,
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

  getAllChildThirds: (parent_id) => {
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
  getDataSearchNameCategory: (value) => {
    const url = `api/v1/manage/category`;
    const params = {
      search: value,
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
  getDataSearchNameChildCategory: (parent_id, value) => {
    const url = `api/v1/manage/category`;
    const params = {
      parent_id: parent_id,
      search: value,
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
  getDataSearchNameThreeCategory: (parent_id, value) => {
    const url = `api/v1/manage/category`;
    const params = {
      parent_id: parent_id,
      search: value,
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
};
export default category;

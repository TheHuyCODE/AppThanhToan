import axiosClient from "./axiosClient";

const products = {
  getAll: () => {
    const url = "api/v1/manage/product";
    const params = {
      search: "",
      page: 1,
      page_size: 10,
      sort: "name",
      order_by: "asc",
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
  getSellProduct: () => {
    const url = "api/v1/manage/product";
    const params = {
      search: "",
      page: 1,
      page_size: 30,
      sort: "name",
      order_by: "asc",
      is_active: 1,
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
  sortDataProduct: (colName: string, typeSort: string) => {
    const url = "api/v1/manage/product";
    const params = {
      sort: `${colName}`,
      order_by: `${typeSort}`,
      is_active: 1,
    };
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      params,
    });
  },
  getSellProductPagination: () => {
    const url = "api/v1/manage/product";
    const params = {
      search: "",
      page: 1,
      page_size: 10,
      sort: "name",
      order_by: "asc",
      is_active: 1,
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
  getDataProductPagination: (current: number, size: number) => {
    const url = "api/v1/manage/product";
    const params = {
      page: current,
      page_size: size,
      // sort: "name",
      order_by: "asc",
      // is_active: 1,
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
  getSellProductPaginationAfter: () => {
    const url = "api/v1/manage/product";
    const params = {
      search: "",
      page: 2,
      page_size: 14,
      sort: "name",
      order_by: "asc",
      // is_active: 1,
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
  getDetailInvoices: (id: string) => {
    const url = `api/v1/manage/invoice/${id}`;

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
    const params = {
      is_haveproduct: 1,
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
  getFiltersCategoryProduct: () => {
    const url = "api/v1/manage/category/category-dropdown";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDetailProduct: (idItems: string | undefined) => {
    const url = `api/v1/manage/product/${idItems}`;
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDataSearchProduct: (parent_id: string) => {
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
  getDataSortProduct: (key: string, order: any) => {
    const url = `api/v1/manage/product`;
    const params = {
      sort: key,
      order: order,
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

  getDataSearchProductActive: (status: any) => {
    const url = `api/v1/manage/product`;
    const params = {
      is_active: status,
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

  getDataSearchNameProduct: (value: string) => {
    const url = `api/v1/manage/product`;
    const params = {
      search: value,
      page_size: 10
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
  getDataSearchBarcodeProduct: (value: string) => {
    const url = `api/v1/manage/product`;
    const params = {
      barcode: value,
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
  postAddProduct: (data: any) => {
    const url = "api/v1/manage/product";
    return axiosClient.post(url, data, {});
  },

  postImageModifyProduct: (data: any) => {
    const url = "api/v1/manage/product";
    return axiosClient.post(url, data, {});
  },
  deleProduct: (idItems: string) => {
    const url = `api/v1/manage/category/${idItems}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },

  deleteProduct: (idItems: string) => {
    const url = `api/v1/manage/product/${idItems}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  postImageProduct: (data: any) => {
    const prefixImage = "products";
    const url = `/api/v1/upload_file?prefix=${prefixImage}`;
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  putModifyProduct: (idItems: string, data: any) => {
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

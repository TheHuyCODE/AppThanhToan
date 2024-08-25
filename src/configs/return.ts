import axiosClient from "./axiosClient";

const returnProduct = {
  getAll: () => {
    const url = "api/v1/manage/returns";
    const params = {
      page_size: 10,
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
  getAllTotal: () => {
    const url = "api/v1/manage/returns";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDetailReturn: (id: string) => {
    const url = `api/v1/manage/returns/${id}`;
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDataSearchReturn: (value: string) => {
    const url = "api/v1/manage/returns";
    const params = {
      search: value
    }
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
      params
    });
  },
  getDataPagination: (current: number, size: number) => {
    const url = "api/v1/manage/returns";
    const params = {
      page: current,
      page_size: size,
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
  postDataPayment: (data: object) => {
    const url = "api/v1/manage/returns";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  deleteReturn: (id: string) => {
    const url = `api/v1/manage/returns/${id}`;
    return axiosClient.delete(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
};
export default returnProduct;

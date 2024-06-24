import axiosClient from "./axiosClient";

const sellProduct = {
  getAll: () => {
    const url = "api/v1/manage/products";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDataUsers: () => {
    const url = "api/v1/users";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getCustomer: () => {
    const url = "api/v1/manage/customer";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },

  putDataCustomer: (data) => {
    const url = "api/v1/manage/customer";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
};
export default sellProduct;

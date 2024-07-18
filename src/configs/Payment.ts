
import axiosClient from "./axiosClient";
const payments = {

getDataSearchPayment: (data: string) => {
    const url = "api/v1/manage/payment";
    const params = {
        search: data
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
  getDataPaginationPayment: (current: number, size: number) => {
    const url = "api/v1/manage/payment";
    const params = {
      page: current,
      page_size: size
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
  deletePayment: (idItems: string) => {
    const url = `api/v1/manage/payment/${idItems}`;
    return axiosClient.delete(url, {
      headers: {
        },
    });
  },
};
export default payments;
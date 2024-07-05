import axiosClient from "./axiosClient";

const invoice = {
  getAllInvoices: () => {
    const url = "api/v1/manage/invoice";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDataSearchInvoice: (value: string) => {
    const url = `api/v1/manage/invoice`;
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
  getDataDetailInvoiceReturn: (id: string) => {
    const url = `api/v1/manage/invoice/${id}`;
        return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    
    });
  },
};
export default invoice;

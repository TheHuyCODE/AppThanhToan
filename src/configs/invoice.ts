import axiosClient from "./axiosClient";

const invoice = {
  getAllInvoices: () => {
    const url = "api/v1/manage/invoice";
    const params = {
      page: 1,
      page_size: 7
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
  getDataPagination: (current: number, size: number) => {
    const url = "api/v1/manage/invoice";
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

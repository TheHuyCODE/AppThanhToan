import axiosClient from "./axiosClient";

const invoice = {

  getAll: () => {
    const url = "api/v1/manage/invoice";

    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },

    });
  },
  getAllInvoices: () => {
    const url = "api/v1/manage/invoice";
    const params = {
      page: 1,
      page_size: 10
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
  sortDataInvoice: (colName: string, typeSort: string) => {
    const url = "api/v1/manage/invoice";
    const params = {
      sort: `${colName}`,
      order_by: `${typeSort}`,
    }
    return axiosClient.get(url, {
      headers: {
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
  deleteInvoices: (idInvoices: string) => {
    const url = `api/v1/manage/invoice/${idInvoices}`;
    return axiosClient.delete(url, {
      headers: {

      },

    });
  },
};
export default invoice;

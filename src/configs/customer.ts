import axiosClient from "./axiosClient";

const customer = {
  getAll: () => {
    const url = "api/v1/manage/customer";
    const params = {
      page: 1,
      page_size: 10,
    }
    return axiosClient.get(url, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",    
      },
      params,
    });
  },
  getDataPaginationCustomer: (current: number, size: number) => {
    const url = "api/v1/manage/customer";
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
  getDataSearchCustomer: (data:string) => {
    const url = "api/v1/manage/customer";
    const params = {
      search: data
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
  addDataCustomer: (data: object) => {
    const url = "api/v1/manage/customer";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  deleteCustomer: (idItems: string | null) => {
    const url = `api/v1/manage/customer/${idItems}`;
    return axiosClient.delete(url, {
         });
  },
}
export default customer;

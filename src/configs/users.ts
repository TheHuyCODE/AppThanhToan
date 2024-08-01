import axiosClient from "./axiosClient";

const users = {
  getAll: () => {
    const url = "api/v1/manage/user";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDataUsers: () => {
    const url = "api/v1/manage/user";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDetailUsers: (idItems: string | undefined) => {
    const url = `api/v1/manage/user/${idItems}`;
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  getDataSearchUsers: (value: string) => {
    const url = `api/v1/manage/user`;
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
  getDataPagination: (current: number, size: number) => {
    const url = "api/v1/manage/user";
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
  getDataRole: () => {
    const url = "api/v1/manage/role";
    return axiosClient.get(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  deleteUsers: (id: string | undefined) => {
    const url = `api/v1/manage/user/${id}`;
    return axiosClient.delete(url, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  addUser: (data: any) => {
    const url = "api/v1/manage/user";
    return axiosClient.post(url, data, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
  modifyUser: (data: object) => {
    const url = "api/v1/manage/user";
    return axiosClient.put(url, data, {
      headers: {
        // Authorization: `Bearer ${accessToken}`,

      },
    });
  }

};
export default users;

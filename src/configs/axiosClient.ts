import axios from "axios";
import queryString from "query-string";
const BASEURL = import.meta.env.VITE_APP_API_URL;

const access_token = localStorage.getItem("access_token");
const axiosClient = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
});
axiosClient.interceptors.request.use(async (config) => {
  return config;
});
axiosClient.interceptors.response.use(
  async (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return error.response;
  }
);
export default axiosClient;

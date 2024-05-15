import axios from "axios";
import queryString from "query-string";
const BASEURL = 'https://32cc-14-231-206-191.ngrok-free.app'
const axiosClient = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
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

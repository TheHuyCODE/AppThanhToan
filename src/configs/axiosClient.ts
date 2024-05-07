import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: "https://835c-118-70-136-195.ngrok-free.app",
  headers: {
    "Content-Type": "application/json",
    'Authorization': `bearer ${localStorage.getItem('access_token')}`
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

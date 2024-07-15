import { Modal } from "antd";
import axios from "axios";
import queryString from "query-string";
const BASEURL = import.meta.env.VITE_APP_API_URL;
const axiosClient = axios.create({
  baseURL: BASEURL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${Access_token}`,
  },
  paramsSerializer: (params) => queryString.stringify(params),
  validateStatus: function (status) {
    return status >= 200 && status < 300; // default
  },
});
axiosClient.interceptors.request.use(async (config) => {
  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    config.headers.Authorization = `Bearer ${access_token}`;
  }
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
    // Call api có refresh token
    return error.response;
  }
  );
// function showLogoutPopup() {
//   Modal.error({
//     title: "Session Expired",
//     content: "Your session has expired. Please log in again.",
//     onOk: () => {
//       // Clear token and redirect to login page
//       localStorage.removeItem("access_token");
//       window.location.href = "/login"; // Adjust the path as needed
//     },
//   });
// }
export default axiosClient;

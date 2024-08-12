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
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const newAccessToken = await refreshAccessToken();
        axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosClient(originalRequest);
      } catch (err) {
        // Nếu refresh token thất bại, hiển thị popup yêu cầu đăng nhập lại
        showLogoutPopup();
        return Promise.reject(err);
      }
    }
    return Promise.reject(error.response ? error.response.data : error);
  }
);
const refreshAccessToken = async () => {
  const refresh_token = localStorage.getItem("refresh_token");
  try {
    const response = await axios.post(`${BASEURL}/v1/auth/refresh`, {
      refresh_token,
    });
    const { access_token } = response.data;
    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.log('err')
    // showLogoutPopup();
    throw error;
  }
};
const showLogoutPopup = () => {
  Modal.error({
    title: "Hết phiên đăng nhập",
    content: 'Vui lòng đăng nhập lại' || '',
    width: 600,
    centered: true,
    onOk: () => {
      // Xóa token và chuyển hướng đến trang đăng nhập
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("INFO_USER");
      window.location.href = "/login"; // Điều chỉnh đường dẫn nếu cần
    },
  });
}
export default axiosClient;

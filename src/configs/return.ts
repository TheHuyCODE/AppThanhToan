import axiosClient from "./axiosClient";

const ReturnProduct = {
//   getAll: () => {
//     const url = "api/v1/manage/products";
//     return axiosClient.get(url, {
//       headers: {
//         // Authorization: `Bearer ${accessToken}`,
//         "Content-Type": "application/json",
//         "ngrok-skip-browser-warning": "true",
//       },
//     });
//   },


  postDataPayment: (data: object) => {
    const url = "api/v1/manage/return";
    return axiosClient.post(url, data, {
      headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true",
      },
    });
  },
};
export default ReturnProduct;

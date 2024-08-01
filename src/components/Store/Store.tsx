import React from "react";
import { ToastContainer } from "react-toastify";

const Store = () => {
  return (
    <div className="content">
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="header-customer">
        <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
          Quản lí thông tin cửa hàng
        </h1>
        <div className=""></div>
      </div>
    </div>
  );
};

export default Store;

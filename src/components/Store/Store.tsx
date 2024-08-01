import React from "react";
import { ToastContainer } from "react-toastify";
import "./store.css";
import logoStore from "../../../public/Logo.png";
import { Input } from "antd";
const Store = () => {
  return (
    <div className="content">
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="header-customer">
        <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
          Quản lí thông tin cửa hàng
        </h1>
      </div>
      <div className="content-store">
        <div className="content-left">
          <div className="preview-image-store">
            <img src={logoStore} alt="logostore" />
          </div>
        </div>
        <div className="content-mid">
          <div className="profile-input-store">
            <label htmlFor="email">
              Tên cửa hàng(<span>*</span>)
            </label>
            <Input placeholder="Tên của hàng" className="input-field" />
          </div>
          <div className="profile-input-store">
            <label htmlFor="email">
              Email(<span>*</span>)
            </label>
            <Input placeholder="Email" className="input-field" style={{ width: "100%" }} />
          </div>
        </div>
        <div className="content-right">
          <div className="profile-input-store">
            <label htmlFor="phone">Số điện thoại</label>
            <Input
              placeholder="Số điện thoại"
              className="input-field"
              // value={phone || ""}
              // onChange={(e) => onChangeProfile("phone", e.target.value)}
            />
          </div>
          <div className="profile-input-store">
            <label htmlFor="address">Địa chỉ</label>
            <Input
              placeholder="Địa chỉ"
              className="input-field"
              // value={address || ""}
              // onChange={(e) => onChangeProfile("address", e.target.value)

              // }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Store;

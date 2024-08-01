import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./store.css";
import logoStore from "../../../public/Logo.png";
import { Input } from "antd";
import store from "../../configs/store";
import { FaRegSave } from "react-icons/fa";
import { handleError } from "../../utils/errorHandler";
interface StoreProps {
  name: string;
  email: string;
  phone: string;
  address: string;
}
const Store = () => {
  const [dataStore, setDataStore] = useState<StoreProps>({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const getDataStore = async () => {
    try {
      const res = await store.getAll();
      console.log("data", res.data);
      const dataStore = res.data;
      setDataStore(dataStore);
    } catch (err) {
      prompt("Not get data store");
    }
  };
  const handleChangeValue = (value: string | null, field: string) => {
    setDataStore((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log("valuesStore", dataStore);
  };
  const onSaveChangeDataStore = async () => {
    const dataDetail = {
      name: dataStore.name,
      email: dataStore.email,
      address: dataStore.address,
      phone: dataStore.phone,
    };
    try {
      const res = await store.putDataStore(dataDetail);
      console.log("res", res.data);
      const mesSucces = "Đã sửa thông tin cửa hàng thành công";
      toast.success(mesSucces);
      await getDataStore();
    } catch (error) {
      handleError(error);
    }
  };
  useEffect(() => {
    getDataStore();
  }, []);
  useEffect(() => {
    console.log("valuesStore updated", dataStore);
  }, [dataStore]);
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
            <Input
              placeholder="Tên của hàng"
              className="input-field"
              onChange={(e) => handleChangeValue(e.target.value, "name")}
              value={dataStore?.name || ""}
            />
          </div>
          <div className="profile-input-store">
            <label htmlFor="email">
              Email(<span>*</span>)
            </label>
            <Input
              placeholder="Email"
              className="input-field"
              style={{ width: "100%" }}
              onChange={(e) => handleChangeValue(e.target.value, "email")}
              value={dataStore?.email || ""}
            />
          </div>
        </div>
        <div className="content-right">
          <div className="profile-input-store">
            <label htmlFor="phone">Số điện thoại</label>
            <Input
              placeholder="Số điện thoại"
              className="input-field"
              value={dataStore?.phone || ""}
              onChange={(e) => handleChangeValue(e.target.value, "phone")}
            />
          </div>
          <div className="profile-input-store">
            <label htmlFor="address">Địa chỉ</label>
            <Input
              placeholder="Địa chỉ"
              className="input-field"
              value={dataStore?.address || ""}
              onChange={(e) => handleChangeValue(e.target.value, "address")}
              // }
            />
          </div>
        </div>
        <button
          className="btn-save-profile"
          onClick={onSaveChangeDataStore}
          style={{
            marginTop: "16rem",
            display: "flex",
            alignItems: "center",
            gap: "5px",
            padding: "5px",
          }}
        >
          <FaRegSave />
          Lưu
        </button>
      </div>
    </div>
  );
};

export default Store;

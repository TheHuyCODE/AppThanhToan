import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import owners from "../../configs/owner";
import { toast } from "react-toastify";
import { handleError } from "../../utils/errorHandler";

interface ModalModifyOwnersProp {
  isOpenModalModifyOwners: boolean;
  nameOwners: string | null;
  idModifyOwners: string;
  handleCloseModalModify: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  getDataOwners: () => void;
}

const ModalModifyOwners: React.FC<ModalModifyOwnersProp> = ({
  isOpenModalModifyOwners,
  nameOwners,
  idModifyOwners,
  handleCloseModalModify,
  setLoading,
  getDataOwners,
}) => {
  const [inputStore, setInputStore] = useState({
    name: "",
    full_name: "",
    phone: "",
    email: "",
    address: "",
  });
  const getDataModify = async () => {
    try {
      const res = await owners.getDataModify(idModifyOwners);
      const data = res.data;
      setInputStore({
        name: data.store.name || "",
        full_name: data.full_name || "",
        phone: data.phone || "",
        email: data.email || "",
        address: data.address || "",
      });
    } catch (error) {
      handleError(error);
    }
  };
  const handleModifyOwners = async () => {
    setLoading(true);
    try {
      const res = await owners.modifyOwners(inputStore, idModifyOwners);
      console.log("res", res.data);
      toast.success("Sửa thông tin thành công! ");
      handleCloseModalModify();
      getDataOwners();
      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (isOpenModalModifyOwners) {
      getDataModify();
    }
  }, [isOpenModalModifyOwners]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputStore({ ...inputStore, [name]: value });
    console.log("inputStore", inputStore);
  };

  return (
    <>
      <Modal
        className="modalDialog-addItems"
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        centered
        open={isOpenModalModifyOwners}
        onOk={handleModifyOwners}
        onCancel={handleCloseModalModify}
        okText="Lưu"
        cancelText="Hủy bỏ"
        // Add your onOk function to handle save
      >
        <h1 className="title-addItem">Sửa chủ sở hữu {nameOwners}</h1>
        <div className="admin-bank bank-input-container">
          <label htmlFor="admin_bank">
            Email<span>*</span>:
          </label>
          <Input
            placeholder="Nhập email đăng kí"
            className="input-name-category"
            name="email"
            autoComplete="off"
            value={inputStore.email}
            onChange={handleInputChange}
            disabled={true}
            style={{ width: "320px", height: "40px" }}
          />
        </div>

        <div className="number-bank bank-input-container">
          <label htmlFor="number_bank">
            Họ và tên<span>*</span>:
          </label>
          <div>
            <Input
              type="text"
              name="full_name"
              className="input-name-category"
              autoComplete="off"
              value={inputStore.full_name}
              onChange={handleInputChange}
              placeholder="Nhập họ tên"
              style={{ width: "320px", height: "40px" }}
            />
          </div>
        </div>
        <div className="number-bank bank-input-container">
          <label htmlFor="number_bank">
            Số điện thoại<span>*</span>:
          </label>
          <div>
            <Input
              type="text"
              name="phone"
              className="input-name-category"
              autoComplete="off"
              value={inputStore.phone}
              onChange={handleInputChange}
              placeholder="Nhập số điện thoại"
              style={{ width: "320px", height: "40px" }}
            />
          </div>
        </div>
        <div className="number-bank bank-input-container">
          <label htmlFor="number_bank">
            Địa chỉ<span>*</span>:
          </label>
          <div>
            <Input
              type="text"
              name="address"
              className="input-name-category"
              autoComplete="off"
              value={inputStore.address}
              onChange={handleInputChange}
              placeholder="Nhập địa chỉ"
              style={{ width: "320px", height: "40px" }}
            />
          </div>
        </div>
        <div className="admin-bank bank-input-container">
          <label htmlFor="admin_bank">
            Tên cửa hàng<span>*</span>:
          </label>
          <Input
            placeholder="Nhập tên cửa hàng"
            className="input-name-category"
            name="name"
            autoComplete="off"
            value={inputStore.name}
            onChange={handleInputChange}
            style={{ width: "320px", height: "40px" }}
            disabled={true}
          />
        </div>
        {/* {errorMessage && (
          <div
            style={{
              color: "red",
              textAlign: "center",
              marginTop: "1rem",
            }}
          >
            {errorMessage}
          </div>
        )} */}
      </Modal>
    </>
  );
};

export default ModalModifyOwners;

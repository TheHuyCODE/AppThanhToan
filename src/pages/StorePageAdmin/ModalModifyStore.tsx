import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import store from "../../configs/store";
import { handleError } from "../../utils/errorHandler";
import Store from "../../components/Store/Store";
import { toast } from "react-toastify";
interface ModalModifyStoreProp {
  isOpenModalModifyStores: boolean;
  idDeleteStores: string;
  handleCloseModalModify: () => void;
  getDataStores: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const ModalModifyStore: React.FC<ModalModifyStoreProp> = ({
  isOpenModalModifyStores,
  idDeleteStores,
  handleCloseModalModify,
  setLoading,
  getDataStores,
}) => {
  const [inputStore, setInputStore] = useState({
    name: "",
    owner_name: "",
    phone: "",
    address: "",
  });
  const getDataModify = async () => {
    try {
      const res = await store.getDataModifyStoreAdmin(idDeleteStores);
      const data = res.data;
      setInputStore({
        name: data.name || "",
        owner_name: data.owner_name || "",
        phone: data.phone || "",
        address: data.address || "",
      });
    } catch (error) {
      handleError(error);
    }
  };
  const handleModifyStores = async () => {
    setLoading(true);
    try {
      const res = await store.modifyStoreAdmin(inputStore, idDeleteStores);
      console.log("res", res.data);
      toast.success("Sửa thông tin thành công! ");
      handleCloseModalModify();
      getDataStores();
      setLoading(false);
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputStore({ ...inputStore, [name]: value });
    console.log("inputStore", inputStore);
  };
  useEffect(() => {
    if (isOpenModalModifyStores) {
      getDataModify();
    }
  }, [isOpenModalModifyStores]);

  return (
    <>
      <Modal
        className="modalDialog-addItems"
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        centered
        open={isOpenModalModifyStores}
        onOk={handleModifyStores}
        onCancel={handleCloseModalModify}
        okText="Lưu"
        cancelText="Hủy bỏ"
        // Add your onOk function to handle save
      >
        <h1 className="title-addItem">Sửa thông tin cửa hàng</h1>

        <div className="number-bank bank-input-container">
          <label htmlFor="number_bank">
            Tên của hàng<span>*</span>:
          </label>
          <div>
            <Input
              type="text"
              name="name"
              className="input-name-category"
              autoComplete="off"
              value={inputStore.name}
              onChange={handleInputChange}
              placeholder="Nhập tên cửa hàng"
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
              placeholder="Số điện thoại"
              style={{ width: "320px", height: "40px" }}
            />
          </div>
        </div>
        <div className="number-bank bank-input-container">
          <label htmlFor="number_bank">
            Chủ cửa hàng<span>*</span>:
          </label>
          <div>
            <Input
              type="text"
              name="owner_name"
              className="input-name-category"
              autoComplete="off"
              value={inputStore.owner_name}
              onChange={handleInputChange}
              placeholder="Chủ cửa hang"
              style={{ width: "320px", height: "40px" }}
            />
          </div>
        </div>
        <div className="admin-bank bank-input-container">
          <label htmlFor="admin_bank">
            Địa chỉ<span>*</span>:
          </label>
          <Input
            placeholder="Địa chỉ cửa hàng"
            className="input-name-category"
            name="address"
            autoComplete="off"
            value={inputStore.address}
            onChange={handleInputChange}
            style={{ width: "320px", height: "40px" }}
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

export default ModalModifyStore;

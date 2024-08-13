import { Input, Modal } from "antd";
import React, { useEffect, useState } from "react";
import owners from "../../configs/owner";
import { toast } from "react-toastify";
import { handleError } from "../../utils/errorHandler";
interface ModalAddOwnersProps {
  isModalAddOwners: boolean;
  handleClickOpenModal: () => void;
}
const ModalAddOwners: React.FC<ModalAddOwnersProps> = ({
  isModalAddOwners,
  handleClickOpenModal,
}) => {
  const [inputStore, setInputStore] = useState({
    name: "",
    full_name: "",
    email: "",
  });
  const [emailError, setEmailError] = useState<string | null>(null);
  const [isEmailTouched, setIsEmailTouched] = useState<boolean>(false);
  const [stateBtnAdd, setStateBtnAdd] = useState<boolean>(true);

  const validateEmail = (email: string) => {
    const regex =
      /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/;
    return regex.test(email);
  };

  const validateForm = () => {
    const { name, full_name, email } = inputStore;
    const isEmailValid = validateEmail(email);
    const isFormValid = name.trim() !== "" && full_name.trim() !== "" && isEmailValid;
    setStateBtnAdd(!isFormValid);
  };
  const setHandleInputOwners = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "email") {
      setIsEmailTouched(true);
      if (value.trim() === "") {
        setEmailError(null);
      } else if (!validateEmail(value)) {
        setEmailError("Email không hợp lệ");
      } else {
        setEmailError(null);
      }
    }
    setInputStore((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      console.log("newState", newState);
      validateForm();
      return newState;
    });
  };
  useEffect(() => {
    validateForm();
  }, [isModalAddOwners]);
  const clickAddUserBanking = async () => {
    const formDataOwners = {
      name: inputStore.name,
      full_name: inputStore.full_name,
      email: inputStore.email,
    };
    try {
      const res = await owners.putOwmers(formDataOwners);
      console.log("data", res.data);
      toast.success("Thêm tài khoản thành công");
      setInputStore({
        name: "",
        full_name: "",
        email: "",
      });
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <Modal
        className="modalDialog-addItems"
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" }, disabled: stateBtnAdd }}
        centered
        open={isModalAddOwners}
        onOk={clickAddUserBanking}
        onCancel={handleClickOpenModal}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Thêm tài khoản</h1>
        <div className="admin-bank bank-input-container">
          <label htmlFor="admin_bank">
            Tên cửa hàng<span>*</span>:
          </label>
          <Input
            placeholder="Nhập tên cửa hàng"
            className="input-name-category"
            name="name"
            onChange={setHandleInputOwners}
            value={inputStore.name}
            style={{ width: "320px", height: "40px" }}
          />
        </div>
        <div className="number-bank bank-input-container">
          <label htmlFor="number_bank">
            Họ và tên<span>*</span>:
          </label>
          <div>
            <Input
              // ref={numberRef}
              type="text"
              name="full_name"
              className="input-name-category"
              onChange={setHandleInputOwners}
              value={inputStore.full_name}
              placeholder="Nhập họ tên"
              style={{ width: "320px", height: "40px" }}
            />
          </div>
        </div>
        <div className="admin-bank bank-input-container">
          <label htmlFor="admin_bank">
            Email<span>*</span>:
          </label>
          <Input
            placeholder="Nhập email đăng kí"
            className="input-name-category"
            onChange={setHandleInputOwners}
            value={inputStore.email}
            name="email"
            style={{ width: "320px", height: "40px" }}
          />
        </div>
        {isEmailTouched && emailError && (
          <div
            style={{
              color: "red",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: "4rem",
            }}
          >
            {emailError}
          </div>
        )}
      </Modal>
    </>
  );
};

export default ModalAddOwners;

import { Input, Modal, Select, Spin } from "antd";
import React, { useEffect, useState } from "react";
import users from "../../../configs/users";
import { handleError } from "../../../utils/errorHandler";
import { toast } from "react-toastify";
import { REGEX_EMAIL } from "../../TableConfig/TableConfig";
import { LoadingOutlined } from "@ant-design/icons";
import "../User.css";

interface ModalAddUsersProps {
  openModalAdd: boolean;
  dataRole: any;
  handleCloseModalAdd: () => void;
  getDataUsers: () => Promise<void>;
}

const ModalAddUsers: React.FC<ModalAddUsersProps> = ({
  openModalAdd,
  dataRole,
  handleCloseModalAdd,
  getDataUsers,
}) => {
  const statusUser = "Kích hoạt";
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [valueInputUser, setValueInputUser] = useState({
    name: "",
    email: "",
    phone: "",
    idAuth: 0,
    is_active: 1, // Mặc định là kích hoạt
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState("");
  const [touchedFields, setTouchedFields] = useState({
    name: false,
    email: false,
  });
  const [inputFocused, setInputFocused] = useState({
    name: false,
    email: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueInputUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputFocus = (field: string) => {
    setInputFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleInputBlur = (field: string) => {
    setInputFocused((prev) => ({ ...prev, [field]: false }));
    setTouchedFields((prev) => ({ ...prev, [field]: true }));
    validateField(field);
  };

  const validateField = (field: string) => {
    switch (field) {
      case "name":
        if (!valueInputUser.name.trim()) {
          setNameError("Trường này là bắt buộc!");
        } else {
          setNameError("");
        }
        break;
      case "email":
        if (!valueInputUser.email.trim()) {
          setEmailError("Trường này là bắt buộc!");
        } else if (!validateEmail(valueInputUser.email)) {
          setEmailError("Email không hợp lệ!");
        } else {
          setEmailError("");
        }
        break;
    }
  };

  const selectAuth = dataRole?.map((items: any) => ({
    id: items.id,
    key: items.key,
    name: items.name,
    value: items.name,
    label: items.name,
  }));

  const findIdByName = (name: string) => {
    const selectedItem = dataRole.find((item: any) => item.name === name);
    const idSelected = parseInt(selectedItem.id, 10);
    setValueInputUser((prevState) => ({
      ...prevState,
      idAuth: idSelected,
    }));
    setSelectedRole(name);
  };

  const validateEmail = (email: string) => {
    const regex = REGEX_EMAIL;
    return regex.test(email);
  };

  useEffect(() => {
    const { name, email, idAuth } = valueInputUser;
    const isEmailValid = validateEmail(email);

    const isValid =
      name.trim() !== "" &&
      email.trim() !== "" &&
      idAuth !== 0 &&
      isEmailValid &&
      !nameError &&
      !emailError;
    setIsFormValid(isValid);
  }, [valueInputUser, nameError, emailError]);

  const clearInputAddUser = () => {
    setValueInputUser({
      name: "",
      email: "",
      phone: "",
      idAuth: 0,
      is_active: 1,
    });
    setSelectedRole(null);
    setEmailError("");
    setNameError("");
    setTouchedFields({
      name: false,
      email: false,
    });
  };

  const handleAddUser = async () => {
    if (!isFormValid) return;

    setIsLoading(true);
    const dataUser = {
      full_name: valueInputUser.name,
      phone: valueInputUser.phone,
      email: valueInputUser.email,
      role_id: valueInputUser.idAuth,
      is_active: valueInputUser.is_active,
    };

    try {
      const res = await users.addUser(dataUser);
      //@ts-ignore
      const msSuccess = res.message.text;
      toast.success(msSuccess);
      clearInputAddUser();
      await getDataUsers();
      handleCloseModalAdd();
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  const getButtonStyle = () => {
    return {
      backgroundColor: isFormValid && !isLoading ? "var(--kv-success)" : "rgba(0, 128, 0, 0.5)",
      color: "white",
      opacity: isFormValid && !isLoading ? 1 : 0.7,
    };
  };

  const getCancelButtonStyle = () => {
    return {
      color: "red",
      borderColor: "red",
    };
  };

  return (
    <>
      <Modal
        className="modalDialog-addItems"
        okButtonProps={{
          style: getButtonStyle(),
          disabled: !isFormValid || isLoading,
          icon: isLoading ? <Spin indicator={antIcon} /> : null,
        }}
        cancelButtonProps={{
          style: getCancelButtonStyle(),
          className: "custom-cancel-button",
        }}
        width={600}
        centered
        open={openModalAdd}
        onOk={handleAddUser}
        onCancel={handleCloseModalAdd}
        okText={isLoading ? "Đang thêm..." : "Thêm"}
        cancelText="Hủy bỏ"
        confirmLoading={isLoading}
      >
        <h2 className="title-addItem">Thêm người dùng</h2>
        <div className="content-add-user">
          <div className="content-add-user-row">
            <label htmlFor="name">
              Họ tên(<span>*</span>)
            </label>
            <div>
              <Input
                type="text"
                onChange={handleInputChange}
                onFocus={() => handleInputFocus("name")}
                onBlur={() => handleInputBlur("name")}
                value={valueInputUser.name}
                name="name"
                placeholder="Họ tên"
                style={{ width: "400px", height: "40px" }}
                className={
                  touchedFields.name && nameError && !inputFocused.name ? "error-input" : ""
                }
              />
              {touchedFields.name && nameError && !inputFocused.name && (
                <p style={{ color: "red", fontSize: "12px" }}>{nameError}</p>
              )}
            </div>
          </div>
          <div className="content-add-user-row">
            <label htmlFor="email">
              Email(<span>*</span>)
            </label>
            <div>
              <Input
                type="text"
                onChange={handleInputChange}
                onFocus={() => handleInputFocus("email")}
                onBlur={() => handleInputBlur("email")}
                value={valueInputUser.email}
                name="email"
                placeholder="Email"
                style={{ width: "400px", height: "40px" }}
                className={
                  touchedFields.email && emailError && !inputFocused.email ? "error-input" : ""
                }
              />
              {touchedFields.email && emailError && !inputFocused.email && (
                <p style={{ color: "red", fontSize: "12px" }}>{emailError}</p>
              )}
            </div>
          </div>
          <div className="content-add-user-row">
            <label htmlFor="phone">Số điện thoại</label>
            <div>
              <Input
                type="text"
                onChange={handleInputChange}
                value={valueInputUser.phone}
                name="phone"
                placeholder="Số điện thoại"
                style={{ width: "400px", height: "40px" }}
              />
            </div>
          </div>
          <div className="content-add-user-row">
            <label htmlFor="role">
              Nhóm quyền(<span>*</span>)
            </label>
            <div>
              <Select
                value={selectedRole}
                notFoundContent="Không tìm quyền"
                placeholder="Chọn nhóm quyền"
                allowClear
                optionFilterProp="children"
                onChange={findIdByName}
                style={{ width: 400, height: 40 }}
                options={selectAuth}
              />
            </div>
          </div>
          <div className="content-add-user-row">
            <label htmlFor="status">Trạng thái</label>
            <div>
              <Select
                defaultValue="1"
                style={{ width: "400px", height: "40px" }}
                onChange={(value) => {
                  setValueInputUser((prevState) => ({
                    ...prevState,
                    is_active: value === "1" ? 1 : 0,
                  }));
                }}
              >
                <Select.Option value="1">Kích hoạt</Select.Option>
                <Select.Option value="0">Không kích hoạt</Select.Option>
              </Select>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddUsers;

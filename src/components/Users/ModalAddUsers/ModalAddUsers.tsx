import { Input, Modal, Select } from "antd";
import React, { useEffect, useState } from "react";
import { REGEX_EMAIL } from "../../TableConfig/TableConfig";
import users from "../../../configs/users";
import { handleError } from "../../../utils/errorHandler";
import { toast } from "react-toastify";

interface ModalAddUsersProps {
  openModalAdd: boolean;
  dataRole: any;
  handleCloseModalAdd: () => void;
  getDataUsers: () => void;
}
const ModalAddUsers: React.FC<ModalAddUsersProps> = ({
  openModalAdd,
  dataRole,
  handleCloseModalAdd,
  getDataUsers,
}) => {
  const statusUser = "Kích hoạt";
  const [valueInputUser, setValueInputUser] = useState({
    name: "",
    email: "",
    phone: "",
    idAuth: 0,
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueInputUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // console.log("valueInputUser", valueInputUser);
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
    console.log("id", selectedItem.id);
    const idSelected = parseInt(selectedItem.id, 10);
    setValueInputUser((prevState) => ({
      ...prevState,
      idAuth: idSelected,
    }));
  };
  const isValidEmail = (email: any) => {
    const REGEX_EMAIL_TEST = REGEX_EMAIL;
    return REGEX_EMAIL_TEST.test(email);
  };
  const clearInputAddUser = () => {
    setValueInputUser({
      name: "",
      email: "",
      phone: "",
      idAuth: 0,
    });
  };
  const handleAddUser = async () => {
    const dataUser = {
      full_name: valueInputUser.name,
      phone: valueInputUser.phone,
      email: valueInputUser.email,
      role_id: valueInputUser.idAuth,
      is_active: 1,
    };
    try {
      const res = await users.addUser(dataUser);
      console.log("res", res);
      const msSuccess = res.message.text;
      toast.success(msSuccess);
      clearInputAddUser();
      await getDataUsers();
      handleCloseModalAdd();
    } catch (error) {
      handleError(error);
    }
  };
  //   useEffect(()=> {
  //     if(isValidEmail(valueInputUser.email)) {
  //             }
  //   }, [valueInputUser])

  return (
    <>
      <Modal
        className="modalDialog-addItems"
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        width={600}
        centered
        open={openModalAdd}
        onOk={handleAddUser}
        onCancel={handleCloseModalAdd}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h2 className="title-addItem">Thêm người dùng</h2>
        <div className="content-add-user">
          <div className="content-add-user-row">
            <label htmlFor="number_bank">
              Họ tên(<span>*</span>)
            </label>
            <div>
              <Input
                type="text"
                // className="input-name-category"
                onChange={handleInputChange}
                value={valueInputUser.name}
                name="name"
                placeholder="Họ tên"
                style={{ width: "400px", height: "40px" }}
              />
            </div>
          </div>
          <div className="content-add-user-row">
            <label htmlFor="number_bank">
              Email(<span>*</span>)
            </label>
            <div>
              <Input
                type="text"
                // className="input-name-category"
                onChange={handleInputChange}
                value={valueInputUser.email}
                name="email"
                placeholder="Email"
                style={{ width: "400px", height: "40px" }}
              />
            </div>
          </div>
          <div className="content-add-user-row">
            <label htmlFor="number_bank">Số điện thoại</label>
            <div>
              <Input
                type="text"
                // className="input-name-category"
                onChange={handleInputChange}
                value={valueInputUser.phone}
                name="phone"
                placeholder="Số điện thoại"
                style={{ width: "400px", height: "40px" }}
              />
            </div>
          </div>
          <div className="content-add-user-row">
            <label htmlFor="number_bank">
              Nhóm quyền(<span>*</span>)
            </label>
            <div>
              <Select
                notFoundContent="Không tìm quyền"
                placeholder="Chọn nhóm quyền"
                allowClear
                // onSearch={}
                optionFilterProp="children"
                onChange={findIdByName}
                style={{ width: 400, height: 40 }}
                options={selectAuth}
              />
            </div>
          </div>
          <div className="content-add-user-row">
            <label htmlFor="number_bank">Trạng thái</label>
            <div>
              <Input
                type="text"
                // className="input-name-category"
                // onChange={handleInputAddUser}v
                value={statusUser}
                disabled
                style={{ width: "400px", height: "40px" }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddUsers;

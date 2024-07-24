import { Input, Modal, Select } from "antd";
import React, { useState } from "react";

interface ModalAddUsersProps {
  openModalAdd: boolean;
  handleCloseModalAdd: () => void;
}
const ModalAddUsers: React.FC<ModalAddUsersProps> = ({ openModalAdd, handleCloseModalAdd }) => {
  const statusUser = "Kích hoạt";
  const [valueInputUser, setValueInputUser] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValueInputUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Modal
        className="modalDialog-addItems"
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        width={600}
        centered
        open={openModalAdd}
        //   onOk={clickAddUserBanking}
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
            <label htmlFor="number_bank">Số điện thoại</label>
            <div>
              <Select
                showSearch
                allowClear
                // onSearch={}
                notFoundContent="Không tìm quyền"
                placeholder="Chọn nhóm quyền"
                optionFilterProp="children"
                // onChange={onChange}
                style={{ width: 400, height: 40 }}

                // options={formatNameBanking}
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

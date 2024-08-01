import { DatePicker, Input, Select } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/valiables.css";
import "./User.css";
import users from "../../configs/users";
import { boolean } from "yup";
interface ModifyUsers {
  full_name: string;
  email: string;
  phone: string;
  role: any;
  is_active: boolean;
}
const ModifyUsers = () => {
  const navigate = useNavigate();
  const params = useParams<{ userId: string }>();
  const [dataModifyUsery, setDataModifyUser] = useState(null);
  const [dataStore, setDataStore] = useState<ModifyUsers>({
    full_name: "",
    email: "",
    phone: "",
    role: {},
    is_active: true,
  });
  const idProduct = params.userId;
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onClickBackPageUser = () => {
    //call api User before navigate to detail
    navigate("/admin/users/");
  };
  const handleChangeInputUsers = (value: string | null, filed: string) => {
    setDataStore((prev) => ({
      ...prev,
      [filed]: value,
    }));
  };
  const getDataModifyUser = async () => {
    try {
      const res = await users.getDetailUsers(idProduct);
      const data = res.data;
      console.log("data", data);
      setDataStore(data);
    } catch (error) {
      alert(error);
    }
  };
  useEffect(() => {
    getDataModifyUser();
  }, []);
  return (
    <>
      <div className="modify-users">
        <div
          className="title-info-users"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <IoIosArrowBack
            style={{ fontSize: "23px", color: "135597", cursor: "pointer" }}
            onClick={onClickBackPageUser}
          />
          <h1
            style={{
              fontSize: "26px",
              color: "#03176E",
            }}
          >
            Sửa thông tin người dùng
          </h1>
        </div>
        <div
          className="modify-users"
          style={{
            width: "550px",
            height: "auto",
            border: "1px solid lightgrey",
            borderRadius: "5px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
            marginTop: "20px",
          }}
        >
          <div className="input-info">
            <label htmlFor="name">
              Họ và Tên(<span>*</span>)
            </label>
            <Input
              type="text"
              className="input-form"
              onChange={(e) => handleChangeInputUsers(e.target.value, "name")}
              value={dataStore.full_name || ""}
            />
          </div>
          <div className="input-info">
            <label htmlFor="email">
              Email(<span>*</span>)
            </label>
            <Input
              type="text"
              className="input-form"
              value={dataStore.email || ""}
              onChange={(e) => handleChangeInputUsers(e.target.value, "email")}
            />
          </div>
          <div className="input-info">
            <label htmlFor="phone">Số điện thoại</label>
            <Input
              type="text"
              className="input-form"
              value={dataStore.phone || ""}
              onChange={(e) => handleChangeInputUsers(e.target.value, "phone")}
            />
          </div>

          <div className="input-info">
            <label htmlFor="">
              Nhóm quyền (<span>*</span>)
            </label>
            <Select
              notFoundContent="Không tìm quyền"
              placeholder="Chọn nhóm quyền"
              allowClear
              // onSearch={}
              optionFilterProp="children"
              // onChange={findIdByName}
              style={{ width: 300, height: 40 }}
              // options={selectAuth}
            />
          </div>

          <div className="input-info">
            <label htmlFor="">
              Trạng thái(<span>*</span>)
            </label>
            <Input
              type="text"
              className="input-form"
              value={dataStore.is_active ? "Kích hoạt" : "Chưa kích hoạt"}
            />
          </div>
          <div className="btn-info">
            <button className="btn-save" onClick={onClickBackPageUser}>
              Hủy bỏ
            </button>
            <button className="btn-cancel">Lưu</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyUsers;

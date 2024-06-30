import { DatePicker, Select } from "antd";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../styles/valiables.css";
import "./User.css";
const ModifyUsers = () => {
  const navigate = useNavigate();
  const genders = [
    { name: "Nam", value: 1 },
    { name: "Nữ", value: 2 },
    { name: "Không xác định", value: 3 },
  ];
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const onClickBackPageUser = () => {
    //call api User before navigate to detail
    navigate("/admin/users/");
  };
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
              fontFamily: "poppins, sans-serif",
              color: "#03176E",
            }}
          >
            Sửa đổi User
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
            <label htmlFor="">
              Họ và Tên(<span>*</span>)
            </label>
            <input type="text" className="input-form" />
          </div>
          <div className="input-info">
            <label htmlFor="">
              Số điện thoại(<span>*</span>)
            </label>
            <input type="text" className="input-form" />
          </div>
          <div className="input-info">
            <label htmlFor="">Mã số khách hàng</label>
            <input type="text" className="input-form" />
          </div>
          <div className="input-info">
            <label htmlFor="">Giới tính</label>
            <Select
              placeholder="Giới tính"
              allowClear
              // onChange={handleSelectChange}
              // defaultValue="Giới tính"
              style={{ width: 302, height: 36 }}
            >
              {genders.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
              /
            </Select>
          </div>
          <div className="input-info">
            <label htmlFor="">Ngày sinh</label>
            <DatePicker
              onChange={onChange}
              placeholder="DD/MM/YYYY"
              style={{ width: 302, height: 36 }}
            />
          </div>
          <div className="input-info">
            <label htmlFor="">Email</label>
            <input type="text" className="input-form" />
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

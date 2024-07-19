import { Button, DatePicker, Select } from "antd";
import React from "react";
import { CiSearch } from "react-icons/ci";

const HeaderUser = () => {
  //   const onChange = (date, dateString) => {
  //     console.log(date, dateString);
  //   };
  //   const genders = [
  //     { name: "Nam", value: 1 },
  //     { name: "Nữ", value: 2 },
  //     { name: "Không xác định", value: 3 },
  //   ];
  //   const stateUsers = [
  //     { name: "Đã đăng kí", value: 1 },
  //     { name: "Chưa đăng kí", value: 2 },
  //   ];

  return (
    <>
      <div
        className="header-top"
        style={{
          display: "flex",
          // alignContent: "space-between",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <div className="" style={{ display: "flex", position: "relative" }}>
          <input
            type="text"
            className="search-users"
            placeholder="Tìm Họ tên hoặc SĐT"
            //   onChange={onChangeSearchUsers}
          />
          <CiSearch
            className="icon"
            style={{
              position: "absolute",
              top: "7px",
              left: "5px",
              transform: "translateY(5%)",
              fontSize: "20px",
            }}
          />
        </div>
        <Select
          placeholder="Giới tính"
          allowClear
          // onChange={handleSelectChange}
          // defaultValue="Giới tính"
          style={{ width: 200, height: 35 }}
        >
          {/* {genders.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))} */}
          /
        </Select>
        <div
          className="date_users"
          style={{
            display: "flex",
            width: "400px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <p>Ngày sinh</p>
          <DatePicker placeholder="Từ ngày" />
          <DatePicker placeholder="Đến ngày" />
        </div>
        <div className="header-top right">
          <Select
            placeholder="Trạng thái đăng kí TK"
            allowClear
            // onChange={handleSelectChange}
            // defaultValue=""
            style={{ width: 180 }}
          >
            {/* {stateUsers.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))} */}
            /
          </Select>
          <Button type="primary">Hướng dẫn sử dụng</Button>
        </div>
      </div>
    </>
  );
};

export default HeaderUser;

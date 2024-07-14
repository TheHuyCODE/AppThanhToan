import { Button, DatePicker, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./User.css";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { BiBorderAll } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../styles/valiables.css";
const dataUsers = [
  {
    stt: 1,
    name: "Nguyễn Văn A",
    phone: "0987654321",
    email: "nguyenvana@gmail.com",
    gender: "Nam",
    numberOrder: 2,
    stateUsers: ["Đã đăng kí"],
    key: "dfasfasffsdf",
  },
  {
    stt: 2,
    name: "Nguyễn Thế B",
    phone: "03457754871",
    email: "nguyenvana@gmail.com",
    gender: "Nam",
    numberOrder: 2,
    stateUsers: ["Đã đăng kí"],
    key: "dfasfasffsd2323f",
  },
  {
    stt: 3,
    name: "Nguyễn Trường An",
    phone: "0987654321",
    email: "nguyenvana@gmail.com",

    gender: "Nam",
    numberOrder: 2,
    stateUsers: ["Chưa đăng kí "],

    key: "dfasfasffs323df",
  },
];
const Users = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(dataUsers);
  const onChange = (date, dateString) => {
    console.log(date, dateString);
  };
  const genders = [
    { name: "Nam", value: 1 },
    { name: "Nữ", value: 2 },
    { name: "Không xác định", value: 3 },
  ];
  const stateUsers = [
    { name: "Đã đăng kí", value: 1 },
    { name: "Chưa đăng kí", value: 2 },
  ];

  //search for users
  const onChangeSearchUsers = (e) => {
    const currValue = e.target.value;
    console.log("currValue", currValue);
    setValue(currValue);
    const filteredUsers = dataUsers.filter(
      (user) => user.name.includes(currValue) || user.phone.includes(currValue)
    );
    setDataSource(filteredUsers);
  };
  const detailUsers = (items) => {
    console.log("itemsId", items.key);
    navigate(`/admin/users/${items.key}`);
  };
  const modifyUsers = (items) => {
    console.log("itemsId", items.key);
    navigate(`/admin/users/edit/${items.key}`);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      sorter: (a, b) => a.name.length - b.name.length,
      sortDirections: ["descend"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Số lượng đơn hàng",
      dataIndex: "numberOrder",
      key: "numberOrder",
    },
    {
      title: "trạng thái ",
      dataIndex: "stateUsers",
      key: "stateUsers",
      render: (stateUsers) => (
        <span>
          {stateUsers.map((tag) => {
            let color = tag.length > 5 ? "grey" : "green";
            if (tag === "Đã đăng kí") {
              color = "green";
            }
            return (
              <Tag color={color} key={tag} style={{ borderRadius: "10px" }}>
                {tag.toUpperCase()}
              </Tag>
            );
          })}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <FaEye onClick={() => detailUsers(record)} />
          </a>
          <a>
            <FaPencilAlt onClick={() => modifyUsers(record)} />
          </a>
        </Space>
      ),
    },
  ];

  const columnsWithClick = columns?.map((col, index) => {
    if (index < 7) {
      return {
        ...col,
        key: col.key || `column-${index}`,
        onCell: (record) => ({
          onClick: () => {
            // checkQuatifyItem(record);
            const name = record.name;
            console.log(name);
            const keyChild = record.key;
            console.log("keyChild: ", keyChild);
            // setSelectedCategory(name);
            // setIsKeyChild(keyChild);
            // setViewTable(false);
            // fetchDataCategoryChild(keyChild);
          },
        }),
      };
    }
    return col;
  });
  return (
    <div className="content">
      <h1 style={{ fontFamily: "poppins, sans-serif", color: "#03176E" }}>Quản lí người dùng</h1>
      <div className="header">
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
              onChange={onChangeSearchUsers}
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
            {genders.map((option) => (
              <option value={option.value}>{option.name}</option>
            ))}
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
            <DatePicker onChange={onChange} placeholder="Từ ngày" />
            <DatePicker onChange={onChange} placeholder="Đến ngày" />
          </div>
          <div className="header-top right">
            <Select
              placeholder="Trạng thái đăng kí TK"
              allowClear
              // onChange={handleSelectChange}
              // defaultValue=""
              style={{ width: 180 }}
            >
              {stateUsers.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
              /
            </Select>
            <Button type="primary">Hướng dẫn sử dụng</Button>
          </div>
        </div>
        <div className="table-container">
          <Table
            columns={columnsWithClick}
            dataSource={dataSource}
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: () => {
            //       console.log(record, rowIndex);
            //     }, // click row
            //   };
            // }}
            pagination={false}
          ></Table>
          <span className="total-items">{`${dataSource?.length} items`}</span>
        </div>
      </div>
    </div>
  );
};
export default Users;

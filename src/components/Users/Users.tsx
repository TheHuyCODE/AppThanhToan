import { Button, DatePicker, Select, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./User.css";
import { FaEye, FaPencilAlt } from "react-icons/fa";
import { BiBorderAll } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../styles/valiables.css";
const Users = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState();
  //search for users
  const detailUsers = (items: any) => {
    console.log("itemsId", items.key);
    navigate(`/admin/users/${items.key}`);
  };
  const modifyUsers = (items: any) => {
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
      sortDirections: ["descend"],
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      defaultSortOrder: "descend",
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
      render: (stateUsers: any) => (
        <span>
          {stateUsers.map((tag: any) => {
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
      render: (record: any) => (
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
  // const getDataCustomer;
  return (
    <div className="content">
      <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
        Quản lí người dùng
      </h1>
      <div className="header">
        <div className="table-container">
          <Table
            columns={columns}
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

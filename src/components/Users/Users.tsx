import { Alert, Button, DatePicker, Select, Space, Table, TableColumnsType, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./User.css";
import { FaEye, FaPencilAlt, FaTrash } from "react-icons/fa";
import { BiBorderAll } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import "../styles/valiables.css";
import { ToastContainer } from "react-toastify";
import HeaderUser from "./HeaderUsers/HeaderUser";
import users from "../../configs/users";
import { DataUser } from "../TableConfig/TableConfig";
import ModalAddUsers from "./ModalAddUsers/ModalAddUsers";
type RecordType = DataUser;

const Users = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [dataUsers, setDataUsers] = useState<any[]>([]);
  const [dataRole, setDataRole] = useState();
  const [loading, setLoading] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);

  //search for users
  const detailUsers = (items: any) => {
    console.log("itemsId", items.key);
    navigate(`/admin/users/${items.key}`);
  };
  const modifyUsers = (items: any) => {
    console.log("itemsId", items.key);
    navigate(`/admin/users/edit/${items.key}`);
  };
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Họ tên",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      defaultSortOrder: "descend",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Nhóm quyền",
      dataIndex: "role",
      key: "role",
    },
    {
      title: "Thao tác",
      key: "action",
      width: 150,

      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaEye />
          </a>
          <a>
            <FaPencilAlt onClick={() => modifyUsers(record)} />
          </a>
          <a>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  const dataTableUsers: RecordType[] = dataUsers?.map((items, index) => ({
    stt: index + 1,
    id: items.id,
    full_name: items.full_name,
    email: items.email,
    phone: items.phone || "-",
    gender: items.gender === 1 ? "Nam" : "Nữ" || "", // Corrected the gender assignment
    role: items.role_id === 3 ? "Chủ của hàng" : "",
    key: items.id,
  }));
  const handleAddUsers = () => {
    setOpenModalAdd(true);
  };
  const handleCloseModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };
  const getDataUsers = async () => {
    try {
      const res = await users.getDataUsers();
      if (res.code === 200) {
        const data = res.data.items;
        console.log("data", data);
        setDataUsers(data);
      }
    } catch (error) {
      <Alert message="Error" type="error" showIcon />;
    }
  };
  const getRoleUsers = async () => {
    setLoading(true);
    try {
      const res = await users.getDataRole();
      const data = res.data;
      setDataRole(data);
      setLoading(false);
    } catch (error) {
      <Alert message="Error" type="error" showIcon />;
      setLoading(false);
    }
  };
  useEffect(() => {
    getRoleUsers();
    getDataUsers();
  }, []);
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
          Quản lí người dùng
        </h1>
        <div className="header-customers">
          <HeaderUser handleAddUsers={handleAddUsers} />
        </div>
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataTableUsers}
            pagination={false}
            loading={loading}
          />
          {/* <span className="total-items">{`${dataSource?.length} items`}</span> */}
        </div>
      </div>
      <ModalAddUsers openModalAdd={openModalAdd} handleCloseModalAdd={handleCloseModalAdd} />
    </>
  );
};
export default Users;

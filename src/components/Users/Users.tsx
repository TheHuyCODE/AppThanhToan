import { Alert, Pagination, Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import users from "../../configs/users";
import "../styles/valiables.css";
import { DataUser, localUsers } from "../TableConfig/TableConfig";
import HeaderUser from "./HeaderUsers/HeaderUser";
import ModalAddUsers from "./ModalAddUsers/ModalAddUsers";
import ModalDeleteUsers from "./ModalDeleteUsers/ModalDeleteUsers";
import "./User.css";
type RecordType = DataUser;

const Users = () => {
  const navigate = useNavigate();
  const [idDelete, setIdDelete] = useState("");
  const [dataUsers, setDataUsers] = useState<any[]>([]);
  const [dataRole, setDataRole] = useState();
  const [totalInvoice, setTotalInvoice] = useState(0);
  // sao k dung page
  //@ts-ignore
  const [_, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [openModalAdd, setOpenModalAdd] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);

  //search for users
  const modifyUsers = (items: any) => {
    console.log("itemsId", items.key);
    navigate(`/admin/users/edit/${items.key}`);
  };
  const deleteUsers = (record: any) => {
    setIdDelete(record.id);
    setOpenModalDelete(true);
  };
  const onCloseModalDelete = () => {
    setOpenModalDelete(!openModalDelete);
  };
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 90,
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
      key: "full_name",
      width: 130,
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
            <FaPencilAlt title="Sửa" onClick={() => modifyUsers(record)} />
          </a>
          <a>
            <FaTrash
              title="Xóa"
              style={{ color: "red" }}
              onClick={() => deleteUsers(record)}
            />
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
    gender: items.gender === 1 ? "Nam" : "Nữ", // Corrected the gender assignment
    role: items.role.name,
    key: items.id,
  }));
  const handleAddUsers = () => {
    setOpenModalAdd(true);
  };
  const handleCloseModalAdd = () => {
    setOpenModalAdd(!openModalAdd);
  };
  const getDataUsers = async () => {
    setLoading(true);
    try {
      const res = await users.getDataUsers();
      const data = res.data.items;
      const totalItems = res.data.total;
      setTotalInvoice(totalItems);
      setLoading(false);
      setDataUsers(data);
    } catch (error) {
      <Alert message="Error" type="error" showIcon />;
      setLoading(true);
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
      setLoading(true);
    }
  };
  const onShowSizeChange = (current: number, size: number) => {
    console.log("Current page:", current);
    console.log("Page size:", size);
    getDataPagination(current, size);
    setPage(current);
    setPageSize(size);
  };
  const onChangeNumberPagination = (current: number) => {
    console.log("Current page:", current);
    getDataPagination(current, pageSize);
    setPage(current);
  };
  const getDataPagination = async (current: number, size: number) => {
    setLoading(true);
    try {
      const res = await users.getDataPagination(current, size);
      if (res.data) {
        const data = res.data.items;
        setDataUsers(data);
        setLoading(false);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
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
        <h1
          style={{
            fontFamily: "var(--kv-font-sans-serif)",
            color: "var(--color-title)",
          }}
        >
          Quản lý nhân viên
        </h1>
        <div className="header-customers">
          <HeaderUser
            handleAddUsers={handleAddUsers}
            setLoading={setLoading}
            setDataUsers={setDataUsers}
            getDataUsers={getDataUsers}
          />
        </div>
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataTableUsers}
            locale={localUsers}
            pagination={false}
            loading={loading}
            scroll={{
              y: 500,
            }}
          />
          <div
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              gap: "10px",
              marginTop: "10px",
              padding: "10px",
            }}
          >
            <Pagination
              showSizeChanger
              onShowSizeChange={onShowSizeChange}
              onChange={onChangeNumberPagination}
              defaultCurrent={1}
              total={totalInvoice | 0}
            />
            <span className="total-items" style={{ color: "black" }}>{`${
              dataUsers.length | 0
            } nhân viên`}</span>
          </div>
          {/* <span className="total-items">{`${dataSource?.length} items`}</span> */}
        </div>
      </div>
      <ModalAddUsers
        openModalAdd={openModalAdd}
        handleCloseModalAdd={handleCloseModalAdd}
        dataRole={dataRole}
        getDataUsers={getDataUsers}
      />
      <ModalDeleteUsers
        openModalDelete={openModalDelete}
        idDelete={idDelete}
        onCloseModalDelete={onCloseModalDelete}
        setLoading={setLoading}
        getDataUsers={getDataUsers}
      />
    </>
  );
};
export default Users;

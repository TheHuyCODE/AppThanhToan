import { Space, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import owners from "../../configs/owner";
import TitleOwner from "./TilteOwner";
import HeaderContent from "../../components/HeaderComponent/HeaderContent";
import { localOwners } from "../../components/TableConfig/TableConfig";
import ErrorModal from "../../components/ErrorApi/ErrorApi";
import { FaLock, FaPencilAlt, FaTrash } from "react-icons/fa";
import ModalAddOwners from "./ModalAddOwners";

interface RecordType {
  stt: number;
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
}
const Owner = () => {
  const titleSearch = "Tìm kiếm chủ cửa hàng";
  const nameButtonAdd = "Thêm chủ cửa hàng";
  const titleName = "Quản lý chủ cửa hàng";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAddOwners, setIsModalAddOwners] = useState(false);
  const [isDataOwner, setIsDataOwner] = useState([]); // Trạng thái để điều khiển việc hiển thị modal
  const [errorMessage, setErrorMessage] = useState("");
  const getDataOwners = async () => {
    try {
      const res = await owners.getAll();
      const data = res.data.items;
      setIsDataOwner(data);
      console.log("data", res.data);
    } catch (error) {
      setErrorMessage("An error occurred while fetching data."); // Đặt thông báo lỗi
      setIsModalVisible(true); // Hiển thị modal
    }
  };
  const handleSearchOwners = () => {};
  const handleClickOpenModal = () => {
    setIsModalAddOwners(!isModalAddOwners);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false); // Đóng modal
  };
  useEffect(() => {
    getDataOwners();
  }, []);
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
      key: "full_name",
      align: "start",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "start",
      // width: 300,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      // width: 300,
    },
    {
      title: "Địa điểm",
      dataIndex: "address",
      key: "address",
      // width: 300,
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>
            <FaTrash style={{ color: "red" }} title="Xóa" />
          </a>
          <a>
            <FaPencilAlt title="Sửa" />
          </a>
          <a>
            <FaLock style={{ color: "black" }} title="Khóa" />
          </a>
        </Space>
      ),
    },
  ];
  const dataTableOwners = isDataOwner.map((items: any, value: number) => ({
    stt: value + 1,
    full_name: items.full_name,
    email: items.email,
    phone: items.phone,
    address: items.address,
    id: items.id,
  }));
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <TitleOwner titleName={titleName} />
        <div className="header-customers">
          <HeaderContent
            tilteSearch={titleSearch}
            nameButtonAdd={nameButtonAdd}
            handleSearch={handleSearchOwners}
            handleClickOpenModal={handleClickOpenModal}
          />
        </div>
        <ErrorModal
          visible={isModalVisible}
          errorMessage={errorMessage}
          onClose={handleCloseModal}
        />
        <ModalAddOwners
          isModalAddOwners={isModalAddOwners}
          handleClickOpenModal={handleClickOpenModal}
        />
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataTableOwners}
            locale={localOwners}
            pagination={false}
            // loading={loading}
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
            {/* <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onChangeNumberPagination}
            defaultCurrent={1}
            total={totalPage}
          />
          <span className="total-items" style={{ color: "black" }}>{`${totalPage} Tài khoản`}</span> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Owner;

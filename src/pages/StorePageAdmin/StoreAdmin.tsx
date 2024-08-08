import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import TitleOwner from "../OwnerManage/TilteOwner";
import HeaderContent from "../../components/HeaderComponent/HeaderContent";
import { Alert, Table } from "antd";
import { localStore } from "../../components/TableConfig/TableConfig";
import store from "../../configs/store";

const StoreAdmin = () => {
  const titleSearch = "Tìm kiếm cửa hàng";
  const nameButtonAdd = "Thêm cửa hàng";
  const titleName = "Quản lý cửa hàng";
  const handleSearchStore = () => {};
  const handleClickOpenModal = () => {};
  const getDataStores = async () => {
    try {
      const res = await store.getAllStoreAdmin();
      console.log("data", res.data);
    } catch (error) {
      <Alert message="Error" type="error" showIcon />;
    }
  };
  useEffect(() => {
    getDataStores();
  });
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên chủ khoản",
      dataIndex: "account_name",
      key: "account_name",
      align: "start",
    },
    {
      title: "Số tài khoản",
      dataIndex: "account_no",
      key: "account_no",
      align: "start",
      // width: 300,
    },
    {
      title: "Tên ngân hàng",
      dataIndex: "bank_name",
      key: "bank_name",
      // width: 300,
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      // render: (record) => (
      //   <Space size="middle">
      //     <a>
      //       <FaTrash style={{ color: "red" }} onClick={() => deleteDataPayment(record)} />
      //     </a>
      //   </Space>
      // ),
    },
  ];
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <TitleOwner titleName={titleName} />
        <div className="header-customers">
          <HeaderContent
            tilteSearch={titleSearch}
            nameButtonAdd={nameButtonAdd}
            handleSearch={handleSearchStore}
            handleClickOpenModal={handleClickOpenModal}
          />
        </div>
        <div className="table-container">
          <Table
            columns={columns}
            // dataSource={dataTable}
            locale={localStore}
            // pagination={false}
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

export default StoreAdmin;

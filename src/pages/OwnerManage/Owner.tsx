import { Alert, Table } from "antd";
import React, { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import owners from "../../configs/owner";
import TitleOwner from "./TilteOwner";
import HeaderContent from "../../components/HeaderComponent/HeaderContent";
import { localOwners } from "../../components/TableConfig/TableConfig";

const Owner = () => {
  const titleSearch = "Tìm kiếm chủ cửa hàng";
  const nameButtonAdd = "Thêm chủ cửa hàng";
  const titleName = "Quản lý chủ cửa hàng";
  const getDataOwners = async () => {
    try {
      const res = await owners.getAll();
      console.log("data", res.data);
    } catch (error) {
      <Alert message="Error" type="error" showIcon />;
    }
  };
  const handleSearchOwners = () => {};
  const handleClickOpenModal = () => {};
  useEffect(() => {
    getDataOwners();
  }, []);
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
            handleSearch={handleSearchOwners}
            handleClickOpenModal={handleClickOpenModal}
          />
        </div>
        <div className="table-container">
          <Table
            columns={columns}
            // dataSource={dataTable}
            locale={localOwners}
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

export default Owner;

import { Table } from "antd";
import React from "react";
import { AiOutlineCheck, AiOutlineClose } from "react-icons/ai";
import { CiSearch } from "react-icons/ci";

const Permissions = () => {
  const onChangeSearchPermissions = (e) => {
    console.log(e.target.value);
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên quyền",
      dataIndex: "name",
      key: "name",
      //   filteredValue: [isValueSearch],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.created_date)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.number_children)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      key: "description",
      // sorter: (record1, record2) => {
      //   return record1.Soluong > record2.Soluong;
      // },
      // sortIcon: ({sortOrder}) =><FaArrowAltCircleDown order={sortOrder}/>
    },
    {
      title: "Xem",
      dataIndex: "lookPermissions",
      key: "lookPermissions",
      render: (text) =>
        text === "Có" ? (
          <AiOutlineCheck style={{ color: "blue" }} />
        ) : (
          <AiOutlineClose style={{ color: "red" }} />
        ),
    },
    {
      title: "Thêm",
      dataIndex: "addPermissions",
      key: "addPermissions",
      render: (text) =>
        text === "Có" ? (
          <AiOutlineCheck style={{ color: "blue" }} />
        ) : (
          <AiOutlineClose style={{ color: "red" }} />
        ),
    },
    {
      title: "Xửa",
      dataIndex: "modifyPermission",
      key: "modifyPermission",
      render: (text) =>
        text === "Có" ? (
          <AiOutlineCheck style={{ color: "blue" }} />
        ) : (
          <AiOutlineClose style={{ color: "red" }} />
        ),
    },
    {
      title: "Xóa",
      key: "deletePermissions",
      dataIndex: "deletePermissions",
      render: (text) =>
        text === "Có" ? (
          <AiOutlineCheck style={{ color: "blue" }} />
        ) : (
          <AiOutlineClose style={{ color: "red" }} />
        ),
    },
  ];
  const dataSource = [
    {
      stt: 1,
      name: "Quyền 1",
      description: "Quyền được xem, thêm, sửa và xóa bài viết",
      lookPermissions: "Có",
      addPermissions: "Không",
      modifyPermission: "Có",
      deletePermissions: "Không",
    },
    {
      stt: 2,
      name: "Quyền 2",
      description: "Quyền được xem, thêm, sửa và xóa câu hỏi",
      lookPermissions: "Có",
      addPermissions: "Có",
      modifyPermission: "Không",
      deletePermissions: "Có",
    },
    {
      stt: 3,
      name: "Quyền 3",
      description:
        "Quyền được xem, tạo, xóa, tìm kiếm, thay đổi vị trí hiển thị của chi nhánh cửa hàng",
      lookPermissions: "Không",
      addPermissions: "Có",
      modifyPermission: "Có",
      deletePermissions: "Không",
    },
    {
      stt: 4,
      name: "Quyền 4",
      description:
        "Quyền được xem, tạo, xóa, tìm kiếm, thay đổi vị trí hiển thị của chi nhánh cửa hàng",
      lookPermissions: "Không",
      addPermissions: "Có",
      modifyPermission: "Có",
      deletePermissions: "Không",
    },
    {
      stt: 5,
      name: "Quyền 5",
      description:
        "Quyền được xem, tạo, xóa, tìm kiếm, thay đổi vị trí hiển thị của chi nhánh cửa hàng",
      lookPermissions: "Không",
      addPermissions: "Có",
      modifyPermission: "Có",
      deletePermissions: "có",
    },
    {
      stt: 6,
      name: "Quyền 3",
      description:
        "Quyền được xem, tạo, xóa, tìm kiếm, thay đổi vị trí hiển thị của chi nhánh cửa hàng",
      lookPermissions: "Không",
      addPermissions: "Có",
      modifyPermission: "Có",
      deletePermissions: "Có",
    },
    // Thêm các đối tượng khác tương tự
  ];

  return (
    <div className="content">
      <h1
        style={{
          fontFamily: "poppins, sans-serif",
          color: "var(--color-tiltle)",
        }}
      >
        Danh sách quyền
      </h1>
      <div className="header">
        <div className="header-top">
          <input
            type="text"
            className="search-users"
            placeholder="Tìm quyền"
            onChange={onChangeSearchPermissions}
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
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataSource}
            pagination={{
              position: ["bottomCenter"],
              defaultPageSize: 15,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
          <span className="total-items">{`${dataSource?.length} items`}</span>
        </div>
      </div>
    </div>
  );
};

export default Permissions;

import { Button, Space, Table } from "antd";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaPencilAlt, FaTrash } from "react-icons/fa";

const ChildrenThree_catagory = () => {
  const onModifyCategoriesThree = () => {};
  const onDeleteCategoriesThree = () => {};
  const dataTableChild = [
    {
      stt: 1,
      name: "Danh mục 1",
      number_children: 5,
      created_date: "2023-05-10",
      key: "1",
    },
    {
      stt: 2,
      name: "Danh mục 2",
      number_children: 3,
      created_date: "2023-07-15",
      key: "2",
    },
    {
      stt: 3,
      name: "Danh mục 3",
      number_children: 8,
      created_date: "2023-04-22",
      key: "3",
    },
    {
      stt: 4,
      name: "Danh mục 4",
      number_children: 1,
      created_date: "2023-09-01",
      key: "4",
    },
    {
      stt: 5,
      name: "Danh mục 5",
      number_children: 6,
      created_date: "2023-06-18",
      key: "5",
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên danh mục cấp 2",
      dataIndex: "name",
      key: "name",
      align: "center",
      //   filteredValue: [isValueSearchChild],
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
      title: "Số lượng danh mục cấp 3",
      dataIndex: "number_children",
      key: "number_children",
      align: "center",
      sorter: (a, b) => a.number_children - b.number_children,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => onModifyCategoriesThree(record)}>
            <FaPencilAlt />
          </a>
          <a onClick={() => onDeleteCategoriesThree(record)}>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  const columnsWithClick = columns?.map((col, index) => {
    if (index < 4) {
      return {
        ...col,
        onCell: (record) => ({
          onClick: () => {
            console.log("Click row");
            console.log("record:", record);
            // checkQuatifyItem(record);
            // const name = record.name;
            // console.log(name);
            const keyChild = record.key;
            console.log("keyChild: ", keyChild);
            // setSelectedCategory(name);
            // setIsKeyThreeChild(keyChild);
            // setViewTable(false);
          },
        }),
      };
    }
    return col;
  });
  return (
    <>
      <div className="add_children_category">
        <p>Chưa có model cấp 3</p>
        <Button type="primary">Thêm danh mục cấp 3</Button>
      </div>
      <div>
        <div className="header-top">
          <div className="header-top-right">
            <CiSearch
              style={{
                position: "absolute",
                top: "7px",
                left: "5px",
                transform: "translateY(5%)",
                fontSize: "20px",
              }}
            />
            <input
              type="text"
              placeholder="Tìm danh mục cấp 2"
              className="search-categories"
              // onChange={(e) => setIsValueSearchChild(e.target.value)}
            />
          </div>
          <div className="header-btn">
            <Button type="primary">Hướng dẫn sử dụng</Button>
            <Button type="primary">Thêm danh mục cấp 2</Button>
          </div>
        </div>
        <div className="table-container">
          <Table
            columns={columnsWithClick}
            dataSource={dataTableChild}
            pagination={{
              position: ["bottomCenter"],
              defaultPageSize: 15,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
          <span className="total-items">{`${dataTableChild?.length} items`}</span>
        </div>
      </div>
    </>
  );
};

export default ChildrenThree_catagory;

import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./ProductManagement.css";
import uploadApiImage from "../../configs/uploadApiImage";
import { Select, Button, Table, Space } from "antd";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaEye,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { Option } from "antd/es/mentions";
const ProductMangement = () => {
  const nameProduct = [
    { name: "Máy nổ 1", value: 1 },
    { name: "Máy nổ 2", value: 2 },
    { name: "Máy nổ 3", value: 3 },
  ];
  const statusProduct = [
    { id: 1, name: "Còn" },
    { id: 2, name: "Còn" },
    { id: 3, name: "Còn" },
  ];
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = (e) => {
    uploadApiImage.postMessage();
    setSelectedValue(e.target.value);
    console.log("setSelectedValue", selectedValue);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã sản phẩm chính",
      dataIndex: "Masanphamchinh",
      key: "Masanphamchinh",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "Tensanpham",
      key: "Tensanpham",
    },
    {
      title: "Hãng sản xuất",
      dataIndex: "Hangsanxuat",
      key: "Hangsanxuat",
    },
    {
      title: "Hãng sản xuất gốc",
      dataIndex: "Hangsanxuatgoc",
      key: "Hangsanxuatgoc",
      align: 'center',
      editTable: true,
    },
    {
      title: "Danh mục sản phẩm",
      dataIndex: "Danhmucsanpham",
      key: "Danhmucsanpham",
      align: 'center',
      editTable: true,
    },
    {
      title: "Đơn giá",
      dataIndex: "Dongia",
      key: "Dongia",
      align: 'center',
      editTable: true,
    },
    {
      title: "Đơn giá sau giảm",
      dataIndex: "Dongiasaugiam",
      key: "Dongiasaugiam",
      align: 'center',
      editTable: true,
    },
    {
      title: "Số lượng tồn",
      dataIndex: "SLton",
      key: "SLton",
    },
    {
      title: "Sản phẩm bán chạy",
      dataIndex: "Sanphambanchay",
      key: "Sanphambanchay",
    },
    {
      title: "Ngày tạo",
      dataIndex: "Date",
      key: "Date",
      align: 'center',
      editTable: true,
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <Space size="middle">
          <a>
            <FaEye />
          </a>
          <a>
            <FaPencilAlt style={{ color: "red" }} />
          </a>
          <a>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  const dataProduct = [
    {
      stt: 1,
      Masanphamchinh: "HNAHDF",
      Tensanpham: "Máy nổ 1",
      Hangsanxuat: "Hàn Quốc",
      Hangsanxuatgoc: "Hàn Quốc",
      Danhmucsanpham: "Máy nổ",
      Dongia: 1000000,
      Dongiasaugiam: 1000000,
      SLton: 100,
      Sanphambanchay: 1,
      Date: "2021-09-01",
    },
    {
      stt: 2,
      Masanphamchinh: "HNAHDF",
      Tensanpham: "Máy nổ 1",
      Hangsanxuat: "Hàn Quốc",
      Hangsanxuatgoc: "Hàn Quốc",
      Danhmucsanpham: "Máy nổ",
      Dongia: 1000000,
      Dongiasaugiam: 1000000,
      SLton: 100,
      Sanphambanchay: 1,
      Date: "2021-09-01",
    },
    {
      stt: 3,
      Masanphamchinh: "HNAHDF",
      Tensanpham: "Máy nổ 1",
      Hangsanxuat: "Hàn Quốc",
      Hangsanxuatgoc: "Hàn Quốc",
      Danhmucsanpham: "Máy nổ",
      Dongia: 1000000,
      Dongiasaugiam: 1000000,
      SLton: 100,
      Sanphambanchay: 1,
      Date: "2021-09-01",
    },
  ];
  return (
    <div className="content">
      <h1>Quản lí sản phẩm</h1>
      <div className="headerProduct">
        <div className="headerProduct-left">
          <div className="headerProduct-left-top">
            <div className="search-product">
              <CiSearch className="icon-search-product" />
              <input
                type="text"
                placeholder="Tìm danh mục"
                className="search-category"
              />
            </div>
            <Select
              className="form-input"
              placeholder="Hãng sản xuất"
              allowClear
              onChange={handleSelectChange}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>
            <Select
              className="form-input"
              placeholder="Danh mục sản phẩm"
              allowClear
              onChange={handleSelectChange}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>
            <Select
              className="form-input"
              placeholder="Loại giảm giá"
              allowClear
              onChange={handleSelectChange}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>
          </div>
          <div className="headerProduct-left-bottom">
            <Select
              className="form-input"
              placeholder="Trạng thái sản phẩm"
              allowClear
              onChange={handleSelectChange}
            >
              {statusProduct.map((option) => (
                <option value={option.id}>{option.name}</option>
              ))}
            </Select>
            <input type="checkbox" />
            <label htmlFor="">Sản phẩm bán chạy</label>
          </div>
        </div>
        <div className="headerProduct-right">
          <Button type="primary">Hướng dẫn sử dụng</Button>
          <Button type="primary">
            <FaArrowAltCircleUp />
            Export
          </Button>
          <Button type="primary">
            <FaArrowAltCircleDown />
            Import
          </Button>
          <Button type="primary">Thêm sản phẩm</Button>
        </div>
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={dataProduct}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                console.log(record, rowIndex);
              }, // click row
            };
          }}
          pagination={{
            current: 1,
            pageSize: 10,
          }}
        ></Table>
      </div>
    </div>
  );
};

export default ProductMangement;

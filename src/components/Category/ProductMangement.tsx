import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./ProductManagement.css";
import "../styles/valiables.css";
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
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import products from "../../configs/products";
import { useAuth } from "../auth/AuthContext";

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
    Date: "2021/09/01",
    key: "eyjdshashdfsjfhasfdasf",
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
    Date: "2021/09/01",
    key: "eyjdshash5646dfsjfhasfdasf",
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
    Date: "2021/09/01",
    key: "eyjdshashdfsjfhas32424fdasf",
  },
];
const ProductMangement = () => {
  const { fetchDataCategory, isCategoryProduct } = useAuth();

  const navigate = useNavigate();
  // const [dataProduct, setDataProduct] = useState([]);

  const statusProduct = [
    { id: 1, name: "Còn" },
    { id: 2, name: "Còn" },
    { id: 3, name: "Còn" },
  ];
  const [selectedValue, setSelectedValue] = useState(null);
  const nameProduct = isCategoryProduct.map((item, index) => ({
    name: item.name,
    value: index + 1,
  }));
  const handleSelectChange = (value) => {
    // uploadApiImage.postMessage();
    const selectedName = nameProduct.find((item) => item.value === value)?.name;
    console.log("selectedName", selectedName);
  };
  const addProduct = () => {
    navigate("/admin/products/add");
  };
  const detailProduct = (record) => {
    navigate(`/admin/products/${record.key}`);
  };
  useEffect(() => {
    console.log("isCategoryProduct:", isCategoryProduct);
    fetchDataCategory();
  }, []);
  //fet api product
  // const fetchDataCategory = async () => {
  //   // const res = await category.getAll();
  //   // setIsDataCategory(res.data);
  //   // console.log("data category", res.data.items);
  //   // console.log(res.data);
  //   // const res = await products.getCategoryProduct();
  //   // setIsCategoryProduct(res.data.category);
  //   // console.log("res: ", isCategoryProduct);
  // };

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
      title: "Danh mục sản phẩm",
      dataIndex: "Danhmucsanpham",
      key: "Danhmucsanpham",
    },
    {
      title: "Đơn giá",
      dataIndex: "Dongia",
      key: "Dongia",
    },
    {
      title: "Đơn giá sau giảm",
      dataIndex: "Dongiasaugiam",
      key: "Dongiasaugiam",
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
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <FaEye onClick={() => detailProduct(record)} />
          </a>
          <a>
            <FaPencilAlt />
          </a>
          <a>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="content">
      <h1
        style={{
          fontFamily: "poppins, sans-serif",
          color: "var(--color-tiltle)",
        }}
      >
        Quản lí sản phẩm
      </h1>
      <div
        className="header"
        style={{ display: "flex", alignItems: "center", border: "none" }}
      >
        <div className="header-left">
          <div className="header-left-top">
            <div
              className="search-product"
              style={{ display: "flex", position: "relative" }}
            >
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
                placeholder="Tìm sản phẩm"
                className="search-category"
              />
            </div>
            <Select
              placeholder="Hãng sản xuất"
              allowClear
              onChange={handleSelectChange}
              style={{ width: 200, height: 35 }}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>
            <Select
              placeholder="Danh mục sản phẩm"
              allowClear
              onChange={handleSelectChange}
              style={{ width: 200, height: 35 }}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>
          </div>
          <div className="header-left-bottom">
            <Select
              placeholder="Loại giảm giá"
              allowClear
              onChange={handleSelectChange}
              style={{ width: 200, height: 35 }}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>

            <Select
              placeholder="Trạng thái sản phẩm"
              allowClear
              onChange={handleSelectChange}
              style={{ width: 200, height: 35 }}
            >
              {statusProduct.map((option) => (
                <option value={option.id}>{option.name}</option>
              ))}
            </Select>
            <div
              style={{
                width: "200px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input type="checkbox" />
              <label htmlFor="">Sản phẩm bán chạy</label>
            </div>
          </div>
        </div>
        <div
          className="header-right"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            padding: "10px",
            marginLeft: "80px",
          }}
        >
          <Button className="btn-header-right" type="primary">
            Hướng dẫn sử dụng
          </Button>
          <Button type="primary" className="btn-header-right">
            <FaArrowAltCircleUp /> &nbsp; Export
          </Button>
          <Button type="primary" className="btn-header-right">
            <FaArrowAltCircleDown /> &nbsp; Import
          </Button>
          <Button
            type="primary"
            onClick={addProduct}
            className="btn-header-right"
          >
            Thêm sản phẩm
          </Button>
        </div>
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={dataProduct}
          // onRow={(record, rowIndex) => {
          //   return {
          //     onClick: () => {
          //       console.log(record, rowIndex);
          //     }, // click row
          //   };
          // }}
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

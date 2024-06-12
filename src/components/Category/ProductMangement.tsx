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
import { format } from "date-fns";

const ProductMangement = () => {
  const { fetchDataCategory, isCategoryProduct } = useAuth();
  const [dataProduct, setDataProduct] = useState([]);
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
  const handleSelectChange = (e) => {
    // uploadApiImage.postMessage();
    setSelectedValue(e.target.value);
    console.log("setSelectedValue", selectedValue);
  };
  const addProduct = () => {
    navigate("/admin/products/add");
  };
  const detailProduct = (record) => {
    navigate(`/admin/products/${record.key}`);
  };
  //fet api product
  const fetchDataProduct = async () => {
    const res = await products.getAll();
    setDataProduct(res.data);
    console.log("data category", res.data.items);
    console.log(res.data);
  };
  useEffect(() => {
    console.log("isCategoryProduct:", isCategoryProduct);
    fetchDataCategory();
    fetchDataProduct();
  }, []);

  const datatable = dataProduct.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    barcode: item.barcode,
    name: item.name,
    description: item.description,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
    modified_date: item.description,
    last_modified_user: item.last_modified_user,
    store_id: item.store_id,
    create_user: item.user.full_name,
    category_id: item.category_id,
    category: item.category.name,
    price: item.price,
    capital_price: item.capital_price,
    inventory_number: item.inventory_number,
    unit: item.unit,
    is_activate: item.is_activate,
    image_url: item.image_url,
  }));
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã sản phẩm chính",
      dataIndex: "barcode",
      key: "barcode",
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục sản phẩm",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Giá nhập",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Giá bán",
      dataIndex: "capital_price",
      key: "capital_price",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "inventory_number",
      key: "inventory_number",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
    },

    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      // align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "create_user",
      key: "create_user",
      // align: "center",
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
            flexWrap: "wrap",
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
          dataSource={datatable}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 15,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        ></Table>
        <span className="total-items">{`${datatable?.length} items`}</span>
      </div>
    </div>
  );
};

export default ProductMangement;

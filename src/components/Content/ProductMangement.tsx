import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./ProductManagement.css";
import uploadApiImage from "../../configs/uploadApiImage";
import { Select, Button } from "antd";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { Option } from "antd/es/mentions";
const ProductMangement = () => {
  const nameProduct = [
    { name: "Máy nổ 1", value: 1 },
    { name: "Máy nổ 2", value: 2 },
    { name: "Máy nổ 3", value: 3 },
  ];
  const statusProduct = [
    {id: 1, name: "Còn"},
    {id: 2, name: "Còn"},
    {id: 3, name: "Còn"}

  ]
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = (e) => {
    uploadApiImage.postMessage();
    setSelectedValue(e.target.value);
    console.log("setSelectedValue", selectedValue);
  };

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
    </div>
  );
};

export default ProductMangement;

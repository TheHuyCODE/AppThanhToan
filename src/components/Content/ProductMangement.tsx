import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./ProductManagement.css";
import { Select } from "antd";
import { Option } from "antd/es/mentions";
const ProductMangement = () => {
  const nameProduct = [{name: 'Máy nổ 1', value: 1}, {name: 'Máy nổ 1', value: 2}, {name: 'Máy nổ 1', value: 3}];
  const [selectedValue, setSelectedValue] = useState(null);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
    console.log('setSelectedValue', selectedValue);
  }
  return (
    <div className="content">
      <h1>Quản lí sản phẩm</h1>
      <div className="header">
        <div className="header-left">
          <div className="header-left-top">
            <CiSearch className="icon" />
            <input
              type="text"
              placeholder="Tìm danh mục"
              className="search-category"
            />
            <Select className="form-input"
              placeholder="Hãng sản xuất"
              allowClear
              onChange={handleSelectChange}
              >
                {nameProduct.map(option => (
                  <option value={option.value}>{option.name}</option>
                ))}
                </Select>
              <Select className="form-input"
              placeholder="Danh mục sản phẩm"
              options={nameProduct.map((item) => ({
                label: item,
                value: item,
              }))}
            />
              <Select className="form-input"
              placeholder="Loại giảm giá"
              options={nameProduct.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
          <div className="header-left-bottom">
          <Select className="form-input"
              placeholder="trạng thái sản phẩm"
              options={nameProduct.map((item) => ({
                label: item,
                value: item,
              }))}
            />
          </div>
          <div className="header-left-bottom"></div>
        </div>
        <div className="header-right"></div>
      </div>
    </div>
  );
};

export default ProductMangement;

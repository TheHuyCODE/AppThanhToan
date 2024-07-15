import { Select } from "antd";
import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";

const HeaderInvoices = () => {
  return (
    <>
      <div className="header-left">
        <div className="header-left-top">
          <div className="search-product" style={{ display: "flex", position: "relative" }}>
            <CiSearch
              style={{
                position: "absolute",
                top: "6px",
                left: "5px",
                transform: "translateY(5%)",
                fontSize: "20px",
                color: "var(--cl-dark)",
              }}
            />
            <input
              type="text"
              placeholder="Tìm kiếm hóa đơn"
              className="search-category"
              style={{ width: "250px" }}
              // onChange={handleSearchProduct}
            />
          </div>

          <Select
            placeholder="Trạng thái hóa đơn"
            allowClear
            // onChange={(value) => {
            //   handleSelectActive(value);
            // }}
            style={{ width: 200, height: 35 }}
          >
            {/* {statusProduct.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.name}
                </option>
              ))} */}
          </Select>
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
        <button className="btn-header-right">Hướng dẫn sử dụng</button>
        <button className="btn-header-right" style={{ width: "100px" }}>
          <FaArrowAltCircleUp /> &nbsp; Export
        </button>
        <button className="btn-header-right" style={{ width: "100px" }}>
          <FaArrowAltCircleDown /> &nbsp; Import
        </button>
        {/* <button className="btn-header-right">
            <IoMdAdd className="icon" /> Thêm sản phẩm
          </button> */}
      </div>
    </>
  );
};

export default HeaderInvoices;

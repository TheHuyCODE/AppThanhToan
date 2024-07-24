import React from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const HeaderUser = ({ handleAddUsers }) => {
  return (
    <>
      <div className="header-left">
        <div className="header-left-top">
          <div className="" style={{ display: "flex", position: "relative" }}>
            <input
              type="text"
              className="search-users"
              placeholder="Tìm nguời dùng"
              //   onChange={onChangeSearchUsers}
            />
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
          </div>
        </div>
      </div>
      <div
        className="header-right"
        style={{
          width: "50%",
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          gap: "10px",
          padding: "10px",
          marginRight: "10px",
        }}
      >
        <button className="btn-header-right">Hướng dẫn sử dụng</button>
        <button className="btn-header-right" style={{ width: "100px" }}>
          <FaArrowAltCircleUp /> &nbsp; Export
        </button>
        <button className="btn-header-right" style={{ width: "100px" }}>
          <FaArrowAltCircleDown /> &nbsp; Import
        </button>
        <button className="btn-header-right" onClick={handleAddUsers}>
          <IoMdAdd className="icon" /> Thêm người dùng
        </button>
      </div>
    </>
  );
};

export default HeaderUser;

import React from "react";
import { CiSearch } from "react-icons/ci";

const Groups = () => {
  return (
    <div className="content">
      <h1
        style={{
          fontFamily: "poppins, sans-serif",
          color: "var(--color-title)",
        }}
      >
        Quản lí nhóm quyền
      </h1>
      <div className="heder">
        <div className="header-top">
          <input
            type="text"
            className="search-users"
            placeholder="Tìm nhóm quyền"
            // onChange={onChangeSearchGroup}
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
        <div className="table-container">ta</div>
      </div>
    </div>
  );
};

export default Groups;

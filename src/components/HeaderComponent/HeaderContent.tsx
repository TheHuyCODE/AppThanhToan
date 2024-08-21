import React from "react";
import { CiSearch } from "react-icons/ci";

interface HeaderContentProps {
  titleSearch: string;
  handleSearch: () => void;
}
const HeaderContent: React.FC<HeaderContentProps> = ({ titleSearch, handleSearch }) => {
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
              placeholder={titleSearch}
              className="search-category"
              style={{ width: "230px" }}
              onChange={handleSearch}
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
        {/* <button className="btn-header-right" onClick={handleClickOpenModal}>
          <IoMdAdd className="icon" /> {nameButtonAdd}
        </button> */}
      </div>
    </>
  );
};

export default HeaderContent;

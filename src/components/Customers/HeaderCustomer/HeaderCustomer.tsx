import React from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
interface HeaderCustomerProps {
  handleClickOpenModal: () => void;
  // setLoadingSearch: React.Dispatch<React.SetStateAction<boolean>>;
  // setDataPayment: React.Dispatch<React.SetStateAction<any>>;
}
const HeaderCustomer: React.FC<HeaderCustomerProps> = ({ handleClickOpenModal }) => {
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
              placeholder="Tìm kiếm khách hàng"
              className="search-category"
              style={{ width: "250px" }}
              //   onChange={handleSearchPayment}
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

        <button
          className="btn-header-right"
          style={{ width: "150px" }}
          onClick={handleClickOpenModal}
        >
          <IoMdAdd className="icon" /> Thêm khách hàng
        </button>
      </div>
    </>
  );
};

export default HeaderCustomer;

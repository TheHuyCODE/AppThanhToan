import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import useDebounce from "../../auth/useDebounce";
import returnProduct from "../../../configs/return";
import { useNavigate } from "react-router-dom";
interface HeaderPropsReturn {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDataReturn: React.Dispatch<React.SetStateAction<any>>;
  getDataReturn: () => void;
}
const HeaderReturn: React.FC<HeaderPropsReturn> = ({
  setLoading,
  setDataReturn,
  getDataReturn,
}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [valueOnSearch, setValueOnSearch] = useState("");
  const debounceValue = useDebounce(valueOnSearch, 700);
  const navigate = useNavigate();
  const handleSearchPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("value", value);
    setValueOnSearch(value);
  };
  const getDataSearchReturn = async () => {
    setLoading(true);
    try {
      const res = await returnProduct.getDataSearchReturn(debounceValue);
      const data = res.data.items;
      setDataReturn(data);
      setLoading(false);
      if (inputRef.current) {
        inputRef.current.blur();
      }
    } catch (error) {
      console.log("errror", error);
      setLoading(false);
    }
  };
  const handleBackSalesPage = () => {
    navigate("/SalesPage");
  };
  useEffect(() => {
    if (debounceValue) {
      getDataSearchReturn();
    } else {
      getDataReturn();
    }
  }, [debounceValue]);
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
              ref={inputRef}
              type="text"
              placeholder="Tìm kiếm trả hàng"
              className="search-category"
              style={{ width: "250px" }}
              onChange={handleSearchPayment}
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
        {/* <button className="btn-header-right">Hướng dẫn sử dụng</button> */}

        <button
          className="btn-header-right"
          style={{ width: "150px" }}
          onClick={handleBackSalesPage}
        >
          <IoMdAdd className="icon" /> Thêm trả hàng
        </button>
      </div>
    </>
  );
};

export default HeaderReturn;

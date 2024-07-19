import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";

import { IoMdAdd } from "react-icons/io";
import useDebounce from "../../auth/useDebounce";
import payments from "../../../configs/Payment";

interface HeaderPaymentProps {
  handleOpenModal: () => void;
  setLoadingSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setDataPayment: React.Dispatch<React.SetStateAction<any>>;
}
const HeaderPayment: React.FC<HeaderPaymentProps> = ({
  handleOpenModal,
  setLoadingSearch,
  setDataPayment,
}) => {
  const [valueSearchPayment, setValueSearchPayment] = useState("");
  const debounceValue = useDebounce(valueSearchPayment, 700);
  const handleSearchPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueSearchPayment(value);
  };
  const getDataSearchPayment = async () => {
    setLoadingSearch(true);
    try {
      const res = await payments.getDataSearchPayment(debounceValue);
      const data = res.data.items;
      setDataPayment(data);
      setLoadingSearch(false);
    } catch (error) {
      console.log("errror", error);
    }
  };
  useEffect(() => {
    getDataSearchPayment();
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
              type="text"
              placeholder="Tìm kiếm"
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
        <button className="btn-header-right">Hướng dẫn sử dụng</button>

        <button className="btn-header-right" style={{ width: "150px" }} onClick={handleOpenModal}>
          <IoMdAdd className="icon" /> Thêm tài khoản
        </button>
      </div>
    </>
  );
};

export default HeaderPayment;

import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import useDebounce from "../../auth/useDebounce";
import customer from "../../../configs/customer";
import { handleError } from "../../../utils/errorHandler";
interface HeaderCustomerProps {
  handleClickOpenModal: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDataCustomer: React.Dispatch<React.SetStateAction<any>>;
}
const HeaderCustomer: React.FC<HeaderCustomerProps> = ({
  handleClickOpenModal,
  setLoading,
  setDataCustomer,
}) => {
  const [valueSearchCustomer, setValueSearchCustomer] = useState("");
  const debounceValue = useDebounce(valueSearchCustomer, 700);
  const handleSearchPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueSearchCustomer(value);
  };
  const getDataSearchPayment = async () => {
    setLoading(true);
    try {
      const res = await customer.getDataSearchCustomer(debounceValue);
      const data = res.data.items;
      setDataCustomer(data);
      setLoading(false);
    } catch (error) {
      console.log("errror", error);
      handleError(error);
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
              placeholder="Tìm kiếm khách hàng"
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
          onClick={handleClickOpenModal}
        >
          <IoMdAdd className="icon" /> Thêm khách hàng
        </button>
      </div>
    </>
  );
};

export default HeaderCustomer;

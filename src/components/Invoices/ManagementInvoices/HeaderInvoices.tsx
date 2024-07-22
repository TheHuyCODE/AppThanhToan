import { Select } from "antd";
import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import useDebounce from "../../auth/useDebounce";
import invoice from "../../../configs/invoice";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
interface HeadeInvoicesProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDataTableInvoice: React.Dispatch<React.SetStateAction<any>>;
}
const HeaderInvoices: React.FC<HeadeInvoicesProps> = ({ setLoading, setDataTableInvoice }) => {
  const navigate = useNavigate();
  const [valueOnSearch, setValueOnSearch] = useState("");
  const debounceValue = useDebounce(valueOnSearch, 700);

  const handleOnSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("value", value);
    setValueOnSearch(value);
  };
  const handleClickToSalesPage = () => {
    console.log("111");
    navigate("/SalesPage");
  };
  const getDataSearchInvoices = async () => {
    setLoading(true);
    try {
      const res = await invoice.getDataSearchInvoice(debounceValue);
      const data = res.data.items;
      setDataTableInvoice(data);
      setLoading(false);
    } catch (error) {
      console.log("errror", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataSearchInvoices();
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
              placeholder="Tìm kiếm hóa đơn"
              className="search-category"
              style={{ width: "250px" }}
              onChange={handleOnSearchProduct}
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
        <button className="btn-header-right" onClick={handleClickToSalesPage}>
          <IoMdAdd className="icon" /> Thêm hóa đơn
        </button>
      </div>
    </>
  );
};

export default HeaderInvoices;

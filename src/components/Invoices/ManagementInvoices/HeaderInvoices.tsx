import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowAltCircleDown } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import invoice from "../../../configs/invoice";
import {
  FILE_NAME_EXPORT_INVOICE,
  LINK_EXPORT_INVOICE,
} from "../../../constants/constants";
import { getDateTimeNow } from "../../../constants/functionContants";
import useDebounce from "../../auth/useDebounce";
import ButtonExportToExcel from "../../UI/ButtonExport";
interface HeaderInvoicesProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDataTableInvoice: React.Dispatch<React.SetStateAction<any>>;
  getDataInvoices: () => void;
}
const HeaderInvoices: React.FC<HeaderInvoicesProps> = ({
  setLoading,
  setDataTableInvoice,
  getDataInvoices,
}) => {
  const fileName = `${FILE_NAME_EXPORT_INVOICE}_${getDateTimeNow()}`;
  const inputSearchRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();
  const [valueOnSearch, setValueOnSearch] = useState("");
  const debounceValue = useDebounce(valueOnSearch, 700);

  const handleOnSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueOnSearch(value);
  };
  const handleClickToSalesPage = () => {
    navigate("/SalesPage");
  };
  const getDataSearchInvoices = async () => {
    setLoading(true);
    try {
      const res = await invoice.getDataSearchInvoice(debounceValue);
      const data = res.data.items;
      setDataTableInvoice(data);
      setLoading(false);
      if (inputSearchRef.current) {
        inputSearchRef.current.blur();
      }
    } catch (error) {
      console.log("errror", error);
      setLoading(false);
    }
  };
  useEffect(() => {
    if (debounceValue) {
      getDataSearchInvoices();
    } else {
      getDataInvoices();
    }
  }, [debounceValue]);
  return (
    <>
      <div className="header-left">
        <div className="header-left-top">
          <div
            className="search-product"
            style={{ display: "flex", position: "relative" }}
          >
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
              ref={inputSearchRef}
              type="text"
              placeholder="Tìm kiếm hóa đơn"
              className="search-category"
              style={{ width: "250px" }}
              onChange={handleOnSearchProduct}
            />
          </div>
          {/* <Select
            placeholder="Trạng thái hóa đơn"
            allowClear
            // onChange={(value) => {
            //   handleSelectActive(value);
            // }}
            style={{ width: 200, height: 35 }}
          >
    
          </Select> */}
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
        <ButtonExportToExcel
          linkExport={LINK_EXPORT_INVOICE}
          fileName={fileName}
        ></ButtonExportToExcel>
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

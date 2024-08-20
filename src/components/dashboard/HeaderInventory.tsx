import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import products from "../../configs/products";
import { handleError } from "../../utils/errorHandler";
import useDebounce from "../auth/useDebounce";
import ButtonExportToExcel from "../UI/ButtonExport";
import { FILE_NAME_EXPORT_INVENTORY, LINK_EXPORT_INVENTORY } from "../../constants/constants";
import { getDateTimeNow } from "../../constants/functionContants";
interface HeaderCustomerProps {
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDataInventory: React.Dispatch<React.SetStateAction<any>>;
  setTotalProduct: React.Dispatch<React.SetStateAction<any>>;
}
const HeaderInventory: React.FC<HeaderCustomerProps> = ({
  setDataInventory,
  setLoading,
  setTotalProduct,
}) => {
  const fileName = `${FILE_NAME_EXPORT_INVENTORY}_${getDateTimeNow()}`;
  const [valueSearchCustomer, setValueSearchCustomer] = useState("");
  const debounceValue = useDebounce(valueSearchCustomer, 700);
  const handleSearchInventory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueSearchCustomer(value);
  };
  const getDataSearchPayment = async () => {
    setLoading(true);
    try {
      const res = await products.getDataSearchInventory(debounceValue);
      const data = res.data.inventory_report;
      const totalData = res.data.total_products;
      setDataInventory(data);
      setTotalProduct(totalData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
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
              placeholder="Tìm kiếm tồn kho"
              className="search-category"
              style={{ width: "250px" }}
              onChange={handleSearchInventory}
            />
          </div>
        </div>
      </div>
      <div className="header-right">
        <ButtonExportToExcel
          linkExport={LINK_EXPORT_INVENTORY}
          fileName={fileName}
        ></ButtonExportToExcel>
      </div>
    </>
  );
};

export default HeaderInventory;

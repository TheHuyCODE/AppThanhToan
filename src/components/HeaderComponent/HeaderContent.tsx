import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import useDebounce from "../auth/useDebounce";
import owners from "../../configs/owner";
import { IoMdAdd } from "react-icons/io";

interface HeaderContentProps {
  titleSearch: string;
  setLoadingSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDataOwner?: React.Dispatch<React.SetStateAction<any>>;
  handleClickOpenModal: () => void;
}
const HeaderContent: React.FC<HeaderContentProps> = ({
  titleSearch,
  setLoadingSearch,
  setIsDataOwner,
  handleClickOpenModal,
}) => {
  console.log("HeaderContent rendered");
  const [valueSearchOwners, setValueSearchOwners] = useState("");
  const debounceValue = useDebounce(valueSearchOwners, 700);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("11", value);
    setValueSearchOwners(value);
  };
  const getDataSearchStoreAdmin = async () => {
    setLoadingSearch(true);
    try {
      const res = await owners.getDataSearchOwners(debounceValue);
      const data = res.data.items;
      setIsDataOwner?.(data);
      setLoadingSearch(false);
    } catch (error) {
      console.log("errror", error);
    }
  };
  useEffect(() => {
    getDataSearchStoreAdmin();
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
        <button className="btn-header-right" onClick={handleClickOpenModal}>
          <IoMdAdd className="icon" /> Tạo chủ cửa hàng
        </button>
      </div>
    </>
  );
};

export default HeaderContent;

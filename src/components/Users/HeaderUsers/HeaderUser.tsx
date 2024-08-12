import React, { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import useDebounce from "../../auth/useDebounce";
import users from "../../../configs/users";
interface HeaderUserProps {
  handleAddUsers: () => void;
  getDataUsers: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setDataUsers: React.Dispatch<React.SetStateAction<any>>;
}
const HeaderUser: React.FC<HeaderUserProps> = ({
  handleAddUsers,
  setLoading,
  setDataUsers,
  getDataUsers,
}) => {
  const inputSearchRef = useRef<HTMLInputElement | null>(null);

  const [valueOnSearch, setValueOnSearch] = useState("");
  const debounceValue = useDebounce(valueOnSearch, 700);
  const onChangeSearchUsers = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueOnSearch(value);
  };
  const getDataSearchUsers = async () => {
    setLoading(true);
    try {
      const res = await users.getDataSearchUsers(debounceValue);
      const data = res.data.items;
      setDataUsers(data);
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
      getDataSearchUsers();
    } else {
      getDataUsers();
    }
  }, [debounceValue]);
  return (
    <>
      <div className="header-left">
        <div className="header-left-top">
          <div className="" style={{ display: "flex", position: "relative" }}>
            <input
              ref={inputSearchRef}
              type="text"
              className="search-users"
              placeholder="Tìm nhân viên"
              onChange={onChangeSearchUsers}
            />
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
        {/* <button className="btn-header-right" style={{ width: "100px" }}>
          <FaArrowAltCircleUp /> &nbsp; Export
        </button>
        <button className="btn-header-right" style={{ width: "100px" }}>
          <FaArrowAltCircleDown /> &nbsp; Import
        </button> */}
        <button className="btn-header-right" onClick={handleAddUsers}>
          <IoMdAdd className="icon" /> Thêm nhân viên
        </button>
      </div>
    </>
  );
};

export default HeaderUser;

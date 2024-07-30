import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import "./profile.css";
import { DataProfile } from "../TableConfig/TableConfig";
// import "../styles/variables.css";

interface User extends DataProfile {
  // Các thuộc tính khác của User, nếu cần
  full_name: string;
  dataProfile: any;
  // Thêm các thuộc tính khác nếu cần
}

const HeaderProfile: React.FC<DataProfile> = ({ dataProfile }) => {
  const [fullName, setFullName] = useState<User | null>(null);
  const [detailName, setDetailName] = useState("");
  useEffect(() => {
    const storedFullName = window.localStorage.getItem("INFO_USER");
    if (storedFullName) {
      setFullName(JSON.parse(storedFullName));
    }
    const nameCustomer = fullName?.full_name ?? "";
    setDetailName(nameCustomer);
    if (dataProfile) {
      setDetailName(dataProfile.full_name);
    }
  }, [dataProfile]); // Empty dependency array ensures this effect runs only once on component mount
  return (
    <>
      <div className="logo_profile">
        <IoPerson />
      </div>
      <div className="info-customer">
        <span>{detailName}</span>
      </div>
    </>
  );
};

export default HeaderProfile;

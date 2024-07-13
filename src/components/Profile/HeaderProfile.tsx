import React, { useEffect, useState } from "react";
import { IoPerson } from "react-icons/io5";
import "./profile.css";
import "../styles/valiables.css";

interface User {
  full_name: string;
  // Add other properties if necessary
}
const HeaderProfile: React.FC = () => {
  const [fullName, setFullName] = useState<User | null>(null);

  useEffect(() => {
    const storedFullName = localStorage.getItem("INFO_USER");
    if (storedFullName) {
      setFullName(JSON.parse(storedFullName));
    }
  }, []);
  const nameCustomer = fullName?.full_name ?? "";
  return (
    <>
      <div className="logo_profile">
        <IoPerson />
      </div>
      <div className="info-customer">
        <span>{nameCustomer}</span>
      </div>
    </>
  );
};

export default HeaderProfile;

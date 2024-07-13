import React from "react";
import { IoPerson } from "react-icons/io5";
import HeaderProfile from "./HeaderProfile";
import "./profile.css";
import "../styles/valiables.css";
const Profile = () => {
  return (
    <div className="content">
      <div className="header-profile">
        <HeaderProfile />
      </div>
      <div className="content-profile">
        <div className="left-content-profile"></div>
        <div className="right-content-profile"></div>
      </div>
    </div>
  );
};

export default Profile;

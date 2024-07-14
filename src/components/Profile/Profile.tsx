import React, { useEffect, useState } from "react";
import HeaderProfile from "./HeaderProfile";
import "./profile.css";
import "../styles/valiables.css";
import LeftContentProfile from "./LeftContentProfile";
import RightContentProfile from "./RightContentProfile";
import { DataProfile } from "../TableConfig/TableConfig";
import Profiles from "../../configs/profiles";
const Profile = () => {
  const [dataProfile, setDataProfile] = useState<DataProfile>({
    address: null,
    age: null,
    created_date: 0,
    email: "",
    full_name: "",
    gender: null,
    group: { key: "", valid: 0 },
    group_id: "",
    id: "",
    is_active: false,
    modified_date: 0,
    phone: "",
  });
  const getDataUser = async () => {
    try {
      const res = await Profiles.getProfile();
      if (res.code === 200) {
        const dataProfile = res.data;
        setDataProfile(dataProfile);
        console.log("data", res.data);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <div className="content">
      <div className="header-profile">
        <HeaderProfile dataProfile={dataProfile} />
      </div>
      <div className="content-profile">
        <div className="left-content-profile">
          <LeftContentProfile dataProfile={dataProfile} getDataUser={getDataUser} />
        </div>
        <div className="right-content-profile">
          <RightContentProfile />
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import Profiles from "../../configs/profiles";
import "../styles/valiables.css";
import { DataProfile } from "../TableConfig/TableConfig";
import LeftContentProfile from "./LeftContentProfile";
import "./profile.css";
import RightContentProfile from "./RightContentProfile";
const Profile = () => {
  const [dataProfile, setDataProfile] = useState<DataProfile>({
    address: null,
    age: null,
    created_date: 0,
    email: "",
    full_name: "",
    gender: null,
    group: { key: "", valid: 0 },
    avatar_url: "",
    group_id: "",
    id: "",
    is_active: false,
    modified_date: 0,
    phone: "",
  });
  const getDataUser = async () => {
    try {
      const res = await Profiles.getProfile();
      const dataProfile = res.data;
      setDataProfile(dataProfile);
      console.log("data", res.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    getDataUser();
  }, []);
  return (
    <>
      <ToastContainer autoClose={5000} />
      <div className="content">
        {/* <div className="header-profile">
        <HeaderProfile dataProfile={dataProfile} />
      </div> */}
        <div className="content-profile">
          <div className="left-content-profile">
            <LeftContentProfile
              dataProfile={dataProfile}
              getDataUser={getDataUser}
            />
          </div>
          <div className="right-content-profile">
            <RightContentProfile getDataUser={getDataUser} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;

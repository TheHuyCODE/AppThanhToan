import { Input, Select } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { DataProfile } from "../TableConfig/TableConfig";
import Profiles from "../../configs/profiles";
import { toast, ToastContainer } from "react-toastify";
import { IoPerson } from "react-icons/io5";

interface LeftContentProfileProps {
  dataProfile: DataProfile;
  getDataUser: () => void;
}
const LeftContentProfile: React.FC<LeftContentProfileProps> = ({ dataProfile, getDataUser }) => {
  const [profile, setProfile] = useState<DataProfile>(dataProfile);
  const [initialProfile, setInitialProfile] = useState<DataProfile>(dataProfile);
  const [imageSrc, setImageSrc] = useState<string | ArrayBuffer | null>(null);
  const [errors, setErrors] = useState<{ full_name?: string }>({});
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const onChangeProfile = (field: keyof DataProfile, value: string | null) => {
    if (field === "full_name" && (value!.length < 3 || value!.length > 30)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: "Họ và tên phải có từ 3 đến 30 ký tự",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [field]: undefined,
      }));
    }
    setProfile((prevProfile) => ({
      ...prevProfile,
      [field]: value,
    }));
    console.log("profile", profile);
  };
  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleCancel = () => {
    setProfile(initialProfile);
    setErrors({});
  };
  const onModifyProfile = async () => {
    const dataModify = {
      full_name: profile.full_name,
      phone: profile.phone,
      age: profile.age,
      gender: profile.gender,
      address: profile.address,
    };
    console.log("dataModi", dataModify);
    try {
      const res = await Profiles.postProfile(dataModify);
      if (res.code === 200) {
        const succesMs = res.message.text;
        toast.success(succesMs);
        localStorage.removeItem("INFO_USER");
        await getDataUser();
        localStorage.setItem("INFO_USER", JSON.stringify(profile));
      } else {
        const errMs = res.data.message.text;
        toast.error(errMs);
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    setInitialProfile(dataProfile);
    setProfile(dataProfile);
  }, [dataProfile]);
  useEffect(() => {
    console.log("profile updated", profile);
  }, [profile]);
  const { email, phone, full_name, age, gender, address } = profile;
  const onChangeFilePicture = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    console.log("file", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageSrc(reader.result); // Cập nhật URL ảnh vào trạng thái
      };
      reader.readAsDataURL(file); // Đọc ảnh dưới dạng URL
    }
  };
  useEffect(() => {
    if (imageSrc) {
      // const
    }
  }, [imageSrc]);
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="profile-input">
        <span style={{ fontSize: "18px", fontWeight: "600" }}>Thông tin người dùng</span>
      </div>
      <div className="profile-input-image">
        <div className="image-profile" onClick={handleIconClick}>
          {imageSrc ? (
            <img
              src={imageSrc as string}
              alt="Profile"
              style={{ width: "100%", height: "100%", borderRadius: "50%" }}
            />
          ) : (
            <IoPerson />
          )}
        </div>
        <input
          type="file"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={onChangeFilePicture}
          accept="image/png, image/jpeg"
        />
      </div>
      <div className="profile-input">
        <label htmlFor="email">
          Email(<span>*</span>)
        </label>
        <Input placeholder="Email" className="input-field" value={email || ""} disabled />
      </div>
      <div className="profile-input">
        <label htmlFor="full_name">
          Họ và tên(<span>*</span>)
        </label>
        <Input
          placeholder="Họ và tên"
          className="input-field"
          value={full_name || ""}
          onChange={(e) => onChangeProfile("full_name", e.target.value)}
        />
      </div>
      {errors.full_name && (
        <div className="err-validate">
          <span className="error">{errors.full_name}</span>
        </div>
      )}
      <div className="profile-input">
        <label htmlFor="phone">Số điện thoại</label>
        <Input
          placeholder="Số điện thoại"
          className="input-field"
          value={phone || ""}
          onChange={(e) => onChangeProfile("phone", e.target.value)}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="age">Tuổi</label>
        <Input
          placeholder="Tuổi"
          className="input-field"
          value={age ? age.toString() : ""}
          onChange={(e) => {
            const value = e.target.value.trim(); // Trim any extra whitespace
            onChangeProfile("age", value ? parseInt(value) : null);
          }}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="gender">Giới tính</label>
        <Select
          showSearch
          className="input-field"
          placeholder="Chọn giới tính"
          allowClear
          value={gender ? (gender === "1" ? "Nam" : "Nữ") : undefined}
          onChange={(value) => onChangeProfile("gender", value)}
          options={[
            { value: "1", label: "Nam" },
            { value: "2", label: "Nữ" },
          ]}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="address">Địa chỉ</label>
        <Input
          placeholder="Địa chỉ"
          className="input-field"
          value={address || ""}
          onChange={(e) => onChangeProfile("address", e.target.value)}
        />
      </div>
      <div className="btn-profile">
        <button className="btn-clear-input" onClick={handleCancel}>
          Hủy
        </button>
        <button className="btn-save-profile" onClick={onModifyProfile}>
          Lưu
        </button>
      </div>
    </>
  );
};

export default LeftContentProfile;

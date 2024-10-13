import { Input } from "antd";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import loginApi from "../../configs/loginApi";
import { handleError } from "../../utils/errorHandler";
import { useAuth } from "../auth/AuthContext";
interface RightContentProfileProps {
  getDataUser: () => void;
}
const RightContentProfile: React.FC<RightContentProfileProps> = ({
  getDataUser,
}) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);
  const [passwordVisibleTwo, setPasswordVisibleTwo] = React.useState(false);
  const [passwordVisibleThree, setPasswordVisibleThree] = React.useState(false);
  const [regexPass, setRegexPass] = React.useState(false);
  //@ts-ignore
  const { logout } = useAuth();
  const [errValidate, setErrValidate] = React.useState(false);
  const REGEX_VALID_PASSWORD = /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.* ).{8,16}$/;
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });
  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: string
  ) => {
    const value = e.target.value;
    setPasswords((prevState) => ({
      ...prevState,
      [field]: value,
    }));
    console.log("pass", passwords);
  };
  useEffect(() => {
    console.log("passwords", passwords);
  }, [passwords]);
  useEffect(() => {
    if (passwords.newPassword !== passwords.confirmNewPassword) {
      setErrValidate(true);
    } else {
      setErrValidate(false);
    }
  }, [passwords.confirmNewPassword]);
  useEffect(() => {
    if (passwords.newPassword.length > 1) {
      const isValidPassword = REGEX_VALID_PASSWORD.test(passwords.newPassword);
      setRegexPass(!isValidPassword);
    } else {
      setRegexPass(false); // Hiển thị lỗi nếu người dùng nhập ít hơn 2 ký tự
    }
  }, [passwords.newPassword]);
  const onSaveChangePassword = async () => {
    const dataPassword = {
      current_password: passwords.currentPassword,
      new_password: passwords.newPassword,
      confirm_password: passwords.confirmNewPassword,
    };
    try {
      const res = await loginApi.changePassword(dataPassword);
      //@ts-ignore
      if (res.code === 200) {
        //@ts-ignore
        const msSucess = res.message.text;
        toast.success(msSucess);
        getDataUser();
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
      } else {
        const msErr = res.data.message.text;
        toast.error(msErr);
      }
    } catch (err) {
      console.log("err", err);
      handleError(err);
    }
  };
  return (
    <>
      <div className="profile-input">
        <span style={{ fontSize: "18px", fontWeight: "600" }}>
          Đổi mật khẩu
        </span>
      </div>
      <div className="profile-input">
        <label htmlFor="email">
          Mật khẩu hiện tại(
          <span>*</span>)
        </label>
        <Input.Password
          placeholder="Nhập mật khẩu "
          visibilityToggle={{
            visible: passwordVisible,
            onVisibleChange: setPasswordVisible,
          }}
          className="input-field-password"
          value={passwords.currentPassword}
          onChange={(e) => handlePasswordChange(e, "currentPassword")}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="email">
          Mật khẩu mới(
          <span>*</span>)
        </label>
        {/* <Popover placement="bottomLeft" title={text} content={content}> */}

        <Input.Password
          placeholder="Nhập mật khẩu"
          visibilityToggle={{
            visible: passwordVisibleTwo,
            onVisibleChange: setPasswordVisibleTwo,
          }}
          className="input-field-password"
          value={passwords.newPassword}
          onChange={(e) => handlePasswordChange(e, "newPassword")}
        />
        {/* </Popover> */}
      </div>
      {regexPass && (
        <div className="err-validate">
          <div
            style={{
              width: "90%",
              maxWidth: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginRight: "25px",
            }}
          >
            <span className="error">
              Mật khẩu phải chứa từ 8-16 kí tự, ít nhất 1 kí tự chữ và 1 kí tự
              số
            </span>
          </div>
        </div>
      )}
      <div className="profile-input">
        <label htmlFor="email">
          Xác thực mật khẩu mới(
          <span>*</span>)
        </label>
        <Input.Password
          placeholder="Nhập mật khẩu"
          visibilityToggle={{
            visible: passwordVisibleThree,
            onVisibleChange: setPasswordVisibleThree,
          }}
          className="input-field-password"
          value={passwords.confirmNewPassword}
          onChange={(e) => handlePasswordChange(e, "confirmNewPassword")}
        />
      </div>
      {errValidate && (
        <div className="err-validate">
          <div
            style={{
              width: "90%",
              maxWidth: "600px",
              display: "flex",
              alignItems: "center",
              justifyContent: "end",
              marginRight: "25px",
            }}
          >
            <span className="error">
              Mật khẩu xác thực khác với mật khẩu mới
            </span>
          </div>
        </div>
      )}

      <div className="btn-profile-save-password">
        {/* <button className="btn-clear-input" onClick={handleCancel}>
          Hủy
        </button> */}
        <button className="btn-save-profile" onClick={onSaveChangePassword}>
          Lưu
        </button>
      </div>
    </>
  );
};

export default RightContentProfile;

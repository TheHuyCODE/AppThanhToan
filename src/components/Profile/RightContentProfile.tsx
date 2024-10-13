import { Input } from "antd";
import React, { useState } from "react";
import { toast } from "react-toastify";
import loginApi from "../../configs/loginApi";
import { useAuth } from "../auth/AuthContext";
import { handleError } from "../../utils/errorHandler";

interface RightContentProfileProps {
  getDataUser: () => void;
}

const RightContentProfile: React.FC<RightContentProfileProps> = ({ getDataUser }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisibleTwo, setPasswordVisibleTwo] = useState(false);
  const [passwordVisibleThree, setPasswordVisibleThree] = useState(false);
  const [newPasswordTouched, setNewPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [showNewPasswordError, setShowNewPasswordError] = useState(false);
  const [showConfirmPasswordError, setShowConfirmPasswordError] = useState(false);
  const { logout } = useAuth();
  const REGEX_VALID_PASSWORD = /^(?=.*[0-9])(?=.*[a-zA-Z])(?!.* ).{8,16}$/;
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const value = e.target.value;
    setPasswords((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleNewPasswordBlur = () => {
    setNewPasswordTouched(true);
    setShowNewPasswordError(!REGEX_VALID_PASSWORD.test(passwords.newPassword));
  };

  const handleConfirmPasswordBlur = () => {
    setConfirmPasswordTouched(true);
    setShowConfirmPasswordError(passwords.newPassword !== passwords.confirmNewPassword);
  };

  const handleNewPasswordFocus = () => {
    setShowNewPasswordError(false);
  };

  const handleConfirmPasswordFocus = () => {
    setShowConfirmPasswordError(false);
  };

  const isNewPasswordValid = REGEX_VALID_PASSWORD.test(passwords.newPassword);
  const doPasswordsMatch = passwords.newPassword === passwords.confirmNewPassword;
  const areAllFieldsFilled =
    passwords.currentPassword && passwords.newPassword && passwords.confirmNewPassword;

  const onSaveChangePassword = async () => {
    if (!isNewPasswordValid || !doPasswordsMatch) {
      toast.error("Vui lòng kiểm tra lại mật khẩu mới và xác nhận mật khẩu.");
      return;
    }

    const dataPassword = {
      current_password: passwords.currentPassword,
      new_password: passwords.newPassword,
      confirm_password: passwords.confirmNewPassword,
    };

    try {
      const res = await loginApi.changePassword(dataPassword);
      if (res.code === 200) {
        toast.success(res.message.text);
        getDataUser();
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmNewPassword: "",
        });
        setNewPasswordTouched(false);
        setConfirmPasswordTouched(false);
        setShowNewPasswordError(false);
        setShowConfirmPasswordError(false);
      } else {
        toast.error(res.data.message.text);
      }
    } catch (err) {
      handleError(err);
    }
  };

  return (
    <>
      <div className="profile-input">
        <span style={{ fontSize: "18px", fontWeight: "600" }}>Đổi mật khẩu</span>
      </div>
      <div className="profile-input">
        <label htmlFor="currentPassword">
          Mật khẩu hiện tại(<span>*</span>)
        </label>
        <Input.Password
          placeholder="Nhập mật khẩu hiện tại"
          visibilityToggle={{ visible: passwordVisible, onVisibleChange: setPasswordVisible }}
          className="input-field-password"
          value={passwords.currentPassword}
          onChange={(e) => handlePasswordChange(e, "currentPassword")}
        />
      </div>
      <div className="profile-input">
        <label htmlFor="newPassword">
          Mật khẩu mới(<span>*</span>)
        </label>
        <Input.Password
          placeholder="Nhập mật khẩu mới"
          visibilityToggle={{
            visible: passwordVisibleTwo,
            onVisibleChange: setPasswordVisibleTwo,
          }}
          className="input-field-password"
          value={passwords.newPassword}
          onChange={(e) => handlePasswordChange(e, "newPassword")}
          onBlur={handleNewPasswordBlur}
          onFocus={handleNewPasswordFocus}
        />
      </div>
      {showNewPasswordError && (
        <div className="err-validate">
          <span className="error">
            Mật khẩu phải chứa từ 8-16 kí tự, ít nhất 1 kí tự chữ và 1 kí tự số
          </span>
        </div>
      )}
      <div className="profile-input">
        <label htmlFor="confirmNewPassword">
          Xác thực mật khẩu mới(<span>*</span>)
        </label>
        <Input.Password
          placeholder="Xác nhận mật khẩu mới"
          visibilityToggle={{
            visible: passwordVisibleThree,
            onVisibleChange: setPasswordVisibleThree,
          }}
          className="input-field-password"
          value={passwords.confirmNewPassword}
          onChange={(e) => handlePasswordChange(e, "confirmNewPassword")}
          onBlur={handleConfirmPasswordBlur}
          onFocus={handleConfirmPasswordFocus}
        />
      </div>
      {showConfirmPasswordError && (
        <div className="err-validate">
          <span className="error">Mật khẩu xác thực không khớp với mật khẩu mới</span>
        </div>
      )}

      {/* {areAllFieldsFilled && ( */}
      <div className="btn-profile-save-password">
        <button
          className="btn-save-profile"
          onClick={onSaveChangePassword}
          disabled={!isNewPasswordValid || !doPasswordsMatch}
        >
          Lưu
        </button>
      </div>
      {/* )} */}
    </>
  );
};

export default RightContentProfile;

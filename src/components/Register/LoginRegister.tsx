import React, { useEffect, useState, useRef } from "react";
import loginApi from "../../configs/loginApi";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import logo from "../../assets/img/logo.png";
import { Modal, Popover } from "antd";
import { FaUser, FaEnvelope, FaPhone, FaRegAddressCard, FaEye, FaEyeSlash } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { LuStore } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { AxiosError } from "axios";
import { handleError } from "../../utils/errorHandler";
const LoginRegister = () => {
  const storeNameRef = useRef(null);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const adressRef = useRef(null);
  const passWordRef = useRef(null);
  const phoneRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [action, setAction] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showConfirmPasswordRegister, setshowConfirmPasswordRegister] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [isEmptyMessageVisible, setIsEmptyMessageVisible] = useState(false);
  const [isShortCodeMessageVisible, setIsShortCodeMessageVisible] = useState(false);
  const [isEmptyMessageEmail, setIsEmptyMessageEmail] = useState(false);
  const [isShortCodeMessageEmail, setIsShortCodeMessageEmail] = useState(false);
  const [isEmptyMessagePassword, setIsEmptyMessagePassword] = useState(false);
  const [isShortCodeMessagePassword, setIsShortCodeMessagePassword] = useState(false);
  const { logout } = useAuth();
  const [inputPassword, setInputPassword] = useState("");
  const [inputClicked, setInputClicked] = useState(false);
  const [infoUser, setInfoUser] = useState("");
  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex =
      /^(([^<>()[\]\.,;:\s@"]+(\.[^<>()[\]\.,;:\s@"]+)*)|(".+"))@(([^<>()[\]\.,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,})$/;
    return regex.test(email);
  };
  const content = (
    <div>
      <p>Mật khẩu dài từ 8 đến 16 kí tự</p>
      <p>Chứa chữ thường, chữ hoa và số</p>
      <p>Không có khoảng trắng</p>
    </div>
  );
  const text = <span>Mật khẩu hợp lệ cần</span>;
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const clearInputRegister = () => {
    setDataRegister({
      email: "",
      password: "",
      confirm_password: "",
      store_name: "",
      address: "",
      full_name: "",
      phone: "",
    });
  };

  const success = () => {
    Modal.success({
      title: "Đã đăng kí tài khoản thành công ",
      content: "Bạn có muốn quay về trang login không?",
      onOk() {
        setAction("");
      },
    });
  };
  const validateLoginInputs = () => {
    if (
      data.email === "" ||
      data.password === "" ||
      !validateEmail(data.email) ||
      data.password.length < 8
    ) {
      return false;
    }
    return true;
  };
  // const [checkInput, setCheckInput] = useState('');
  const registerLink = () => {
    setAction(" active");
  };
  const loginLink = () => {
    setAction("");
  };
  const handleBlur = () => {
    setInputClicked(false);
  };

  useEffect(() => {
    // console.log("inputClicked", inputClicked);
    if (inputClicked) {
      if (data.email === "") {
        setIsEmptyMessageEmail(true);
        setIsShortCodeMessageEmail(false);
      } else if (validateEmail(data.email) === false) {
        setIsEmptyMessageEmail(false);
        setIsShortCodeMessageEmail(true);
      } else {
        setIsEmptyMessageEmail(false);
        setIsShortCodeMessageEmail(false);
      }
      if (data.password === "") {
        setIsEmptyMessagePassword(true);
        setIsShortCodeMessagePassword(false);
      } else if (data.password.length < 8) {
        setIsEmptyMessagePassword(false);
        setIsShortCodeMessagePassword(true);
      } else {
        setIsEmptyMessagePassword(false);
        setIsShortCodeMessagePassword(false);
      }
    } else {
      setIsEmptyMessageVisible(false);
      setIsShortCodeMessageVisible(false);
      setIsEmptyMessageEmail(false);
      setIsShortCodeMessageEmail(false);
      setIsEmptyMessagePassword(false);
      setIsShortCodeMessagePassword(false);
    }
  }, [inputClicked, data.email, data.password]);
  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    confirm_password: "",
    store_name: "",
    address: "",
    full_name: "",
    phone: "",
  });
  const handleChange = (fieldName: string) => (e: any) => {
    const value = e.target.value.trim();
    // console.log("value", value);
    setData({
      ...data,
      [fieldName]: value,
    });
  };
  const handleChangeRegister = (fieldName: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    if (fieldName === "phone") {
      // Allow only numbers
      const numericValue = value.replace(/\D/g, ""); // Remove all non-numeric characters
      value = numericValue;
    } else if (["email", "password", "confirm_password"].includes(fieldName)) {
      value = value.trim();
    }

    console.log("value", value);

    setDataRegister({
      ...dataRegister,
      [fieldName]: value,
    });
  };

  const setHandleInputPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setInputPassword(value);
  };
  const getRememberPassword = () => {
    setIsOpenPopups(!isOpenPopups);
  };
  const clickForgotPassword = async () => {
    const data = {
      email: inputPassword,
    };
    setButtonDisabled(true);
    try {
      const res = await loginApi.forgotPassword(data);
      if (res.code === 200) {
        const msSuccess = res.message.text;
        setInputPassword("");
        setIsOpenPopups(false);
        toast.success(msSuccess);
      } else {
        console.log("111", msErr);
      }
    } catch (err) {
      handleError(err);
      setButtonDisabled(false);
      if (inputRef.current) {
        inputRef.current.focus();
        inputRef.current.select();
      }
    }
    setButtonDisabled(false);
  };
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const userData = {
      email: dataRegister.email,
      password: dataRegister.password,
      confirm_password: dataRegister.confirm_password,
      store_name: dataRegister.store_name,
      address: dataRegister.address,
      full_name: dataRegister.full_name,
      phone: dataRegister.phone,
    };
    setIsLoading(true);
    loginApi.postMessageRegister(userData).then((response) => {
      if (response.code === 200) {
        const successMs = response.message.text;
        toast.success(successMs);
        clearInputRegister();
        success();
      } else {
        console.log(response);
        const errMs = response.data.message.text;
        toast.error(errMs);
        // error(res);
        setIsLoading(false);
      }
    });
  };
  const handleSubmitLogin = async (event: any) => {
    event.preventDefault();
    const userData = {
      email: data.email,
      password: data.password,
    };
    setIsLoading(true);
    try {
      const res = await loginApi.postMessage(userData);
      if (res.code === 200) {
        const messageSuccess = res.message.text;
        toast.success(messageSuccess);
        localStorage.setItem("INFO_USER", JSON.stringify(res.data));
        setTimeout(() => {
          login(res.data.access_token, res.data.refresh_token);
        }, 1000);
      } else {
        console.log("res", res);
      }
    } catch (error) {
      handleError(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="image-background">
      <div className="logo-image">
        <img src={logo} alt="logo" />
      </div>
      <ToastContainer />
      <div className={`wrapper${action}`}>
        {/* form login */}
        <div className="form-box login">
          <form onSubmit={handleSubmitLogin}>
            <h1 className="title-header">Đăng nhập</h1>
            <div className="input-box">
              <input
                type="text"
                value={data.email}
                placeholder=" "
                onChange={handleChange("email")}
                required
                onFocus={() => setInputClicked(!inputClicked)}
                onBlur={handleBlur}
              />
              <label htmlFor="Email" className="form-email">
                Email<span className="required-star">*</span>
              </label>

              <FaUser className="icon" />
              {isEmptyMessageEmail && <p className="message-error">Email không được để trống!</p>}
              {isShortCodeMessageEmail && <p className="message-error">Email không hợp lệ!</p>}
            </div>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                value={data.password}
                placeholder=" "
                onChange={handleChange("password")}
                required
                onFocus={() => setInputClicked(!inputClicked)}
                onBlur={handleBlur}
              />
              <label htmlFor="Password" className="form-email">
                Password<span className="required-star">*</span>
              </label>
              {showPassword ? (
                <FaEye className="icon password" onClick={() => setShowPassword(!showPassword)} />
              ) : (
                <FaEyeSlash
                  className="icon password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
              {isEmptyMessagePassword && (
                <p className="message-error">Password không được để trống!</p>
              )}
              {isShortCodeMessagePassword && (
                <p className="message-error">Password không hợp lệ!</p>
              )}
            </div>
            <div className="remember-forgot">
              <label htmlFor="">
                <a href="#" onClick={getRememberPassword}>
                  Quên mật khẩu
                </a>
              </label>
              <Modal
                okButtonProps={{ disabled: buttonDisabled }}
                className="modalDialog-addItems"
                width={450}
                centered
                open={isOpenPopups}
                onOk={clickForgotPassword}
                onCancel={getRememberPassword}
                okText="Lấy mật khẩu"
                cancelText="Hủy bỏ"
              >
                <h1 className="title-addItem">Quên mật khẩu?</h1>
                <div className="containner-forgot-password">
                  <label htmlFor="number_bank">Vui lòng nhập email để thiết lập lại mật khẩu</label>
                  <div>
                    <input
                      type="text"
                      className="input-forgot-password"
                      onChange={setHandleInputPassword}
                      name="number_bank"
                      value={inputPassword}
                      placeholder="Nhập email đăng nhập"
                      ref={inputRef}
                    />
                    {/* {errorAddNameBanking && errorAddNameBanking.error && (
                      <p className="error-message">{errorAddNameBanking.error}</p>
                    )} */}
                  </div>
                </div>
              </Modal>
            </div>
            <button type="submit" disabled={isLoading || !validateLoginInputs()}>
              {isLoading ? (
                <span>
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                </span>
              ) : (
                <span>Đăng nhập</span>
              )}
              {/* <FontAwesomeIcon icon={faCircleNotch} spin />Đăng nhập */}
            </button>

            <div className="register-link">
              <p>
                Bạn chưa có tài khoản?{" "}
                <a href="#" onClick={registerLink}>
                  Đăng kí
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* form register */}
        <div className="form-box register">
          <form action="" onSubmit={handleSubmitRegister} autoComplete="off">
            <h1 className="title-header">Đăng kí tài khoản</h1>
            <div className="input-box-form">
              {/* <div className="input-box resgister">
                <input
                  type="text"
                  placeholder="Mã cửa hàng"
                  required
                  value={dataRegister.store_code}
                  onChange={handleChangeRegister("store_code")}
                />
                <FaStore className="icon" />
              </div> */}
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder=" "
                  required
                  // ref={storeNameRef}
                  value={dataRegister.store_name}
                  onChange={handleChangeRegister("store_name")}
                />
                <label htmlFor="store_name" className="form-email">
                  Tên cửa hàng <span className="required-star">*</span>
                </label>
                <LuStore className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder=" "
                  required
                  // ref={fullNameRef}
                  value={dataRegister.full_name}
                  onChange={handleChangeRegister("full_name")}
                />
                <label htmlFor="full_name" className="form-email">
                  Họ và tên <span className="required-star">*</span>
                </label>
                <FaUser className="icon" />
              </div>
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder=" "
                  required
                  // ref={emailRef}
                  value={dataRegister.email}
                  onChange={handleChangeRegister("email")}
                />
                <label htmlFor="Email" className="form-email">
                  Email <span className="required-star">*</span>
                </label>
                <FaEnvelope className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder=" "
                  required
                  value={dataRegister.address}
                  // ref={adressRef}
                  onChange={handleChangeRegister("address")}
                />
                <label htmlFor="address" className="form-email">
                  Địa chỉ <span className="required-star">*</span>
                </label>
                <FaRegAddressCard className="icon" />
              </div>
              <div className="input-box resgister">
                <Popover placement="bottomLeft" title={text} content={content}>
                  <input
                    type={showPasswordRegister ? "text" : "password"}
                    placeholder=" "
                    required
                    // ref={passWordRef}
                    value={dataRegister.password}
                    onChange={handleChangeRegister("password")}
                  />
                </Popover>

                <label htmlFor="password" className="form-email">
                  Password <span className="required-star">*</span>
                </label>
                {showPasswordRegister ? (
                  <FaEye
                    className="icon password"
                    onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                  />
                ) : (
                  <FaEyeSlash
                    className="icon password"
                    onClick={() => setShowPasswordRegister(!showPasswordRegister)}
                  />
                )}
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder=" "
                  required
                  // ref={phoneRef}
                  value={dataRegister.phone}
                  onChange={handleChangeRegister("phone")}
                />

                <label htmlFor="phone" className="form-email">
                  SĐT <span className="required-star">*</span>
                </label>
                <FaPhone className="icon" />
              </div>

              <div className="input-box resgister">
                <input
                  type={showConfirmPasswordRegister ? "text" : "password"}
                  placeholder=" "
                  required
                  // ref={confirmPasswordRef}
                  value={dataRegister.confirm_password}
                  onChange={handleChangeRegister("confirm_password")}
                />
                <label htmlFor="confirm_password" className="form-email">
                  Confirm Password <span className="required-star">*</span>
                </label>
                {showConfirmPasswordRegister ? (
                  <FaEye
                    className="icon password"
                    onClick={() => setshowConfirmPasswordRegister(!showConfirmPasswordRegister)}
                  />
                ) : (
                  <FaEyeSlash
                    className="icon password"
                    onClick={() => setshowConfirmPasswordRegister(!showConfirmPasswordRegister)}
                  />
                )}
              </div>
            </div>

            <button type="submit" className="button-resgister" disabled={isLoading}>
              {isLoading ? (
                <span>
                  <FontAwesomeIcon icon={faCircleNotch} spin />
                </span>
              ) : (
                <span>Đăng kí</span>
              )}
            </button>
            <div className="register-link">
              <p>
                Quay lại trang login?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginRegister;

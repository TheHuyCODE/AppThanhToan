import React, { useEffect, useState } from "react";
import loginApi from "../../configs/loginApi";
import "./LoginRegister.css";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaStore,
  FaRegAddressCard,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { LuStore } from "react-icons/lu";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
const LoginRegister = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRegister, setShowPasswordRegister] = useState(false);
  const [showConfirmPasswordRegister, setshowConfirmPasswordRegister] =
    useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyMessageVisible, setIsEmptyMessageVisible] = useState(false);
  const [isShortCodeMessageVisible, setIsShortCodeMessageVisible] =
    useState(false);
  const [isEmptyMessageEmail, setIsEmptyMessageEmail] = useState(false);
  const [isShortCodeMessageEmail, setIsShortCodeMessageEmail] = useState(false);
  const [isEmptyMessagePassword, setIsEmptyMessagePassword] = useState(false);
  const [isShortCodeMessagePassword, setIsShortCodeMessagePassword] =
    useState(false);
  const [inputClicked, setInputClicked] = useState(false);
  const validateEmail = (email) => {
    // Regular expression for email validation
    const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    return regex.test(email);
  };
  const validateLoginInputs = () => {
    if (
      data.store_code === "" ||
      data.email === "" ||
      data.password === "" ||
      !validateEmail(data.email) ||
      data.password.length < 8 ||
      data.store_code.length < 3
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
  const [data, setData] = useState({
    email: "",
    password: "",
    store_code: "",
  });
  useEffect(() => {
    console.log("inputClicked", inputClicked);
    if (inputClicked) {
      if (data.store_code === "") {
        setIsEmptyMessageVisible(true);
        setIsShortCodeMessageVisible(false);
      } else if (data.store_code.length < 3) {
        setIsEmptyMessageVisible(false);
        setIsShortCodeMessageVisible(true);
      } else {
        setIsEmptyMessageVisible(false);
        setIsShortCodeMessageVisible(false);
      }
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
  }, [data.store_code, inputClicked, data.email, data.password]);
  const [dataRegister, setDataRegister] = useState({
    email: "",
    password: "",
    store_code: "",
    confirm_password: "",
    store_name: "",
    address: "",
    full_name: "",
    phone: "",
  });
  const handleChange = (fieldName) => (e) => {
    const value = e.target.value.trim();
    console.log("value", value);
    setData({
      ...data,
      [fieldName]: value,
    });
  };
  const handleChangeRegister = (fieldName) => (e) => {
    const value = e.target.value.trim();
    console.log("value", value);
    setDataRegister({
      ...dataRegister,
      [fieldName]: value,
    });
  };
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const userData = {
      email: dataRegister.email,
      password: dataRegister.password,
      confirm_password: dataRegister.confirm_password,
      store_code: dataRegister.store_code,
      store_name: dataRegister.store_name,
      address: dataRegister.address,
      full_name: dataRegister.full_name,
      phone: dataRegister.phone,
    };
    loginApi.postMessageRegister(userData).then((response) => {
      if (response.code === 200) {
        // Redirect to dashboard
        console.log("res", response);
        toast.success("Register success!");
        // console.log("Đăng nhập thành công");
      } else {
        // setCheckInPut(!checkInput);
        toast.error("Create account access");
      }
    });
  };
  const handleSubmitLogin = (event) => {
    event.preventDefault();
    // const myHeaders = new Headers();
    // myHeaders.append("Content-Type", "application/json");
    const userData = {
      email: data.email,
      password: data.password,
      store_code: data.store_code,
    };
    setIsLoading(true);
    loginApi.postMessage(userData).then((res) => {
      console.log("res", res);
      if (res.code === 200) {
        // Redirect to dashboard
        console.log("res", res);
        toast.success("Loggin success!");

        setTimeout(() => {
          navigateToLoginSuccess();
        }, 2000);
        // console.log("Đăng nhập thành công");
      } else {
        toast.error("Not found User!");
        console.log("Đăng nhập không thành công");
        setIsLoading(false);
      }
    });
    const navigateToLoginSuccess = () => {
      navigate("/");
    };
  };

  return (
    <div className="image-background">
      <ToastContainer />
      <div className={`wrapper${action}`}>
        {/* form login */}
        <div className="form-box login">
          <form onSubmit={handleSubmitLogin}>
            <h1 className="title-header">Đăng nhập</h1>
            <div className="input-box">
              <input
                type="text"
                value={data.store_code}
                placeholder="Mã gian hàng"
                required
                onChange={handleChange("store_code")}
                onFocus={() => setInputClicked(!inputClicked)}
                onBlur={handleBlur}
              />
              <IoMdHome className="icon home" />
              {isEmptyMessageVisible && (
                <p className="message-error">
                  Mã cửa hàng không được để trống!
                </p>
              )}
              {isShortCodeMessageVisible && (
                <p className="message-error">
                  Mã cửa hàng phải lớn hơn 3 ký tự!
                </p>
              )}
            </div>
            <div className="input-box">
              <input
                type="text"
                value={data.email}
                placeholder="Tên đăng nhập"
                onChange={handleChange("email")}
                required
                onFocus={() => setInputClicked(!inputClicked)}
                onBlur={handleBlur}
              />
              <FaUser className="icon" />
              {isEmptyMessageEmail && (
                <p className="message-error">Email không được để trống!</p>
              )}
              {isShortCodeMessageEmail && (
                <p className="message-error">Email không hợp lệ!</p>
              )}
            </div>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                value={data.password}
                placeholder="Mật khẩu"
                onChange={handleChange("password")}
                required
                onFocus={() => setInputClicked(!inputClicked)}
                onBlur={handleBlur}
              />
              {showPassword ? (
                <FaEye
                  className="icon password"
                  onClick={() => setShowPassword(!showPassword)}
                />
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
                <a href="#">Quên mật khẩu</a>
              </label>
            </div>
            <button
              type="submit"
              disabled={isLoading || !validateLoginInputs()}
            >
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
          <form action="" onSubmit={handleSubmitRegister}>
            <h1 className="title-header">Đăng kí tài khoản</h1>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder="Mã cửa hàng"
                  required
                  value={dataRegister.store_code}
                  onChange={handleChangeRegister("store_code")}
                />
                <FaStore className="icon" />
              </div>
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder="Họ và Tên"
                  required
                  value={dataRegister.full_name}
                  onChange={handleChangeRegister("full_name")}
                />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder="Tên cửa hàng"
                  required
                  value={dataRegister.store_name}
                  onChange={handleChangeRegister("store_name")}
                />
                <LuStore className="icon" />
              </div>
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder="Email"
                  required
                  value={dataRegister.email}
                  onChange={handleChangeRegister("email")}
                />
                <FaEnvelope className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder="Địa chỉ"
                  required
                  value={dataRegister.address}
                  onChange={handleChangeRegister("address")}
                />
                <FaRegAddressCard className="icon" />
              </div>
              <div className="input-box resgister">
                <input
                  type={showPasswordRegister ? "text" : "password"}
                  placeholder="Password"
                  required
                  value={dataRegister.password}
                  onChange={handleChangeRegister("password")}
                />
                {showPasswordRegister ? (
                  <FaEye
                    className="icon password"
                    onClick={() =>
                      setShowPasswordRegister(!showPasswordRegister)
                    }
                  />
                ) : (
                  <FaEyeSlash
                    className="icon password"
                    onClick={() =>
                      setShowPasswordRegister(!showPasswordRegister)
                    }
                  />
                )}
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input
                  type="text"
                  placeholder="Số điện thoại"
                  required
                  value={dataRegister.phone}
                  onChange={handleChangeRegister("phone")}
                />
                <FaPhone className="icon" />
              </div>

              <div className="input-box resgister">
                <input
                  type={showConfirmPasswordRegister ? "text" : "password"}
                  placeholder="Comfirm Password"
                  required
                  value={dataRegister.confirm_password}
                  onChange={handleChangeRegister("confirm_password")}
                />
                {showConfirmPasswordRegister ? (
                  <FaEye
                    className="icon password"
                    onClick={() =>
                      setshowConfirmPasswordRegister(
                        !showConfirmPasswordRegister
                      )
                    }
                  />
                ) : (
                  <FaEyeSlash
                    className="icon password"
                    onClick={() =>
                      setshowConfirmPasswordRegister(
                        !showConfirmPasswordRegister
                      )
                    }
                  />
                )}
              </div>
            </div>

            <button type="submit" className="button-resgister">
              Đăng kí
            </button>
            <div className="register-link">
              <p>
                Return to Login page?{" "}
               
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

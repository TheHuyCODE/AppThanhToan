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
const LoginRegister = () => {
  const navigate = useNavigate();
  const [action, setAction] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const registerLink = () => {
    setAction(" active");
  };
  const loginLink = () => {
    setAction("");
  };
  const [data, setData] = useState({
    email: "",
    password: "",
    store_code: "",
  });

  const handleChange = (fieldName) => (e) => {
    const value = e.target.value;
    console.log("value", value);
    setData({
      ...data,
      [fieldName]: value,
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

    loginApi.postMessage(userData).then((res) => {
      console.log("res", res);
      if (res.code === 200) {
        // Redirect to dashboard
        console.log("res", res);
        toast.success("Loggin success!");
        setIsLoading(true);
        setTimeout(() => {
          navigateToLoginSuccess();
        }, 2000);
        // console.log("Đăng nhập thành công");
      } else {
        toast.error("Not found User!");
        console.log("Đăng nhập không thành công");
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
              />
              <IoMdHome className="icon home" />
            </div>
            <div className="input-box">
              <input
                type="text"
                value={data.email}
                placeholder="Tên đăng nhập"
                onChange={handleChange("email")}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                value={data.password}
                placeholder="Mật khẩu"
                onChange={handleChange("password")}
                required
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
            </div>
            <div className="remember-forgot">
              <label htmlFor="">
                <a href="#">Quên mật khẩu</a>
              </label>
            </div>
            <button type="submit" disabled={isLoading}>
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
          <form action="">
            <h1 className="title-header">Đăng kí tài khoản</h1>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input type="text" placeholder="Mã cửa hàng" required />
                <FaStore className="icon" />
              </div>
              <div className="input-box resgister">
                <input type="text" placeholder="Họ và Tên" required />
                <FaUser className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input type="text" placeholder="Tên cửa hàng" required />
                <LuStore className="icon" />
              </div>
              <div className="input-box resgister">
                <input type="text" placeholder="Email" required />
                <FaEnvelope className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input type="text" placeholder="Địa chỉ" required />
                <FaRegAddressCard className="icon" />
              </div>
              <div className="input-box resgister">
                <input type="password" placeholder="Password" required />
                <FaEye className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box resgister">
                <input type="text" placeholder="Số điện thoại" required />
                <FaPhone className="icon" />
              </div>

              <div className="input-box resgister">
                <input
                  type="password"
                  placeholder="Comfirm Password"
                  required
                />
                <FaEye className="icon" />
              </div>
            </div>

            <button type="submit" className="button-resgister">
              Đăng kí
            </button>
            <div className="register-link">
              <p>
                Return to page Login?{" "}
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

import React, { useState } from "react";
import "./LoginRegister.css";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaLockOpen,
  FaStore,
  FaRegAddressCard,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { LuStore } from "react-icons/lu";
const LoginRegister = () => {
  const [action, setAction] = useState("");

  const registerLink = () => {
    setAction(" active");
  };
  const loginLink = () => {
    setAction("");
  };
  const myStyle = {
    backgroundImage:
      "url('https://media.geeksforgeeks.org/wp-content/uploads/rk.png')",
    height: "100vh",
    marginTop: "-70px",
    fontSize: "50px",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };
  const [codeStore, setCodestore] = useState("");
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const hiddenPassword = () => {
  //   console.log("hidden password");
  // };
  return (
    <div className="image-background">
      <div className={`wrapper${action}`}>
        {/* form login */}
        <div className="form-box login">
          <form action="">
            <h1>Login</h1>
            <div className="input-box">
              <input
                type="text"
                value={codeStore}
                placeholder="Mã gian hàng"
                required
                onChange={(event) => {
                  setCodestore(event.target.value);
                }}
              />
              <IoMdHome className="icon home" />
            </div>
            <div className="input-box">
              <input
                type="text"
                value={userName}
                placeholder="Username"
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                required
              />
              <FaUser className="icon" />
            </div>
            <div className="input-box">
              <input
                type={showPassword === true ? "text" : "password"}
                value={passWord}
                placeholder="Password"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
                required
              />
              {showPassword ? (
                <FaLockOpen
                  className="icon password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <FaLock
                  className="icon password"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
            <div className="remember-forgot">
              <label htmlFor="">
                <input type="checkbox"></input>
                Remember me
              </label>
              <a href="#">Forgot Password?</a>
            </div>
            <button
              type="submit"
              className={codeStore && userName && passWord ? "active" : ""}
              disabled={codeStore && userName && passWord ? false : true}
            >
              Login
            </button>
            <div className="register-link">
              <p>
                Don't have an account?{" "}
                <a href="#" onClick={registerLink}>
                  Register
                </a>
              </p>
            </div>
          </form>
        </div>

        {/* form register */}
        <div className="form-box register">
          <form action="">
            <h1>Registration</h1>
            <div className="label-register">
              <label htmlFor="">Nhập thông tin cá nhân bên dưới</label>
              <label htmlFor="">Nhập thông tin tài khoản bên dưới</label>
            </div>
            <div className="input-box-form">
              <div className="input-box">
                <input type="text" placeholder="Họ và Tên" required />
                <FaUser className="icon" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Mã cửa hàng" required />
                <FaStore className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box">
                <input type="text" placeholder="Số điện thoại" required />
                <FaPhone className="icon" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Tên cửa hàng" required />
                <LuStore className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box">
                <input type="text" placeholder="Email" required />
                <FaEnvelope className="icon" />
              </div>
              <div className="input-box">
                <input type="text" placeholder="Địa chỉ" required />
                <FaRegAddressCard className="icon" />
              </div>
            </div>
            <div className="input-box-form">
              <div className="input-box">
                <input type="password" placeholder="Password" required />
                <FaLock className="icon" />
              </div>
              <div className="input-box">
                <input
                  type="password"
                  placeholder="Comfirm Password"
                  required
                />
                <FaLock className="icon" />
              </div>
            </div>
            <div className="remember-forgot-register">
              <label htmlFor="">
                <input type="checkbox"></input>I agree to the terms and
                conditions
              </label>
            </div>
            <button type="submit">Register</button>
            <div className="register-link">
              <p>
                Return to page Login?{" "}
                <a href="#" onClick={loginLink}>
                  Login
                </a>
              </p>
            </div>
          </form>
          <form></form>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;

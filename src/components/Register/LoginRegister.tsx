import React, { useState } from "react";
import "./LoginRegister.css";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPhone,
  FaLockOpen,
} from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
const LoginRegister = () => {
  const [action, setAction] = useState("");

  const registerLink = () => {
    setAction(" active");
  };
  const loginLink = () => {
    setAction("");
  };

  const [codeStore, setCodestore] = useState("");
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const hiddenPassword = () => {
    console.log("hidden password");
  };
  return (
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
          <div className="input-box">
            <input type="text" placeholder="Username" required />
            <FaUser className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Phone number" required />
            <FaPhone className="icon" />
          </div>
          <div className="input-box">
            <input type="text" placeholder="Email" required />
            <FaEnvelope className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Password" required />
            <FaLock className="icon" />
          </div>
          <div className="input-box">
            <input type="password" placeholder="Comfirm Password" required />
            <FaLock className="icon" />
          </div>
          <div className="remember-forgot">
            <label htmlFor="">
              <input type="checkbox"></input>I agree to the terms and conditions
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
      </div>
    </div>
  );
};

export default LoginRegister;

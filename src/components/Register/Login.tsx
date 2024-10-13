import { useState } from "react";
import { FaEye, FaEyeSlash, FaUser } from "react-icons/fa";
import { IoMdHome } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginApi from "../../configs/loginApi";
import "./LoginRegister.css";

const Login = ({ registerLink }: any) => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    store_code: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isEmptyMessageVisible, setIsEmptyMessageVisible] = useState(false);
  const [isShortCodeMessageVisible, setIsShortCodeMessageVisible] =
    useState(false);
  const [isEmptyMessageEmail, setIsEmptyMessageEmail] = useState(false);
  const [isShortCodeMessageEmail, setIsShortCodeMessageEmail] = useState(false);
  const [isEmptyMessagePassword, setIsEmptyMessagePassword] = useState(false);
  const [isShortCodeMessagePassword, setIsShortCodeMessagePassword] =
    useState(false);

  // const validateEmail = (email) => {
  //   const regex = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
  //   return regex.test(email);
  // };

  const handleBlur = () => {
    setIsEmptyMessageVisible(false);
    setIsShortCodeMessageVisible(false);
    setIsEmptyMessageEmail(false);
    setIsShortCodeMessageEmail(false);
    setIsEmptyMessagePassword(false);
    setIsShortCodeMessagePassword(false);
  };
  //@ts-ignore
  const handleChange = (fieldName) => (e) => {
    const value = e.target.value;
    setData({
      ...data,
      [fieldName]: value,
    });
  };
  //@ts-ignore
  const handleSubmitLogin = (event) => {
    event.preventDefault();

    setIsLoading(true);

    loginApi.postMessage(data).then((res) => {
      setIsLoading(false); //@ts-ignore
      if (res.code === 200) {
        toast.success("Đăng nhập thành công!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Đăng nhập không thành công!");
      }
    });
  };

  return (
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
            onFocus={handleBlur}
            onBlur={handleBlur}
          />
          <IoMdHome className="icon home" />
          {isEmptyMessageVisible && (
            <p className="message-error">Mã cửa hàng không được để trống!</p>
          )}
          {isShortCodeMessageVisible && (
            <p className="message-error">Mã cửa hàng phải lớn hơn 4 ký tự!</p>
          )}
        </div>
        <div className="input-box">
          <input
            type="text"
            value={data.email}
            placeholder="Email"
            onChange={handleChange("email")}
            required
            onFocus={handleBlur}
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
            type="password"
            value={data.password}
            placeholder="Mật khẩu"
            onChange={handleChange("password")}
            required
            onFocus={handleBlur}
            onBlur={handleBlur}
          />
          <div
            className="icon password" //@ts-ignore
            onClick={() => setShowPassword(!showPassword)}
          >
            {/* @ts-ignore */}
            {showPassword ? <FaEye /> : <FaEyeSlash />}
          </div>
          {isEmptyMessagePassword && (
            <p className="message-error">Mật khẩu không được để trống!</p>
          )}
          {isShortCodeMessagePassword && (
            <p className="message-error">Mật khẩu phải có ít nhất 8 ký tự!</p>
          )}
        </div>
        <button type="submit" disabled={isLoading}>
          {isLoading ? <span></span> : <span>Đăng nhập</span>}
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
      <ToastContainer />
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import "./LoginRegister.css";
// import axios from "axios";
// import {
//   FaUser,
//   FaLock,
//   FaEnvelope,
//   FaPhone,
//   FaLockOpen,
//   FaStore,
//   FaRegAddressCard,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import { IoMdHome } from "react-icons/io";
// import { LuStore } from "react-icons/lu";
// const LoginRegister = () => {
//   const [action, setAction] = useState("");

//   const registerLink = () => {
//     setAction(" active");
//   };
//   const loginLink = () => {
//     setAction("");
//   };

//   const [codeStore, setCodestore] = useState("");
//   const [userName, setUsername] = useState("");
//   const [passWord, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   // const hiddenPassword = () => {
//   //   console.log("hidden password");
//   // };

//   const myHeaders = new Headers();
//   myHeaders.append("Content-Type", "application/json");

//   const raw = JSON.stringify({
//     email: "anh@boot.ai",
//     password: "admin@1234",
//     store_code: "NNA",
//   });

//   const requestOptions = {
//     method: "POST",
//     headers: myHeaders,
//     body: raw,
//     redirect: "follow",
//   };

//   fetch("https://7336-113-190-145-5.ngrok-free.app/api/v1/auth/login", requestOptions)
//     .then((response) => response.text())
//     .then((result) => console.log(result))
//     .catch((error) => console.error(error));
//   return (
//     <div className="image-background">
//       <div className={`wrapper${action}`}>
//         {/* form login */}
//         <div className="form-box login">
//           <form action="">
//             <h1 className="title-header">Đăng nhập</h1>
//             <div className="input-box">
//               <input
//                 type="text"
//                 value={codeStore}
//                 placeholder="Mã gian hàng"
//                 required
//                 onChange={(event) => {
//                   setCodestore(event.target.value);
//                 }}
//               />
//               <IoMdHome className="icon home" />
//             </div>
//             <div className="input-box">
//               <input
//                 type="text"
//                 value={userName}
//                 placeholder="Tên đăng nhập"
//                 onChange={(event) => {
//                   setUsername(event.target.value);
//                 }}
//                 required
//               />
//               <FaUser className="icon" />
//             </div>
//             <div className="input-box">
//               <input
//                 type={showPassword === true ? "text" : "password"}
//                 value={passWord}
//                 placeholder="Mật khẩu"
//                 onChange={(event) => {
//                   setPassword(event.target.value);
//                 }}
//                 required
//               />
//               {showPassword ? (
//                 <FaEye
//                   className="icon password"
//                   onClick={() => setShowPassword(!showPassword)}
//                 />
//               ) : (
//                 <FaEyeSlash
//                   className="icon password"
//                   onClick={() => setShowPassword(!showPassword)}
//                 />
//               )}
//             </div>
//             <div className="remember-forgot">
//               <label htmlFor="">
//                 <a
//                   href="
                
//                 "
//                 >
//                   Quên mật khẩu
//                 </a>
//               </label>
//             </div>
//             <button
//               type="submit"
//               // className={codeStore && userName && passWord ? "active" : ""}
//               // disabled={codeStore && userName && passWord ? false : true}
//             >
//               Đăng nhập
//             </button>
//             <div className="register-link">
//               <p>
//                 Bạn chưa có tài khoản?{" "}
//                 <a href="#" onClick={registerLink}>
//                   Đăng kí
//                 </a>
//               </p>
//             </div>
//           </form>
//         </div>

//         {/* form register */}
//         <div className="form-box register">
//           <form action="">
//             <h1 className="title-header">Đăng kí tài khoản</h1>
//             <div className="input-box-form">
//               <div className="input-box resgister">
//                 <input type="text" placeholder="Mã cửa hàng" required />
//                 <FaStore className="icon" />
//               </div>
//               <div className="input-box resgister">
//                 <input type="text" placeholder="Họ và Tên" required />
//                 <FaUser className="icon" />
//               </div>
//             </div>
//             <div className="input-box-form">
//               <div className="input-box resgister">
//                 <input type="text" placeholder="Tên cửa hàng" required />
//                 <LuStore className="icon" />
//               </div>
//               <div className="input-box resgister">
//                 <input type="text" placeholder="Email" required />
//                 <FaEnvelope className="icon" />
//               </div>
//             </div>
//             <div className="input-box-form">
//               <div className="input-box resgister">
//                 <input type="text" placeholder="Địa chỉ" required />
//                 <FaRegAddressCard className="icon" />
//               </div>
//               <div className="input-box resgister">
//                 <input type="password" placeholder="Password" required />
//                 <FaEye className="icon" />
//               </div>
//             </div>
//             <div className="input-box-form">
//               <div className="input-box resgister">
//                 <input type="text" placeholder="Số điện thoại" required />
//                 <FaPhone className="icon" />
//               </div>

//               <div className="input-box resgister">
//                 <input
//                   type="password"
//                   placeholder="Comfirm Password"
//                   required
//                 />
//                 <FaEye className="icon" />
//               </div>
//             </div>

//             <button type="submit" className="button-resgister">
//               Đăng kí
//             </button>
//             <div className="register-link">
//               <p>
//                 Return to page Login?{" "}
//                 <a href="#" onClick={loginLink}>
//                   Login
//                 </a>
//               </p>
//             </div>
//           </form>
//           <form></form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginRegister;
import React, { useState } from "react";
import "./LoginRegister.css";
import axios from "axios";
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

const LoginRegister = () => {
  const [action, setAction] = useState("");
  const [codeStore, setCodestore] = useState("");
  const [userName, setUsername] = useState("");
  const [passWord, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [codeStoreResgister, setCodeStoreResgister] = useState("");
  const [userNameResgister, setUserNameResgister] = useState("");
  const [passWord, setPassword] = useState("");
  const registerLink = () => {
    setAction(" active");
  };
  
  const loginLink = () => {
    setAction("");
  };

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = {
      email: userName,
      password: passWord,
      store_code: codeStore,
    };
    axios
      .post("https://7336-113-190-145-5.ngrok-free.app/api/v1/auth/login", data, {
        headers: myHeaders,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message && response.data.message.status === "success") {
          // Redirect to dashboard
          console.log("Đăng nhập thành công");
        } else {
          console.log("Đăng nhập thất bại");
        }
        // Handle success, like storing token in local storage
      })
      .catch((error) => {
        console.error(error);
        // Handle error, maybe show error to user
      });
  };  
  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = {
      full_name: fullName,
      phone: phone,
      email: userName,
      password: passWord,
      confirm_password: confirmPassword,
      store_code: codeStore,
      store_name: storeName,
      address: address
    };
    axios
      .post("https://7336-113-190-145-5.ngrok-free.app/api/v1/auth/resgister", data, {
        headers: myHeaders,
      })
      .then((response) => {
        console.log(response.data);
        if (response.data.message && response.data.message.status === "success") {
          // Redirect to dashboard
          console.log("Đăng nhập thành công");
        } else {
          console.log("Đăng nhập thất bại");
        }
        // Handle success, like storing token in local storage
      })
      .catch((error) => {
        console.error(error);
        // Handle error, maybe show error to user
      });
  }
  return (
    <div className="image-background">
      <div className={`wrapper${action}`}>
        {/* form login */}
        <div className="form-box login">
          <form onSubmit={handleSubmit}>
            <h1 className="title-header">Đăng nhập</h1>
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
                placeholder="Tên đăng nhập"
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
                placeholder="Mật khẩu"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
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
            <button type="submit">
              Đăng nhập
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

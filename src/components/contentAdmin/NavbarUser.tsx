import { IoPerson, IoPersonCircleOutline } from "react-icons/io5";
import { domain } from "../TableConfig/TableConfig";
import { IoIosCheckmark } from "react-icons/io";
import { PiSignOutBold } from "react-icons/pi";
import { useAuth } from "../auth/AuthContext";
import logoutApi from "../../configs/logoutApi";
import { handleError } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
// Đảm bảo bạn import tệp CSS

const domainImage = domain.domainLink;

const NavbarUser = () => {
  const navigate = useNavigate();
  const { accessToken, logout } = useAuth();
  const handleLogoutUser = async () => {
    const resAccessToken = accessToken;
    logout();
    if (resAccessToken) {
      try {
        const res = await logoutApi.deleteTokenLogout(resAccessToken);
        console.log("resLogout", res.data);
      } catch (error) {
        handleError(error);
      }
    }
  };
  const handleModifyUser = () => {
    navigate(`/admin/profile`);
  };
  const getUserData = () => {
    const userData = localStorage.getItem("INFO_USER");
    if (userData) {
      const user = JSON.parse(userData);
      return {
        fullName: user.full_name || "Người dùng",
        avatarUrl: user.avatar_url ? `${domainImage}${user.avatar_url}` : null,
      };
    }
    return {
      fullName: "Người dùng",
      avatarUrl: null,
    };
  };
  const { fullName, avatarUrl } = getUserData();
  return (
    <>
      <div className="info-user-dropdown">
        <span>Xin chào, {fullName || "Người dùng"}</span>
        <div className="image-profile" style={{ width: "50px", height: "50px" }}>
          {avatarUrl ? (
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <img
                src={avatarUrl}
                alt="Profile"
                style={{ width: "100%", height: "100%", borderRadius: "50%" }}
              />
              <IoIosCheckmark
                style={{
                  position: "absolute",
                  right: "-4",
                  bottom: "0",
                  fontSize: "20px",
                  zIndex: "1",
                  color: "green",
                  padding: "2px",
                  background: "lightgrey",
                  borderRadius: "50%",
                }}
              />
            </div>
          ) : (
            <IoPerson />
          )}
        </div>
        <div className="dropdown-infouser">
          <a href="#" onClick={handleModifyUser}>
            <IoPersonCircleOutline className="icon-user" />
            <span>Tài khoản</span>
          </a>
          <a href="#" onClick={handleLogoutUser}>
            <PiSignOutBold className="icon-user" />
            <span>Đăng xuất</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default NavbarUser;

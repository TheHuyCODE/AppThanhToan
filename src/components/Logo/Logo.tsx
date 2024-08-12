import "./logo.css";
import logoTitle from "../../../public/Logo.png";
interface Logoprops {
  collapsedTheme: boolean;
}
const Logo: React.FC<Logoprops> = ({ collapsedTheme }) => {
  const onChangeProfileAdmin = () => {};
  const getStoreName = () => {
    const userData = localStorage.getItem("INFO_USER");
    if (userData) {
      const user = JSON.parse(userData);
      return user.store?.name || "Super Admin";
    }
    return "Default Store Name"; // Tên cửa hàng mặc định nếu không có thông tin trong localStorage
  };
  return (
    <div className="logo">
      <div className="logo-icon" onClick={onChangeProfileAdmin}>
        {!collapsedTheme && <img src={logoTitle} alt="logo" />}
      </div>
      <span
        style={{
          color: "#db2142",
          marginTop: "10px",
          padding: "5px",
          fontWeight: "600",
          fontSize: "20px",
          textTransform: "uppercase",
        }}
      >
        {getStoreName()}
      </span>
    </div>
  );
};

export default Logo;

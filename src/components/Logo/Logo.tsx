import "./logo.css";
import logoTitle from "../../../public/Logo.png";
interface Logoprops {
  collapsedTheme: boolean;
}
const Logo: React.FC<Logoprops> = ({ collapsedTheme }) => {
  const onChangeProfileAdmin = () => {};
  return (
    <div className="logo">
      <div className="logo-icon" onClick={onChangeProfileAdmin}>
        {!collapsedTheme && <img src={logoTitle} alt="logo" />}
      </div>
    </div>
  );
};

export default Logo;

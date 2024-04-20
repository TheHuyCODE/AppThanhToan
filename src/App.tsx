import LoginRegister from "./components/Register/LoginRegister";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import { Layout} from "antd";
import Logo from "./components/Logo/Logo";
const {Sider} = Layout;
import './App.css'
import MenuList from "./components/MenuList/MenuList";
// import managementCatalogProduct from "./components/listitem/managementCatalogProduct";

function App() {
  return (
    <>
      <Layout>
        <Sider className="side-bar">
          <Logo/>
          <MenuList/>
        </Sider>
      </Layout>
    </>// <Header>
    
    // </Header>
  );
}

export default App;

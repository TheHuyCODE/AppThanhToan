import Groups from "../components/Admin/Groups";
import Customers from "../components/Customers/Customers";
import InventoryReport from "../components/Dashboard/InventoryReport";
import RevenueReport from "../components/Dashboard/RevenueReport";
import Home from "../components/Home/Home";
import ManagementInvoices from "../components/Invoices/ManagementInvoices/ManagementInvoices";
import AddProduct from "../components/Products/AddProducts/AddProduct";
import DetailProduct from "../components/Products/DetailProduct/DetailProduct";
import ModifyProduct from "../components/Products/ModifyProduct/ModifyProduct";
import Products from "../components/Products/Products";
import Profile from "../components/Profile/Profile";
import Return from "../components/Returns/Return";
import Store from "../components/Store/Store";
import Payment from "../configs/Payment";
import Owner from "../pages/OwnerManage/Owner";
import StoreAdmin from "../pages/StorePageAdmin/StoreAdmin";

export const routes = [
    {
        path: "/",
        component: Home,
    },
    {
        path: "admin/owmers",
        component: Owner,
    },
    {
        path: "admin/storeAdmin",
        component: StoreAdmin,
    },
    {
        path: "admin/groups",
        component: Groups,
    },
    {
        path: "admin/revenuereport",
        component: RevenueReport,
    },
    {
        path: "admin/customers",
        component: Customers,
    },
    {
        path: "admin/profile",
        component: Profile,
    },
    {
        path: "admin/manage_store",
        component: Store,
    },
    {
        path: "admin/inventoryreport",
        component: InventoryReport,
    },
    {
        path: "admin/invoices",
        component: ManagementInvoices,
    },
    {
        path: "admin/returns",
        component: Return,
    },
    {
        path: "admin/paymentmethod",
        component: Payment,
    },
    {
        path: "admin/products",
        component: Products,
    },
    {
        path: "admin/products/add",
        component: AddProduct,
    },
    {
        path: "admin/products/:idProduct",
        component: DetailProduct,
    },
    {
        path: "admin/products/edit/:idProduct",
        component: ModifyProduct,
    },
    {
        path: "admin/categories",
        component: AddProduct,
    },
    {
        path: "admin/products/add",
        component: AddProduct,
    },
];
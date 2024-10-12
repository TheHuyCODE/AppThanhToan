// import React, { useEffect, useRef, useState, useMemo } from "react";

// import { Modal, Select, Tabs } from "antd";
// import { FaBars } from "react-icons/fa";
// import { CiSearch } from "react-icons/ci";

// import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
// import products from "../../configs/products";
// import category from "../../configs/category";
// import { domain } from "../TableConfig/TableConfig";
// import { FaArrowRightFromBracket, FaEllipsisVertical, FaRegTrashCan } from "react-icons/fa6";
// import { IoMdAdd, IoMdClose } from "react-icons/io";
// import "./SalePage.css";
// import "../styles/valiables.css";
// import useDebounce from "../auth/useDebounce";
// import { useAuth } from "../auth/AuthContext";
// import logoutApi from "../../configs/logoutApi";
// import { Link, useNavigate } from "react-router-dom";
// import sellProduct from "../../configs/sellProduct";
// import { ToastContainer, toast } from "react-toastify";
// import { useReactToPrint } from "react-to-print";
// // import QRcode from "./QRcode";
// import DetailInvoices from "../Invoices/detailInvoices";
// import { MdOutlinePoll } from "react-icons/md";

// interface User {
//   access_token: string;
//   created_date: number;
//   email: string;
//   full_name: string;
// }

// interface Product {
//   capital_price: number;
//   id: string;
//   name: string;
//   description: string;
//   image_url: string;
//   barcode: string;
//   quantity: number;
//   inventory_number: number;
//   full_name: string;
// }

// interface Invoice {
//   id: number;
//   invoice_number: string;
//   customer_id: string;
//   customer_name: string;
//   total_price: number;
//   created_date: number;
//   id_payment: string;
//   //   items: Array<Product>;
// }

// interface Category {
//   id: string;
//   name: string;
//   description: string;
//   image_url: string;
// }

// interface InfoBankingItem {
//   value: number;
//   id: string;
//   account_name: string;
//   account_no: string;
//   bank_id: string;
//   template: string;
//   name: string;
// }
// interface CashPayment {
//   id: string;
// }
// interface Customer {
//   id: string;
//   full_name: string;
// }
// const initialItems = [{ label: "Hóa đơn 1", key: "1" }];

// interface InputPayment {
//   amount_due: number;
//   discount_price: number;
//   amount_paid: number;
//   change: number;
// }

// const SalePage = () => {
//   const domainLink = domain.domainLink;
//   const maxItems = 5;
//   const componentRef = useRef();
//   const [activeKey, setActiveKey] = useState(initialItems[0].key);
//   const [nextInvoiceNumber, setNextInvoiceNumber] = useState(2);
//   const [dataProduct, setDataProduct] = useState<Product[]>([]);
//   // const [dataSearchProduct, setDataSearchProduct] = useState<Product[]>([]);
//   const [infouser, setInfoUser] = useState<User | null>(null);
//   const [dataCategory, setDataCategory] = useState<Category[]>([]);
//   const [bankingData, setBankingData] = useState<InfoBankingItem[]>([]);
//   // const [cashmoney, setCashmoney] = useState<CashPayment[]>([]);

//   const [selectedProducts, setSelectedProducts] = useState<{ items: Product[] }>(() => {
//     const savedProducts = localStorage.getItem("detail_invoice");
//     return savedProducts ? JSON.parse(savedProducts) : { Items: [] };
//   });
//   const [invoiceList, setInvoiceList] = useState<Invoice[]>(() => {
//     const savedInvoices = localStorage.getItem("invoiceList");
//     const parsedInvoices = savedInvoices ? JSON.parse(savedInvoices) : [];
//     const hasInitialInvoice = parsedInvoices.some((invoice) => invoice.key === initialItems[0].key);
//     if (!hasInitialInvoice) {
//       parsedInvoices.push({
//         id: 1, // Example unique ID for invoice
//         invoice_number: "Hóa đơn 1", // Example invoice number
//         customer_id: "", // Example customer_id
//         customer_name: "", // Example customer_name
//         total_price: 0, // Example total_price
//         created_date: Date.now(), // Example created_date
//         items: [], // Initialize items (products) as empty for now
//         id_payment: initialItems[0].key, // Set id_payment to initialItems[0].key
//       });
//     }
//     return parsedInvoices;
//   });
//   const [isdataCustomer, setIsDataCustomer] = useState<Customer[]>([]);
//   const [errorAddCustomer, setErrorAddCustomer] = useState({
//     message: "",
//   });
//   const [linkQR, setLinkQR] = useState<string>("");

//   const [inputQRCode, setInputQRCode] = useState({
//     idBank: "",
//     account_Bank: "",
//     template_Bank: "",
//     amount_Due: 0,
//     account_Name: "",
//     id: "",
//   });
//   const [hiddenPopUpDiscountPrice, setHiddenPopUpDiscountPrice] = useState(false);
//   const [selectedCustomer, setSelectedCustomer] = useState();
//   const [isSidebarVisible, setSidebarVisible] = useState(false);
//   const [showSelect, setShowSelect] = useState(false);
//   const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(0);
//   const [items, setItems] = useState(initialItems);
//   const [isOpenPopups, setIsOpenPopups] = useState(false);
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [detailQrCode, setDetailQrCode] = useState(false);
//   const [valueSearchProduct, setValueSearchProduct] = useState("");
//   const [isVoicesID, setIsVoicesID] = useState("");
//   const [scannedValue, setScannedValue] = useState("");
//   const [hiddenQRCode, setHiddenQRCode] = useState(false);
//   const [isPercentage, setIsPercentage] = useState(false);
//   const [statePayment, setStatePayment] = useState(false);
//   const [isPrintReady, setIsPrintReady] = useState(false);
//   const [inputCustomer, setInputCustomer] = useState({
//     full_name: "",
//     phone: "",
//   });
//   const infoBanking: InfoBankingItem[] =
//     bankingData.items
//       ?.filter((item) => item.type === true)
//       .map((item, index) => ({
//         value: index + 1,
//         id: item.id,
//         account_name: item.account_name,
//         account_no: item.account_no,
//         bank_id: item.bank_id,
//         template: item.template,
//         name: `${item.bank_name} - ${item.account_no} - ${item.account_name}`,
//       })) || [];

//   // get picture QR code
//   const getLinkPictureQRCode = (
//     Bank_ID: string,
//     Account_No: string,
//     Template: string,
//     Amount: number,
//     Account_Name: string
//   ): string => {
//     const encodedAccountName = encodeURIComponent(Account_Name.trim());
//     const linkQr = `https://img.vietqr.io/image/${Bank_ID}-${Account_No}-${Template}.png?amount=${Amount}&addInfo=${encodeURIComponent(
//       "Thanhtoánhóađơn"
//     )}&accountName=${encodedAccountName}`;
//     return linkQr;
//   };

//   // Example usage

//   const handleSelectInfoBank = (value: number) => {
//     const isActiveBank = infoBanking.find((item) => item.value === value);
//     if (isActiveBank) {
//       console.log("Name tương ứng với value:", isActiveBank);
//       console.log("Name tương ứng với id:", isActiveBank.id);
//       // const idBank = isActiveBank.bank_id;
//       // const account_Bank = isActiveBank.account_no;
//       // const template_Bank = isActiveBank.template;
//       // const amount_Due = inputPayment.amount_due;
//       // const account_Name = isActiveBank.account_name;
//       setInputQRCode({
//         ...inputQRCode,
//         id: isActiveBank.id,
//         idBank: isActiveBank.bank_id,
//         account_Bank: isActiveBank.account_no,
//         template_Bank: isActiveBank.template,
//         amount_Due: inputPayment.amount_due,
//         account_Name: isActiveBank.account_name,
//       });
//       console.log("setInputQRCode", inputQRCode);
//       const linkQr = getLinkPictureQRCode(
//         inputQRCode.idBank,
//         inputQRCode.account_Bank,
//         inputQRCode.template_Bank,
//         inputQRCode.amount_Due,
//         inputQRCode.account_Name
//       );

//       console.log("linkQr", linkQr);
//       setLinkQR(linkQr);
//       setHiddenQRCode(true);
//     } else {
//       console.log("Không tìm thấy value:", value);
//       setLinkQR("");
//       fetchDataProduct();
//       setHiddenQRCode(false);
//     }
//   };
//   const debounceValue = useDebounce(scannedValue, 700);
//   const debouncedInputQRCode = useDebounce(inputQRCode, 700);
//   // const newTabIndex = useRef(0);
//   const { accessToken, logout } = useAuth();
//   const navigate = useNavigate();
//   const toggleMenu = () => {
//     setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
//   };
//   const handleOpenModal = () => {
//     setIsOpenPopups(true);
//   };

//   const handleInputClick = () => {
//     setHiddenPopUpDiscountPrice(!hiddenPopUpDiscountPrice);
//   };
//   const handleCloseModal = () => {
//     setIsOpenPopups(false);
//   };
//   const handlePercentageClick = () => {
//     console.log("clickPercentage");
//     const discountInVND = inputPayment.discount_price;
//     const discountInPercent = ((discountInVND / total.price) * 100).toFixed(2);

//     setInputPayment((prev) => ({
//       ...prev,
//       discount_price: parseFloat(discountInPercent),
//     }));
//     setIsPercentage(true);
//   };

//   const handleVNDClick = () => {
//     const discountInPercent = inputPayment.discount_price;
//     const discountInVND = ((discountInPercent / 100) * total.price).toFixed(2);

//     setInputPayment((prev) => ({
//       ...prev,
//       discount_price: parseFloat(discountInVND),
//     }));
//     setIsPercentage(false);
//   };

//   const setHandleInputCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     // Kiểm tra nếu chỉnh sửa ô nhập số điện thoại
//     if (name === "phone") {
//       // Lọc và chỉ lấy các ký tự số
//       const numericValue = value.replace(/[^0-9]/g, "");
//       setInputCustomer({
//         ...inputCustomer,
//         [name]: numericValue,
//       });
//     } else {
//       // Cập nhật trường khác (tên khách hàng chẳng hạn)
//       setInputCustomer({
//         ...inputCustomer,
//         [name]: value,
//       });
//     }
//   };

//   const clickAddItemCategory = async (e: React.ChangeEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     const dataCustomer = {
//       full_name: inputCustomer.full_name,
//       phone: inputCustomer.phone,
//     };
//     setIsOpenPopups(isOpenPopups);
//     try {
//       const res = await sellProduct.putDataCustomer(dataCustomer);
//       if (res.code === 200) {
//         setIsOpenPopups(false);
//         toast.success(`${res.message.text}`);
//         setInputCustomer({
//           full_name: "",
//           phone: "",
//         });
//         setErrorAddCustomer({
//           message: "",
//         });

//         await fetchDataCustomer();
//       } else {
//         toast.error(`${res.data.message.text}`);
//         setErrorAddCustomer({
//           message: res.data.message.text,
//         });
//         setIsOpenPopups(!isOpenPopups);
//       }
//     } catch (error) {
//       // console.log(error.response.data);
//       // console.log(error.response.message.text);
//     } finally {
//       setIsOpenPopups(isOpenPopups);
//     }
//   };
//   const getInfoBanking = async () => {
//     try {
//       const res = await sellProduct.getInfoBank();
//       if (res.code === 200) {
//         setBankingData(res.data);
//         console.log("data", res.data);
//       } else {
//         console.log("message", res.message.text);
//         // toast.error(`${res.message.text}`);
//       }
//     } catch (error) {
//       console.error("Error fetching banking data", error);
//       // toast.error("Error fetching banking data");
//     }
//   };

//   useEffect(() => {
//     localStorage.setItem("invoiceList", JSON.stringify(invoiceList));
//   }, [invoiceList]);
//   useEffect(() => {
//     localStorage.setItem("detail_invoice", JSON.stringify(selectedProducts));
//   }, [selectedProducts]);

//   // const addProduct = (product: Product, invoiceKey: string) => {
//   //   setSelectedProducts(prev => ({
//   //     ...prev,
//   //     [invoiceKey]: [...(prev[invoiceKey] || []), { ...product, invoiceKey }]
//   //   }));
//   // };

//   // const removeProduct = (product: Product, invoiceKey: string) => {
//   //   setSelectedProducts(prev => ({
//   //     ...prev,
//   //     [invoiceKey]: prev[invoiceKey].filter(p => p.id !== product.id)
//   //   }));
//   // };
//   const toggleSidebar = () => {
//     setSidebarVisible(!isSidebarVisible);
//     setHiddenPopUpDiscountPrice(false);
//     const discountInVND = inputPayment.discount_price;
//     const discountInPercent = (discountInVND / total.price) * 100;
//     setInputPayment((prev) => ({
//       ...prev,
//       discount_price: Math.round(discountInPercent),
//     }));
//   };

//   // Add products or reduce the number of products---------------
//   const increment = (id: string) => {
//     setSelectedProducts((prevState) => ({
//       ...prevState,
//       Items: prevState.items.map((product) =>
//         product.id === id ? { ...product, quantity: product.quantity + 1 } : product
//       ),
//     }));
//   };

//   const decrement = (id: string) => {
//     setSelectedProducts((prevState) => ({
//       ...prevState,
//       Items: prevState.items.map((product) =>
//         product.id === id && product.quantity > 1
//           ? { ...product, quantity: product.quantity - 1 }
//           : product
//       ),
//     }));
//   };

//   //-------------------------------------------------------------

//   const addProductToSelected = (product: Product) => {
//     setSelectedProducts((prevState) => {
//       const productExists = prevState.items.some((item) => item.id === product.id);
//       if (productExists) {
//         return {
//           ...prevState,
//           Items: prevState.items.map((item) =>
//             item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//           ),
//         };
//       } else {
//         return {
//           ...prevState,
//           Items: [...prevState.items, { ...product, quantity: 1 }],
//         };
//       }
//     });
//   };

//   // Logout the user in the sales screen----------------------------

//   const clickLogoutUser = () => {
//     const resAccessToken = accessToken;
//     logout();
//     // Chuyển hướng đến trang đăng nhập khi hủy modal
//     // Sử dụng Axios để gửi yêu cầu DELETE với token được truyền trong header
//     if (resAccessToken) {
//       logoutApi.deleteTokenLogout(resAccessToken).then((response) => {
//         if (response.code === 200) {
//           navigate("/login");
//         } else {
//           console.log("error", response);
//         }
//       });
//     }
//   };

//   // const onSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
//   //   const value = e.target.value.trim();
//   //   console.log("value", value);
//   //   setValueSearchProduct(value);
//   // };

//   const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       const value = e.currentTarget.value.trim();
//       await fetchDataSearchProduct(value);
//       setValueSearchProduct("");
//     }
//   };

//   const handleChangeNumberCards = (event: React.ChangeEvent<HTMLInputElement>, id: string) => {
//     const newValue = parseInt(event.target.value);
//     if (!isNaN(newValue) && newValue >= 0) {
//       setSelectedProducts((prevState) => ({
//         ...prevState,
//         Items: prevState.items.map((product) =>
//           product.id === id ? { ...product, quantity: newValue } : product
//         ),
//       }));
//     }
//   };

//   // Event handler to update the selected payment method
//   const handlePaymentMethodChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
//     const newPaymentMethod = parseInt(event.target.value, 10);
//     setSelectedPaymentMethod(newPaymentMethod);
//     if (newPaymentMethod === 0 || newPaymentMethod === 2) {
//       setHiddenQRCode(false);
//     }
//     // else {
//     //   setHiddenQRCode(true); // Ẩn QR code nếu không phải các phương thức thanh toán trên
//     // }
//     setShowSelect(false);
//   };
//   // remove product carts when user clicks on icon
//   const removeProductCarts = (id: string) => {
//     setSelectedProducts((prevState) => ({
//       ...prevState,
//       Items: prevState.items.filter((product) => product.id !== id),
//     }));
//   };
//   const getTotalQuantityAndPrice = () => {
//     const total = selectedProducts.items.reduce(
//       (acc, product) => {
//         acc.quantity += product.quantity;
//         acc.price += product.quantity * product.capital_price;
//         return acc;
//       },
//       { quantity: 0, price: 0 }
//     );
//     return total;
//   };

//   const total = useMemo(getTotalQuantityAndPrice, [selectedProducts]);

//   const [inputPayment, setInputPayment] = useState<InputPayment>({
//     discount_price: 0,
//     amount_due: total?.price || 0,
//     amount_paid: total?.price || 0,
//     change: 0,
//   });
//   const onChangePricePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
//     if (value === "") {
//       setInputPayment((prev) => ({
//         ...prev,
//         discount_price: 0,
//         amount_due: total?.price || 0,
//         amount_paid: total?.price || 0,
//         change: 0,
//       }));
//       return;
//     }
//     const discount_value = parseInt(value, 10);
//     let discount_price;
//     if (isPercentage) {
//       discount_price = (discount_value / 100) * total.price;
//       console.log("discount_price", discount_price);
//     } else {
//       discount_price = discount_value;
//       console.log("discount_price", discount_price);
//     }
//     const amount_due = total.price - discount_price;
//     console.log("amount_due", amount_due);
//     setInputQRCode({
//       ...inputQRCode,
//       amount_Due: amount_due,
//     });
//     setInputPayment((prev) => ({
//       ...prev,
//       discount_price: discount_value,
//       amount_due: isNaN(amount_due) ? 0 : amount_due,
//       amount_paid: isNaN(amount_due) ? 0 : amount_due,
//       change: prev.amount_paid - amount_due,
//     }));
//   };

//   const onChangeAmountPaid = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const value = e.target.value.replace(/[^0-9]/g, "");
//     if (value === "") {
//       setInputPayment((prev) => ({
//         ...prev,
//         amount_paid: 0,
//         change: -prev.amount_due,
//       }));
//       return;
//     }
//     const amount_paid = parseInt(value, 10);
//     setInputPayment((prev) => ({
//       ...prev,
//       amount_paid,
//       change: amount_paid - prev.amount_due,
//     }));
//   };

//   useEffect(() => {
//     // Update the amount due and amount paid when total price changes
//     setInputPayment((prev) => ({
//       ...prev,
//       amount_due: total.price - prev.discount_price,
//       amount_paid: total.price - prev.discount_price,
//       change: 0,
//     }));
//   }, [total.price]);
//   // useEffect(() => {
//   //   console.log(" inputQRCode.amount_Due,", inputQRCode.amount_Due);
//   //   const linkQr = getLinkPictureQRCode(
//   //     inputQRCode.idBank,
//   //     inputQRCode.account_Bank,
//   //     inputQRCode.template_Bank,
//   //     inputQRCode.amount_Due,
//   //     inputQRCode.account_Name
//   //   );
//   //   console.log("linkQr", linkQr);
//   //   setLinkQR(linkQr);
//   // }, [inputPayment.amount_due]);
//   useEffect(() => {
//     if (
//       debouncedInputQRCode.idBank &&
//       debouncedInputQRCode.account_Bank &&
//       debouncedInputQRCode.template_Bank &&
//       debouncedInputQRCode.account_Name
//     ) {
//       const linkQr = getLinkPictureQRCode(
//         debouncedInputQRCode.idBank,
//         debouncedInputQRCode.account_Bank,
//         debouncedInputQRCode.template_Bank,
//         debouncedInputQRCode.amount_Due,
//         debouncedInputQRCode.account_Name
//       );
//       console.log("linkQr", linkQr);
//       setLinkQR(linkQr);
//     }
//   }, [debouncedInputQRCode]);
//   //add payment
//   //get key
//   const onChange = (newActiveKey: string) => {
//     setActiveKey(newActiveKey);
//     console.log("newActiveKey", newActiveKey);
//     localStorage.setItem("name_payment", newActiveKey);
//   };
//   const add = () => {
//     if (items.length < maxItems) {
//       const newActiveKey = `${nextInvoiceNumber}`;
//       const newPanes = [...items];
//       newPanes.push({
//         label: `Hóa đơn ${nextInvoiceNumber}`,
//         key: newActiveKey,
//       });
//       setItems(newPanes);
//       setActiveKey(newActiveKey);
//       // setSelectedProducts([]);
//       const newInvoice: Invoice = {
//         id: nextInvoiceNumber, // Unique ID for the invoice
//         invoice_number: `Invoice ${nextInvoiceNumber}`, // Example of invoice_number
//         customer_id: "", // Example of customer_id
//         customer_name: "", // Example of customer_name
//         total_price: 0, // Example of total_price
//         created_date: Date.now(), // Example of created_date
//         //   items: selectedProducts || [], // Initialize items (products) as empty for now
//         id_payment: newActiveKey, // Store the invoice key as id_payment
//       };
//       setInvoiceList((prev) => [...prev, newInvoice]);
//       // localStorage.setItem("name_payment", newActiveKey);
//       // Find the next available invoice number
//       let newInvoiceNumber = nextInvoiceNumber + 1;
//       while (
//         items.find((item) => item.key === `${newInvoiceNumber}`) &&
//         newInvoiceNumber <= maxItems
//       ) {
//         newInvoiceNumber++;
//       }
//       setNextInvoiceNumber(newInvoiceNumber);
//     } else {
//       toast.warning("Không thể thêm quá 5 hóa đơn");
//     }
//   };
//   const remove = (targetKey: string) => {
//     if (targetKey === initialItems[0].key) {
//       return;
//     }
//     console.log("targetKey", targetKey);
//     let newActiveKey = activeKey;
//     let lastIndex = -1;
//     items.forEach((item, i) => {
//       if (item.key === targetKey) {
//         lastIndex = i - 1;
//       }
//     });
//     const newPanes = items.filter((item) => item.key !== targetKey);
//     if (newPanes.length === 0) {
//       // If all items are removed, reset to the initial state
//       setItems(initialItems);
//       setActiveKey(initialItems[0].key);
//       setNextInvoiceNumber(2); // Reset to the next number in the sequence
//       setSelectedProducts([]); // Clear selected products for all invoices
//       setInvoiceList([]);
//     } else {
//       if (newPanes.length && newActiveKey === targetKey) {
//         if (lastIndex >= 0) {
//           newActiveKey = newPanes[lastIndex].key;
//         } else {
//           newActiveKey = newPanes[0].key;
//         }
//       }
//       setItems(newPanes);
//       setActiveKey(newActiveKey);

//       setInvoiceList((prev) => prev.filter((inv) => inv.id !== parseInt(targetKey)));
//       // Find the next available invoice number
//       const currentNumbers = newPanes.map((item) => parseInt(item.key, 10));
//       let newInvoiceNumber = 1;
//       while (currentNumbers.includes(newInvoiceNumber) && newInvoiceNumber <= maxItems) {
//         newInvoiceNumber++;
//       }
//       setNextInvoiceNumber(newInvoiceNumber);
//     }
//   };

//   const onEdit = (targetKey: string, action: string) => {
//     if (action === "add") {
//       add();
//     } else {
//       remove(targetKey);
//     }
//   };
//   //get customers payment information
//   const getCustomerPayment = (value: number) => {
//     console.log("customerPayment", value);
//     const isActiveCustomer = infoCustomer.find((item) => item.value === value);
//     if (isActiveCustomer) {
//       const customer_Id = isActiveCustomer.id;
//       console.log("info", isActiveCustomer.id);
//       setSelectedCustomer(customer_Id);
//     } else {
//       console.log("Không tìm thấy value", value);
//     }
//     // console.log("selected", selectedCustomer);
//   };
//   // const handleClearSelection = () => {
//   //   setSelectedCustomer(undefined);
//   // };

//   //------------------------------------------------------------
//   const handleProductClick = (product: Product) => {
//     setSelectedProducts((prevState) => {
//       const existingProduct = prevState.items.find(
//         (selectedProduct) => selectedProduct.id === product.id
//       );

//       if (existingProduct) {
//         return {
//           ...prevState,
//           items: prevState.items.map((selectedProduct) =>
//             selectedProduct.id === product.id
//               ? { ...selectedProduct, quantity: selectedProduct.quantity + 1 }
//               : selectedProduct
//           ),
//         };
//       }
//       return {
//         ...prevState,
//         items: [...prevState.items, { ...product, quantity: 1 }],
//       };
//     });
//   };

//   const fetchDataProduct = async () => {
//     try {
//       const res = await products.getSellProduct();
//       if (res.data && Array.isArray(res.data.items)) {
//         setDataProduct(res.data.items);
//       } else {
//         console.error("API response is not an array:", res.data);
//       }
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };
//   // const fetchDetailInvoice = async (isVoicesID: string) => {
//   //   try {
//   //     const res = await products.getDetailInvoices(isVoicesID);
//   //     if (res.data && Array.isArray(res.data.items)) {
//   //       setDataProduct(res.data.items);
//   //     } else {
//   //       console.error("API response is not an array:", res.data);
//   //     }
//   //   } catch (error) {
//   //     console.log("error:", error);
//   //   }
//   // };
//   useEffect(() => {
//     // fetchDetailInvoice(isVoicesID);
//     getInfoBanking();
//     fetchDataProduct();
//   }, []);
//   useEffect(() => {
//     localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
//   }, [selectedProducts]);
//   useEffect(() => {
//     // Lấy dữ liệu người dùng từ localStorage
//     const storedUser = localStorage.getItem("INFO_USER");
//     if (storedUser) {
//       setInfoUser(JSON.parse(storedUser));
//     }
//   }, []);
//   const fetchDataCategory = async () => {
//     const res = await category.getAll();
//     if (res.data && Array.isArray(res.data.items)) {
//       setDataCategory(res.data.items);
//     } else {
//       console.error("API response is not an array:", res.data);
//     }
//   };

//   //fetch data search category
//   const fetchDataSearchProduct = async (barcode: string) => {
//     try {
//       const res = await products.getDataSearchBarcodeProduct(barcode);

//       // Kiểm tra xem res.data.items có tồn tại và là một mảng
//       if (res.data && Array.isArray(res.data.items)) {
//         const foundProduct = res.data.items[0];
//         addProductToSelected({ ...foundProduct, quantity: 1 });
//       } else if (res.data) {
//         // Nếu res.data không phải là mảng, kiểm tra xem nó có phải là đối tượng sản phẩm không
//         const foundProduct = res.data;
//         if (foundProduct && foundProduct.id) {
//           addProductToSelected({ ...foundProduct, quantity: 1 });
//         } else {
//           console.error("API response is not a valid product object:", res.data);
//         }
//       } else {
//         console.error("API response is invalid:", res.data);
//       }
//     } catch (error) {
//       console.error("Error fetching product data:", error);
//     }
//   };

//   const fetchDataCustomer = async () => {
//     try {
//       const res = await sellProduct.getCustomer();
//       if (res.code === 200) {
//         const dataCustomer = res.data;
//         setIsDataCustomer(dataCustomer);
//         localStorage.setItem("info_customer", JSON.stringify(dataCustomer));
//       }
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };
//   const findCashBankIds = () => {
//     const idCashBankString =
//       bankingData.items
//         ?.filter((item) => item.type === false) // Lọc các item có type là false
//         .map((item) => item.id) // Tạo một mảng chỉ chứa id của các item đã lọc
//         .join(", ") || // Kết hợp các id thành một chuỗi, ngăn cách bằng dấu phẩy và khoảng trắng
//       ""; // Nếu không có item nào, trả về chuỗi rỗng
//     return idCashBankString;
//   };

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//     onAfterPrint: () => {
//       setStatePayment(false);
//       setIsPrintReady(false);
//       setSelectedProducts([]); // Reset print readiness
//       setInputPayment({
//         amount_due: 0,
//         amount_paid: 0,
//         change: 0,
//         discount_price: 0,
//       });
//     },
//   });

//   useEffect(() => {
//     if (isPrintReady) {
//       handlePrint();
//     }
//   }, [isPrintReady]);
//   const clickPaymentTheBill = async () => {
//     // eslint-disable-next-line react-hooks/rules-of-hooks
//     const transformedProducts = selectedProducts.map((product) => ({
//       product_id: product.id,
//       quantity: product.quantity,
//       price: product.price,
//       total_price: product.quantity * product.price,
//     }));
//     const idBank = inputQRCode.id;
//     const idCashBank = findCashBankIds();
//     let method_bank = [{ id: "" }];
//     if (selectedPaymentMethod === 0) {
//       method_bank = [{ id: idCashBank }];
//     } else {
//       method_bank = [{ id: idBank }];
//     }
//     console.log("transformed products:", transformedProducts);
//     const dataPayment = {
//       total_amount: inputPayment.amount_due,
//       total_product: total.quantity,
//       customer_money: inputPayment.amount_paid,
//       refund: inputPayment.change,
//       products: transformedProducts,
//       payment_methods: method_bank,
//       discount: inputPayment.discount_price,
//       type_discount: 0,
//       customer_id: selectedCustomer,
//     };
//     try {
//       const res = await sellProduct.postDataPayment(dataPayment);
//       if (res.code === 200) {
//         setStatePayment(true);
//         setIsPrintReady(true);
//         handlePrint();
//         const resIdIvoices = res.data.invoice_id;
//         setIsVoicesID(resIdIvoices);
//         console.log("data payment", res.data);
//         const success = res.message.text;
//         toast.success(`${success}`);
//       } else {
//         const error = res.data.message.text;
//         console.log("error", error);
//         console.log("data payment", res.data);
//         toast.error(`${error}`);
//         setStatePayment(false);
//       }
//     } catch (error) {
//       console.log("error:", error);
//     }
//   };
//   useEffect(() => {
//     if (debounceValue) {
//       fetchDataSearchProduct(debounceValue);
//     }
//     console.log("valueSearchProduct", valueSearchProduct);
//   }, [debounceValue]);
//   const formatDataCategory = dataCategory.map((item, index) => ({
//     value: index + 1,
//     label: item.name,
//     id: item.id,
//   }));

//   const infoCustomer = isdataCustomer.items?.map((item, index) => ({
//     value: index + 1,
//     label: item.full_name,
//     id: item.id,
//   }));
//   const detailQRCode = () => {
//     setDetailQrCode(!detailQrCode);
//     console.log("detailQRCode", detailQRCode);
//   };
//   useEffect(() => {
//     fetchDataCustomer();
//     fetchDataCategory();
//     fetchDataCustomer();
//   }, []);
//   return (
//     <>
//       <ToastContainer closeOnClick autoClose={5000} />
//       <div className="containner-sales">
//         <div className="page-header">
//           <div className="header-left-page-sales">
//             <div className="col-left-control">
//               <CiSearch
//                 style={{
//                   position: "absolute",
//                   top: "13px",
//                   left: "7px",
//                   transform: "translateY(8%)",
//                   fontSize: "20px",
//                 }}
//               />
//               <input
//                 type="text"
//                 placeholder="Quét mã vạch"
//                 className="search-product-sell"
//                 onChange={(e) => setValueSearchProduct(e.target.value)}
//                 value={valueSearchProduct}
//                 onKeyDown={handleEnterPress}
//               />

//               <button className="btn-return-goods">Trả hàng</button>
//             </div>
//             <div className="cart-tabs">
//               <Tabs
//                 type="editable-card"
//                 onChange={onChange}
//                 activeKey={activeKey}
//                 onEdit={onEdit}
//                 items={items}
//               />
//             </div>
//           </div>
//           <div className="header-right-page">
//             <div>
//               {infouser ? <span>{infouser.full_name}</span> : <span>No user data available</span>}
//             </div>
//             <button
//               className="icon-button"
//               onClick={toggleMenu}
//               style={{ color: "white", fontSize: "20px" }}
//             >
//               <FaBars />
//             </button>
//             {isMenuOpen && (
//               <div className="menu-dropdown">
//                 <div>
//                   <MdOutlinePoll style={{ fontSize: "20px" }} />
//                   <Link to="/admin/products" style={{ textDecoration: "none", color: "black" }}>
//                     <span>Trang quản lý</span>
//                   </Link>
//                 </div>
//                 <div onClick={clickLogoutUser}>
//                   <FaArrowRightFromBracket />
//                   <span style={{ marginLeft: "18px" }}>Đăng xuất</span>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//         <div className="page-content">
//           <div className="left-page-content">
//             {selectedProducts.map((product, index) => (
//               <div
//                 key={product.id}
//                 className="selected-product-details"
//                 // onClick={() => clickItemsCarts(product.id)}
//               >
//                 <div className="carts-product-active-left">
//                   <span>{index + 1}</span>
//                 </div>
//                 <div className="carts-product-active-mid">
//                   <div className="carts-product-active-mid-top">
//                     <button
//                       onClick={() => removeProductCarts(product.id)}
//                       className="btn-remove-carts"
//                       title="Xóa hàng hóa"
//                     >
//                       <FaRegTrashCan />
//                     </button>
//                     <span>{product.barcode}</span>
//                     <h4>{product.name}</h4>
//                     <IoMdAdd />
//                   </div>
//                   <div className="carts-product-active-mid-top">
//                     <div
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "space-around",
//                       }}
//                     >
//                       <button className="icon-button" onClick={() => decrement(product.id)}>
//                         <AiOutlineMinus />
//                       </button>
//                       <input
//                         type="text"
//                         value={product.quantity}
//                         onChange={(e) => handleChangeNumberCards(e, product.id)}
//                         className="input-number-cart"
//                         inputMode="numeric"
//                         pattern="[0-9]*"
//                       />
//                       <button className="icon-button" onClick={() => increment(product.id)}>
//                         <AiOutlinePlus />
//                       </button>
//                     </div>
//                     <span>{product.capital_price.toLocaleString("vi-VN")}</span>
//                     <div className="sell-change-price">
//                       {(product.capital_price * product.quantity).toLocaleString("vi-VN")}
//                     </div>
//                   </div>
//                 </div>
//                 <div className="carts-product-active-right">
//                   <FaEllipsisVertical />
//                 </div>
//               </div>
//             ))}
//             <div className="cart-summary">
//               <div className="cart-summary-item">
//                 <span>Tổng số lượng:</span>
//                 <span style={{ fontWeight: "700", marginLeft: "10px" }}>{total.quantity}</span>
//               </div>
//               <div className="cart-summary-item">
//                 <span>Tổng giá tiền: </span>
//                 <span style={{ fontWeight: "700", marginLeft: "10px" }}>
//                   {total.price.toLocaleString("vi-VN")}
//                 </span>
//               </div>
//             </div>
//           </div>
//           <div className="right-page-content">
//             <div className="right-page-content-header">
//               <div
//                 style={{ display: "flex", position: "relative" }}
//                 className="box-input-search-customer"
//               >
//                 <CiSearch
//                   style={{
//                     position: "absolute",
//                     top: "10px",
//                     left: "11px",
//                     transform: "translateY(8%)",
//                     fontSize: "20px",
//                   }}
//                 />
//                 <input type="text" placeholder="Tìm sản phẩm" className="input-search-customer" />
//               </div>
//               <Select
//                 showSearch
//                 placeholder="Lọc theo danh mục sản phẩm danh mục sản phẩm"
//                 optionFilterProp="label"
//                 style={{ width: 260, height: 40 }}
//                 filterOption={(input, option) =>
//                   (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
//                 }
//                 options={formatDataCategory}
//               />
//               {/* <LuFilter />
//             <AiFillPicture /> */}
//             </div>
//             <div className="right-page-content-container">
//               <ul className="list-product">
//                 {dataProduct?.map((product, index) => (
//                   <li
//                     key={index}
//                     className="box-product"
//                     onClick={() => handleProductClick(product)}
//                   >
//                     <div className="product-info-img">
//                       <img
//                         src={`${domainLink}${product.image_url}`}
//                         loading="lazy"
//                         alt={product.name}
//                         className="image-review-product"
//                       />
//                     </div>
//                     <div className="product-info-bottom">
//                       <h4>{product.name}</h4>
//                       <div>
//                         <span>{product.capital_price.toLocaleString("vi-VN")}</span>
//                       </div>
//                     </div>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div className="right-page-content-footer">
//               <button className="btn-pay" onClick={toggleSidebar}>
//                 THANH TOÁN
//               </button>
//             </div>
//             <div
//               className={`overlay ${isSidebarVisible ? "show" : ""}`}
//               onClick={toggleSidebar}
//             ></div>
//             <div
//               className={`sidebar ${isSidebarVisible ? "show" : ""}`}
//               // onClick={() => setHiddenPopUpDiscountPrice(false)}
//             >
//               {/* Nội dung của sidebar */}
//               <div className="header-sidebar-bank">
//                 <span>Thanh toán hóa đơn </span>
//                 <button className="close-sidebar-bank" onClick={toggleSidebar}>
//                   <IoMdClose />
//                 </button>
//               </div>
//               <div className="main-sidebar-bank">
//                 <div className="customer-debt-point-wraper">
//                   <Select
//                     showSearch
//                     placeholder="Chọn khách hàng"
//                     notFoundContent="Không tìm thấy người dùng"
//                     optionFilterProp="label"
//                     onChange={(value) => getCustomerPayment(value)}
//                     // value={selectedCustomer}
//                     style={{ width: 400, height: 40, paddingRight: "0px" }}
//                     filterOption={(input, option) =>
//                       (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
//                     }
//                     options={infoCustomer}
//                   />
//                   {/* {selectedCustomer && (
//                     <button
//                       onClick={handleClearSelection}
//                       style={{ marginLeft: "10px" }}
//                     >
//                       Clear
//                     </button>
//                   )} */}
//                   <button
//                     className="btn-add-customers"
//                     title="Thêm khách hàng"
//                     onClick={handleOpenModal}
//                   >
//                     <IoMdAdd />
//                   </button>
//                 </div>
//                 <div className="payment-invoice">
//                   <div className="payment-invoice__total">
//                     <label className="payment-invoice__label">Tổng tiền hàng</label>
//                     {/* <span className="payment-invoice__value">
//                       {total.quantity}
//                     </span> */}
//                     <div className="payment-invoice__price-total">
//                       <p className="payment-invoice__price-amount">
//                         {total.price.toLocaleString("vi-VN")}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="payment-invoice__discount">
//                     <label className="payment-invoice__label">Giảm giá</label>
//                     <input
//                       type="text"
//                       value={inputPayment.discount_price.toLocaleString("vi-VN")}
//                       onChange={onChangePricePayment}
//                       onClick={handleInputClick}
//                       className="payment-invoice__input"
//                     />
//                   </div>
//                   {hiddenPopUpDiscountPrice && (
//                     <div className="pop-discount">
//                       <p>Giảm giá</p>
//                       <input
//                         type="text"
//                         value={inputPayment.discount_price.toLocaleString("vi-VN")}
//                         onChange={onChangePricePayment}
//                         className="payment-invoice__input"
//                       />
//                       <button
//                         className={`discount-button ${!isPercentage ? "active" : ""}`}
//                         onClick={handleVNDClick}
//                       >
//                         VND
//                       </button>
//                       <button
//                         className={`discount-button ${isPercentage ? "active" : ""}`}
//                         onClick={handlePercentageClick}
//                       >
//                         %
//                       </button>
//                     </div>
//                   )}
//                   <div className="payment-invoice__total-after-discount">
//                     <label className="payment-invoice__label">Khách cần trả</label>
//                     <div className="payment-invoice__price">
//                       <p className="payment-invoice__price-amount">
//                         {inputPayment.amount_due.toLocaleString("vi-VN")}
//                       </p>
//                     </div>
//                   </div>
//                   <div className="payment-invoice__guest-pays">
//                     <label className="payment-invoice__label">Khách thanh toán</label>
//                     <input
//                       type="text"
//                       value={inputPayment.amount_paid.toLocaleString("vi-VN")}
//                       onChange={onChangeAmountPaid}
//                       className="payment-invoice__input"
//                       inputMode="numeric"
//                       pattern="[0-9]*"
//                     />
//                   </div>
//                   <div className="payment-invoice__payment-methods">
//                     <div className="payment-invoice__method">
//                       <input
//                         className="payment-invoice__checkbox"
//                         type="radio"
//                         id="cashmoney"
//                         value={0}
//                         checked={selectedPaymentMethod === 0}
//                         onChange={handlePaymentMethodChange}
//                       />
//                       <label className="payment-invoice__label" htmlFor="cashmoney">
//                         Tiền mặt
//                       </label>
//                     </div>
//                     <div className="payment-invoice__method">
//                       <input
//                         className="payment-invoice__checkbox"
//                         type="radio"
//                         id="internetmoney"
//                         value={1}
//                         checked={selectedPaymentMethod === 1}
//                         onChange={handlePaymentMethodChange}
//                       />
//                       <label className="payment-invoice__label" htmlFor="internetmoney">
//                         Chuyển khoản
//                       </label>
//                     </div>
//                     <div className="payment-invoice__method">
//                       <input
//                         className="payment-invoice__checkbox"
//                         type="radio"
//                         id="cashmoneyandinternetmoney"
//                         value={2}
//                         checked={selectedPaymentMethod === 2}
//                         onChange={handlePaymentMethodChange}
//                       />
//                       <label className="payment-invoice__label" htmlFor="cashmoneyandinternetmoney">
//                         Thanh toán kết hợp
//                       </label>
//                     </div>
//                   </div>

//                   {selectedPaymentMethod === 1 && (
//                     <Select
//                       placeholder="-Tài khoản nhận-"
//                       allowClear
//                       onChange={(value) => {
//                         handleSelectInfoBank(value);
//                       }}
//                       style={{ width: "100%", height: 40 }}
//                     >
//                       {infoBanking.map((option) => (
//                         <option value={option.value} key={option.id}>
//                           {option.name}
//                         </option>
//                       ))}
//                     </Select>
//                   )}
//                   {hiddenQRCode && (
//                     <div
//                       className="img-QR"
//                       style={{
//                         width: "100%",
//                         height: "auto",
//                         display: "flex",
//                         alignItems: "center",
//                         justifyContent: "center",
//                       }}
//                     >
//                       <img
//                         src={linkQR}
//                         alt="QR"
//                         style={{
//                           width: "150px",
//                           height: "180px",
//                           cursor: "pointer",
//                         }}
//                         onClick={detailQRCode}
//                       />
//                     </div>
//                   )}
//                   {/* {detailQrCode && <QRCode value={linkQR} />} */}
//                   <div className="option_price"></div>
//                   <div className="payment-invoice__money-return">
//                     <label className="payment-invoice__label">Tiền thừa trả khách</label>
//                     <div className="payment-invoice__return-amount">
//                       <p className="payment-invoice__price-amount">
//                         {inputPayment.change.toLocaleString("vi-VN")}
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bottom-sidebar-bank">
//                 <button
//                   className="btn-pay"
//                   style={{
//                     width: "90%",
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}
//                   onClick={clickPaymentTheBill}
//                 >
//                   THANH TOÁN
//                 </button>
//                 {/* {statePayment && ( */}
//                 <div
//                   style={{
//                     position: "absolute",
//                     left: "-9999px",
//                     top: "-9999px",
//                   }}
//                 >
//                   <DetailInvoices
//                     ref={componentRef}
//                     idCustomer={selectedCustomer}
//                     selectedProducts={selectedProducts}
//                     amount_due={inputPayment.amount_due.toLocaleString("vi-VN")}
//                     amount_paid={inputPayment.amount_paid.toLocaleString("vi-VN")}
//                     discount_price={inputPayment.discount_price.toLocaleString("vi-VN")}
//                     isVoicesID={isVoicesID}
//                   />
//                 </div>
//                 {/* )} */}
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* modal add customer */}
//         <Modal
//           className="modalDialog-addITems"
//           width={500}
//           // height={500}
//           centered
//           open={isOpenPopups}
//           onOk={clickAddItemCategory}
//           onCancel={handleCloseModal}
//           okText="Thêm"
//           cancelText="Hủy bỏ"
//         >
//           <h1 className="title-addItem">Thêm khách hàng</h1>
//           <div className="name-customer">
//             <label htmlFor="">
//               Tên khách hàng (<span>*</span>)
//             </label>
//             <input
//               placeholder="Nhập tên khách hàng"
//               className="input-name-category"
//               onChange={setHandleInputCustomer}
//               name="full_name"
//               value={inputCustomer.full_name}
//             />
//           </div>
//           <div className="number-customer">
//             <label htmlFor="" className="title-picture">
//               Số điện thoại(<span>*</span>)
//             </label>
//             <div>
//               <input
//                 type="text"
//                 className="input-name-category"
//                 onChange={setHandleInputCustomer}
//                 name="phone"
//                 value={inputCustomer.phone}
//                 inputMode="numeric"
//                 pattern="[0-9]*"
//                 placeholder="Nhập số điện thoại"
//               />
//               <br />
//               {errorAddCustomer && (
//                 <span style={{ color: "red", fontSize: "12px" }}>{errorAddCustomer.message}</span>
//               )}
//             </div>
//           </div>
//         </Modal>
//       </div>
//     </>
//   );
// };

// export default SalePage;

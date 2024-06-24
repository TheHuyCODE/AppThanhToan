import React, { useEffect, useRef, useState, useMemo } from "react";

import { Modal, Select, Tabs } from "antd";
import { FaBars } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";

import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import products from "../../configs/products";
import category from "../../configs/category";
import { domain } from "../TableConfig/TableConfig";
import { FaEllipsisVertical, FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import "./SalePage.css";
import "../styles/valiables.css";
import useDebounce from "../auth/useDebounce";
import { useAuth } from "../auth/AuthContext";
import logoutApi from "../../configs/logoutApi";
import { useNavigate } from "react-router-dom";
import sellProduct from "../../configs/sellProduct";
import { ToastContainer, toast } from "react-toastify";
import { SpaceContext } from "antd/es/space";
interface User {
  access_token: string;
  created_date: number;
  email: string;
  full_name: string;
}

interface Product {
  capital_price: number;
  id: string;
  name: string;
  description: string;
  image_url: string;
  barcode: string;
  quantity: number;
  inventory_number: number;
  full_name: string;
}

interface Category {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

const initialItems = [
  { label: "Hóa đơn 1", key: "1" },
  { label: "Hóa đơn 2", key: "2" },
  { label: "Hóa đơn 3", key: "3" },
];
interface InputPayment {
  amount_due: number;
  discount_price: number;
  amount_paid: number;
  change: number;
}

const SalePage = () => {
  const domainLink = domain.domainLink;
  const [activeKey, setActiveKey] = useState(initialItems[0].key);
  const [dataProduct, setDataProduct] = useState<Product[]>([]);
  // const [dataSearchProduct, setDataSearchProduct] = useState<Product[]>([]);
  const [isSidebarVisible, setSidebarVisible] = useState(false);
  const [infouser, setInfoUser] = useState<User | null>(null);
  const [dataCategory, setDataCategory] = useState<Category[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem("selectedProducts");
    return savedProducts ? JSON.parse(savedProducts) : [];
  });
  const [errorAddCustomer, setErrorAddCustomer] = useState({
    message: "",
  });
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>(0);
  const [items, setItems] = useState(initialItems);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [showResults, setShowResults] = useState(false);
  const [valueSearchProduct, setValueSearchProduct] = useState("");
  const [dataCustomer, setDataCustomer] = useState([]);
  const [scannedValue, setScannedValue] = useState("");
  const [inputCustomer, setInputCustomer] = useState({
    full_name: "",
    phone: "",
  });
  const debounceValue = useDebounce(scannedValue, 700);
  const newTabIndex = useRef(0);
  const { accessToken, logout } = useAuth();
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsMenuOpen((prevIsMenuOpen) => !prevIsMenuOpen);
  };
  const handleOpenModal = () => {
    setIsOpenPopups(true);
  };

  const handleCloseModal = () => {
    setIsOpenPopups(false);
  };
  const setHandleInputCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    // Kiểm tra nếu chỉnh sửa ô nhập số điện thoại
    if (name === "phone") {
      // Lọc và chỉ lấy các ký tự số
      const numericValue = value.replace(/[^0-9]/g, "");
      setInputCustomer({
        ...inputCustomer,
        [name]: numericValue,
      });
    } else {
      // Cập nhật trường khác (tên khách hàng chẳng hạn)
      setInputCustomer({
        ...inputCustomer,
        [name]: value,
      });
    }
  };

  const clickAddItemCategory = async (e) => {
    e.preventDefault();
    const dataCustomer = {
      full_name: inputCustomer.full_name,
      phone: inputCustomer.phone,
    };

    try {
      const res = await sellProduct.putDataCustomer(dataCustomer);

      if (res.code === 200) {
        console.log("messge", res.message.text);
        toast.success(`${res.message.text}`);
        setInputCustomer({
          full_name: "",
          phone: "",
        });
        setIsOpenPopups(false);
      } else {
        setErrorAddCustomer({
          message: res.message.text,
        });
        setIsOpenPopups(true);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API", error.message);
    } finally {
      setIsOpenPopups(isOpenPopups);
    }
  };

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const toggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };
  const increment = (id: string) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.id === id
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );
  };

  const decrement = (id: string) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.map((product) =>
        product.id === id && product.quantity > 1
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  };
  const addProductToSelected = (product: Product) => {
    setSelectedProducts((prevProducts) => {
      const productExists = prevProducts.some((item) => item.id === product.id);
      if (productExists) {
        return prevProducts.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevProducts, { ...product, quantity: 1 }];
      }
    });
  };

  const clickLogoutUser = () => {
    const resAccessToken = accessToken;
    logout();
    // Chuyển hướng đến trang đăng nhập khi hủy modal
    // Sử dụng Axios để gửi yêu cầu DELETE với token được truyền trong header
    if (resAccessToken) {
      logoutApi.deleteTokenLogout(resAccessToken).then((response) => {
        if (response.code === 200) {
          navigate("/login");
        } else {
          console.log("error", response);
        }
      });
    }
  };
  // const onSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value.trim();
  //   console.log("value", value);
  //   setValueSearchProduct(value);
  // };
  const handleEnterPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      console.log("Enter key pressed, value:", value);
      await fetchDataSearchProduct(value);
      setValueSearchProduct("");
    }
  };
  const handleChangeNumberCards = (
    event: React.ChangeEvent<HTMLInputElement>,
    id: string
  ) => {
    const newValue = parseInt(event.target.value);
    if (!isNaN(newValue) && newValue >= 0) {
      setSelectedProducts((prevSelectedProducts) =>
        prevSelectedProducts.map((product) =>
          product.id === id ? { ...product, quantity: newValue } : product
        )
      );
    }
  };

  // Event handler to update the selected payment method
  const handlePaymentMethodChange = (
    event: React.KeyboardEvent<HTMLInputElement>
  ) => {
    setSelectedPaymentMethod(parseInt(event.target.value, 10));
  };
  // remove product carts when user clicks on icon
  const removeProductCarts = (id: string) => {
    setSelectedProducts((prevSelectedProducts) =>
      prevSelectedProducts.filter((product) => product.id !== id)
    );
  };
  const onChange = (newActiveKey: string) => {
    setActiveKey(newActiveKey);
  };
  const getTotalQuantityAndPrice = () => {
    const total = selectedProducts.reduce(
      (acc, product) => {
        acc.quantity += product.quantity;
        acc.price += product.quantity * product.capital_price;
        return acc;
      },
      { quantity: 0, price: 0 }
    );
    return total;
  };
  const total = useMemo(getTotalQuantityAndPrice, [selectedProducts]);
  const [inputPayment, setInputPayment] = useState<InputPayment>({
    discount_price: 0,
    amount_due: total.price,
    amount_paid: total.price,
    change: 0,
  });
  const onChangePricePayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
    if (value === "") {
      setInputPayment((prev) => ({
        ...prev,
        discount_price: 0,
        amount_due: total.price,
        amount_paid: total.price,
        change: 0,
      }));
      return;
    }
    const discount_price = parseInt(value, 10);
    const amount_due = total.price - discount_price;
    setInputPayment((prev) => ({
      ...prev,
      discount_price,
      amount_due,
      amount_paid: amount_due,
      change: prev.amount_paid - amount_due,
    }));
  };
  const onChangeAmountPaid = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "") {
      setInputPayment((prev) => ({
        ...prev,
        amount_paid: 0,
        change: -prev.amount_due,
      }));
      return;
    }
    const amount_paid = parseInt(value, 10);
    setInputPayment((prev) => ({
      ...prev,
      amount_paid,
      change: amount_paid - prev.amount_due,
    }));
  };
  useEffect(() => {
    // Update the amount due and amount paid when total price changes
    setInputPayment((prev) => ({
      ...prev,
      amount_due: total.price - prev.discount_price,
      amount_paid: total.price - prev.discount_price,
      change: 0,
    }));
  }, [total.price]);
  const add = () => {
    const newActiveKey = `newTab${newTabIndex.current++}`;
    const newPanes = [...items];
    newPanes.push({
      label: "Hóa đơn",
      key: newActiveKey,
    });
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const clickItemsCarts = (id: string) => {
    console.log("id", id);
  };

  const remove = (targetKey: string) => {
    let newActiveKey = activeKey;
    let lastIndex = -1;
    items.forEach((item, i) => {
      if (item.key === targetKey) {
        lastIndex = i - 1;
      }
    });
    const newPanes = items.filter((item) => item.key !== targetKey);
    if (newPanes.length && newActiveKey === targetKey) {
      if (lastIndex >= 0) {
        newActiveKey = newPanes[lastIndex].key;
      } else {
        newActiveKey = newPanes[0].key;
      }
    }
    setItems(newPanes);
    setActiveKey(newActiveKey);
  };

  const onEdit = (targetKey: string, action: string) => {
    if (action === "add") {
      add();
    } else {
      remove(targetKey);
    }
  };

  const handleProductClick = (product: Product) => {
    setSelectedProducts((prevSelectedProducts) => {
      const existingProduct = prevSelectedProducts.find(
        (selectedProduct) => selectedProduct.id === product.id
      );

      if (existingProduct) {
        return prevSelectedProducts.map((selectedProduct) =>
          selectedProduct.id === product.id
            ? { ...selectedProduct, quantity: selectedProduct.quantity + 1 }
            : selectedProduct
        );
      }

      return [...prevSelectedProducts, { ...product, quantity: 1 }];
    });
  };

  const fetchDataProduct = async () => {
    try {
      const res = await products.getAll();
      if (res.data && Array.isArray(res.data.items)) {
        setDataProduct(res.data.items);
      } else {
        console.error("API response is not an array:", res.data);
      }
    } catch (error) {
      console.log("error:", error);
    }
  };

  useEffect(() => {
    fetchDataProduct();
  }, []);
  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);
  useEffect(() => {
    // Lấy dữ liệu người dùng từ localStorage
    const storedUser = localStorage.getItem("INFO_USER");
    if (storedUser) {
      setInfoUser(JSON.parse(storedUser));
    }
  }, []);
  const fetchDataCategory = async () => {
    const res = await category.getAll();
    if (res.data && Array.isArray(res.data.items)) {
      setDataCategory(res.data.items);
    } else {
      console.error("API response is not an array:", res.data);
    }
  };
  const fetchDataCustomer = async () => {
    const res = await sellProduct.getCustomer();
    if (res.code === 200) {
      setDataCustomer(res.data);
    }
    // if (res.data && Array.isArray(res.data.items)) {
    //   setDataCategory(res.data.items);
    // } else {
    //   console.error("API response is not an array:", res.data);
    // }
    else {
      console.error("API response is not an array:", res.data);
    }
  };
  //fetch data search category
  const fetchDataSearchProduct = async (barcode: string) => {
    try {
      const res = await products.getDataSearchBarcodeProduct(barcode);

      // Kiểm tra xem res.data.items có tồn tại và là một mảng
      if (res.data && Array.isArray(res.data.items)) {
        const foundProduct = res.data.items[0];
        addProductToSelected({ ...foundProduct, quantity: 1 });
      } else if (res.data) {
        // Nếu res.data không phải là mảng, kiểm tra xem nó có phải là đối tượng sản phẩm không
        const foundProduct = res.data;
        if (foundProduct && foundProduct.id) {
          addProductToSelected({ ...foundProduct, quantity: 1 });
        } else {
          console.error(
            "API response is not a valid product object:",
            res.data
          );
        }
      } else {
        console.error("API response is invalid:", res.data);
      }
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };
  useEffect(() => {
    if (debounceValue) {
      fetchDataSearchProduct(debounceValue);
    }
    console.log("valueSearchProduct", valueSearchProduct);
  }, [debounceValue]);
  const formatDataCategory = dataCategory.map((item, index) => ({
    value: index + 1,
    label: item.name,
    id: item.id,
  }));
  const infoCustomer = dataCustomer.items?.map((item, index) => ({
    value: index + 1,
    label: item.name,
    id: item.id,
  }));

  useEffect(() => {
    fetchDataCategory();
    fetchDataCustomer();
  }, []);
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="containner-sales">
        <div className="page-header">
          <div className="header-left-page-sales">
            <div className="col-left-control">
              <CiSearch
                style={{
                  position: "absolute",
                  top: "13px",
                  left: "7px",
                  transform: "translateY(8%)",
                  fontSize: "20px",
                }}
              />
              <input
                type="text"
                placeholder="Quét mã vạch"
                className="search-product-sell"
                onChange={(e) => setValueSearchProduct(e.target.value)}
                value={valueSearchProduct}
                onKeyDown={handleEnterPress}
              />
              {/* <div className="menu-search-product">
              {dataSearchProduct && dataSearchProduct.length > 0 ? (
                <ul className="list-product-search">
                  {dataSearchProduct?.map((product, index) => (
                    <li
                      key={index}
                      className="box-product-search-product"
                      onClick={() => handleProductClick(product)}
                    >
                      <div className="product-info-img">
                        <img
                          src={`${domainLink}${product.image_url}`}
                          loading="lazy"
                          alt={product.name}
                          className="image-review-product"
                        />
                      </div>
                      <div className="product-info-search-right">
                        <div className="product-info-search-right-top">
                          <h4>{product.name}</h4>
                          <span>
                            {product.capital_price.toLocaleString("vi-VN")}
                          </span>
                        </div>
                        <div className="product-info-search-right-mid">
                          <span>{product.barcode}</span>
                        </div>
                        <div className="product-info-search-right-bottom">
                          <span>Tồn</span>
                          <span>{product.inventory_number}</span>
                        </div>
                        <div>
                          <span></span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "100px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "13px",
                  }}
                >
                  <p>Không tìm thấy kết quả nào phù hợp.</p>
                </div>
              )}
            </div> */}
              <button className="btn-return-goods">Trả hàng</button>
            </div>
            <div className="cart-tabs">
              <Tabs
                type="editable-card"
                onChange={onChange}
                activeKey={activeKey}
                onEdit={onEdit}
                items={items}
              />
            </div>
          </div>
          <div className="header-right-page">
            <div>
              {infouser ? (
                <span>{infouser.full_name}</span>
              ) : (
                <span>No user data available</span>
              )}
            </div>
            <button className="icon-button" onClick={toggleMenu}>
              <FaBars />
            </button>
            {isMenuOpen && (
              <div className="menu-dropdown">
                <div>Trang quản lý</div>
                <div onClick={clickLogoutUser}>Đăng xuất</div>
              </div>
            )}
          </div>
        </div>
        <div className="page-content">
          <div className="left-page-content">
            {selectedProducts.map((product, index) => (
              <div
                key={product.id}
                className="selected-product-details"
                onClick={() => clickItemsCarts(product.id)}
              >
                <div className="carts-product-active-left">
                  <span>{index + 1}</span>
                </div>
                <div className="carts-product-active-mid">
                  <div className="carts-product-active-mid-top">
                    <button
                      onClick={() => removeProductCarts(product.id)}
                      className="btn-remove-carts"
                      title="Xóa hàng hóa"
                    >
                      <FaRegTrashCan />
                    </button>
                    <span>{product.barcode}</span>
                    <h4>{product.name}</h4>
                    <IoMdAdd />
                  </div>
                  <div className="carts-product-active-mid-top">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-around",
                      }}
                    >
                      <button
                        className="icon-button"
                        onClick={() => decrement(product.id)}
                      >
                        <AiOutlineMinus />
                      </button>
                      <input
                        type="text"
                        value={product.quantity}
                        onChange={(e) => handleChangeNumberCards(e, product.id)}
                        className="input-number-cart"
                        inputMode="numeric"
                        pattern="[0-9]*"
                      />
                      <button
                        className="icon-button"
                        onClick={() => increment(product.id)}
                      >
                        <AiOutlinePlus />
                      </button>
                    </div>
                    <span>{product.capital_price.toLocaleString("vi-VN")}</span>
                    <div className="sell-change-price">
                      {(
                        product.capital_price * product.quantity
                      ).toLocaleString("vi-VN")}
                    </div>
                  </div>
                </div>
                <div className="carts-product-active-right">
                  <FaEllipsisVertical />
                </div>
              </div>
            ))}
            <div className="cart-summary">
              <div className="cart-summary-item">
                <span>Tổng số lượng:</span>
                <span style={{ fontWeight: "700", marginLeft: "10px" }}>
                  {total.quantity}
                </span>
              </div>
              <div className="cart-summary-item">
                <span>Tổng giá tiền: </span>
                <span style={{ fontWeight: "700", marginLeft: "10px" }}>
                  {total.price.toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          </div>
          <div className="right-page-content">
            <div className="right-page-content-header">
              <div
                style={{ display: "flex", position: "relative" }}
                className="box-input-search-customer"
              >
                <CiSearch
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "11px",
                    transform: "translateY(8%)",
                    fontSize: "20px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Tìm sản phẩm"
                  className="input-search-customer"
                />
              </div>
              <Select
                showSearch
                placeholder="Lọc theo danh mục sản phẩm danh mục sản phẩm"
                optionFilterProp="label"
                style={{ width: 260, height: 40 }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={formatDataCategory}
              />
              {/* <LuFilter />
            <AiFillPicture /> */}
            </div>
            <div className="right-page-content-container">
              <ul className="list-product">
                {dataProduct?.map((product, index) => (
                  <li
                    key={index}
                    className="box-product"
                    onClick={() => handleProductClick(product)}
                  >
                    <div className="product-info-img">
                      <img
                        src={`${domainLink}${product.image_url}`}
                        loading="lazy"
                        alt={product.name}
                        className="image-review-product"
                      />
                    </div>
                    <div className="product-info-bottom">
                      <h4>{product.name}</h4>
                      <div>
                        <span>
                          {product.capital_price.toLocaleString("vi-VN")}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="right-page-content-footer">
              <button className="btn-pay" onClick={toggleSidebar}>
                THANH TOÁN
              </button>
            </div>

            <div
              className={`overlay ${isSidebarVisible ? "show" : ""}`}
              onClick={toggleSidebar}
            ></div>
            <div className={`sidebar ${isSidebarVisible ? "show" : ""}`}>
              {/* Nội dung của sidebar */}
              <div className="header-sidebar-bank">
                <span>Bán trực tiếp</span>
                <button className="close-sidebar-bank" onClick={toggleSidebar}>
                  <IoMdClose />
                </button>
              </div>
              <div className="main-sidebar-bank">
                <div className="customer-debt-point-wraper">
                  <Select
                    showSearch
                    placeholder="Chọn khách hàng"
                    optionFilterProp="label"
                    style={{ width: 300, height: 40, paddingRight: "0px" }}
                    filterOption={(input, option) =>
                      (option?.label ?? "")
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    options={infoCustomer}
                  />
                  <button
                    className="btn-add-customers"
                    title="Thêm khách hàng"
                    onClick={handleOpenModal}
                  >
                    <IoMdAdd />
                  </button>
                </div>
                <div className="payment-invoice">
                  <div className="payment-invoice__total">
                    <label className="payment-invoice__label">
                      Tổng tiền hàng
                    </label>
                    <span className="payment-invoice__value">
                      {total.quantity}
                    </span>
                    <div className="payment-invoice__price-total">
                      <p className="payment-invoice__price-amount">
                        {total.price.toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <div className="payment-invoice__discount">
                    <label className="payment-invoice__label">Giảm giá</label>
                    <input
                      type="text"
                      value={inputPayment.discount_price.toLocaleString(
                        "vi-VN"
                      )}
                      onChange={onChangePricePayment}
                      className="payment-invoice__input"
                    />
                  </div>
                  <div className="payment-invoice__total-after-discount">
                    <label className="payment-invoice__label">
                      Khách cần trả
                    </label>
                    <div className="payment-invoice__price">
                      <p className="payment-invoice__price-amount">
                        {inputPayment.amount_due.toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                  <div className="payment-invoice__guest-pays">
                    <label className="payment-invoice__label">
                      Khách thanh toán
                    </label>
                    <input
                      type="text"
                      value={inputPayment.amount_paid.toLocaleString("vi-VN")}
                      onChange={onChangeAmountPaid}
                      className="payment-invoice__input"
                      inputMode="numeric"
                      pattern="[0-9]*"
                    />
                  </div>
                  <div className="payment-invoice__payment-methods">
                    <div className="payment-invoice__method">
                      <input
                        className="payment-invoice__checkbox"
                        type="radio"
                        id="cashmoney"
                        value={0}
                        checked={selectedPaymentMethod === 0}
                        onChange={handlePaymentMethodChange}
                      />
                      <label
                        className="payment-invoice__label"
                        htmlFor="cashmoney"
                      >
                        Tiền mặt
                      </label>
                    </div>
                    <div className="payment-invoice__method">
                      <input
                        className="payment-invoice__checkbox"
                        type="radio"
                        id="internetmoney"
                        value={1}
                        checked={selectedPaymentMethod === 1}
                        onChange={handlePaymentMethodChange}
                      />
                      <label
                        className="payment-invoice__label"
                        htmlFor="internetmoney"
                      >
                        Chuyển khoản
                      </label>
                    </div>
                    <div className="payment-invoice__method">
                      <input
                        className="payment-invoice__checkbox"
                        type="radio"
                        id="cashmoneyandinternetmoney"
                        value={2}
                        checked={selectedPaymentMethod === 2}
                        onChange={handlePaymentMethodChange}
                      />
                      <label
                        className="payment-invoice__label"
                        htmlFor="cashmoneyandinternetmoney"
                      >
                        Thanh toán kết hợp
                      </label>
                    </div>
                  </div>

                  <div className="option_price"></div>
                  <div className="payment-invoice__money-return">
                    <label className="payment-invoice__label">
                      Tiền thừa trả khách
                    </label>
                    <div className="payment-invoice__return-amount">
                      <p className="payment-invoice__price-amount">
                        {inputPayment.change.toLocaleString("vi-VN")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bottom-sidebar-bank">
                <button
                  className="btn-pay"
                  style={{
                    width: "90%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  THANH TOÁN
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* modal add customer */}
        <Modal
          className="modalDialog-addITems"
          width={500}
          // height={500}
          centered
          open={isOpenPopups}
          onOk={clickAddItemCategory}
          onCancel={handleCloseModal}
          okText="Thêm"
          cancelText="Hủy bỏ"
        >
          <h1 className="title-addItem">Thêm khách hàng</h1>
          <div className="name-item">
            <label htmlFor="">
              Tên khách hàng (<span>*</span>)
            </label>
            <input
              className="input-name-category"
              onChange={setHandleInputCustomer}
              name="full_name"
              value={inputCustomer.full_name}
              //  ref={nameRef}
            />
          </div>
          <div className="picture-item">
            <label htmlFor="" className="title-picture">
              Số điện thoại(<span>*</span>)
            </label>
            <div>
              <input
                type="text"
                className="input-name-category"
                onChange={setHandleInputCustomer}
                name="phone"
                value={inputCustomer.phone}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Nhập số điện thoại"
              />
              <br />
              {errorAddCustomer && (
                <span style={{ color: "red", fontSize: "12px" }}>
                  {errorAddCustomer.message}
                </span>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default SalePage;

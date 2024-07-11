import React, { useEffect, useRef, useState } from "react";
import { Modal, Select } from "antd";
import { CiSearch } from "react-icons/ci";
import { domain } from "../TableConfig/TableConfig";
import { FaArrowRightFromBracket } from "react-icons/fa6";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import sellProduct from "../../configs/sellProduct";
import { toast, ToastContainer } from "react-toastify";
import DetailInvoices from "../Invoices/detailInvoices";
import { useReactToPrint } from "react-to-print";
import products from "../../configs/products";
import { FiPlusCircle } from "react-icons/fi";
import { BiSolidError } from "react-icons/bi";
const RightPageContent = ({
  dataProduct,
  dataCategory,
  handleProductClick,
  handleInputDiscountPrice,
  toggleSidebar,
  isSidebarVisible,
  hiddenPopUpDiscountPrice,
  isDataCustomer,
  activeKey,
  totalQuantity = 0,
  totalPrice = 0,
  discountPrice,
  finalPrice,
  handleDiscountChange,
  handleVNDClick,
  handlePercentageClick,
  isPercentage,
  amountPaid,
  handleAmountPaidChange,
  calculateChange,
  setHiddenPopUpDiscountPrice,
  selectedPaymentMethod,
  handlePaymentMethodChange,
  bankingData,
  setHiddenQRCode,
  hiddenQRCode,
  typeInvoiListDetail,
  findCashBankIds,
  handleSearchProduct,
  handleSelectCategory,
  fetchDataProductAfter,
  fetchDataProduct,
  getDataCustomer,
}) => {
  const [selectedCustomer, setSelectedCustomer] = useState<string>("");
  const [linkQR, setLinkQR] = useState<string>("");
  const [isVoicesID, setIsVoicesID] = useState("");
  const [statePayment, setStatePayment] = useState(false);
  const [isPrintReady, setIsPrintReady] = useState(false);
  const [hiddenPayment, setHiddenPayment] = useState(false);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [hiddenErr, setHiddenErr] = useState(false);
  const [numberPage, setNumberPage] = useState(1);
  const [errorAddCustomer, setErrorAddCustomer] = useState({
    message: "",
  });
  const componentRef = useRef();
  const [inputQRCode, setInputQRCode] = useState({
    idBank: "",
    account_Bank: "",
    template_Bank: "",
    amount_Due: 0,
    account_Name: "",
    id: "",
  });
  const [inputCustomer, setInputCustomer] = useState({
    full_name: "",
    phone: "",
  });
  const domainLink = domain.domainLink;
  const menuRef = useRef(null);
  const formatDataCategory = dataCategory?.map((item, index) => ({
    value: index + 1,
    label: item.name,
    id: item.id,
  }));

  const infoCustomer = isDataCustomer?.map((item, index) => ({
    value: index + 1,
    label: item.full_name,
    id: item.id,
  }));
  const infoBanking =
    bankingData
      ?.filter((item) => item.type === true)
      .map((item, index) => ({
        value: index + 1,
        id: item.id,
        account_name: item.account_name,
        account_no: item.account_no,
        bank_id: item.bank_id,
        template: item.template,
        name: `${item.bank_name} - ${item.account_no} - ${item.account_name}`,
      })) || [];
  const getCustomerPayment = (value: number) => {
    const isActiveCustomer = infoCustomer.find((item) => item.value === value);
    if (isActiveCustomer) {
      const IDCustomer = isActiveCustomer.id;
      setSelectedCustomer(IDCustomer);
      console.log("isActiveCustomer", selectedCustomer);
      console.log("isActiveCustomer", IDCustomer);
    } else {
      console.log("Không tìm thấy value", value);
    }
  };
  //check when finalPrice < amountPaid, then disable button
  useEffect(() => {
    if (amountPaid < finalPrice) {
      setHiddenPayment(true);
      setHiddenErr(true);
    } else {
      setHiddenPayment(false);
      setHiddenErr(false);
    }
  }, [amountPaid]);
  //get link picture QR Code
  const getLinkPictureQRCode = (
    Bank_ID: string,
    Account_No: string,
    Template: string,
    Amount: number,
    Account_Name: string
  ): string => {
    const encodedAccountName = encodeURIComponent(Account_Name.trim());
    const linkQr = `https://img.vietqr.io/image/${Bank_ID}-${Account_No}-${Template}.png?amount=${Amount}&addInfo=${encodeURIComponent(
      "Thanhtoánhóađơn"
    )}&accountName=${encodedAccountName}`;
    return linkQr;
  };

  const handleSelectInfoBank = (value: number) => {
    const isActiveBank = infoBanking.find((item) => item.value === value);
    if (isActiveBank) {
      console.log("Name tương ứng với value:", isActiveBank);
      console.log("Name tương ứng với id:", isActiveBank.id);
      setInputQRCode({
        ...inputQRCode,
        id: isActiveBank.id,
        idBank: isActiveBank.bank_id,
        account_Bank: isActiveBank.account_no,
        template_Bank: isActiveBank.template,
        amount_Due: finalPrice,
        account_Name: isActiveBank.account_name,
      });
      console.log("setInputQRCode", inputQRCode);
      const linkQr = getLinkPictureQRCode(
        inputQRCode.idBank,
        inputQRCode.account_Bank,
        inputQRCode.template_Bank,
        inputQRCode.amount_Due,
        inputQRCode.account_Name
      );
      console.log("linkQr", linkQr);
      setLinkQR(linkQr);
      setHiddenQRCode(true);
    } else {
      console.log("Không tìm thấy value:", value);
      setLinkQR("");
      // fetchDataProduct();
      setHiddenQRCode(false);
    }
  };
  useEffect(() => {
    console.log("Selected Customer:", selectedCustomer);
  }, [selectedCustomer]);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
    onAfterPrint: () => {
      setStatePayment(false);
      setIsPrintReady(false);
    },
  });

  const calculateAndPrintInvoice = async () => {
    console.log("build payment");
    const Items = typeInvoiListDetail();
    console.log(Items);
    const idCashBank = findCashBankIds();
    const idBank = inputQRCode.id;
    console.log("idCash", idCashBank);
    let method_bank = [{ id: "" }];
    if (selectedPaymentMethod === 0) {
      method_bank = [{ id: idCashBank }];
    } else {
      method_bank = [{ id: idBank }];
    }
    const refund = parseInt(calculateChange());
    const dataPayment = {
      total_amount: totalPrice,
      total_product: totalQuantity,
      customer_money: amountPaid,
      refund: refund,
      products: Items,
      payment_methods: method_bank,
      discount: discountPrice,
      type_discount: 0,
      customer_id: selectedCustomer,
    };
    try {
      const res = await sellProduct.postDataPayment(dataPayment);
      if (res.code === 200) {
        console.log("data payment", res.data);
        const resIdIvoices = res.data.invoice_id;
        const success = res.message.text;
        console.log("success", success);
        // await setIsVoicesID();
        await getDataDetailInvoice(resIdIvoices);
        toast.success(success);
        setStatePayment(true);
        handlePrint();
      }
      // setIsPrintReady(true);
      else {
        const error = res.data.message.text;
        console.log("error", error);
        console.log("data payment", res.data);
        toast.error(error);
        setStatePayment(false);
      }
    } catch (error) {
      console.log("err", error);
    }
  };
  useEffect(() => {
    if (statePayment) {
      console.log("1111");
      setTimeout(() => {
        handlePrint();
      }, 0);
    }
  }, [statePayment]);
  const fetchDataProductChild = async () => {
    const value = 1;
    setNumberPage(value);
    await fetchDataProduct();
  };
  const fetchDataProductAfterChild = async () => {
    const value = 2;
    setNumberPage(value);
    await fetchDataProductAfter(value, 20);
  };
  const getDataDetailInvoice = async (IdInvoice: string) => {
    try {
      const res = await products.getDetailInvoices(IdInvoice);
      if (res.data) {
        console.log("data", res.data);
        localStorage.setItem("dataDetailInvoice", JSON.stringify(res.data));
      } else {
        console.error("API response is not an array:", res.data);
      }
    } catch (err) {
      console.log("err", err);
    }
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
  const clickAddItemCategory = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const dataCustomer = {
      full_name: inputCustomer.full_name,
      phone: inputCustomer.phone,
    };

    try {
      const res = await sellProduct.putDataCustomer(dataCustomer);
      if (res.code === 200) {
        setIsOpenPopups(false);
        const success = res.message.text;
        console.log("success", success);
        toast.success(success);
        setInputCustomer({
          full_name: "",
          phone: "",
        });
        setErrorAddCustomer({
          message: "",
        });
        await getDataCustomer();
      } else {
        const errMs = res.data.message.text;
        toast.error(errMs);
        setErrorAddCustomer({
          message: res.data.message.text,
        });
        setIsOpenPopups(true);
      }
    } catch (error) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    if (inputQRCode.idBank && finalPrice > 0) {
      const linkQr = getLinkPictureQRCode(
        inputQRCode.idBank,
        inputQRCode.account_Bank,
        inputQRCode.template_Bank,
        finalPrice,
        inputQRCode.account_Name
      );
      console.log("linkQr", linkQr);
      setLinkQR(linkQr);
    }
  }, [inputQRCode, finalPrice]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close the menu if click occurs outside of it
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setHiddenPopUpDiscountPrice(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  return (
    <>
      <ToastContainer />
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
              onChange={handleSearchProduct}
            />
          </div>
          <Select
            showSearch
            placeholder="Lọc theo danh mục sản phẩm"
            notFoundContent="Không tìm thấy danh mục sản phẩm"
            optionFilterProp="label"
            style={{ width: 260, height: 40 }}
            onChange={(value) => {
              handleSelectCategory(value);
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={formatDataCategory}
          />
        </div>
        <div className="right-page-content-container">
          <ul className="list-product">
            {dataProduct?.map((product, index) => (
              <li key={index} className="box-product" onClick={() => handleProductClick(product)}>
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
                    <span>{product.capital_price.toLocaleString("vi-VN")}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="right-page-content-footer">
          <div className="nagination-product">
            <button
              title="Trang trước"
              className="btn-before-product"
              onClick={fetchDataProductChild}
            >
              <MdKeyboardArrowLeft className="icon" />
            </button>
            <span>{numberPage}/2</span>
            <button
              title="Trang sau"
              className="btn-after-product"
              onClick={fetchDataProductAfterChild}
            >
              <MdKeyboardArrowRight className="icon" />
            </button>
          </div>
          <button className="btn-pay" onClick={toggleSidebar}>
            THANH TOÁN
          </button>
        </div>
        <div className={`overlay ${isSidebarVisible ? "show" : ""}`} onClick={toggleSidebar}></div>
        <div className={`sidebar ${isSidebarVisible ? "show" : ""}`}>
          <div className="header-sidebar-bank">
            <span>Thanh toán hóa đơn {activeKey}</span>
            <button className="close-sidebar-bank" onClick={toggleSidebar}>
              <IoMdClose />
            </button>
          </div>
          <div className="main-sidebar-bank">
            <div className="customer-debt-point-wraper">
              <Select
                showSearch
                placeholder="Chọn khách hàng"
                notFoundContent="Không tìm thấy người dùng"
                optionFilterProp="label"
                onChange={(value) => getCustomerPayment(value)}
                style={{ width: 400, height: 40, paddingRight: "0px" }}
                filterOption={(input, option) =>
                  (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
                }
                options={infoCustomer}
              />
              <button
                className="btn-add-customers"
                title="Thêm khách hàng"
                onClick={handleOpenModal}
              >
                <FiPlusCircle />
              </button>
            </div>
            <div className="payment-invoice">
              <div className="payment-invoice__total">
                <label className="payment-invoice__label">Tổng tiền hàng</label>
                <div className="payment-invoice__price-total">
                  <p className="payment-invoice__price-amount">
                    {totalPrice?.toLocaleString("vi-VN") || "0"}
                  </p>
                </div>
              </div>
              <div className="payment-invoice__discount">
                <label className="payment-invoice__label">Giảm giá</label>
                <input
                  type="text"
                  className="payment-invoice__input"
                  value={discountPrice.toLocaleString("vi-VN")}
                  onChange={handleDiscountChange}
                  onClick={handleInputDiscountPrice}
                />
              </div>
              {hiddenPopUpDiscountPrice && (
                <div ref={menuRef} className="pop-discount">
                  <p>Giảm giá</p>
                  <input
                    type="text"
                    className="payment-invoice__input"
                    value={discountPrice.toLocaleString("vi-VN")}
                    onChange={handleDiscountChange}
                  />
                  <button
                    className={`discount-button ${!isPercentage ? "active" : ""}`}
                    onClick={handleVNDClick}
                  >
                    VND
                  </button>
                  <button
                    className={`discount-button ${isPercentage ? "active" : ""}`}
                    onClick={handlePercentageClick}
                  >
                    %
                  </button>
                </div>
              )}
              <div className="payment-invoice__total-after-discount">
                <label className="payment-invoice__label" style={{ fontWeight: "600" }}>
                  Khách cần trả
                </label>
                <div className="payment-invoice__price">
                  <p className="payment-invoice__price-amount">
                    {finalPrice?.toLocaleString("vi-VN") || "0"}
                  </p>
                </div>
              </div>
              <div className="payment-invoice__guest-pays">
                <label className="payment-invoice__label" style={{ fontWeight: "600" }}>
                  Khách thanh toán
                </label>
                <input
                  type="text"
                  value={amountPaid.toLocaleString("vi-VN")}
                  onChange={handleAmountPaidChange}
                  className="payment-invoice__input"
                  inputMode="numeric"
                  pattern="[0-9]*"
                />
              </div>
              {hiddenErr && (
                <div className="err_payment">
                  <BiSolidError className="icon-err" />
                  <span>Tiền thanh toán nhỏ hơn tiền cần trả</span>
                </div>
              )}
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
                  <label className="payment-invoice__label" htmlFor="cashmoney">
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
                  <label className="payment-invoice__label" htmlFor="internetmoney">
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
                  <label className="payment-invoice__label" htmlFor="cashmoneyandinternetmoney">
                    Thanh toán kết hợp
                  </label>
                </div>
              </div>

              {selectedPaymentMethod === 1 && (
                <Select
                  placeholder="-Tài khoản nhận-"
                  allowClear
                  onChange={(value) => {
                    handleSelectInfoBank(value);
                  }}
                  style={{ width: "100%", height: 40 }}
                >
                  {infoBanking.map((option) => (
                    <option value={option.value} key={option.id}>
                      {option.name}
                    </option>
                  ))}
                </Select>
              )}
              {hiddenQRCode && (
                <div
                  className="img-QR"
                  style={{
                    width: "100%",
                    height: "auto",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <img
                    src={linkQR}
                    alt="QR"
                    style={{
                      width: "250px",
                      height: "300px",
                      cursor: "pointer",
                    }}
                    // onClick={detailQRCode}
                  />
                </div>
              )}
              <div className="payment-invoice__money-return">
                <label className="payment-invoice__label">Tiền thừa trả khách</label>
                <div className="payment-invoice__return-amount">
                  <p className="payment-invoice__price-amount">{calculateChange()}</p>
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
              onClick={calculateAndPrintInvoice}
              disabled={hiddenPayment}
            >
              THANH TOÁN
            </button>
            {statePayment && (
              <div
                style={{
                  position: "absolute",
                  left: "-9999px",
                  top: "-9999px",
                }}
              >
                <DetailInvoices ref={componentRef} linkQR={linkQR} finalPrice={finalPrice} />
              </div>
            )}
          </div>
        </div>
        {/* Modal add customer */}
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
          <div className="name-customer">
            <label htmlFor="">
              Tên khách hàng (<span>*</span>)
            </label>
            <input
              placeholder="Nhập tên khách hàng"
              className="input-name-category"
              onChange={setHandleInputCustomer}
              name="full_name"
              value={inputCustomer.full_name}
            />
          </div>
          <div className="number-customer">
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
                <span style={{ color: "red", fontSize: "12px" }}>{errorAddCustomer.message}</span>
              )}
            </div>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default RightPageContent;

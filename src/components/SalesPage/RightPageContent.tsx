import { Modal, Select, TreeSelect } from "antd";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidError } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";

import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useReactToPrint } from "react-to-print";
import { toast, ToastContainer } from "react-toastify";

import products from "../../configs/products";
import sellProduct from "../../configs/sellProduct";
import { handleError } from "../../utils/errorHandler";
import customer from "../../configs/customer";
import { useAuth } from "../auth/AuthContext";
import DetailInvoices from "../Invoices/detailInvoices";
import { domain } from "../TableConfig/TableConfig";
import { FiPlusCircle } from "react-icons/fi";
interface RightPageContentProps {
  dataProduct: any;
  dataCategory: any;
  totalItems: any;
  isPercentage: boolean;
  amountPaid: any;
  handleProductClick: (product: any) => void;
  removeNotConFirm: (id: string) => void;
  handleVNDClick: () => void;
  handlePercentageClick: () => void;
  fetchDataProduct: () => void;
  setDataProduct: () => void;
}

interface TreeDataNode {
  id: string;
  pId: string | null;
  value: string;
  title: string;
  children?: TreeDataNode[];
  isLeaf?: boolean;
}
const RightPageContent: React.FC<RightPageContentProps> = ({
  dataProduct, //@ts-ignore
  dataCategory,
  handleProductClick,
  setDataProduct,
  handleInputDiscountPrice,
  toggleSidebar,
  setSidebarVisible,
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
  // handleSelectCategory,
  fetchDataProductAfter,
  fetchDataProduct,
  getDataCustomer,
  removeNotConFirm,
  totalItems,
}: any) => {
  const IDCustomerRetail = "af817c62-5885-4b7e-8de7-cf2d200bc19d";
  const [selectedCustomer, setSelectedCustomer] = useState<string>(IDCustomerRetail);
  //@ts-ignore
  const [idActiveInvoice, setIdActiveInvoice] = useState(localStorage.getItem("idActiveInvoice"));
  const { fetchDataCategory, isCategoryProduct } = useAuth();
  const [disabledPayment, setDisabledPayment] = useState(false);
  const [linkQR, setLinkQR] = useState<string>("");
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [statePayment, setStatePayment] = useState(false);

  //@ts-ignore
  const [isPrintReady, setIsPrintReady] = useState(false);
  const [hiddenPayment, setHiddenPayment] = useState(false);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [hiddenErr, setHiddenErr] = useState(false);
  const [numberPage, setNumberPage] = useState(1);
  // const [selectedKeys, setSelectedKeys] = useState<string | undefined>(undefined);
  const [idSearchCategory, setIdSearchCategory] = useState({
    id_category: "",
  });
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
  // const formatDataCategory = dataCategory?.map((item: any, index: number) => ({
  //   value: index + 1,
  //   label: item.name,
  //   id: item.id,
  // }));

  const infoCustomer = isDataCustomer?.map((item: any, index: number) => ({
    value: index + 1,
    label: item.full_name,
    id: item.id,
  }));
  const transformToSimpleMode = (
    data: TreeDataNode[],
    parentId: string | null = null
  ): TreeDataNode[] => {
    let result: TreeDataNode[] = [];
    data.forEach((item) => {
      result.push({
        id: item.id,
        pId: parentId,
        value: item.id,
        title: item.title,
        isLeaf: item.isLeaf,
      });
      if (item.children && item.children.length > 0) {
        result = result.concat(transformToSimpleMode(item.children, item.id));
      }
    });
    return result;
  };
  //@ts-ignore
  const treeData = isCategoryProduct.map((item: any) => ({
    id: item.id,
    pId: null,
    value: item.id,
    title: item.name,
    isLeaf: !(item.children && item.children.length > 0),
    children: item.children?.map((child: any) => ({
      id: child.id,
      pId: item.id,
      value: child.id,
      title: child.name,
      isLeaf: !(child.children && child.children.length > 0),
      children: child.children?.map((subchild: any) => ({
        id: subchild.id,
        pId: child.id,
        value: subchild.id,
        title: subchild.name,
        isLeaf: true,
      })),
    })),
  }));
  const fetchSearchDataCategory = async () => {
    try {
      const res = await products.getDataSearchProductIsActive(idSearchCategory.id_category);
      setDataProduct(res.data.items);
    } catch (err) {
      console.log("err", err);
    }
  };
  useEffect(() => {
    if (idSearchCategory.id_category) {
      fetchSearchDataCategory();
    }
  }, [idSearchCategory.id_category]);
  const simpleTreeData = transformToSimpleMode(treeData);
  const findPath = (id: string, data: TreeDataNode[]): string => {
    const item = data.find((d) => d.value === id);
    if (!item) return "";
    const parentPath = item.pId ? findPath(item.pId, data) : "";
    return parentPath ? `${parentPath} -> ${item.title}` : item.title;
  };
  const onSelect = (value: string) => {
    // setSelectedKeys(value);
    const path = findPath(value, simpleTreeData);
    setSelectedPath(path);
    console.log("Selected ID:", value, "Path:", path);
    setIdSearchCategory({
      ...idSearchCategory,
      id_category: value,
    });
    if (value === undefined || path === "") {
      fetchDataProduct();
    }
  };
  const filterTreeNode = (inputValue: string, treeNode: any) => {
    if (!treeNode.children) {
      return treeNode.title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    }
    return false;
  };
  const onLoadData = (node: any) => {
    return new Promise<void>((resolve) => {
      if (node.children && node.children.length > 0) {
        resolve();
        return;
      }
      const newData = simpleTreeData.filter((item) => item.pId === node.value);
      node.children = newData;
      resolve();
    });
  };
  const defaultCustomer = infoCustomer.find((customer: any) => customer.label === "Khách lẻ");
  useEffect(() => {
    console.log("defaultCustomer", defaultCustomer);
  }, [defaultCustomer]);
  const infoBanking =
    bankingData
      ?.filter((item: any) => item.type === true)
      .map((item: any, index: number) => ({
        value: index + 1,
        id: item.id,
        account_name: item.account_name,
        account_no: item.account_no,
        bank_id: item.bank_id,
        template: item.template,
        name: `${item.bank_name} - ${item.account_no} - ${item.account_name}`,
      })) || [];
  const getCustomerPayment = (value: number) => {
    const isActiveCustomer = infoCustomer.find((item: any) => item.value === value);
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
  useEffect(() => {
    if (totalPrice === 0) {
      setDisabledPayment(true);
    } else {
      setDisabledPayment(false);
    }
  }, [totalPrice]);
  useEffect(() => {
    const storedIdActiveInvoice = localStorage.getItem("idActiveInvoice");
    console.log("storedIdActiveInvoice", storedIdActiveInvoice);
  }, [idActiveInvoice]);
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
    const isActiveBank = infoBanking.find((item: any) => item.value === value);
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
      setSidebarVisible(false);
      removeNotConFirm(activeKey);
      setStatePayment(false);
      setIsPrintReady(false);
    },
  });

  const calculateAndPrintInvoice = async () => {
    const Items = typeInvoiListDetail();
    const idCashBank = findCashBankIds();
    const idBank = inputQRCode.id;
    let method_bank = [{ id: "" }];
    if (selectedPaymentMethod === 0) {
      method_bank = [{ id: idCashBank }];
    } else {
      method_bank = [{ id: idBank }];
    } //@ts-ignore
    const refund = parseInt(calculateChange());
    const dataPayment = {
      total_amount: totalPrice,
      total_product: totalQuantity,
      customer_money: amountPaid,
      total_after_discount: finalPrice,
      refund: amountPaid - finalPrice,
      products: Items,
      payment_methods: method_bank,
      discount: discountPrice,
      type_discount: 0,
      customer_id: selectedCustomer,
    };
    try {
      const res = await sellProduct.postDataPayment(dataPayment);
      const resIdIvoices = res.data.invoice_id;
      //@ts-ignore
      const success = res.message.text;
      await getDataDetailInvoice(resIdIvoices);
      toast.success(success);
      setStatePayment(true);
      setSidebarVisible(false);
      handlePrint();
      fetchDataProduct();
    } catch (error) {
      handleError(error);
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
      const res = await customer.addDataCustomer(dataCustomer);
      setIsOpenPopups(false);
      //@ts-ignore
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
    } catch (error) {
      handleError(error);
      // console.log("err", err);
    }
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);
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
      //@ts-ignore
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setHiddenPopUpDiscountPrice(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  //@ts-ignore
  const labelRender = (props) => {
    const { label, value } = props;
    if (label) {
      return value;
    }
    return <span>Khách lẻ</span>;
  };
  return (
    <>
      <div className="right-page-content">
        <ToastContainer closeOnClick autoClose={5000} />
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
          {/* <Select
            showSearch
            placeholder="Lọc theo danh mục sản phẩm"
            notFoundContent="Không tìm thấy danh mục sản phẩm"
            optionFilterProp="label"
            allowClear
            style={{ width: 260, height: 40 }}
            onChange={(value) => {
              handleSelectCategory(value);d
            }}
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={formatDataCategory}
          /> */}

          <TreeSelect
            showSearch
            placeholder="Danh mục sản phẩm"
            style={{ width: "260px", height: "35px" }}
            value={selectedPath || undefined}
            notFoundContent="Không có danh mục sản phẩm"
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            allowClear
            multiple={false}
            treeDefaultExpandAll={false}
            onChange={onSelect}
            treeDataSimpleMode
            treeData={simpleTreeData}
            treeNodeLabelProp="title"
            filterTreeNode={filterTreeNode}
            loadData={onLoadData}
          />
        </div>
        <div className="right-page-content-container">
          <ul className="list-product">
            {dataProduct?.map((product: any, index: any) => (
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
                    <span>{product.price.toLocaleString("vi-VN")}</span>
                  </div>
                </div>
                <div className="product-inventory">
                  <span style={{ marginTop: "1.5rem" }}>SL:{product.inventory_number || 0}</span>
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
            <span>
              {numberPage}/{numberPage}
            </span>
            <button
              title="Trang sau"
              className="btn-after-product"
              onClick={fetchDataProductAfterChild}
              disabled={totalItems <= 14}
            >
              <MdKeyboardArrowRight className="icon" />
            </button>
          </div>
          <button className="btn-pay" onClick={toggleSidebar} disabled={disabledPayment}>
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
                // labelRender={labelRender}
                notFoundContent="Không tìm thấy người dùng"
                optionFilterProp="label"
                defaultValue="Khách lẻ"
                //@ts-ignore
                onChange={(value) => getCustomerPayment(value)}
                style={{ width: 400, height: 40, paddingRight: "0px" }}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    //@ts-ignore
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
                {/* <div className="payment-invoice__method">
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
                </div> */}
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
                  {infoBanking.map((option: any) => (
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
                <DetailInvoices
                  //@ts-ignore
                  ref={componentRef}
                  linkQR={linkQR}
                  finalPrice={finalPrice}
                />
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
          //@ts-ignore
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

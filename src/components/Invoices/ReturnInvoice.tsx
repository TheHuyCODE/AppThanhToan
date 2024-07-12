import React, { useEffect, useRef, useState } from "react";
import "./detailInvoices.css";
import "../SalesPage/SalePage.css";
// import "../styles/variables.css";
import { FaUser } from "react-icons/fa";
import ReturnProduct from "../../configs/return";
import { toast, ToastContainer } from "react-toastify";

const ReturnInvoice = ({ dataReturnPayment }) => {
  const [invoiceCode, setInvoiceCode] = useState("");
  const [dataProduct, setDataProduct] = useState([]);
  const [originalPrice, setOriginalPrice] = useState(0);
  const [returnPrice, setReturnPrice] = useState(0);
  const [needReturnPrice, setNeedReturnPrice] = useState(0);
  const [returnFee, setReturnFee] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [inforUser, setInfoUser] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [isPercentage, setIsPercentage] = useState(false);
  const menuRef = useRef(null);
  const [hiddenPopUpDiscountPrice, setHiddenPopUpDiscountPrice] = useState(false);

  const converDataProduct = (data) => {
    const dataConvert = data.map((value, index) => ({
      product_id: value.product_id,
      quantity: value.quantity,
      price: value.price,
      total_price: value.total_price,
    }));
    return dataConvert;
  };
  useEffect(() => {
    if (dataReturnPayment.length > 0) {
      const userFullName = dataReturnPayment[0]?.user?.full_name || "";
      const invoiceId = dataReturnPayment[0]?.id_invoice || "";
      const dataProduct = dataReturnPayment[0]?.items || [];
      const data = converDataProduct(dataProduct);
      setInvoiceId(invoiceId);
      setInfoUser(userFullName);
      setDataProduct(data);
    }
    console.log("dataReturnPayment", dataReturnPayment);
  }, [dataReturnPayment]);

  const handleRefundAmountChange = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "") {
      value = "0";
    }
    let parsedValue = parseFloat(value);
    // Ensure refundAmount does not exceed needReturnPrice
    if (parsedValue > needReturnPrice) {
      parsedValue = needReturnPrice;
    }
    setRefundAmount(parsedValue);
  };

  const handleClickDiscountReturn = () => {
    setHiddenPopUpDiscountPrice(!hiddenPopUpDiscountPrice);
  };

  const handleDiscountChangeReturnFee = (e) => {
    let value = e.target.value.replace(/[^0-9]/g, "");
    if (value === "") {
      value = "0";
    }
    let parsedValue = parseFloat(value);
    if (!isPercentage && parsedValue > returnPrice) {
      parsedValue = returnPrice;
    } else if (isPercentage && parsedValue > 100) {
      parsedValue = 100;
    }
    setReturnFee(parsedValue);
  };

  const handleVNDClick = () => {
    if (isPercentage) {
      // Convert percentage discount to VND
      const discountInVND = ((returnPrice * returnFee) / 100).toFixed(2);
      setReturnFee(parseFloat(discountInVND));
      setIsPercentage(false);
    }
  };
  const handlePercentageClick = () => {
    if (!isPercentage) {
      // Convert VND discount to percentage
      const discountInPercentage = ((returnFee / returnPrice) * 100).toFixed(2);
      setReturnFee(parseFloat(discountInPercentage));
      setIsPercentage(true);
    }
  };
  const handleClickReturn = async () => {
    const dataReturn = {
      invoice_id: invoiceId,
      total_amount: returnPrice,
      reason: "hết hạn",
      return_fee: returnFee,
      type_fee: 0,
      total_product: 1,
      products: dataProduct,
    };
    try {
      const res = await ReturnProduct.postDataPayment(dataReturn);
      if (res.code === 200) {
        const texSS = res.massage.text;
        toast.success(texSS);
      } else {
        const textErr = res.data.massage.text;
        toast.success(textErr);
      }
    } catch (err) {
      console.log("err");
    }
  };
  // Load data from localStorage and calculate prices on initial render
  useEffect(() => {
    if (dataReturnPayment.length > 0) {
      const totalPrice = dataReturnPayment[0]?.items.reduce(
        (sum, item) => sum + item.total_price,
        0
      );
      setReturnPrice(totalPrice);
      const calculatedNeedReturnPrice =
        totalPrice - (isPercentage ? (totalPrice * returnFee) / 100 : returnFee);
      setNeedReturnPrice(calculatedNeedReturnPrice > 0 ? calculatedNeedReturnPrice : 0);
      setRefundAmount(calculatedNeedReturnPrice > 0 ? calculatedNeedReturnPrice : 0);
    }
  }, [dataReturnPayment, returnFee, isPercentage]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
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
      <ToastContainer autoClose={5000} />
      <div className="return-invoice">
        <div className="return-header">
          <div className="return-date">
            <span>05/07/2024</span>
          </div>
          <div className="return-customer">
            <div className="icon">
              <FaUser />
            </div>
            <input type="text" placeholder="Mã hóa đơn" value={inforUser} disabled={true} />
          </div>
          <div className="title-return">
            <span>
              Trả hàng / <a href="">{invoiceId}</a>
            </span>
          </div>
        </div>
        <div className="return-container">
          <div className="return-item">
            <label>Tổng giá gốc hàng mua</label>
            <div className="payment-return_price-total">
              <p>{returnPrice?.toLocaleString("vi-VN")}</p>
            </div>
          </div>
          <div className="return-item">
            <label>Tổng tiền hàng trả</label>
            <div className="payment-return_price-total">
              <p>{returnPrice?.toLocaleString("vi-VN")}</p>
            </div>
          </div>
          <div className="return-item">
            <label>Phí trả hàng:</label>
            <input
              className="return-fee-input"
              type="text"
              value={returnFee.toLocaleString("vi-VN")}
              onChange={handleDiscountChangeReturnFee}
              onClick={handleClickDiscountReturn}
            />
          </div>
          {hiddenPopUpDiscountPrice && (
            <div ref={menuRef} className="pop-discount-return">
              <p>Phí trả hàng</p>
              <input
                type="text"
                className="payment-invoice__input"
                value={returnFee.toLocaleString("vi-VN")}
                onChange={handleDiscountChangeReturnFee}
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
          <div className="return-item">
            <label style={{ fontWeight: "600" }}>Cần trả khách:</label>
            <div className="payment-return_price-total" style={{ fontWeight: 600, color: "blue" }}>
              <p>{needReturnPrice?.toLocaleString("vi-VN")}</p>
            </div>
          </div>
          <div className="return-item">
            <label style={{ fontWeight: "600" }}>Tiền trả khách:</label>
            <input
              className="refund-amount-input"
              type="text"
              value={refundAmount?.toLocaleString("vi-VN")}
              onChange={handleRefundAmountChange}
            />
          </div>
        </div>
        <div className="return-footer">
          <button
            className="btn-pay"
            style={{
              width: "90%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={handleClickReturn}
          >
            TRẢ HÀNG
          </button>
        </div>
      </div>
    </>
  );
};

export default ReturnInvoice;

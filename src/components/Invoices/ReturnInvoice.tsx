import React, { useEffect, useRef, useState } from "react";
import "./detailInvoices.css";
import "../SalesPage/SalePage.css";
import "../styles/valiables.css";
import { FaUser } from "react-icons/fa";
import ReturnProduct from "../../configs/return";
import { toast, ToastContainer } from "react-toastify";

const ReturnInvoice = ({ dataReturnPayment, productTotals }) => {
  const [invoiceCode, setInvoiceCode] = useState("");
  const [dataProduct, setDataProduct] = useState([]);

  const [originalPrice, setOriginalPrice] = useState(0);
  const [returnPrice, setReturnPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [returnFee, setReturnFee] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [inforUser, setInfoUser] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [isPercentage, setIsPercentage] = useState(false);
  const menuRef = useRef(null);
  const [hiddenPopUpDiscountPrice, setHiddenPopUpDiscountPrice] = useState(false);
  const converDataProduct = (data: []) => {
    const dataConvert = data.map((value, index) => ({
      product_id: value.product_id,
      quantity: value.quantity, // Corrected spelling from `quatity` to `quantity`
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
  }, [dataReturnPayment]);

  const handleRefundAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value; // Get the input value
    const numericValue = parseInt(value.replace(/\D/g, ""), 10); // Parse the numeric value

    // Check if the parsed numeric value is valid
    if (!isNaN(numericValue)) {
      // Check if the numeric value is greater than the return price
      if (numericValue > returnPrice) {
        setRefundAmount(returnPrice); // Set refund amount to return price if input exceeds it
      } else {
        setRefundAmount(numericValue); // Set refund amount to the parsed numeric value
      }
    } else if (value === "") {
      setRefundAmount(0); // Set refund amount to 0 if input is empty
    }
  };
  const handleClickDiscountReturn = () => {
    setHiddenPopUpDiscountPrice(!hiddenPopUpDiscountPrice);
  };
  const handleVNDClick = () => {
    if (isPercentage) {
      // Convert percentage discount to VND
      // const discountInVND = ((totalPrice * discountPrice) / 100).toFixed(2);
      // setDiscountPrice(parseFloat(discountInVND));
      setIsPercentage(false);
    }
    setIsPercentage(false);
  };
  const handlePercentageClick = () => {
    if (!isPercentage) {
      // Convert VND discount to percentage
      // const discountInPercentage = ((discountPrice / totalPrice) * 100).toFixed(2);
      // setDiscountPrice(parseFloat(discountInPercentage));
      setIsPercentage(true);
    }
    setIsPercentage(true);
  };
  const handleClickReturn = async () => {
    const dataReturn = {
      invoice_id: invoiceId,
      total_amount: returnPrice,
      reason: "hết hạn",
      return_fee: 0,
      type_fee: 0,
      total_product: 1,
      products: dataProduct,
    };
    try {
      const res = await ReturnProduct.postDataPayment(dataReturn);
      if (res.code === 200) {
        const texSS = res.data.massage;
        toast.success(texSS);
      } else {
        const textErr = res.data.massage;
        console.log("err");
        toast.success(textErr);
      }
    } catch (err) {
      console.log("err");
    }
  };
  // Tính toán tổng tiền trả hàng
  useEffect(() => {
    let totalPrice = 0;
    Object.values(productTotals).forEach((total) => {
      totalPrice += total;
    });
    setReturnPrice(totalPrice);
  }, [productTotals]);
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
              value={returnFee}
              onChange={(e) => setReturnFee(parseFloat(e.target.value))}
              onClick={handleClickDiscountReturn}
            />
          </div>
          {hiddenPopUpDiscountPrice && (
            <div ref={menuRef} className="pop-discount-return">
              <p>Giảm giá</p>
              <input
                type="text"
                className="payment-invoice__input"
                // value={discountPrice.toLocaleString("vi-VN")}
                // onChange={handleDiscountChange}
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
            <div className="payment-return_price-total">
              <p>{returnPrice?.toLocaleString("vi-VN")}</p>
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
          {/* <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}></div> */}
        </div>
      </div>
    </>
  );
};

export default ReturnInvoice;

import React, { useEffect, useRef, useState } from "react";
import "./detailInvoices.css";
import "../SalesPage/SalePage.css";
// import "../styles/variables.css";
import { FaUser } from "react-icons/fa";
import returnProduct from "../../configs/return";
import { toast, ToastContainer } from "react-toastify";
import { handleError } from "../../utils/errorHandler";
interface ReturnInvoiceProp {
  activeKey: string;
  dataReturnPayment: any;
  removeReturnInvoice: (key: string) => void;
}
const ReturnInvoice: React.FC<ReturnInvoiceProp> = ({
  activeKey,
  dataReturnPayment,
  removeReturnInvoice,
}) => {
  const [dataProduct, setDataProduct] = useState([]);
  const [hiddenReturn, setHiddenReturn] = useState(false);
  const [returnPrice, setReturnPrice] = useState(0);
  const [quantityReturn, setQuantityReturn] = useState(0);
  const [needReturnPrice, setNeedReturnPrice] = useState(0);
  const [returnFee, setReturnFee] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);
  const [inforUser, setInfoUser] = useState("");
  const [idCustomer, setIdCustomer] = useState("");
  const [invoiceId, setInvoiceId] = useState("");
  const [isPercentage, setIsPercentage] = useState(false);
  const menuRef = useRef(null);
  const [hiddenPopUpDiscountPrice, setHiddenPopUpDiscountPrice] = useState(false);
  const [currDateTime, setCurrDateTime] = useState({
    date: "",
    time: "",
  });
  const converDataProduct = (data: any) => {
    const dataConvert = data.map((value: any) => ({
      product_id: value.product_id,
      quantity: value.quantity,
      price: value.price,
      total_price: value.total_price,
    }));
    if (dataConvert.length > 0) {
      const totalQuantity = dataConvert.reduce((sum: number, item: any) => sum + item.quantity, 0);
      if (totalQuantity === 0) {
        setHiddenReturn(true);
      } else {
        setHiddenReturn(false);
        setQuantityReturn(totalQuantity);
      }
    }
    return dataConvert;
  };
  useEffect(() => {
    if (dataReturnPayment.length > 0) {
      const userFullName = dataReturnPayment[0]?.user?.full_name || "";
      const customerId = dataReturnPayment[0]?.customer_id || "";
      const invoiceId = dataReturnPayment[0]?.id_invoice || "";
      const dataProduct = dataReturnPayment[0]?.items || [];
      if (dataProduct.length === 0) {
        setHiddenReturn(true);
      }
      const data = converDataProduct(dataProduct);
      setInvoiceId(invoiceId);
      setInfoUser(userFullName);
      setDataProduct(data);
      setIdCustomer(customerId);
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

  const handleDiscountChangeReturnFee = (e: any) => {
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
      total_product: quantityReturn,
      products: dataProduct,
      customer_id: idCustomer,
    };
    try {
      const res = await returnProduct.postDataPayment(dataReturn);
      if (res.code === 200) {
        // const texSS = res.massage.text;
        toast.success("Trả hàng thành công");
        removeReturnInvoice(activeKey);
      } else {
        const textErr = res.data.massage.text;
        toast.success(textErr);
      }
    } catch (err) {
      handleError(err);
    }
  };
  // Load data from localStorage and calculate prices on initial render
  useEffect(() => {
    if (dataReturnPayment.length > 0) {
      const totalPrice = dataReturnPayment[0]?.items.reduce((sum: number, item: any) => {
        if (item.quantity === 0) {
          return sum;
        } else {
          return sum + item.total_price;
        }
      }, 0);

      setReturnPrice(totalPrice);

      const calculatedNeedReturnPrice =
        totalPrice - (isPercentage ? (totalPrice * returnFee) / 100 : returnFee);
      setNeedReturnPrice(calculatedNeedReturnPrice > 0 ? calculatedNeedReturnPrice : 0);
      setRefundAmount(calculatedNeedReturnPrice > 0 ? calculatedNeedReturnPrice : 0);
    }
  }, [dataReturnPayment, returnFee, isPercentage]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setHiddenPopUpDiscountPrice(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);
  useEffect(() => {
    const date = new Date();
    setCurrDateTime({
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString(),
    });
  }, []);
  return (
    <>
      <ToastContainer autoClose={5000} />
      <div className="return-invoice">
        <div className="return-header">
          <div className="return-date">
            <span>
              {currDateTime.date} - {currDateTime.time}
            </span>
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
            disabled={hiddenReturn}
          >
            TRẢ HÀNG
          </button>
        </div>
      </div>
    </>
  );
};

export default ReturnInvoice;

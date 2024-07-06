import React, { useState } from "react";
import "./detailInvoices.css";
import "../styles/valiables.css";
const ReturnInvoice = () => {
  const [invoiceCode, setInvoiceCode] = useState("");
  const [originalPrice, setOriginalPrice] = useState(0);
  const [returnPrice, setReturnPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [returnFee, setReturnFee] = useState(0);
  const [refundAmount, setRefundAmount] = useState(0);

  // This function can be used to calculate the refund amount
  const calculateRefund = () => {
    const refund = returnPrice - discount - returnFee;
    setRefundAmount(refund);
  };

  return (
    <div className="return-invoice">
      <div className="return-header">
        <div className="return-date">
          <span>05/07/2024</span>
        </div>

        <div className="return-customer">
          <input
            type="text"
            placeholder="Mã hóa đơn"
            value={invoiceCode}
            onChange={(e) => setInvoiceCode(e.target.value)}
          />
        </div>
      </div>
      <div className="return-container">
        <div className="return-info">
          <div className="return-item">
            <label>Giá gốc:</label>
            <input
              type="number"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="return-item">
            <label>Tiền trả:</label>
            <input
              type="number"
              value={returnPrice}
              onChange={(e) => setReturnPrice(parseFloat(e.target.value))}
            />
          </div>
          <div className="return-item">
            <label>Giảm giá:</label>
            <input
              type="number"
              value={discount}
              onChange={(e) => setDiscount(parseFloat(e.target.value))}
            />
          </div>
          <div className="return-item">
            <label>Phí trả:</label>
            <input
              type="number"
              value={returnFee}
              onChange={(e) => setReturnFee(parseFloat(e.target.value))}
            />
          </div>
          <div className="return-item">
            <label>Hoàn trả:</label>
            <input type="number" value={refundAmount} readOnly />
          </div>
          <button onClick={calculateRefund}>Tính tiền hoàn</button>
        </div>
      </div>
    </div>
  );
};

export default ReturnInvoice;

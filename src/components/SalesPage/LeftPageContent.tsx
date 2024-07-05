import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaEllipsisVertical, FaRegTrashCan } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";

const LeftPageContent = ({
  selectedProducts = [], // Default value as empty array
  decrement,
  increment,
  handleChangeNumberCards,
  total = { quantity: 0, price: 0 }, // Default value for total
}) => {
  return (
    <div className="left-page-content">
      {selectedProducts.map((product, index) => (
        <div key={product.id} className="selected-product-details">
          <div className="carts-product-active-left">
            <span>{index + 1}</span>
          </div>
          <div className="carts-product-active-left">
            <button className="btn-remove-carts" title="Xóa hàng hóa">
              <FaRegTrashCan className="trash-product" />
            </button>
          </div>
          <div className="carts-product-active-mid">
            <div className="carts-product-active-mid-top">
              <div className="cell-code">
                <span>{product.barcode}</span>
              </div>
              <div className="cell-info">
                <h4>{product.name}</h4>
              </div>
            </div>
            <div className="carts-product-active-mid-bottom">
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-around",
                }}
              >
                <button className="icon-button" onClick={() => decrement(product.id)}>
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
                <button className="icon-button" onClick={() => increment(product.id)}>
                  <AiOutlinePlus />
                </button>
              </div>
              <span>{product.capital_price?.toLocaleString("vi-VN")}</span>
              <div className="sell-change-price">
                {(product.capital_price * product.quantity)?.toLocaleString("vi-VN")}
              </div>
            </div>
          </div>
          <div className="carts-product-active-right">
            <IoMdAdd />
            <FaEllipsisVertical />
          </div>
        </div>
      ))}
      <div className="cart-summary">
        <div className="cart-summary-item">
          <span>Tổng số lượng:</span>
          <span style={{ fontWeight: "700", marginLeft: "10px" }}>{total.quantity}</span>
        </div>
        <div className="cart-summary-item">
          <span>Tổng giá tiền: </span>
          <span style={{ fontWeight: "700", marginLeft: "10px" }}>
            {total.price.toLocaleString("vi-VN")}
          </span>
        </div>
      </div>
    </div>
  );
};

export default LeftPageContent;

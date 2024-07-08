import React from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaEllipsisVertical } from "react-icons/fa6";

const LeftPageContent = ({
  decrement,
  increment,
  handleChangeNumberCards,
  removeProductCarts,
  activeKey,
  invoiceList,
  totalQuantity,
  totalPrice,
  // detailTotalInvoice,
}) => {
  const deleteProductCarts = (invoiceID, productID) => {
    removeProductCarts(invoiceID, productID);
  };

  const typeInvoiceList = invoiceList.filter(
    (invoice) => invoice.type === "invoice" && invoice.id_payment === activeKey
  );

  return (
    <div className="left-page-content">
      {typeInvoiceList.flatMap((invoice) =>
        invoice.items.map((product, index) => (
          <div key={product.id} className="selected-product-details">
            <div className="carts-product-active-left">
              <span>{index + 1}</span>
            </div>
            <div className="carts-product-active-left">
              <button
                className="btn-remove-carts"
                title="Xóa hàng hóa"
                onClick={() => deleteProductCarts(typeInvoiceList[0].id_payment, product.id)}
              >
                <FaRegTrashAlt className="trash-product" />
              </button>
            </div>
            <div className="carts-product-active-mid">
              <div className="carts-product-active-mid-top">
                <div className="cell-code">
                  <span>{product.barcode}</span>
                </div>
                <div className="cell-info">
                  <span>{product.name}</span>
                </div>
              </div>
              <div className="carts-product-active-mid-bottom">
                <div className="quantity-product">
                  <button
                    className="icon-button"
                    onClick={() => decrement(typeInvoiceList[0].id_payment, product.id)}
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
                    onClick={() => increment(typeInvoiceList[0].id_payment, product.id)}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <div className="cell-change-price">
                  <span>{product.capital_price?.toLocaleString("vi-VN")}</span>
                </div>
                <div className="cell-total-price">
                  {(product.capital_price * product.quantity)?.toLocaleString("vi-VN")}
                </div>
              </div>
            </div>
            <div className="carts-product-active-right">
              <IoMdAdd />
              <FaEllipsisVertical />
            </div>
          </div>
        ))
      )}
      {typeInvoiceList.length > 0 && (
        <div className="cart-summary">
          <div className="cart-summary-item">
            <span>Tổng số lượng:</span>
            <span style={{ fontWeight: "700", marginLeft: "10px" }}>{totalQuantity}</span>
          </div>
          <div className="cart-summary-item">
            <span>Tổng giá tiền: </span>
            <span style={{ fontWeight: "700", marginLeft: "10px" }}>
              {totalPrice.toLocaleString("vi-VN")}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default LeftPageContent;

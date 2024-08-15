import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { domain } from "../TableConfig/TableConfig";
interface Product {
  id: string;
  barcode: string;
  name: string;
  quantity: number;
  capital_price: number;
  price: number;
  image_url: string;
}
interface Invoice {
  id: number;
  invoice_number: string;
  customer_id: string;
  customer_name: string;
  total_price: number;
  created_date: number;
  items: [];
  id_payment: string;
  type: string;
}
interface LeftPageContentProps {
  decrement: (invoiceId: string, productId: string) => void;
  increment: (invoiceId: string, productId: string) => void;
  handleChangeNumberCards: (e: React.ChangeEvent<HTMLInputElement>, productId: string) => void;
  handleChangePriceProduct: (e: React.ChangeEvent<HTMLInputElement>, productId: string) => void;
  removeProductCarts: (invoiceId: string, productId: string) => void;
  handleBlurPriceProduct: (invoiceId: string) => void;
  activeKey: string;
  editedPrices: object;
  invoiceList: Invoice[];
  totalQuantity: number;
  totalPrice: number;
}
const LeftPageContent: React.FC<LeftPageContentProps> = ({
  decrement,
  increment,
  handleChangeNumberCards,
  handleChangePriceProduct,
  removeProductCarts,
  activeKey,
  invoiceList,
  totalQuantity,
  totalPrice,
  detailTotalInvoice,
}) => {
  const domainLink = domain.domainLink;
  const deleteProductCarts = (invoiceID: string, productID: string) => {
    removeProductCarts(invoiceID, productID);
  };
  const typeInvoiceList = invoiceList.filter(
    (invoice) => invoice.type === "invoice" && invoice.id_payment === activeKey
  );

  return (
    <div className="left-page-content">
      {typeInvoiceList.flatMap((invoice) =>
        invoice.items.map((product: Product, index) => (
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
                <div className="show-picture-product">
                  <img src={`${domainLink}${product.image_url}`} alt="Ảnh sản phẩm" />
                </div>
                <div className="cell-change-price">
                  <input
                    type="text"
                    value={product.price ? product.price.toLocaleString("vi-VN") : ""}
                    className="payment-invoice__input-change "
                    onChange={(e) => handleChangePriceProduct(e, product.id)}
                  />
                  {/* <span>{product.capital_price?.toLocaleString("vi-VN")}</span> */}
                </div>
                <div className="cell-total-price">
                  {(product.price * product.quantity)?.toLocaleString("vi-VN")}
                </div>
              </div>
            </div>
            <div className="carts-product-active-right">
              <IoMdAdd />
              {/* <FaEllipsisVertical /> */}
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

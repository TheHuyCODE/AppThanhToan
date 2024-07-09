import React, { useEffect, useState } from "react";
import "./detailInvoices.css";
import "../styles/valiables.css";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaEllipsisVertical } from "react-icons/fa6";
import { IoMdAdd } from "react-icons/io";
type LeftContentReturn = {
  invoiceList: [];
  activeKey: string;
  removeProductCarts: (invoiceID: string, productID: string) => void;
  decrement: (invoiceID: string, productID: string) => void;
  increment: (invoiceID: string, productID: string) => void;
  updateProductTotal: (productID: string, total: number) => void;
};
const LeftReturnInvoice: React.FC<LeftContentReturn> = ({
  invoiceList,
  activeKey,
  removeProductCarts,
  decrement,
  increment,
  updateProductTotal,
}) => {
  const [quantityState, setQuantityState] = useState<{ [key: string]: number }>({});

  const typeInvoiceList = invoiceList.filter(
    (invoice) => invoice.type === "return" && invoice.id_payment === activeKey
  );
  const deleteProductCartsReturn = (invoiceID, productID) => {
    removeProductCarts(invoiceID, productID);
  };
  const handleChangeNumberCards = (
    e: React.ChangeEvent<HTMLInputElement>,
    IdReturn: string,
    product: object
  ) => {
    let value = e.target.value.replace(/\D/g, "");
    if (parseInt(value, 10) > product.quantity) {
      value = product.quantity.toString();
    }
    setQuantityState((prev) => ({
      ...prev,
      [product.id]: value ? parseInt(value, 10) : 0,
    }));
  };
  const decrementReturn = (invoiceID: string, productID: string) => {
    const product = findProduct(productID);
    if (!product) return;

    setQuantityState((prev) => {
      const newQuantity = Math.max((prev[productID] || 0) - 1, 0);
      updateProductTotal(productID, calculateTotal(newQuantity, product.price));
      return { ...prev, [productID]: newQuantity };
    });
  };
  const findProduct = (productID: string) => {
    return typeInvoiceList
      .flatMap((invoice) => invoice.items)
      .find((item) => item.id === productID);
  };

  const incrementReturn = (invoiceID: string, productID: string) => {
    const product = findProduct(productID);
    if (!product) return;
    setQuantityState((prev) => {
      const newQuantity = Math.min((prev[productID] || 0) + 1, product.quantity);
      updateProductTotal(productID, calculateTotal(newQuantity, product.price));
      return { ...prev, [productID]: newQuantity };
    });
  };

  const calculateTotal = (quantity: number, price: number) => {
    return quantity * price;
  };
  useEffect(() => {
    // Update total for all products on initial render
    typeInvoiceList.flatMap((invoice) =>
      invoice.items.forEach((product) => {
        const totalPrice = calculateTotal(quantityState[product.id] || 0, product.price);
        updateProductTotal(product.id, totalPrice);
      })
    );
  }, [quantityState]);
  return (
    <>
      <div className="left-page-content-return">
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
                  onClick={() =>
                    deleteProductCartsReturn(typeInvoiceList[0].id_payment, product.id)
                  }
                >
                  <FaRegTrashAlt className="trash-product" />
                </button>
              </div>
              <div className="cell-code-return">
                <span>{product.barcode}</span>
              </div>
              <div className="cell-info-return">
                <span>{product.name}</span>
              </div>
              <div className="quantity-product-return">
                <div className="quantity-product">
                  <button
                    className="icon-button"
                    onClick={() => decrementReturn(typeInvoiceList[0].id_payment, product.id)}
                  >
                    <AiOutlineMinus />
                  </button>
                  <input
                    type="text"
                    value={quantityState[product.id] || 0}
                    onChange={(e) => handleChangeNumberCards(e, product.id, product)}
                    className="input-number-cart"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <button
                    className="icon-button"
                    onClick={() => incrementReturn(typeInvoiceList[0].id_payment, product.id)}
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <span>/&nbsp;{product.quantity}</span>
              </div>
              <div className="cell-change-price">
                <span>{product.price}</span>
              </div>
              <div className="cell-total-price">
                {calculateTotal(quantityState[product.id] || 0, product.price).toLocaleString(
                  "vi-VN"
                )}
              </div>
            </div>
          ))
        )}
        {typeInvoiceList.length > 0 && (
          <div className="cart-summary-return">
            <div className="icon-pen">
              <FaPen />
            </div>
            <input type="text" placeholder="Chú thích đơn hàng" />
          </div>
        )}
      </div>
    </>
  );
};

export default LeftReturnInvoice;

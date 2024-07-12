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
  updateProductTotal,
}) => {
  const [quantityState, setQuantityState] = useState<{ [key: string]: number }>({});
  const [invoiceListItems, setInvoiceList] = useState<any[]>([]); // Khai báo invoiceList và setter

  const updateInvoiceList = (updatedList: any[]) => {
    setInvoiceList(updatedList); // Cập nhật invoiceList mới
  };

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
  const findProduct = (productID: string) => {
    return typeInvoiceList
      .flatMap((invoice) => invoice.items)
      .find((item) => item.id === productID);
  };
  const decrementReturn = (invoiceID: string, productID: string) => {
    const product = findProduct(productID);
    if (!product) return;

    // Update quantityState
    const newQuantity = Math.max((quantityState[productID] || 0) - 1, 0);
    setQuantityState((prev) => ({
      ...prev,
      [productID]: newQuantity,
    }));
    // Update invoiceList
    const updatedInvoiceList = invoiceList.map((invoice) => {
      if (invoice.id_payment === activeKey && invoice.type === "return") {
        const updatedItems = invoice.items.map((item) =>
          item.id === productID
            ? { ...item, quantity: newQuantity, total_price: newQuantity * item.price }
            : item
        );
        return { ...invoice, items: updatedItems };
      }
      return invoice;
    });
    // Update parent component state with the updated invoiceList
    updateInvoiceList(updatedInvoiceList);
    console.log("invoiceList", invoiceListItems);
    // Update product total
    updateProductTotal(productID, newQuantity * product.price);
  };
  const onChangeValueCommend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("1111", value);
  };
  const incrementReturn = (invoiceID: string, productID: string) => {
    const product = findProduct(productID);
    if (!product) return;
    // Update quantityState
    const newQuantity = Math.min((quantityState[productID] || 0) + 1, product.quantity);
    setQuantityState((prev) => ({
      ...prev,
      [productID]: newQuantity,
    }));
    // Update invoiceList
    const updatedInvoiceList = invoiceList.map((invoice) => {
      if (invoice.id_payment === activeKey && invoice.type === "return") {
        const updatedItems = invoice.items.map((item) =>
          item.id === productID
            ? { ...item, quantity: newQuantity, total_price: newQuantity * item.price }
            : item
        );
        return { ...invoice, items: updatedItems };
      }
      return invoice;
    });
    // Update parent component state with the updated invoiceList
    updateInvoiceList(updatedInvoiceList);
    console.log("invoiceList", invoiceListItems);
    updateProductTotal(productID, newQuantity * product.price);
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
              <div className="cell-change-price-return">
                <span>{product.price.toLocaleString("vi-VN")}</span>
              </div>
              <div className="cell-total-price-return">
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
            <input type="text" placeholder="Chú thích đơn hàng" onChange={onChangeValueCommend} />
          </div>
        )}
      </div>
    </>
  );
};

export default LeftReturnInvoice;

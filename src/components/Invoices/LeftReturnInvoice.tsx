import React, { useEffect, useState } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { FaPen, FaRegTrashAlt } from "react-icons/fa";
import "../styles/valiables.css";
import "./detailInvoices.css";

type Product = {
  id: string;
  barcode: string;
  name: string;
  price: number;
  quantity: number;
  remaining_quantity: number;
};

type Invoice = {
  id: number;
  invoice_number: string;
  customer_id: string;
  customer_name: string;
  total_price: number;
  created_date: number;
  items: Product[];
  id_payment: string;
  type: string;
};

type LeftContentReturn = {
  invoiceList: Invoice[];
  activeKey: string;
  setValueReason: React.Dispatch<React.SetStateAction<string>>;
  removeProductCarts: (invoiceID: string, productID: string) => void;
  decrementReturn: (invoiceID: string, productID: string) => void;
  incrementReturn: (invoiceID: string, productID: string) => void;
  setInvoiceList: any;
};

const LeftReturnInvoice: React.FC<LeftContentReturn> = ({
  invoiceList,
  activeKey,
  setInvoiceList,
  removeProductCarts,
  decrementReturn,
  incrementReturn,
  setValueReason,
}) => {
  //@ts-ignore
  const [quantityState, setQuantityState] = useState<{ [key: string]: number }>(
    {}
  );

  const deleteProductCartsReturn = (invoiceID: string, productID: string) => {
    removeProductCarts(invoiceID, productID);
  };

  const onChangeValueCommend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setValueReason(value);
    console.log(value); // This should be a function'
  };
  const calculateTotal = (quantity: number, price: number) => {
    return quantity * price;
  };
  const typeInvoiceList = invoiceList.filter(
    (invoice) => invoice.type === "return" && invoice.id_payment === activeKey
  );
  const handleChangeNumberCards = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string
  ) => {
    let value = e.target.value.replace(/\D/g, "");
    const product = typeInvoiceList[0].items.find(
      (item) => item.id === productId
    );
    if (!product) return;
    if (parseInt(value, 10) > product.remaining_quantity) {
      value = product.remaining_quantity.toString();
    }
    const newQuantity = parseInt(value, 10) || 0;
    setInvoiceList((prevInvoices: any[]) =>
      prevInvoices.map((invoice) =>
        invoice.id_payment === typeInvoiceList[0].id_payment
          ? {
              ...invoice,
              items: invoice.items.map((product: any) =>
                product.id === productId
                  ? {
                      ...product,
                      quantity: newQuantity,
                      total_price: newQuantity * product.price,
                    }
                  : product
              ),
            }
          : invoice
      )
    );
  };

  useEffect(() => {
    typeInvoiceList.flatMap((invoice) =>
      invoice.items.forEach((product) => {
        //@ts-ignore
        const totalPrice = calculateTotal(
          quantityState[product.id] || 0,
          product.price
        );
        // updateProductTotal(product.id, totalPrice);
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
                    deleteProductCartsReturn(
                      typeInvoiceList[0].id_payment,
                      product.id
                    )
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
                    onClick={() =>
                      decrementReturn(typeInvoiceList[0].id_payment, product.id)
                    }
                  >
                    <AiOutlineMinus />
                  </button>
                  <input
                    type="text"
                    value={product.quantity.toLocaleString("vi-VN")}
                    onChange={(e) => handleChangeNumberCards(e, product.id)}
                    className="input-number-cart"
                    inputMode="numeric"
                    pattern="[0-9]*"
                  />
                  <button
                    className="icon-button"
                    onClick={() =>
                      incrementReturn(typeInvoiceList[0].id_payment, product.id)
                    }
                  >
                    <AiOutlinePlus />
                  </button>
                </div>
                <span>/&nbsp;{product.remaining_quantity}</span>
              </div>
              <div className="cell-change-price-return">
                <span>{product.price.toLocaleString("vi-VN")}</span>
              </div>
              <div className="cell-total-price-return">
                <span>
                  {(product.quantity * product.price).toLocaleString("vi-VN")}
                </span>
              </div>
            </div>
          ))
        )}
        {typeInvoiceList.length > 0 && (
          <div className="cart-summary-return">
            <div className="icon-pen">
              <FaPen />
            </div>
            <input
              type="text"
              placeholder="Lí do trả hàng"
              onChange={onChangeValueCommend}
            />
          </div>
        )}
      </div>
    </>
  );
};

export default LeftReturnInvoice;

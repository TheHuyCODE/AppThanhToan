import React from "react"; //ts-ignore
import { forwardRef, useEffect, useState } from "react";
import "../styles/valiables.css";
import "./detailInvoices.css";
// import logoTitle from "../../assets/img/logoTitle.png";
import logo from "../../../public/Logo.png";
import { getDate } from "../../constants/functionContants";
interface InvoiceData {
  created_date: string;
  id: string;
  customer: {
    full_name: string;
    phone: string;
  };
  create_user: {
    full_name: string;
  };
  payment_methods: {
    type: boolean;
    image?: string;
  };

  product: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total_price: number;
  }[];

  total_amount: number;
  discount: number;
}
interface InvoiceStore {
  store: {
    address: string;
    phone: string;
  };
  address: string;
  phone: string;
}
interface DetailInvoicesProps {
  linkQR: string;
  finalPrice: number;
}

const DetailInvoices = forwardRef<HTMLDivElement, DetailInvoicesProps>(
  ({ linkQR, finalPrice }, ref) => {
    const [invoiceData, setInvoiceData] = useState<InvoiceData | null>(null);
    const [invoiceDataStore, setInvoiceDataStore] = useState<InvoiceStore | null>(null);
    useEffect(() => {
      const data = localStorage.getItem("dataDetailInvoice");
      const dataStore = localStorage.getItem("INFO_USER");
      if (data) {
        try {
          setInvoiceData(JSON.parse(data));
        } catch (error) {
          console.error("Error parsing invoice data", error);
        }
      }
      if (dataStore) {
        try {
          setInvoiceDataStore(JSON.parse(dataStore));
        } catch (error) {
          console.error("Error parsing store data", error);
        }
      }
    }, []);

    if (!invoiceData) {
      return <div>Loading...</div>;
    }

    const customerName = invoiceData.customer.full_name || "Khách hàng không xác định";
    const adminName = invoiceData.create_user.full_name || "Admin";
    const customerPhone = invoiceData?.customer.phone || "";
    const addressCreated = invoiceDataStore?.address || "";
    const phoneStore = invoiceDataStore?.store.phone || "";
    const typePayment = invoiceData.payment_methods.type ? "Tiền mặt" : "Chuyển khoản";
    const showQRCode = invoiceData.payment_methods.type; // true for bank transfer, false for cash

    return (
      <div ref={ref} className="page_invoice">
        <div className="header_invoices">
          <div className="dateTime_invoices">
            <span>{getDate() || ""}</span>
          </div>
          <div className="main_header_invoices">
            <div className="logo">
              <img src={logo} alt="logo_Title" />
              <span className="name_store">App Bán Hàng</span>
            </div>
            <div className="info_admin">
              <span>Người tạo: {adminName}</span>
              <span>Địa chỉ: {addressCreated}</span>
              <span>Điện thoại: {phoneStore}</span>
              <div className="title_invoices">
                <h3>HÓA ĐƠN HÀNG HÓA</h3>
                <span>Số HD: {invoiceData.id}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="containner_invoices">
          <div className="info_customer_invoices">
            <span>Khách hàng: {customerName} </span>
            <span>SĐT: {customerPhone}</span>
          </div>
          <div className="table_product_invoice">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>STT</th>
                  <th style={{ width: "40%" }}>Tên sản phẩm</th>
                  <th style={{ width: "15%" }}>Số lượng</th>
                  <th style={{ width: "15%" }}>Đơn giá</th>
                  <th style={{ width: "20%" }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.product.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity || 0}</td>
                    <td>{product.price.toLocaleString("vi-VN") || 0}</td>
                    <td>{product.total_price.toLocaleString("vi-VN") || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="total_price_invoices">
            <div className="title_prices">
              <span>Tổng tiền hàng:</span>
              <span>Chiết khấu:</span>
              <span>Tổng thanh toán:</span>
            </div>
            <div className="detail_prices">
              <span>{invoiceData.total_amount.toLocaleString("vi-VN")}</span>
              <span>{invoiceData.discount.toLocaleString("vi-VN")}</span>
              <span>{finalPrice.toLocaleString("vi-VN")}</span>
            </div>
          </div>

          {showQRCode && (
            <div className="detail_qr_invoices">
              <span>Quét mã thanh toán</span>
              <img src={linkQR} alt="QR_Code" />
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default DetailInvoices;

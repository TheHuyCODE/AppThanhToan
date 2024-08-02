import React, { useEffect, useState, forwardRef } from "react";
import "./detailInvoices.css";
import "../styles/valiables.css";
import logoTitle from "../../assets/img/logoTitle.png";

interface InvoiceData {
  created_date: string;
  id: string;
  customer: {
    full_name: string;
  };
  create_user: {
    full_name: string;
  };
  payment_methods: {
    type: boolean;
  };
  product: {
    id: string;
    name: string;
    quantity: number;
    price: number;
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
    const [invoiceDataStore, setInvoiceDataStore] =
      useState<InvoiceStore | null>(null);

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
    const getDate = () => {
      const today = new Date();
      const month = today.getMonth() + 1;
      const year = today.getFullYear();
      const date = today.getDate();
      const timeCurrent = today.toLocaleTimeString();
      return `${timeCurrent}-${month}/${date}/${year}`;
    };

    const customerName =
      invoiceData.customer.full_name || "Khách hàng không xác định";
    const adminName = invoiceData.create_user.full_name || "Admin";
    const phoneCreated = invoiceDataStore?.phone || "";
    const addressCreated = invoiceDataStore?.address || "";
    const phoneStore = invoiceDataStore?.store.phone || "";
    const addressPhone = invoiceDataStore?.store.address || "";
    const hiddenImgQrCode = invoiceData.payment_methods.type || false;
    // const Name

    return (
      <div ref={ref} className="page_invoice">
        <div className="header_invoices">
          <div className="dateTime_invoices">
            <span>{getDate() || ""}</span>
          </div>
          <div className="main_header_invoices">
            <div className="logo">
              <img src={logoTitle} alt="logo_Title" />
              <span className="name_store">App Bán Hàng</span>
            </div>
            <div className="info_admin">
              <span>Người tạo: {adminName}</span>
              <span>Địa chỉ: {addressCreated}</span>
              <span>Điện thoại: {phoneCreated}</span>
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
            <span>SĐT: {phoneStore}</span>
            <span>Địa chỉ: {addressPhone}</span>
          </div>
          <div className="table_product_invoice">
            <table>
              <thead>
                <tr>
                  <th style={{ width: "10%" }}>STT</th>
                  <th style={{ width: "50%" }}>Tên sản phẩm</th>
                  <th style={{ width: "20%" }}>Số lượng</th>
                  <th style={{ width: "20%" }}>Thành tiền</th>
                </tr>
              </thead>
              <tbody>
                {invoiceData.product.map((product, index) => (
                  <tr key={product.id}>
                    <td>{index + 1}</td>
                    <td>{product.name}</td>
                    <td>{product.quantity}</td>
                    <td>
                      {(product.quantity * product.price).toLocaleString(
                        "vi-VN"
                      )}
                    </td>
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
        </div>
        {hiddenImgQrCode && (
          <div className="detail_qr_invoices">
            <span>Quét mã thanh toán</span>
            <img src={linkQR} alt="QR_Code" />
          </div>
        )}
      </div>
    );
  }
);

export default DetailInvoices;

import { forwardRef, useEffect, useState } from "react";
import logo from "../../../../public/Logo.png";
import { getDate } from "../../../constants/functionContants";

interface PrintReturnProps {
  // Define any props that you need here, for example:
  someProp?: string;
}
interface ReturnData {
  created_date: string;
  invoice_id: string;
  id: string;
  customer: {
    full_name: string;
    phone: string;
  };
  create_user: {
    full_name: string;
  };
  product: {
    id: string;
    name: string;
    quantity: number;
    price: number;
    total_price: number;
  }[];
  total_amount: number;
  total_product: number;
}
interface InvoiceStore {
  store: {
    address: string;
    phone: string;
  };
  address: string;
  phone: string;
}
const PrintReturn = forwardRef<HTMLDivElement, PrintReturnProps>(
  //@ts-ignore
  (props, ref) => {
    const [returnData, setReturnData] = useState<ReturnData | null>(null);
    const [invoiceDataStore, setInvoiceDataStore] = useState<InvoiceStore | null>(null);
    useEffect(() => {
      const data = localStorage.getItem("dataDetailReturn");
      const dataStore = localStorage.getItem("INFO_USER");
      if (data) {
        try {
          setReturnData(JSON.parse(data));
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
    if (!returnData) {
      return <div>Loading...</div>;
    }
    const customerName = returnData.customer.full_name || "Khách hàng không xác định";
    const adminName = returnData.create_user.full_name || "Admin";
    const addressCreated = invoiceDataStore?.address || "";
    const customerPhone = returnData?.customer.phone || "";
    const phoneStore = invoiceDataStore?.store.phone || "";
    const invoice_id = returnData?.invoice_id || "";
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
                <h3>HÓA ĐƠN TRẢ HÀNG</h3>
                <span>Mã hóa đơn trả hàng: {returnData.id}</span>
                <br />
                <span>Mã hóa đơn: {invoice_id}</span>
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
                {returnData.product
                  .filter((product) => product.quantity > 0) // Lọc ra các sản phẩm có số lượng > 0
                  .map((product, index) => (
                    <tr key={product.id}>
                      <td>{index + 1}</td>
                      <td>{product.name}</td>
                      <td>{product.quantity}</td>
                      <td>{product.price.toLocaleString("vi-VN")}</td>
                      <td>{product.total_price.toLocaleString("vi-VN")}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="total_price_invoices">
            <div className="title_prices">
              <span>Tổng tiền hàng trả:</span>
              <span>Tiền trả khách:</span>
            </div>
            <div className="detail_prices">
              <span>{returnData.total_amount.toLocaleString("vi-VN")}</span>
              <span>{returnData.total_amount.toLocaleString("vi-VN")}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

export default PrintReturn;

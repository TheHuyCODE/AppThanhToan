import React from "react";
import "./detailInvoices.css";
import "../styles/valiables.css";
import logoTitle from "../../assets/img/logoTitle.png";
import { toWords } from "number-to-words";
const DetailInvoices = React.forwardRef((props, ref) => {
  const {
    idCustomer,
    selectedProducts,
    amount_due,
    amount_paid,
    discount_price,
    isVoicesID,
  } = props;

  const numberToVietnameseWords = (number: number): string => {
    const units = [
      "",
      "một",
      "hai",
      "ba",
      "bốn",
      "năm",
      "sáu",
      "bảy",
      "tám",
      "chín",
    ];
    const teens = [
      "mười",
      "mười một",
      "mười hai",
      "mười ba",
      "mười bốn",
      "mười lăm",
      "mười sáu",
      "mười bảy",
      "mười tám",
      "mười chín",
    ];
    const tens = [
      "",
      "",
      "hai mươi",
      "ba mươi",
      "bốn mươi",
      "năm mươi",
      "sáu mươi",
      "bảy mươi",
      "tám mươi",
      "chín mươi",
    ];
    const thousands = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

    if (number === 0) return "không";

    if (number < 0) return `âm ${numberToVietnameseWords(Math.abs(number))}`;

    let word = "";
    let k = 0;

    while (number > 0) {
      let chunk = number % 1000;

      if (chunk !== 0) {
        let chunkWord = "";
        let hundreds = Math.floor(chunk / 100);
        let remainder = chunk % 100;
        let tensPlace = Math.floor(remainder / 10);
        let onesPlace = remainder % 10;

        if (hundreds !== 0) {
          chunkWord += `${units[hundreds]} trăm `;
          if (remainder !== 0 && remainder < 10) chunkWord += "lẻ ";
        }

        if (remainder !== 0) {
          if (remainder < 10) {
            chunkWord += units[onesPlace];
          } else if (remainder < 20) {
            chunkWord += teens[remainder - 10];
          } else {
            chunkWord += `${tens[tensPlace]}`;
            if (onesPlace !== 0) chunkWord += ` ${units[onesPlace]}`;
          }
        }

        word = `${chunkWord.trim()} ${thousands[k]} ${word}`.trim();
      }

      number = Math.floor(number / 1000);
      k++;
    }

    return word.trim();
  };

  const getCustomerNameById = (customerId: string) => {
    const customersData = localStorage.getItem("info_customer");
    const parsedCustomerData = customersData ? JSON.parse(customersData) : [];
    if (!parsedCustomerData.items) {
      return "Khách hàng không xác định";
    }
    const customer = parsedCustomerData.items.find(
      (item) => item.id === customerId
    );
    return customer ? customer.full_name : "Khách hàng không xác định";
  };

  const customerName = getCustomerNameById(idCustomer);
  const amountPaidInWords = numberToVietnameseWords(amount_paid);

  const getInfoAdmin = () => {
    const infoAdmin = localStorage.getItem("INFO_USER");
    const parsedAdminData = infoAdmin ? JSON.parse(infoAdmin) : [];
    const nameAdmin = parsedAdminData.full_name;
    return nameAdmin;
  };
  const adminName = getInfoAdmin();
  return (
    <>
      <div ref={ref} className="page_invoice">
        {/* Your invoice content here */}
        <div className="header_invoices">
          <div className="dateTime_invoices">
            <span>8/06/2024</span>
          </div>
          <div className="main_header_invoices">
            <div className="logo">
              <img src={logoTitle} alt="logo_Title" />
              <span className="name_store">App Bán Hàng</span>
            </div>
            <div className="info_admin">
              <span>{adminName}</span>
              <span>Địa chỉ: --</span>
              <span>Điện thoại</span>
            </div>
            <div className="title_invoices">
              <h3>HÓA ĐƠN HÀNG HÓA</h3>
              <span>Số HD: {isVoicesID}</span>
            </div>
          </div>
        </div>
        <div className="containner_invoices">
          <div className="info_customer_invoices">
            <span>Khách hàng: {customerName} </span>
            <span>SĐT:</span>
            <span>Địa chỉ:</span>
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
                {selectedProducts.map((product, index) => (
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
              <span>{amount_due}</span>
              <span>{discount_price}</span>
              <span>{amount_paid}</span>
            </div>
          </div>
          <div className="detail_text_invoices">
            <span>({amountPaidInWords})</span>
          </div>
        </div>
        <div className="detail_qr_invoices">
          <span>Quét mã thanh toán</span>
          <img src="" alt="" /> {/* Add QR code */}
        </div>
      </div>
    </>
  );
});

export default DetailInvoices;

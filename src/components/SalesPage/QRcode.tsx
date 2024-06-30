import React from "react";
import { QRCode as AntdQRCode } from "antd";
import "antd/dist/antd.css"; // Import CSS của antd
import ReactDOM from "react-dom";
import "./SalePage.css";
interface QRCodeProps {
  value: string;
}

const QRCodeDetail: React.FC<QRCodeProps> = ({ value }) => {
  return ReactDOM.createPortal(
    <div className="qr-code-wrapper">
      <div className="qr-code-content">
        <h1>Detail QR code</h1>
        <AntdQRCode value={value} size={250} />
      </div>
    </div>,
    document.getElementById("qr-code-portal") as HTMLElement
  );
};

export default QRCodeDetail;

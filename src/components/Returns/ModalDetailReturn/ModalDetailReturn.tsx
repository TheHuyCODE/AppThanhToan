import { Modal } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
interface DetailReturn {
  id: string;
  created_date: string;
  full_name: string;
  invoice_id: string;
  create_user: string;
  total_product: number;
  total_amount: number;
  reason: string;
}
interface ModalDetailRetrunProps {
  isOpenModalDetail: boolean;
  detailReturn: DetailReturn;
  onCloseModalDetail: () => void;
}
const ModalDetailReturn: React.FC<ModalDetailRetrunProps> = ({
  isOpenModalDetail,
  detailReturn,
  onCloseModalDetail,
}) => {
  return (
    <>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        width={900}
        centered
        open={isOpenModalDetail}
        onCancel={onCloseModalDetail}
        cancelText="Quay lại"
      >
        <h2
          style={{
            fontFamily: "var(--kv-font-sans-serif)",
            color: "var(--color-title)",
            paddingLeft: "5px",
          }}
        >
          Chi tiết trả hàng{" "}
        </h2>
        <div className="content-detail">
          <div className="left-content-detail">
            <div className="row-detail">
              <span className="title-row">Mã trả hàng:</span>
              <span className="value-row" style={{ color: "black", fontWeight: "600" }}>
                {detailReturn.id}
              </span>
            </div>
            <div className="row-detail">
              <span className="title-row">Thời gian:</span>
              <span className="value-row" style={{ color: "grey" }}>
                {detailReturn.created_date}
              </span>
            </div>
            <div className="row-detail">
              <span className="title-row">Khách hàng:</span>
              <span className="value-row" style={{ color: "blue" }}>
                {detailReturn.full_name}
              </span>
            </div>
            <div className="row-detail">
              <span className="title-row">Mã Hóa đơn:</span>
              <span className="value-row" style={{ color: "blue" }}>
                {detailReturn.invoice_id}
              </span>
            </div>
            <div className="row-detail">
              <span className="title-row">Người tạo:</span>
              <span className="value-row">{detailReturn.create_user}</span>
            </div>
          </div>
          <div className="right-content-detail">
            <div className="row-detail">
              <span className="title-row">Trạng thái:</span>
              <span className="value-row">Đã trả</span>
            </div>
            <div className="row-detail">
              <span className="title-row">Tổng số lượng:</span>
              <span className="value-row" style={{ color: "black", fontWeight: "600" }}>
                {detailReturn.total_product}
              </span>
            </div>
            <div className="row-detail">
              <span className="title-row">Tổng tiền:</span>
              <span className="value-row" style={{ color: "black", fontWeight: "600" }}>
                {detailReturn.total_amount}
              </span>
            </div>
            <div className="row-detail" style={{ borderBottom: "none" }}>
              <span className="title-row">Lí do:</span>
              <TextArea
                showCount
                maxLength={100}
                value={detailReturn.reason}
                // onChange={onChange}
                placeholder="Ghi chú..."
                style={{ height: 100, resize: "none" }}
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailReturn;

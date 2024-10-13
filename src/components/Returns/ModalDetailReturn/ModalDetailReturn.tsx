import { Modal, Table, TableColumnsType } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useMemo } from "react";
import { localReturn } from "../../TableConfig/TableConfig";
interface DetailReturn {
  id: string;
  created_date: string;
  full_name: string;
  invoice_id: string;
  create_user: string;
  total_product: number;
  total_amount: number;
  reason: string;
  product: [];
}
interface ModalDetailReturnProps {
  isOpenModalDetail: boolean;
  detailReturn: DetailReturn;
  onCloseModalDetail: () => void;
}
interface RecordType {
  stt: number;
  barcode: string;
  name: string;
  quantity: number;
  total_amount: number;
  price: number;
  total_sell: number;
  total_price: number;
  key: string;
}
const ModalDetailReturn: React.FC<ModalDetailReturnProps> = ({
  isOpenModalDetail,
  detailReturn,
  onCloseModalDetail,
}) => {
  const columns: TableColumnsType<RecordType> = [
    {
      title: "Mã trả hàng",
      dataIndex: "barcode",
      key: "barcode",
      align: "start",
      width: 200,
    },
    {
      title: "Tên hàng",
      dataIndex: "name",
      key: "name",
      width: 100,
    },
    {
      title: "Số lượng",
      dataIndex: "quantity",
      key: "quantity",
      align: "end",
    },
    {
      title: "Giá bán",
      dataIndex: "price",
      key: "price",
      // width: 300,
      align: "end",
    },

    {
      title: "Thành tiền",
      dataIndex: "total_price",
      key: "total_price",
      align: "end",
      width: 130,
    },
  ];
  const dataTableDetail = useMemo(() => {
    return detailReturn?.product
      ?.filter((item: any) => item.quantity > 0) // Lọc các sản phẩm có số lượng > 0
      .map((items: any) => ({
        barcode: items.barcode,
        name: items.name,
        quantity: items.quantity,
        price: items.price.toLocaleString("vi-VN") || 0,
        total_price: items.total_price.toLocaleString("vi-VN") || 0,
        key: items.id,
      }));
  }, [detailReturn]);
  console.log("dataTableDetail", dataTableDetail);
  console.log("detailReturn", detailReturn);

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
        <div className="detail-invoice">
          <div className="table-detail">
            <Table
              style={{ width: "100%" }}
              scroll={{
                y: 300,
              }} //@ts-ignore
              columns={columns}
              dataSource={dataTableDetail}
              locale={localReturn}
              pagination={false}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailReturn;

import { Modal, Table, TableColumnsType } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { localInvoice } from "../../TableConfig/TableConfig";
interface DetailInvoice {
  stt: number;
  id: string;
  created_date: string;
  created_user: string;
  customer: string;
  total_amount: number;
  customer_money: number;
  payment_methods: string;
  refund: number;
  discount: number;
  total_product: number;
  key: string;
  product: [];
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
interface ModalDetailInvoiceProps {
  openModalModify: boolean;
  dataDetail: DetailInvoice;

  onCloseModalModify: () => void;
}
const ModalDetailInvoice: React.FC<ModalDetailInvoiceProps> = ({
  openModalModify,
  dataDetail,
  onCloseModalModify,
}) => {
  const columns: TableColumnsType<RecordType> = [
    {
      title: "Mã hàng",
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
      title: "Đơn giá",
      dataIndex: "price",
      key: "price",
      // width: 300,
      align: "end",
    },
    {
      title: "Giảm giá",
      dataIndex: "total_amount",
      key: "total_amount",
      align: "end",
      width: 100,
    },
    {
      title: "Giá bán",
      dataIndex: "total_sell",
      key: "total_sell",
      align: "end",
      width: 120,
    },
    {
      title: "Thành tiền",
      dataIndex: "total_price",
      key: "total_price",
      align: "end",
      width: 130,
    },
  ];
  const dataTableDetail = dataDetail?.product?.map((items: any) => ({
    barcode: items.id,
    name: items.name,
    quantity: items.quantity,
    price: items.price.toLocaleString("vi-VN") || 0,
    total_amount: 0,
    total_sell: items.price.toLocaleString("vi-VN") || 0,
    total_price: items.total_price.toLocaleString("vi-VN") || 0,
    key: items.id,
  }));
  return (
    <>
      <Modal
        okButtonProps={{ style: { display: "none" } }}
        width={1100}
        centered
        open={openModalModify}
        onCancel={onCloseModalModify}
        cancelText="Quay lại"
      >
        <h2
          style={{
            fontFamily: "var(--kv-font-sans-serif)",
            color: "var(--color-title)",
            paddingLeft: "5px",
          }}
        >
          Chi tiết Hóa đơn{" "}
        </h2>
        <div className="content-detail-invoice">
          <div className="left-content-detail">
            <div className="row-detail">
              <span className="title-row">Mã hóa đơn:</span>
              <span className="value-row" style={{ color: "black", fontWeight: "600" }}>
                {dataDetail.id}
              </span>
            </div>
            <div className="row-detail">
              <span className="title-row">Thời gian:</span>
              <span className="value-row" style={{ color: "grey" }}>
                {dataDetail.created_date}
              </span>
            </div>
            <div className="row-detail">
              <span className="title-row">Khách hàng:</span>
              <span className="value-row" style={{ color: "blue" }}>
                {dataDetail.customer}
              </span>
            </div>
            <div className="row-detail">
              <span className="title-row">Trạng thái:</span>
              <span className="value-row">Hoàn thành</span>
            </div>
            <div className="row-detail">
              <span className="title-row">Mã đặt hàng:</span>
            </div>
          </div>
          <div className="right-content-detail">
            <div className="row-detail">
              <span className="title-row">Người tạo:</span>
              <span className="value-row">{dataDetail.created_user}</span>
            </div>
            <div className="row-detail">
              <span className="title-row">Người bán:</span>
              <span className="value-row">{dataDetail.created_user}</span>
            </div>
            <div className="row-detail">
              <span className="title-row">Kênh bán:</span>
              <span className="value-row">Bán trực tiếp</span>
            </div>

            <div className="row-detail" style={{ borderBottom: "none" }}>
              <span className="title-row">Ghi chú:</span>
              <TextArea
                showCount
                maxLength={100}
                value={""}
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
              }}
              columns={columns}
              dataSource={dataTableDetail}
              locale={localInvoice}
              pagination={false}
            />
          </div>
          <div className="price-detail">
            <div className="price-detail-row">
              <span className="">Tổng số lượng:</span>
              <span className="title-price-detail">{dataDetail.total_product || 0}</span>
            </div>
            <div className="price-detail-row">
              <span className="">Tổng tiền hàng:</span>
              <span className="title-price-detail">{dataDetail.total_amount || 0}</span>
            </div>
            <div className="price-detail-row">
              <span className="">Giảm giá hóa đơn:</span>
              <span className="title-price-detail">{dataDetail.discount}</span>
            </div>
            <div className="price-detail-row">
              <span className="">Khách cần trả:</span>
              <span className="title-price-detail">{dataDetail.customer_money}</span>
            </div>
            <div className="price-detail-row">
              <span className="">Khách đã trả:</span>
              <span className="title-price-detail">{dataDetail.customer_money}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalDetailInvoice;

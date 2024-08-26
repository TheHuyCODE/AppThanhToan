import { Modal } from "antd";
import React from "react";
interface ModalDeleteOwnersProp {
  isOpenModalRejectOwners: boolean;
  titleReject: string | "";
  textReject: string | "";
  handleCloseModalReject: () => void;
  handleChangeStatusReject: () => void;
}
const ModalRejectOwners: React.FC<ModalDeleteOwnersProp> = ({
  isOpenModalRejectOwners,
  titleReject,
  textReject,
  handleCloseModalReject,
  handleChangeStatusReject,
}) => {
  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        width={600}
        centered
        open={isOpenModalRejectOwners}
        onOk={handleChangeStatusReject}
        onCancel={handleCloseModalReject}
        okText="Từ chối"
        cancelText="Hủy"
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            padding: "5px 5px",
            marginBottom: "6px",
          }}
        >
          {titleReject}
        </h1>
        <p
          style={{
            fontSize: "13px",
            padding: "5px 5px",
            color: "var(--cl-gray)",
            fontFamily: "Montserrat ,sans-serif",
          }}
        >
          {textReject}
        </p>
      </Modal>
    </>
  );
};

export default ModalRejectOwners;

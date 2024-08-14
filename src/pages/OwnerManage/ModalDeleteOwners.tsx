import { Modal } from "antd";
import React from "react";
interface ModalDeleteOwnersProp {
  isOpenModalDeleteOwners: boolean;
  titleDelete: string | "";
  textComfirm: string | "";
  handleCloseModalDelete: () => void;
  handeClickDelete: () => void;
}
const ModalDeleteOwners: React.FC<ModalDeleteOwnersProp> = ({
  isOpenModalDeleteOwners,
  titleDelete,
  textComfirm,
  handleCloseModalDelete,
  handeClickDelete,
}) => {
  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        width={600}
        centered
        open={isOpenModalDeleteOwners}
        onOk={handeClickDelete}
        onCancel={handleCloseModalDelete}
        okText="Xóa"
        cancelText="Hủy bỏ"
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            padding: "5px 5px",
            marginBottom: "6px",
          }}
        >
          {titleDelete}
        </h1>
        <p
          style={{
            fontSize: "13px",
            padding: "5px 5px",
            color: "var(--cl-gray)",
            fontFamily: "Montserrat ,sans-serif",
          }}
        >
          {textComfirm}
        </p>
      </Modal>
    </>
  );
};

export default ModalDeleteOwners;

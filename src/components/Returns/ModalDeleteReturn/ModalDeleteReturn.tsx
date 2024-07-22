import { Modal } from "antd";
import React from "react";
import returnProduct from "../../../configs/return";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/errorHandler";
interface ModalDeleteProps {
  isOpenModalDelete: boolean;
  idDeleteReturn: string;
  onCloseModalDelete: () => void;
  getDataReturn: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalDeleteReturn: React.FC<ModalDeleteProps> = ({
  idDeleteReturn,
  isOpenModalDelete,
  onCloseModalDelete,
  setLoading,
  getDataReturn,
}) => {
  const clickDeleteReturn = async () => {
    setLoading(true);
    try {
      const res = await returnProduct.deleteReturn(idDeleteReturn);
      console.log("res", res.data);
      setLoading(false);
      toast.success("Đã xóa trả hàng thành công");
      getDataReturn();
      onCloseModalDelete();
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };
  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        width={600}
        centered
        open={isOpenModalDelete}
        onOk={clickDeleteReturn}
        onCancel={onCloseModalDelete}
        okText="Xóa"
        cancelText="Hủy bỏ"
      >
        <h1
          style={{
            fontSize: "30px",
            fontWeight: "bold",
            padding: "5px 10px",
            marginBottom: "6px",
          }}
        >
          Xóa hóa đơn trả hàng
        </h1>
        <p
          style={{
            fontSize: "13px",
            padding: "5px 10px",
            color: "var(--cl-gray)",
          }}
        >
          Bạn có chắc chắn muốn xóa Hóa đơn trả hàng này không?
        </p>
      </Modal>
    </>
  );
};

export default ModalDeleteReturn;

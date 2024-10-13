import { Modal } from "antd";
import React from "react";
import invoice from "../../../configs/invoice";
import { handleError } from "../../../utils/errorHandler";
import { toast } from "react-toastify";
interface ModalDeleteInvoicesProps {
  openModalDelete: boolean;
  idDelete: string;
  onCloseModal: () => void;
  getDataInvoices: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalDeleteInvoices: React.FC<ModalDeleteInvoicesProps> = ({
  openModalDelete,
  idDelete,
  onCloseModal,
  getDataInvoices,
  setLoading,
}) => {
  const handleClickDeleteCategory = async () => {
    setLoading(true);
    const dataId = idDelete;
    try {
      const res = await invoice.deleteInvoices(dataId); //@ts-ignore
      const msSuccess = res.message.text;
      onCloseModal();
      toast.success(msSuccess);
      await getDataInvoices();
      setLoading(false);
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
        open={openModalDelete}
        onOk={handleClickDeleteCategory}
        onCancel={() => onCloseModal()}
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
          Xóa hóa đơn
        </h1>
        <p
          style={{
            fontSize: "13px",
            padding: "5px 10px",
            color: "var(--cl-gray)",
          }}
        >
          Bạn có chắc chắn muốn xóa Hóa đơn này không ?
        </p>
      </Modal>
    </>
  );
};

export default ModalDeleteInvoices;

import { Modal } from "antd";
import React from "react";
import { handleError } from "../../../utils/errorHandler";
import customer from "../../../configs/customer";
import { toast } from "react-toastify";

interface ModalDeleteProps {
  openModalDelete: boolean;
  isIdDelete: string;
  setLoadingDelete: React.Dispatch<React.SetStateAction<boolean>>;
  onCloseModalDelete: () => void;
  getDataCustomers: () => void;
}
const ModalDeleteCustomer: React.FC<ModalDeleteProps> = ({
  isIdDelete,
  openModalDelete,
  onCloseModalDelete,
  setLoadingDelete,
  getDataCustomers,
}) => {
  const handleClickDeleteCustomer = async () => {
    const idDelete: string | null = isIdDelete;
    setLoadingDelete(true);
    try {
      const res = await customer.deleteCustomer(idDelete);
      if (res.code === 200) {
        const msSuccess = res.message.text;
        onCloseModalDelete();
        toast.success(msSuccess);
        await getDataCustomers();
        setLoadingDelete(false);
      }
    } catch (error) {
      handleError(error);
      setLoadingDelete(false);
    }
  };
  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        width={600}
        centered
        open={openModalDelete}
        onOk={handleClickDeleteCustomer}
        onCancel={onCloseModalDelete}
        okText="Xóa"
        cancelText="Hủy bỏ"
      >
        <h1
          style={{
            // fontFamily: "Arial",
            fontSize: "30px",
            fontWeight: "bold",
            padding: "5px 10px",
            marginBottom: "6px",
          }}
        >
          Xóa tài khoản thanh toán
        </h1>
        <p
          style={{
            fontSize: "13px",
            padding: "5px 10px",
            color: "var(--cl-gray)",
          }}
        >
          Bạn có chắc chắn muốn xóa Người dùng này không ?
        </p>
      </Modal>
    </>
  );
};

export default ModalDeleteCustomer;

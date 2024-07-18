import { Modal } from "antd";
import payments from "../../../configs/Payment";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/errorHandler";
interface ModalDeletePaymentProps {
  isOpenModalDetele: boolean;
  idDeletePayment: string;
  onCloseModal: () => void;
  getDataPayments: () => void;
  setLoadingData: React.Dispatch<React.SetStateAction<boolean>>;
}
const DeletePayment: React.FC<ModalDeletePaymentProps> = ({
  isOpenModalDetele,
  onCloseModal,
  idDeletePayment,
  getDataPayments,
  setLoadingData,
}) => {
  const clickDeleteCategory = async () => {
    const idDelete = idDeletePayment;
    setLoadingData(true);
    try {
      const res = await payments.deletePayment(idDelete);
      if (res.code === 200) {
        const msSuccess = res.message.text;
        onCloseModal();
        toast.success(msSuccess);
        await getDataPayments();
        setLoadingData(false);
      }
    } catch (error) {
      handleError(error);
    }
  };
  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        width={600}
        centered
        open={isOpenModalDetele}
        onOk={clickDeleteCategory}
        onCancel={onCloseModal}
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
            // fontFamily: "Montserrat ,sans-serif",
          }}
        >
          Bạn có chắc chắn muốn xóa Tài khoản này không ?
        </p>
      </Modal>
    </>
  );
};

export default DeletePayment;

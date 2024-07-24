import { Modal } from "antd";
import React from "react";
import { toast } from "react-toastify";
import { handleError } from "../../../utils/errorHandler";
import users from "../../../configs/users";
interface ModalDeleteUsersProp {
  openModalDelete: boolean;
  idDelete: string;
  onCloseModalDelete: () => void;
  getDataUsers: () => void;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}
const ModalDeleteUsers: React.FC<ModalDeleteUsersProp> = ({
  openModalDelete,
  idDelete,
  onCloseModalDelete,
  setLoading,
  getDataUsers,
}) => {
  const handleClickDeleteUsers = async () => {
    setLoading(true);
    const dataId = idDelete;
    try {
      const res = await users.deleteUsers(dataId);
      const msSuccess = res.message.text;
      onCloseModalDelete();
      toast.success(msSuccess);
      await getDataUsers();
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
        onOk={handleClickDeleteUsers}
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
          Xóa người dùng
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

export default ModalDeleteUsers;

import { Input, Modal } from "antd";
import React, { useRef, useState } from "react";
import { toast } from "react-toastify";
import customer from "../../../configs/customer";
import { handleError } from "../../../utils/errorHandler";
interface ModalsCustomerProps {
  isOpenPopupAddCustomers: boolean;
  handleOpenModalAddCustomer: () => void;
  getDataCustomers: () => void;
  setLoadingSearch: React.Dispatch<React.SetStateAction<boolean>>;
  setIsOpenPopupAddCustomers: React.Dispatch<React.SetStateAction<boolean>>;
  // setDataPayment: React.Dispatch<React.SetStateAction<any>>;
}
const ModalAddCustomers: React.FC<ModalsCustomerProps> = ({
  isOpenPopupAddCustomers,
  handleOpenModalAddCustomer,
  getDataCustomers,
  setLoadingSearch,
  setIsOpenPopupAddCustomers,
}) => {
  const nameRef = useRef<HTMLInputElement>(null);

  const [inputCustomer, setInputCustomer] = useState({
    full_name: "",
    phone: "",
  });
  const setHandleInputCustomer = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Kiểm tra nếu chỉnh sửa ô nhập số điện thoại
    if (name === "phone") {
      // Lọc và chỉ lấy các ký tự số
      const numericValue = value.replace(/[^0-9]/g, "");
      setInputCustomer({
        ...inputCustomer,
        [name]: numericValue,
      });
    } else {
      setInputCustomer({
        ...inputCustomer,
        [name]: value,
      });
    }
  };
  const clearInputCustomer = () => {
    setInputCustomer({
      full_name: "",
      phone: "",
    });
  };
  const handleClickAddCustomer = async () => {
    const dataCustomer = {
      full_name: inputCustomer.full_name,
      phone: inputCustomer.phone,
    };
    setLoadingSearch(true);
    try {
      const res = await customer.addDataCustomer(dataCustomer); //@ts-ignore
      if (res.code === 200) {
        //@ts-ignore
        const success = res.message.text;
        toast.success(success);
        clearInputCustomer();
        await getDataCustomers();
        setLoadingSearch(false);
        setIsOpenPopupAddCustomers(false);
      } else {
        setLoadingSearch(false);
      }
    } catch (error) {
      handleError(error);
      setIsOpenPopupAddCustomers(true);
      setLoadingSearch(false);
      if (nameRef.current) {
        nameRef.current.focus();
        nameRef.current.select();
      }
    }
  };
  return (
    <>
      <Modal
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        className="modalDialog-addITems"
        width={500}
        centered
        open={isOpenPopupAddCustomers}
        onOk={handleClickAddCustomer}
        onCancel={handleOpenModalAddCustomer}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Thêm khách hàng</h1>
        <div className="name-customer">
          <label htmlFor="">
            Tên khách hàng (<span>*</span>)
          </label>
          <Input
            placeholder="Nhập tên khách hàng"
            onChange={setHandleInputCustomer}
            name="full_name"
            value={inputCustomer.full_name}
            style={{ width: "280px", height: "40px" }}
          />
        </div>
        <div className="number-customer">
          <label htmlFor="" className="title-picture">
            Số điện thoại(<span>*</span>)
          </label>
          <div>
            <Input //@ts-ignore
              ref={nameRef}
              type="text"
              onChange={setHandleInputCustomer}
              name="phone"
              value={inputCustomer.phone}
              inputMode="numeric"
              placeholder="Nhập số điện thoại"
              style={{ width: "280px", height: "40px" }}
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ModalAddCustomers;

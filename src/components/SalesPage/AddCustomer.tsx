import { Modal } from "antd";
import React from "react";

const AddCustomer = () => {
  return (
    <>
      <Modal
        className="modalDialog-addITems"
        width={500}
        // height={500}
        centered
        open={isOpenPopups}
        onOk={clickAddItemCategory}
        onCancel={() => setIsOpenPopups(!isOpenPopups)}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Thêm khách hàng</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên khách hàng (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            //   onChange={setHandleInput}
            //   ref={nameRef}
          />
        </div>
        <div className="picture-item">
          <label htmlFor="" className="title-picture">
            Số điện thoại(<span>*</span>)
          </label>
          <input
            className="input-name-category"
            //   onChange={setHandleInput}
            //   ref={nameRef}
          />
        </div>
      </Modal>
    </>
  );
};

export default AddCustomer;

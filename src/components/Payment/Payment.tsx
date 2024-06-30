import React, { useEffect, useState } from "react";
import { Modal, Select } from "antd";
import sellProduct from "../../configs/sellProduct";
import { ToastContainer, toast } from "react-toastify";
import "../Payment/Payment.css";
import "../styles/valiables.css";

interface BankData {
  id: number;
  name: string;
  code: string;
  bin: string;
  shortName: string;
  logo: string;
  transferSupported: number;
  lookupSupported: number;
  short_name: string;
  support: number;
  isTransfer: number;
  swift_code: string;
}

interface BankOption {
  value: number;
  label: JSX.Element;
  bank_id: string;
  account_name: string;
}

const Payment = () => {
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [nameBanking, setNameBanking] = useState<BankData[]>([]);
  const [errorAddNameBanking, setErrorAddNameBanking] = useState({ error: "" });

  const handleOpenModal = () => {
    setIsOpenPopups(true);
  };

  const handleCloseModal = () => {
    setIsOpenPopups(false);
  };

  const [inputBanking, setInputBanking] = useState({
    bank_id: "",
    bank_name: "",
    number_bank: "",
    admin_bank: "",
  });

  const setHandleInputBanking = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "number_bank") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setInputBanking({
        ...inputBanking,
        [name]: numericValue,
      });
    } else if (name === "admin_bank") {
      setInputBanking({
        ...inputBanking,
        [name]: value.toUpperCase(),
      });
    } else {
      setInputBanking({
        ...inputBanking,
        [name]: value,
      });
    }
  };

  const clickAddUserBanking = async () => {
    const inputUserBanking = {
      bank_id: inputBanking.bank_id,
      account_no: inputBanking.number_bank,
      account_name: inputBanking.admin_bank,
      bank_name: inputBanking.bank_name,
      name: "Chuyển khoản",
    };

    try {
      const res = await sellProduct.postDataUserBanking(inputUserBanking);
      if (res.code === 200) {
        handleCloseModal();
        toast.success(`${res.message.text}`);
        setInputBanking({
          bank_id: "",
          number_bank: "",
          admin_bank: "",
          bank_name: "",
        });
        setErrorAddNameBanking({ error: "" });
      } else {
        setErrorAddNameBanking({ error: res.data.message.text });
        handleOpenModal();
      }
    } catch (error) {
      setIsOpenPopups(true);
      console.error("Error occurred while calling API:", error);
    }
  };

  const getNameBanking = async () => {
    try {
      const res = await sellProduct.getNameBank();
      if (res.code === "00") {
        setNameBanking(res.data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getNameBanking();
  }, []);

  const formatNameBanking: BankOption[] = nameBanking.map((item) => ({
    value: item.id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={item.logo}
          alt={item.shortName}
          style={{ width: 30, height: 30, marginRight: 10 }}
        />
        <span style={{ fontWeight: "bold" }}>{item.code}</span>{" "}
        {`-${item.shortName}`}
      </div>
    ),
    bank_id: item.bin,
    account_name: item.name,
  }));

  function onChange(value: number) {
    const selectedBank = nameBanking.find((bank) => bank.id === value);
    if (selectedBank) {
      const bin = selectedBank.bin;
      setInputBanking({
        ...inputBanking,
        bank_id: bin,
        bank_name: selectedBank.code,
      });
      console.log(`selected bin: ${bin}`);
      console.log(`value: ${value}`);
    }
  }

  function onSearch(val: string) {
    console.log("search:", val);
  }

  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <button onClick={handleOpenModal}>Thêm tài khoản ngân hàng</button>
      <Modal
        className="modalDialog-addItems"
        width={500}
        centered
        open={isOpenPopups}
        onOk={clickAddUserBanking}
        onCancel={handleCloseModal}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Thêm tài khoản</h1>
        <div className="name-bank bank-input-container">
          <label htmlFor="name_bank">Ngân hàng</label>
          <Select
            showSearch
            onSearch={onSearch}
            notFoundContent="không tìm thấy ngân hàng"
            placeholder="Chọn ngân hàng"
            optionFilterProp="label"
            onChange={onChange}
            style={{ width: 260 }}
            filterOption={(input, option) => {
              const labelValue = option?.label?.props?.children;
              if (typeof labelValue === "string") {
                return labelValue.toLowerCase().includes(input.toLowerCase());
              } else if (
                React.isValidElement(labelValue) &&
                typeof labelValue.props.children === "string"
              ) {
                return labelValue.props.children
                  .toLowerCase()
                  .includes(input.toLowerCase());
              }
              return false;
            }}
            options={formatNameBanking}
          />
        </div>
        <div className="number-bank bank-input-container">
          <label htmlFor="number_bank">Số tài khoản</label>
          <div>
            <input
              type="text"
              className="input-name-category"
              onChange={setHandleInputBanking}
              name="number_bank"
              value={inputBanking.number_bank}
              inputMode="numeric"
              pattern="[0-9]*"
              placeholder="Nhập số tài khoản"
            />
            {errorAddNameBanking && errorAddNameBanking.error && (
              <p className="error-message">{errorAddNameBanking.error}</p>
            )}
          </div>
        </div>
        <div className="admin-bank bank-input-container">
          <label htmlFor="admin_bank">Chủ tài khoản</label>
          <input
            placeholder="Nhập tên chủ tài khoản"
            className="input-name-category"
            onChange={setHandleInputBanking}
            name="admin_bank"
            value={inputBanking.admin_bank}
          />
        </div>
      </Modal>
    </>
  );
};

export default Payment;

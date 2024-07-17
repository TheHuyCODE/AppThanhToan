import React, { useEffect, useState } from "react";
import { Modal, Select, Space, Table, TableColumnsType } from "antd";
import sellProduct from "../../configs/sellProduct";
import { ToastContainer, toast } from "react-toastify";
import "../Payment/Payment.css";
import "../styles/valiables.css";
import HeaderPayment from "./HeaderPayment/HeaderPayment";
import { FaEye, FaTrash } from "react-icons/fa";
import { localPayment } from "../TableConfig/TableConfig";

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
interface RecordType {
  stt: number;
  barcode: string;
  created_date: string;
  full_name: string;
  customer: string;
  total_amount: number;
  key: string;
}
const Payment = () => {
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [nameBanking, setNameBanking] = useState<BankData[]>([]);
  const [dataPayment, setDataPayment] = useState([]);

  const [errorAddNameBanking, setErrorAddNameBanking] = useState({ error: "" });

  const handleOpenModal = () => {
    setIsOpenPopups(true);
  };
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên chủ khoản",
      dataIndex: "account_name",
      key: "account_name",
      align: "start",
    },
    {
      title: "Số tài khoản",
      dataIndex: "account_no",
      key: "account_no",
      align: "start",
      // width: 300,
    },
    {
      title: "Tên ngân hàng",
      dataIndex: "bank_name",
      key: "bank_name",
      // width: 300,
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <FaEye />
          </a>
          <a>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  const dataTable = dataPayment
    .filter((item: any) => item.type === true)
    .map((item: any, index: number) => ({
      stt: index + 1,
      id: item.id,
      key: item.id,
      name: item.name,
      account_name: item.account_name,
      account_no: item.account_no,
      bank_id: item.bank_id,
      bank_name: item.bank_name,
      store_id: item.store_id,
      template: item.template,
    }));

  console.log("dataPayment", dataTable);
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
  const getDataPayments = async () => {
    try {
      const res = await sellProduct.getInfoBank();
      if (res.code === 200) {
        const data = res.data.items;
        setDataPayment(data);
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getNameBanking();
    getDataPayments();
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
        <span style={{ fontWeight: "bold" }}>{item.code}</span> {`-${item.shortName}`}
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
      <div className="content">
        <div
          className="header"
          style={{
            display: "flex",
            alignItems: "center",
            border: "none",
            color: "white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <HeaderPayment />
        </div>

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
              notFoundContent="Không tìm thấy ngân hàng"
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
                  return labelValue.props.children.toLowerCase().includes(input.toLowerCase());
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
      </div>
      <div className="table-container">
        <Table columns={columns} dataSource={dataTable} locale={localPayment} pagination={false} />
        <div
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "10px",
            marginTop: "10px",
            padding: "10px",
          }}
        >
          {/* <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onChangeNumberPagination}
            defaultCurrent={1}
            total={totalInvoice}
          /> */}
          {/* <span
            className="total-items"
            style={{ color: "black" }}
          >{`${dataTable?.length} hóa đơn`}</span> */}
        </div>
      </div>
    </>
  );
};

export default Payment;

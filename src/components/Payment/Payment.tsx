import {
  Input,
  Modal,
  Pagination,
  Select,
  Space,
  Table,
  TableColumnsType,
} from "antd";
import React, { useEffect, useRef, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import payments from "../../configs/Payment";
import sellProduct from "../../configs/sellProduct";
import { handleError } from "../../utils/errorHandler";
import "../Payment/Payment.css";
import "../styles/valiables.css";
import { localPayment } from "../TableConfig/TableConfig";
import HeaderPayment from "./HeaderPayment/HeaderPayment";
import DeletePayment from "./ModalDeletePayment/DeletePayment";

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
  const [hiddenSelect, setHiddenSelect] = useState(true);

  const [idDeletePayment, setIdDeletePayment] = useState("");
  const [nameBanking, setNameBanking] = useState<BankData[]>([]);
  const [totalPage, setTotalPage] = useState(0); //@ts-ignore
  const [page, setPage] = useState(1);

  const [pageSize, setPageSize] = useState(10);
  const [dataPayment, setDataPayment] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorAddNameBanking, setErrorAddNameBanking] = useState({ error: "" });
  const [openModalDelete, setIsOpenModalDelete] = useState(false);
  const numberRef = useRef<HTMLInputElement>(null);
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
      align: "center",
      render: (record) => (
        <Space size="middle">
          <a>
            <FaTrash
              style={{ color: "red" }}
              onClick={() => deleteDataPayment(record)}
            />
          </a>
        </Space>
      ),
    },
  ];
  const deleteDataPayment = (record: any) => {
    console.log("record", record);
    setIsOpenModalDelete(true);
    setIdDeletePayment(record.id);
  };
  const onCloseModal = () => {
    setIsOpenModalDelete(!openModalDelete);
  };
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
  // console.log("dataPayment", dataTable);
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
  const clearInputAddPayment = () => {
    setInputBanking({
      bank_id: "",
      number_bank: "",
      admin_bank: "",
      bank_name: "",
    });
    setHiddenSelect(true);
  };
  const clickAddUserBanking = async () => {
    const inputUserBanking = {
      bank_id: inputBanking.bank_id,
      account_no: inputBanking.number_bank,
      account_name: inputBanking.admin_bank,
      bank_name: inputBanking.bank_name,
      name: "Chuyển khoản",
    };
    setLoading(true);
    try {
      const res = await sellProduct.postDataUserBanking(inputUserBanking);
      //@ts-ignore
      if (res.code === 200) {
        handleCloseModal(); //@ts-ignore
        const msSuccess = res.message.text;
        toast.success(msSuccess);
        clearInputAddPayment();
        setErrorAddNameBanking({ error: "" });
        await getDataPayments();
        setLoading(false);
      } else {
        setErrorAddNameBanking({ error: res.data.message.text });
        handleOpenModal();
      }
    } catch (error) {
      setIsOpenPopups(true);
      setLoading(false);
      handleError(error);
      if (numberRef.current) {
        numberRef.current.focus();
        numberRef.current.select();
      }
    }
  };

  const getNameBanking = async () => {
    try {
      const res = await sellProduct.getNameBank(); //@ts-ignore
      if (res.code === "00") {
        setNameBanking(res.data);
        await getDataPayments();
      }
    } catch (error) {
      handleError(error);
    }
  };
  const getDataPayments = async () => {
    setLoading(true);
    try {
      const res = await sellProduct.getInfoBank(); //@ts-ignore
      if (res.code === 200) {
        const data = res.data.items;
        const total = res.data.total;
        const revertPage = total - 1; // Perform subtraction here
        setTotalPage(revertPage);
        setLoading(false);
        setDataPayment(data);
      }
    } catch (error) {
      setLoading(true);
    }
  };
  useEffect(() => {
    getNameBanking();
    getDataPayments();
  }, []);
  const onShowSizeChange = (current: number, size: number) => {
    console.log("Current page:", current);
    console.log("Page size:", size);
    getDataPagination(current, size);
    setPage(current);
    setPageSize(size);
  };
  const onChangeNumberPagination = (current: number) => {
    console.log("Current page:", current);
    getDataPagination(current, pageSize);
    setPage(current);
  };
  const getDataPagination = async (current: number, size: number) => {
    setLoading(true);
    try {
      const res = await payments.getDataPaginationPayment(current, size);
      if (res.data) {
        const data = res.data.items;
        setDataPayment(data);
        setLoading(false);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  const formatNameBanking: BankOption[] = nameBanking.map((item) => ({
    value: item.id,
    label: (
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={item.logo}
          alt={item.shortName}
          style={{
            width: 45,
            height: 40,
            marginRight: 15,
            imageRendering: "crisp-edges",
          }}
        />
        <span style={{ fontWeight: "bold" }}>{item.code} &nbsp; </span>{" "}
        {`-  ${item.shortName}`}
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
        <h1
          style={{
            fontFamily: "var(--kv-font-sans-serif)",
            color: "var(--color-title)",
          }}
        >
          Quản lý phương thức thanh toán
        </h1>
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
          <HeaderPayment
            handleOpenModal={handleOpenModal}
            setDataPayment={setDataPayment}
            setLoadingSearch={setLoading}
          />
        </div>
        {/* Modal add payment */}
        <Modal
          className="modalDialog-addItems"
          okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
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
            <label htmlFor="name_bank">Ngân hàng:</label>
            <Select
              showSearch
              allowClear={hiddenSelect}
              onSearch={onSearch}
              notFoundContent="Không tìm thấy ngân hàng"
              placeholder="Chọn ngân hàng"
              optionFilterProp="children"
              onChange={onChange}
              style={{ width: 300, height: 40 }}
              filterOption={(input, option) => {
                const labelText = //@ts-ignore
                  option.label.props.children[1].props.children.join(" ");
                return labelText.toLowerCase().includes(input.toLowerCase());
              }}
              options={formatNameBanking}
            />
          </div>
          <div className="number-bank bank-input-container">
            <label htmlFor="number_bank">Số tài khoản:</label>
            <div>
              <Input //@ts-ignore
                ref={numberRef}
                type="text"
                // className="input-name-category"
                onChange={setHandleInputBanking}
                name="number_bank"
                value={inputBanking.number_bank}
                inputMode="numeric"
                pattern="[0-9]*"
                placeholder="Nhập số tài khoản"
                style={{ width: "300px", height: "40px" }}
              />
              {errorAddNameBanking && errorAddNameBanking.error && (
                <p className="error-message">{errorAddNameBanking.error}</p>
              )}
            </div>
          </div>
          <div className="admin-bank bank-input-container">
            <label htmlFor="admin_bank">Chủ tài khoản:</label>
            <Input
              placeholder="Nhập tên chủ tài khoản"
              // className="input-name-category"
              onChange={setHandleInputBanking}
              name="admin_bank"
              value={inputBanking.admin_bank}
              style={{ width: "300px", height: "40px" }}
            />
          </div>
        </Modal>
        <DeletePayment
          isOpenModalDetele={openModalDelete}
          onCloseModal={onCloseModal}
          idDeletePayment={idDeletePayment}
          getDataPayments={getDataPayments}
          setLoadingData={setLoading}
        />
      </div>
      <div className="table-container">
        <Table //@ts-ignore
          columns={columns}
          dataSource={dataTable}
          locale={localPayment}
          pagination={false}
          loading={loading}
        />
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
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onChangeNumberPagination}
            defaultCurrent={1}
            total={totalPage}
          />
          <span
            className="total-items"
            style={{ color: "black" }}
          >{`${totalPage} Tài khoản`}</span>
        </div>
      </div>
    </>
  );
};

export default Payment;

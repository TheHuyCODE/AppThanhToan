import { Space, Table, TableColumnsType } from "antd";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import owners from "../../configs/owner";
import TitleOwner from "./TilteOwner";
import HeaderContent from "../../components/HeaderComponent/HeaderContent";
import { localOwners } from "../../components/TableConfig/TableConfig";
import ErrorModal from "../../components/ErrorApi/ErrorApi";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import ModalAddOwners from "./ModalAddOwners";
import { handleError } from "../../utils/errorHandler";
import ModalDeleteOwners from "./ModalDeleteOwners";
import { format } from "date-fns";
import ModalModifyOwners from "./ModalModifyOwners";

interface RecordType {
  stt: number;
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
  created_date: string;
  key: string;
}
const Owner = () => {
  const titleSearch = "Tìm kiếm chủ cửa hàng";
  const nameButtonAdd = "Thêm chủ cửa hàng";
  const titleName = "Quản lý chủ cửa hàng";
  const titleDelete = "Xóa chủ sở hữu";
  const textComfirm =
    "Bạn có chắc chắn xóa chủ sở hữu này không? Nếu chủ sở hữu này bị xóa, tất cả thông tin và cửa hàng liên quan cũng sẽ bị xóa.";

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAddOwners, setIsModalAddOwners] = useState(false);
  const [isOpenModalDeleteOwners, setIsOpenModalDeleteOwners] = useState(false);
  const [isOpenModalModifyOwners, setIsOpenModalModifyOwners] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDataOwner, setIsDataOwner] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [idDeleteOwners, setIdDeleteOwners] = useState("");
  const [idModifyOwners, setIdModifyOwners] = useState("");
  const [nameOwners, setNameOwners] = useState("");
  const getDataOwners = async () => {
    setLoading(true);
    try {
      const res = await owners.getAll();
      const data = res.data.items;
      setIsDataOwner(data);
      setLoading(false);
      console.log("data", res.data);
    } catch (error) {
      setErrorMessage("An error occurred while fetching data."); // Đặt thông báo lỗi
      setIsModalVisible(true); // Hiển thị modal
      setLoading(false);
    }
  };
  const handleSearchOwners = () => {};
  const handleClickOpenModal = () => {
    setIsModalAddOwners(!isModalAddOwners);
  };
  const handleCloseModal = () => {
    setIsModalVisible(false); // Đóng modal
  };
  const handleClickLockOwners = async (is_active: boolean, id: string) => {
    setLoading(true);
    const data = {
      is_active: is_active,
    };
    try {
      const res = await owners.putLockOwners(data, id);
      console.log("res", res.data);
      const textSuccess = res.message.text;
      toast.success(textSuccess);
      setLoading(false);
      await getDataOwners();
    } catch (error) {
      setLoading(false);
      handleError(error);
    }
  };
  const handClickOpenModalDeleteOwners = (id: string) => {
    setIsOpenModalDeleteOwners(!isOpenModalDeleteOwners);
    setIdDeleteOwners(id);
  };
  const handClickOpenModalModifyOwners = (record: RecordType) => {
    setIsOpenModalModifyOwners(!isOpenModalModifyOwners);
    setIdModifyOwners(record.id);
    setNameOwners(record.full_name);
    console.log("111", record.full_name);
    console.log("111", record.id);
  };
  const handleCloseModalDelete = () => {
    setIsOpenModalDeleteOwners(!isOpenModalDeleteOwners);
  };
  const handleCloseModalModify = () => {
    setIsOpenModalModifyOwners(!isOpenModalModifyOwners);
  };
  const handleClickDeleteOwners = async () => {
    setLoading(true);
    try {
      const res = await owners.deleteOwners(idDeleteOwners);
      console.log("res", res.data);
      toast.success("Đã xóa Owners thành công!");
      await getDataOwners();
      setLoading(false);
      handleCloseModalDelete();
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getDataOwners();
  }, []);
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
      key: "full_name",
      align: "start",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "start",
      // width: 300,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      // width: 300,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      // width: 300,
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: boolean) => (
        <span
          style={{
            color: is_active ? "green" : "red",
            backgroundColor: is_active ? "var(--kv-success-200)" : "#d0b9b9",
            borderRadius: "8px",
            padding: "5px",
          }}
        >
          {is_active ? "Kích hoạt" : "Chưa kích hoạt"}
        </span>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaTrash
              style={{ color: "red" }}
              title="Xóa"
              onClick={() => handClickOpenModalDeleteOwners(record.id)}
            />
          </a>
          <a>
            <FaPencilAlt title="Sửa" onClick={() => handClickOpenModalModifyOwners(record)} />
          </a>
          {record.is_active ? (
            <a>
              <FaLock
                style={{ color: "black" }}
                title="Khóa"
                onClick={() => handleClickLockOwners(false, record.id)}
              />
            </a>
          ) : (
            <a>
              <FaLockOpen
                style={{ color: "black" }}
                title="Mở khóa"
                onClick={() => handleClickLockOwners(true, record.id)}
              />
            </a>
          )}
        </Space>
      ),
    },
  ];
  const dataTableOwners = isDataOwner.map((items: any, value: number) => ({
    stt: value + 1,
    full_name: items.full_name,
    email: items.email,
    phone: items.phone || "-",
    address: items.address || "-",
    id: items.id,
    key: items.id,
    is_active: items.is_active,
    created_date: format(new Date(items.created_date * 1000), "dd/MM/yyyy") || "-",
  }));
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <TitleOwner titleName={titleName} />
        <div className="header-customers">
          <HeaderContent
            tilteSearch={titleSearch}
            nameButtonAdd={nameButtonAdd}
            handleSearch={handleSearchOwners}
            handleClickOpenModal={handleClickOpenModal}
          />
        </div>
        <ErrorModal
          visible={isModalVisible}
          errorMessage={errorMessage}
          onClose={handleCloseModal}
        />
        <ModalAddOwners
          isModalAddOwners={isModalAddOwners}
          handleClickOpenModal={handleClickOpenModal}
          getDataOwners={getDataOwners}
        />
        <ModalDeleteOwners
          isOpenModalDeleteOwners={isOpenModalDeleteOwners}
          handleCloseModalDelete={handleCloseModalDelete}
          handeClickDelete={handleClickDeleteOwners}
          titleDelete={titleDelete}
          textComfirm={textComfirm}
        />
        <ModalModifyOwners
          isOpenModalModifyOwners={isOpenModalModifyOwners}
          nameOwners={nameOwners}
          handleCloseModalModify={handleCloseModalModify}
          idModifyOwners={idModifyOwners}
          setLoading={setLoading}
          getDataOwners={getDataOwners}
        />
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataTableOwners}
            locale={localOwners}
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
            {/* <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onChangeNumberPagination}
            defaultCurrent={1}
            total={totalPage}
          />
          <span className="total-items" style={{ color: "black" }}>{`${totalPage} Tài khoản`}</span> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Owner;

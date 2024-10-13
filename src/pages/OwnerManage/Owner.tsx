import { Space, Table, TableColumnsType } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { FaLock, FaLockOpen } from "react-icons/fa6";
import { toast, ToastContainer } from "react-toastify";
import ErrorModal from "../../components/ErrorApi/ErrorApi";
import HeaderContent from "../../components/HeaderComponent/HeaderContent";
import { localOwners } from "../../components/TableConfig/TableConfig";
import owners from "../../configs/owner";
import { handleError } from "../../utils/errorHandler";
import ModalAddOwners from "./ModalAddOwners";
import ModalDeleteOwners from "./ModalDeleteOwners";
import ModalModifyOwners from "./ModalModifyOwners";
import TitleOwner from "./TilteOwner";

import { IoMdCheckmark, IoMdClose } from "react-icons/io";
import ComponentSort from "../../components/UI/ComponentSort";
import ModalRejectOwners from "./ModalRejectOwners";

interface RecordType {
  stt: number;
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  is_active: boolean;
  created_date: string;
  status: number;
  key: string;
}
const Owner = () => {
  const titleSearch = "Tìm kiếm chủ cửa hàng";
  // const nameButtonAdd = "Thêm chủ cửa hàng";
  const titleName = "Quản lý chủ cửa hàng";
  const titleDelete = "Xóa chủ sở hữu";
  const titleReject = "Từ chối cấp tài khoản chủ sở hữu";
  const textComfirm =
    "Bạn có chắc chắn xóa chủ sở hữu này không? Nếu chủ sở hữu này bị xóa, tất cả thông tin và cửa hàng liên quan cũng sẽ bị xóa.";
  const textReject =
    "Bạn có chắc chắn từ chối phê duyêt tài khoản này không? Nếu tài khoản này bị từ chối, thì người dùng không thể đăng nhập.";
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalAddOwners, setIsModalAddOwners] = useState(false);
  const [isOpenModalDeleteOwners, setIsOpenModalDeleteOwners] = useState(false);
  const [isOpenModalRejectOwners, setIsOpenModalRejectOwners] = useState(false);

  const [isOpenModalModifyOwners, setIsOpenModalModifyOwners] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDataOwner, setIsDataOwner] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [idDeleteOwners, setIdDeleteOwners] = useState("");
  const [idRejectOwners, setIdRejectOwners] = useState("");
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
  const sortDataCustomer = async (colName: string, typeSort: string) => {
    setLoading(true);
    try {
      const res = await owners.sortDataOwners(colName, typeSort);
      const totalItems = res.data.items;
      setIsDataOwner(totalItems);
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
      handleError(error);
    }
  };

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
      //@ts-ignore
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

  const handleChangeStatusUserSuccess = async (record: any) => {
    setLoading(true);
    const data = {
      status: 1,
    };
    try {
      const res = await owners.putChangeStatusOwners(data, record.id);
      console.log("res", res.data);
      toast.success("Đã phê duyệt thành công!");
      await getDataOwners();
      setLoading(false);
      // handleCloseModalDelete();
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };
  const handClickOpenModalRejectOwner = (id: string) => {
    setIsOpenModalRejectOwners(!isOpenModalRejectOwners);
    setIdRejectOwners(id);
  };
  const handleChangeStatusUserReject = async () => {
    setIsOpenModalRejectOwners(!isOpenModalRejectOwners);
    setLoading(true);
    const data = {
      status: 2,
    };
    try {
      const res = await owners.putChangeStatusOwners(data, idRejectOwners);
      console.log("res", res.data);
      toast.success("Từ chối tài khoản thành công!");
      await getDataOwners();
      setLoading(false);
      // handleCloseModalDelete();
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };
  const handClickOpenModalModifyOwners = (record: RecordType) => {
    setIsOpenModalModifyOwners(!isOpenModalModifyOwners);
    setIdModifyOwners(record.id);
    setNameOwners(record.full_name);
  };
  const handleCloseModalReject = () => {
    setIsOpenModalRejectOwners(!isOpenModalRejectOwners);
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
      // title: "Họ và tên",
      title: (
        <ComponentSort
          title="Họ và tên"
          sortKey="full_name"
          sortDataCustomer={sortDataCustomer}
        />
      ),
      dataIndex: "full_name",
      key: "full_name",
      align: "start",
      // width: 150,
    },
    {
      title: (
        <ComponentSort
          title="Email"
          sortKey="email"
          sortDataCustomer={sortDataCustomer}
        />
      ),
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
      title: "Trạng thái đăng kí TK",
      dataIndex: "status",
      key: "status",
      render: (status: number) => {
        let color = "";
        let backgroundColor = "";

        switch (status) {
          case 0:
            color = "white";
            backgroundColor = "#FF7F24";
            break;
          case 1:
            color = "white";
            backgroundColor = "#00EE00"; // Light green background
            break;
          default:
            color = "white";
            backgroundColor = "#FF0000";
            // Light red background
            break;
        }

        return (
          <span
            style={{
              color: color,
              backgroundColor: backgroundColor,
              borderRadius: "10px",
              padding: "6px",
              fontSize: "12px",
              fontWeight: "600",
            }}
          >
            {status === 0
              ? "Chờ phê duyệt"
              : status === 1
              ? "Đã phê duyệt"
              : "Bị hủy"}
          </span>
        );
      },
    },

    {
      title: "Trạng thái người dùng",
      dataIndex: "is_active",
      key: "is_active",
      render: (is_active: boolean) => (
        <span
          style={{
            color: "white",
            backgroundColor: is_active ? "#00EE00" : "grey",
            borderRadius: "10px",
            padding: "6px",
            fontSize: "12px",
            fontWeight: "600",
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
          {record.status === 0 ? (
            <>
              <a>
                <IoMdCheckmark
                  style={{
                    color: "green",
                    fontSize: "20px",
                  }}
                  title="Đồng ý"
                  onClick={() => handleChangeStatusUserSuccess(record)}
                />
              </a>
              <a>
                <IoMdClose
                  style={{ color: "red", fontSize: "20px" }}
                  title="Từ chối"
                  onClick={() => handClickOpenModalRejectOwner(record.id)}
                />
              </a>
            </>
          ) : (
            <>
              <a>
                <FaTrash
                  style={{ color: "red" }}
                  title="Xóa"
                  onClick={() => handClickOpenModalDeleteOwners(record.id)}
                />
              </a>
              <a>
                <FaPencilAlt
                  title="Sửa"
                  onClick={() => handClickOpenModalModifyOwners(record)}
                />
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
            </>
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
    status: items.status,
    created_date:
      format(new Date(items.created_date * 1000), "dd/MM/yyyy") || "-",
  }));
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <TitleOwner titleName={titleName} />
        <div className="header-customers">
          <HeaderContent
            titleSearch={titleSearch}
            setLoadingSearch={setLoading}
            setIsDataOwner={setIsDataOwner}
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
        <ModalRejectOwners
          isOpenModalRejectOwners={isOpenModalRejectOwners}
          titleReject={titleReject}
          textReject={textReject}
          handleCloseModalReject={handleCloseModalReject}
          handleChangeStatusReject={handleChangeStatusUserReject}
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

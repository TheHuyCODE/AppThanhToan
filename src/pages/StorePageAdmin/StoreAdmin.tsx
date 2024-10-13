import { Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import HeaderContent from "../../components/HeaderComponent/HeaderContent";
import { localStore } from "../../components/TableConfig/TableConfig";
import store from "../../configs/store";
import TitleOwner from "../OwnerManage/TilteOwner";
import ModalModifyStore from "./ModalModifyStore";
import HeaderContentStore from "../../components/HeaderComponent/HeaderContentStore";

interface RecordType {
  stt: number;
  id: string;
  name: string;
  owner_name: string;
  phone: string;
  address: string;
  key: string;
}
const StoreAdmin = () => {
  const titleSearch = "Tìm kiếm cửa hàng";
  const titleName = "Quản lý cửa hàng";
  // const handleSearchStore = () => {};
  const [isDataStore, setIsDataStore] = useState([]);
  const [idDeleteStores, setIdDeleteStores] = useState("");
  const [isOpenModalModifyStores, setIsOpenModalModifyStores] = useState(false);
  const [loading, setLoading] = useState(false);
  // const handleClickOpenModal = () => {};
  const getDataStores = async () => {
    setLoading(true);
    try {
      const res = await store.getAllStoreAdmin();
      console.log("data", res.data.items);
      const data = res.data.items;
      setIsDataStore(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };
  const handleClickModify = (id: string) => {
    setIsOpenModalModifyStores(!isOpenModalModifyStores);
    setIdDeleteStores(id);
  };
  const handleCloseModalModify = () => {
    setIsOpenModalModifyStores(!isOpenModalModifyStores);
  };
  useEffect(() => {
    getDataStores();
  }, []);
  const columns: TableColumnsType<RecordType> = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên cửa hàng",
      dataIndex: "name",
      key: "name",
      align: "start",
    },
    {
      title: "Chủ cửa hàng",
      dataIndex: "owner_name",
      key: "owner_name",
      align: "start",
      // width: 300,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      align: "start",
      // width: 300,
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      // width: 300,
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaPencilAlt title="Sửa" onClick={() => handleClickModify(record.id)} />
          </a>
        </Space>
      ),
    },
  ];
  const dataTableStore = isDataStore?.map((items: any, value: number) => ({
    stt: value + 1,
    name: items.name || "-",
    owner_name: items.owner_name || "-",
    phone: items.phone || "-",
    address: items.address || "-",
    id: items.id,
    key: items.id,
  }));
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="content">
        <TitleOwner titleName={titleName} />
        <div className="header-customers">
          <HeaderContentStore
            titleSearch={titleSearch}
            //wtf ??
            // handleSearch={handleSearchStore}
            // handleClickOpenModal={handleClickOpenModal}
            setLoadingSearch={setLoading}
          />
        </div>
        <ModalModifyStore
          isOpenModalModifyStores={isOpenModalModifyStores}
          idDeleteStores={idDeleteStores}
          handleCloseModalModify={handleCloseModalModify}
          setLoading={setLoading}
          getDataStores={getDataStores}
        />
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataTableStore}
            locale={localStore}
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

export default StoreAdmin;

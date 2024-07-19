import { CiCircleRemove, CiSearch } from "react-icons/ci";
import {
  FaArrowDown,
  FaPencilAlt,
  FaTrash,
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
} from "react-icons/fa";
import "./CatalogManagement.css";
import "../styles/valiables.css";
import { IoIosAdd } from "react-icons/io";
import { Input, Select, Pagination } from "antd";
import { Space, Table, Tag } from "antd";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast, ToastContainer } from "react-toastify";
import category from "../../configs/category";
import { format, set } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
// import PopupAdditem from "../listitem/PopupAddItem";
import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "antd";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ChildrenCategory from "./Children_catagory";
import { useAuth } from "../auth/AuthContext";
import { localCategory, localCategorySeconds } from "../TableConfig/TableConfig";
import { AiOutlinePicture } from "react-icons/ai";
import { domain } from "../TableConfig/TableConfig";
import useDebounce from "../auth/useDebounce";
import Spinners from "../SpinnerLoading/Spinners";
import TextArea from "antd/es/input/TextArea";
import { handleError } from "../../utils/errorHandler";

const CatalogManagement = () => {
  // const domainLink = domain.domainLink;
  const { fetchDataCategoryChild } = useAuth();
  const nameRef = useRef(null);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [valueSearch, setValueSearch] = useState("");
  const debounceValue = useDebounce(valueSearch, 700);
  const [loading, setLoading] = useState(false);
  const [dataCategory, setDataCategory] = useState("");
  const [isOpenModalDetele, setIsOpenModalDelete] = useState(false);
  const [isOpenModalModify, setIsOpenModalModify] = useState(false);
  const [isDataCategory, setIsDataCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryChild, setSelectedCategoryChild] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [hiddenTitleChild, setHiddenTitleChild] = useState(false);
  const [hiddenTitleSecondsChild, setHiddenTitleSecondsChild] = useState(false);
  const [viewTableChildSecond, setViewTableChildSecond] = useState(false);
  const [viewTableChild, setViewTableChild] = useState(true);
  const [isDescribe, setIsDescribe] = useState("");
  const [isKeyChild, setIsKeyChild] = useState("");
  const [viewTable, setViewTable] = useState(true);
  const [totaCategory, setTotalCategory] = useState(0);
  //editing item
  const [editItem, setEditItem] = useState<any>();
  const [editDescription, setEditDescription] = useState<any>();

  const [deleteItem, setDeleteItem] = useState<any>();
  const handleSelectNameChildCategory = (nameChildCategory: string) => {
    setSelectedCategoryChild(nameChildCategory);
    console.log("nameChildCategory", nameChildCategory);
  };
  const handleSearchCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValueSearch(value);
    console.log("value", value);
  };

  const setHiddenThirdTitle = (hidden: boolean) => {
    setHiddenTitleSecondsChild(hidden);
    console.log("hiddenSecondsChild", hidden);
  };
  const setHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    console.log("value", value);
    setDataCategory(value);
    // change edititem name
    if (editItem) {
      setEditItem({ ...editItem, name: value });
    }
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("describe", e.target.value);
    const value = e.target.value;
    setIsDescribe(value);
    if (editDescription) {
      setEditDescription({
        ...editDescription,
        description: value,
      });
    }
  };

  const onDeleteCategories = (item: any) => {
    console.log("deleteCategories");
    setIsOpenModalDelete(!isOpenModalDetele);
    setDeleteItem(item);
  };
  // call api delete
  const clickDeleteCategory = async () => {
    const keyItem = deleteItem.key;
    setLoading(true);
    try {
      const res = await category.deleteCategory(keyItem);
      if (res.code === 200) {
        console.log("res:", res);
        const successMs = res.message.text;
        toast.success(successMs); // Fetch the updated data after deletion
        setIsOpenModalDelete(!isOpenModalDetele);
        await fetchDataCategory();
      } else {
        console.log("error:", res);
        toast.error("Error deleting category");
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    // clickDeleteCategory();
    console.log(deleteItem);
  }, [deleteItem]);
  //check number category
  const checkQuatifyItem = (record) => {
    console.log("number_children:", record.number_children);
    setHiddenTitleChild(false);
  };
  const onModifyCategories = (item: any) => {
    setIsOpenModalModify(!isOpenModalModify);
    setEditItem(item);
    setEditDescription(item);
    console.log("item", item.key);
    console.log("item", item.image_url);
  };
  const changeModifyCategory = async () => {
    //call api change
    const dataPutCategory = {
      name: editItem.name,
      description: editDescription.description,
      parent_id: null,
    };
    const idModifyItems = editItem.key;
    setLoading(true);
    try {
      const res = await category.putModifyCategory(idModifyItems, dataPutCategory);
      if (res.code === 200) {
        console.log("res", res);
        const msSuccess = res.message.text;
        toast.success(msSuccess); // Fetch the updated data after deletion
        setIsOpenModalModify(!isOpenModalModify);
        await fetchDataCategory();
      } else {
        console.log("res", res);
        toast.error("Error Modify category");
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Tên danh mục cấp 1",
      dataIndex: "name",
      editTable: true,
      key: "name",
      width: 200,
    },
    {
      title: "Số lượng danh mục cấp 2",
      dataIndex: "number_children",
      key: "number_children",
      align: "center",
      editTable: true,
      width: 250,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "description",
      key: "description",
      align: "center",
      editTable: true,
      width: 300,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
      editTable: true,
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      editTable: true,
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => onModifyCategories(record)}>
            <FaPencilAlt />
          </a>
          <a onClick={() => onDeleteCategories(record)}>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  const columnsWithClick = columns?.map((col, index) => {
    if (index < 4) {
      return {
        ...col,
        key: col.key || `column-${index}`,
        onCell: (record: any) => ({
          onClick: () => {
            checkQuatifyItem(record);
            const name = record.name;
            console.log(name);
            const keyChild = record.key;
            console.log("keyChild: ", keyChild);
            setSelectedCategory(name);
            setIsKeyChild(keyChild);
            setViewTable(false);
            fetchDataCategoryChild(keyChild);
          },
        }),
      };
    }
    return col;
  });
  //Clear value categories
  const clearInputs = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    setIsDescribe("");
  };
  const clickAddItemCategory = async (e: any) => {
    e.preventDefault();
    setIsOpenPopups(true);
    const userDataCategory = {
      name: dataCategory,
      description: isDescribe,
      parent_id: null,
    };
    setLoading(true);
    try {
      const res = await uploadApiImage.postAddItemCategory(userDataCategory);
      if (res.code == 200) {
        const successMs = res.message.text;
        await fetchDataCategory();
        toast.success(successMs);
        clearInputs();
        setIsOpenPopups(!isOpenPopups);
      } else {
        console.log("err");
        // setIsOpenPopups(true);
      }
    } catch (error) {
      handleError(error);
      setIsOpenPopups(isOpenPopups);
    }
    setLoading(false);
  };
  //show table child when clicked
  const showTableCategory = async () => {
    setViewTable(true);
    setHiddenTitleChild(true);
    setHiddenTitleSecondsChild(true);
    await fetchDataCategory();
  };
  const showTableChildCategory = () => {
    setViewTable(false);
    setHiddenTitleSecondsChild(true);
    setViewTableChildSecond(true);
    // setViewTableChild(true);
    fetchDataCategoryChild(isKeyChild);
  };
  useEffect(() => {
    // console.log("viewTableChildSecond", viewTableChildSecond);
    if (viewTableChildSecond) {
      setViewTableChild(!viewTableChild);
      console.log("viewTableChild", viewTableChild);
    }
  }, [viewTableChildSecond]);
  const showTableChildSecondCategory = () => {};
  const fetchDataCategory = async () => {
    const res = await category.getAll();
    const totalCategory = res.data.total;
    setIsDataCategory(res.data);
    setTotalCategory(totalCategory);
  };
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
      const res = await category.getDataCategoryPagination(current, size);
      if (res.data) {
        const data = res.data;
        setIsDataCategory(data);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);
  const fetchDataSearchCategory = async () => {
    setLoading(true);
    const res = await category.getDataSearchNameCategory(debounceValue);
    if (res.data) {
      setIsDataCategory(res.data);
    } else {
      console.log("Error:");
      setLoading(false);
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchDataSearchCategory();
  }, [debounceValue]);
  const dataTable = isDataCategory.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    name: item.name,
    number_children: item.number_children,
    description: item.description,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
    image_url: item.image_url,
  }));
  return (
    <div className="content">
      <ToastContainer closeOnClick autoClose={5000} />
      <div>
        <a
          className="title-category"
          onClick={showTableCategory}
          style={{ color: "rgb(3,23,110)" }}
        >
          Quản lí danh mục{" "}
        </a>
        <a
          hidden={hiddenTitleChild}
          className="title-category"
          onClick={showTableChildCategory}
          style={{ color: "rgb(3,23,110)" }}
        >
          {!hiddenTitleChild && <IoIosArrowForward style={{ color: "black", fontSize: 15 }} />}
          {selectedCategory}
        </a>
        <a
          hidden={hiddenTitleSecondsChild}
          className="title-category"
          onClick={showTableChildSecondCategory}
          style={{ color: "rgb(3,23,110)", pointerEvents: "none" }}
        >
          {!viewTable && <IoIosArrowForward style={{ color: "black", fontSize: 15 }} />}
          {selectedCategoryChild}
        </a>
      </div>
      <div className="header">
        <div className="header-top">
          <div className="header-top right">
            {viewTable && (
              <>
                <CiSearch
                  style={{
                    position: "absolute",
                    top: "7px",
                    left: "5px",
                    transform: "translateY(5%)",
                    fontSize: "20px",
                  }}
                />
                <input
                  type="text"
                  placeholder="Tìm danh mục"
                  className="search-categories"
                  onChange={handleSearchCategory}
                />
              </>
            )}
          </div>
          <div className="header-btn">
            {viewTable && (
              <>
                <Button type="primary" style={{ backgroundColor: "var( --kv-success)" }}>
                  Hướng dẫn sử dụng
                </Button>
                <Button
                  type="primary"
                  onClick={() => setIsOpenPopups(!isOpenPopups)}
                  style={{ backgroundColor: "var( --kv-success)" }}
                >
                  Thêm danh mục cấp 1
                </Button>
              </>
            )}
            {/* modal add catalog */}
            <Modal
              className="modalDialog-addITems"
              width={500}
              // height={500}
              okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
              centered
              open={isOpenPopups}
              onOk={clickAddItemCategory}
              onCancel={() => setIsOpenPopups(false)}
              okText="Thêm"
              cancelText="Hủy bỏ"
            >
              <h1 className="title-addItem">Thêm danh mục cấp 1</h1>
              <div className="name-item">
                <label htmlFor="">
                  Tên danh mục 1 (<span>*</span>)
                </label>
                <input
                  className="input-name-category"
                  placeholder="Tên danh mục cấp 1"
                  onChange={setHandleInput}
                  ref={nameRef}
                />
              </div>
              <div className="decribe-category">
                <label htmlFor="" className="title-picture">
                  Mô tả danh mục cấp 1(<span>*</span>)
                </label>
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={onChangeInput}
                  placeholder="Chú thích danh mục"
                  style={{ height: 100, width: 260 }}
                  value={isDescribe}
                />
              </div>
            </Modal>

            {/* Modal Modify product */}
            <Modal
              className="modalDialog-addITems"
              width={500}
              okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
              // height={500}
              centered
              open={isOpenModalModify}
              onOk={changeModifyCategory}
              onCancel={() => setIsOpenModalModify(!isOpenModalModify)}
              okText="Sửa đổi"
              cancelText="Hủy bỏ"
            >
              <h1 className="title-addItem">Sửa danh mục cấp 1</h1>
              <div className="name-item">
                <label htmlFor="">
                  Tên danh mục 1 (<span>*</span>)
                </label>
                <input
                  className="input-name-category"
                  onChange={setHandleInput}
                  value={editItem?.name || ""}
                />
              </div>
              <div className="decribe-category">
                <label htmlFor="" className="title-picture">
                  Mô tả danh mục cấp 1(<span>*</span>)
                </label>
                <TextArea
                  showCount
                  maxLength={100}
                  onChange={onChangeInput}
                  value={editDescription?.description || ""}
                  placeholder="Chú thích danh mục"
                  style={{ height: 100, width: 260 }}
                />
              </div>
            </Modal>
            {/* Modal Delete product */}

            <Modal
              okButtonProps={{ style: { backgroundColor: "red" } }}
              width={600}
              centered
              open={isOpenModalDetele}
              onOk={clickDeleteCategory}
              onCancel={() => setIsOpenModalDelete(!isOpenModalDetele)}
              okText="Xóa"
              cancelText="Hủy bỏ"
            >
              <h1
                style={{
                  fontFamily: "Arial",
                  fontSize: "30px",
                  fontWeight: "bold",
                  padding: "5px 10px",
                  marginBottom: "6px",
                }}
              >
                Xóa sản phẩm
              </h1>
              <p
                style={{
                  fontSize: "13px",
                  padding: "5px 5px",
                  color: "var(--cl-gray)",
                  fontFamily: "Montserrat ,sans-serif",
                }}
              >
                Bạn có chắc chắn muốn xóa danh mục này? Nếu xóa danh mục, tất cả danh mục cấp con và
                sản phẩm đã link với danh mục sẽ bị xóa.
              </p>
            </Modal>
          </div>
        </div>
        {viewTable ? (
          <div className="table-container">
            {loading ? (
              <Spinners loading={loading} />
            ) : (
              <>
                <Table
                  columns={columnsWithClick}
                  dataSource={dataTable}
                  locale={localCategorySeconds}
                  pagination={false}
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
                    total={totaCategory}
                  />
                  <span
                    className="total-items"
                    style={{ color: "black" }}
                  >{`${dataTable?.length} danh mục cấp 1`}</span>
                </div>
              </>
            )}
          </div>
        ) : (
          <ChildrenCategory
            isKeyChild={isKeyChild}
            fetchDataCategory={fetchDataCategory}
            onCategoryChange={handleSelectNameChildCategory}
            onHiddenTitleChild={setHiddenThirdTitle}
            viewTableChildSecond={viewTableChildSecond}
            viewTableChild={viewTableChild}
            setViewTableChild={setViewTableChild}
          />
        )}
      </div>
      {/* {isOpenPopups && <PopupAdditem onClose={handleClose} />} */}
    </div>
  );
};
export default CatalogManagement;

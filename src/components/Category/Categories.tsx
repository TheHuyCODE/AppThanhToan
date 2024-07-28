import { CiSearch } from "react-icons/ci";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "./CatalogManagement.css";
import "../styles/valiables.css";

import { Pagination } from "antd";
import { Space, Table } from "antd";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast, ToastContainer } from "react-toastify";
import category from "../../configs/category";
import { format } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
// import PopupAdditem from "../listitem/PopupAddItem";
import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "antd";
import ChildrenCategory from "./Children_catagory";
import { useAuth } from "../auth/AuthContext";
import { localCategorySeconds } from "../TableConfig/TableConfig";
import useDebounce from "../auth/useDebounce";
import TextArea from "antd/es/input/TextArea";
import { handleError } from "../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import TitleCategories from "./TitleCategories";
interface CategoriesProp {
  selectedCategory: string;
  selectedChildCategory: string;
  setSelectedCategory: (name: string) => void;
  setSelectedChildCategory: (name: string) => void;
}
const Categories: React.FC<CategoriesProp> = ({
  selectedCategory,
  selectedChildCategory,
  setSelectedChildCategory,
  setSelectedCategory,
}) => {
  const navigate = useNavigate();
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
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isDescribe, setIsDescribe] = useState("");
  const [isKeyChild, setIsKeyChild] = useState("");
  const [totaCategory, setTotalCategory] = useState(0);
  //editing item
  const [editItem, setEditItem] = useState<any>();
  const [editDescription, setEditDescription] = useState<any>();
  const [deleteItem, setDeleteItem] = useState<any>();
  const showTableCategory = async () => {
    setSelectedChildCategory("");
    localStorage.setItem("selectedCategory", "");
    localStorage.setItem("selectedChildCategory", "");
    navigate("/admin/categories");
    await fetchDataCategory();
  };
  //Clear value categories
  const clearInputs = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    setIsDescribe("");
  };
  const showTableChildCategory = () => {
    setSelectedChildCategory("");
  };
  const handleSearchCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValueSearch(value);
    console.log("value", value);
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
    const idDelete = item.key;
    setIsOpenModalDelete(!isOpenModalDetele);
    setDeleteItem(idDelete);
  };
  // call api delete
  const clickDeleteCategory = async () => {
    const keyItem = deleteItem;
    setLoading(true);
    try {
      const res = await category.deleteCategory(keyItem);
      if (res.code === 200) {
        console.log("res:", res);
        const successMs = res.message.text;
        toast.success(successMs); // Fetch the updated data after deletion
        setIsOpenModalDelete(!isOpenModalDetele);
        await fetchDataCategory();
        setLoading(false);
      } else {
        console.log("error:", res);
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };

  //check number category

  const onModifyCategories = (item: any) => {
    setIsOpenModalModify(!isOpenModalModify);
    setEditItem(item);
    setEditDescription(item);
  };

  const changeModifyCategory = async () => {
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
        const msSuccess = res.message.text;
        toast.success(msSuccess); // Fetch the updated data after deletion
        setIsOpenModalModify(!isOpenModalModify);
        await fetchDataCategory();
        setLoading(false);
        clearInputs();
      } else {
        console.log("res", res);
        toast.error("Error Modify category");
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
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
      align: "center",
      // width: 250,
    },
    {
      title: "Số lượng danh mục cấp 2",
      dataIndex: "number_children",
      key: "number_children",
      align: "center",
      editTable: true,
      // width: 250,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "description",
      key: "description",
      align: "center",
      editTable: true,
      // width: 300,
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
            const name = record.name;

            const keyChild = record.key;

            localStorage.setItem("keyCategories", keyChild);
            nagigateSubCategories(record);
            setSelectedCategory(name);
            setIsKeyChild(keyChild);

            fetchDataCategoryChild(keyChild);
          },
        }),
      };
    }
    return col;
  });
  const nagigateSubCategories = (record: any) => {
    if (record) {
      navigate(`/admin/categories/${record.key}`);
    } else {
      navigate("/admin/categories");
    }
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

  const fetchDataCategory = async () => {
    setLoading(true);
    try {
      const res = await category.getAll();
      const totalCategory = res.data.total;
      setIsDataCategory(res.data);
      setTotalCategory(totalCategory);
      setLoading(false);
    } catch (err) {
      handleError(err);
      setLoading(false);
    }
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
  useEffect(() => {
    fetchDataCategory();
  }, []);
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
      <TitleCategories
        selectedCategory={selectedCategory}
        selectedChildCategory={selectedChildCategory}
        showTableCategory={showTableCategory}
        showTableChildCategory={showTableChildCategory}
      />
      <div className="header-customers">
        <div className="header-left">
          <div className="header-left-top">
            <div className="search-product" style={{ display: "flex", position: "relative" }}>
              <CiSearch
                style={{
                  position: "absolute",
                  top: "6px",
                  left: "5px",
                  transform: "translateY(5%)",
                  fontSize: "20px",
                  color: "var(--cl-dark)",
                }}
              />
              <input
                type="text"
                placeholder="Tìm danh mục"
                className="search-categories"
                onChange={handleSearchCategory}
              />
            </div>
          </div>
        </div>
        <div className="header-right">
          <>
            <Button type="primary" style={{ backgroundColor: "var( --kv-success)", height: 35 }}>
              Hướng dẫn sử dụng
            </Button>
            <Button
              type="primary"
              onClick={() => setIsOpenPopups(!isOpenPopups)}
              style={{ backgroundColor: "var( --kv-success)", height: 35 }}
            >
              Thêm danh mục cấp 1
            </Button>
          </>
        </div>
      </div>
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
            placeholder="Chú thích danh mục"
            style={{ height: 100, width: 260 }}
            value={editDescription?.description || ""}
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
            fontSize: "30px",
            fontWeight: "bold",
            padding: "5px 5px",
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
          Bạn có chắc chắn muốn xóa danh mục này? Nếu xóa danh mục, tất cả danh mục cấp con và sản
          phẩm đã link với danh mục sẽ bị xóa.
        </p>
      </Modal>
      {/* {viewTable ? ( */}
      <div className="table-container">
        <Table
          columns={columnsWithClick}
          dataSource={dataTable}
          locale={localCategorySeconds}
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
            total={totaCategory || 0}
          />
          <span className="total-items" style={{ color: "black" }}>{`${
            dataTable?.length || 0
          } danh mục cấp 1`}</span>
        </div>
      </div>
    </div>
  );
};
export default Categories;

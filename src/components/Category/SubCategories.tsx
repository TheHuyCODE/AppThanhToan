import React, { useEffect, useRef, useState } from "react";
import { Table, Space, Button, Modal, Pagination } from "antd";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "./Children_category.css";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast, ToastContainer } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import category from "../../configs/category";
import { format } from "date-fns";
import { useAuth } from "../auth/AuthContext";
import { localCategorySeconds } from "../TableConfig/TableConfig";
import useDebounce from "../auth/useDebounce";
import Spinners from "../SpinnerLoading/Spinners";
import TextArea from "antd/es/input/TextArea";
import { handleError } from "../../utils/errorHandler";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import TitleCategories from "./TitleCategories";
interface SubCategoriesProp {
  selectedCategory: string;
  selectedChildCategory: string;
  setSelectedCategory: (name: string) => void;
  setSelectedChildCategory: (name: string) => void;
}
const SubCategories: React.FC<SubCategoriesProp> = ({
  selectedCategory,
  selectedChildCategory,
  setSelectedChildCategory,
  setSelectedCategory,
}) => {
  const params = useParams<{ idCategories: string }>();
  const idCategories: string | undefined = params.idCategories;
  const nameRef = useRef(null);
  const { isResDataChild, setIsResDataChild, fetchDataCategoryChild } = useAuth();
  const [isOpenPopupChild, setIsOpenPopupChild] = useState(false);
  const [isInputCategoryChild, setIsInputCategoryChild] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [isPreviewImageChild, setIsPreviewImageChild] = useState("");
  const [isValueSearchChild, setIsValueSearchChild] = useState("");
  const debounceValue = useDebounce(isValueSearchChild, 700);
  const [isOpenModalDeleteChild, setIsOpenModalDeleteChild] = useState(false);
  const [isOpenModalModifyChild, setIsOpenModalModifyChild] = useState(false);
  const [isDescription, setIsDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [idDeleteItemsChild, setIdDeleteItemsChild] = useState<any>();
  const [modifyItem, setModifyItem] = useState<any>();
  const [isInputDataCategoryTwo, setIsInputDataCategoryTwo] = useState<any>();
  const navigate = useNavigate();
  const showTableCategory = () => {
    navigate("/admin/categories/");
    setSelectedCategory("");
    setSelectedChildCategory("");
    localStorage.setItem("selectedCategory", "");
    localStorage.setItem("selectedChildCategory", "");
  };
  const showTableChildCategory = () => {
    navigate(`/admin/categories/${idCategories}`);
    setSelectedChildCategory("");
    localStorage.setItem("selectedChildCategory", "");
  };
  const handleSearchCategory = (e: any) => {
    const value = e.target.value.trim();
    setIsValueSearchChild(value);
  };
  const clearInputChildren = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    setIsDescription("");
  };
  const openModalChildSecond = () => {
    setIsOpenPopupChild(!isOpenPopupChild);
  };
  // Add items category
  const clickAddItemCategoryChild = async (event: any) => {
    event.preventDefault();
    const userDataCategoryChild = {
      name: isInputCategoryChild,
      description: isDescription,
      parent_id: idCategories,
    };
    setLoading(true);
    try {
      const res = await uploadApiImage.postAddItemCategoryChild(userDataCategoryChild);
      if (res.code === 200) {
        const successMs = res.message.text;
        toast.success(successMs);
        setIsOpenPopupChild(!isOpenPopupChild);
        await fetchDataCategoryChild(idCategories);
        clearInputChildren();
      } else {
        const errorMessage = res.data.message.text;
        toast.error(errorMessage);
        setIsOpenPopupChild(true);
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };

  const onDeleteCategories = (items: any) => {
    setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
    setIdDeleteItemsChild(items);
  };
  //Delete items child category
  const clickDeleteCategoryChild = async () => {
    const keyItemChild = idDeleteItemsChild.key;
    setLoading(true);
    if (keyItemChild) {
      const res = await category.deleteCategoryChild(keyItemChild);
      if (res.code === 200) {
        console.log("res:", res);
        setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
        toast.success("Đã xóa sản phẩm cấp 2 thành công");
        // await fetchDataCategory();
        await fetchDataCategoryChild(idCategories);
        setLoading(false);
      } else {
        console.log("error:", res);
        setIsOpenModalDeleteChild(isOpenModalDeleteChild);
        setLoading(false);
      }
    }
  };
  //Modify items child category
  const changeModifyCategoryChild = async () => {
    const dataPutCategoryChild = {
      name: modifyItem.name,
      description: isInputDataCategoryTwo.description,
      parent_id: idCategories,
    };
    const idModifyItemsChild = modifyItem.key;
    setLoading(true);
    try {
      const res = await category.putModifyCategoryChild(idModifyItemsChild, dataPutCategoryChild);
      if (res.code === 200) {
        console.log("res", res);
        const messSuccess = res.message.text;
        toast.success(messSuccess);
        await fetchDataCategoryChild(idCategories);
        setIsOpenModalModifyChild(!isOpenModalModifyChild);
        clearInputChildren();
      } else {
        setLoading(false);
      }
    } catch (error) {
      handleError(error);
    }
    setLoading(false);
  };
  const onModifyCategories = (record: any) => {
    setIsOpenModalModifyChild(!isOpenModalModifyChild);
    setModifyItem(record);
    setIsInputDataCategoryTwo(record);
  };
  //Get input values and file images ChildrenCategory
  const setHandleInput = (event: any) => {
    const value = event.target.value;
    setIsInputCategoryChild(value);
    if (modifyItem) {
      setModifyItem({ ...modifyItem, name: value });
    }
  };
  //Get list items children category
  const dataTableChild = isResDataChild.items?.map((item, index: number) => ({
    stt: index + 1,
    key: item.id,
    name: item.name,
    number_children: item.number_children,
    description: item.description,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
  }));
  //Data table categories
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Tên danh mục cấp 2",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 250,
    },
    {
      title: "Số lượng danh mục cấp 3",
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
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
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
  //Set with click table
  const columnsWithClick = columns?.map((col, index) => {
    if (index < 4) {
      return {
        ...col,
        onCell: (record: any) => ({
          onClick: () => {
            const name = record.name;
            nagigateShirtSubCategories(record);
            setSelectedChildCategory(name);
          },
        }),
      };
    }
    return col;
  });
  const nagigateShirtSubCategories = (record: any) => {
    if (record) {
      navigate(`/admin/categories/view/${record.key}`);
    }
  };
  const onChangeInputChild = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const value = e.target.value;
    setIsDescription(value);
    if (isInputDataCategoryTwo) {
      setIsInputDataCategoryTwo({
        ...isInputDataCategoryTwo,
        description: value,
      });
    }
  };
  const onShowSizeChange = (current: number, size: number) => {
    getDataPagination(current, size);
    setPage(current);
    setPageSize(size);
  };
  const onChangeNumberPagination = (current: number) => {
    console.log("Current page:", current);
    // getDataPagination(current, pageSize);
    setPage(current);
  };
  const getDataPagination = async (current: number, size: number) => {
    // setLoading(true);
    try {
      const res = await category.getDataCategoryPaginationChild(idCategories, current, size);
      if (res.data) {
        const data = res.data;
        setIsResDataChild(data);
      } else {
        console.log("err");
      }
    } catch (error) {
      handleError(error);
      // console.log("err", err);
    }
  };
  //check state category

  const fetchDataSearchCategory = async () => {
    setLoading(true);
    const res = await category.getDataSearchNameChildCategory(idCategories, debounceValue);
    if (res.code === 200) {
      setIsResDataChild(res.data);
      console.log("object 11111", res.data);
      setLoading(false);
    } else {
      console.log("Error:");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataSearchCategory();
  }, [debounceValue]);
  return (
    <>
      <div className="content">
        <ToastContainer closeOnClick autoClose={5000} />
        <TitleCategories
          showTableCategory={showTableCategory}
          selectedCategory={selectedCategory}
          selectedChildCategory={selectedChildCategory}
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
                  placeholder="Tìm danh mục cấp 2"
                  className="search-categories"
                  onChange={handleSearchCategory}
                />
              </div>
            </div>
          </div>
          <div className="header-right">
            <Button
              type="primary"
              onClick={openModalChildSecond}
              style={{ backgroundColor: "var( --kv-success)" }}
            >
              Thêm danh mục cấp 2
            </Button>
          </div>
        </div>
        <div className="table-container">
          <Table
            columns={columnsWithClick}
            dataSource={dataTableChild}
            locale={localCategorySeconds}
            loading={loading}
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
              total={isResDataChild.total || 0}
            />
            <span className="total-items" style={{ color: "black" }}>{`${
              dataTableChild?.length || 0
            } danh mục cấp 2`}</span>
          </div>
        </div>
      </div>

      {/* Modal add child category */}
      <Modal
        className="modalDialog-addITems"
        width={500}
        // height={500}
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        centered
        open={isOpenPopupChild}
        onOk={clickAddItemCategoryChild}
        onCancel={() => setIsOpenPopupChild(!isOpenPopupChild)}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Thêm danh mục cấp 2</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên danh mục 2 (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            placeholder="Tên danh mục cấp 2"
            onChange={setHandleInput}
            ref={nameRef}
          />
        </div>
        <div className="decribe-category">
          <label htmlFor="" className="title-picture">
            Mô tả danh mục cấp 2(<span>*</span>)
          </label>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChangeInputChild}
            placeholder="Chú thích danh mục"
            style={{ height: 100, width: 260 }}
            value={isDescription}
          />
        </div>
      </Modal>
      {/* Modal delete child category */}
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        width={600}
        centered
        open={isOpenModalDeleteChild}
        onOk={clickDeleteCategoryChild}
        onCancel={() => setIsOpenModalDeleteChild(!isOpenModalDeleteChild)}
        okText="Xóa"
        cancelText="Hủy bỏ"
      >
        <h1
          style={{
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
          Bạn có chắc chắn muốn xóa danh mục này? Nếu xóa danh mục, tất cả danh mục cấp con và sản
          phẩm đã link với danh mục sẽ bị xóa.
        </p>
      </Modal>
      {/* Modal modify child category */}
      <Modal
        className="modalDialog-addITems"
        width={500}
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        centered
        open={isOpenModalModifyChild}
        onOk={changeModifyCategoryChild}
        onCancel={() => setIsOpenModalModifyChild(!isOpenModalModifyChild)}
        okText="Sửa đổi"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Sửa danh mục cấp 2</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên danh mục 2 (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            onChange={setHandleInput}
            value={modifyItem?.name || ""}
          />
        </div>
        <div className="decribe-category">
          <label htmlFor="" className="title-picture">
            Mô tả danh mục cấp 2(<span>*</span>)
          </label>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChangeInputChild}
            placeholder="Chú thích danh mục"
            style={{ height: 100, width: 260 }}
            value={isInputDataCategoryTwo?.description || ""}
          />
        </div>
      </Modal>
    </>
  );
};

export default SubCategories;

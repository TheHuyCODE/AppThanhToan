import { Button, Modal, Pagination, Space, Table } from "antd";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useAuth } from "../auth/AuthContext";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast, ToastContainer } from "react-toastify";
import { localCategoryThirds } from "../TableConfig/TableConfig";
import category from "../../configs/category";
import useDebounce from "../auth/useDebounce";
import TextArea from "antd/es/input/TextArea";
import { useNavigate, useParams } from "react-router-dom";
import TitleCategories from "./TitleCategories";
import { handleError } from "../../utils/errorHandler";
interface shirtSubCategoriesProp {
  selectedCategory: string;
  selectedChildCategory: string;
  setSelectedCategory: (name: string) => void;
  setSelectedChildCategory: (name: string) => void;
}
const ShirtSubCategories: React.FC<shirtSubCategoriesProp> = ({
  selectedCategory,
  selectedChildCategory,
  setSelectedCategory,
  setSelectedChildCategory,
}) => {
  const nameRef = useRef(null);
  const params = useParams<{ idShirtCategories: string }>();
  const idCategories: string | undefined = params.idShirtCategories;
  const { isResDataChildSeconds, setIsResDataChildSeconds, fetchDataCategorySecondChild } =
    useAuth();
  const [isInputCategoryChild, setIsInputCategoryChild] = useState("");
  const [isDescribeThree, setIsDescribeThree] = useState("");
  const [isValueSearchChild, setIsValueSearchChild] = useState("");
  const debounceValue = useDebounce(isValueSearchChild, 700);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isOpenModalAddCategory, setIsOpenModalAddCategory] = useState(false);
  const [isOpenModalModifyChild, setIsOpenModalModifyChild] = useState(false);
  const [isOpenModalDeleteChild, setIsOpenModalDeleteChild] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modifyItem, setModifyItem] = useState<any>();
  const [decriptionModifyCategoryThird, setDecriptionModifyCategoryThird] = useState<any>();
  const [idDeleteItemsChild, setIdDeleteItemsChild] = useState<any>();
  const [isKeyChildThree, setIsKeyChildThree] = useState("");
  const keyChild = localStorage.getItem("keyCategories");
  const navigate = useNavigate();
  const clearInputChildren = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    setIsDescribeThree("");
  };
  const showTableCategory = () => {
    navigate("/admin/categories");
    setSelectedCategory("");
    setSelectedChildCategory("");
    localStorage.setItem("selectedCategory", "");
    localStorage.setItem("selectedChildCategory", "");
  };
  const showTableChildCategory = () => {
    navigate(`/admin/categories/${keyChild}`);
    setSelectedChildCategory("");
    localStorage.setItem("selectedChildCategory", "");
  };
  const handleSearchCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setIsValueSearchChild(value);
  };
  const openModalChildSecond = () => {
    setIsOpenModalAddCategory(!isOpenModalAddCategory);
  };
  const setHandleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setIsInputCategoryChild(value);
    if (modifyItem) {
      setModifyItem({ ...modifyItem, name: value });
    }
  };
  const onModifyCategoriesThree = (record: any) => {
    setIsOpenModalModifyChild(!isOpenModalModifyChild);
    setModifyItem(record);
    setDecriptionModifyCategoryThird(record);
    setIsKeyChildThree(record.key);
  };

  const clickAddItemCategoryChild = async (event: any) => {
    event.preventDefault();

    setIsOpenModalAddCategory(!isOpenModalAddCategory);
    const userDataCategoryChild = {
      name: isInputCategoryChild,
      description: isDescribeThree,
      parent_id: idCategories,
    };
    setLoading(true);
    try {
      const res = await uploadApiImage.postAddItemCategoryChild(userDataCategoryChild);
      if (res.code === 200) {
        const msSucces = res.message.text;
        toast.success(msSucces);
        await fetchDataCategorySecondChild(idCategories);
        clearInputChildren();
        setLoading(false);
      } else {
        setIsOpenModalAddCategory(true);
        console.log("Error:", res);
      }
    } catch (error) {
      handleError(error);
      setLoading(false);
    }
  };
  const changeModifyCategoryChild = async () => {
    setIsOpenModalModifyChild(!isOpenModalModifyChild);
    const dataPutCategoryChild = {
      name: modifyItem.name,
      description: decriptionModifyCategoryThird.description,
      parent_id: idCategories,
    };
    const idModifyItemsChild = modifyItem.key;
    setLoading(true);

    try {
      const res = await category.putModifyCategoryChild(idModifyItemsChild, dataPutCategoryChild);
      if (res.code === 200) {
        console.log("res", res);
        const msSucces = res.message.text;
        toast.success(msSucces);
        setLoading(false);
        await fetchDataCategorySecondChild(idCategories);
        clearInputChildren();
      } else {
        console.log("Error:", res);
      }
    } catch (error) {
      handleError(error);
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
      const res = await category.getDataCategoryPaginationChild(idCategories, current, size);
      if (res.data) {
        const data = res.data;
        setIsResDataChildSeconds(data);
        // setLoading(false);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
    }
    setLoading(false);
  };
  const clickDeleteCategoryChild = async () => {
    const keyItemChild = idDeleteItemsChild.key;
    setLoading(true);
    if (keyItemChild) {
      const res = await category.deleteCategoryChild(keyItemChild);
      if (res.code === 200) {
        console.log("res:", res);
        setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
        toast.success("Đã xóa sản phẩm cấp 3 thành công");
        // await fetchDataCategory();
        await fetchDataCategorySecondChild(idCategories);
      } else {
        console.log("error:", res);
        setIsOpenModalDeleteChild(isOpenModalDeleteChild);
      }
    }
    setLoading(false);
  };
  const onDeleteCategoriesThree = (record: any) => {
    setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
    setIdDeleteItemsChild(record);
  };

  const dataTableChild = isResDataChildSeconds.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    name: item.name,
    number_children: item.number_children,
    description: item.description,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
    image_url: item.image_url,
  }));
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Tên danh mục cấp 3",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 200,
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
      render: (record) => (
        <Space size="middle">
          <a onClick={() => onModifyCategoriesThree(record)}>
            <FaPencilAlt />
          </a>
          <a onClick={() => onDeleteCategoriesThree(record)}>
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
        onCell: () => ({}),
      };
    }
    return col;
  });
  const fetchDataSearchCategory = async () => {
    setLoading(true);
    const res = await category.getDataSearchNameThreeCategory(idCategories, debounceValue);
    if (res.code === 200) {
      setIsResDataChildSeconds(res.data);
      // setLoading(false);
    } else {
      console.log("Error:");
    }
    setLoading(false);
  };
  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("describe", e.target.value);
    const value = e.target.value;
    setIsDescribeThree(value);
    setDecriptionModifyCategoryThird({
      ...decriptionModifyCategoryThird,
      description: value,
    });
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
                  placeholder="Tìm danh mục cấp 3"
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
              Thêm danh mục cấp 3
            </Button>
          </div>
        </div>
        <div className="table-container">
          <Table
            columns={columnsWithClick}
            dataSource={dataTableChild}
            locale={localCategoryThirds}
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
              total={isResDataChildSeconds?.total || 0}
            />
            <span className="total-items" style={{ color: "black" }}>{`${
              dataTableChild?.length || 0
            } danh mục cấp 3`}</span>
          </div>
        </div>
      </div>

      {/* Modal Add Category level third */}
      <Modal
        className="modalDialog-addITems"
        width={500}
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        // height={500}
        centered
        open={isOpenModalAddCategory}
        onOk={clickAddItemCategoryChild}
        onCancel={() => setIsOpenModalAddCategory(!isOpenModalAddCategory)}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Thêm danh mục cấp 3</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên danh mục 3 (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            placeholder="Tên danh mục cấp 3"
            onChange={setHandleInput}
            ref={nameRef}
          />
        </div>
        <div className="decribe-category">
          <label htmlFor="" className="title-picture">
            Mô tả danh mục cấp 3(<span>*</span>)
          </label>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChangeInput}
            placeholder="Chú thích danh mục"
            style={{ height: 100, width: 260 }}
            value={isDescribeThree}
          />
        </div>
      </Modal>
      {/* Modal modify Category level third */}

      <Modal
        className="modalDialog-addITems"
        width={500}
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        // height={500}
        centered
        open={isOpenModalModifyChild}
        onOk={changeModifyCategoryChild}
        onCancel={() => setIsOpenModalModifyChild(!isOpenModalModifyChild)}
        okText="Sửa đổi"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Sửa danh mục cấp 3</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên danh mục 3 (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            onChange={setHandleInput}
            value={modifyItem?.name || ""}
          />
        </div>
        <div className="decribe-category">
          <label htmlFor="" className="title-picture">
            Mô tả danh mục cấp 3(<span>*</span>)
          </label>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChangeInput}
            value={decriptionModifyCategoryThird?.description || ""}
            placeholder="Chú thích danh mục"
            style={{ height: 100, width: 260 }}
          />
        </div>
      </Modal>

      {/* modal delete child category */}
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
            fontFamily: "Arial",
            fontSize: "30px",
            fontWeight: "bold",
            padding: "5px 10px",
            marginBottom: "6px",
          }}
        >
          Xóa sản phẩm
        </h1>
        <span style={{ fontSize: "15px", padding: "5px 10px" }}>
          Bạn chắc chắn muốn xóa sản phẩm này không?
        </span>
      </Modal>
    </>
  );
};

export default ShirtSubCategories;

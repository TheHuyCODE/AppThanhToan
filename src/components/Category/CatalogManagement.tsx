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
import { localCategory } from "../TableConfig/TableConfig";
import { AiOutlinePicture } from "react-icons/ai";
import { domain } from "../TableConfig/TableConfig";
import useDebounce from "../auth/useDebounce";
import Spinners from "../SpinnerLoading/Spinners";

const CatalogManagement = () => {
  const domainLink = domain.domainLink;
  const { isResDataChild, fetchDataCategoryChild } = useAuth();
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const reviewImageRef = useRef(null);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [image, setIsImage] = useState("");
  const [previewImage, setIsPreviewImage] = useState("");
  const [previewImageModify, setIsPreviewImageModify] = useState("");
  const [valueSearch, setValueSearch] = useState("");
  const debounceValue = useDebounce(valueSearch, 700);
  const [loading, setLoading] = useState(false);

  const [dataCategory, setDataCategory] = useState("");
  // const navigate = useNavigate();

  const [resImage, setResImage] = useState("");
  const [isOpenModalDetele, setIsOpenModalDelete] = useState(false);
  const [isOpenModalModify, setIsOpenModalModify] = useState(false);
  const [isDataCategory, setIsDataCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryChild, setSelectedCategoryChild] = useState("");

  const [selectedImage, setSelectedImgae] = useState("");
  const [idDeleteItems, setIdDeteleItem] = useState("");

  const [quantityItems, setQuantityItems] = useState(false);
  const [hiddenTitleChild, setHiddenTitleChild] = useState(false);
  const [hiddenTitleSecondsChild, setHiddenTitleSecondsChild] = useState(false);
  const [viewTableChildSecond, setViewTableChildSecond] = useState(false);

  const [isKeyChild, setIsKeyChild] = useState("");
  const [viewTable, setViewTable] = useState(true);

  //editing item
  const [editItem, setEditItem] = useState<any>();
  const [deleteItem, setDeleteItem] = useState<any>();
  const handleSelectNameChildCategory = (nameChildCategory: string) => {
    setSelectedCategoryChild(nameChildCategory);
    console.log("nameChildCategory", nameChildCategory);
  };
  const handleSearchCategory = (e) => {
    const value = e.target.value.trim();
    setValueSearch(value);
    console.log("value", value);
  };
  const setHiddenThirdTitle = (hidden: boolean) => {
    setHiddenTitleSecondsChild(hidden);
    console.log("hiddenSecondsChild", hidden);
  };
  const setHandleInput = (e) => {
    const value = e.target.value;
    console.log("value", value);
    setDataCategory(value);
    // change edititem name
    if (editItem) {
      setEditItem({ ...editItem, name: value });
    }
  };
  const onDeleteCategories = (item: any) => {
    console.log("deleteCategories");
    setIsOpenModalDelete(!isOpenModalDetele);
    setDeleteItem(item);
  };
  const clickDeleteCategory = async () => {
    // call api delete
    const keyItem = deleteItem.key;
    if (keyItem) {
      const res = await category.deleteCategory(keyItem);
      if (res.code === 200) {
        console.log("res:", res);
        setIsOpenModalDelete(!isOpenModalDetele);
        toast.success("Đã xóa danh mục thành công"); // Fetch the updated data after deletion
        await fetchDataCategory();
      } else {
        console.log("error:", res);
        toast.error("Error deleting category");
      }
    }
  };
  const closePreviewImage = () => {
    setIsPreviewImage("");
    setIsPreviewImageModify("");
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
    console.log("item", item.key);
    console.log("item", item.image_url);
    if (item.image_url) {
      setIsPreviewImageModify(`${domainLink}/${item.image_url}`);
    }
  };
  const changeModifyCategory = async () => {
    //call api change
    console.log("editItem", editItem);
    const dataPutCategory = {
      name: editItem.name,
      file_url: resImage,
      parent_id: null,
    };
    const idModifyItems = editItem.key;
    console.log("idModifyItems", idModifyItems);
    console.log("dataPutCategory", dataPutCategory);

    console.log("editItem", editItem);
    const res = await category.putModifyCategory(
      idModifyItems,
      dataPutCategory
    );
    if (res.code === 200) {
      console.log("res", res);
      toast.success("Đã sửa danh mục thành công"); // Fetch the updated data after deletion
      setIsOpenModalModify(!isOpenModalModify);
      await fetchDataCategory();
    } else {
      console.log("res", res);
      toast.error("Error Modify category");
    }
  };

  const handleImage = (e) => {
    e.preventDefault();
    const fileImage = e.target.files[0];
    setIsImage(fileImage);
    setIsPreviewImage(URL.createObjectURL(fileImage));
    console.log(image);
  };
  const handleImageModify = (e) => {
    e.preventDefault();
    const fileImage = e.target.files[0];
    setIsImage(fileImage);
    setIsPreviewImageModify(URL.createObjectURL(fileImage));
    console.log(image);
  };
  useEffect(() => {
    console.log("name", selectedCategory);
    setDataCategory(selectedCategory);
    console.log("dataCategory", dataCategory);
    console.log("selectedImage", selectedImage);
  }, [idDeleteItems]);
  //set quantity children
  useEffect(() => {
    if (image) {
      console.log("image:", image);
      const formData = new FormData();
      const prefixImage = "category";
      formData.append("file", image);
      console.log("formData:", [...formData]);
      uploadApiImage
        .postImage(formData, prefixImage)
        .then((res) => {
          if (res.code === 200) {
            console.log("Success:", res);
            const fileUrl = res.data.file_url;
            setResImage(fileUrl);
          } else {
            console.log("Error:");
          }
        })
        .catch((error) => {
          console.error("Error occurred while uploading:", error);
        });
    }
  }, [image]);

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên danh mục cấp 1",
      dataIndex: "name",
      align: "center",
      editTable: true,
      key: "name",
    },
    {
      title: "Số lượng danh mục cấp 2",
      // title: (titleProps) => {
      //   const sortedColumn = titleProps.sortColumns?.find(({ column }) => column.key === "name");

      //   return (
      //     <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
      //      some title
      //      {sortedColumn?.order === 'ascend' ? <SortUpIcon /> : <SortDownIcon />}
      //    </div>
      //   )
      // }
      dataIndex: "number_children",
      key: "number_children",
      align: "center",
      editTable: true,
      sorter: (record1, record2) => {
        return record1.Soluong > record2.Soluong;
      },
      // sortIcon: ({sortOrder}) =><FaArrowAltCircleDown order={sortOrder}/>
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
        onCell: (record) => ({
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
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    if (reviewImageRef.current) {
      reviewImageRef.current.value = "";
    }
  };
  const clickAddItemCategory = async (event) => {
    event.preventDefault();
    setIsOpenPopups(!isOpenPopups);
    const userDataCategory = {
      name: dataCategory,
      file_url: resImage,
      parent_id: null,
    };
    try {
      const response = await uploadApiImage.postAddItemCategory(
        userDataCategory
      );
      if (response.code === 200) {
        console.log("res", response);
        toast.success("Đã thêm danh mục thành công!");
        await fetchDataCategory();
        clearInputs();
        setIsPreviewImage("");
      } else {
        console.log("error", response);
        toast.error("Thêm danh mục không thành công!");
        const errorMessage = response.data.message.text;
        setErrorMessageCategories(errorMessage);
        console.log(errorMessage);
        setIsOpenPopups(isOpenPopups);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Có lỗi xảy ra khi thêm danh mục!");
      setIsOpenPopups(isOpenPopups);
    }
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
    fetchDataCategoryChild(isKeyChild);
    console.log("On click table 2");
    console.log("viewTableChildSecond", viewTableChildSecond);
  };
  const showTableChildSecondCategory = () => {};
  const fetchDataCategory = async () => {
    const res = await category.getAll();
    setIsDataCategory(res.data);
    console.log("data category", res.data.items);
    console.log(res.data);
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);
  const fetchDataSearchCategory = async () => {
    setLoading(true);
    const res = await category.getDataSearchNameCategory(debounceValue);
    if (res.code === 200) {
      setIsDataCategory(res.data);
      setLoading(false);
    } else {
      console.log("Error:");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataSearchCategory();
    console.log("valueSearchProduct", valueSearch);
  }, [debounceValue]);
  const dataTable = isDataCategory.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    name: item.name,
    number_children: item.number_children,
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
          Quản lí danh mục sản phẩm{" "}
        </a>
        <a
          hidden={hiddenTitleChild}
          className="title-category"
          onClick={showTableChildCategory}
          style={{ color: "rgb(3,23,110)" }}
        >
          {!hiddenTitleChild && (
            <IoIosArrowForward style={{ color: "black", fontSize: 15 }} />
          )}
          {selectedCategory}
        </a>
        <a
          hidden={hiddenTitleSecondsChild}
          className="title-category"
          onClick={showTableChildSecondCategory}
          style={{ color: "rgb(3,23,110)", pointerEvents: "none" }}
        >
          {!viewTable && (
            <IoIosArrowForward style={{ color: "black", fontSize: 15 }} />
          )}
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
                <Button type="primary">Hướng dẫn sử dụng</Button>
                <Button
                  type="primary"
                  onClick={() => setIsOpenPopups(!isOpenPopups)}
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
              centered
              open={isOpenPopups}
              onOk={clickAddItemCategory}
              onCancel={() => setIsOpenPopups(!isOpenPopups)}
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
                  onChange={setHandleInput}
                  ref={nameRef}
                />
              </div>
              <div className="picture-item">
                <label htmlFor="" className="title-picture">
                  Ảnh danh mục(<span>*</span>)
                </label>
                {previewImage ? (
                  <div
                    className="preview-image"
                    style={{
                      height: "150px",
                      width: "240px",
                      position: "relative",
                      color: "white",
                      boxShadow: "0 0 10px rgba(0,0,0,0.3)",

                      // marginRight: "4rem",
                    }}
                  >
                    <button
                      className="btn-close-image"
                      onClick={closePreviewImage}
                    >
                      <CiCircleRemove />
                    </button>
                    <img
                      src={previewImage}
                      alt="Preview"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                ) : (
                  <>
                    <label htmlFor="labelUpload" className="label-upload">
                      <AiOutlinePicture />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="file"
                      id="labelUpload"
                      // style={{display: "none"}}
                      onChange={handleImage}
                      ref={fileRef}
                      hidden
                    />
                  </>
                )}
              </div>
            </Modal>

            {/* Modal Modify product */}
            <Modal
              className="modalDialog-addITems"
              width={500}
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
              <div className="picture-item">
                <label htmlFor="" className="title-picture">
                  Ảnh danh mục(<span>*</span>)
                </label>
                {previewImageModify ? (
                  <div
                    className="preview-image"
                    style={{
                      height: "150px",
                      width: "240px",
                      position: "relative",
                      color: "white",
                      boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                    }}
                  >
                    <button
                      className="btn-close-image"
                      onClick={closePreviewImage}
                    >
                      <CiCircleRemove />
                    </button>
                    <img
                      src={previewImageModify}
                      alt="Preview"
                      style={{ maxHeight: "100%", maxWidth: "100%" }}
                    />
                  </div>
                ) : (
                  <>
                    <label htmlFor="labelUpload" className="label-upload">
                      <AiOutlinePicture />
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      name="file"
                      id="labelUpload"
                      // style={{display: "none"}}
                      onChange={handleImageModify}
                      ref={fileRef}
                      hidden
                    />
                  </>
                )}
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
                  padding: "5px 10px",
                  color: "var(--cl-gray)",
                  fontFamily: "Montserrat ,sans-serif",
                }}
              >
                Bạn có chắc chắn muốn xóa danh mục này? Nếu xóa danh mục, tất cả
                danh mục cấp con và sản phẩm đã link với danh mục sẽ bị xóa
              </p>
            </Modal>
            {/* {isOpenPopups && <PopupAdditem onClose={handleClose}/>} */}
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
                  locale={localCategory}
                  pagination={{
                    position: ["bottomCenter"],
                    defaultPageSize: 15,
                    showSizeChanger: true,
                    pageSizeOptions: ["10", "20", "30"],
                  }}
                />
                <span
                  className="total-items"
                  style={{ color: "black" }}
                >{`${dataTable?.length} danh mục cấp 1`}</span>
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
          />
        )}
      </div>
      {/* {isOpenPopups && <PopupAdditem onClose={handleClose} />} */}
    </div>
  );
};
export default CatalogManagement;

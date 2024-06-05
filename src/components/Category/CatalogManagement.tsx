import { CiSearch } from "react-icons/ci";
import {
  FaArrowDown,
  FaPencilAlt,
  FaTrash,
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
} from "react-icons/fa";
import "./CatalogManagement.css";
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
const CatalogManagement = () => {
  const { isResDataChild, fetchDataCategoryChild } = useAuth();
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const reviewImageRef = useRef(null);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [image, setIsImage] = useState("");
  const [previewImage, setIsPreviewImage] = useState("");
  const [dataCategory, setDataCategory] = useState("");
  // const navigate = useNavigate();
  const [ErrorMessageCategories, setErrorMessageCategories] = useState("");
  const [resImage, setResImage] = useState("");
  const [isOpenModalDetele, setIsOpenModalDelete] = useState(false);
  const [isOpenModalModify, setIsOpenModalModify] = useState(false);
  const [isDataCategory, setIsDataCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedImage, setSelectedImgae] = useState("");
  const [idDeleteItems, setIdDeteleItem] = useState("");
  const [isValueSearch, setIsValueSearch] = useState("");
  const [quantityItems, setQuantityItems] = useState(false);
  const [hiddenTitleChild, setHiddenTitleChild] = useState(false);
  const [isKeyChild, setIsKeyChild] = useState("");
  const [viewTable, setViewTable] = useState(true);
  //editing item
  const [editItem, setEditItem] = useState<any>();
  const [deleteItem, setDeleteItem] = useState<any>();

  const setHandleInput = (e) => {
    const value = e.target.value.trim();
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
        toast.success("Đã xóa sản phẩm thành công"); // Fetch the updated data after deletion
        await fetchDataCategory();
      } else {
        console.log("error:", res);
        toast.error("Error deleting category");
      }
    }
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
  };
  const changeModifyCategory = async () => {
    //call api change
    const dataPutCategory = {
      name: dataCategory,
    };
    const idModifyItems = editItem.key;
    console.log("idModifyItems", idModifyItems);
    console.log("dataPutCategory", dataPutCategory);
    console.log("idDeleteItems", idDeleteItems);
    console.log("editItem", editItem);
    const res = await category.putModifyCategory(
      idModifyItems,
      dataPutCategory
    );
    if (res.code === 200) {
      console.log("res", res);
      toast.success("Đã sửa sản phẩm thành công"); // Fetch the updated data after deletion
      setIsOpenModalModify(!isOpenModalModify);
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
      filteredValue: [isValueSearch],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.created_date)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.number_children)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
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
    await fetchDataCategory();
  };
  const showTableChildCategory = () => {
    setViewTable(false);
  };
  const fetchDataCategory = async () => {
    const res = await category.getAll();
    setIsDataCategory(res.data);
    console.log("data category", res.data.items);
    console.log(res.data);
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);
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
          <IoIosArrowForward style={{ color: "black", fontSize: 15 }} />
          {selectedCategory}
        </a>
      </div>
      <div className="header">
        <div className="header-top">
          <div className="header-top right">
            {viewTable && (
              <>
                <CiSearch className="icon" />
                <input
                  type="text"
                  placeholder="Tìm danh mục"
                  className="search-categories"
                  onChange={(e) => setIsValueSearch(e.target.value)}
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
            {/* modal add product */}
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
                <label htmlFor="labelUpload" className="label-upload">
                  <IoIosAdd />
                  Upload File Image
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
              </div>
              <div className="preview-image">
                {image ? (
                  <img
                    src={previewImage}
                    ref={reviewImageRef}
                    alt=""
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                ) : (
                  <span>Preview Image</span>
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
                <label htmlFor="labelUpload" className="label-upload">
                  <IoIosAdd />
                  Upload File Image
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
              </div>
              <div className="preview-image">
                {image ? (
                  <img
                    src={selectedImage}
                    alt=""
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                ) : (
                  <span>Preview Image</span>
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
              <span style={{ fontSize: "15px", padding: "5px 10px" }}>
                Bạn chắc chắn muốn xóa sản phẩm này không?
              </span>
            </Modal>
            {/* {isOpenPopups && <PopupAdditem onClose={handleClose}/>} */}
          </div>
        </div>
        {viewTable ? (
          <div className="table-container">
            <Table
              columns={columnsWithClick}
              dataSource={dataTable}
              pagination={{
                position: ["bottomCenter"],
                defaultPageSize: 15,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
              }}
            />
            <span className="total-items">{`${dataTable?.length} items`}</span>
          </div>
        ) : (
          <ChildrenCategory
            isKeyChild={isKeyChild}
            fetchDataCategory={fetchDataCategory}
          />
        )}
      </div>
      {/* {isOpenPopups && <PopupAdditem onClose={handleClose} />} */}
    </div>
  );
};
export default CatalogManagement;

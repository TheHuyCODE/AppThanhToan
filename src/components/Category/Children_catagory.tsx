import React, { useEffect, useRef, useState } from "react";
import { Table, Space, Button, Modal } from "antd";
import { useParams } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "./Children_category.css";
import { IoIosAdd } from "react-icons/io";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast } from "react-toastify";
import { CiSearch } from "react-icons/ci";
import category from "../../configs/category";
import { format } from "date-fns";
import { useAuth } from "../auth/AuthContext";
import ChildrenThree_catagory from "./ChildrenThree_catagory";
const ChildrenCategory = ({ isKeyChild, fetchDataCategory }) => {
  // const params = useParams();
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const reviewImageRefChild = useRef(null);
  const { isResDataChild, fetchDataCategoryChild } = useAuth();
  const [isOpenPopupChild, setIsOpenPopupChild] = useState(false);
  const [isInputCategoryChild, setIsInputCategoryChild] = useState("");
  const [isImageCategoryChild, setIsImageCategoryChild] = useState("");
  const [isResImageCategoryChild, setResImageCategoryChild] = useState("");
  const [isPreviewImageChild, setIsPreviewImageChild] = useState("");
  const [isValueSearchChild, setIsValueSearchChild] = useState("");
  const [isOpenModalDeleteChild, setIsOpenModalDeleteChild] = useState(false);
  const [isOpenModalModifyChild, setIsOpenModalModifyChild] = useState(false);
  const [idDeleteItemsChild, setIdDeleteItemsChild] = useState<any>();
  const [modifyItem, setModifyItem] = useState<any>();
  const [IsKeyThreeChild, setIsKeyThreeChild] = useState("");
  const clearInputChildren = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    if (reviewImageRefChild.current) {
      reviewImageRefChild.current.value = "";
    }
    setIsInputCategoryChild("");
    setIsImageCategoryChild("");
    // setResImageCategoryChild("");
    setIsPreviewImageChild("");
  };
  const openModalChildSecond = () => {
    setIsOpenPopupChild(!isOpenPopupChild);
  };
  const clickAddItemCategoryChild = async (event) => {
    console.log("addItemCategoryChild");
    event.preventDefault();
    setIsOpenPopupChild(!isOpenPopupChild);
    const userDataCategoryChild = {
      name: isInputCategoryChild,
      file_url: isResImageCategoryChild,
      parent_id: isKeyChild,
    };
    try {
      const res = await uploadApiImage.postAddItemCategoryChild(
        userDataCategoryChild
      );
      if (res.code === 200) {
        console.log("res", res);
        toast.success("Đã thêm danh mục cấp 3 thành công!");
        await fetchDataCategory();
        await fetchDataCategoryChild(isKeyChild);
        clearInputChildren();
      } else {
        console.log("Error:", res);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  //delete items child category

  const onDeleteCategories = (items) => {
    console.log("onDeleteCategories");
    setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
    setIdDeleteItemsChild(items);
    console.log(items);
  };
  const clickDeleteCategoryChild = async () => {
    // call api deleteCategoryChild
    const keyItemChild = idDeleteItemsChild.key;
    if (keyItemChild) {
      const res = await category.deleteCategoryChild(keyItemChild);
      if (res.code === 200) {
        console.log("res:", res);
        setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
        toast.success("Đã xóa sản phẩm cấp 2 thành công");
        // await fetchDataCategory();
        await fetchDataCategoryChild(isKeyChild);
      } else {
        console.log("error:", res);
        setIsOpenModalDeleteChild(isOpenModalDeleteChild);
      }
    }
  };
  //modify items child category
  const changeModifyCategoryChild = async () => {
    // call api modify categoryChild
  };
  const onModifyCategories = (record) => {
    console.log("onModifyCategories", record);
    setIsOpenModalModifyChild(!isOpenModalModifyChild);
    setModifyItem(record);
  };

  //get input values and file images ChildrenCategory

  const setHandleInput = (event) => {
    const value = event.target.value;
    console.log("value Category 2:", value);
    setIsInputCategoryChild(value);
    if (modifyItem) {
      setModifyItem({ ...modifyItem, name: value });
    }
  };
  const handleImageChild = (event) => {
    event.preventDefault();
    const fileImage = event.target.files[0]; // Corrected here
    setIsImageCategoryChild(fileImage);
    setIsPreviewImageChild(URL.createObjectURL(fileImage));
    console.log("fileImage:", fileImage);
  };

  //get list items children category

  const dataTableChild = isResDataChild.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    name: item.name,
    number_children: item.number_children,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
    image_url: item.image_url,
  }));

  useEffect(() => {
    if (isImageCategoryChild) {
      const uploadImage = async () => {
        try {
          const res = await uploadApiImage.postImageCategoryChild(
            isImageCategoryChild
          );
          if (res.code === 200) {
            const fileUrl = res.data.file_url;
            console.log("fileUrlRes:", fileUrl);
            setResImageCategoryChild(fileUrl);
          } else {
            console.log("Error:", res);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      uploadImage();
    }
  }, [isImageCategoryChild]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên danh mục cấp 2",
      dataIndex: "name",
      key: "name",
      align: "center",
      filteredValue: [isValueSearchChild],
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
      title: "Số lượng danh mục cấp 3",
      dataIndex: "number_children",
      key: "number_children",
      align: "center",
      sorter: (a, b) => a.number_children - b.number_children,
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
  //set with click table
  const columnsWithClick = columns?.map((col, index) => {
    if (index < 4) {
      return {
        ...col,
        onCell: (record) => ({
          onClick: () => {
            console.log("Click row");
            console.log("record:", record);
            // checkQuatifyItem(record);
            // const name = record.name;
            // console.log(name);
            const keyChild = record.key;
            console.log("keyChild: ", keyChild);
            // setSelectedCategory(name);
            setIsKeyThreeChild(keyChild);
            // setViewTable(false);
          },
        }),
      };
    }
    return col;
  });

  return (
    <>
      {isResDataChild.items == 0 ? (
        <div className="add_children_category">
          <p>Chưa có model cấp 2</p>
          <Button type="primary" onClick={openModalChildSecond}>
            Thêm danh mục cấp 2
          </Button>
        </div>
      ) : (
        <div>
          <div className="header-top">
            <div className="header-top-right">
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
                placeholder="Tìm danh mục cấp 2"
                className="search-categories"
                onChange={(e) => setIsValueSearchChild(e.target.value)}
              />
            </div>
            <div className="header-btn">
              <Button type="primary">Hướng dẫn sử dụng</Button>
              <Button type="primary" onClick={openModalChildSecond}>
                Thêm danh mục cấp 2
              </Button>
            </div>
          </div>
          <div className="table-container">
            <Table
              columns={columnsWithClick}
              dataSource={dataTableChild}
              pagination={{
                position: ["bottomCenter"],
                defaultPageSize: 15,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
              }}
            />
            <span className="total-items">{`${dataTableChild?.length} items`}</span>
          </div>
          {/* <ChildrenThree_catagory /> */}
        </div>
      )}
      {/* modal add child category */}
      <Modal
        className="modalDialog-addITems"
        width={500}
        // height={500}
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
            onChange={handleImageChild}
            ref={fileRef}
            hidden
          />
        </div>
        <div className="preview-image">
          {isImageCategoryChild ? (
            <img
              src={isPreviewImageChild}
              ref={reviewImageRefChild}
              alt=""
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          ) : (
            <span>Preview Image</span>
          )}
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
      {/* modal modify child category */}
      <Modal
        className="modalDialog-addITems"
        width={500}
        // height={500}
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
            Tên danh mục 1 (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            onChange={setHandleInput}
            value={modifyItem?.name || ""}
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
            // onChange={handleImage}
            // ref={fileRef}
            hidden
          />
        </div>
        <div className="preview-image">
          {/* {image ? (
            <img
              src={selectedImage}
              alt=""
              style={{ maxHeight: "100%", maxWidth: "100%" }}
            />
          ) : (
            <span>Preview Image</span>
          )} */}
        </div>
      </Modal>
    </>
  );
};

export default ChildrenCategory;

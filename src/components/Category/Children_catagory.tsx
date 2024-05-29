import React, { useEffect, useState } from "react";
import { Table, Space, Button, Modal } from "antd";
import { useParams } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "./Children_category.css";
import { IoIosAdd } from "react-icons/io";
import uploadApiImage from "../../configs/uploadApiImage";
import { ToastContainer } from "react-toastify";
const ChildrenCategory = ({ quantityItems, setQuantityItems, isKeyChild }) => {
  const params = useParams();
  const [isOpenPopupChild, setIsOpenPopupChild] = useState(false);
  const [isInputCategoryChild, setIsInputCategoryChild] = useState("");
  const [isImageCategoryChild, setImagetCategoryChild] = useState("");
  const [isResImageCategoryChild, setResImageCategoryChild] = useState("");

  const onModifyCategories = (record) => {
    console.log("onModifyCategories", record);
  };
  //add items to category Children
  const clearInputChild = () => {};
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
        // toast.success("Đã thêm danh mục cấp 2 thành công!");
        // await fetchDataCategoryChild();
      } else {
        console.log("Error:", res);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const onDeleteCategories = () => {
    console.log("onDeleteCategories");
  };
  const openModalChildSecond = () => {
    setIsOpenPopupChild(!isOpenPopupChild);
  };

  //get input values and file images ChildrenCategory

  const setHandleInput = (event) => {
    const value = event.target.value.trim();
    console.log("value Category 2:", value);
    setIsInputCategoryChild(value);
  };
  const handleImageChild = (event) => {
    event.preventDefault();
    const fileImage = event.target.files[0]; // Corrected here
    setImagetCategoryChild(fileImage);
    console.log("fileImage:", fileImage);
  };
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
      onFilter: (value, record) =>
        record.name.toLowerCase().includes(value.toLowerCase()),
    },
    {
      title: "Số lượng danh mục cấp 2",
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
          <a onClick={onDeleteCategories}>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];

  const dataChildCategory = [
    {
      stt: 1,
      name: "Máy nổ 1",
      number_children: 2,
      created_date: "20/10/2024",
    },
    {
      stt: 2,
      name: "Máy nổ 2",
      number_children: 3,
      created_date: "21/10/2024",
    },
    {
      stt: 3,
      name: "Máy nổ 3",
      number_children: 1,
      created_date: "22/10/2024",
    },
  ];

  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      {quantityItems ? (
        <div className="add_children_category">
          <p>Chưa có model cấp 2</p>
          <Button type="primary" onClick={openModalChildSecond}>
            Thêm danh mục cấp 2
          </Button>
        </div>
      ) : (
        <Table columns={columns} dataSource={dataChildCategory} />
      )}
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
            // ref={nameRef}
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
            // // style={{display: "none"}}
            onChange={handleImageChild}
            // ref={fileRef}
            hidden
          />
        </div>
        <div className="preview-image">
          {/* {image ? (
            <img
              src={previewImage}
              ref={reviewImageRef}
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

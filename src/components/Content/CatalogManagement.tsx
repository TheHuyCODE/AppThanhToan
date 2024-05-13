import { CiSearch } from "react-icons/ci";
import { FaArrowDown, FaPencilAlt, FaTrash } from "react-icons/fa";
import "./CatalogManagement.css";
import { Input, Select } from "antd";
import { Space, Table, Tag } from "antd";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast, ToastContainer } from "react-toastify";

// import PopupAdditem from "../listitem/PopupAddItem";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
const CatalogManagement = () => {
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [image, setIsImage] = useState("");
  const [dataCategory, setDataCategory] = useState({
    name: "",
  });
  const [resImage, setResImage] = useState("");
  const [errorMessageCategories, setErrorMessageCategories] = useState("");

  const setHandleInput = (fileName) => (e) => {
    const value = e.target.value.trim();
    console.log("value", value);
    setDataCategory({
      ...dataCategory,
      [fileName]: value,
    });
  };

  const clickAddItemCategory = (event) => {
    event.preventDefault();
    setIsOpenPopups(!isOpenPopups);
    const accessToken = localStorage.getItem("access_token");
    const userDataCategory = {
      name: dataCategory.name,
      file_url: resImage,
      parent_id: null,
    };
    uploadApiImage
      .postAddImageCategory(userDataCategory, accessToken)
      .then((response) => {
        if (response.code === 200) {
          console.log("res", response);
          toast.success("Đã thêm danh mục thành công!");
        } else {
          console.log("error", response);
          toast.error("Thêm danh mục không thành công!");
          const errorMessage = response.data.message.text;
          setErrorMessageCategories(errorMessage);
          console.log(errorMessage);
          setIsOpenPopups(isOpenPopups);
        }
      });
  };
  const onDeleteCategories = () => {
    console.log('deleteCategories')
  }
  const onChangeCategories = () => {
    console.log('changeCategories')
  }
  
  const handleImage = (e) => {
    e.preventDefault();
    const fileImage = e.target.files[0];
    setIsImage(fileImage);
    console.log(image);
  };

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
            console.log("Error:", res);
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
      key: "name",
    },
    {
      title: "Só lượng danh mục cấp 2",
      dataIndex: "Soluong",
      key: "Soluong",
    },
    {
      title: "Ngày tạo",
      dataIndex: "Date",
      key: "Date",
    },
    {
      title: "Thao tác",
      key: "action",
      render: () => (
        <Space size="middle">
          <a onClick={onChangeCategories}>
            <FaPencilAlt />
          </a>
          <a onClick={onDeleteCategories}>
            <FaTrash style={{color: 'red'}} />
          </a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      id: "27bad62b-d417-4bc9-bf18-309e246424b01",
      stt: "1",
      name: "Giày dép",
      Soluong: 6,
      Date: "14/02/2024",
    },
    {
      id: "27bad62b-d417-4bc9-bf18-309e246424b01",
      stt: "2",
      name: "Giày dép",
      Soluong: 6,
      Date: "14/02/2024",
    },
    {
      id: "27bad62b-d417-4bc9-bf18-309e246424b01",
      stt: "3",
      name: "Giày dép",
      Soluong: 6,
      Date: "14/02/2024",
    },
  ];
  return (
    <div className="content">
      <ToastContainer />
      <h1 className="title-category">Quản lí danh mục sản phẩm </h1>
      <div className="header">
        <div className="header-top">
          <div className="header-top right">
            <CiSearch className="icon" />
            <input
              type="text"
              placeholder="Tìm danh mục"
              className="search-category"
            />
          </div>
          <div className="header-btn">
            <Button type="primary">Hướng dẫn sử dụng</Button>
            <Button
              type="primary"
              onClick={() => setIsOpenPopups(!isOpenPopups)}
            >
              Thêm danh mục cấp 1
            </Button>
            <Modal
              className="modalDialog-addITems"
              width={600}
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
                <Input
                  className="input-name-category"
                  onChange={setHandleInput("name")}
                />
              </div>
              <div className="picture-item">
                <label htmlFor="" className="title-picture">
                  Ảnh danh mục(<span>*</span>)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  // style={{display: "none"}}
                  onChange={handleImage}
                />
              </div>
              {/* {showPicture()} */}
            </Modal>
            <Modal
              className="modalDialog-addITems"
              width={600}
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
                <Input
                  className="input-name-category"
                  onChange={setHandleInput("name")}
                />
              </div>
              <label htmlFor="errorPopup" className="errorPopup">
                {errorMessageCategories}
              </label>
              <div className="picture-item">
                <label htmlFor="" className="title-picture">
                  Ảnh danh mục(<span>*</span>)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  name="file"
                  // style={{display: "none"}}
                  onChange={handleImage}
                />
              </div>
              {/* {showPicture()} */}
            </Modal>

            {/* {isOpenPopups && <PopupAdditem onClose={handleClose}/>} */}
          </div>
        </div>
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={data}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {console.log(record,rowIndex)}, // click row
              };
            }}
          />
        </div>
      </div>
      {/* {isOpenPopups && <PopupAdditem onClose={handleClose} />} */}
    </div>
  );
};
export default CatalogManagement;

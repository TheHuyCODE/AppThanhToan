import { CiSearch } from "react-icons/ci";
import { FaArrowDown, FaPencilAlt, FaTrash } from "react-icons/fa";
import "./CatalogManagement.css";
import { Input } from "antd";
import { Space, Table, Tag } from 'antd';
import uploadApiImage from "../../configs/uploadApiImage";
// import PopupAdditem from "../listitem/PopupAddItem";
import React, { useEffect, useState } from "react";
import { Button, Modal } from "antd";
const CatalogManagement = () => {
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [picture, setIsPicture] = useState([]);
  const [dataCategory, setDataCategory] = useState('')
  const togglePopup = () => {
    setIsOpenPopups(!isOpenPopups);
  };
  const handleClose = () => {
    setIsOpenPopups(false);
  };
  const onFileUploadHandler = (e) => {
    e.preventDefault();
    if (e.target) {
      const formData = new FormData(e.target);
      // Define your async function correctly
      files.forEach((file) => {
        formData.append('file', file);
      });
      uploadApiImage.postMessage(formData).then((res) => {
        if (res.code === 200) {
          console.log('res', res);
        } else {
          console.log('error', res);
        }
      });
    }
  };
  
  // useEffect(() => {
  //   const fetchDataCategory = async () => {
  //     const data = await category.getAll();
  //     setDataCategory(data);
  //   };
  //   fetchDataCategory();
  // }, []);
  // useEffect(() => {
  //   console.log(dataCategory)
  // }, [dataCategory])
  const showPicture = () => {
    return picture.map((item) => (
      <div className="show-picture">
        <img
          src={URL.createObjectURL(item)}
          alt=""
          width="100px"
          height="100px"
        />
      </div>
    ));
  };
  const columns = [
    {
      title: 'STT',
      dataIndex: 'Stt',
      key: 'Stt',
    },
    {
      title: 'Tên danh mục cấp 1',
      dataIndex: 'Danhmuc',
      key: 'Danhmuc',
    },
    {
      title: 'Só lượng danh mục cấp 2',
      dataIndex: 'Soluong',
      key: 'Soluong',
    },
    {
      title: 'Ngày tạo',
      key: 'Date',
      dataIndex: 'Date',
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a><FaPencilAlt/></a>
          <a><FaTrash/></a>
        </Space>
      ),
    },
  ];
  const data = [
    {
      key: '1',
      Stt: '1',
      Danhmuc: 'Mayno',
      Soluong: 6,
      Date: '14/02/2024',
    },
    {
      key: '2',
      Stt: '2',
      Danhmuc: 'Mayno',
      Soluong: 6,
      Date: '14/02/2024',
    },
    {
      key: '3',
      Stt: '3',
      Danhmuc: 'Mayno',
      Soluong: 6,
      Date: '14/02/2024',
    },
  ];
  return (
    <div className="content">
      <h1 className="title-category">Quản lí danh mục sản phẩm</h1>
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
              onOk={() => setIsOpenPopups(!isOpenPopups)}
              onCancel={() => setIsOpenPopups(!isOpenPopups)}
              okText="Thêm"
              cancelText="Hủy bỏ"
            >
              <h1 className="title-addItem">Thêm danh mục cấp 1</h1>
              <div className="name-item">
              <label htmlFor="">Tên danh mục (<span>*</span>)</label>
                <Input className="input-name-category" />
              </div>
              <div className="picture-item">
                <label htmlFor="" className="title-picture">
                  Ảnh danh mục(<span>*</span>)
                </label>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  // style={{display: "none"}}
                  onSubmit={onFileUploadHandler}
                />
              </div>
              {showPicture()}
            </Modal>
            {/* {isOpenPopups && <PopupAdditem onClose={handleClose}/>} */}
          </div>
        </div>
        <div className="header-bot">
        <Table columns={columns} dataSource={data} />

        </div>
      </div>
      {/* {isOpenPopups && <PopupAdditem onClose={handleClose} />} */}
    </div>
  );
};

export default CatalogManagement;

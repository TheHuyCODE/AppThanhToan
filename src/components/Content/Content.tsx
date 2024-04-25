import { CiSearch } from "react-icons/ci";
import { FaArrowDown, FaPencilAlt, FaTrash, FaImage  } from "react-icons/fa";
import "./Content.css";
import PopupAdditem from "../listitem/PopupAddItem";
import React, { useState } from "react";
import { Button, Modal } from "antd";
const Headermain = () => {
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const togglePopup = () => {
    setIsOpenPopups(!isOpenPopups);
  };
  const handleClose = () => {
    setIsOpenPopups(false);
  };
  return (
    <div className="content">
      <h1 className="list-item">Quản lí danh mục sản phẩm</h1>
      <div className="header">
        <div className="header-top">
          <div className="header-top right">
            <CiSearch className="icon" />
            <input type="text" placeholder="Tìm danh mục" />
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
                <label htmlFor="">
                  Tên danh mục(*)
                </label>
                <input type="text" />
              </div>
              <div className="picture-item">
                <label htmlFor="">
                  Tên danh mục(*)
                </label>
                <button className= "custom-file-upload">
                <FaImage />
                <input type="file" id="file-upload" accept="image/*"/>
                </button>
                <img id="image-preview" classNane="preview" src="#" alt="Mô tả hình ảnh"></img>
              </div>
              
            </Modal>
            {/* {isOpenPopups && <PopupAdditem onClose={handleClose}/>} */}
          </div>
        </div>
        <div className="header-bot">
          <thead>
            <tr>
              <th className="th1">STT</th>
              <th>Tên danh mục cấp 1</th>
              <th>Số lượng mục cấp 2</th>
              <th>
                Ngày tạo
                <FaArrowDown />
              </th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Danh mục 1</td>
              <td>5</td>
              <td>2024-04-18</td>
              <td>
                <FaPencilAlt className="icon" />
                <FaTrash className="icon" />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Danh mục 2</td>
              <td>10</td>
              <td>2024-04-18</td>
              <td>
                <FaPencilAlt className="icon" />
                <FaTrash className="icon" />
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Danh mục 1</td>
              <td>5</td>
              <td>2024-04-18</td>
              <td>
                <FaPencilAlt className="icon" />
                <FaTrash className="icon" />
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Danh mục 2</td>
              <td>10</td>
              <td>2024-04-18</td>
              <td>
                <FaPencilAlt className="icon" />
                <FaTrash className="icon" />
              </td>
            </tr>
  
          </tbody>
        </div>
      </div>
      {isOpenPopups && <PopupAdditem onClose={handleClose} />}
    </div>
  );
};

export default Headermain;

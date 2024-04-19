import { CiImageOn } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import "./PopupAdditem.css";
import React from "react";

const PopupAdditem = ({ onClose }) => {
  const handleClose = () => {
    onClose(); // Call the onClose callback passed from the parent component
  };

  return (
    <div className="popup-content" onClick={handleClose}>
      {/* content */}
      <div className="content" >
        {/* header */}
        <div>
          <h1>Thêm danh mục cấp 1</h1>
          <IoMdClose className="icon-close" onClick={handleClose} />
        </div>
        {/* content */}
        <div >
          <div>
            <label>Tên danh mục</label>
            <input type="text" placeholder="Nhập tên danh mục" />
          </div>
          <div>
            <label htmlFor="">Ảnh danh mục</label>
            <button>
              <CiImageOn />
            </button>
          </div>
          <div>
            <label htmlFor="">Thêm thông số kĩ thuật</label>
            <input type="checkbox" name="" id="" />
          </div>
          {/* footer */}
          <div>
            <a href="">Hủy bỏ</a>
            <button>Thêm</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PopupAdditem;

import { CiSearch } from "react-icons/ci";
import { FaArrowDown, FaPencilAlt, FaTrash  } from "react-icons/fa";
import './Header.css'
import PopupAdditem from "../listitem/PopupAddItem";
import React, { useState } from 'react';
const Header = () => {
  const [isOpenPopups, setIsOpenPopups] = useState(false)
  const togglePopup = () => {
    setIsOpenPopups(!isOpenPopups);
  };
  const handleClose = () => {
    setIsOpenPopups(false);
  };
  return (
    <>
      <h1>Quản lí danh mục sản phẩm</h1>
      <div className="header">
        <div className="header-top">
          <div className="header-top right">

          <CiSearch className="icon"/>
          <input type="text" placeholder="Tìm danh mục" />
          </div>
          <div className="header-btn">
            <button>Hướng dẫn sử dụng</button>
            <button onClick={togglePopup} >Thêm danh mục cấp 1</button>
      {/* {isOpenPopups && <PopupAdditem onClose={handleClose}/>} */}
          </div>
        </div>
        <div className="header-bot">
          <thead>
            <tr>
              <th className="th1">STT</th>
              <th>Tên danh mục cấp 1</th>
              <th>Số lượng mục cấp 2</th>
              <th>Ngày tạo
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
                <FaPencilAlt className="icon"/>
                <FaTrash className="icon"/>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Danh mục 2</td>
              <td>10</td>
              <td>2024-04-18</td>
              <td>
                <FaPencilAlt className="icon"/>
                <FaTrash className="icon"/>
              </td>
            </tr>
          </tbody>
        </div>
      </div>
      {isOpenPopups && <PopupAdditem onClose={handleClose}/>}
      
    </>
  );
};

export default Header;

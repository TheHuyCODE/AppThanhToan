import { Select, Input } from "antd";
import React, { useState } from "react";
import { IoIosAdd, IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./ProductManagement.css";
import "../styles/valiables.css";
import { CiCircleRemove } from "react-icons/ci";
const { TextArea } = Input;
const AddProduct = () => {
  const navigate = useNavigate();
  const [isImageProduct, setIsImageProduct] = useState("");
  const [previewImageProduct, setPreviewImageProduct] = useState("");

  const listCategory = [
    {
      name: "Thời trang nam",
      value: 1,
    },
    {
      name: "Thời trang nam",
      value: 2,
    },
    {
      name: "Thời trang nam",
      value: 3,
    },
  ];
  const onClickBackPageProduct = () => {
    navigate("/admin/products/");
  };
  const onChangeValue = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value == "") {
      e.target.value = "";
      return;
    }
    e.target.value = parseInt(value).toLocaleString("vi-VN");
    console.log("value", value);
  };
  const closePreviewImage = () => {
    setPreviewImageProduct("");
  };
  const handleInputImage = (e) => {
    e.preventDefault();
    const fileImage = e.target.files[0];
    setIsImageProduct(fileImage);
    setPreviewImageProduct(URL.createObjectURL(fileImage));
    console.log("Linked image", fileImage);
  };
  return (
    <>
      <div className="add-product">
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <IoIosArrowBack
            style={{ fontSize: "23px", color: "135597", cursor: "pointer" }}
            onClick={onClickBackPageProduct}
          />
          <h1
            style={{
              fontSize: "26px",
              fontFamily: "Montserrat, sans-serif",
              color: "var(--color-tiltle)",
            }}
          >
            Thêm sản phẩm
          </h1>
        </div>
        <div
          className="header-add-product"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "15px",
          }}
        >
          <h2 style={{ fontFamily: "poppins, sans-serif" }}>
            Thông tin sản phẩm
          </h2>
        </div>
        <div
          className="content-add-product"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            border: "1px solid lightgray",
            borderRadius: "10px",
            padding: "20px",
            gap: "5px",
          }}
        >
          <div
            className="content-add-product-left"
            style={{
              width: "50%",
              height: "auto",
              display: "flex",
              flexDirection: "column",
              marginLeft: "20px",
            }}
          >
            <div className="input-info">
              <label htmlFor="">
                Mã sản phẩm gốc(<span>*</span>)
              </label>
              <input type="text" className="input-form" />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Tên sản phẩm chính(<span>*</span>)
              </label>
              <input type="text" className="input-form" />
            </div>
            <div className="input-info">
              <label htmlFor="">Mô tả</label>
              <TextArea rows={4} style={{ width: "300px" }} />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Danh mục sản phẩm(<span>*</span>)
              </label>
              <Select
                placeholder="Danh mục sản phẩm"
                allowClear
                // onChange={handleSelectChange}
                // defaultValue="Giới tính"
                style={{ width: 302, height: 36 }}
              >
                {listCategory.map((option) => (
                  <option value={option.value}>{option.name}</option>
                ))}
                /
              </Select>
            </div>
            <div
              className="input-info"
              style={{
                position: "relative",
              }}
            >
              <label htmlFor="">
                Giá vốn(<span>*</span>)
              </label>
              <input
                type="text"
                className="input-form"
                onChange={onChangeValue}
                style={{
                  position: "relative",
                }}
              />
              <p className="overlay-text">đ</p>
            </div>
            <div
              className="input-info"
              style={{
                position: "relative",
              }}
            >
              <label htmlFor="">
                Giá bán(<span>*</span>)
              </label>
              <input
                type="text"
                className="input-form"
                onChange={onChangeValue}
                style={{
                  position: "relative",
                }}
              />
              <p className="overlay-text">đ</p>
            </div>
            <div className="input-info">
              <label htmlFor="">
                Số lượng tồn kho(<span>*</span>)
              </label>
              <input type="text" className="input-form" />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Trạn thái sản phẩm(<span>*</span>)
              </label>
              <div
                style={{
                  width: "300px",
                  // height: "30px",
                  display: "flex",
                  justifyContent: "start",
                  gap: "10px",
                }}
              >
                <input type="radio" id="active" name="status" />
                <label htmlFor="active">Kích hoạt</label>
                <input type="radio" id="notactivated" name="status" />
                <label htmlFor="notactivated">Chưa kích hoạt</label>
              </div>
            </div>
          </div>
          <div
            className="content-add-product-right"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "50%",
              flexDirection: "column",
              height: "480px",
            }}
          >
            <div
              className="picture-item"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: "40px",
              }}
            >
              <label htmlFor="labelUpload" className="title-picture">
                Ảnh danh mục(<span>*</span>)
              </label>
              {!previewImageProduct ? (
                <>
                  <label
                    htmlFor="labelUpload"
                    className="label-upload"
                    style={{ marginRight: 0 }}
                  >
                    <IoIosAdd />
                    Upload File Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    name="file"
                    id="labelUpload"
                    onChange={handleInputImage}
                    hidden
                  />
                </>
              ) : (
                <div
                  className="preview-image"
                  style={{ height: "150px", position: "relative" }}
                >
                  <button
                    className="btn-close-image"
                    onClick={closePreviewImage}
                  >
                    <CiCircleRemove />
                  </button>
                  <img
                    src={previewImageProduct}
                    alt="Preview"
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="footer-add-product">
          <button
            className="btn-cancel-product"
            onClick={onClickBackPageProduct}
          >
            Hủy
          </button>
          <button className="btn-add-product">Thêm sản phẩm</button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

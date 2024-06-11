import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const DetailProduct = () => {
  const navigate = useNavigate();
  const onClickBackPageProduct = () => {
    navigate("/admin/products/");
  };
  return (
    <div className="content">
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
          Xem sản phẩm
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
            <label htmlFor="">Mã sản phẩm gốc</label>
            <p>Trang test</p>
          </div>
          <div className="input-info">
            <label htmlFor="">Tên sản phẩm chính</label>
            <p>Trang test</p>
          </div>
          <div className="input-info">
            <label htmlFor="">Danh mục sản phẩm</label>
            <p>Trang test</p>
          </div>
          <div className="input-info">
            <label htmlFor="">Mô tả</label>
            <p>Trang test</p>
          </div>
          <div className="input-info">
            <label htmlFor="">Giá vốn</label>
            <p>Trang test</p>
          </div>
          <div className="input-info">
            <label htmlFor="">Giá bán</label>
            <p>Trang test</p>
          </div>
          <div className="input-info">
            <label htmlFor="">Số lượng tồn kho</label>
            <p>Trang test</p>
          </div>
          <div className="input-info">
            <label htmlFor="">Trạn thái sản phẩm</label>
            <p>Trang test</p>
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
        {/* <div
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
                <button className="btn-close-image" onClick={closePreviewImage}>
                  <CiCircleRemove />
                </button>
                <img
                  src={previewImageProduct}
                  alt="Preview"
                  style={{ maxHeight: "100%", maxWidth: "100%" }}
                />
              </div>
            )}
          </div> */}
      </div>
    </div>
  );
};

export default DetailProduct;

import { Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosAdd, IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./ProductManagement.css";
import "../styles/valiables.css";
import { CiCircleRemove } from "react-icons/ci";
import products from "../../configs/products";
import { useAuth } from "../auth/AuthContext";
import { CgLayoutGrid } from "react-icons/cg";
const { TextArea } = Input;
const AddProduct = () => {
  const navigate = useNavigate();
  const [isImageProduct, setIsImageProduct] = useState("");
  const [previewImageProduct, setPreviewImageProduct] = useState("");
  const [resImageProduct, setResImageProduct] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { fetchDataCategory, isCategoryProduct } = useAuth();

  const [inputProduct, setInputProduct] = useState({
    barcode: "",
    name: "",
    description: "",
    price: "",
    inventory_number: "",
    is_activate: "",
  });
  const onChangeInput = (fieldName) => (e) => {
    const value = e.target.value.trim();
    setInputProduct({
      ...inputProduct,
      [fieldName]: value,
    });
  };
  const onClickAddProduct = (e) => {
    e.preventDefault();
    const data = {
      barcode: inputProduct.barcode,
      name: inputProduct.name,
      description: inputProduct.description,
      // category: inputProduct.category,
      price: inputProduct.price,
      inventory_number: inputProduct.inventory_number,
      is_activate: inputProduct.is_activate,
      image_url: resImageProduct,
    };
    console.log("inputProduct", inputProduct);
  };
  const listCategory = isCategoryProduct.map((item, index) => ({
    name: item.name,
    value: index + 1,
  }));

  const handleSelectCategory = (value) => {
    const selectedName = listCategory.find(
      (item) => item.value === value
    )?.name;

    // Kiểm tra xem selectedName có tồn tại hay không trước khi sử dụng
    if (selectedName) {
      // Thực hiện các thao tác tiếp theo với selectedName
      console.log("Name tương ứng với value:", selectedName);
      // Ví dụ: Gọi hàm uploadApiImage.postMessage() với selectedName
      // uploadApiImage.postMessage(selectedName);
    } else {
      console.log("Không tìm thấy name cho giá trị:", value);
    }
  };
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
    console.log("isImageProduct", isImageProduct);
  };
  useEffect(() => {
    if (isImageProduct) {
      console.log("image:", isImageProduct);
      const formData = new FormData();
      formData.append("file", isImageProduct);
      console.log("formData:", [...formData]);
      products
        .postImageProduct(formData)
        .then((res) => {
          if (res.code === 200) {
            console.log("Success:", res);
            const fileUrl = res.data.file_url;
            setResImageProduct(fileUrl);
          } else {
            console.log("Error:");
          }
        })
        .catch((error) => {
          console.error("Error occurred while uploading:", error);
        });
    }
  }, [isImageProduct]);
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
              <input
                type="text"
                className="input-form"
                onChange={onChangeInput("barcode")}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Tên sản phẩm chính(<span>*</span>)
              </label>
              <input
                type="text"
                className="input-form"
                onChange={onChangeInput("name")}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">Mô tả</label>
              <TextArea
                rows={4}
                style={{ width: "300px" }}
                onChange={onChangeInput("description")}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Danh mục sản phẩm(<span>*</span>)
              </label>
              <Select
                placeholder="Danh mục sản phẩm"
                allowClear
                value={selectedCategory}
                // defaultValue="Giới tính"
                style={{ width: 302, height: 36 }}
                onChange={(value) => {
                  handleSelectCategory(value);
                }}
              >
                {listCategory.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
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
          <button className="btn-add-product" onClick={onClickAddProduct}>
            Thêm sản phẩm
          </button>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

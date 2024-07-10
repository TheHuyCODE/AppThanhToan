import { Select, Input } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosAdd, IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "./ProductManagement.css";
import "../styles/valiables.css";
import { CiCircleRemove } from "react-icons/ci";
import { FaBan } from "react-icons/fa";
import products from "../../configs/products";
import { useAuth } from "../auth/AuthContext";

import { ToastContainer, toast } from "react-toastify";
import category from "../../configs/category";
import { AiOutlinePicture } from "react-icons/ai";
const { TextArea } = Input;
const AddProduct = () => {
  const navigate = useNavigate();
  const [isImageProduct, setIsImageProduct] = useState("");
  const [previewImageProduct, setPreviewImageProduct] = useState("");
  const [resImageProduct, setResImageProduct] = useState("");
  const [isPriceProduct, setIsPriceProduct] = useState("");

  // const [isCapitalPriceProduct, setIsCapitalPriceProduct] = useState("");
  // const [isImageCategory, setIsImageCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const { fetchDataCategory, isCategoryProduct } = useAuth();
  const [stateProduct, setStateProduct] = useState("");
  // const [selectedCategory, setSelectedCategory] = useState('');
  const listCategory = isCategoryProduct?.map((item, index) => ({
    name: item.name,
    value: index + 1,
    id: item.id,
  }));
  const unitProduct = [
    {
      name: "Cái",
      value: 1,
    },
    {
      name: "Bộ",
      value: 2,
    },
    {
      name: "Cặp",
      value: 3,
    },
    {
      name: "Miếng",
      value: 4,
    },
    {
      name: "Đôi",
      value: 5,
    },
    {
      name: "Tá",
      value: 6,
    },
    {
      name: "Chiếc",
      value: 7,
    },
    {
      name: "Gam",
      value: 8,
    },
    {
      name: "Tấn",
      value: 9,
    },
    {
      name: "Yến",
      value: 10,
    },
    {
      name: "Chai",
      value: 11,
    },
    {
      name: "Bịch",
      value: 12,
    },
    {
      name: "Gói",
      value: 13,
    },
    {
      name: "Thùng",
      value: 12,
    },
    {
      name: "Hộp",
      value: 14,
    },
  ];
  const [inputProduct, setInputProduct] = useState({
    barcode: "",
    name: "",
    description: "",
    price: 0,
    capital_price: 0,
    inventory_number: 0,
    is_active: 0,
    unit: "",
    category_id: "",
  });

  const onChangeInput = (fieldName) => (e) => {
    let value = e.target.value.trim();
    // If the field is 'inventory_number', convert the value to a number
    if (fieldName === "inventory_number") {
      value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      value = value === "" ? 0 : parseInt(value, 10); // Convert to number or set to 0 if empty
    }
    setInputProduct({
      ...inputProduct,
      [fieldName]: value,
    });
  };

  // add product
  const onClickAddProduct = async (e) => {
    e.preventDefault();
    const dataAddProduct = {
      barcode: inputProduct.barcode,
      name: inputProduct.name,
      description: inputProduct.description,
      category_id: inputProduct.category_id,
      price: inputProduct.price,
      capital_price: inputProduct.capital_price,
      inventory_number: inputProduct.inventory_number,
      is_active: inputProduct.is_active,
      image_url: resImageProduct,
      unit: inputProduct.unit,
    };
    // console.log("dataProduct:", data);
    console.log("inputProduct", inputProduct);
    console.log("inputProduct", dataAddProduct);

    console.log(typeof inputProduct.barcode);
    console.log(typeof inputProduct.price);
    console.log(typeof inputProduct.capital_price);
    console.log(typeof inputProduct.inventory_number);
    try {
      const response = await products.postAddProduct(dataAddProduct);
      if (response.code === 200) {
        console.log("res", response);
        toast.success("Đã thêm sản phẩm thành công!");
        setTimeout(() => {
          onClickBackPageProduct();
        }, 1000); // Adjust the delay as needed (1000ms = 1 second)
        await fetchDataCategory();
        clearInputsAddProduct;
        // setIsPreviewImage("");
      } else {
        console.log("error", response);
        const errorMessage = response.data.message.text;
        toast.error(`${errorMessage}`);
        // setErrorMessageCategories(errorMessage);
        console.log(errorMessage);
        // setIsOpenPopups(isOpenPopups);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Có lỗi xảy ra khi thêm danh mục!");
      // setIsOpenPopups(isOpenPopups);
    }
  };

  const clearInputsAddProduct = () => {
    setInputProduct({
      barcode: "",
      name: "",
      description: "",
      price: 0,
      capital_price: 0,
      inventory_number: 0,
      is_active: 0,
      unit: "",
      category_id: "",
    });
  };
  const handleSelectCategory = (value) => {
    const selectedCategory = listCategory.find((item) => item.value === value);
    if (selectedCategory) {
      console.log("Name tương ứng với value:", selectedCategory);
      console.log("Name tương ứng với id:", selectedCategory.id);
      setInputProduct({
        ...inputProduct,
        category_id: selectedCategory.id,
      });
      // setSelectedCategory(selectedName);
    } else {
      console.log("Không tìm thấy name cho giá trị:", value);
    }
  };
  const handleSelectUnit = (value) => {
    const selectedName = unitProduct.find((item) => item.value === value)?.name;
    if (selectedName) {
      console.log("Name tương ứng với value:", selectedName);
      setInputProduct({
        ...inputProduct,
        unit: selectedName,
      });
      // setSelectedCategory(selectedName);
    } else {
      console.log("Không tìm thấy name cho giá trị:", value);
    }
  };
  const onClickBackPageProduct = () => {
    navigate("/admin/products/");
  };
  const onChangeValuePrice = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value === "") {
      e.target.value = "";
      setInputProduct({
        ...inputProduct,
        price: 0,
      });
      return;
    }
    const numericValue = parseInt(value, 10);
    // Format the value as a locale string
    e.target.value = numericValue.toLocaleString("vi-VN");
    setInputProduct({
      ...inputProduct,
      price: numericValue,
    });
    console.log("value", value);
  };
  const onChangeValueCapitalPrice = (e) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value == "") {
      e.target.value = "";
      setInputProduct({
        ...inputProduct,
        capital_price: 0,
      });
      return;
    }
    const numericValue = parseInt(value, 10);
    e.target.value = numericValue.toLocaleString("vi-VN");
    setInputProduct({
      ...inputProduct,
      capital_price: numericValue,
    });
    console.log("value", value);
  };
  const closePreviewImage = () => {
    setPreviewImageProduct("");
  };
  const handleStatusChange = (e) => {
    const value = e.target.value;
    // console.log("value:", value);
    const stateProduct = parseInt(value, 10);
    setInputProduct({
      ...inputProduct,
      is_active: stateProduct,
    });
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

  useEffect(() => {
    fetchDataCategory();
  }, []);
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="add-product">
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <IoIosArrowBack
            style={{ fontSize: "23px", color: "135597", cursor: "pointer" }}
            onClick={onClickBackPageProduct}
          />
          <h1
            style={{
              fontSize: "30px",

              color: "var(--color-title)",
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
          <h2 style={{ fontSize: "25px" }}>Thông tin sản phẩm</h2>
        </div>
        <div
          className="content-add-product"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            // border: "1px solid lightgray",
            borderRadius: "10px",
            padding: "30px",
            gap: "5px",
            color: "white",
            boxShadow: " 0 0 10px rgba(0, 0, 0, 0.2)",
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
              <input type="text" className="input-form" onChange={onChangeInput("barcode")} />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Tên sản phẩm chính(<span>*</span>)
              </label>
              <input type="text" className="input-form" onChange={onChangeInput("name")} />
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
                onChange={onChangeValuePrice}
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
                onChange={onChangeValueCapitalPrice}
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
              <input
                type="text"
                className="input-form"
                onChange={onChangeInput("inventory_number")}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Đơn vị tính(<span>*</span>)
              </label>
              <Select
                placeholder="Đơn vị tính"
                allowClear
                // defaultValue="Giới tính"
                style={{ width: 302, height: 36 }}
                onChange={(value) => {
                  handleSelectUnit(value);
                }}
              >
                {unitProduct.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.name}
                  </option>
                ))}
                /
              </Select>
            </div>
            <div className="input-info">
              <label htmlFor="">
                Trạng thái sản phẩm(<span>*</span>)
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
                <input
                  type="radio"
                  id="active"
                  name="status"
                  value="0"
                  // checked={status === "active"}
                  onChange={handleStatusChange}
                />
                <label htmlFor="active">Chưa kích hoạt</label>
                <input
                  type="radio"
                  id="notactivate"
                  name="status"
                  value="1"
                  // checked={status === "notactive"}
                  onChange={handleStatusChange}
                />
                <label htmlFor="notactivate">Kích hoạt</label>
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
              position: "relative",
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
                color: "var(--cl-dark)",
              }}
            >
              <label htmlFor="labelUpload" className="title-picture">
                Ảnh danh mục(<span>*</span>)
              </label>
              {!previewImageProduct ? (
                <>
                  <label htmlFor="labelUpload" className="label-upload" style={{ marginRight: 0 }}>
                    <AiOutlinePicture />
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
                  style={{
                    height: "150px",
                    width: "240px",
                    position: "relative",
                    color: "white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  }}
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
            </div>
            <div className="footer-add-product">
              <button className="btn-cancel-product" onClick={onClickBackPageProduct}>
                <FaBan className="icon" />
                Hủy
              </button>
              <button className="btn-add-product" onClick={onClickAddProduct}>
                <IoMdAdd className="icon" />
                Thêm
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddProduct;

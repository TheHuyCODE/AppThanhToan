import { Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import products from "../../configs/products";
import { format } from "date-fns";
import "./ProductManagement.css";
const ProductDetail = ({ label, value, unit }) => (
  <div className="input-info">
    <label htmlFor="" className="product-detail">
      {label}
    </label>
    <p>
      {value}
      {unit && <span>{unit}</span>}
    </p>
  </div>
);
const DetailProduct = () => {
  const navigate = useNavigate();
  const [dataProductDetail, setDataProductDetail] = useState(null);
  const [isReviewImage, setIsReviewImage] = useState("");

  const onClickBackPageProduct = () => {
    navigate("/admin/products/");
  };
  const convertDateProductDetail = (dataProductDetail) => {
    if (dataProductDetail) {
      let value = format(new Date(dataProductDetail * 1000), "dd/MM/yyyy");
      return value;
    }
  };
  const params = useParams();
  const idProduct = params.idProduct;

  // const isValidDate = (timestamp) => !isNaN(timestamp) && timestamp > 0;
  const fetchDetailProduct = async () => {
    try {
      const res = await products.getDetailProduct(idProduct);
      setDataProductDetail(res.data);
      console.log("Fetched product details:", res.data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  useEffect(() => {
    fetchDetailProduct();
    console.log("idProduct", idProduct);
  }, [idProduct]);
  useEffect(() => {
    if (dataProductDetail) {
      console.log("Updated dataProductDetail:", dataProductDetail);
      const reviewPicture = `https://cdtn.boot.ai${dataProductDetail.image_url}`;
      setIsReviewImage(reviewPicture);
      console.log("Updated review picture:", reviewPicture);
    }
  }, [dataProductDetail]);
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
            color: "var(--color-title)",
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
        <h2
          style={{
            fontFamily: "poppins, sans-serif",
            textTransform: "uppercase",
          }}
        >
          Thông tin sản phẩm
        </h2>
      </div>
      <div
        className="detail-product"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "10px",
          padding: "20px",
          gap: "5px",
        }}
      >
        <div
          className="content-add-product-right"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "30%",
            flexDirection: "column",
            height: "480px",
          }}
        >
          <div
            className="picture-item"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
              gap: "40px",
            }}
          >
            <label htmlFor="labelUpload" className="title-picture">
              Ảnh danh mục
            </label>

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
              <img
                src={isReviewImage}
                alt="Preview"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
          </div>
        </div>
        <div
          className="content-add-product-left"
          style={{
            width: "35%",
            height: "auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            marginLeft: "20px",
            marginTop: "20px",
          }}
        >
          <ProductDetail
            label="Mã sản phẩm gốc"
            value={dataProductDetail?.barcode}
            unit={undefined}
          />
          <ProductDetail
            label="Tên sản phẩm chính"
            value={dataProductDetail?.category.name}
            unit={undefined}
          />
          <ProductDetail
            label="Danh mục sản phẩm"
            value={dataProductDetail?.name}
            unit={undefined}
          />
          <ProductDetail
            label="Mô tả"
            value={dataProductDetail?.description}
            unit={undefined}
          />
          <ProductDetail
            label="Giá nhập"
            value={dataProductDetail?.price}
            unit="đ"
          />
          <ProductDetail
            label="Giá bán"
            value={dataProductDetail?.capital_price}
            unit="đ"
          />
          <ProductDetail
            label="Ngày tạo"
            value={convertDateProductDetail(dataProductDetail?.created_date)}
            unit={undefined}
          />
          <ProductDetail
            label="Ngày sửa"
            value={convertDateProductDetail(dataProductDetail?.modified_date)}
            unit={undefined}
          />
          <ProductDetail
            label="Đơn vị tính"
            value={dataProductDetail?.unit}
            unit={undefined}
          />
          <ProductDetail
            label="Người tạo"
            value={dataProductDetail?.user.full_name}
            unit={undefined}
          />
          <ProductDetail
            label="Người sửa gần nhất"
            value={dataProductDetail?.last_modified_user.full_name}
            unit={undefined}
          />
          <ProductDetail
            label="Số lượng tồn kho"
            value={dataProductDetail?.inventory_number}
            unit={undefined}
          />
          <div className="input-info">
            <label htmlFor="" className="product-detail">
              Trạng thái sản phẩm
            </label>
            {dataProductDetail?.is_active ? (
              <p>Kích hoạt</p>
            ) : (
              <p>Chưa kích hoạt</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;

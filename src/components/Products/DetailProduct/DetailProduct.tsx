import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";

import { format } from "date-fns";
import "../ProductManagement.css";
import { domain } from "../../TableConfig/TableConfig";

interface ProductDetailProps {
  label: string;
  value?: string | number | boolean | null;
  unit?: string | undefined;
}
const ProductDetail: React.FC<ProductDetailProps> = ({ label, value, unit }) => (
  <div className="detail-product-row">
    <label htmlFor="" className="product-detail">
      {label}
    </label>
    <div>
      <p>
        {value || ""}
        {unit && <span>{unit}</span>}
      </p>
    </div>
  </div>
);

const DetailProduct: React.FC = () => {
  const navigate = useNavigate();
  const [dataProductDetail, setDataProductDetail] = useState<ProductDetailData | null>(null);
  const [isReviewImage, setIsReviewImage] = useState<string>("");
  // const domain = "https://postviet.boot.ai";
  const domainLink = domain.domainLink;
  const onClickBackPageProduct = () => {
    navigate("/admin/products/");
  };
  const convertDateProductDetail = (date: number | undefined): string | undefined => {
    if (date) {
      return format(new Date(date * 1000), "dd/MM/yyyy");
    }
    return undefined;
  };

  const params = useParams<{ idProduct: string }>();
  const idProduct = params.idProduct;

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
      const reviewPicture = `${domainLink}${dataProductDetail.image_url}`;
      setIsReviewImage(reviewPicture);
      console.log("Updated review picture:", reviewPicture);
    }
  }, [dataProductDetail]);

  return (
    <div className="content">
      <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
        <IoIosArrowBack
          style={{ fontSize: "23px", color: "#135597", cursor: "pointer" }}
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
            textTransform: "uppercase",
          }}
        >
          Thông tin sản phẩm
        </h2>
      </div>
      <div className="detail-product">
        <div className="content-add-product-right">
          <div
            className="picture-item"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              flexDirection: "column",
              gap: "30px",
            }}
          >
            <label htmlFor="labelUpload" className="title-picture" style={{ fontSize: "18px" }}>
              Ảnh sản phẩm
            </label>
            <div
              className="preview-image"
              style={{
                height: "250px",
                width: "340px",
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
        <div className="content-modify-product-left">
          <div className="content-add-product-left-container-main">
            <ProductDetail label="Mã vạch gốc:" value={dataProductDetail?.barcode} />
            <ProductDetail label="Tên sản phẩm chính:" value={dataProductDetail?.name} />
            <ProductDetail label="Danh mục sản phẩm:" value={dataProductDetail?.category.name} />
            <ProductDetail
              label="Giá nhập:"
              value={dataProductDetail?.capital_price?.toLocaleString("vi-VN")}
              unit="đ"
            />
            <ProductDetail
              label="Giá bán:"
              value={dataProductDetail?.price?.toLocaleString("vi-VN")}
              unit="đ"
            />
            <ProductDetail label="Đơn vị tính:" value={dataProductDetail?.unit} />
            <ProductDetail label="Số lượng tồn kho:" value={dataProductDetail?.inventory_number} />
            <div className="detail-product-row">
              <label htmlFor="" className="product-detail">
                Trạng thái sản phẩm
              </label>
              {dataProductDetail?.is_active ? <p>Kích hoạt</p> : <p>Chưa kích hoạt</p>}
            </div>
          </div>
          <div className="content-add-product-left-container-more">
            <ProductDetail
              label="Ngày tạo:"
              value={convertDateProductDetail(dataProductDetail?.created_date)}
            />
            <ProductDetail
              label="Ngày sửa:"
              value={convertDateProductDetail(dataProductDetail?.modified_date)}
            />
            <ProductDetail label="Người tạo:" value={dataProductDetail?.user?.full_name} />
            <ProductDetail
              label="Người sửa gần nhất:"
              value={dataProductDetail?.last_modified_user?.full_name}
            />
            <ProductDetail label="Mô tả:" value={dataProductDetail?.description} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailProduct;

import { Select, TreeSelect } from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import products from "../../configs/products";
import { useAuth } from "../auth/AuthContext";
import { CiCircleRemove } from "react-icons/ci";
import { FaBan, FaRegSave } from "react-icons/fa";
import { AiOutlinePicture } from "react-icons/ai";
import { unitProductList } from "../TableConfig/unitProduct";
import { handleError } from "../../utils/errorHandler";
interface Product {
  barcode: string;
  name: string;
  description: string;
  price: number;
  capital_price: number;
  inventory_number: number;
  category_id: string;
  unit: string;
  is_active: number;
  image_url: string;
}
interface TreeDataNode {
  id: string;
  pId: string | null;
  value: string;
  title: string;
  children?: TreeDataNode[];
  name: string;
}
const ModifyProduct = () => {
  const navigate = useNavigate();
  const { fetchDataCategory, isCategoryProduct } = useAuth();
  const params = useParams<{ idProduct: string }>();
  const idProduct = params.idProduct;
  const [dataProductModify, setDataProductModify] = useState<Product | null>(null);
  const [isEditable, setIsEditable] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string | undefined>(undefined);
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [resImageProduct, setResImageProduct] = useState("");
  const [imgUrl, setImageUrl] = useState("");
  const domain = "https://cdtn.boot.ai";

  // const imageUrl = `${domain}/${inputProduct.image_url}`;
  const [inputProduct, setInputProduct] = useState({
    barcode: "",
    name: "",
    description: "",
    price: 0,
    capital_price: 0,
    inventory_number: 0,
    category_id: "",
    unit: "",
    is_active: 0,
    image_url: "",
  });
  const onClickBackPageProduct = () => {
    navigate("/admin/products/");
  };
  const handleStatusChange = (event: any) => {
    const value = event.target.id === "active" ? 1 : 0;
    setInputProduct((prevState) => ({
      ...prevState,
      is_active: value,
    }));
  };

  const getDataModifyProduct = async () => {
    try {
      const res = await products.getDetailProduct(idProduct);
      const data = res.data;
      setDataProductModify(data);
    } catch (error) {
      console.error("Error fetching product details:", error);
    }
  };
  const handleInputImage = (e: any) => {
    e.preventDefault();
    const fileImage = e.target.files[0];
    // setIsImageProduct(fileImage);
    if (fileImage) {
      const url = URL.createObjectURL(fileImage);
      setInputProduct({
        ...inputProduct,
        image_url: fileImage,
      });
      setImageUrl(url);
    }
    // setPreviewImageProduct(URL.createObjectURL(fileImage));
  };
  const closePreviewImage = () => {
    setImageUrl("");
  };
  useEffect(() => {
    const fileImageModify = inputProduct.image_url;
    console.log("inputProduct.image_url", fileImageModify);
    if (fileImageModify) {
      const formData = new FormData();
      formData.append("file", fileImageModify);
      console.log("formData:", [...formData]);
      products
        .postImageModifyProduct(formData)
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
  }, [inputProduct.image_url]);

  const treeData = isCategoryProduct.map((item: { name: string; children: []; id: string }) => ({
    id: item.id,
    name: item.name,
    children: (item.children || []).map((child: { name: string; id: string; children: [] }) => ({
      id: child.id,
      name: child.name,
      // id: child.id,
      children: (child.children || []).map((subchief: { name: string; id: string }) => ({
        id: subchief.id,
        name: subchief.name,
        // id: subchief.id,
      })),
    })),
  }));
  const transformToSimpleMode = (data: any[], parentId: string | null = null): TreeDataNode[] => {
    let result: TreeDataNode[] = [];
    data.forEach((item) => {
      result.push({
        id: item.id,
        pId: parentId,
        value: item.id,
        title: item.name,
        name: "",
      });
      if (item.children && item.children.length > 0) {
        result = result.concat(transformToSimpleMode(item.children, item.id));
      }
    });
    return result;
  };
  const filterTreeNode = (inputValue: string, treeNode: any) => {
    // Chỉ tìm kiếm trong các nút cuối cùng
    if (!treeNode.children) {
      return treeNode.title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    }
    return false;
  };
  const simpleTreeData = transformToSimpleMode(treeData);
  const findPath = (id: string, data: TreeDataNode[]): string => {
    const item = data.find((d) => d.value === id);
    if (!item) return "";
    const parentPath = item.pId ? findPath(item.pId, data) : "";
    return parentPath ? `${parentPath} -> ${item.title}` : item.title;
  };
  const findPathById = (id: string, data: TreeDataNode[]): string => {
    for (const item of data) {
      if (item.id === id) {
        return item.name;
      }
      if (item.children && item.children.length > 0) {
        const childPath = findPathById(id, item.children);
        if (childPath) {
          return `${item.name} -> ${childPath}`;
        }
      }
    }
    return "";
  };
  const onSelect = (value: string) => {
    setSelectedKeys(value);
    const path = findPath(value, simpleTreeData);
    setSelectedPath(path);
    console.log("Selected ID:", value, "Path:", path);
    setInputProduct({
      ...inputProduct,
      category_id: value,
    });
  };
  const handleSelectUnit = (value: any) => {
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
  const onChangeInput = (fieldName: any) => (e: any) => {
    let value = e.target.value;
    if (fieldName === "inventory_number") {
      value = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      value = value === "" ? 0 : parseInt(value, 10); // Convert to number or set to 0 if empty
    }
    setInputProduct({
      ...inputProduct,
      [fieldName]: value,
    });
  };
  const onClickModifyProduct = async () => {
    const dataModify = {
      // barcode: inputProduct.barcode,
      name: inputProduct.name,
      description: inputProduct.description,
      price: inputProduct.price,
      capital_price: inputProduct.capital_price,
      inventory_number: inputProduct.inventory_number,
      category_id: inputProduct.category_id,
      unit: inputProduct.unit,
      is_active: inputProduct.is_active,
      image_url: resImageProduct,
    };
    console.log("dataModify:", dataModify);
    try {
      const response = await products.putModifyProduct(idProduct, dataModify);
      if (response.code === 200) {
        console.log("res", response);
        toast.success("Đã sửa sản phẩm thành công!");
        setTimeout(() => {
          onClickBackPageProduct();
        }, 1000); // Adjust the delay as needed (1000ms = 1 second)
        // await fetchDataCategory();
        // clearInputsAddProduct;
        // setIsPreviewImage("");
      } else {
        console.log("error", response);
      }
    } catch (error) {
      handleError(error);
      // toast.error("Sửa Sản phẩm không thành công!");
      // setIsOpenPopups(isOpenPopups);
    }
  };

  const onChangeValuePrice = (e: any) => {
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
    e.target.value = numericValue.toLocaleString("vi-VN");
    setInputProduct({
      ...inputProduct,
      price: numericValue,
    });
    console.log("value", value);
  };
  const onChangeValueCapitalPrice = (e: any) => {
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
  const unitProduct = unitProductList;
  useEffect(() => {
    getDataModifyProduct();
    fetchDataCategory();
  }, [idProduct]);
  useEffect(() => {
    if (dataProductModify?.barcode) {
      setIsEditable(false);
    } else {
      setIsEditable(true);
    }
    if (dataProductModify) {
      setInputProduct({
        barcode: dataProductModify.barcode || "",
        name: dataProductModify.name || "",
        description: dataProductModify.description || "",
        price: dataProductModify.price || 0,
        capital_price: dataProductModify.capital_price || 0,
        inventory_number: dataProductModify.inventory_number || 0,
        category_id: dataProductModify.category_id || "",
        unit: dataProductModify.unit || "",
        is_active: dataProductModify.is_active ? 1 : 0,
        image_url: dataProductModify.image_url || "",
      });
      if (dataProductModify.image_url) {
        setImageUrl(`${domain}/${dataProductModify.image_url}`);
      }
      if (dataProductModify.category_id) {
        const path = findPathById(dataProductModify.category_id, treeData);
        setSelectedPath(path);
        console.log("selectPath", selectedPath);
      }
    }
  }, [dataProductModify]);

  return (
    <div>
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
            Sửa sản phẩm
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
            border: "1px solid lightgray",
            borderRadius: "10px",
            padding: "20px",
            gap: "5px",
            color: "white",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
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
                value={inputProduct.barcode}
                onChange={onChangeInput("barcode")}
                disabled={!isEditable}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Tên sản phẩm chính(<span>*</span>)
              </label>
              <input
                type="text"
                className="input-form"
                value={inputProduct.name}
                onChange={onChangeInput("name")}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">Mô tả</label>
              <TextArea
                rows={5}
                style={{ width: "300px" }}
                value={inputProduct.description}
                onChange={onChangeInput("description")}
                showCount
                maxLength={100}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Danh mục sản phẩm(<span>*</span>)
              </label>
              <TreeSelect
                showSearch
                style={{ width: "300px", height: "35px" }}
                value={selectedPath || undefined}
                notFoundContent="Không có danh mục sản phẩm"
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                placeholder="Chọn danh mục sản phẩm"
                allowClear
                multiple={false}
                treeDefaultExpandAll
                onChange={onSelect}
                treeDataSimpleMode
                treeData={simpleTreeData}
                treeNodeLabelProp="title"
                filterTreeNode={filterTreeNode}
              />
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
                value={inputProduct.price}
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
                value={inputProduct.capital_price}
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
                value={inputProduct.inventory_number}
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
                value={inputProduct.unit}
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
                  display: "flex",
                  justifyContent: "start",
                  gap: "10px",
                }}
              >
                <input
                  type="radio"
                  id="active"
                  name="status"
                  value="1"
                  checked={inputProduct.is_active === 1}
                  onChange={handleStatusChange}
                />
                <label htmlFor="active">Kích hoạt</label>
                <input
                  type="radio"
                  id="notactivate"
                  name="status"
                  value="0"
                  checked={inputProduct.is_active === 0}
                  onChange={handleStatusChange}
                />
                <label htmlFor="notactivate">Chưa kích hoạt</label>
              </div>
            </div>
          </div>
          <div className="content-add-product-right">
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
              {!imgUrl ? (
                <>
                  <label htmlFor="labelUpload" className="label-upload" style={{ marginRight: 0 }}>
                    <AiOutlinePicture style={{ fontSize: "50px" }} />
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
                    height: "220px",
                    width: "320px",
                    position: "relative",
                    color: "white",
                    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
                  }}
                >
                  <button className="btn-close-image" onClick={closePreviewImage}>
                    <CiCircleRemove />
                  </button>
                  <img src={imgUrl} alt="Preview" style={{ maxHeight: "100%", maxWidth: "100%" }} />
                </div>
              )}
            </div>
            <div className="footer-modify-product">
              <button className="btn-cancel-product" onClick={onClickBackPageProduct}>
                <FaBan className="icon" />
                Hủy
              </button>
              <button
                className="btn-add-product"
                style={{
                  display: "flex",
                  gap: "5px",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={onClickModifyProduct}
              >
                <FaRegSave className="icon" />
                Lưu
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModifyProduct;

import { Select, Input, TreeSelect } from "antd";
import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import "../ProductManagement.css";
import "../../styles/valiables.css";
import { CiCircleRemove } from "react-icons/ci";
import { FaBan } from "react-icons/fa";
import products from "../../../configs/products";
import { useAuth } from "../../auth/AuthContext";
import { Tree } from "antd";
const { TreeNode } = Tree;
import { ToastContainer, toast } from "react-toastify";
import { AiOutlinePicture } from "react-icons/ai";
const { TextArea } = Input;
import { handleError } from "../../../utils/errorHandler";
import { unitProductList } from "../../TableConfig/unitProduct";
interface TreeDataNode {
  id: string;
  pId: string | null;
  value: string;
  title: string;
  children?: TreeDataNode[];
  isLeaf?: boolean;
}
const AddProduct = () => {
  const navigate = useNavigate();
  const [isImageProduct, setIsImageProduct] = useState("");
  const [previewImageProduct, setPreviewImageProduct] = useState("");
  const [resImageProduct, setResImageProduct] = useState("");
  const { fetchDataCategory, isCategoryProduct } = useAuth();
  const [selectedKeys, setSelectedKeys] = useState<string | undefined>(undefined);
  const [selectedPath, setSelectedPath] = useState<string>("");
  const unitProduct = unitProductList;
  const [inputProduct, setInputProduct] = useState({
    barcode: "",
    name: "",
    description: "",
    price: 0,
    capital_price: 0,
    inventory_number: 0,
    is_active: 1,
    unit: "",
    category_id: "",
  });

  const onChangeInput = (fieldName: string) => (e) => {
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
  const onClickAddProduct = async (e: any) => {
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
    try {
      const response = await products.postAddProduct(dataAddProduct);
      if (response.code === 200) {
        toast.success("Thêm sản phẩm thành công");
        onClickBackPageProduct();
        await fetchDataCategory();
        clearInputsAddProduct;
      } else {
        console.log("error", response);
      }
    } catch (error) {
      handleError(error);
    }
  };

  //map data into treeData
  const treeData = isCategoryProduct.map((item: any) => ({
    id: item.id,
    pId: null,
    value: item.id,
    title: item.name,
    isLeaf: !(item.children && item.children.length > 0),
    children: item.children?.map((child: any) => ({
      id: child.id,
      pId: item.id,
      value: child.id,
      title: child.name,
      isLeaf: !(child.children && child.children.length > 0),
      children: child.children?.map((subchild: any) => ({
        id: subchild.id,
        pId: child.id,
        value: subchild.id,
        title: subchild.name,
        isLeaf: true,
      })),
    })),
  }));

  const transformToSimpleMode = (
    data: TreeDataNode[],
    parentId: string | null = null
  ): TreeDataNode[] => {
    let result: TreeDataNode[] = [];
    data.forEach((item) => {
      result.push({
        id: item.id,
        pId: parentId,
        value: item.id,
        title: item.title,
        isLeaf: item.isLeaf,
      });
      if (item.children && item.children.length > 0) {
        result = result.concat(transformToSimpleMode(item.children, item.id));
      }
    });
    return result;
  };
  const filterTreeNode = (inputValue: string, treeNode: any) => {
    if (!treeNode.children) {
      return treeNode.title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0;
    }
    return false;
  };

  // const treeData = mapToTreeData(isCategoryProduct);
  const simpleTreeData = transformToSimpleMode(treeData);

  const findPath = (id: string, data: TreeDataNode[]): string => {
    const item = data.find((d) => d.value === id);
    if (!item) return "";
    const parentPath = item.pId ? findPath(item.pId, data) : "";
    return parentPath ? `${parentPath} -> ${item.title}` : item.title;
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
  const onLoadData = (node: any) => {
    return new Promise<void>((resolve) => {
      if (node.children && node.children.length > 0) {
        resolve();
        return;
      }
      const newData = simpleTreeData.filter((item) => item.pId === node.value);
      node.children = newData;
      resolve();
    });
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
  const handleStatusChange = (e: any) => {
    const value = e.target.value;
    const stateProduct = parseInt(value, 10);
    setInputProduct({
      ...inputProduct,
      is_active: stateProduct,
    });
  };
  const handleInputImage = (e: any) => {
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
        <div className="content-add-product">
          <div className="content-add-product-left">
            <div className="input-info">
              <label htmlFor="">
                Mã sản phẩm gốc(<span>*</span>)
              </label>
              <input
                type="text"
                className="input-form"
                onChange={onChangeInput("barcode")}
                placeholder="Mã sản phẩm gốc "
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
                placeholder="Tên sản phẩm"
              />
            </div>
            <div className="input-info">
              <label htmlFor="">Mô tả</label>
              <TextArea
                rows={4}
                style={{ width: "300px" }}
                onChange={onChangeInput("description")}
                placeholder="Mô tả"
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
                placeholder="Danh mục sản phẩm"
                style={{ width: "300px", height: "35px" }}
                value={selectedPath || undefined}
                notFoundContent="Không có danh mục sản phẩm"
                dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                allowClear
                multiple={false}
                treeDefaultExpandAll={false}
                onChange={onSelect}
                treeDataSimpleMode
                treeData={simpleTreeData}
                treeNodeLabelProp="title"
                filterTreeNode={filterTreeNode}
                loadData={onLoadData}
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
                onChange={onChangeValuePrice}
                style={{
                  position: "relative",
                }}
                placeholder="Giá vốn"
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
                placeholder="Giá bán"
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
                placeholder="Số lượng"
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
                  id="notactivate"
                  name="status"
                  value="1"
                  onChange={handleStatusChange}
                  defaultChecked
                />
                <label htmlFor="notactivate">Kích hoạt</label>
                <input
                  type="radio"
                  id="active"
                  name="status"
                  value="0"
                  onChange={handleStatusChange}
                />
                <label htmlFor="active">Chưa kích hoạt</label>
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

import { Input, Select, TreeSelect } from "antd";
import { useEffect, useState, useRef } from "react";
import { AiOutlinePicture } from "react-icons/ai";
import { CiCircleRemove } from "react-icons/ci";
import { FaBan } from "react-icons/fa";
import { IoIosArrowBack, IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import products from "../../../configs/products";
import { handleError } from "../../../utils/errorHandler";
import { useAuth } from "../../auth/AuthContext";
import "../../styles/valiables.css";
import { unitProductList } from "../../TableConfig/unitProduct";
import "../ProductManagement.css";

const { TextArea } = Input;
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
  //@ts-ignore
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
  const [priceError, setPriceError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [touchedFields, setTouchedFields] = useState({
    price: false,
    capital_price: false,
  });
  //@ts-ignore
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
    console.log("Add button clicked. Form state:", inputProduct, "Image:", resImageProduct);
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
      //@ts-ignore
      if (response.code === 200) {
        toast.success("Thêm sản phẩm thành công");
        setTimeout(() => {
          onClickBackPageProduct();
        }, 500);
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
  //@ts-ignore
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
  const validatePrice = () => {
    if (touchedFields.price && inputProduct.price < inputProduct.capital_price) {
      setPriceError("Giá bán không được nhỏ hơn giá vốn!");
    } else {
      setPriceError("");
    }
  };
  //@ts-ignore
  const onChangeValuePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value === "") {
      e.target.value = "";
      setInputProduct((prevState) => ({
        ...prevState,
        capital_price: 0,
      }));
    } else {
      const numericValue = parseInt(value, 10);
      e.target.value = numericValue.toLocaleString("vi-VN");
      setInputProduct((prevState) => ({
        ...prevState,
        capital_price: numericValue,
      }));
    }
    if (touchedFields.price) {
      validatePrice();
    }
  };
  //@ts-ignore
  const onChangeValueCapitalPrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    if (value === "") {
      e.target.value = "";
      setInputProduct((prevState) => ({
        ...prevState,
        price: 0,
      }));
    } else {
      const numericValue = parseInt(value, 10);
      e.target.value = numericValue.toLocaleString("vi-VN");
      setInputProduct((prevState) => ({
        ...prevState,
        price: numericValue,
      }));
    }
  };

  const handlePriceBlur = () => {
    setTouchedFields((prev) => ({ ...prev, price: true }));
    validatePrice();
  };

  useEffect(() => {
    if (touchedFields.price) {
      validatePrice();
    }
  }, [inputProduct.price, inputProduct.capital_price, touchedFields.price]);

  useEffect(() => {
    const { barcode, name, price, capital_price, inventory_number, unit, category_id } =
      inputProduct;

    const isValid =
      barcode.trim() !== "" &&
      name.trim() !== "" &&
      price > 0 &&
      capital_price > 0 &&
      inventory_number > 0 &&
      unit.trim() !== "" &&
      category_id.trim() !== "" &&
      resImageProduct !== "" &&
      price >= capital_price &&
      !priceError;
    setIsFormValid(isValid);
  }, [inputProduct, resImageProduct, priceError]);

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
  };
  useEffect(() => {
    if (isImageProduct) {
      const formData = new FormData();
      formData.append("file", isImageProduct);
      console.log("formData:", [...formData]);
      products
        .postImageProduct(formData)
        .then((res) => {
          //@ts-ignore
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

  const onChangeInventoryNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, ""); // Chỉ cho phép số
    if (value === "") {
      e.target.value = "";
      setInputProduct((prevState) => ({
        ...prevState,
        inventory_number: 0,
      }));
    } else {
      const numericValue = parseInt(value, 10);
      e.target.value = numericValue.toString(); // Không cần format như giá
      setInputProduct((prevState) => ({
        ...prevState,
        inventory_number: numericValue,
      }));
    }
  };

  // Tạo refs cho mỗi input
  const barcodeRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLTextAreaElement>(null);
  const categoryRef = useRef<HTMLInputElement>(null);
  const capitalPriceRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);
  const inventoryNumberRef = useRef<HTMLInputElement>(null);
  const unitRef = useRef<HTMLSelectElement>(null);
  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval>;
    let lastValue = "";

    const checkBarcodeInput = () => {
      const currentValue = barcodeRef.current?.value || "";
      if (currentValue !== lastValue) {
        lastValue = currentValue;
        // Cập nhật state với giá trị mới
        setInputProduct((prev) => ({
          ...prev,
          barcode: currentValue,
        }));
      }
    };

    // Bắt đầu polling
    // eslint-disable-next-line prefer-const
    intervalId = setInterval(checkBarcodeInput, 100); // Kiểm tra mỗi 100ms

    // Dọn dẹp khi component unmount
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  // Hàm xử lý phím Enter
  const handleEnterKey = (
    e: React.KeyboardEvent<HTMLElement>,
    nextRef: React.RefObject<HTMLElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef.current?.focus();
    }
  };

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
                ref={barcodeRef}
                type="text"
                className="input-form"
                onChange={onChangeInput("barcode")}
                value={inputProduct.barcode}
                placeholder="Mã sản phẩm gốc "
                onKeyDown={(e) => handleEnterKey(e, nameRef)}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Tên sản phẩm chính(<span>*</span>)
              </label>
              <input
                ref={nameRef}
                type="text"
                className="input-form"
                onChange={onChangeInput("name")}
                placeholder="Tên sản phẩm"
                onKeyDown={(e) => handleEnterKey(e, descriptionRef)}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">Mô tả</label>
              <TextArea
                ref={descriptionRef}
                rows={4}
                style={{ width: "300px" }}
                onChange={onChangeInput("description")}
                placeholder="Mô tả"
                showCount
                maxLength={100}
                onKeyDown={(e) => handleEnterKey(e, categoryRef)}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Danh mục sản phẩm(<span>*</span>)
              </label>

              <TreeSelect
                //@ts-ignore
                ref={categoryRef}
                showSearch
                placeholder="Danh mục sản phẩm"
                style={{ width: 300, height: 40 }}
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
                onKeyDown={(e) => handleEnterKey(e, capitalPriceRef)}
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
                ref={capitalPriceRef}
                type="text"
                className="input-form"
                onChange={onChangeValuePrice}
                onBlur={() => setTouchedFields((prev) => ({ ...prev, capital_price: true }))}
                value={inputProduct.capital_price.toLocaleString("vi-VN")}
                style={{
                  position: "relative",
                }}
                placeholder="Giá vốn"
                onKeyDown={(e) => handleEnterKey(e, priceRef)}
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
                ref={priceRef}
                type="text"
                className="input-form"
                onChange={onChangeValueCapitalPrice}
                onBlur={handlePriceBlur}
                value={inputProduct.price.toLocaleString("vi-VN")}
                style={{
                  position: "relative",
                }}
                placeholder="Giá bán"
                onKeyDown={(e) => handleEnterKey(e, inventoryNumberRef)}
              />
              <p className="overlay-text">đ</p>
            </div>

            {priceError && (
              <div
                style={{
                  width: "600px",
                  color: "red",
                  fontSize: "12px",
                  marginTop: "5px",
                  display: "flex",
                  alignItems: "end",
                  justifyContent: "end",
                }}
              >
                <p>{priceError}</p>
              </div>
            )}
            <div className="input-info">
              <label htmlFor="">
                Số lượng tồn kho(<span>*</span>)
              </label>
              <input
                ref={inventoryNumberRef}
                type="text"
                className="input-form"
                placeholder="Số lượng"
                value={inputProduct.inventory_number || ""}
                onChange={onChangeInventoryNumber}
                onKeyDown={(e) => handleEnterKey(e, unitRef)}
              />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Đơn vị tính(<span>*</span>)
              </label>
              <Select
                ref={unitRef}
                placeholder="Đơn vị tính"
                allowClear
                // defaultValue="Giới tính"
                style={{ width: 300, height: 40 }}
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
              <button
                className="btn-add-product"
                onClick={onClickAddProduct}
                disabled={!isFormValid}
                style={{ opacity: isFormValid ? 1 : 0.5 }}
              >
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

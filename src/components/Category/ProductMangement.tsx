import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./ProductManagement.css";
import "../styles/valiables.css";
import uploadApiImage from "../../configs/uploadApiImage";
import { Select, Button, Table, Space, Modal } from "antd";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaEye,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { Option } from "antd/es/mentions";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import products from "../../configs/products";
import { useAuth } from "../auth/AuthContext";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";

const ProductMangement = () => {
  const { fetchDataCategory, isCategoryProduct } = useAuth();
  const [dataProduct, setDataProduct] = useState([]);
  const navigate = useNavigate();
  const [openModalDeleteProduct, setOpenModalDeleteProduct] = useState(false);
  const [deleteItemProduct, setDeleteItemProduct] = useState<any>();
  const [IsValueSearchProduct, setIsValueSearchProduct] = useState("");
  const [idSearchCategory, setIdSearchCategory] = useState({
    id_category: "",
  });
  // const [value, setValue] = useState("");
  // const [dataProduct, setDataProduct] = useState([]);
  const statusProduct = [
    { id: 1, name: "Còn" },
    { id: 2, name: "Còn" },
    { id: 3, name: "Còn" },
  ];
  const [selectedValue, setSelectedValue] = useState(null);
  const nameProduct = isCategoryProduct.map((item, index) => ({
    name: item.name,
    value: index + 1,
    id: item.id,
  }));
  const handleSelectChange = (e) => {
    // uploadApiImage.postMessage();
    setSelectedValue(e.target.value);
    console.log("setSelectedValue", selectedValue);
  };
  const addProduct = () => {
    navigate("/admin/products/add");
  };
  const detailProduct = (record) => {
    navigate(`/admin/products/${record.key}`);
  };
  const modifyProduct = (record) => {
    navigate(`/admin/products/edit/${record.key}`);
  };
  const deleteProduct = async (record: any) => {
    setOpenModalDeleteProduct(!openModalDeleteProduct);
    console.log("deleteProduct", record);
    setDeleteItemProduct(record);
  };

  const handleSelectCategory = (value) => {
    const selectedCategory = nameProduct.find((item) => item.value === value);
    if (selectedCategory) {
      console.log("Name tương ứng với value:", selectedCategory);
      console.log("Name tương ứng với id:", selectedCategory.id);
      const idSearch = selectedCategory.id;
      setIdSearchCategory({
        ...idSearchCategory,
        id_category: idSearch,
      });
      console.log("idSearchCategory", idSearchCategory);
      // setSelectedCategory(selectedName);
    } else {
      console.log("Không tìm thấy name cho giá trị:", value);
      fetchDataProduct();
    }
  };
  const handleSearchProduct = (e) => {
    const value = e.target.value.trim();
    setIsValueSearchProduct(value);
  };
  const handleDeleteProduct = async () => {
    console.log("handleDeleteProduct");
    const keyItemsProduct = deleteItemProduct.key;
    if (keyItemsProduct) {
      const res = await products.deleteProduct(keyItemsProduct);
      if (res.code === 200) {
        setOpenModalDeleteProduct(!openModalDeleteProduct);
        toast.success("Đã xóa sản phẩm thành công");
        await fetchDataProduct();
        console.log("error:", res);
      } else {
        toast.error("Lỗi! Chưa xóa được sản phẩm");
        setOpenModalDeleteProduct(!openModalDeleteProduct);
      }
    }
  };
  //fetch api product
  const fetchDataProduct = async () => {
    const res = await products.getAll();
    setDataProduct(res.data);
    console.log("data category", res.data.items);
    console.log(res.data);
  };

  useEffect(() => {
    console.log("isCategoryProduct:", isCategoryProduct);
    fetchDataCategory();
    fetchDataProduct();
  }, []);

  //get api search products for category
  useEffect(() => {
    console.log("idSearchCategory", idSearchCategory.id_category);
    const fetchSearchDataCategory = async () => {
      if (idSearchCategory.id_category) {
        // Check if idSearchCategory is not empty
        const res = await products.getDataSearchProduct(
          idSearchCategory.id_category
        );
        if (res.code === 200) {
          console.log(res.data);
          setTimeout(() => {
            setDataProduct(res.data);
          }, 1000);
        } else {
          console.log(res.data);
        }
      }
      // if (idSearchCategory.id_category === "undefined") {
      //   await fetchDataProduct();
      // }
    };
    fetchSearchDataCategory();
  }, [idSearchCategory.id_category]);
  const datatable = dataProduct.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    barcode: item.barcode,
    name: item.name,
    description: item.description,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
    modified_date: item.description,
    last_modified_user: item.last_modified_user,
    store_id: item.store_id,
    create_user: item.user.full_name,
    category_id: item.category_id,
    category: item.category.name,
    price: item.price,
    capital_price: item.capital_price,
    inventory_number: item.inventory_number,
    unit: item.unit,
    is_activate: item.is_activate,
    image_url: item.image_url,
  }));
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Mã sản phẩm chính",
      dataIndex: "barcode",
      key: "barcode",
      filteredValue: [IsValueSearchProduct],
      onFilter: (value, record) => {
        return (
          String(record.barcode)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.created_date)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.category)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
    },
    {
      title: "Tên sản phẩm",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Danh mục sản phẩm",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Giá nhập",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Giá bán",
      dataIndex: "capital_price",
      key: "capital_price",
    },
    {
      title: "Số lượng tồn",
      dataIndex: "inventory_number",
      key: "inventory_number",
    },
    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
    },

    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      // align: "center",
    },
    {
      title: "Người tạo",
      dataIndex: "create_user",
      key: "create_user",
      // align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a>
            <FaEye onClick={() => detailProduct(record)} />
          </a>
          <a>
            <FaPencilAlt onClick={() => modifyProduct(record)} />
          </a>
          <a>
            <FaTrash
              style={{ color: "red" }}
              onClick={() => deleteProduct(record)}
            />
          </a>
        </Space>
      ),
    },
  ];

  return (
    <div className="content">
      <ToastContainer closeOnClick autoClose={5000} />

      <h1
        style={{
          fontFamily: "poppins, sans-serif",
          color: "var(--color-tiltle)",
        }}
      >
        Quản lí sản phẩm
      </h1>
      <div
        className="header"
        style={{ display: "flex", alignItems: "center", border: "none" }}
      >
        <div className="header-left">
          <div className="header-left-top">
            <div
              className="search-product"
              style={{ display: "flex", position: "relative" }}
            >
              <CiSearch
                style={{
                  position: "absolute",
                  top: "7px",
                  left: "5px",
                  transform: "translateY(5%)",
                  fontSize: "20px",
                }}
              />
              <input
                type="text"
                placeholder="Tìm sản phẩm"
                className="search-category"
                onChange={handleSearchProduct}
              />
            </div>
            <Select
              placeholder="Hãng sản xuất"
              allowClear
              onChange={handleSelectChange}
              style={{ width: 200, height: 35 }}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>
            <Select
              placeholder="Danh mục sản phẩm"
              allowClear
              onChange={(value) => {
                handleSelectCategory(value);
              }}
              style={{ width: 200, height: 35 }}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>
          </div>
          <div className="header-left-bottom">
            <Select
              placeholder="Loại giảm giá"
              allowClear
              onChange={handleSelectChange}
              style={{ width: 200, height: 35 }}
            >
              {nameProduct.map((option) => (
                <option value={option.value}>{option.name}</option>
              ))}
            </Select>

            <Select
              placeholder="Trạng thái sản phẩm"
              allowClear
              onChange={handleSelectChange}
              style={{ width: 200, height: 35 }}
            >
              {statusProduct.map((option) => (
                <option value={option.id}>{option.name}</option>
              ))}
            </Select>
            <div
              style={{
                width: "200px",
                height: "35px",
                display: "flex",
                alignItems: "center",
                gap: "10px",
              }}
            >
              <input type="checkbox" />
              <label htmlFor="">Sản phẩm bán chạy</label>
            </div>
          </div>
        </div>
        <div
          className="header-right"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "10px",
            padding: "10px",
            marginLeft: "80px",
          }}
        >
          <Button className="btn-header-right" type="primary">
            Hướng dẫn sử dụng
          </Button>
          <Button type="primary" className="btn-header-right">
            <FaArrowAltCircleUp /> &nbsp; Export
          </Button>
          <Button type="primary" className="btn-header-right">
            <FaArrowAltCircleDown /> &nbsp; Import
          </Button>
          <Button
            type="primary"
            onClick={addProduct}
            className="btn-header-right"
          >
            Thêm sản phẩm
          </Button>
        </div>
        <Modal
          okButtonProps={{ style: { backgroundColor: "red" } }}
          width={600}
          centered
          open={openModalDeleteProduct}
          onOk={handleDeleteProduct}
          onCancel={() => setOpenModalDeleteProduct(!openModalDeleteProduct)}
          okText="Xóa"
          cancelText="Hủy bỏ"
        >
          <h1
            style={{
              fontFamily: "Arial",
              fontSize: "30px",
              fontWeight: "bold",
              padding: "5px 10px",
              marginBottom: "6px",
            }}
          >
            Xóa sản phẩm
          </h1>
          <span style={{ fontSize: "15px", padding: "5px 10px" }}>
            Bạn chắc chắn muốn xóa sản phẩm này không?
          </span>
        </Modal>
      </div>
      <div className="table-container">
        <Table
          columns={columns}
          dataSource={datatable}
          pagination={{
            position: ["bottomCenter"],
            defaultPageSize: 15,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
          }}
        ></Table>
        <span className="total-items">{`${datatable?.length} items`}</span>
      </div>
    </div>
  );
};

export default ProductMangement;

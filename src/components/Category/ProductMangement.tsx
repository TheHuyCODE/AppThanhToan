import { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "./ProductManagement.css";
import "../styles/valiables.css";
// import uploadApiImage from "../../configs/uploadApiImage";
import { Select, Table, Space, Modal, Pagination } from "antd";
import {
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import AddProduct from "./AddProduct";
import { useNavigate } from "react-router-dom";
import products from "../../configs/products";
import { useAuth } from "../auth/AuthContext";
import { format } from "date-fns";
import { ToastContainer, toast } from "react-toastify";
import { localeProduct, paginationConfig } from "../TableConfig/TableConfig";
import Spinners from "../SpinnerLoading/Spinners";
import useDebounce from "../auth/useDebounce";
import { IoMdAdd } from "react-icons/io";
import { width } from "@fortawesome/free-solid-svg-icons/fa0";
// let locale = {
//   emptyText: 'Abc',
// };
const ProductMangement = () => {
  const { fetchDataCategory, isCategoryProduct } = useAuth();
  const [dataProduct, setDataProduct] = useState([]);
  const navigate = useNavigate();
  const [openModalDeleteProduct, setOpenModalDeleteProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteItemProduct, setDeleteItemProduct] = useState<any>();
  const [valueSearch, setValueSearch] = useState("");
  const debounceValue = useDebounce(valueSearch, 700);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortedColumn, setSortedColumn] = useState({
    key: null,
    direction: null,
  });
  const [hoveredColumn, setHoveredColumn] = useState(null);
  const [idSearchCategory, setIdSearchCategory] = useState({
    id_category: "",
  });
  const [stateActiveProduct, setStateActiveProduct] = useState({
    is_active: "",
  });
  const handleHeaderClick = (key: string) => {
    setSortedColumn((prevState) => {
      if (prevState.key === key) {
        const newDirection = prevState.direction === "up" ? "down" : "up";
        console.log(`New direction for column ${key}: ${newDirection}`);
        return { key, direction: newDirection };
      }
      console.log(`Sorting direction for column ${key}: up`);
      return { key, direction: "up" };
    });
  };
  const getColumnTitle = (title: string, key: string) => (
    <div
      className="table-header"
      onClick={() => handleHeaderClick(key)}
      onMouseEnter={() => setHoveredColumn(key)}
      onMouseLeave={() => setHoveredColumn(null)}
      // style={{ position: "relative", width: width }}
    >
      <span style={{ display: "block" }}>{title}</span>
      <div className="arrow-icon-container">
        {sortedColumn.key === key && sortedColumn.direction === "up" && (
          <FaArrowUp className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key === key && sortedColumn.direction === "down" && (
          <FaArrowDown className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key !== key && hoveredColumn === key && (
          <FaArrowUp className="arrow-icon arrow-icon-hover arrow-icon-visible" />
        )}
      </div>
    </div>
  );
  // const handleHeaderClick = (key: string) => {
  //   console.log('key')
  // }

  const statusProduct = [
    { value: 1, name: "Kích hoạt", id: "00001" },
    { value: 2, name: "Chưa kích hoạt", id: "00002" },
  ];
  const [selectedValue, setSelectedValue] = useState(null);
  const nameProduct = isCategoryProduct?.map((item, index) => ({
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

  //search product by category

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
  // search products by active
  const handleSelectActive = (value: number) => {
    console.log("value", value);
    const isActiveProduct = statusProduct.find((item) => item.value === value);
    if (isActiveProduct) {
      if (isActiveProduct.id === "00001") {
        setStateActiveProduct({
          ...stateActiveProduct,
          is_active: "true",
        });
      } else if (isActiveProduct.id === "00002") {
        setStateActiveProduct({
          ...stateActiveProduct,
          is_active: "false",
        });
      }
      // Log the updated state after the state update
      console.log("active", stateActiveProduct.is_active);
      // Log additional information about the active product
      console.log("Name tương ứng với value:", isActiveProduct);
      console.log("Name tương ứng với id:", isActiveProduct.id);
    } else {
      console.log("Không tìm thấy value:", value);
      fetchDataProduct();
    }
  };
  const handleSearchProduct = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim();
    setValueSearch(value);
    console.log("value", value);
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
    setLoading(true);
    try {
      const res = await products.getAll();
      const totalItems = res.data.total;
      setDataProduct(res.data);
      setTotalItems(totalItems);
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
    }
    // console.log("data category", res.data.items);
    // console.log(res.data);
  };

  const fetchDataSearchProduct = async () => {
    setLoading(true);
    const res = await products.getDataSearchNameProduct(debounceValue);
    if (res.code === 200) {
      setDataProduct(res.data);
      setLoading(false);
    } else {
      console.log("Error:");
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchDataSearchProduct();
    console.log("valueSearchProduct", valueSearch);
  }, [debounceValue]);
  useEffect(() => {
    console.log("isCategoryProduct:", isCategoryProduct);
    fetchDataCategory();
    fetchDataProduct();
  }, []);

  //get api search products for category
  const fetchSearchDataCategory = async () => {
    if (idSearchCategory.id_category) {
      // Check if idSearchCategory is not empty
      const res = await products.getDataSearchProduct(idSearchCategory.id_category);
      if (res.code === 200) {
        console.log(res.data);
        setDataProduct(res.data);
      } else {
        console.log(res.data);
      }
    }
  };
  const onShowSizeChange = (current: number, size: number) => {
    console.log("Current page:", current);
    console.log("Page size:", size);
    getDataPagination(current, size);
    setPage(current);
    setPageSize(size);
  };
  const onChangeNumberPagination = (current: number) => {
    console.log("Current page:", current);
    getDataPagination(current, pageSize);
    setPage(current);
  };
  const getDataPagination = async (current: number, size: number) => {
    // setLoading(true);
    try {
      const res = await products.getDataProductPagination(current, size);
      if (res.data) {
        setDataProduct(res.data);
        // setLoading(false);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
    }
  };

  useEffect(() => {
    console.log("idSearchCategory", idSearchCategory.id_category);
    fetchSearchDataCategory();
  }, [idSearchCategory.id_category]);

  const fetchSearchDataActive = async () => {
    if (stateActiveProduct.is_active) {
      // Check if idSearchCategory is not empty
      const res = await products.getDataSearchProductActive(stateActiveProduct.is_active);
      if (res.code === 200) {
        console.log(res.data);
        setDataProduct(res.data);
      } else {
        console.log(res.data);
      }
    }
  };
  useEffect(() => {
    console.log("active", stateActiveProduct.is_active);
    fetchSearchDataActive();
  }, [stateActiveProduct.is_active]);

  useEffect(() => {
    console.log("key", sortedColumn.key);
    console.log("key", sortedColumn.direction);
    // setLoading(true);
    const fetchSortDataProduct = async () => {
      if (sortedColumn.key) {
        // Check if idSearchCategory is not empty
        const res = await products.getDataSortProduct(sortedColumn.key, sortedColumn.direction);
        if (res.code === 200) {
          console.log(res.data);
          setDataProduct(res.data);
          // setLoading(false);
        } else {
          console.log(res.data);
          // setLoading(false);
        }
      }
    };
    fetchSortDataProduct();
  }, [stateActiveProduct.is_active]);

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
    is_active: item.is_active ? "kích hoạt" : "Chưa kích hoạt",
    image_url: item.image_url,
  }));
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 80,
    },
    {
      title: getColumnTitle(`Mã sản phẩm chính`, "barcode"),
      dataIndex: "barcode",
      key: "barcode",
      align: "start",
      width: 130,
    },
    {
      title: getColumnTitle("Tên sản phẩm", "name"),
      dataIndex: "name",
      key: "name",
    },
    {
      title: getColumnTitle("Danh mục \n sản phẩm", "category"),
      dataIndex: "category",
      key: "category",
    },
    {
      title: getColumnTitle("Giá bán", "price"),
      dataIndex: "price",
      key: "price",
    },
    {
      title: getColumnTitle("Giá vốn", "capital_price"),
      dataIndex: "capital_price",
      key: "capital_price",
    },
    {
      title: getColumnTitle("Số lượng tồn kho", "inventory_number"),
      dataIndex: "inventory_number",
      key: "inventory_number",
    },

    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
    },

    {
      title: getColumnTitle("Ngày tạo", "created_date"),
      dataIndex: "created_date",
      key: "created_date",
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
            <FaTrash style={{ color: "red" }} onClick={() => deleteProduct(record)} />
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
          fontFamily: "var( --kv-font-sans-serif)",
          color: "var(--color-title)",
        }}
      >
        Quản lí sản phẩm
      </h1>
      <div
        className="header"
        style={{
          display: "flex",
          alignItems: "center",
          border: "none",
          color: "white",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.4)",
        }}
      >
        <div className="header-left">
          <div className="header-left-top">
            <div className="search-product" style={{ display: "flex", position: "relative" }}>
              <CiSearch
                style={{
                  position: "absolute",
                  top: "6px",
                  left: "5px",
                  transform: "translateY(5%)",
                  fontSize: "20px",
                  color: "var(--cl-dark)",
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
              placeholder="Danh mục sản phẩm"
              allowClear
              onChange={(value) => {
                handleSelectCategory(value);
              }}
              style={{ width: 200, height: 35 }}
            >
              {nameProduct.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
            {/* <Select
              placeholder="Loại giảm giá"
              allowClear
              onChange={handleSelectChange}
              style={{ width: 200, height: 35 }}
            >
              {nameProduct.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.name}
                </option>
              ))}
            </Select> */}
            <Select
              placeholder="Trạng thái sản phẩm"
              allowClear
              onChange={(value) => {
                handleSelectActive(value);
              }}
              style={{ width: 200, height: 35 }}
            >
              {statusProduct.map((option) => (
                <option value={option.value} key={option.id}>
                  {option.name}
                </option>
              ))}
            </Select>
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
          <button className="btn-header-right">Hướng dẫn sử dụng</button>
          <button className="btn-header-right" style={{ width: "100px" }}>
            <FaArrowAltCircleUp /> &nbsp; Export
          </button>
          <button className="btn-header-right" style={{ width: "100px" }}>
            <FaArrowAltCircleDown /> &nbsp; Import
          </button>
          <button onClick={addProduct} className="btn-header-right">
            <IoMdAdd className="icon" /> Thêm sản phẩm
          </button>
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
        {loading ? (
          <Spinners loading={loading} />
        ) : (
          <>
            <Table
              columns={columns}
              height={900}
              dataSource={datatable}
              locale={localeProduct}
              pagination={false}
              scroll={{
                y: 500,
              }}
            />
            <div
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                gap: "10px",
                marginTop: "10px",
                padding: "10px",
              }}
            >
              <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onChangeNumberPagination}
                defaultCurrent={1}
                total={totalItems}
              />
              <span
                className="total-items"
                style={{ color: "var(--cl-dark)" }}
              >{`${datatable?.length}/${dataProduct.total}`}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductMangement;

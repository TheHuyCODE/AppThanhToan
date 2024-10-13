import { useEffect, useRef, useState } from "react";
import { CiSearch } from "react-icons/ci";
import "../styles/valiables.css";
import "./ProductManagement.css";
// import uploadApiImage from "../../configs/uploadApiImage";
import { Modal, Pagination, Select, Space, Table, TreeSelect } from "antd";
import { format } from "date-fns";
import {
  FaArrowAltCircleDown,
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import products from "../../configs/products";
import { handleError } from "../../utils/errorHandler";
import { localeProduct } from "../TableConfig/TableConfig";
import { useAuth } from "../auth/AuthContext";
import useDebounce from "../auth/useDebounce";

import { FILE_NAME_EXPORT, LINK_EXPORT } from "../../constants/constants";
import { getDateTimeNow } from "../../constants/functionContants";
import ButtonExportToExcel from "../UI/ButtonExport";
interface TreeDataNode {
  id: string;
  pId: string | null;
  value: string;
  title: string;
  children?: TreeDataNode[];
  isLeaf?: boolean;
}
type SortState = {
  key: string | null;
  direction: "asc" | "desc" | null;
};

const Products = () => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { fetchDataCategory, isCategoryProduct } = useAuth();
  const [dataProduct, setDataProduct] = useState([]);
  const [isFileExcelImport, setIsFileExcelImport] = useState("");
  const navigate = useNavigate();
  console.log("time", getDateTimeNow());
  const fileName = `${FILE_NAME_EXPORT}_${getDateTimeNow()}`;
  const [openModalDeleteProduct, setOpenModalDeleteProduct] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleteItemProduct, setDeleteItemProduct] = useState<any>(); //@ts-ignore
  const [selectedKeys, setSelectedKeys] = useState<string | undefined>(
    undefined
  );
  const [selectedPath, setSelectedPath] = useState<string>("");
  const [valueSearch, setValueSearch] = useState("");
  const debounceValue = useDebounce(valueSearch, 700); //@ts-ignore
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalItems, setTotalItems] = useState(0);
  const [sortedColumn, setSortedColumn] = useState<SortState>({
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
  const sortDataCustomer = async (colName: string, typeSort: string) => {
    setLoading(true);
    try {
      const res = await products.sortDataProduct(colName, typeSort);
      const totalItems = res.data.total;
      setDataProduct(res.data);
      setTotalItems(totalItems);
      setLoading(false);
    } catch (error) {
      console.log("error:", error);
      setLoading(false);
      handleError(error);
    }
  };
  const handleHeaderClick = (key: string) => {
    setSortedColumn((prevState) => {
      if (prevState.key === key) {
        const newDirection = prevState.direction === "asc" ? "desc" : "asc";
        console.log(`New direction for column ${key}: ${newDirection}`);
        sortDataCustomer(key, newDirection);
        return { key, direction: newDirection };
      }
      console.log(`Sorting direction for column ${key}: asc`);
      return { key, direction: "asc" };
    });
  };
  const getColumnTitle = (title: string, key: string) => (
    <div
      className="table-header"
      onClick={() => handleHeaderClick(key)} //@ts-ignore
      onMouseEnter={() => setHoveredColumn(key)}
      onMouseLeave={() => setHoveredColumn(null)}
      // style={{ position: "relative", width: width }}
    >
      <span style={{ display: "block" }}>{title}</span>
      <div className="arrow-icon-container">
        {sortedColumn.key === key && sortedColumn.direction === "asc" && (
          <FaArrowUp className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key === key && sortedColumn.direction === "desc" && (
          <FaArrowDown className="arrow-icon arrow-icon-visible" />
        )}
        {sortedColumn.key !== key && hoveredColumn === key && (
          <FaArrowUp className="arrow-icon arrow-icon-hover arrow-icon-visible" />
        )}
      </div>
    </div>
  );

  const statusProduct = [
    { value: 1, name: "Kích hoạt", id: "00001" },
    { value: 2, name: "Chưa kích hoạt", id: "00002" },
  ];
  const handleClickImportFileExcel = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the hidden file input
    }
  };
  const handleFileChange = async (event: any) => {
    const file = event.target.files[0];
    console.log("file", file);
    setIsFileExcelImport(file);
    // if (file) {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   // Send the file to the backend
    //   try {
    //     const res = await products.getImportFile(formData);
    //     console.log("res", res.data);
    //   } catch (error) {
    //     handleError(error);
    //   }
    // }
  };
  useEffect(() => {
    if (isFileExcelImport) {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", isFileExcelImport);
      console.log("formData:", [...formData]);
      products
        .getImportFile(formData)
        .then((res) => {
          //@ts-ignore
          if (res.code === 200) {
            // const data = res.data.file_url;
            console.log("data", res);
            setLoading(false);
            fetchDataProduct();
            toast.success("Import file thành công!");
            setIsFileExcelImport("");
          } else {
            console.log("Error:");
          }
        })
        .catch((error) => {
          handleError(error);
          setLoading(false);
          setIsFileExcelImport("");
        });
    }
  }, [isFileExcelImport]);
  const addProduct = () => {
    navigate("/admin/products/add");
  };
  const detailProduct = (record: any) => {
    navigate(`/admin/products/${record.key}`);
  };
  const modifyProduct = (record: any) => {
    navigate(`/admin/products/edit/${record.key}`);
  };
  const deleteProduct = async (record: any) => {
    setOpenModalDeleteProduct(!openModalDeleteProduct);
    console.log("deleteProduct", record);
    setDeleteItemProduct(record);
  };
  //search product by category
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
      return (
        treeNode.title.toLowerCase().indexOf(inputValue.toLowerCase()) >= 0
      );
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

  const onSelect = (value: string) => {
    setSelectedKeys(value);
    const path = findPath(value, simpleTreeData);
    setSelectedPath(path);
    console.log("Selected ID:", value, "Path:", path);
    setIdSearchCategory({
      ...idSearchCategory,
      id_category: value,
    });
    if (value === undefined || path === "") {
      fetchDataProduct();
    }
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
      const res = await products.deleteProduct(keyItemsProduct); //@ts-ignore
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
      handleError(error);
    }
  };
  const fetchDataSearchProduct = async () => {
    setLoading(true);
    const res = await products.getDataSearchNameProductNotIsActive(
      debounceValue
    ); //@ts-ignore
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
  }, [debounceValue]);
  useEffect(() => {
    fetchDataCategory();
    fetchDataProduct();
  }, []);

  //get api search products for category
  const fetchSearchDataCategory = async () => {
    if (idSearchCategory.id_category) {
      // Check if idSearchCategory is not empty
      const res = await products.getDataSearchProduct(
        idSearchCategory.id_category
      ); //@ts-ignore
      if (res.code === 200) {
        console.log(res.data);
        setDataProduct(res.data);
      } else {
        console.log(res.data);
      }
    }
  };
  const onShowSizeChange = (current: number, size: number) => {
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

  const fetchSearchDataActive = async () => {
    if (stateActiveProduct.is_active) {
      const res = await products.getDataSearchProductActive(
        stateActiveProduct.is_active
      ); //@ts-ignore
      if (res.code === 200) {
        console.log(res.data);
        setDataProduct(res.data);
      } else {
        console.log(res.data);
      }
    }
  };
  useEffect(() => {
    console.log("idSearchCategory", idSearchCategory.id_category);
    fetchSearchDataCategory();
  }, [idSearchCategory.id_category]);
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
        const res = await products.getDataSortProduct(
          sortedColumn.key,
          sortedColumn.direction
        ); //@ts-ignore
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
  //@ts-ignore
  const datatable = dataProduct.items?.map((item: any, index: number) => ({
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
    category: item.category?.name || null,
    price: item.price?.toLocaleString("vi-VN") || 0,
    capital_price: item.capital_price?.toLocaleString("vi-VN") || 0,
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
      width: 60,
      fixed: "left",
    },
    {
      title: getColumnTitle(`Mã vạch`, "barcode"),
      dataIndex: "barcode",
      key: "barcode",
      align: "start",
      width: 130,
      fixed: "left",
    },
    {
      title: getColumnTitle("Tên sản phẩm", "name"),
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 160,
      fixed: "left",
    },
    {
      title: getColumnTitle("Danh mục \n sản phẩm", "category"),
      dataIndex: "category",
      key: "category",
      width: 130,
    },
    {
      title: getColumnTitle("Giá vốn", "capital_price"),
      dataIndex: "capital_price",
      key: "capital_price",
      width: 140,
      align: "center",
    },
    {
      title: getColumnTitle("Giá bán", "price"),
      dataIndex: "price",
      key: "price",
      width: 140,
      align: "center",
    },

    {
      title: getColumnTitle("Số lượng tồn kho", "inventory_number"),
      dataIndex: "inventory_number",
      key: "inventory_number",
      width: 140,
    },

    {
      title: "Đơn vị tính",
      dataIndex: "unit",
      key: "unit",
      width: 80,
    },
    {
      title: "Trạng thái",
      dataIndex: "is_active",
      key: "is_active",
      width: 80,
    },

    {
      title: getColumnTitle("Ngày tạo", "created_date"),
      dataIndex: "created_date",
      key: "created_date",
      width: 140,
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      width: 100,
      fixed: "right",
      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaEye onClick={() => detailProduct(record)} title="Xem" />
          </a>
          <a>
            <FaPencilAlt onClick={() => modifyProduct(record)} title="Sửa" />
          </a>
          <a>
            <FaTrash
              style={{ color: "red" }}
              onClick={() => deleteProduct(record)}
              title="Xóa"
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
          fontFamily: "var( --kv-font-sans-serif)",
          color: "var(--color-title)",
        }}
      >
        Quản lý sản phẩm
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
            <div
              className="search-product"
              style={{ display: "flex", position: "relative" }}
            >
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

            <TreeSelect
              showSearch
              placeholder="Danh mục sản phẩm"
              style={{ width: "260px", height: "35px" }}
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
            <Select
              placeholder="Trạng thái sản phẩm"
              allowClear
              onChange={(value) => {
                handleSelectActive(value);
              }}
              style={{ width: 210, height: 35 }}
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
            justifyContent: "end",
            flexWrap: "wrap",
            gap: "10px",
            padding: "10px",
            marginLeft: "80px",
          }}
        >
          <ButtonExportToExcel
            linkExport={LINK_EXPORT}
            fileName={fileName}
          ></ButtonExportToExcel>
          <button
            className="btn-header-right"
            style={{ width: "100px" }}
            onClick={handleClickImportFileExcel}
            disabled={loading}
          >
            <FaArrowAltCircleDown /> &nbsp; Import
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              accept=".xlsx, .xls" // Accept only Excel files
              onChange={handleFileChange}
            />
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
        <Table //@ts-ignore
          columns={columns}
          height={900}
          dataSource={datatable}
          locale={localeProduct}
          pagination={false}
          loading={loading}
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
          <span className="total-items" style={{ color: "var(--cl-dark)" }}>
            {/* @ts-ignore */}
            {`${dataProduct.total || 0} `}sản phẩm
          </span>
        </div>
      </div>
    </div>
  );
};

export default Products;

import { CiSearch } from "react-icons/ci";
import {
  FaArrowDown,
  FaPencilAlt,
  FaTrash,
  FaArrowAltCircleDown,
  FaArrowAltCircleUp,
} from "react-icons/fa";
import "./CatalogManagement.css";
import { IoIosAdd } from "react-icons/io";
import { Input, Select, Pagination } from "antd";
import { Space, Table, Tag } from "antd";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast, ToastContainer } from "react-toastify";
import category from "../../configs/category";
import { format } from "date-fns";
import { IoIosArrowForward } from "react-icons/io";
// import PopupAdditem from "../listitem/PopupAddItem";
import React, { useEffect, useState, useRef } from "react";
import { Button, Modal } from "antd";
import { Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CatalogManagement = () => {
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [image, setIsImage] = useState("");
  const [previewImage, setIsPreviewImage] = useState("");
  const [isClearInput, setIsClearInput] = useState("");
  const [dataCategory, setDataCategory] = useState({
    name: "",
  });
  const navigate = useNavigate();
  const [resImage, setResImage] = useState("");
  const [errorMessageCategories, setErrorMessageCategories] = useState("");
  const [isOpenModalDetele, setIsOpenModalDelete] = useState(false);
  const [isOpenModalModify, setIsOpenModalModify] = useState(false);
  const [isDataCategory, setIsDataCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [idDeleteItems, setIdDeteleItem] = useState("");
  const [isValueSearch, setIsValueSearch] = useState("");
  const setHandleInput = (fileName) => (e) => {
    const value = e.target.value.trim();
    setIsClearInput(value);
    console.log("value", value);
    setDataCategory({
      ...dataCategory,
      [fileName]: value,
    });
  };
  useEffect(() => {
    console.log(isValueSearch);
  }, [isValueSearch]);
  const onDeleteCategories = () => {
    console.log("deleteCategories");
    setIsOpenModalDelete(!isOpenModalDetele);
  };
  const clickDeleteCategory = async () => {
    // call api delete
    const accessToken = localStorage.getItem("access_token");
    if (idDeleteItems && idDeleteItems.length > 0 && accessToken) {
      const res = await category.deleteCategory(idDeleteItems, accessToken);
      if (res.code === 200) {
        console.log("res:", res);
        setIsOpenModalDelete(!isOpenModalDetele);
        toast.success("Đã xóa sản phẩm thành công"); // Fetch the updated data after deletion
        await fetchDataCategory();
      } else {
        console.log("error:", res);
        toast.error("Error deleting category");
      }
    }
  };
  const onChangeCategories = () => {
    setIsOpenModalModify(!isOpenModalModify);
  };
  const clickChangeCategory = () => {
    //call api change
  };
  // const handleCategoryClick = (record) => {
  //   setSelectedCategory(record.name);
  //   console.log("categoryName", selectedCategory);
  // };
  const handleImage = (e) => {
    e.preventDefault();
    const fileImage = e.target.files[0];
    setIsImage(fileImage);
    setIsPreviewImage(URL.createObjectURL(fileImage));
    console.log(image);
  };

  useEffect(() => {
    if (image) {
      console.log("image:", image);
      const formData = new FormData();
      const prefixImage = "category";
      formData.append("file", image);
      console.log("formData:", [...formData]);
      uploadApiImage
        .postImage(formData, prefixImage)
        .then((res) => {
          if (res.code === 200) {
            console.log("Success:", res);
            const fileUrl = res.data.file_url;
            setResImage(fileUrl);
          } else {
            console.log("Error:");
          }
        })
        .catch((error) => {
          console.error("Error occurred while uploading:", error);
        });
    }
  }, [image]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên danh mục cấp 1",
      dataIndex: "name",
      align: "center",
      editTable: true,
      key: "name",
      filteredValue: [isValueSearch],
      onFilter: (value, record) => {
        return (
          String(record.name)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.created_date)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase()) ||
          String(record.number_children)
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
        );
      },
    },
    {
      title: "Số lượng danh mục cấp 2",
      // title: (titleProps) => {
      //   const sortedColumn = titleProps.sortColumns?.find(({ column }) => column.key === "name");

      //   return (
      //     <div style={{ display: "flex", justifyContent: "spaceBetween" }}>
      //      some title
      //      {sortedColumn?.order === 'ascend' ? <SortUpIcon /> : <SortDownIcon />}
      //    </div>
      //   )
      // }
      dataIndex: "number_children",
      key: "number_children",
      align: "center",
      editTable: true,
      sorter: (record1, record2) => {
        return record1.Soluong > record2.Soluong;
      },
      // sortIcon: ({sortOrder}) =><FaArrowAltCircleDown order={sortOrder}/>
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
      editTable: true,
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      editTable: true,
      render: () => (
        <Space size="middle">
          <a onClick={onChangeCategories}>
            <FaPencilAlt />
          </a>
          <a onClick={onDeleteCategories}>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  //Clear value categories
  const clearInputs = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    if (fileRef.current) {
      fileRef.current.value = "";
    }
  };
  const clickAddItemCategory = async (event) => {
    event.preventDefault();
    setIsOpenPopups(!isOpenPopups);
    const accessToken = localStorage.getItem("access_token");
    const userDataCategory = {
      name: dataCategory.name,
      file_url: resImage,
      parent_id: null,
    };
    try {
      const response = await uploadApiImage.postAddImageCategory(
        userDataCategory,
        accessToken
      );
      if (response.code === 200) {
        console.log("res", response);
        toast.success("Đã thêm danh mục thành công!");
        await fetchDataCategory();
        clearInputs();
      } else {
        console.log("error", response);
        toast.error("Thêm danh mục không thành công!");
        const errorMessage = response.data.message.text;
        setErrorMessageCategories(errorMessage);
        console.log(errorMessage);
        setIsOpenPopups(isOpenPopups);
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Có lỗi xảy ra khi thêm danh mục!");
      setIsOpenPopups(isOpenPopups);
    }
  };

  const fetchDataCategory = async () => {
    const accessToken = localStorage.getItem("access_token"); // Lấy token từ localStorage hoặc từ nơi bạn lưu trữ token
    const res = await category.getAll(accessToken);
    setIsDataCategory(res.data);
    console.log("data category", res.data.items);
    console.log(res.data);
  };
  useEffect(() => {
    fetchDataCategory();
  }, []);
  const dataTable = isDataCategory.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    name: item.name,
    number_children: item.number_children,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
  }));
  return (
    <div className="content">
      <ToastContainer closeOnClick autoClose={5000} />
      <div>
        <a className="title-category">Quản lí danh mục sản phẩm </a>
        <IoIosArrowForward />
        <a className="title-category">{selectedCategory}</a>
      </div>
      <div className="header">
        <div className="header-top">
          <div className="header-top right">
            <CiSearch className="icon" />
            <input
              type="text"
              placeholder="Tìm danh mục"
              className="search-categories"
              onChange={(e) => setIsValueSearch(e.target.value)}
            />
          </div>
          <div className="header-btn">
            <Button type="primary">Hướng dẫn sử dụng</Button>
            <Button
              type="primary"
              onClick={() => setIsOpenPopups(!isOpenPopups)}
            >
              Thêm danh mục cấp 1
            </Button>

            {/* modal add product */}
            <Modal
              className="modalDialog-addITems"
              width={500}
              // height={500}
              centered
              open={isOpenPopups}
              onOk={clickAddItemCategory}
              onCancel={() => setIsOpenPopups(!isOpenPopups)}
              okText="Thêm"
              cancelText="Hủy bỏ"
            >
              <h1 className="title-addItem">Thêm danh mục cấp 1</h1>
              <div className="name-item">
                <label htmlFor="">
                  Tên danh mục 1 (<span>*</span>)
                </label>
                <input
                  className="input-name-category"
                  onChange={setHandleInput("name")}
                  ref={nameRef}
                />
              </div>
              <div className="picture-item">
                <label htmlFor="" className="title-picture">
                  Ảnh danh mục(<span>*</span>)
                </label>
                <label htmlFor="labelUpload" className="label-upload">
                  <IoIosAdd />
                  Upload File Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="labelUpload"
                  // style={{display: "none"}}
                  onChange={handleImage}
                  ref={fileRef}
                  hidden
                />
              </div>
              <div className="preview-image">
                {image ? (
                  <img
                    src={previewImage}
                    alt=""
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </Modal>

            {/* Modal Modify product */}
            <Modal
              className="modalDialog-addITems"
              width={500}
              // height={500}
              centered
              open={isOpenModalModify}
              onOk={clickChangeCategory}
              onCancel={() => setIsOpenModalModify(!isOpenModalModify)}
              okText="Thêm"
              cancelText="Hủy bỏ"
            >
              <h1 className="title-addItem">Thêm danh mục cấp 1</h1>
              <div className="name-item">
                <label htmlFor="">
                  Tên danh mục 1 (<span>*</span>)
                </label>
                <input
                  className="input-name-category"
                  onChange={setHandleInput("name")}
                  ref={nameRef}
                />
              </div>
              <div className="picture-item">
                <label htmlFor="" className="title-picture">
                  Ảnh danh mục(<span>*</span>)
                </label>
                <label htmlFor="labelUpload" className="label-upload">
                  <IoIosAdd />
                  Upload File Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  name="file"
                  id="labelUpload"
                  // style={{display: "none"}}
                  onChange={handleImage}
                  ref={fileRef}
                  hidden
                />
              </div>
              <div className="preview-image">
                {image ? (
                  <img
                    src={previewImage}
                    alt=""
                    style={{ maxHeight: "100%", maxWidth: "100%" }}
                  />
                ) : (
                  <span>Preview Image</span>
                )}
              </div>
            </Modal>
            {/* Modal Delete product */}

            <Modal
              okButtonProps={{ style: { backgroundColor: "red" } }}
              width={600}
              centered
              open={isOpenModalDetele}
              onOk={clickDeleteCategory}
              onCancel={() => setIsOpenModalDelete(!isOpenModalDetele)}
              okText="Xóa"
              cancelText="Hủy bỏ"
            >
              <h1>Xóa sản phẩm</h1>
              <span>Bạn chắc chắn muốn xóa sản phẩm này không?</span>
            </Modal>
            {/* {isOpenPopups && <PopupAdditem onClose={handleClose}/>} */}
          </div>
        </div>
        <div className="table-container">
          <Table
            columns={columns}
            dataSource={dataTable}
            onRow={(record, rowIndex) => {
              return {
                onClick: () => {
                  console.log(record, rowIndex);
                  const name = record.name;
                  setSelectedCategory(name);
                  const idItem = record.key;
                  console.log("idItem", idItem);
                  setIdDeteleItem(idItem);
                  // navigate(`/productcatalogmanagement/${idItem}`);
                },
              };
            }}
            // rowKey={(record) => record.data_index}q
            pagination={{
              position: ["bottomCenter"],
              defaultPageSize: 15,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
          <span className="total-items">{`${isDataCategory.total} items`}</span>
        </div>
      </div>
      {/* {isOpenPopups && <PopupAdditem onClose={handleClose} />} */}
    </div>
  );
};
export default CatalogManagement;

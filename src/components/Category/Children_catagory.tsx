import React, { useEffect, useRef, useState } from "react";
import { Table, Space, Button, Modal, Pagination } from "antd";
import { useParams } from "react-router-dom";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import "./Children_category.css";
import { IoIosAdd } from "react-icons/io";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast } from "react-toastify";
import { CiCircleRemove, CiSearch } from "react-icons/ci";
import category from "../../configs/category";
import { format } from "date-fns";
import { useAuth } from "../auth/AuthContext";
import ChildrenThree_catagory from "./ChildrenThree_catagory";
import { AiOutlinePicture } from "react-icons/ai";
import { domain } from "../TableConfig/TableConfig";
import useDebounce from "../auth/useDebounce";
import Spinners from "../SpinnerLoading/Spinners";
import TextArea from "antd/es/input/TextArea";

const ChildrenCategory = ({
  isKeyChild,
  fetchDataCategory,
  onCategoryChange,
  onHiddenTitleChild,
  viewTableChildSecond,
}) => {
  const domainLink = domain.domainLink;
  // const params = useParams();
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const description = useRef(null);
  const reviewImageRefChild = useRef(null);
  const [isHiddenThreeChild, setIsHiddenThreeChild] = useState(false);
  const {
    isResDataChild,
    setIsResDataChild,
    fetchDataCategoryChild,
    fetchDataCategorySecondChild,
  } = useAuth();
  const [isOpenPopupChild, setIsOpenPopupChild] = useState(false);
  const [isInputCategoryChild, setIsInputCategoryChild] = useState("");
  const [isImageCategoryChild, setIsImageCategoryChild] = useState("");
  const [isResImageCategoryChild, setResImageCategoryChild] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  // const [isPreviewImageChild, setIsPreviewImageChild] = useState("");
  const [isPreviewImageModifyChild, setIsPreviewImageModifyChild] = useState("");
  const [isValueSearchChild, setIsValueSearchChild] = useState("");
  const debounceValue = useDebounce(isValueSearchChild, 700);
  const [isOpenModalDeleteChild, setIsOpenModalDeleteChild] = useState(false);
  const [isOpenModalModifyChild, setIsOpenModalModifyChild] = useState(false);
  const [isDescription, setIsDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [idDeleteItemsChild, setIdDeleteItemsChild] = useState<any>();
  const [modifyItem, setModifyItem] = useState<any>();
  const [isInputDataCategoryTwo, setIsInputDataCategoryTwo] = useState<any>();

  const [isKeyThreeChild, setIsKeyThreeChild] = useState("");
  // const [selectedCategoryChild, setSelectedCategoryChild] = useState("");
  const [viewTableChild, setViewTableChild] = useState(true);
  const handleSearchCategory = (e: any) => {
    const value = e.target.value.trim();
    setIsValueSearchChild(value);
    console.log("value", value);
  };
  const clearInputChildren = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    if (description.current) {
      description.current.value = "";
    }
    setIsInputCategoryChild("");
    setIsImageCategoryChild("");
    // setResImageCategoryChild("");
    // setIsPreviewImageChild("");
  };
  const openModalChildSecond = () => {
    setIsOpenPopupChild(!isOpenPopupChild);
  };
  const clickAddItemCategoryChild = async (event: any) => {
    console.log("addItemCategoryChild");
    event.preventDefault();
    setIsOpenPopupChild(!isOpenPopupChild);
    const userDataCategoryChild = {
      name: isInputCategoryChild,
      description: isDescription,
      parent_id: isKeyChild,
    };
    try {
      const res = await uploadApiImage.postAddItemCategoryChild(userDataCategoryChild);
      if (res.code === 200) {
        console.log("res", res);
        const successMs = res.message.text;
        toast.success(successMs);
        await fetchDataCategory();
        await fetchDataCategoryChild(isKeyChild);
        clearInputChildren();
      } else {
        const errorMessage = res.data.message.text;
        toast.error(errorMessage);
        setIsOpenPopupChild(true);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  //delete items child category

  const onDeleteCategories = (items) => {
    console.log("onDeleteCategories");
    setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
    setIdDeleteItemsChild(items);
    console.log(items);
  };
  const clickDeleteCategoryChild = async () => {
    // call api deleteCategoryChild
    const keyItemChild = idDeleteItemsChild.key;
    if (keyItemChild) {
      const res = await category.deleteCategoryChild(keyItemChild);
      if (res.code === 200) {
        console.log("res:", res);
        setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
        toast.success("Đã xóa sản phẩm cấp 2 thành công");
        // await fetchDataCategory();
        await fetchDataCategoryChild(isKeyChild);
      } else {
        console.log("error:", res);
        setIsOpenModalDeleteChild(isOpenModalDeleteChild);
      }
    }
  };
  //modify items child category
  const changeModifyCategoryChild = async () => {
    console.log("modidy child category", modifyItem);
    const dataPutCategoryChild = {
      name: modifyItem.name,
      description: isDescription,
      parent_id: isKeyChild,
    };

    const idModifyItemsChild = modifyItem.key;
    console.log("idModifyItemsChild", idModifyItemsChild);
    console.log("dataPutCategoryChild", dataPutCategoryChild);
    try {
      const res = await category.putModifyCategoryChild(idModifyItemsChild, dataPutCategoryChild);
      if (res.code === 200) {
        console.log("res", res);
        const messSuccess = res.message.text;
        toast.success(messSuccess);
        await fetchDataCategoryChild(isKeyChild);
        setIsOpenModalModifyChild(!isOpenModalModifyChild);
        clearInputChildren();
      } else {
        console.log("Error:", res);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const onModifyCategories = (record) => {
    console.log("onModifyCategories", record);
    setIsOpenModalModifyChild(!isOpenModalModifyChild);
    setModifyItem(record);
    setIsInputDataCategoryTwo(record);
    console.log("record:", record.key);
    console.log("record:", record.image_url);

    if (record.image_url) {
      setIsPreviewImageModifyChild(`${domainLink}/${record.image_url}`);
    }
  };

  //get input values and file images ChildrenCategory

  const setHandleInput = (event) => {
    const value = event.target.value;
    // console.log("value Category 2:", value);
    setIsInputCategoryChild(value);
    if (modifyItem) {
      setModifyItem({ ...modifyItem, name: value });
    }
  };
  //get list items children category

  const dataTableChild = isResDataChild.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    name: item.name,
    number_children: item.number_children,
    description: item.description,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
    image_url: item.image_url,
  }));

  useEffect(() => {
    if (isImageCategoryChild) {
      const uploadImage = async () => {
        try {
          const res = await uploadApiImage.postImageCategoryChild(isImageCategoryChild);
          if (res.code === 200) {
            const fileUrl = res.data.file_url;
            console.log("fileUrlRes:", fileUrl);
            setResImageCategoryChild(fileUrl);
          } else {
            console.log("Error:", res);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      };
      uploadImage();
    }
  }, [isImageCategoryChild]);
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: 100,
    },
    {
      title: "Tên danh mục cấp 2",
      dataIndex: "name",
      key: "name",
      align: "center",
      width: 200,
    },
    {
      title: "Số lượng danh mục cấp 3",
      dataIndex: "number_children",
      key: "number_children",
      align: "center",
      editTable: true,
      width: 250,
    },
    {
      title: "Mô tả ngắn",
      dataIndex: "description",
      key: "description",
      align: "center",
      editTable: true,
      width: 300,
    },
    {
      title: "Ngày tạo",
      dataIndex: "created_date",
      key: "created_date",
      align: "center",
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (record: any) => (
        <Space size="middle">
          <a onClick={() => onModifyCategories(record)}>
            <FaPencilAlt />
          </a>
          <a onClick={() => onDeleteCategories(record)}>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  //set with click table
  const columnsWithClick = columns?.map((col, index) => {
    if (index < 4) {
      return {
        ...col,
        onCell: (record: any) => ({
          onClick: () => {
            console.log("Click row");
            console.log("record:", record);
            const name = record.name;
            console.log("nameClicked", name);
            const keyChild = record.key;
            console.log("keyChild: ", keyChild);
            // setSelectedCategoryChild(name);
            setIsKeyThreeChild(keyChild);
            fetchDataCategorySecondChild(keyChild);
            if (typeof onCategoryChange === "function") {
              onCategoryChange(name); // Gọi hàm từ component cha
            }
            if (typeof onCategoryChange === "function") {
              onHiddenTitleChild(false); // Gọi hàm từ component cha
            }
            setViewTableChild(false);
          },
        }),
      };
    }
    return col;
  });
  const onChangeInputChild = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("describe", e.target.value);
    const value = e.target.value;
    setIsDescription(value);
    if (isInputDataCategoryTwo) {
      setIsInputDataCategoryTwo({
        ...isInputDataCategoryTwo,
        description: value,
      });
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
      const res = await category.getDataCategoryPaginationChild(isKeyChild, current, size);
      if (res.data) {
        const data = res.data;
        setIsResDataChild(data);
      } else {
        console.log("err");
      }
    } catch (err) {
      console.log("err", err);
    }
  };
  //check state category
  useEffect(() => {
    console.log("viewTableChildSecond", viewTableChildSecond);
    if (viewTableChildSecond) {
      setViewTableChild(viewTableChild);
      console.log("viewTableChild", viewTableChild);
    }
  }, [viewTableChildSecond]);
  const fetchDataSearchCategory = async () => {
    setLoading(true);
    const res = await category.getDataSearchNameChildCategory(isKeyChild, debounceValue);
    if (res.code === 200) {
      setIsResDataChild(res.data);
      setLoading(false);
    } else {
      console.log("Error:");
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("viewTableChildSecond", viewTableChildSecond);
    fetchDataSearchCategory();
  }, [debounceValue]);
  return (
    <>
      {isResDataChild.items == 0 ? (
        <div className="add_children_category">
          <p>Chưa có model cấp 2</p>
          <Button
            type="primary"
            onClick={openModalChildSecond}
            style={{ backgroundColor: "var( --kv-success)" }}
          >
            Thêm danh mục cấp 2
          </Button>
        </div>
      ) : (
        <div>
          <div className="header-top">
            <div className="header-top-right">
              {viewTableChild && (
                <>
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
                    placeholder="Tìm danh mục cấp 2"
                    className="search-categories"
                    onChange={handleSearchCategory}
                  />
                </>
              )}
            </div>
            <div className="header-btn">
              {viewTableChild && (
                <>
                  <Button type="primary" style={{ backgroundColor: "var( --kv-success)" }}>
                    Hướng dẫn sử dụng
                  </Button>
                  <Button
                    type="primary"
                    onClick={openModalChildSecond}
                    style={{ backgroundColor: "var( --kv-success)" }}
                  >
                    Thêm danh mục cấp 2
                  </Button>
                </>
              )}
            </div>
          </div>
          {viewTableChild ? (
            <div className="table-container">
              {loading ? (
                <Spinners loading={loading} />
              ) : (
                <>
                  <Table
                    columns={columnsWithClick}
                    dataSource={dataTableChild}
                    pagination={false}
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
                      total={isResDataChild.total}
                    />
                    <span
                      className="total-items"
                      style={{ color: "black" }}
                    >{`${dataTableChild?.length} danh mục cấp 2`}</span>
                  </div>
                </>
              )}
            </div>
          ) : (
            <ChildrenThree_catagory isKeyThreeChild={isKeyThreeChild} />
          )}
        </div>
      )}
      {/* modal add child category */}
      <Modal
        className="modalDialog-addITems"
        width={500}
        // height={500}
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        centered
        open={isOpenPopupChild}
        onOk={clickAddItemCategoryChild}
        onCancel={() => setIsOpenPopupChild(!isOpenPopupChild)}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Thêm danh mục cấp 2</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên danh mục 2 (<span>*</span>)
          </label>
          <input className="input-name-category" onChange={setHandleInput} ref={nameRef} />
        </div>
        <div className="decribe-category">
          <label htmlFor="" className="title-picture">
            Mô tả danh mục cấp 2(<span>*</span>)
          </label>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChangeInputChild}
            placeholder="Chú thích danh mục"
            style={{ height: 100, width: 260 }}
            ref={description}
          />
        </div>
      </Modal>
      {/* modal delete child category */}
      <Modal
        okButtonProps={{ style: { backgroundColor: "red" } }}
        width={600}
        centered
        open={isOpenModalDeleteChild}
        onOk={clickDeleteCategoryChild}
        onCancel={() => setIsOpenModalDeleteChild(!isOpenModalDeleteChild)}
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
      {/* modal modify child category */}
      <Modal
        className="modalDialog-addITems"
        width={500}
        okButtonProps={{ style: { backgroundColor: "var(--kv-success)" } }}
        centered
        open={isOpenModalModifyChild}
        onOk={changeModifyCategoryChild}
        onCancel={() => setIsOpenModalModifyChild(!isOpenModalModifyChild)}
        okText="Sửa đổi"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Sửa danh mục cấp 2</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên danh mục 2 (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            onChange={setHandleInput}
            value={modifyItem?.name || ""}
          />
        </div>
        <div className="decribe-category">
          <label htmlFor="" className="title-picture">
            Mô tả danh mục cấp 2(<span>*</span>)
          </label>
          <TextArea
            showCount
            maxLength={100}
            onChange={onChangeInputChild}
            placeholder="Chú thích danh mục"
            style={{ height: 100, width: 260 }}
            value={isInputDataCategoryTwo?.description || ""}
          />
        </div>
      </Modal>
    </>
  );
};

export default ChildrenCategory;

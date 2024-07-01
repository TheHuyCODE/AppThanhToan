import { Button, Modal, Space, Table } from "antd";
import { format } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { CiCircleRemove, CiSearch } from "react-icons/ci";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
import { useAuth } from "../Auth/AuthContext";
import { AiOutlinePicture } from "react-icons/ai";
import uploadApiImage from "../../configs/uploadApiImage";
import { toast } from "react-toastify";
import { domain } from "../TableConfig/TableConfig";
import category from "../../configs/category";
import useDebounce from "../Auth/useDebounce";

const ChildrenThree_catagory = ({ isKeyThreeChild }) => {
  const domainLink = domain.domainLink;
  const nameRef = useRef(null);
  const fileRef = useRef(null);
  const reviewImageRefChild = useRef(null);
  const {
    isResDataChildSeconds,
    setIsResDataChildSeconds,
    fetchDataCategorySecondChild,
  } = useAuth();
  const [isInputCategoryChild, setIsInputCategoryChild] = useState("");
  const [isImageCategoryChild, setIsImageCategoryChild] = useState("");
  const [isResImageCategoryChild, setResImageCategoryChild] = useState("");
  const [isValueSearchChild, setIsValueSearchChild] = useState("");
  const debounceValue = useDebounce(isValueSearchChild, 700);

  const [isPreviewImageModifyChild, setIsPreviewImageModifyChild] =
    useState("");
  const [isPreviewImageChild, setIsPreviewImageChild] = useState("");
  const [isOpenModalAddCategory, setIsOpenModalAddCategory] = useState(false);
  const [isOpenModalModifyChild, setIsOpenModalModifyChild] = useState(false);
  const [isOpenModalDeleteChild, setIsOpenModalDeleteChild] = useState(false);

  const [modifyItem, setModifyItem] = useState<any>();
  const [idDeleteItemsChild, setIdDeleteItemsChild] = useState<any>();
  const [isKeyChildThree, setIsKeyChildThree] = useState("");
  const handleSearchCategory = (e) => {
    const value = e.target.value.trim();
    setIsValueSearchChild(value);
  };
  const openModalChildSecond = () => {
    setIsOpenModalAddCategory(!isOpenModalAddCategory);
  };
  const setHandleInput = (event) => {
    const value = event.target.value;
    console.log("value Category 2:", value);
    setIsInputCategoryChild(value);
    if (modifyItem) {
      setModifyItem({ ...modifyItem, name: value });
    }
  };
  const onModifyCategoriesThree = (record) => {
    setIsOpenModalModifyChild(!isOpenModalModifyChild);
    setModifyItem(record);
    setIsKeyChildThree(record.key);
    if (record.image_url) {
      setIsPreviewImageModifyChild(`${domainLink}/${record.image_url}`);
    }
  };
  const handleImageChild = (event) => {
    event.preventDefault();
    const fileImage = event.target.files[0];
    setIsImageCategoryChild(fileImage);
    setIsPreviewImageChild(URL.createObjectURL(fileImage));
    console.log("fileImage:", fileImage);
  };

  const handleImageModifyChild = (event) => {
    event.preventDefault();
    const fileImage = event.target.files[0]; // Corrected here
    setIsImageCategoryChild(fileImage);
    setIsPreviewImageModifyChild(URL.createObjectURL(fileImage));
    console.log("fileImage:", fileImage);
  };
  const closePreviewImage = () => {
    setIsPreviewImageChild("");
    setIsPreviewImageModifyChild("");
  };
  const clearInputChildren = () => {
    if (nameRef.current) {
      nameRef.current.value = "";
    }
    if (fileRef.current) {
      fileRef.current.value = "";
    }
    if (reviewImageRefChild.current) {
      reviewImageRefChild.current.value = "";
    }
  };
  const clickAddItemCategoryChild = async (event) => {
    console.log("adding category Seconds");
    event.preventDefault();
    setIsOpenModalAddCategory(!isOpenModalAddCategory);
    const userDataCategoryChild = {
      name: isInputCategoryChild,
      file_url: isResImageCategoryChild,
      parent_id: isKeyThreeChild,
    };
    try {
      const res = await uploadApiImage.postAddItemCategoryChild(
        userDataCategoryChild
      );
      if (res.code === 200) {
        console.log("res", res);
        toast.success("Đã thêm danh mục cấp 3 thành công!");
        // await fetchDataCategory();
        await fetchDataCategorySecondChild(isKeyThreeChild);
        clearInputChildren();
      } else {
        toast.error("Danh mục này đã có");
        setIsOpenModalAddCategory(true);

        console.log("Error:", res);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const changeModifyCategoryChild = async () => {
    console.log("modidy child category", modifyItem);
    setIsOpenModalModifyChild(!isOpenModalModifyChild);
    const dataPutCategoryChild = {
      name: modifyItem.name,
      file_url: isResImageCategoryChild,
      parent_id: isKeyThreeChild,
    };
    const idModifyItemsChild = modifyItem.key;
    console.log("idModifyItemsChild", idModifyItemsChild);
    console.log("dataPutCategoryChild", dataPutCategoryChild);
    try {
      const res = await category.putModifyCategoryChild(
        idModifyItemsChild,
        dataPutCategoryChild
      );
      if (res.code === 200) {
        console.log("res", res);
        toast.success("Đã sửa danh mục cấp 3 thành công!");
        // await fetchDataCategoryChild(isKeyChild);
        await fetchDataCategorySecondChild(isKeyThreeChild);
        clearInputChildren();
      } else {
        console.log("Error:", res);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const clickDeleteCategoryChild = async () => {
    const keyItemChild = idDeleteItemsChild.key;
    if (keyItemChild) {
      const res = await category.deleteCategoryChild(keyItemChild);
      if (res.code === 200) {
        console.log("res:", res);
        setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
        toast.success("Đã xóa sản phẩm cấp 3 thành công");
        // await fetchDataCategory();
        await fetchDataCategorySecondChild(isKeyThreeChild);
      } else {
        console.log("error:", res);
        setIsOpenModalDeleteChild(isOpenModalDeleteChild);
      }
    }
  };
  const onDeleteCategoriesThree = (record) => {
    setIsOpenModalDeleteChild(!isOpenModalDeleteChild);
    setIdDeleteItemsChild(record);
  };
  // const dataTableChild = [
  //   {
  //     stt: 1,
  //     name: "Danh mục 1",
  //     number_children: 5,
  //     created_date: "2023-05-10",
  //     key: "1",
  //   },
  //   {
  //     stt: 2,
  //     name: "Danh mục 2",
  //     number_children: 3,
  //     created_date: "2023-07-15",
  //     key: "2",
  //   },
  //   {
  //     stt: 3,
  //     name: "Danh mục 3",
  //     number_children: 8,
  //     created_date: "2023-04-22",
  //     key: "3",
  //   },
  //   {
  //     stt: 4,
  //     name: "Danh mục 4",
  //     number_children: 1,
  //     created_date: "2023-09-01",
  //     key: "4",
  //   },
  //   {
  //     stt: 5,
  //     name: "Danh mục 5",
  //     number_children: 6,
  //     created_date: "2023-06-18",
  //     key: "5",
  //   },
  // ];
  const dataTableChild = isResDataChildSeconds.items?.map((item, index) => ({
    stt: index + 1,
    key: item.id,
    name: item.name,
    number_children: item.number_children,
    created_date: format(new Date(item.created_date * 1000), "dd/MM/yyyy"),
    image_url: item.image_url,
  }));
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Tên danh mục cấp 3",
      dataIndex: "name",
      key: "name",
      align: "center",
      //   filteredValue: [isValueSearchChild],
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
      title: "Số lượng danh mục cấp 3",
      dataIndex: "number_children",
      key: "number_children",
      align: "center",
      // sorter: (a, b) => a.number_children - b.number_children,
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
      render: (record) => (
        <Space size="middle">
          <a onClick={() => onModifyCategoriesThree(record)}>
            <FaPencilAlt />
          </a>
          <a onClick={() => onDeleteCategoriesThree(record)}>
            <FaTrash style={{ color: "red" }} />
          </a>
        </Space>
      ),
    },
  ];
  const columnsWithClick = columns?.map((col, index) => {
    if (index < 4) {
      return {
        ...col,
        onCell: (record) => ({
          onClick: () => {
            console.log("Click row");
            console.log("record:", record);
            // checkQuatifyItem(record);
            // const name = record.name;
            // console.log(name);
            const keyChild = record.key;
            console.log("keyChild: ", keyChild);
            // setSelectedCategory(name);
            // setIsKeyThreeChild(keyChild);
            // setViewTable(false);
          },
        }),
      };
    }
    return col;
  });
  useEffect(() => {
    if (isImageCategoryChild) {
      const uploadImage = async () => {
        try {
          const res = await uploadApiImage.postImageCategoryChild(
            isImageCategoryChild
          );
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
  const fetchDataSearchCategory = async () => {
    // setLoading(true);
    const res = await category.getDataSearchNameThreeCategory(
      isKeyThreeChild,
      debounceValue
    );
    if (res.code === 200) {
      setIsResDataChildSeconds(res.data);
      // setLoading(false);
    } else {
      console.log("Error:");
      // setLoading(false);
    }
  };
  useEffect(() => {
    // console.log("viewTableChildSecond", viewTableChildSecond);
    fetchDataSearchCategory();
  }, [debounceValue]);
  return (
    <>
      {isResDataChildSeconds.items == 0 ? (
        <div className="add_children_category">
          <p>Chưa có model cấp 3</p>
          <Button type="primary" onClick={openModalChildSecond}>
            Thêm danh mục cấp 3
          </Button>
        </div>
      ) : (
        <div>
          <div className="header-top">
            <div className="header-top-right">
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
                placeholder="Tìm danh mục cấp 3"
                className="search-categories"
                onChange={handleSearchCategory}
              />
            </div>
            <div className="header-btn">
              <Button type="primary">Hướng dẫn sử dụng</Button>
              <Button type="primary" onClick={openModalChildSecond}>
                Thêm danh mục cấp 3
              </Button>
            </div>
          </div>
          <div className="table-container">
            <Table
              columns={columnsWithClick}
              dataSource={dataTableChild}
              pagination={{
                position: ["bottomCenter"],
                defaultPageSize: 15,
                showSizeChanger: true,
                pageSizeOptions: ["10", "20", "30"],
              }}
            />
            <span
              className="total-items"
              style={{ color: "black" }}
            >{`${dataTableChild?.length} danh mục cấp 3`}</span>
          </div>
        </div>
      )}
      {/* Modal add Category level third */}
      <Modal
        className="modalDialog-addITems"
        width={500}
        // height={500}
        centered
        open={isOpenModalAddCategory}
        onOk={clickAddItemCategoryChild}
        onCancel={() => setIsOpenModalAddCategory(!isOpenModalAddCategory)}
        okText="Thêm"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Thêm danh mục cấp 3</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên danh mục 3 (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            onChange={setHandleInput}
            ref={nameRef}
          />
        </div>
        <div className="picture-item">
          <label htmlFor="" className="title-picture">
            Ảnh danh mục(<span>*</span>)
          </label>
          {isPreviewImageChild ? (
            <div
              className="preview-image"
              style={{ height: "150px", width: "240px", position: "relative" }}
            >
              <button className="btn-close-image" onClick={closePreviewImage}>
                <CiCircleRemove />
              </button>
              <img
                src={isPreviewImageChild}
                alt="Preview"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
          ) : (
            <>
              <label htmlFor="labelUpload" className="label-upload">
                <AiOutlinePicture />
              </label>
              <input
                type="file"
                accept="image/*"
                name="file"
                id="labelUpload"
                // style={{display: "none"}}
                onChange={handleImageChild}
                ref={fileRef}
                hidden
              />
            </>
          )}
        </div>
      </Modal>
      {/* Modal modify Category level third */}

      <Modal
        className="modalDialog-addITems"
        width={500}
        // height={500}
        centered
        open={isOpenModalModifyChild}
        onOk={changeModifyCategoryChild}
        onCancel={() => setIsOpenModalModifyChild(!isOpenModalModifyChild)}
        okText="Sửa đổi"
        cancelText="Hủy bỏ"
      >
        <h1 className="title-addItem">Sửa danh mục cấp 3</h1>
        <div className="name-item">
          <label htmlFor="">
            Tên danh mục 3 (<span>*</span>)
          </label>
          <input
            className="input-name-category"
            onChange={setHandleInput}
            value={modifyItem?.name || ""}
          />
        </div>
        <div className="picture-item">
          <label htmlFor="" className="title-picture">
            Ảnh danh mục(<span>*</span>)
          </label>
          {isPreviewImageModifyChild ? (
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
              <button className="btn-close-image" onClick={closePreviewImage}>
                <CiCircleRemove />
              </button>
              <img
                src={isPreviewImageModifyChild}
                alt="Preview"
                style={{ maxHeight: "100%", maxWidth: "100%" }}
              />
            </div>
          ) : (
            <>
              <label htmlFor="labelUpload" className="label-upload">
                <AiOutlinePicture />
              </label>
              <input
                type="file"
                accept="image/*"
                name="file"
                id="labelUpload"
                // style={{display: "none"}}
                onChange={handleImageModifyChild}
                ref={fileRef}
                hidden
              />
            </>
          )}
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
    </>
  );
};

export default ChildrenThree_catagory;

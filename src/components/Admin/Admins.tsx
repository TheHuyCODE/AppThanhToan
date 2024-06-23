import React, { useState } from "react";
import "../styles/valiables.css";
import "./admin.css";
import { CiSearch } from "react-icons/ci";
import { Modal, Select, Space, Table } from "antd";
import { FaArrowsRotate } from "react-icons/fa6";
import { FaPencilAlt, FaTrash } from "react-icons/fa";
const dataAdmins = [
  {
    stt: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0987654321",
    state_admin: "kích hoạt",
    group_admin: "Bài viết",
    key: "dfasfasffsdffs",
  },
  {
    stt: 2,
    name: "Nguyễn Văn B",
    email: "nguyenvana@gmail.com",
    phone: "0323254321",
    state_admin: "kích hoạt",
    group_admin: "Bài viết",
    key: "dfasfasffsdfsdfaf",
  },
  {
    stt: 1,
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "090128321",
    state_admin: "kích hoạt",
    group_admin: "Bài viết",
    key: "dfasàdsffasffsdf",
  },
];
const Admins = () => {
  const [value, setValue] = useState("");
  const [dataSource, setDataSource] = useState(dataAdmins);
  const [isOpenPopups, setIsOpenPopups] = useState(false);
  const [isOpenPopupModify, setIsOpenPopupModify] = useState(false);
  const [isOpenPopupDelete, setIsOpenPopupDelete] = useState(false);

  const groupAdmins = [
    {
      name: "Bài viết",
      value: 1,
    },
    {
      name: "Nhóm xác nhận đơn hàng",
      value: 2,
    },
    {
      name: "Quản trị viên cấp cao",
      value: 3,
    },
  ];
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
    },
    {
      title: "Họ Tên",
      dataIndex: "name",
      key: "name",
      //   filteredValue: [isValueSearch],
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
      title: "Email",

      dataIndex: "email",
      key: "email",
      sorter: (record1, record2) => {
        return record1.Soluong > record2.Soluong;
      },
      // sortIcon: ({sortOrder}) =><FaArrowAltCircleDown order={sortOrder}/>
    },
    {
      title: "Số điên thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "state_admin",
      key: "state_admin",
    },
    {
      title: "Nhóm quyền",
      dataIndex: "group_admin",
      key: "group_admin",
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      editTable: true,
      render: (record: any) => (
        <Space size="middle">
          <a>
            <FaArrowsRotate />
          </a>
          <a>
            <FaPencilAlt onClick={openModifyAdmin} />
          </a>
          <a>
            <FaTrash onClick={clickDeleteAdmins} />
          </a>
        </Space>
      ),
    },
  ];
  const openModifyAdmin = () => {
    setIsOpenPopupModify(!isOpenPopupModify);
    console.log("open modify admin");
  };
  const clickAddAdmins = () => {
    setIsOpenPopups(!isOpenPopups);
  };
  const clickDeleteAdmins = () => {
    setIsOpenPopupDelete(!isOpenPopupDelete);
  };
  const columnsWithClick = columns?.map((col, index) => {
    if (index < 6) {
      return {
        ...col,
        key: col.key || `column-${index}`,
        onCell: (record) => ({
          onClick: () => {
            // checkQuatifyItem(record);
            const name = record.name;
            console.log(name);
            const keyChild = record.key;
            console.log("keyChild: ", keyChild);
            // setSelectedCategory(name);
            // setIsKeyChild(keyChild);
            // setViewTable(false);
            // fetchDataCategoryChild(keyChild);
          },
        }),
      };
    }
    return col;
  });
  const onChangeSearchAdmin = (e) => {
    const currValue = e.target.value;
    console.log("currValue", currValue);
    setValue(currValue);
    const filteredUsers = dataAdmins.filter(
      (user) => user.name.includes(currValue) || user.phone.includes(currValue)
    );
    setDataSource(filteredUsers);
  };
  return (
    <div className="content">
      <h1
        style={{
          fontFamily: "poppins, sans-serif",
          color: "var(--color-title)",
        }}
      >
        Quản lí quản trị viên
      </h1>
      <div className="header">
        <div className="header-top">
          <div className="" style={{ display: "flex", position: "relative" }}>
            <input
              type="text"
              className="search-users"
              placeholder="Tìm quản trị viên"
              onChange={onChangeSearchAdmin}
            />
            <CiSearch
              className="icon"
              style={{
                position: "absolute",
                top: "7px",
                left: "5px",
                transform: "translateY(5%)",
                fontSize: "20px",
              }}
            />
          </div>
          <div className="header-top-right">
            <button className="btn-add">Hướng dẫn sử dụng</button>
            <button className="btn-add" onClick={clickAddAdmins}>
              Thêm quản trị viên
            </button>
          </div>
        </div>
        <div className="table-container">
          <Table
            columns={columnsWithClick}
            dataSource={dataSource}
            pagination={{
              position: ["bottomCenter"],
              defaultPageSize: 15,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
          <span className="total-items">{`${dataSource?.length} items`}</span>
        </div>
        {/* Modal add admins */}
        <Modal
          className="modalDialog-addITems"
          width={600}
          // height={500}
          centered
          open={isOpenPopups}
          //   onOk={isOpenPopups}
          onCancel={() => setIsOpenPopups(!isOpenPopups)}
          okText="Thêm"
          cancelText="Hủy bỏ"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "uppercase",
            }}
          >
            <h3>Thêm quản trị viên</h3>
          </div>
          <div
            className="modify-users"
            style={{
              width: "550px",
              height: "auto",
              //   border: "1px solid lightgrey",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <div className="input-info">
              <label htmlFor="">
                Họ và Tên(<span>*</span>)
              </label>
              <input type="text" className="input-form" />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Email(<span>*</span>)
              </label>
              <input type="text" className="input-form" />
            </div>
            <div className="input-info">
              <label htmlFor="">Số điện thoại</label>
              <input type="text" className="input-form" />
            </div>

            <div className="input-info">
              <label htmlFor="">
                Nhóm quyền(<span>*</span>)
              </label>
              <Select
                placeholder="Chọn nhóm quyền"
                allowClear
                // onChange={handleSelectChange}
                // defaultValue="Giới tính"
                style={{ width: 302, height: 36 }}
              >
                {groupAdmins.map((option) => (
                  <option value={option.value}>{option.name}</option>
                ))}
                /
              </Select>
            </div>
            <div
              className="input-info"
              style={{ display: "flex", justifyContent: "start" }}
            >
              <label htmlFor="">Trạng thái</label>
              <label htmlFor="" style={{ marginLeft: "119px" }}>
                Kích hoạt
              </label>
            </div>
          </div>
        </Modal>
        {/* Modal modify admins */}
        <Modal
          className=""
          width={600}
          // height={500}
          centered
          open={isOpenPopupModify}
          //   onOk={isOpenPopups}
          onCancel={() => setIsOpenPopupModify(!isOpenPopupModify)}
          okText="Thêm"
          cancelText="Hủy bỏ"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textTransform: "uppercase",
            }}
          >
            <h3>Sửa quản trị viên</h3>
          </div>
          <div
            className="modify-users"
            style={{
              width: "550px",
              height: "auto",
              //   border: "1px solid lightgrey",
              borderRadius: "5px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
              padding: "20px",
              marginTop: "20px",
            }}
          >
            <div className="input-info">
              <label htmlFor="">
                Họ và Tên(<span>*</span>)
              </label>
              <input type="text" className="input-form" />
            </div>
            <div className="input-info">
              <label htmlFor="">
                Email(<span>*</span>)
              </label>
              <input type="text" className="input-form" />
            </div>
            <div className="input-info">
              <label htmlFor="">Số điện thoại</label>
              <input type="text" className="input-form" />
            </div>

            <div className="input-info">
              <label htmlFor="">
                Nhóm quyền(<span>*</span>)
              </label>
              <Select
                placeholder="Chọn nhóm quyền"
                allowClear
                // onChange={handleSelectChange}
                // defaultValue="Giới tính"
                style={{ width: 302, height: 36 }}
              >
                {groupAdmins.map((option) => (
                  <option value={option.value}>{option.name}</option>
                ))}
                /
              </Select>
            </div>
            <div className="input-info">
              <label htmlFor="">Trạng thái</label>
              <div
                style={{
                  width: "300px",
                  display: "flex",
                  justifyContent: "start",
                  gap: "10px",
                }}
              >
                <input type="radio" id="active" name="status" />
                <label htmlFor="active">Kích hoạt</label>
                <input type="radio" id="notactivated" name="status" />
                <label htmlFor="notactivated">Chưa kích hoạt</label>
              </div>
            </div>
          </div>
        </Modal>
        {/* Modal delete admins */}
        <Modal
          className=""
          width={600}
          // height={500}
          centered
          open={isOpenPopupDelete}
          //   onOk={isOpenPopups}
          onCancel={() => setIsOpenPopupDelete(!isOpenPopupDelete)}
          okText="Thêm"
          cancelText="Hủy bỏ"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              textTransform: "uppercase",
              marginBottom: "10px",
            }}
          >
            <h3>Xóa quản trị viên</h3>
          </div>
          <div>
            <p>Bạn có chắc muốn xóa quản trị viên này?</p>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default Admins;

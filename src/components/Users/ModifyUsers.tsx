import { Alert, Input, Select } from "antd";
import { useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import users from "../../configs/users";
import { handleError } from "../../utils/errorHandler";
import "../styles/valiables.css";
import "./User.css";
interface ModifyUsers {
  full_name: string;
  email: string;
  phone: string;
  role: any;
  is_active: boolean;
}
const ModifyUsers = () => {
  // const unitProduct = ["Kích họat"];
  const navigate = useNavigate();
  const [dataRole, setDataRole] = useState<any>(null);
  const [hiddenSave, setHiddenSave] = useState(false);
  const params = useParams<{ userId: string }>();
  const [dataStore, setDataStore] = useState<ModifyUsers>({
    full_name: "",
    email: "",
    phone: "",
    role: {},
    is_active: true,
  });
  const selectAuth = dataRole?.map((items: any) => ({
    id: items.id,
    key: items.key,
    name: items.name,
    value: items.name,
    label: items.name,
  }));
  // console.log("selectAuth", selectAuth);
  const idProduct = params.userId;
  const onClickBackPageUser = () => {
    //call api User before navigate to detail
    navigate("/admin/users/");
  };
  const handleChangeStatus = (value: string) => {
    setDataStore((prevState) => ({
      ...prevState,
      is_active: value === "1",
    }));
  };

  const handleChangeInputUsers = (value: string | null, filed: string) => {
    setDataStore((prev) => ({
      ...prev,
      [filed]: value,
    }));
    console.log("dataStoredata", dataStore);
  };
  const getRoleUsers = async () => {
    try {
      const res = await users.getDataRole();
      const data = res.data;
      setDataRole(data);
    } catch (error) {
      <Alert message="Error" type="error" showIcon />;
    }
  };
  const getDataModifyUser = async () => {
    try {
      const res = await users.getDetailUsers(idProduct);
      const data = res.data;
      console.log("data", data);
      setDataStore(data);
      setDataStore({
        ...data,
        id: idProduct, // Thêm dòng này
      });
    } catch (error) {
      alert(error);
    }
  };
  const handleModifyUser = async () => {
    const dataModifyUser = {
      full_name: dataStore.full_name,
      phone: dataStore.phone,
      // email: dataStore.email,
      role_id: dataStore.role.id,
      is_active: dataStore.is_active ? 1 : 0,
    };
    setHiddenSave(true);
    try {
      const res = await users.modifyUser(dataModifyUser, idProduct);
      console.log("res", res);
      setHiddenSave(false);
      const msSuccess = "Sửa thông tin thành công";
      toast.success(msSuccess);
      await getDataModifyUser();
    } catch (error) {
      setHiddenSave(false);

      handleError(error);
    }
  };
  const getSelectedValue = (id: string) => {
    // Kiểm tra nếu selectAuth là mảng và không rỗng
    if (Array.isArray(selectAuth)) {
      const selectedAuth = selectAuth.find((auth) => auth.id === id);
      return selectedAuth ? selectedAuth.value : "";
    }
    return "";
  };
  const handleChange = (value: string) => {
    // Tìm id tương ứng với giá trị được chọn
    const selectedAuth = selectAuth.find((auth: any) => auth.value === value);
    if (selectedAuth) {
      setDataStore((prevDataStore) => ({
        ...prevDataStore,
        role: { id: selectedAuth.id },
      }));
    }
  };

  useEffect(() => {
    getDataModifyUser();
    getRoleUsers();
  }, []);
  return (
    <>
      <ToastContainer closeOnClick autoClose={5000} />
      <div className="modify-users">
        <div
          className="title-info-users"
          style={{ display: "flex", alignItems: "center", gap: "10px" }}
        >
          <IoIosArrowBack
            style={{ fontSize: "23px", color: "135597", cursor: "pointer" }}
            onClick={onClickBackPageUser}
          />
          <h1
            style={{
              fontSize: "26px",
              color: "#03176E",
            }}
          >
            Sửa thông tin nhân viên
          </h1>
        </div>
        <div
          className="modify-users"
          style={{
            width: "650px",
            height: "auto",
            borderRadius: "8px",
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            padding: "20px",
            marginTop: "40px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="input-info">
            <label htmlFor="full_name">
              Họ và Tên(<span>*</span>)
            </label>
            <Input
              type="text"
              className="input-form"
              style={{ width: "400px" }}
              onChange={(e) => handleChangeInputUsers(e.target.value, "full_name")}
              value={dataStore.full_name || ""}
            />
          </div>
          <div className="input-info">
            <label htmlFor="email">
              Email(<span>*</span>)
            </label>
            <Input
              type="text"
              className="input-form"
              style={{ width: "400px" }}
              value={dataStore.email || ""}
              disabled
              onChange={(e) => handleChangeInputUsers(e.target.value, "email")}
            />
          </div>
          <div className="input-info">
            <label htmlFor="phone">Số điện thoại</label>
            <Input
              type="text"
              className="input-form"
              style={{ width: "400px" }}
              value={dataStore.phone || ""}
              onChange={(e) => handleChangeInputUsers(e.target.value, "phone")}
            />
          </div>

          <div className="input-info">
            <label htmlFor="">
              Nhóm quyền (<span>*</span>)
            </label>
            <Select
              notFoundContent="Không tìm quyền"
              placeholder="Chọn nhóm quyền"
              allowClear
              value={getSelectedValue(dataStore.role.id)}
              optionFilterProp="children"
              onChange={handleChange}
              style={{ width: 400, height: 40 }}
              options={selectAuth}
            />
          </div>

          <div className="input-info">
            <label htmlFor="">
              Trạng thái(<span>*</span>)
            </label>
            <Select
              defaultValue={dataStore.is_active ? "1" : "0"}
              style={{ width: "400px", height: "40px" }}
              onChange={handleChangeStatus}
            >
              <Select.Option value="1">Kích hoạt</Select.Option>
              <Select.Option value="0">Không kích hoạt</Select.Option>
            </Select>
          </div>
          <div className="btn-info">
            <button className="btn-save" onClick={onClickBackPageUser}>
              Hủy bỏ
            </button>
            <button
              className="btn-cancel"
              style={{ background: "var(--kv-success)" }}
              onClick={handleModifyUser}
              disabled={hiddenSave}
            >
              Lưu
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModifyUsers;

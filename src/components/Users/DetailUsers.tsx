import { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/valiables.css";
import "./User.css";
const DetailUsers = ({}) => {
  // const genders = [
  //   { name: "Nam", value: 1 },
  //   { name: "Nữ", value: 2 },
  //   { name: "Không xác định", value: 3 },
  // ];
  // const onChange = (date, dateString) => {
  //   console.log(date, dateString);
  // };
  const navigate = useNavigate();
  const params = useParams();
  const usersId = params.userId;
  console.log("check params", usersId);
  const onClickBackPageUser = () => {
    //call api User before navigate to detail
    navigate("/admin/users/");
  };
  useEffect(() => {}, [usersId]);
  // const fetchDataUsers = () => {};
  return (
    <>
      <div className="detail-users">
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
              fontFamily: "poppins, sans-serif",
              color: "#03176E",
            }}
          >
            Thông tin của User
          </h1>
        </div>
        {/* <h1>Thông tin của `${dataUser.name}`</h1> */}
        {/* <div className="user-info">
        <div className="user-info-item">
          <p>Họ và Tên</p>
          <p>{dataUser.name}</p>
        </div>
        <div className="user-info-item">
          <p>Số điện thoại</p>
          <p>{dataUser.email}</p>
        </div>
        <div className="user-info-item">
          <p>Giới tính</p>
          <p>{dataUser.phone}</p>
        </div>
        <div className="user-info-item">
          <p>Email</p>
          <p>{dataUser.address}</p>
        </div>
      </div> */}
      </div>
    </>
  );
};

export default DetailUsers;

import React, { useEffect, useState } from "react";
import isValidBirthdate from "is-valid-birthdate";
import NavBar from "../NavBar/NavBar";
import { useAlert } from "react-alert";
import axios from "axios";
import Sidebar from "../Sidebar/Sidebar";
import "./Personal.css";

export default function Personnal() {
  const alert = useAlert();
  const [account, setAccount] = useState({});
  const [passwordUpdate, setPasswordUpdate] = useState({
    oldPassword: "",
    newPassword: "",
    verifyPassword: "",
  });

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setPasswordUpdate((prevState) => {
      return {
        ...prevState,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (passwordUpdate.newPassword !== passwordUpdate.verifyPassword) {
      alert.error("Mật khẩu mới không khớp.");
      return;
    }
    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:9000/put/pass/${account?.id}`,
        {
          password: passwordUpdate.oldPassword,
          passwordNew: passwordUpdate.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const { status, message } = response.data;
      if (status === "ok") {
        alert.success("Cập nhật mật khẩu thành công");
      } else {
        alert.error(message);
      }
    } catch (error) {
      console.error(error);
      alert.error("An error occurred while updating the password.");
    }

    setPasswordUpdate({
      oldPassword: "",
      newPassword: "",
      verifyPassword: "",
    });
  };

  const handleUpdate = () => {
    setPasswordUpdate({
      oldPassword: "",
      newPassword: "",
      verifyPassword: "",
    });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setAccount(userData);
    }
  }, []);

  const mapRoleName = (roleName) => {
    if (roleName === "ROLE_ADMIN") {
      return "Quản trị viên";
    } else if (roleName === "ROLE_USER") {
      return "Người dùng";
    } else if (roleName === "ROLE_EMPLOYEE") {
      return "Nhân viên";
    } else {
      return roleName;
    }
  };

  return (
    <div className="personal-container">
      <NavBar />
      <div className="Personnal">
        <div className="func-title-user">
          <span>THÔNG TIN CÁ NHÂN</span>
        </div>
        <div className="info-basic">
          <div className="info">
            <div className="personal-root">
              <div className="txtcel1">Tên đăng nhập:</div>
              <div className="txtcel2">{account?.username}</div>
            </div>
            <div className="personal-root">
              <div className="txtcel1">Email:</div>
              <div className="txtcel2">{account?.email}</div>
            </div>
            <div className="personal-root">
              <div className="txtcel1">Vai trò:</div>
              <div className="txtcel2">
                {account?.roles && account.roles.length > 0
                  ? mapRoleName(account.roles[0].name)
                  : ""}
              </div>
            </div>

            <div className="personal-root">
              <div className="txtcel1">Số điện thoại:</div>
              <div className="txtcel2">{account.phone}</div>
            </div>

            <div className="info-basic">
              <div className="info">
                <button
                  type="button"
                  className="btn-add-cost"
                  data-toggle="modal"
                  data-target="#exampleModal"
                  value={account.UserName}
                  style={{
                    marginTop: "20px",
                    marginLeft: "200px",
                    fontSize: 16,
                    color: "#fff",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleUpdate(account)}
                >
                  UPDATE
                </button>
                <div
                  className="modal fade"
                  id="exampleModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="exampleModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-body">
                        <form onSubmit={handleSubmit} role="form">
                          <div className="form-group">
                            <label htmlFor="">Mật khẩu cũ</label>
                            <input
                              type="password"
                              className="form-control"
                              name="oldPassword"
                              placeholder="Nhập mật khẩu cũ"
                              onChange={handleOnChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Mật khẩu mới</label>
                            <input
                              type="password"
                              className="form-control"
                              name="newPassword"
                              placeholder="Nhập mật khẩu mới"
                              onChange={handleOnChange}
                            />
                          </div>
                          <div className="form-group">
                            <label htmlFor="">Nhập lại mật khẩu mới</label>
                            <input
                              type="password"
                              className="form-control"
                              name="verifyPassword"
                              placeholder="Nhập lại mật khẩu mới"
                              onChange={handleOnChange}
                            />
                          </div>
                          <div className="modal-footer">
                            <button
                              style={{ fontSize: 14 }}
                              type="button"
                              className="btn btn-secondary"
                              data-dismiss="modal"
                            >
                              Đóng
                            </button>
                            <button
                              style={{ fontSize: 14 }}
                              type="submit"
                              className="btn btn-primary"
                              value={account.UserName}
                            >
                              Cập nhập
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

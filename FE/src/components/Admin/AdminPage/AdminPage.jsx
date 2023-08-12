import React from "react";
import { useState, useEffect } from "react";
import Sidebar from "../.././Sidebar/Sidebar";
import "./AdminPage.css";
export default function AdminPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [account, setAccount] = useState("");

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    setAccount({ ...user });
    if (account) {
      setIsLoggedIn(true);
    }
  }, []);
  return (
    <>
      <div className="navbar-admin">
        <div className="navbar-admin-container">
          <a href="" className="logo">
            <img src="https://raw.githubusercontent.com/tan-creator/capstoneProject-IPTC/master/FE/public/img/logo.svg" />
            <span className="nav-title">SCM</span>
          </a>
          <li
            style={{
              listStyleType: "none",
              paddingLeft: "10px",
              display: "flex",
              alignItems: "center",
            }}
          >
            <a
              href="#"
              className="dropdown-toggle"
              data-toggle="dropdown"
              role="button"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <img
                src="https://cdn-icons-png.flaticon.com/512/147/147144.png?w=360"
                className="img-navbar"
                style={{ marginRight: "5px" }}
              />
              <span className="caret">{account.username}</span>
            </a>
            <ul className="dropdown-menu">
              {
                <>
                  <li>
                    <a>Xin chào {account.username}!</a>
                  </li>
                  <li>
                    <a href="/personal">Thông tin cá nhân</a>
                  </li>
                  <li>
                    <a href="#">Something else here</a>
                  </li>
                  <li>
                    <a href="/login" onClick={handleLogout}>
                      Đăng xuất
                    </a>
                  </li>
                </>
              }
            </ul>
          </li>
        </div>
        <Sidebar />
      </div>
    </>
  );
}

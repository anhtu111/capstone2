import React, { useState, useEffect } from "react";
import "./NavBar.css";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [account, setAccount] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userData"));
    console.log(user);
    setAccount({ ...user });
    setIsLoggedIn(user !== null);
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      localStorage.removeItem("userData");
      setIsLoggedIn(false);
      navigate("/login");
    }
  };

  return (
    <div className="navbar">
      <div className="navbar-container">
        <a href="" className="logo">
          <img src="https://raw.githubusercontent.com/tan-creator/capstoneProject-IPTC/master/FE/public/img/logo.svg" />
          <span className="nav-title">SCM</span>
        </a>
        <ul className="navbar-ul">
          <li className="nav-item">
            <a className="nav-link" href="/">
              Trang chủ
            </a>
          </li>
          {isLoggedIn && (
            <li className="nav-item">
              <a className="nav-link" href="/suggest">
                Hướng dẫn
              </a>
            </li>
          )}

          <li className="nav-item">
            <a className="nav-link" href="/pricing">
              Gói tập
            </a>
          </li>

          {!isLoggedIn && (
            <li className="nav-item">
              <a className="nav-link" href="/login">
                Đăng nhập
              </a>
            </li>
          )}

          {isLoggedIn && (
            <li
              style={{ listStyleType: "none", paddingLeft: "10px" }}
              className="dropdown"
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
                />
                <span className="caret"></span>
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a>Xin chào {account.username}!</a>
                </li>
                <li>
                  <a href="/personal">Thông tin cá nhân</a>
                </li>
                <li>
                  <a href="/login" onClick={handleLogout}>
                    Đăng xuất
                  </a>
                </li>
              </ul>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}

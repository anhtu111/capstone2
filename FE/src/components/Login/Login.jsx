import React, { useState } from "react";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import "./login.css";
import axios from "axios";
import jwt_decode from "jwt-decode";
export default function Login({ setUserData }) {
  const [account, setAccount] = useState({
    username: "",
    password: "",
  });

  const navigate = useNavigate();
  const alert = useAlert();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAccount((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const loginResponse = await axios.post(
        "http://localhost:9000/authenticate",
        account
      );
      if (loginResponse.data.token) {
        const token = loginResponse.data.token;
        localStorage.setItem("token", token);

        const decodedToken = jwt_decode(token);
        const username = decodedToken.user;
        console.log(username);
        // console.log(decodedToken);
        // Get user data
        const userDataResponse = await axios.get(
          `http://localhost:9000/api/${account.username}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = userDataResponse.data;
        if (userDataResponse.data) {
          localStorage.setItem("userData", JSON.stringify(userData));
          setUserData(userData);
        }
        if (userData.username == "admin") {
          navigate("/admin/account");
        } else {
          navigate("/");
        }
        alert.success("Đăng nhập thành công!");
      } else {
        console.error("Đăng nhập thất bại!");
      }
    } catch (error) {
      alert.error("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin.");
      console.error(error);
    }
  };

  return (
    <div style={{ backgroundColor: "#eaeaea" }}>
      <div className="container">
        <div className="header-login">
          <div className="header-left">
            <div className="logo">
              <img src="./img/logo.svg" alt="#" />
              <span className="title-header">SCM</span>
            </div>
          </div>
          <div className="header-right"></div>
        </div>
        <div className="content-login">
          <div className="content-right-login">
            <img src="./img/image-login2.avif" alt="#" />
          </div>
          <div className="content-left-login">
            <form className="form" id="form-1">
              <img src="./img/join.svg" alt="" />
              <h3 className="heading">WELCOME</h3>
              <div className="spacer" />
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  Tên đăng nhập
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="VD: nguyenvana@gmail.com"
                  className="form-control"
                  onChange={handleChange}
                />
                <span className="form-message" />
              </div>
              <div className="form-group">
                <label htmlFor="password" className="form-label">
                  Mật khẩu
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Nhập mật khẩu"
                  className="form-control"
                  onChange={handleChange}
                />
                <span className="form-message" />
              </div>
              <div className="forgot-pass">
                <div>
                  <a
                    className="abc"
                    style={{ color: "black", textDecoration: "underline" }}
                    href="/register"
                  >
                    Đăng kí?
                  </a>
                </div>
                <div>
                  <a
                    className="abc"
                    style={{ color: "black", textDecoration: "underline" }}
                    href="#"
                  >
                    Quên mật khẩu
                  </a>
                </div>
              </div>

              <button
                onClick={handleLogin}
                className="form-submit"
                id="login-btn"
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
        <div className="footer" />
      </div>
    </div>
  );
}

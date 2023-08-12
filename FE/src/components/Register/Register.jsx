import React, { useState } from "react";
// import FacebookLogin from "react-facebook-login";
// import GoogleLogin from "react-google-login";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./Register.css";
const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert.error("Mật khẩu không khớp");
      return;
    }

    if (!/^\d+$/.test(phone)) {
      alert.error("Vui lòng nhập số điện thoại hợp lệ");
      return;
    }
    try {
      const registerData = {
        username: username,
        email: email,
        password: password,
        confirmPassword: confirmPassword,
        phone: phone,
      };
      const registerResponse = await axios.post(
        "http://localhost:9000/basic/register",
        registerData
      );
      console.log(registerResponse.data);
      alert.success("Đăng ký thành công");
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const responseFacebook = (response) => {
    // Xử lý đăng nhập hoặc tạo tài khoản từ phản hồi đăng nhập Facebook
    console.log(`Facebook response: ${response}`);
  };

  const responseGoogle = (response) => {
    // Xử lý đăng nhập hoặc tạo tài khoản từ phản hồi đăng nhập Google
    console.log(`Google response: ${response}`);
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
            <form onSubmit={handleRegister} className="form-register">
              <div className="register-title">
                <p className="register-account">Đăng kí tài khoản</p>
                <div className="members">
                  <span style={{ paddingRight: "10px" }}>
                    Đã là thành viên?
                  </span>
                  <a href="/login" className="sign-up">
                    Đăng nhập
                  </a>
                </div>
              </div>
              <input
                className="input-register"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="input-register"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="input-register"
                type="text"
                placeholder="Phone Number "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <input
                className="input-register"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                className="input-register"
                type="password"
                id="confirm-password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />

              <button className="button-submit" type="submit">
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="footer" />
      </div>
    </div>
  );
};

export default Register;

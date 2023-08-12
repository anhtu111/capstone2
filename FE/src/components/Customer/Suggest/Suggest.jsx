import React from "react";
import { Link } from "react-router-dom";
import Footer from "../../Footer/Footer";
import Navbar from "../../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import "./Suggest.css";

export default function Suggest() {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate("/");
  };
  return (
    <div className="muscle-body">
      <Navbar />

      <main>
        <div
          className="muscle-groups"
          style={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "45px",
          }}
        >
          <Link to="/body">
            <button className="btn-navigation">
              Hướng dẫn cái bài tập Gym
            </button>
          </Link>
          <Link to="/suggestFootball">
            <button className="btn-navigation">
              Hướng dẫn các bài tập về Đá bóng
            </button>
          </Link>
        </div>
      </main>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "14px",
        }}
      >
        <button onClick={handleGoBack}>Quay lại</button>
      </div>
      <Footer />
    </div>
  );
}

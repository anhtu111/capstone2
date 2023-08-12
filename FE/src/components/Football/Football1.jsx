import Navbar from "../NavBar/NavBar";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Football.css";

function Football() {
  let navigate = useNavigate();

  const [clubs, setClubs] = useState([
    {
      name: "Sân bóng Đức Nam",
      image: "./img/football/san-duc-nam.webp",
      price: "Giá 200.000₫ - 350.000₫ / Trận",
      star: 4,
      capacity: "5 người",
      openTime: "6:00",
      closeTime: "23:00",
      facilities: [
        "Phòng thay đồ",
        "Máy lạnh",
        "Wifi miễn phí",
        "Khu vực giải trí",
      ],
    },
    {
      name: "Sân bóng trường ĐH TDTT Đà Nẵng",
      image: "./img/football/san-dh-the-thao.jpeg",
      price: "Giá 250.000₫ - 350.000₫ / Trận",
      star: 3.5,
      capacity: "5 người",
      openTime: "7:00",
      closeTime: "22:00",
      facilities: [
        "Phòng thay đồ",
        "Máy lạnh",
        "Wifi miễn phí",
        "Khu vực giải trí",
      ],
    },
    {
      name: "Sân Chuyên Việt",
      image: "./img/football/san-chuyen-viet.jpeg",
      price: "Giá 150.000₫ - 350.000₫ / Trận",
      star: 5,
      capacity: "5 người",
      openTime: "8:00",
      closeTime: "21:00",
      facilities: ["Phòng thay đồ", "Khu vực giải trí"],
    },
    {
      name: "Sân Trưng Vương",
      image: "./img/football/san-trung-vuong.jpeg",
      price: "Giá 200.000₫ - 400.000₫ / Trận",
      star: 3.5,
      capacity: "5 người",
      openTime: "7:00",
      closeTime: "22:00",
      facilities: [
        "Phòng thay đồ",
        "Máy lạnh",
        "Wifi miễn phí",
        "Khu vực giải trí",
        "Nhà hàng",
      ],
    },
    {
      name: "Sân bóng Trường Đại Học Duy Tân",
      image: "./img/football/san-duy-tan.jpeg",
      price: "Giá 200.000₫ - 350.000₫ / Trận",
      star: 4.5,
      capacity: "5 người",
      openTime: "7:00",
      closeTime: "22:00",
      facilities: [
        "Phòng thay đồ",
        "Máy lạnh",
        "Wifi miễn phí",
        "Khu vực giải trí",
        "Quầy bar",
      ],
    },
  ]);

  const handleOnClickToRegister = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  const handleOnClickToClub = (e, clubName) => {
    e.preventDefault();
    navigate(
      `/club/${encodeURIComponent(clubName.replace(/\s+/g, "-")).toLowerCase()}`
    );
  };

  return (
    <div className="container-foolball">
      <Navbar />
      <div className="football-box">
        {clubs.map((club) => {
          return (
            <div key={club.name} className="club-box">
              <img src={club.image} alt={club.name} />
              <h2
                style={{
                  fontSize: "16px",
                  cursor: "pointer",
                }}
                onClick={(e) => handleOnClickToClub(e, club.name)}
              >
                {club.name}
              </h2>
              <p
                style={{
                  color: "#ff6700",
                  fontWeight: "bold",
                  fontSize: "13px",
                }}
              >
                {club.price}
              </p>
              <div
                className="abc"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  paddingTop: "15px",
                  paddingBottom: "10px",
                }}
              >
                <div
                  style={{
                    fontSize: "13px",
                  }}
                >
                  {clubs.star}
                </div>
                <p
                  style={{
                    fontSize: "13px",
                  }}
                >
                  Số người: {club.capacity}
                </p>
              </div>
              <button onClick={handleOnClickToRegister}>Đặt sân</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
export default Football;

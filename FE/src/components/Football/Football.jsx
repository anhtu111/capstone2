import Navbar from "../NavBar/NavBar";
import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Football.css";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWifi,
  faRestroom,
  faSquareParking,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import Footer from "../Footer/Footer";

library.add(faWifi, faRestroom, faSquareParking, faGamepad);
function Football111() {
  let navigate = useNavigate();

  const [clubs, setClubs] = useState([
    {
      name: "Sân bóng Đức Nam",
      image: "./img/football/san-duc-nam.jpeg",
      price: "Giá 200.000₫ - 350.000₫ / Trận",
      star: 4,
      capacity: "5 người",
      openTime: "6:00",
      closeTime: "23:00",
      desc: "Sân bóng Đức Nam là một sân bóng đá hiện đại và tiện nghi, được trang bị đầy đủ các thiết bị và trang thiết bị cần thiết để đáp ứng nhu cầu chơi bóng đá của các khách hàng. Với không gian rộng rãi, đầy đủ các phòng thay đồ, máy lạnh, Wifi miễn phí và khu vực giải trí, sân bóng Đức Nam là một điểm đến lý tưởng cho các nhóm bạn muốn tận hưởng thời gian chơi bóng đá của mình. Giá thuê sân bóng Đức Nam dao động từ 200.000₫ - 350.000₫ / Trận và sân có thể chứa được 5 người cùng thi đấu. Thời gian hoạt động của sân bóng Đức Nam là từ 6:00 đến 23:00, giúp bạn có nhiều thời gian để chơi bóng đá vào cả buổi sáng và buổi tối.",
      facilities: [
        "Phòng thay đồ",
        "Bãi giữ xe",
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
      desc: "Sân bóng trường ĐH TDTT Đà Nẵng là một trong những sân bóng chất lượng tại Đà Nẵng. Sân được thiết kế rộng rãi với kích thước chuẩn, có thể đá được cả 5 người mỗi đội. Sân được trang bị đầy đủ các tiện nghi như phòng thay đồ, máy lạnh, wifi miễn phí, khu vực giải trí, giúp cho người chơi có thể tập trung vào trận đấu mà không phải lo lắng về việc thiếu thiết bị. Thời gian hoạt động của sân bóng từ 7 giờ sáng đến 10 giờ tối hàng ngày, giá cả phù hợp với chất lượng dịch vụ.",
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

  const [selectedClub, setSelectedClub] = useState(null);
  const [isClubSelected, setIsClubSelected] = useState(false);

  const handleOnClickToRegister = (e) => {
    e.preventDefault();
    navigate("/time");
  };

  const handleOnClickToClub = (e, clubName) => {
    e.preventDefault();
    const selectedClub = clubs.find((club) => club.name === clubName);
    setSelectedClub(selectedClub);
    setIsClubSelected(true);
  };

  const handleBackToClubs = () => {
    setIsClubSelected(false);
  };
  const renderStars = (star) => {
    const fullStars = Math.floor(star);
    const halfStars = star % 1 !== 0;
    const emptyStars = 5 - fullStars - halfStars;
    const stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push(<i key={i} className="fas fa-star star-yellow"></i>);
    }

    if (halfStars) {
      stars.push(
        <i key="half" className="fas fa-star-half-alt star-yellow"></i>
      );
    }

    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <i key={i + fullStars + halfStars} className="far fa-star"></i>
      );
    }

    return stars;
  };

  return (
    <div className="container-foolball">
      <Navbar />
      <div className="football-box">
        {!isClubSelected ? (
          clubs.map((club) => {
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
                    {renderStars(club.star)}
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
          })
        ) : (
          <div className="club-details">
            <h2 className="club-title">{selectedClub.name}</h2>
            <img src={selectedClub.image} alt={selectedClub.name} />
            <p className="club-price">{selectedClub.price}</p>
            <p className="club-desc">{selectedClub.desc}</p>
            <div className="club-service">
              <p className="club-people">
                <strong>Số người:</strong> {selectedClub.capacity}
              </p>
              <div className="club-time">
                <p>
                  <strong>Giờ mở cửa:</strong> {selectedClub.openTime}
                </p>
                <p>
                  <strong>Giờ đóng cửa:</strong> {selectedClub.closeTime}
                </p>
              </div>
              <ul className="facilities-item">
                {selectedClub.facilities.map((facility, index) => (
                  <li key={index}>
                    <div>
                      {(facility === "Wifi miễn phí" && (
                        <FontAwesomeIcon icon={faWifi} />
                      )) ||
                        (facility === "Phòng thay đồ" && (
                          <FontAwesomeIcon icon={faRestroom} />
                        )) ||
                        (facility === "Bãi giữ xe" && (
                          <FontAwesomeIcon icon={faSquareParking} />
                        )) ||
                        (facility === "Máy lạnh" && (
                          <FontAwesomeIcon icon={faRestroom} />
                        )) ||
                        (facility === "Khu vực giải trí" && (
                          <FontAwesomeIcon icon={faGamepad} />
                        ))}
                      <span>{facility}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="club-btn">
              <button onClick={handleBackToClubs}>Quay lại</button>
              <button onClick={handleOnClickToRegister}>Đặt sân</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default Football111;

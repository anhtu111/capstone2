import React, { useState, useEffect } from "react";
import Navbar from "../../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import Footer from "../../Footer/Footer";
import { getClassList } from "../../../api/apiClient";

function Basketball() {
  const navigate = useNavigate();
  const [filteredClasses, setFilteredClasses] = useState([]);

  useEffect(() => {
    const fetchClassList = async () => {
      try {
        const token = localStorage.getItem("token");
        const classList = await getClassList(token);
        const filteredClasses = classList.filter(
          (classItem) => classItem.team === "Basketball"
        );
        console.log(filteredClasses);
        setFilteredClasses(filteredClasses);
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchClassList();
  }, []);

  const handleOnclickToRegister = (className, price) => {
    navigate(`/${className}/detail?price=${price}`);
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
        {filteredClasses.map((classItem) => (
          <div key={classItem.classId} className="club-box">
            <img src={classItem.classImage} alt={classItem.className} />
            <h2
              style={{
                fontSize: "16px",
                fontWeight: "bold",
              }}
            >
              {classItem.className}
            </h2>
            <p
              style={{
                color: "#ff6700",
                fontWeight: "bold",
                fontSize: "13px",
              }}
            >
              {classItem.price.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " VNĐ"}
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
                {renderStars(classItem.star)}
              </div>
              <p
                style={{
                  fontSize: "13px",
                }}
              >
                Diện tích: {classItem.capacity}
              </p>
            </div>
            <div className="address-fb">
              <strong>Địa chỉ:</strong> {classItem.classAddress}
            </div>
            <button
              onClick={() =>
                handleOnclickToRegister(classItem.className, classItem.price)
              }
            >
              Đặt lịch
            </button>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default Basketball;

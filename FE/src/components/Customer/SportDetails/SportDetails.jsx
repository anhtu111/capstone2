import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getClassList } from "../../../api/apiClient";
import Footer from "../../Footer/Footer";
import Navbar from "../../NavBar/NavBar";

function SportDetails() {
  const { sportName } = useParams();
  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getClassList(token, sportName);
        setClasses(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, [sportName]);

  const getClassList = async (token, sportName) => {
    const response = await fetch("http://localhost:9000/class", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch class list");
    }
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
      <div className=" football-box">
        {classes.map((classItem) => {
          return (
            <div key={classItem.classId} className="club-box">
              <img src={classItem.classImage} alt={classItem.className} />
              <h2
                style={{
                  fontSize: "16px",
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
                {classItem.price}
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
                  Số người: {classItem.capacity}
                </p>
              </div>
              <div className="address-fb">
                <strong>Địa chỉ:</strong> {classItem.classAddress}
              </div>
              <button>Đặt lịch</button>
            </div>
          );
        })}
      </div>
      <Footer />
    </div>
  );
}

export default SportDetails;

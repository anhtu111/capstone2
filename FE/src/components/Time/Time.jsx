import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWifi } from "@fortawesome/free-solid-svg-icons";
import Navbar from "../NavBar/NavBar";
import { useAlert } from "react-alert";

import "./Time.css";
import Footer from "../Footer/Footer";

library.add(faWifi);

function Booking() {
  const alert = useAlert();
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const navigate = useNavigate();

  const handleOnClickToPayment = (e) => {
    e.preventDefault();
    if (selectedDateTime) {
      alert.success("Chọn lịch thành công");

      navigate("/payment", { state: { selectedDateTime } });
    } else {
      alert.error("Vui lòng chọn lịch");
    }
  };

  return (
    <>
      <Navbar />
      <div className="time-container">
        <h2>Chọn lịch:</h2>
        <DatePicker
          selected={selectedDateTime}
          onChange={(date) => setSelectedDateTime(date)}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={15}
          dateFormat="MMMM d, yyyy h:mm aa"
        />
        <button onClick={handleOnClickToPayment}>Đặt</button>
      </div>
      <Footer />
    </>
  );
}

export default Booking;

import React, { useState } from "react";
import Navbar from "../../NavBar/NavBar";
import DatePicker from "react-datepicker";
import { useEffect } from "react";
import Modal from "react-modal";
import { useAlert } from "react-alert";
import "react-datepicker/dist/react-datepicker.css";
import "./SchedulePage.css";

function SchedulePage() {
  const alert = useAlert();
  const [selectedTime, setSelectedTime] = useState("");
  const [selectedRow, setSelectedRow] = useState(null);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const [selectedDateError, setSelectedDateError] = useState(false);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:9000/booking", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setBookings(data);
        } else {
          throw new Error("Failed to fetch bookings");
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    fetchBookings();
  }, []);

  const handleTimeSelection = (time, row, column) => {
    setSelectedTime(time);
    setSelectedRow(row);
    setSelectedColumn(column);
    setModalIsOpen(true);
  };

  const isTimeBooked = (row, column) => {
    const time = `${column + 1}h30 - ${column + 2}h30`;
    return bookings.some((booking) => {
      return (
        booking.dayOfWeek === row + 1 &&
        time >= booking.dateFrom &&
        time <= booking.dateTo
      );
    });
  };
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    const currentDate = new Date();

    if (selectedDate < currentDate) {
      setSelectedDateError(true);
    } else {
      setSelectedDateError(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h2 className="schedule-title">Chọn giờ tập</h2>

      <div className="form-group">
        <label htmlFor="">Chọn ngày:</label>
        <input
          type="date"
          className="form-control schedule-input"
          name="BirthDay"
          onChange={handleDateChange}
        />
        {selectedDateError && (
          <div className="error-message">Vui lòng chọn ngày hợp lệ!</div>
        )}
      </div>
      <label htmlFor="">Chọn giờ:</label>

      <table className="table">
        <thead>
          <tr>
            <th></th>
            <th>Thứ 2</th>
            <th>Thứ 3</th>
            <th>Thứ 4</th>
            <th>Thứ 5</th>
            <th>Thứ 6</th>
            <th>Thứ 7</th>
            <th>Chủ nhật</th>
          </tr>
        </thead>
        <tbody>
          {/* 5h30 - 6h30 */}
          <tr>
            <td>5h30 - 6h30</td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
          </tr>
          {/* 20h30 - 21h30 */}
          <tr>
            <td>20h30 - 21h30</td>

            <td
              onClick={() => handleTimeSelection("20h30 - 21h30", 0, 6)}
              className={isTimeBooked(0, 6) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
            <td
              onClick={() => handleTimeSelection("5h30 - 6h30", 0, 0)}
              className={isTimeBooked(0, 0) ? "booked" : ""}
            ></td>
          </tr>
        </tbody>
      </table>
      {selectedTime && (
        <Modal
          className="modal-schedule"
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
        >
          <h2>Bạn đã chọn:</h2>
          <p>
            <span>Ngày: </span>
            {selectedRow === 6 ? "Chủ Nhật" : `Thứ ${selectedRow + 2}`},{" "}
            <span>Giờ: </span>
            {selectedTime}
          </p>
          <button className="schedule-btn-confirm">Xác nhận</button>
          <button
            className="schedule-btn-cancel"
            onClick={() => setModalIsOpen(false)}
          >
            Đóng
          </button>
        </Modal>
      )}
    </div>
  );
}

export default SchedulePage;

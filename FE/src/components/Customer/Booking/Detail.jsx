import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Button } from "../../Buttons";
import { DaySlots, TimeSlots, DisplayBooking, IconLoading } from "../../Card";
import Layout from "../../Layout";
import Swal from "sweetalert2";
import Navbar from "../../NavBar/NavBar";
import "./Detail.css";
export default function Venue() {
  const [showAlert, setShowAlert] = useState(false);
  const [open, setOpen] = useState("");
  const [close, setClose] = useState("");
  const [time, setTime] = useState("");
  const [countMonth, setCountMonth] = useState(1);
  const [timeStore, setTimeStore] = useState({});
  const params = useParams();
  const type = decodeURIComponent(params.type);
  //
  // const [price, setPrice] = useState(0);
  // const price = 3000000;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const price = searchParams.get("price");
  console.log(price);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  document.title = `SCM`;

  const [selectedDay, setSelectedDay] = useState({
    day: moment().format("dddd"),
    date: moment().format("LL"),
  });
  const [selectedTime, setSelectedTime] = useState(
    moment().startOf("day").format("LT")
  );
  const dayFormat = `${selectedDay.day}, ${moment(selectedDay.date).format(
    "DD MMMM YYYY"
  )}`;
  const [selectedMonth, setSelectedMonth] = useState(moment().month());

  const [selectedYear, setSelectedYear] = useState(moment().year());
  const handleMonthChange = (e) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  const handleYearChange = (e) => {
    setSelectedYear(parseInt(e.target.value));
  };
  useEffect(() => {
    const nextDay = moment(selectedDay.date).add(1, "day");
    setSelectedDay({
      day: nextDay.format("dddd"),
      date: nextDay.format("LL"),
    });
  }, []);
  console.log("day", selectedDay);
  useEffect(() => {
    const timeStore = localStorage.getItem("time")
      ? JSON.parse(localStorage.getItem("time"))
      : {};
    setTimeStore({ ...timeStore });
  }, [selectedDay, selectedMonth, selectedTime]);
  //
  const handleBookNow = async () => {
    const schedules = {
      month: selectedMonth,
      day: selectedDay.date,
      time: time,
    };
    // gym
    const timeStore = localStorage.getItem("time")
      ? JSON.parse(localStorage.getItem("time"))
      : {};
    if (timeStore[type]) {
      timeStore[type].push(schedules);
    } else {
      timeStore[type] = [schedules];
    }
    localStorage.setItem("time", JSON.stringify(timeStore));

    try {
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found");
        return;
      }

      const createPaymentResponse = await axios.post(
        "http://localhost:9000/api/payment/create_payment",
        {
          amount: price * countMonth,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (createPaymentResponse.data.status === "ok") {
        const paymentUrl = createPaymentResponse.data.url;

        window.location.href = paymentUrl;
        localStorage.setItem("booked", JSON.stringify(booked));
      } else {
        console.error("Failed to create payment");
      }
    } catch (error) {
      console.error("Error creating payment", error);
    }
  };

  useEffect(() => {
    if (showAlert) {
      Swal.fire("Vui lòng chọn ngày hợp lệ");
      setShowAlert(false); // Đặt lại trạng thái hiển thị thông báo
    }
  }, [showAlert]);
  return (
    <Layout>
      <Navbar />

      <div className="w-full my-5">
        <div className="my-3 space-y-5">
          <div className="booking-container space-y-2">
            <div className="admin-management">BOOKING SCHEDULE</div>
            <h5 className="booking-description">
              Please select the date and time you want to book
            </h5>
          </div>
          <div className="select-div">
            <label className="select-label" htmlFor="month">
              Select Month:
            </label>
            <select
              className="select-box"
              id="month"
              value={selectedMonth}
              onChange={handleMonthChange}
            >
              {moment.months().map((month, index) => (
                <option key={index} value={index}>
                  {month}
                </option>
              ))}
            </select>
            <label htmlFor="year" className="select-label-year">
              Select Year:
            </label>
            <select
              className="select-box"
              id="year"
              value={selectedYear}
              onChange={handleYearChange}
            >
              {Array.from({ length: 10 }, (_, i) => moment().year() + i).map(
                (year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                )
              )}
            </select>
            {type.includes("Fitness") && (
              <>
                <label htmlFor="year" className="select-label-year">
                  Choose number of months:
                </label>
                <input
                  type="number"
                  name=""
                  id="input"
                  title=""
                  style={{
                    fontSize: "17px",
                    width: "50px",
                    textAlign: "center",
                  }}
                  value={countMonth}
                  onChange={(e) => {
                    if (e.target.value > 0) {
                      return setCountMonth(e.target.value);
                    }
                  }}
                />
              </>
            )}
          </div>
          <div className="desc-timeslot">SELECT DAY: </div>

          <DaySlots
            selectedDay={selectedDay}
            setSelectedDay={setSelectedDay}
            month={selectedMonth}
            year={selectedYear}
          />
          {!type.includes("Fitness") && (
            <div className="border-y-2 py-5">
              <div className="desc-timeslot">SELECT TIME: </div>
              <TimeSlots
                timeStore={timeStore}
                selectedMonth={selectedMonth}
                selectedTime={selectedTime}
                selectedDay={selectedDay}
                setSelectedTime={setSelectedTime}
                open_hour={open ? parseInt(open) : 6}
                close_hour={close ? parseInt(close) : 21}
                setTime={setTime}
              />
            </div>
          )}

          {selectedDay && selectedTime && (
            <DisplayBooking
              selectedDay={selectedDay}
              selectedTime={selectedTime}
              price={price ? price : 0}
              type={type}
              countMonth={countMonth}
            />
          )}
        </div>
        <div className="flex justify-center btn-payment">
          <Button className="btn-thanh-toan" onClick={handleBookNow}>
            Thanh toán
          </Button>
        </div>
      </div>
    </Layout>
  );
}

import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Card.css";

export function DaySlots({ selectedDay, setSelectedDay, month, year }) {
  moment.locale("en");
  const firstDayOfMonth = moment(`${year}-${month + 1}-01`, "YYYY-MM-DD");
  const firstDayOfWeek = moment(firstDayOfMonth).startOf("week");
  const lastDayOfMonth = moment(firstDayOfMonth).endOf("month");
  const lastDayOfWeek = moment(lastDayOfMonth).endOf("week");
  const [booked, setBooked] = useState([]);
  const [timeStore, setTimeStore] = useState({});
  useEffect(() => {
    const booked = localStorage.getItem("booked")
      ? JSON.parse(localStorage.getItem("booked"))
      : [];

    setBooked([...booked]);
  }, []);
  const currentDate = moment();
  const daysToRender = [];
  let currentDay = moment(firstDayOfWeek);
  while (currentDay.isSameOrBefore(lastDayOfWeek)) {
    if (
      currentDay.isSameOrAfter(firstDayOfMonth) &&
      currentDay.isSameOrBefore(lastDayOfMonth) &&
      currentDay.isSameOrAfter(currentDate)
    ) {
      daysToRender.push(currentDay);
    }
    currentDay = currentDay.clone().add(1, "day");
  }
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-7 gap-4">
      {daysToRender.map((day, index) => {
        return (
          <button
            id={`day-${index + 1}`}
            className={`text-center border py-5 rounded-lg lg:shadow-md button-abc ${
              selectedDay.date === day.format("LL")
                ? "bg-teal-500 text-white"
                : "bg-white"
            }`}
            disabled={booked.includes(day.date())}
            key={index}
            onClick={() => {
              setSelectedDay({
                day: day.format("dddd"),
                date: day.format("LL"),
              });
            }}
          >
            {/* <h1>{selectedDay.day === "Saturday" ? "hehe" : ""}</h1> */}
            <h6 className="font-semibold md:text-lg uppercase title">
              {day.format("dddd")}
            </h6>
            <h3 className="font-bold text-4xl day">{day.format("D")}</h3>
            <h5 className="text-xl font-semibold month">
              {day.format("MMMM")}
            </h5>
          </button>
        );
      })}
    </div>
  );
}

export function TimeSlots({
  selectedTime,
  selectedMonth,
  selectedDay,
  setSelectedTime,
  open_hour,
  close_hour,
  setTime,
  timeStore,
}) {
  const params = useParams();
  const type = decodeURIComponent(params.type);
  const handleSelect = (timeSelect, time) => {
    setSelectedTime(timeSelect); // user active select time
    setTime(time); // dua time ra detail
  };

  moment.locale("id");
  const startTime = moment().startOf("day").add(open_hour, "hours");
  const endTime = moment().startOf("day").add(close_hour, "hours");
  return (
    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-4">
      {[...Array(endTime.diff(startTime, "hours"))].map((_, i) => {
        const time = moment(startTime).add(i, "hours");
        const extraTime = moment(startTime).add(i + 1, "hours");

        const isDisabled =
          timeStore[type] &&
          timeStore[type].some((t) => {
            const { month, day } = t;
            // console.log(
            //   month,
            //   selectedMonth,
            //   day,
            //   selectedDay.date,
            //   t.time,
            //   `${time.format("LT")} - ${extraTime.format("LT")}`
            // );

            return (
              month == selectedMonth &&
              day == selectedDay.date &&
              t.time == `${time.format("LT")} - ${extraTime.format("LT")}`
            );
          });
        return (
          <button
            id={`time-${time.format("HH:mm")}`}
            className={`text-center border py-5 rounded-lg lg:shadow-md ${
              selectedTime === time.format("LT")
                ? "bg-teal-500 text-white"
                : "bg-white"
            }`}
            key={i}
            disabled={isDisabled}
            onClick={() =>
              handleSelect(
                time.format("LT"),
                `${time.format("LT")} - ${extraTime.format("LT")}`
              )
            }
          >
            {/* <h5 className="font-semibold text-lg xl:hidden">
              {time.format("LT")}
            </h5> */}
            <h5 className="font-semibold text-lg xl:hidden">
              {time.format("LT")} - {extraTime.format("LT")}
            </h5>
          </button>
        );
      })}
    </div>
  );
}

export function DisplayBooking({
  selectedDay,
  selectedTime,
  price,
  type,
  countMonth,
}) {
  price = (price * parseInt(countMonth)).toString();
  moment.locale("en");
  return (
    <>
      <h4 className="text-xl font-bold text-center lg:text-left capitalize border-b-2 desc-timeslot">
        Booking status
      </h4>
      <div className="my-3 border rounded-lg py-5 px-10 shadow-sm bg-white booking-status">
        <div className="font-semibold flex justify-between ">
          <div className="text-left text-lg">
            <h4 className="hidden lg:block">Date :</h4>
            <h4 className="hidden lg:block">Booking Time :</h4>
            <h4 className="hidden lg:block">Price :</h4>
          </div>
          <div className="text-right text-lg">
            <h4 className="">
              <strong>Ngày:</strong>{" "}
              {`${selectedDay.day}, ${moment(selectedDay.date).format(
                "DD MMMM YYYY"
              )}`}
            </h4>
            {!type.includes("Fitness") && (
              <h4 className="">
                <strong>Giờ:</strong>{" "}
                {selectedTime !== "00:00" ? `${selectedTime} (1 hour)` : ""}
              </h4>
            )}

            <h4 className="">
              <strong>Giá:</strong>{" "}
              {selectedTime !== "00:00"
                ? `${price.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} VNĐ`
                : ""}
            </h4>
          </div>
        </div>
      </div>
    </>
  );
}

export function IconLoading(item) {
  return (
    <>
      <div key={item.id} className="">
        <div className="rounded-2xl animate-pulse">
          <div className="h-24 bg-gray-400 rounded-md"></div>
          <div className="m-2 flex justify-center">
            <div className="w-1/3 text-center bg-gray-400 h-6 rounded-md my-2">
              {item.icon}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import Navbar from "../../NavBar/NavBar";
import Sidebar from "../../Sidebar/Sidebar";
import axios from "axios";
import "./dashboard.css";
export default function Dashboard() {
  const [accounts, setAccount] = useState([]);
  const [sports, setSports] = useState([]);
  const [classes, setClasses] = useState([]);
  useEffect(async () => {
    const token = localStorage.getItem("token");
    const accounts = await getAccountList(token);
    setAccount([...accounts]);
    const sports = await fetchSportList(token);
    setSports([...sports]);
    const classes = await getClassList(token);
    setClasses([...classes]);
  }, []);
  const getAccountList = async (token) => {
    const response = await fetch("http://localhost:9000/view/account", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch account list");
    }
  };

  const fetchSportList = async (token) => {
    try {
      const response = await axios.get("http://localhost:9000/sport", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  };

  const getClassList = async (token) => {
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
  return (
    <div>
      <Navbar />
      <div className="box__container">
        <div className="box box-1">
          Tổng số tài khoản:<i className="bx bx-user"></i>
          <div className="content-box">
            <div className="number">
              {accounts?.length === 0 ? "Loading . . ." : accounts?.length}
            </div>
          </div>
        </div>
        <div className="box box-2">
          Tổng môn thể thao: <i className="bx bxs-cricket-ball"></i>
          <div className="content-box">
            <div className="number">
              {sports?.length === 0 ? "Loading . . ." : sports?.length}
            </div>
          </div>
        </div>
        <div className="box box-3">
          Tổng số CLB: <i className="bx bx-trophy"></i>
          <div className="content-box">
            <div className="number">
              {classes?.length === 0 ? "Loading . . ." : classes?.length}
            </div>
          </div>
        </div>
        <div className="box box-4">400</div>
      </div>
      <Sidebar />
    </div>
  );
}

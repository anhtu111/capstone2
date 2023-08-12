import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./Sport.css";

function Sport() {
  const navigate = useNavigate();

  const [clubs, setClubs] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("Group classes");

  // FAKE DATA
  const sports = [
    {
      sportId: 1,
      sportName: "Gym",
      sportImage:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      sportGroup: "Group classes",
      classList: [],
    },
    {
      sportId: 2,
      sportName: "Football",
      sportImage:
        "https://images.unsplash.com/photo-1553778263-73a83bab9b0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80",
      sportGroup: "Group classes",
      classList: [],
    },
    {
      sportId: 3,
      sportName: "Tennis",
      sportImage:
        "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      sportGroup: "Group classes",
      classList: [],
    },
    {
      sportId: 4,
      sportName: "Boxing Kids",
      sportImage:
        "https://images.unsplash.com/photo-1516684991026-4c3032a2b4fd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1700&q=80",
      sportGroup: "Kid classes",
      classList: [],
    },
    {
      sportId: 5,
      sportName: "Football Kids",
      sportImage:
        "https://images.unsplash.com/photo-1598880513655-d1c6d4b2dfbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NHx8Rm9vdGJhbGwlMjBLaWRzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      sportGroup: "Kid classes",
      classList: [],
    },
    {
      sportId: 6,
      sportName: "Premium PT",
      sportImage:
        "https://images.unsplash.com/photo-1533560696583-6441b753a16a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
      sportGroup: "Personal Training",
      classList: [],
    },
    {
      sportId: 7,
      sportName: "Basic PT",
      sportImage:
        "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjB8fHB0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60",
      sportGroup: "Personal Training",
      classList: [],
    },
  ];
  // FILTER OF SPORTS
  const selectedSports = sports.filter(
    (club) => club.sportGroup === selectedGroup
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:9000/sport", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setClubs(response.data);
      } catch (error) {
        console.error("Error fetching data from API:", error);
      }
    };

    fetchData();
  }, []);

  const groupClasses = clubs.filter(
    (club) => club.sportGroup === "Group classes"
  );
  const kidClasses = clubs.filter((club) => club.sportGroup === "Kid classes");
  const personalTraining = clubs.filter(
    (club) => club.sportGroup === "Personal Training"
  );

  let selectedClubs = [];
  if (selectedGroup === "Group classes") {
    selectedClubs = groupClasses;
  } else if (selectedGroup === "Kid classes") {
    selectedClubs = kidClasses;
  } else if (selectedGroup === "Personal Training") {
    selectedClubs = personalTraining;
  }

  const handleToRegister = (sportName) => {
    navigate(`/${sportName}`);
  };
  const handleToLogin = () => {
    navigate("/");
  };
  return (
    <div className="service">
      <p className="service-title" style={{ textAlign: "center" }}>
        DỊCH VỤ CỦA CHÚNG TÔI
      </p>
      <div className="group-selection">
        <button onClick={() => setSelectedGroup("Group classes")}>
          Group classes
        </button>
        <button onClick={() => setSelectedGroup("Kid classes")}>
          Kid classes
        </button>
        <button onClick={() => setSelectedGroup("Personal Training")}>
          Personal Training
        </button>
      </div>
      <div className="club-selection">
        {selectedClubs.length === 0
          ? selectedSports.map((club) => (
              <div key={club.sportId} className="club-box">
                <img src={club.sportImage} alt={club.sportName} />
                <h2 style={{ fontWeight: "bold", fontSize: "18px" }}>
                  {club.sportName}
                </h2>
              </div>
            ))
          : selectedClubs.map((club) => (
              <div key={club.sportId} className="club-box">
                <img src={club.sportImage} alt={club.sportName} />
                <h2 style={{ fontWeight: "bold" }}>{club.sportName}</h2>
                <button onClick={() => handleToRegister(club.sportName)}>
                  Register
                </button>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Sport;

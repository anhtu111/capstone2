import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import AdminPage from "../AdminPage/AdminPage";
import "./SportList.css";
import { useAlert } from "react-alert";

function SportList() {
  const alert = useAlert();

  const [sportList, setSportList] = useState([]);
  const [newSport, setNewSport] = useState({
    sportName: "",
    sportImage: "",
    sportGroup: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [selectedSportId, setSelectedSportId] = useState("");
  const [selectedSportData, setSelectedSportData] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:9000/sport", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSportList(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const createSport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:9000/sport/insert",
        newSport,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        setSportList([...sportList, response.data]);
        window.location.reload();
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateSport = async (sportId) => {
    const selectedSport = sportList.find((sport) => sport.sportId === sportId);
    if (selectedSport) {
      setSelectedSportId(sportId);
      setSelectedSportData(selectedSport);
      setCreateModalIsOpen(true);
    }
  };

  const handleUpdateSport = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:9000/sport/put/${selectedSportId}`,
        selectedSportData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status === 200) {
        const updatedSportList = sportList.map((sport) => {
          if (sport.sportId === selectedSportId) {
            return {
              ...sport,
              ...selectedSportData,
            };
          }
          return sport;
        });
        setSportList(updatedSportList);
        alert.success("Update employee successfully!");
        setCreateModalIsOpen(false);
      }
    } catch (error) {
      console.log(error.message);
      alert.error("Error updating employee.");
    }
  };

  const deleteSport = async (sportId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:9000/sport/delete/${sportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedSportList = sportList.filter(
          (sport) => sport.sportId !== sportId
        );
        setSportList(updatedSportList);
        alert.success("Deleted Sport successfully!");
      }
    } catch (error) {
      console.log(error.message);
      alert.error("Error deleting Sport.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedSportData({ ...selectedSportData, [name]: value });
  };

  const handleNewSportInputChange = (event) => {
    const { name, value } = event.target;
    setNewSport({ ...newSport, [name]: value });
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCreateModalIsOpen(false);
  };

  return (
    <>
      <AdminPage />
      <div>
        <div className="class-container">
          <div className="table-container">
            <div className="admin-management">QUẢN LÍ CÁC MÔN THỂ THAO</div>
            <div className="admin-list">Tổng số lớp: {sportList.length}</div>
            <table className="table table-bordered table-member">
              <thead>
                <tr>
                  <th>Sport Name</th>
                  <th>Sport Image</th>
                  <th>Sport Group</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {sportList.map((sport) => (
                  <tr key={sport.sportId}>
                    <td>{sport.sportName}</td>
                    <td>
                      <img
                        className="image-sport"
                        src={sport.sportImage}
                        alt={sport.sportName}
                      />
                    </td>
                    <td>{sport.sportGroup}</td>
                    <td>
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
                        <button onClick={() => updateSport(sport.sportId)}>
                          Update
                        </button>
                        <button onClick={() => deleteSport(sport.sportId)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="button-add-sport" onClick={openModal}>
              Add Sport
            </button>
            <Modal
              className="custom-modal"
              isOpen={modalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Create Sport"
            >
              <h2>Create Sport</h2>
              <div>
                <input
                  type="text"
                  name="sportName"
                  placeholder="Sport Name"
                  value={newSport.sportName}
                  onChange={handleNewSportInputChange}
                />
                <input
                  type="text"
                  name="sportImage"
                  placeholder="Sport Image URL"
                  value={newSport.sportImage}
                  onChange={handleNewSportInputChange}
                />
                <select
                  className="admin-select"
                  type="text"
                  name="sportGroup"
                  placeholder="Sport Group"
                  value={newSport.sportGroup}
                  onChange={handleNewSportInputChange}
                >
                  <option value="">Chọn nhóm:</option>
                  <option value="Group classes">Group classes</option>
                  <option value="Kid classes">Kid classes</option>
                  <option value="Personal Training">Personal Training</option>
                </select>
                <button onClick={createSport}>Create</button>
                <button className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </Modal>
            <Modal
              className="custom-modal"
              isOpen={createModalIsOpen}
              onRequestClose={closeModal}
              contentLabel="Update Sport"
            >
              <h2>Update Sport</h2>
              <div>
                <input
                  type="text"
                  name="sportName"
                  placeholder="Sport Name"
                  value={selectedSportData.sportName}
                  onChange={handleInputChange}
                />
                <input
                  type="text"
                  name="sportImage"
                  placeholder="Sport Image URL"
                  value={selectedSportData.sportImage}
                  onChange={handleInputChange}
                />
                <select
                  className="admin-select"
                  type="text"
                  name="sportGroup"
                  placeholder="Sport Group"
                  value={selectedSportData.sportGroup}
                  onChange={handleInputChange}
                >
                  Chọn nhóm:
                  <option value="Group classes">Group classes</option>
                  <option value="Kid classes">Kid classes</option>
                  <option value="Personal Training">Personal Training</option>
                </select>
                <button onClick={handleUpdateSport}>Update</button>
                <button className="btn-cancel" onClick={closeModal}>
                  Cancel
                </button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default SportList;

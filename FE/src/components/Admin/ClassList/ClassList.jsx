import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import AdminPage from "../AdminPage/AdminPage";
import { useAlert } from "react-alert";
import "./ClassList.css";
function ClassList() {
  const alert = useAlert();

  const [classList, setClassList] = useState([]);
  const [newClass, setNewClass] = useState({
    className: "",
    dayOfWeek: "",
    phone: "",
    price: "",
    star: "",
    team: "",
    description: "",
    classAddress: "",
    closeTime: "",
    openTime: "",
    capacity: "",
    classImage: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [selectedClassId, setSelectedClassId] = useState("");
  const [selectedClassData, setSelectedClassData] = useState({});

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCreateModalIsOpen(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const data = await getClassList(token);
      setClassList(data);
    } catch (error) {
      console.log(error.message);
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

  const createClass = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:9000/class/insert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newClass),
    });
    if (response.ok) {
      const data = await response.json();
      setClassList([...classList, data]);
      window.location.reload();
      alert.success("Insert Class successfully!");
    } else {
      console.log("Failed to create Class");
    }
    alert.success("Insert member successfully!");
  };

  const updateClass = async (classId) => {
    const selectedClass = classList.find((item) => item.classId === classId);
    if (selectedClass) {
      setSelectedClassId(classId);
      setSelectedClassData(selectedClass);
      setCreateModalIsOpen(true);
    }
  };

  const handleUpdateClass = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:9000/class/put/${selectedClassId}`,
        selectedClassData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedClassList = classList.map((item) => {
          if (item.classId === selectedClassId) {
            return {
              ...item,
              ...selectedClassData,
            };
          }
          return item;
        });

        setClassList(updatedClassList);
        alert.success("Update class successfully!");
        setCreateModalIsOpen(false);
      } else {
        console.log("Failed to update class");
      }
    } catch (error) {
      console.error("Error updating class:", error);
      alert.error("Error updating class.");
    }
  };

  const deleteClass = async (classId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:9000/class/delete/${classId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedClassList = classList.filter(
          (item) => item.classId !== classId
        );
        setClassList(updatedClassList);
        alert.success("Deleted class successfully!");
      } else {
        console.log("Failed to delete class");
      }
    } catch (error) {
      console.error("Error deleting class:", error);
      alert.error("Error deleting class.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedClassData({ ...selectedClassData, [name]: value });
  };

  const handleNewClassInputChange = (event) => {
    const { name, value } = event.target;
    setNewClass({ ...newClass, [name]: value });
  };

  return (
    <>
      <AdminPage />
      <div className="class-container">
        <div className="table-container">
          <div className="admin-management">QUẢN LÍ CÁC CÂU LẠC BỘ</div>
          <div className="admin-list">
            Tổng số câu lạc bộ: {classList.length}
          </div>
          <table className="table table-bordered table-member">
            <thead>
              <tr>
                <th>Tên CLB</th>
                <th>Ngày hoạt động</th>
                <th>SĐT:</th>
                <th>Giá</th>
                <th>Star</th>
                <th>Môn</th>
                <th>Địa chỉ</th>
                <th>Diện tích</th>
                <th>Ảnh CLB</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {classList.map((item) => (
                <tr key={item.classId}>
                  <td>{item.className}</td>
                  <td>{item.dayOfWeek}</td>
                  <td>{item.phone}</td>
                  <td>{item.price}</td>
                  <td>{item.star}</td>
                  <td>{item.team}</td>
                  <td>{item.classAddress}</td>
                  <td>{item.capacity}</td>
                  <td>
                    <img
                      className="image-member"
                      src={item.classImage}
                      alt="Class"
                    />
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button onClick={() => updateClass(item.classId)}>
                        Update
                      </button>
                      <button onClick={() => deleteClass(item.classId)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="button-add-class" onClick={openModal}>
              Add Class
            </button>
          </div>
          <Modal
            className="custom-modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Class"
          >
            <h2>Create Class</h2>
            <div>
              <input
                type="text"
                name="className"
                placeholder="Tên CLB: "
                value={newClass.className}
                onChange={handleNewClassInputChange}
              />
              <input
                type="text"
                name="dayOfWeek"
                placeholder="Ngày trong tuần"
                value={newClass.dayOfWeek}
                onChange={handleNewClassInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={newClass.phone}
                onChange={handleNewClassInputChange}
              />
              <input
                type="text"
                name="price"
                placeholder="Giá"
                value={newClass.price}
                onChange={handleNewClassInputChange}
              />
              <input
                type="text"
                name="star"
                placeholder="Star"
                value={newClass.star}
                onChange={handleNewClassInputChange}
              />
              <input
                type="text"
                name="team"
                placeholder="Môn"
                value={newClass.team}
                onChange={handleNewClassInputChange}
              />

              <input
                type="text"
                name="classAddress"
                placeholder="Địa chỉ"
                value={newClass.classAddress}
                onChange={handleNewClassInputChange}
              />

              <input
                type="text"
                name="capacity"
                placeholder="Diện tích"
                value={newClass.capacity}
                onChange={handleNewClassInputChange}
              />
              <input
                type="text"
                name="classImage"
                placeholder="URL ảnh lớp học"
                value={newClass.classImage}
                onChange={handleNewClassInputChange}
              />
              <button onClick={createClass}>Create</button>
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </Modal>

          <Modal
            className="custom-modal"
            isOpen={createModalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Class"
          >
            <h2>Update Class</h2>
            <div>
              <input
                type="text"
                name="className"
                placeholder="Tên lớp học"
                value={selectedClassData.className}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="dayOfWeek"
                placeholder="Ngày trong tuần"
                value={selectedClassData.dayOfWeek}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại"
                value={selectedClassData.phone}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="price"
                placeholder="Giá"
                value={selectedClassData.price}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="star"
                placeholder="Star"
                value={selectedClassData.star}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="team"
                placeholder="Team"
                value={selectedClassData.team}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="classAddress"
                placeholder="Địa chỉ"
                value={selectedClassData.classAddress}
                onChange={handleInputChange}
              />

              <input
                type="text"
                name="capacity"
                placeholder="Diện tích"
                value={selectedClassData.capacity}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="classImage"
                placeholder="URL ảnh lớp học"
                value={selectedClassData.classImage}
                onChange={handleInputChange}
              />
              <button onClick={handleUpdateClass}>Update</button>
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}

export default ClassList;

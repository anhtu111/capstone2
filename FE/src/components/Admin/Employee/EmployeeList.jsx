import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./EmployeeList.css";
import AdminPage from "../AdminPage/AdminPage";
import { useAlert } from "react-alert";

function EmployeeList() {
  const alert = useAlert();

  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: "",
    gender: "",
    age: "",
    phone: "",
    dayOfBirth: "",
    accountId: "",
    image: "",
    experience: "",
    degree: "",
    email: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState("");
  const [selectedEmployeeData, setSelectedEmployeeData] = useState({});
  const openModal = () => {
    setModalIsOpen(true);
  };
  const closeModal = () => {
    setModalIsOpen(false);
    setCreateModalIsOpen(false);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getEmployeeList(token);
        setEmployees(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const getEmployeeList = async (token) => {
    const response = await fetch("http://localhost:9000/employee", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch employee list");
    }
  };

  // Update
  const updateEmployee = async (employeeId) => {
    const selectedEmployee = employees.find(
      (employee) => employee.employeeId === employeeId
    );
    if (selectedEmployee) {
      setSelectedEmployeeId(employeeId);
      setSelectedEmployeeData(selectedEmployee);
      setCreateModalIsOpen(true);
    }
  };
  // PUT
  const handleUpdateEmployee = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:9000/employee/put/${selectedEmployeeId}`,
        selectedEmployeeData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedEmployees = employees.map((employee) => {
          if (employee.employeeId === selectedEmployeeId) {
            return {
              ...employee,
              ...selectedEmployeeData,
            };
          }
          return employee;
        });

        setEmployees(updatedEmployees);
        alert.success("Update employee successfully!");
        console.log("Update employee successfully!");
        setCreateModalIsOpen(false);
      } else {
        console.log("Failed to update employee");
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      alert.error("Error updating employee.");
    }
  };
  //   POST /employees
  const createEmployee = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:9000/employee/insert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEmployee),
    });
    if (response.ok) {
      const data = await response.json();
      setEmployees([...employees, data]);
      alert.success("Insert Employee successfully!");
      setCreateModalIsOpen(false);
      window.location.reload();
    } else {
      console.log("Failed to create Employee");
    }
  };

  // Delete
  const deleteEmployee = async (employeeId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:9000/employee/delete/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedEmployees = employees.filter(
          (employee) => employee.employeeId !== employeeId
        );
        setEmployees(updatedEmployees);
        alert.success("Deleted employee successfully!");
        console.log("Deleted employee successfully!");
      } else {
        console.log("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error deleting employee:", error);
      alert.error("Error deleting employee.");
    }
  };
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedEmployeeData({ ...selectedEmployeeData, [name]: value }); // Thay đổi thành setSelectedMemberData
  };
  const handleNewEmployeeInputChange = (event) => {
    const { name, value } = event.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };
  // Render
  return (
    <>
      <AdminPage />
      <div className="member-container">
        <div className="table-container">
          <div className="admin-management">QUẢN LÍ NHÂN VIÊN </div>
          <div className="admin-list">
            Tổng số lượng nhân viên: {employees.length}
          </div>
          <table className="table table-bordered table-member">
            <thead>
              <tr>
                <th>Tên</th>
                <th>SĐT</th>
                <th>Tuổi</th>
                <th>Email</th>
                <th>Giới tính</th>
                <th>Hình ảnh</th>
                <th>ID nhân viên</th>
                <th>Kinh nghiệm</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee.employeeId}>
                  <td>{employee.name}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.age}</td>
                  <td>{employee.email}</td>
                  <td>{employee.gender}</td>
                  <td>
                    {<img className="image-member" src={employee.image} />}
                  </td>
                  <td>{employee?.employeeId}</td>
                  <td>{employee?.experience}</td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button
                        onClick={() => updateEmployee(employee.employeeId)}
                      >
                        Update
                      </button>
                      <button
                        onClick={() => deleteEmployee(employee.employeeId)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="button-container">
            <button className="button-add-member" onClick={openModal}>
              Add Employee
            </button>
          </div>
          {/* Modal for create employee */}
          <Modal
            className="custom-modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Employee"
          >
            <h2>Create Employee</h2>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Tên: "
                value={newEmployee?.name}
                onChange={handleNewEmployeeInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="SĐT: "
                value={newEmployee?.phone}
                onChange={handleNewEmployeeInputChange}
              />

              <select
                className="admin-select"
                name="age"
                value={newEmployee?.age}
                onChange={handleNewEmployeeInputChange}
              >
                <option value="">Chọn tuổi: </option>
                {Array.from({ length: 99 }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="email"
                placeholder="Email: "
                value={newEmployee?.email}
                onChange={handleNewEmployeeInputChange}
              />
              <select
                className="admin-select"
                name="gender"
                value={newEmployee?.gender}
                onChange={handleNewEmployeeInputChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              <input
                type="text"
                name="image"
                placeholder="Image URL: "
                value={newEmployee?.image}
                onChange={handleNewEmployeeInputChange}
              />
              <input
                type="text"
                name="accountId"
                placeholder="ID tài khoản: "
                value={newEmployee?.employeeId}
                onChange={handleNewEmployeeInputChange}
              />
              <input
                type="text"
                name="experience"
                placeholder="Kinh nghiệm: "
                value={newEmployee?.experience}
                onChange={handleNewEmployeeInputChange}
              />

              <button onClick={createEmployee}>Create</button>
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </Modal>
          {/* Modal for update employee */}
          <Modal
            className="custom-modal"
            isOpen={createModalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Employee"
          >
            <h2>Update Employee</h2>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Tên: "
                value={selectedEmployeeData?.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="SĐt: "
                value={selectedEmployeeData?.phone}
                onChange={handleInputChange}
              />
              <select
                className="admin-select"
                name="age"
                value={selectedEmployeeData?.age}
                onChange={handleInputChange}
              >
                <option value="">Chọn tuổi</option>
                {Array.from({ length: 99 }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <input
                type="text"
                name="email"
                placeholder="Email: "
                value={selectedEmployeeData?.email}
                onChange={handleInputChange}
              />
              <select
                className="admin-select"
                name="gender"
                value={selectedEmployeeData?.gender}
                onChange={handleInputChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={selectedEmployeeData?.image}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="accountId"
                placeholder="Account ID"
                value={selectedEmployeeData?.employeeId}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="accountId"
                placeholder="Kinh nghiệm: "
                value={selectedEmployeeData?.experience}
                onChange={handleInputChange}
              />
              <button onClick={handleUpdateEmployee}>Update</button>
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

export default EmployeeList;

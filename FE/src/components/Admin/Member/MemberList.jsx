import React, { useEffect, useState } from "react";
import Modal from "react-modal";

import axios from "axios";
import { Link } from "react-router-dom";
import "./MemberList.css";
import AdminPage from "../AdminPage/AdminPage";
import { useAlert } from "react-alert";
import Sidebar from "../../Sidebar/Sidebar";

function MemberList() {
  const alert = useAlert();

  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({
    name: "",
    gender: "",
    age: "",
    phone: "",
    dayOfBirth: "",
    accountId: "",
    image: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false); // modal for create member
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false); // modal for update member
  const [selectedMemberId, setSelectedMemberId] = useState("");
  const [selectedMemberData, setSelectedMemberData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const data = await getMemberList(token);
        setMembers(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const getMemberList = async (token) => {
    const response = await fetch("http://localhost:9000/member", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Failed to fetch member list");
    }
  };
  const getMemberById = async (memberId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:9000/member/${memberId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const member = response.data;
        console.log("Member:", member);
        // Hiển thị thông tin thành viên
        // alert.success(`Member: ${JSON.stringify(member)}`);
      } else {
        console.log("Failed to get member by ID");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // Update
  const updateMember = async (memberId) => {
    const selectedMember = members.find(
      (member) => member.memberId === memberId
    );
    if (selectedMember) {
      setSelectedMemberId(memberId);
      setSelectedMemberData(selectedMember);
      setCreateModalIsOpen(true); // Thay đổi thành setCreateModalIsOpen(true)
    }
  };
  const handleUpdateMember = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `http://localhost:9000/member/put/${selectedMemberId}`,
        selectedMemberData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedMembers = members.map((member) => {
          if (member.memberId === selectedMemberId) {
            return {
              ...member,
              ...selectedMemberData,
            };
          }
          return member;
        });

        setMembers(updatedMembers);
        alert.success("Update member successfully!");
        console.log("Update member successfully!");
        setCreateModalIsOpen(false); // Đóng modal cập nhật thành viên
      } else {
        console.log("Failed to update member");
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  // DELETE member
  const deleteMember = async (memberId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:9000/member/delete/${memberId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setMembers(members.filter((member) => member.memberId !== memberId));
        alert.success("Delete member successfully!");
      } else {
        console.log("Failed to delete member");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setCreateModalIsOpen(false);
  };
  // POST request (member)
  const createMember = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch("http://localhost:9000/member/insert", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMember),
    });
    if (response.ok) {
      const data = await response.json();
      setMembers([...members, data]);
      window.location.reload();
      alert.success("Insert member successfully!");
    } else {
      console.log("Failed to create member");
    }
    alert.success("Insert member successfully!");
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "dayOfBirth") {
      const selectedDate = new Date(value);
      const formattedDate = selectedDate.toLocaleDateString("en-GB"); // Định dạng ngày theo dd/mm/yyyy
      setSelectedMemberData({ ...selectedMemberData, [name]: formattedDate });
    } else {
      setSelectedMemberData({ ...selectedMemberData, [name]: value });
    }
  };
  const handleInputCreateMember = (event) => {
    const { name, value } = event.target;
    setNewMember({ ...newMember, [name]: value });
  };
  const renderNameCol = (name) => {
    let result = name;
    switch (name) {
      case "name":
        result = "Tên";
        break;
      case "phone":
        result = "Số điện thoại";
        break;
      default:
        break;
    }
    return result;
  };

  return (
    <>
      <AdminPage />
      <div className="member-container">
        <div className="table-container">
          <div className="admin-management">QUẢN LÍ THÀNH VIÊN</div>
          <div className="admin-list">
            <strong>Tổng số lượng thành viên:</strong> {members.length}
          </div>
          <table className="table table-bordered table-member">
            <thead>
              <tr>
                <th>Tên</th>
                <th>SĐT</th>
                <th>Tuổi</th>
                <th>Giới tính</th>
                <th>Hình ảnh</th>
                <th>Ngày sinh</th>
                <th>ID Tài khoản</th>
                <th>ID nhân viên</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((member) => (
                <tr key={member.memberId}>
                  <td>{member.name}</td>
                  <td>{member.phone}</td>
                  <td>{member.age}</td>
                  <td>{member.gender}</td>
                  <td>{<img className="image-member" src={member.image} />}</td>
                  <td>{member?.dayOfBirth}</td>
                  <td>{member?.accountId}</td>
                  <td>{member?.memberId}</td>
                  <td>
                    <button onClick={() => updateMember(member.memberId)}>
                      Update
                    </button>
                    <button onClick={() => deleteMember(member.memberId)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* modal for update member */}
          <Modal
            className="custom-modal"
            isOpen={createModalIsOpen}
            onRequestClose={setCreateModalIsOpen}
            contentLabel="Update Member"
          >
            <h2>Update Member</h2>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Tên: "
                value={selectedMemberData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="SĐT: "
                value={selectedMemberData.phone}
                onChange={handleInputChange}
              />
              <select
                className="admin-select"
                name="age"
                value={selectedMemberData?.age}
                onChange={handleInputChange}
              >
                <option value="">Chọn tuổi</option>
                {Array.from({ length: 99 }, (_, index) => (
                  <option key={index} value={index + 1}>
                    {index + 1}
                  </option>
                ))}
              </select>
              <select
                className="admin-select"
                name="gender"
                value={selectedMemberData?.gender}
                onChange={handleInputChange}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>

              <input
                type="text"
                name="image"
                placeholder="Image URL: "
                value={selectedMemberData.image}
                onChange={handleInputChange}
              />
              <input
                type="date"
                name="dayOfBirth"
                placeholder="Day of Birth"
                value={selectedMemberData.dayOfBirth}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="accountId"
                placeholder="Account ID"
                value={selectedMemberData.accountId}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="memberId"
                placeholder="Member ID"
                value={selectedMemberData.memberId}
                onChange={handleInputChange}
              />

              <button onClick={handleUpdateMember}>Update</button>
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </Modal>

          <div className="button-container">
            <button className="button-add-member" onClick={openModal}>
              Add Member
            </button>
          </div>

          {/* Modal for create member*/}
          <Modal
            className="custom-modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Member"
          >
            <h2>Create Member</h2>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={newMember.name}
                onChange={handleInputCreateMember}
              />
              <input
                type="text"
                name="gender"
                placeholder="Gender"
                value={newMember.gender}
                onChange={handleInputCreateMember}
              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                value={newMember.age}
                onChange={handleInputCreateMember}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newMember.phone}
                onChange={handleInputCreateMember}
              />
              <input
                type="text"
                name="dayOfBirth"
                placeholder="Day of Birth"
                value={newMember.dayOfBirth}
                onChange={handleInputCreateMember}
              />
              <input
                type="text"
                name="accountId"
                placeholder="Account ID"
                value={newMember.accountId}
                onChange={handleInputCreateMember}
              />
              <input
                type="text"
                name="image"
                placeholder="Image URL"
                value={newMember.image}
                onChange={handleInputCreateMember}
              />
              <button onClick={createMember}>Create</button>
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

export default MemberList;

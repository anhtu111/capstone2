import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import axios from "axios";
import "./Account.css";
import AdminPage from "../AdminPage/AdminPage";
import { useAlert } from "react-alert";

function AccountList() {
  const alert = useAlert();

  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    phone: "",
    roleName: "",
  });

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [createModalIsOpen, setCreateModalIsOpen] = useState(false);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedAccountData, setSelectedAccountData] = useState({});
  const mapRoleName = (roleName) => {
    if (roleName === "ROLE_ADMIN") {
      return "Quản trị viên";
    } else if (roleName === "ROLE_USER") {
      return "Người dùng";
    } else if (roleName === "ROLE_EMPLOYEE") {
      return "Nhân viên";
    } else {
      return roleName;
    }
  };
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
        const data = await getAccountList(token);
        setAccounts(data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
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

  // Update
  const updateAccount = async (accountId) => {
    const selectedAccount = accounts.find(
      (account) => account.id === accountId
    );
    if (selectedAccount) {
      setSelectedAccountId(accountId);
      setSelectedAccountData(selectedAccount);
      setCreateModalIsOpen(true);
    }
  };

  // PUT
  const handleUpdateAccount = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:9000/put/${selectedAccountId}`,
        selectedAccountData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const updatedAccounts = accounts.map((account) => {
          if (account.id === selectedAccountId) {
            return {
              ...account,
              ...selectedAccountData,
            };
          }
          return account;
        });

        setAccounts(updatedAccounts);
        alert.success("Update account successfully!");
        console.log("Update account successfully!");
        setCreateModalIsOpen(false);
      } else {
        console.log("Failed to update account");
      }
    } catch (error) {
      console.error("Error updating account:", error);
      alert.error("Error updating account.");
    }
  };
  // validate phone
  const validatePhone = (phone) => {
    const phoneRegex = /^\d{10,}$/;
    return phoneRegex.test(phone);
  };
  // validate email
  const emailRegex = /^\S+@\S+\.\S+$/;
  //   POST /accounts
  const createAccount = async () => {
    try {
      if (!validatePhone(newAccount.phone)) {
        alert.error("Vui lòng nhập số điện thoại hợp lệ (ít nhất 10 chữ số).");
        return;
      }
      if (!emailRegex.test(newAccount.email)) {
        alert.error("Vui lòng nhập một địa chỉ email hợp lệ.");
        return;
      }
      if (!newAccount.username) {
        alert.error("Vui lòng nhập username.");
        return;
      }
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:9000/view/register",
        newAccount,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        const data = response.data;
        setAccounts([...accounts, data]);
        alert.success("Insert account successfully!");
        closeModal(true);
      } else {
        console.log("Failed to create account");
      }
    } catch (error) {
      console.error("Error creating account:", error);
      alert.error("Error creating account:");
    }
  };

  // Delete
  const deleteAccount = async (accountId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        `http://localhost:9000/view/delete/${accountId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        const updatedAccounts = accounts.filter(
          (account) => account.id !== accountId
        );
        setAccounts(updatedAccounts);
        alert.success("Deleted account successfully!");
        console.log("Deleted account successfully!");
      } else {
        console.log("Failed to delete account");
      }
    } catch (error) {
      console.error("Error deleting account:", error);
      alert.error("Error deleting account.");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSelectedAccountData({ ...selectedAccountData, [name]: value });
  };

  const handleNewAccountInputChange = async (event) => {
    const { name, value } = event.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  // Render
  return (
    <>
      <AdminPage />
      <div className="account-container">
        <div className="table-container">
          <div className="admin-management">QUẢN LÍ TÀI KHOẢN</div>
          <div className="admin-list">
            Tổng số lượng tài khoản: {accounts.length}
          </div>
          <table className="table table-bordered table-member">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Roles</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((account) => (
                <tr key={account.id}>
                  <td>{account.id}</td>
                  <td>{account.username}</td>
                  <td>{account.email}</td>
                  <td>{account.phone}</td>
                  <td>
                    {account.roles.map((role) => (
                      <span key={role.id}>{mapRoleName(role.name)}</span>
                    ))}
                  </td>
                  <td>
                    <div style={{ display: "flex" }}>
                      <button onClick={() => updateAccount(account.id)}>
                        Update
                      </button>
                      <button onClick={() => deleteAccount(account.id)}>
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
              Tạo Tài Khoản
            </button>
          </div>
          {/* Modal for create account */}
          <Modal
            className="custom-modal"
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Create Account"
          >
            <h2>Tạo Tài Khoản</h2>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={newAccount.username}
                onChange={handleNewAccountInputChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={newAccount.password}
                onChange={handleNewAccountInputChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={newAccount.email}
                onChange={handleNewAccountInputChange}
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={newAccount.confirmPassword}
                onChange={handleNewAccountInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={newAccount.phone}
                onChange={handleNewAccountInputChange}
              />
              <select
                className="admin-select"
                name="roleName"
                value={newAccount.roleName}
                onChange={handleNewAccountInputChange}
              >
                <option value="">Chọn vai trò</option>
                <option value="ROLE_USER">Người dùng</option>
                <option value="ROLE_EMPLOYEE">Nhân viên</option>
              </select>
              <button onClick={createAccount}>Create</button>
              <button className="btn-cancel" onClick={closeModal}>
                Cancel
              </button>
            </div>
          </Modal>
          {/* Modal for update account */}
          <Modal
            className="custom-modal"
            isOpen={createModalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Update Account"
          >
            <h2>Update Account</h2>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={selectedAccountData.username}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                value={selectedAccountData.email}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone"
                value={selectedAccountData.phone}
                onChange={handleInputChange}
              />
              <select
                className="admin-select"
                name="roleName"
                value={selectedAccountData.roleName}
                onChange={handleInputChange}
              >
                <option value="">Chọn vai trò</option>
                <option value="ROLE_USER">Người dùng</option>
                <option value="ROLE_EMPLOYEE">Nhân viên</option>
              </select>
              <button onClick={handleUpdateAccount}>Update</button>
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
Modal.setAppElement("#root");
export default AccountList;

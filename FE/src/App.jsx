import { Route, Routes, Navigate } from "react-router-dom";
import { useState } from "react";

import jwt_decode from "jwt-decode";
import AccountList from "./components/Admin/AccountList/AccountList";
import MemberList from "./components/Admin/Member/MemberList";
import EmployeeList from "./components/Admin/Employee/EmployeeList";

import Detail from "./components/Customer/Booking/Detail";
import Login from "./components/Login/Login";
import Gym from "./components/Customer/Gym/Gym";
import Football from "./components/Customer/Football/Football";
import Blog1 from "./components/Blog1/Blog";
import Blog2 from "./components/Blog2/Blog2";
import Blog3 from "./components/Blog3/Blog3";
import AdminPage from "./components/Admin/AdminPage/AdminPage";
import Personnal from "./components/Personal/Personal";
import Sport from "./components/Customer/Sport/Sport";
import PaymentSuccess from "./components/Customer/PaymentSuccess/PaymentSuccess";
import Pricing from "./components/Pricing/Pricing";
import MuscleBody from "./components/Customer/MuscleBody/MuscleBody";
import ClassList from "./components/Admin/ClassList/ClassList";
import SportList from "./components/Admin/SportList/SportList";
import Basketball from "./components/Customer/Basketball/Basketball";
import Blog from "./components/Blog3/Blog3";
import DashboardAdmin from "./components/Admin/Dashboard/Dashboard";
import Dashboard from "./components/Dashboard/Dashboard";
import SuggestFootball from "./components/Customer/SuggestFootball/SuggestFootball";
import Suggest from "./components/Customer/Suggest/Suggest";
import Register from "./components/Register/Register";

const checkRole = (roles, requiredRole) => {
  return roles.includes(requiredRole);
};

const App = () => {
  const [userData, setUserData] = useState(null);

  const token = localStorage.getItem("token");
  let decodedToken = null;
  let userRole = [];

  if (token) {
    decodedToken = jwt_decode(token);
    userRole = decodedToken.role.map((role) => role.authority);
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/personal" element={<Personnal />} />

      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login setUserData={setUserData} />} />

      {/* ADMIN */}
      {checkRole(userRole, "ROLE_ADMIN") && (
        <Route path="/admin" element={<AdminPage />} />
      )}
      {checkRole(userRole, "ROLE_ADMIN") && (
        <Route path="/admin/dashboard" element={<DashboardAdmin />} />
      )}
      {checkRole(userRole, "ROLE_ADMIN") && (
        <Route path="/admin/account" element={<AccountList />} />
      )}
      {checkRole(userRole, "ROLE_ADMIN") && (
        <Route path="/admin/member" element={<MemberList />} />
      )}
      {checkRole(userRole, "ROLE_ADMIN") && (
        <Route path="/admin/employee" element={<EmployeeList />} />
      )}
      {checkRole(userRole, "ROLE_ADMIN") && (
        <Route path="/admin/class" element={<ClassList />} />
      )}

      {checkRole(userRole, "ROLE_ADMIN") && (
        <Route path="/admin/sport" element={<SportList />} />
      )}
      {/* USER */}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/" element={<Dashboard />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/:type/detail" element={<Detail />} />
      )}

      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/gym" element={<Gym />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/football" element={<Football />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/blog1" element={<Blog1 />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/blog2" element={<Blog2 />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/blog3" element={<Blog />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/sport" element={<Sport />} />
      )}

      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/pricing" element={<Pricing />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/api/payment/payment_infor" element={<PaymentSuccess />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/body" element={<MuscleBody />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/basketball" element={<Basketball />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/suggestFootball" element={<SuggestFootball />} />
      )}
      {checkRole(userRole, "ROLE_USER") && (
        <Route path="/suggest" element={<Suggest />} />
      )}
    </Routes>
  );
};

export default App;

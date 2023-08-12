import { Route, Routes } from "react-router-dom";
import jsonServerProvider from "ra-data-json-server";
import { useState } from "react";
import Dashboard from "./components/Dashboard/Dashboard";
import Gym from "./components/Customer/Gym/Gym";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
// import MemberList from "../src/MemberList";
import AdminPage from "./components/Admin/AdminPage/AdminPage";
import Pricing from "./components/Pricing/Pricing";
import MemberList from "./components/Admin/Member/MemberList";
import EmployeeList from "./components/Admin/Employee/EmployeeList";
import Sidebar from "./components/Sidebar/Sidebar";
import Blog from "./components/Blog/Blog";
import Football from "./components/Football/Football";
import Time from "./components/Time/Time";
import Payment from "./components/Payment/Payment";
import Sport from "./components/Customer/Sport/Sport";
import Navbar from "./components/NavBar/NavBar";
import SchedulePage from "./components/Customer/SchedulePage/SchedulePage";
import Personal from "./components/Personal/Personal";
import AccountList from "./components/Admin/AccountList/AccountList";
import Detail from "./components/Customer/Booking/Detail";

const dataProvider = jsonServerProvider("http://localhost:9000");
export default function App() {
  const [userData, setUserData] = useState(null);
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/detail" element={<Detail />} />

      <Route
        path="/nav"
        element={
          <Navbar userData={JSON.parse(localStorage.getItem("userData"))} />
        }
      />
      <Route path="/login" element={<Login setUserData={setUserData} />} />
      <Route path="/personal" element={<Personal />} />

      <Route path="/gym" element={<Gym />} />
      <Route path="/register" element={<Register />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/sidebar" element={<Sidebar />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/payment" element={<Payment />} />
      {/*  */}
      <Route path="/sport" element={<Sport />} />
      <Route path="/schedule" element={<SchedulePage />} />

      {/* admin */}
      <Route path="/admin/member" element={<MemberList />} />
      <Route path="/admin/account" element={<AccountList />} />
      <Route path="/admin/employee" element={<EmployeeList />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/football" element={<Football />} />
      <Route path="/time" element={<Time />} />

      {/* <Route path="/admin/*" element={<AdminLayout />} />
    <Route path="/member/*" element={<AdminLayout />} /> */}
    </Routes>
  );
}

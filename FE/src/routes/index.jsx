import AdminPanel from "../Admin";
import Blog from "../components/Blog/Blog";
import ClubSelection from "../components/Customer/ClubSelection/ClubSelection";
import Dashboard from "../components/Dashboard/Dashboard";
import Football from "../components/Football/Football";
import Footer from "../components/Footer/Footer";
import Gym from "../components/Gym/Gym";
import Login from "../components/Login/Login";
import Payment from "../components/Payment/Payment";
import Pricing from "../components/Pricing/Pricing";
import Register from "../components/Register/Register";
import Time from "../components/Time/Time";
const publicRoutes = [
  // admin
  { path: "/posts", component: AdminPanel },
  // customer
  {
    path: "/customer/club",
    component: ClubSelection,
  },
  {
    path: "/",
    component: Dashboard,
  },
  { path: "/login", component: Login },
  { path: "/register", component: Register },
  { path: "/footer", component: Footer },
  { path: "/pricing", component: Pricing },
  { path: "/time", component: Time },
  { path: "/football", component: Football },
  { path: "/payment", component: Payment },
  //
  { path: "/gym", component: Gym },
  { path: "/volleyball", component: Gym },
  { path: "/tennis", component: Gym },
  { path: "/boxing", component: Gym },
  { path: "/boxing-kid", component: Gym },
  { path: "/badminton", component: Gym },
  { path: "/football-kids", component: Gym },
  { path: "/premium-pt", component: Pricing },
  { path: "/basic-pt", component: Pricing },
  { path: "/blog", component: Blog },
];

const privateRoutes = [];
export { publicRoutes, privateRoutes };

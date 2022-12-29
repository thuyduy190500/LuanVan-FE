import { Route, Routes } from "react-router-dom";
import Home from "./admin/Home";
import Sidebar from "./admin/Sidebar";
import TopMenu from "./admin/TopMenu";
import HomePage from "./client/HomePage";
import Detail from "./client/Detail";
import Login from "./admin/Login";
import Register from "./admin/Register";
import Room from "./admin/Room";
import Bill from "./admin/Bill";
import DetailHome from "./admin/DetailHome";
import Service from "./admin/Service";
import TypeRoom from "./admin/TypeRoom";
import Customer from "./admin/Customer";
import Device from "./admin/Device";
import ListRoom from "./client/ListRoom";
import Booking from "./client/Booking";
import Electric_Water from "./admin/Electric_Water";
import RateRoom from "./admin/RateRoom";
import Manage_Booking from "./admin/Booking";
import DetailBill from "./admin/DetailBill";
import Export_Customer from "./admin/Export_Customer";
import Statistical from "./admin/Statistical";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sidebar" element={<Sidebar />}></Route>
        <Route path="/topmenu" element={<TopMenu />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/detail-home/:id" element={<DetailHome />}></Route>
        <Route path="/homepage" element={<HomePage />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/room" element={<Room />}></Route>
        <Route path="/bill" element={<Bill />}></Route>
        <Route path="/bill-detail/:id" element={<DetailBill />}></Route>
        <Route path="/service" element={<Service />}></Route>
        <Route path="/typeroom" element={<TypeRoom />}></Route>
        <Route path="/customer" element={<Customer />}></Route>
        <Route path="/device" element={<Device />}></Route>
        <Route path="/electric-water" element={<Electric_Water />}></Route>
        <Route path="/rateroom" element={<RateRoom />}></Route>
        <Route path="/booking" element={<Booking />}></Route>
        <Route path="/manage-booking" element={<Manage_Booking />}></Route>
        <Route path="/export-customer" element={<Export_Customer />}></Route>
        <Route path="/statistical" element={<Statistical />}></Route>
        <Route path="/enduser-listroom/:id" element={<ListRoom />}></Route>
      </Routes>
    </>
  );
}

export default App;

import { useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import CarDetails from "./pages/CarDetails";
import Cars from "./pages/Cars";
import MyBookings from "./pages/MyBookings";

import Layout from "./pages/admin/Layout";
import Dashboard from "./pages/admin/Dashboard";
import AddCar from "./pages/admin/AddCar";
import ManageCars from "./pages/admin/ManageCars";
import ManageBookings from "./pages/admin/ManageBookings";
import Login from "./components/Login";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  const isAdminPath = useLocation().pathname.startsWith("/admin");

  return (
    <>
      {showLogin && <Login setShowLogin={setShowLogin} />}
      {!isAdminPath && <Navbar setShowLogin={setShowLogin} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car-details/:id" element={<CarDetails />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/my-bookings" element={<MyBookings />} />

        <Route path="/admin" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="add-car" element={<AddCar />} />
          <Route path="manage-cars" element={<ManageCars />} />
          <Route path="manage-bookings" element={<ManageBookings />} />
        </Route>
      </Routes>
      {!isAdminPath && <Footer />}
    </>
  );
};

export default App;

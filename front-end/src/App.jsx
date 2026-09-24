import { HashRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Riders from "./pages/riders";
import Horses from "./pages/horses";
import Trainers from "./pages/trainers";
import Booking from "./pages/booking";
import Attendance from "./pages/attendance";
import Payments from "./pages/payments";
import Invoices from "./pages/invoices";
import Reports from "./pages/reports";
import Profile from "./pages/profile";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/riders" element={<Riders />} />
        <Route path="/horses" element={<Horses />} />
        <Route path="/trainers" element={<Trainers />} />
        <Route path="/bookings" element={<Booking />} />
        <Route path="/attendance" element={<Attendance />} />
        <Route path="/payments" element={<Payments />} />
        <Route path="/invoices" element={<Invoices />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
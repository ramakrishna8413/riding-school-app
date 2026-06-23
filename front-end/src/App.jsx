import { HashRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Riders from "./pages/Riders";
import Horses from "./pages/Horses";
import Trainers from "./pages/Trainers";
import Booking from "./pages/Booking";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Profile from "./pages/Profile";

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
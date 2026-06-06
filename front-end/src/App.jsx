import { HashRouter, Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Riders from "./pages/Riders";
import Horses from "./pages/Horses";
import Trainers from "./pages/Trainers";
import Booking from "./pages/Booking";
import Attendance from "./pages/Attendance";
import Payments from "./pages/Payments";
import Invoices from "./pages/Invoices";
import Reports from "./pages/Reports";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function ProtectedRoute({ children }) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  return isLoggedIn ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <HashRouter>
      <Routes>

        <Route path="/login" element={<Login />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/riders"
          element={
            <ProtectedRoute>
              <Riders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/horses"
          element={
            <ProtectedRoute>
              <Horses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/trainers"
          element={
            <ProtectedRoute>
              <Trainers />
            </ProtectedRoute>
          }
        />

        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/attendance"
          element={
            <ProtectedRoute>
              <Attendance />
            </ProtectedRoute>
          }
        />

        <Route
          path="/payments"
          element={
            <ProtectedRoute>
              <Payments />
            </ProtectedRoute>
          }
        />

        <Route
          path="/invoices"
          element={
            <ProtectedRoute>
              <Invoices />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <Reports />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

      </Routes>
    </HashRouter>
  );
}

export default App;
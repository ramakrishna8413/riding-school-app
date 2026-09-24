import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import api from "../api/api";

function Dashboard() {
  const [stats, setStats] = useState({
    totalRiders: 0,
    totalHorses: 0,
    totalTrainers: 0,
    totalBookings: 0,
  });

  const [revenue, setRevenue] = useState(0);
  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    api
      .get("/api/dashboard")
      .then((res) => setStats(res.data))
      .catch((err) => console.log(err));

    api
      .get("/api/revenue")
      .then((res) => setRevenue(res.data.totalRevenue || 0))
      .catch((err) => console.log(err));

    api
      .get("/api/recent-bookings")
      .then((res) => setRecentBookings(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 md:p-8 rounded-2xl shadow-lg mb-6">
        <h1 className="text-2xl md:text-4xl font-bold">
          🐎 Equestrian Pro Dashboard
        </h1>

        <p className="mt-2 text-blue-100">
          Manage riders, horses, trainers, bookings, payments and invoices
          from one place.
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
          <h3 className="text-gray-500">Total Riders</h3>
          <p className="text-2xl md:text-3xl font-bold text-blue-600">
            {stats.totalRiders}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
          <h3 className="text-gray-500">Total Horses</h3>
          <p className="text-2xl md:text-3xl font-bold text-green-600">
            {stats.totalHorses}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-purple-500">
          <h3 className="text-gray-500">Total Trainers</h3>
          <p className="text-2xl md:text-3xl font-bold text-purple-600">
            {stats.totalTrainers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-orange-500">
          <h3 className="text-gray-500">Total Bookings</h3>
          <p className="text-2xl md:text-3xl font-bold text-orange-600">
            {stats.totalBookings}
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg border-l-4 border-emerald-500">
          <h3 className="text-gray-500">Total Revenue</h3>
          <p className="text-2xl md:text-3xl font-bold text-emerald-600">
            ₹{revenue}
          </p>
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mt-8 bg-white p-6 rounded-2xl shadow-lg">
        <h3 className="text-xl md:text-2xl font-bold mb-4">
          📅 Recent Bookings
        </h3>

        {recentBookings.length === 0 ? (
          <p className="text-gray-500">No bookings found.</p>
        ) : (
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.booking_id}
                className="border-b pb-3"
              >
                <p>
                  <strong>Rider:</strong> {booking.rider_name}
                </p>

                <p>
                  <strong>Horse:</strong> {booking.horse_name}
                </p>

                <p>
                  <strong>Trainer:</strong> {booking.instructor_name}
                </p>

                <p>
                  <strong>Date:</strong> {booking.booking_date}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Dashboard;
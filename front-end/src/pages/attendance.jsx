import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Attendance() {
  const [bookings, setBookings] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [formData, setFormData] = useState({
    booking_id: "",
    attendance_status: "",
    trainer_notes: "",
  });

  const fetchData = async () => {
    try {
      const bookingsRes = await api.get("/api/bookings");
      const attendanceRes = await api.get("/api/attendance");

      setBookings(bookingsRes.data);
      setAttendance(attendanceRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/api/attendance", formData);

    setFormData({
      booking_id: "",
      attendance_status: "",
      trainer_notes: "",
    });

    fetchData();
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          📋 Attendance Management
        </h1>

        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-md max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Mark Attendance
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.booking_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  booking_id: e.target.value,
                })
              }
            >
              <option value="">Select Booking</option>

              {bookings.map((booking) => (
                <option
                  key={booking.booking_id}
                  value={booking.booking_id}
                >
                  {booking.rider_name} - {booking.booking_date}
                </option>
              ))}
            </select>

            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.attendance_status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  attendance_status: e.target.value,
                })
              }
            >
              <option value="">Select Status</option>
              <option value="Present">Present</option>
              <option value="Absent">Absent</option>
            </select>

            <textarea
              rows="4"
              className="w-full border border-gray-300 p-3 rounded-xl"
              placeholder="Trainer Notes"
              value={formData.trainer_notes}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  trainer_notes: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition"
            >
              Save Attendance
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Attendance Records
          </h2>

          <div className="grid gap-4">
            {attendance.map((record) => (
              <div
                key={record.attendance_id}
                className="bg-gray-50 p-5 rounded-2xl shadow-md"
              >
                <p>
                  <strong>Rider:</strong> {record.rider_name}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      record.attendance_status === "Present"
                        ? "text-green-600 font-semibold"
                        : "text-red-600 font-semibold"
                    }
                  >
                    {record.attendance_status}
                  </span>
                </p>

                <p>
                  <strong>Notes:</strong>{" "}
                  {record.trainer_notes || "No notes"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Attendance;
import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Booking() {
  const [riders, setRiders] = useState([]);
  const [horses, setHorses] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [bookings, setBookings] = useState([]);

  const [formData, setFormData] = useState({
    rider_id: "",
    horse_id: "",
    instructor_id: "",
    booking_date: "",
  });

  const fetchData = async () => {
    try {
      const ridersRes = await api.get("/api/riders");
      const horsesRes = await api.get("/api/horses");
      const trainersRes = await api.get("/api/trainers");
      const bookingsRes = await api.get("/api/bookings");

      setRiders(ridersRes.data);
      setHorses(horsesRes.data);
      setTrainers(trainersRes.data);
      setBookings(bookingsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/api/bookings", formData);

    setFormData({
      rider_id: "",
      horse_id: "",
      instructor_id: "",
      booking_date: "",
    });

    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/bookings/${id}`);
    fetchData();
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          📅 Booking Management
        </h1>

        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-md max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Create Booking
          </h2>

          <form
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.rider_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rider_id: e.target.value,
                })
              }
            >
              <option value="">Select Rider</option>

              {riders.map((rider) => (
                <option
                  key={rider.rider_id}
                  value={rider.rider_id}
                >
                  {rider.rider_name}
                </option>
              ))}
            </select>

            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.horse_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  horse_id: e.target.value,
                })
              }
            >
              <option value="">Select Horse</option>

              {horses.map((horse) => (
                <option
                  key={horse.horse_id}
                  value={horse.horse_id}
                >
                  {horse.horse_name}
                </option>
              ))}
            </select>

            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.instructor_id}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  instructor_id: e.target.value,
                })
              }
            >
              <option value="">Select Trainer</option>

              {trainers.map((trainer) => (
                <option
                  key={trainer.instructor_id}
                  value={trainer.instructor_id}
                >
                  {trainer.instructor_name}
                </option>
              ))}
            </select>

            <input
              type="date"
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.booking_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  booking_date: e.target.value,
                })
              }
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
            >
              Create Booking
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Booking List
          </h2>

          <div className="grid gap-4">
            {bookings.map((booking) => (
              <div
                key={booking.booking_id}
                className="bg-gray-50 p-5 rounded-2xl shadow-md"
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

                <p>
                  <strong>Status:</strong> {booking.status}
                </p>

                <button
                  onClick={() =>
                    handleDelete(booking.booking_id)
                  }
                  className="mt-4 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                >
                  Delete Booking
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Booking;
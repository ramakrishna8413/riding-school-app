import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Riders() {
  const [riders, setRiders] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    rider_name: "",
    age: "",
    phone: "",
    experience_level: "",
  });

  const fetchRiders = () => {
    api
      .get("/api/riders")
      .then((res) => setRiders(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchRiders();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/api/riders", formData);

    setFormData({
      rider_name: "",
      age: "",
      phone: "",
      experience_level: "",
    });

    fetchRiders();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/riders/${id}`);
    fetchRiders();
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          🏇 Rider Management
        </h1>

        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-md max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Add Rider
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="rider_name"
              placeholder="Rider Name"
              value={formData.rider_name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />

            <input
              type="number"
              name="age"
              placeholder="Age"
              value={formData.age}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />

            <input
              type="text"
              name="experience_level"
              placeholder="Experience Level"
              value={formData.experience_level}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-xl transition"
            >
              Add Rider
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Riders List
          </h2>

          <input
            type="text"
            placeholder="🔍 Search Rider by Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto block border-2 border-gray-300 p-3 rounded-xl mb-6"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {riders
              .filter((rider) =>
                rider.rider_name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((rider) => (
                <div
                  key={rider.rider_id}
                  className="bg-gray-50 p-5 rounded-2xl shadow-md"
                >
                  <h3 className="text-xl font-bold mb-3">
                    {rider.rider_name}
                  </h3>

                  <p>
                    <strong>Age:</strong> {rider.age}
                  </p>

                  <p>
                    <strong>Phone:</strong> {rider.phone}
                  </p>

                  <p>
                    <strong>Level:</strong> {rider.experience_level}
                  </p>

                  <button
                    onClick={() => handleDelete(rider.rider_id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Delete Rider
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Riders;
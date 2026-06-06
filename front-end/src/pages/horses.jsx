import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Horses() {
  const [horses, setHorses] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    horse_name: "",
    breed: "",
    age: "",
    status: "",
  });

  const fetchHorses = () => {
    api
      .get("/api/horses")
      .then((res) => setHorses(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchHorses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/api/horses", formData);

    setFormData({
      horse_name: "",
      breed: "",
      age: "",
      status: "",
    });

    fetchHorses();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/horses/${id}`);
    fetchHorses();
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          🐎 Horse Management
        </h1>

        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-md max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Add Horse
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="horse_name"
              placeholder="Horse Name"
              value={formData.horse_name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />

            <input
              type="text"
              name="breed"
              placeholder="Breed"
              value={formData.breed}
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
              name="status"
              placeholder="Status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border border-gray-300 p-3 rounded-xl"
            />

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition"
            >
              Add Horse
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">
            Horses List
          </h2>

          <input
            type="text"
            placeholder="🔍 Search Horse by Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full max-w-md mx-auto block border-2 border-gray-300 p-3 rounded-xl mb-6"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {horses
              .filter((horse) =>
                horse.horse_name
                  .toLowerCase()
                  .includes(search.toLowerCase())
              )
              .map((horse) => (
                <div
                  key={horse.horse_id}
                  className="bg-gray-50 p-5 rounded-2xl shadow-md"
                >
                  <h3 className="text-xl font-bold mb-3">
                    {horse.horse_name}
                  </h3>

                  <p>
                    <strong>Breed:</strong> {horse.breed}
                  </p>

                  <p>
                    <strong>Age:</strong> {horse.age}
                  </p>

                  <p>
                    <strong>Status:</strong> {horse.status}
                  </p>

                  <button
                    onClick={() => handleDelete(horse.horse_id)}
                    className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Delete Horse
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Horses;
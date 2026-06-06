import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Trainers() {
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    api
      .get("/api/trainers")
      .then((res) => setTrainers(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          👨‍🏫 Trainer Management
        </h1>

        <input
          type="text"
          placeholder="🔍 Search Trainer by Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md mx-auto block border-2 border-gray-300 p-3 rounded-xl mb-6"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {trainers
            .filter((trainer) =>
              trainer.instructor_name
                .toLowerCase()
                .includes(search.toLowerCase())
            )
            .map((trainer) => (
              <div
                key={trainer.instructor_id}
                className="bg-gray-50 p-5 rounded-2xl shadow-md"
              >
                <h3 className="text-xl font-bold mb-3">
                  {trainer.instructor_name}
                </h3>

                <p>
                  <strong>Phone:</strong> {trainer.phone}
                </p>

                <p>
                  <strong>Experience:</strong>{" "}
                  {trainer.experience_years} Years
                </p>
              </div>
            ))}
        </div>
      </div>
    </Layout>
  );
}

export default Trainers;
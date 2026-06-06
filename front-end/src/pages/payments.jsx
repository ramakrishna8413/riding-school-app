import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Payments() {
  const [riders, setRiders] = useState([]);
  const [payments, setPayments] = useState([]);

  const [formData, setFormData] = useState({
    rider_id: "",
    amount: "",
    payment_date: "",
    payment_status: "Paid",
  });

  const fetchData = async () => {
    try {
      const ridersRes = await api.get("/api/riders");
      const paymentsRes = await api.get("/api/payments");

      setRiders(ridersRes.data);
      setPayments(paymentsRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    await api.post("/api/payments", formData);

    setFormData({
      rider_id: "",
      amount: "",
      payment_date: "",
      payment_status: "Paid",
    });

    fetchData();
  };

  const handleDelete = async (id) => {
    await api.delete(`/api/payments/${id}`);
    fetchData();
  };

  const generateInvoice = async (paymentId) => {
    await api.post("/api/invoices", {
      payment_id: paymentId,
    });

    alert("Invoice Generated");
  };

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          💰 Payments Management
        </h1>

        <div className="bg-gray-50 p-4 md:p-6 rounded-2xl shadow-md max-w-xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">
            Add Payment
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
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

            <input
              type="number"
              placeholder="Amount"
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: e.target.value,
                })
              }
            />

            <input
              type="date"
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.payment_date}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment_date: e.target.value,
                })
              }
            />

            <select
              className="w-full border border-gray-300 p-3 rounded-xl"
              value={formData.payment_status}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  payment_status: e.target.value,
                })
              }
            >
              <option>Paid</option>
              <option>Pending</option>
            </select>

            <button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700 text-white p-3 rounded-xl transition"
            >
              Save Payment
            </button>
          </form>
        </div>

        <div className="mt-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">
            Payment Records
          </h2>

          <div className="grid gap-4">
            {payments.map((payment) => (
              <div
                key={payment.payment_id}
                className="bg-gray-50 p-5 rounded-2xl shadow-md"
              >
                <p>
                  <strong>Rider:</strong> {payment.rider_name}
                </p>

                <p>
                  <strong>Amount:</strong> ₹{payment.amount}
                </p>

                <p>
                  <strong>Date:</strong> {payment.payment_date}
                </p>

                <p>
                  <strong>Status:</strong> {payment.payment_status}
                </p>

                <div className="mt-4 flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() =>
                      handleDelete(payment.payment_id)
                    }
                    className="w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition"
                  >
                    Delete Payment
                  </button>

                  <button
                    onClick={() =>
                      generateInvoice(payment.payment_id)
                    }
                    className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition"
                  >
                    Generate Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Payments;
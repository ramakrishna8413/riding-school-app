import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Invoices() {
  const [invoices, setInvoices] = useState([]);

  const fetchInvoices = async () => {
    try {
      const res = await api.get("/api/invoices");
      setInvoices(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold text-center mb-8">
          📄 Invoices
        </h1>

        {invoices.length === 0 ? (
          <div className="bg-gray-50 p-6 rounded-2xl shadow text-center">
            <p className="text-gray-500">
              No invoices available.
            </p>
          </div>
        ) : (
          <div className="grid gap-4">
            {invoices.map((invoice) => (
              <div
                key={invoice.invoice_id}
                className="bg-gray-50 p-5 rounded-2xl shadow-md"
              >
                <p>
                  <strong>Invoice No:</strong>{" "}
                  {invoice.invoice_number}
                </p>

                <p>
                  <strong>Rider:</strong>{" "}
                  {invoice.rider_name}
                </p>

                <p>
                  <strong>Amount:</strong> ₹
                  {invoice.amount}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {invoice.invoice_date}
                </p>

                <p>
                  <strong>Status:</strong>{" "}
                  <span
                    className={
                      invoice.payment_status === "Paid"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {invoice.payment_status}
                  </span>
                </p>

                <button
                  onClick={() => window.print()}
                  className="mt-4 w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition"
                >
                  Print Invoice
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Invoices;
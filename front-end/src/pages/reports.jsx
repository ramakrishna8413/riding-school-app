import { useEffect, useState } from "react";
import api from "../api/api";
import Layout from "../components/Layout";

function Reports() {
  const [report, setReport] = useState({
    totalPayments: 0,
    paidPayments: 0,
    pendingPayments: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    api
      .get("/api/reports")
      .then((res) => setReport(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <Layout>
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full">
        <h1 className="text-2xl md:text-4xl font-bold mb-8">
          📊 Reports Dashboard
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg border-l-4 border-green-500">
            <h3 className="text-gray-500">
              Total Revenue
            </h3>

            <p className="text-2xl md:text-3xl font-bold text-green-600">
              ₹{report.totalRevenue || 0}
            </p>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg border-l-4 border-blue-500">
            <h3 className="text-gray-500">
              Total Payments
            </h3>

            <p className="text-2xl md:text-3xl font-bold text-blue-600">
              {report.totalPayments || 0}
            </p>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg border-l-4 border-emerald-500">
            <h3 className="text-gray-500">
              Paid Payments
            </h3>

            <p className="text-2xl md:text-3xl font-bold text-emerald-600">
              {report.paidPayments || 0}
            </p>
          </div>

          <div className="bg-white p-5 md:p-6 rounded-2xl shadow-lg border-l-4 border-yellow-500">
            <h3 className="text-gray-500">
              Pending Payments
            </h3>

            <p className="text-2xl md:text-3xl font-bold text-yellow-600">
              {report.pendingPayments || 0}
            </p>
          </div>
        </div>

        <div className="mt-8 bg-gray-50 p-5 md:p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Business Summary
          </h2>

          <div className="space-y-3">
            <p className="text-gray-700">
              Total Revenue Generated:
              <strong> ₹{report.totalRevenue || 0}</strong>
            </p>

            <p className="text-gray-700">
              Successful Payments:
              <strong> {report.paidPayments || 0}</strong>
            </p>

            <p className="text-gray-700">
              Pending Payments:
              <strong> {report.pendingPayments || 0}</strong>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Reports;
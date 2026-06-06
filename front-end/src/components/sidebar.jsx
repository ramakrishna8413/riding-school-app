import { Link } from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 text-white z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700 flex items-center justify-between">
          <span>🐎 Riding School</span>

          <button
            onClick={onClose}
            className="lg:hidden p-2 rounded-md bg-gray-800 hover:bg-gray-700"
          >
            ✕
          </button>
        </div>

        <nav className="mt-6">
          <ul className="space-y-2 px-4 pb-8">
            <li>
              <Link
                to="/"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Dashboard
              </Link>
            </li>

            <li>
              <Link
                to="/riders"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Riders
              </Link>
            </li>

            <li>
              <Link
                to="/horses"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Horses
              </Link>
            </li>

            <li>
              <Link
                to="/trainers"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Trainers
              </Link>
            </li>

            <li>
              <Link
                to="/bookings"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Bookings
              </Link>
            </li>

            <li>
              <Link
                to="/attendance"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Attendance
              </Link>
            </li>

            <li>
              <Link
                to="/payments"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Payments
              </Link>
            </li>

            <li>
              <Link
                to="/invoices"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Invoices
              </Link>
            </li>

            <li>
              <Link
                to="/reports"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Reports
              </Link>
            </li>

            <li>
              <Link
                to="/profile"
                onClick={onClose}
                className="block p-3 rounded-lg hover:bg-gray-700 transition"
              >
                Profile
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
    </>
  );
}

export default Sidebar;
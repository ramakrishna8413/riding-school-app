

function Navbar({ onOpenSidebar }) {
  

  

  return (
    <div className="bg-white shadow p-4 flex items-center justify-between gap-4 flex-nowrap">
      <button
        onClick={onOpenSidebar}
        className="lg:hidden p-2 rounded-md bg-gray-100 hover:bg-gray-200 transition"
        aria-label="Open navigation menu"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 5.75h16.5M3.75 12h16.5M3.75 18.25h16.5"
          />
        </svg>
      </button>

      <h1 className="text-2xl font-bold">
        🐎 Horse Riding School Dashboard
      </h1>

      <div className="flex items-center gap-4">
        <span className="font-semibold">
          Admin
        </span>

        
      </div>
    </div>
  );
}

export default Navbar;
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const navigate = useNavigate();
  const [open, setOpen] = useState(false); // for mobile menu toggle

  const logout = () => {
    localStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="bg-gray-900 bg-opacity-90 shadow-md fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <h1 className="text-2xl font-bold text-white">Conference App</h1>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 items-center">
            {role === "user" && (
              <>
                <Link className="text-gray-200 hover:text-white transition" to="/">
                  Home
                </Link>
                <Link className="text-gray-200 hover:text-white transition" to="/my-bookings">
                  My Bookings
                </Link>
              </>
            )}
            {role === "admin" && (
              <>
                <Link className="text-gray-200 hover:text-white font-semibold transition" to="/admin">
                  Admin Panel
                </Link>
                <Link
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                  to="/admin/create"
                >
                  Create Conference
                </Link>
              </>
            )}
            {role && (
              <button
                onClick={logout}
                className="border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-200 hover:text-white focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={open ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-gray-800 bg-opacity-95 px-4 pt-2 pb-4 space-y-1">
          {role === "user" && (
            <>
              <Link onClick={() => setOpen(false)} className="block text-gray-200 hover:text-white" to="/">
                Home
              </Link>
              <Link onClick={() => setOpen(false)} className="block text-gray-200 hover:text-white" to="/my-bookings">
                My Bookings
              </Link>
            </>
          )}
          {role === "admin" && (
            <>
              <Link onClick={() => setOpen(false)} className="block text-gray-200 hover:text-white font-semibold" to="/admin">
                Admin Panel
              </Link>
              <Link
                onClick={() => setOpen(false)}
                className="block bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                to="/admin/create"
              >
                Create Conference
              </Link>
            </>
          )}
          {role && (
            <button
              onClick={() => { logout(); setOpen(false); }}
              className="block w-full border border-red-500 text-red-500 px-3 py-1 rounded hover:bg-red-500 hover:text-white transition"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

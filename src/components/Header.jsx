import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/Matrimonylogo.jpg"; // Adjust the path as needed

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Dummy login state, replace with actual auth state or context
  const [isLoggedIn, setIsLoggedIn] = useState(false); // For example purpose

  return (
    <header className="bg-gray-100 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Matrimony */}
        <Link
          to="/"
          className="flex items-center bg-white rounded-lg shadow px-3 py-1 hover:shadow-lg transition"
          style={{ textDecoration: "none" }}
        >
          <img
            src={logo}
            alt="Matrimony Logo"
            className="h-10 w-10 rounded-full object-cover mr-2"
            style={{
              backgroundColor: "#fff",
              border: "2px solid #f472b6", // Optional: pink border for pop
            }}
          />
          <span className="text-2xl font-bold text-pink-600">Matrimony</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-10 font-medium text-gray-900">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/about" className="hover:text-gray-600">About</Link>
          <Link to="/matches" className="hover:text-gray-600">Matches</Link>
          <Link to="/search" className="hover:text-gray-600">Search</Link>
          <Link to="/plans" className="hover:text-gray-600">Plans</Link>
          <Link to="/contact" className="hover:text-gray-600">Contact</Link>

          {/* Conditionally render Dashboard link if logged in */}
          {isLoggedIn && (
            <NavLink
              to="/dashboard/home"
              className={({ isActive }) =>
                `hover:text-block-700 transition ${
                  isActive ? "text-block-700 font-semibold" : "text-gray-800"
                }`
              }
            >
              Dashboard
            </NavLink>
          )}

          {/* Login + Register or Logout */}
          <div className="flex space-x-3">
            {!isLoggedIn ? (
              <>
                <Link
                  to="/login"
                  className="px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition font-semibold"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition font-semibold"
                >
                  Register
                </Link>
              </>
            ) : (
              <button
                onClick={() => setIsLoggedIn(false)}
                className="px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition font-semibold"
              >
                Logout
              </button>
            )}
          </div>
        </nav>

        {/* Hamburger for mobile */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-2xl text-gray-800 focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden bg-gray-100 border-t shadow-lg">
          <nav className="flex flex-col items-center space-y-4 py-6 font-medium text-gray-900">
            <Link to="/" className="hover:text-gray-600">Home</Link>
            <Link to="/about" className="hover:text-gray-600">About</Link>
            <Link to="/matches" className="hover:text-gray-600">Matches</Link>
            <Link to="/search" className="hover:text-gray-600">Search</Link>
            <Link to="/plans" className="hover:text-gray-600">Plans</Link>
            <Link to="/contact" className="hover:text-gray-600">Contact</Link>

            {/* Conditionally render Dashboard link on mobile */}
            {isLoggedIn && (
              <NavLink
                to="/dashboard/home"
                className={({ isActive }) =>
                  `hover:text-block-700 transition ${
                    isActive ? "text-block-700 font-semibold" : "text-gray-800"
                  }`
                }
              >
                Dashboard
              </NavLink>
            )}

            <div className="flex space-x-3">
              {!isLoggedIn ? (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 font-semibold"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 font-semibold"
                  >
                    Register
                  </Link>
                </>
              ) : (
                <button
                  onClick={() => setIsLoggedIn(false)}
                  className="px-5 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 font-semibold"
                >
                  Logout
                </button>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;


import React from "react";

const Navbar = () => {
  return (
    <header className="bg-black text-white">
      {/* Top bar */}
      <div className="flex justify-end items-center py-2 px-4 text-sm">
        <a
          href="tel:03150222850"
          className="hover:underline text-yellow-400 font-bold"
        >
          → Need Help? Call Us at 0315-0222850
        </a>
      </div>

      {/* Main Navbar */}
      <div className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          {/* Logo */}
          <a href="#" className="flex items-center">
            <img
              src="https://via.placeholder.com/100x100" // Replace with your logo URL
              alt="Azem Autos Logo"
              className="h-16 w-auto"
            />
          </a>

          {/* Search Bar */}
          <div className="flex-grow mx-8">
            <input
              type="text"
              placeholder="I am shopping for..."
              className="w-full border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>

          {/* Icons and Links */}
          <div className="flex items-center space-x-4">
            {/* Swap Icon */}
            <button className="text-gray-500 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.75 15.25h14.5M4.75 8.75h14.5m-14.5 0l5.25-5.25m9.25 11l-5.25 5.25"
                />
              </svg>
            </button>

            {/* Heart Icon */}
            <button className="text-gray-500 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4.75 6.75l7 7m0 0l7-7m-7 7v6.5m7-7H4.75"
                />
              </svg>
            </button>

            {/* Bell Icon */}
            <button className="text-gray-500 hover:text-black">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 8m0 2h12M8 4h12m0 8H8m0 4h12M8 8m-4 4h12"
                />
              </svg>
            </button>

            {/* Login / Registration */}
            <div className="text-sm space-x-2">
              <a href="#" className="hover:underline">
                Login
              </a>
              <span>|</span>
              <a href="#" className="hover:underline">
                Registration
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

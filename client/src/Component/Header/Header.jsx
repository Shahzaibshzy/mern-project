import Button from "./Button";
import SwingFigure from "./SwingFigure";
import React, { useState, useEffect } from "react";

const Header = () => {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  function handleMenu() {
    setIsMenuVisible(!isMenuVisible);
  }

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuVisible(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div>
      {/* NavBar */}
      <nav className="p-3 flex bg-gray-100 justify-between items-center">
        <a href="#" id="brand" className="flex gap-2 items-center">
          <img
            src="/Automobile.png"
            alt="
            Logo"
            className=" object-cover max-w-24 max-h-16"
            />
          <span className="text-3xl font-bold font-serif">AutoMobile</span>
        </a>
            
        {/* navmenu */}
        <div id="nav-menu " className="hidden lg:flex gap-24 ">
          <a href="#" className="font-bold hover:text-red-700">
            Home
          </a>
          <a href="#" className="font-bold hover:text-red-700">
            Product
          </a>
          <a href="#" className="font-bold hover:text-red-700">
            About
          </a>
          <a href="#" className="font-bold hover:text-red-700">
            Contact
          </a>
        </div>
        <div className="hidden md:flex items-center gap-3 p-3">
          {" "}
          <Button title="Login" />
          <Button title="Signup" />
        </div>
        <button className="p-4 md:hidden" onClick={handleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-7 text-black"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
        <div
          id="nav-dial"
          className={`fixed z-10 md:hidden bg-white inset-0 p-3 transform transition-transform duration-500 ${
            isMenuVisible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div id="nav-bar" className="flex justify-between">
            <a href="#" id="brand" className=" flex gap-2 items-center">
              <img
                src="/Automobile.png"
                alt="
          Logo"
                className="object-cover max-w-24 max-h-16"
              />
              <span className="text-3xl font-bold font-serif">AutoMobile</span>
            </a>
            <button className="p-4 md:hidden" onClick={handleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
          <div className="mt-6">
            {" "}
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-300 block rounded-lg"
            >
              {" "}
              Home
            </a>
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-300 block rounded-lg"
            >
              {" "}
              Product
            </a>
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-300 block rounded-lg"
            >
              {" "}
              About
            </a>
            <a
              href="#"
              className="font-medium m-3 p-3 hover:bg-gray-300 block rounded-lg"
            >
              {" "}
              Contact
            </a>
          </div>
          <div className="h-[1px] bg-gray-300"></div>
          <div className="mt-2 flex items-center space-x-2 p-3">
            {" "}
            <Button title="Login" />
            <Button title="Signup" />
          </div>
        </div>
      </nav>
      {/* <nav className="bg-gray-400 dark:bg-gray-900 fixed w-full z-20 border-b border-gray-900 dark:border-gray-600 flex justify-evenly ">
        <div className="max-w-screen-xl flex flex-wrap md:flex-auto items-center justify-start ">
          <a
            href="https://flowbite.com/"
            className="flex items-center justify-end space-x-3 rtl:space-x-reverse"
          >
            <img
              src="/Automobile.png" // Make sure the image path is correct
              className="w-24 h-16 px-1" // Automatically scale the width and height to the original size
              alt="Flowbite Logo"
            />
          </a>
        
          <div
            className="items-center justify-between hidden w-full md:flex md:my-1 md:w-auto md:mx-auto md:order-1"
            id="navbar-sticky"
          >
            <ul className="flex flex-col p-2 md:p-2 md:mx-24 mt-4 font-bold border border-gray-100 rounded-lg bg-gray-50 md:space-x-14 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-gray-3 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500"
                  aria-current="page"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Services
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-5 rtl:space-x-reverse md:mx-auto">
            <Button title="Login" />
            <Button title="Signup" />
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav> */}
    </div>
  );
};

export default Header;

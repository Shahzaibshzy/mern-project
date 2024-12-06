import React from "react";

const Button = ({ title }) => {
  return (
    <>
      <button
        type="button"
        className="text-black bg-yellow-400 outline-none hover:outline hover:outline-2 
                  hover:outline-yellow-300 hover:bg-white hover:text-yellow-700 focus:ring-4 focus:outline-none 
                   focus:ring-yellow-300 font-medium rounded-md text-md px-4 py-2 text-center transition-all duration-300 
                  dark:bg-yellow-300 dark:hover:bg-yellow-300 dark:focus:ring-yellow-300"
      >
        {title}
      </button>
    </>
  );
};

export default Button;

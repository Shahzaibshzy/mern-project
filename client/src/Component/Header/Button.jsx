import React from "react";

const Button = ({ title }) => {
  return (
    <>
      <button
        type="button"
        className="text-white bg-blue-700 outline-none hover:outline hover:outline-2 
  hover:outline-blue-700 hover:bg-white hover:text-blue-700 focus:ring-4 focus:outline-none 
  focus:ring-blue-300 font-medium rounded-md text-md px-4 py-2 text-center transition-all duration-300 
  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {title}
      </button>
    </>
  );
};

export default Button;

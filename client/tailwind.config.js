// tailwind.config.js
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Include React components
    "./node_modules/flowbite/**/*.js", // Ensure Flowbite components are included
  ],
  theme: {
    extend: {
      keyframes: {
        swing: {
          "0%": { transform: "rotate(-10deg)" },
          "100%": { transform: "rotate(10deg)" },
        },
      },
      animation: {
        swing: "swing 0.25s ease-in-out infinite alternate",
      },
      transformOrigin: {
        swing: "center -20px",
      },
      colors: {
        primary: "#0284c7",
      },
      fontFamily: {
        sans: ["InterVariable", ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require("flowbite/plugin"), // Add Flowbite plugin
  ],
};

// tailwind.config.js
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Include React components
    './node_modules/flowbite/**/*.js', // Ensure Flowbite components are included
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin'), // Add Flowbite plugin
  ],
};

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Import Flowbite CSS (for styling)
// Import Flowbite CSS (for styling)
import "flowbite/dist/flowbite.min.css";

// Import Flowbite JavaScript (for interactivity like modals, tooltips, etc.)
import "flowbite"; // Automatically resolves JS from node_modules


// Your other imports
import "./index.css";
import App from "./App.jsx";

// Rendering the app
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);


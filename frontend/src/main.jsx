import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import "@fortawesome/fontawesome-free/css/all.min.css";

import "./styles/font-optimization.css";
import "./styles/global.css";
import "./styles/admin.css";
import "./styles/BrandIcons.css";

import "./utils/axiosConfig.js";
import { usePerformanceMonitoring } from "./hooks/usePerformance.js";

// Performance monitoring component
const PerformanceMonitor = () => {
  usePerformanceMonitoring();
  return null;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PerformanceMonitor />
      <App />
    </Provider>
  </React.StrictMode>
);

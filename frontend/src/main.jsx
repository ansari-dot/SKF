import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./store/store";
import App from "./App.jsx";
import "./styles/global.css";
import "./styles/admin.css";
import "./styles/LoadingSpinner.css";
import "./utils/axiosConfig.js";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Preload important resources
const preloadResources = () => {
  const links = [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
    { 
      rel: 'preload', 
      href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap', 
      as: 'style',
      onload: "this.onload=null;this.rel='stylesheet'"
    }
  ];

  links.forEach(linkProps => {
    const link = document.createElement('link');
    Object.entries(linkProps).forEach(([key, value]) => {
      link[key] = value;
    });
    document.head.appendChild(link);
  });
};

// Register service worker for offline support
const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      const registration = await navigator.serviceWorker.register('/service-worker.js');
      console.log('ServiceWorker registration successful with scope: ', registration.scope);
    } catch (error) {
      console.error('ServiceWorker registration failed: ', error);
    }
  }
};

// Initialize the app
const initApp = () => {
  // Preload resources
  preloadResources();
  
  // Render the app
  const root = ReactDOM.createRoot(document.getElementById("root"));
  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );

  // Register service worker after initial render
  if (process.env.NODE_ENV === 'production') {
    registerServiceWorker();
  }
};

// Start the app
initApp();

// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import AuthProvider from "./contexts/AuthContext";
import { HelmetProvider } from "react-helmet-async";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    {/* ✅ Single global HelmetProvider */}
    <HelmetProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </HelmetProvider>
  </React.StrictMode>
);

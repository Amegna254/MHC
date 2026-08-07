import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import App from "./App";
import "./index.css";

import { AuthProvider } from "./context/AuthContext";
import { MarketplaceProvider } from "./context/MarketplaceContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <MarketplaceProvider>
          <App />

          <Toaster
            position="top-right"
            richColors
            closeButton
            expand={true}
            duration={3000}
          />
        </MarketplaceProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
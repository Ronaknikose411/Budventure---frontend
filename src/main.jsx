// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

// Routes
import AppRoutes from "./router/AppRoutes";

// Providers — ORDER MATTERS!
import { AuthProvider } from "./context/AuthProvider";     // ← Auth first
import { ChatProvider } from "./context/ChatProvider";     // ← Chat second (uses auth token)

import "./index.css"; // 
import App from "./App";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ChatProvider>
          
            
              <App/>
              

        </ChatProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
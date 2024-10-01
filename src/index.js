import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { IdeasContextProvider } from "./context/IdeasContext";
import { AuthContextProvider } from "./context/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <IdeasContextProvider>
        <App />
      </IdeasContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import CursorProvider from "@/context/cursor";

ReactDOM.render(
  <React.StrictMode>
    <CursorProvider>
      <App />
    </CursorProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

import "./index.css";

import React from "react";
import { createRoot } from "react-dom/client";

import App from "./App";

createRoot(document.querySelector("#root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import axios from "axios";
import React from "react";
import ReactDOM from "react-dom/client";
import routes from "./routes";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";

axios.defaults.baseURL = "http://localhost:3000";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

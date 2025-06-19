import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Home from "./routes/Home";
import BottomUp from "./routes/BottomUpAnalisys";
import Error from "./routes/Error";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bottom-up",
        element: <BottomUp />,
      },
      {
        path: "/error",
        element: <Error />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

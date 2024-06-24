import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "urql";
import { createClient } from "urql";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PersonPage from "./pages/PersonPage";
import HomePage from "./pages/HomePage";
import "./globals.css";
import { Layout } from "./ui/Layout";

const client = createClient({
  url: "https://swapi-graphql.netlify.app/.netlify/functions/index",
});

const router = createBrowserRouter([
  {
    path: "",
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "person/:personId",
        element: <PersonPage />,
      },
    ],
    element: <Layout />,
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

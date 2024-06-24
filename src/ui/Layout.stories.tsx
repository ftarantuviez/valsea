import "../globals.css";

import { Story } from "@ladle/react";
import { Layout } from "./Layout";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <h1>Helllo There</h1>,
      },
    ],
    element: <Layout />,
  },
]);

export const LayoutStory: Story = () => {
  return <RouterProvider router={router} />;
};

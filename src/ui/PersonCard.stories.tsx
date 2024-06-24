import "../globals.css";

import { Story } from "@ladle/react";
import { PersonCard } from "./PersonCard";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="h-screen p-28 bg-neutral-950">
        <PersonCard
          name="Luke SkyWolker"
          id="random-id"
          homeworld="Tatooine"
          height="172"
          mass="77"
          hairColor="blond"
        />
      </div>
    ),
  },
]);

export const PersonCardStory: Story = () => {
  return <RouterProvider router={router} />;
};

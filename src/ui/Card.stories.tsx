import "../globals.css";

import { Story } from "@ladle/react";
import { Card } from "./Card";

export const CardStory: Story = () => {
  return (
    <div className=" h-screen p-28 bg-neutral-950">
      <Card>
        <h3>Hello World</h3>

        <p>This is a card component</p>
      </Card>
    </div>
  );
};

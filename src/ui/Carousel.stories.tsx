import "../globals.css";

import { Story } from "@ladle/react";
import { Carousel } from "./Carousel";
import { Card } from "./Card";

export const CarouselStory: Story = () => {
  return (
    <div className="h-screen p-28 bg-neutral-950">
      <Card>
        <Carousel
          items={[
            <div className="w-60 h-60 bg-neutral-700 text-4xl text-center flex items-center justify-center">
              1
            </div>,
            <div className="w-60 h-60 bg-neutral-700 text-4xl text-center flex items-center justify-center">
              2
            </div>,
            <div className="w-60 h-60 bg-neutral-700 text-4xl text-center flex items-center justify-center">
              3
            </div>,
          ]}
          renderItem={(item) => item}
        />
      </Card>
    </div>
  );
};

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

/**
 * A `Carousel` component that displays a list of items in a carousel.
 *
 * @param items The list of items to display in the carousel.
 * @param renderItem A function that renders an item.
 * @returns A carousel component.
 **/
export const Carousel = <T,>({
  items,
  renderItem,
  className,
}: Readonly<{
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}>) => {
  const [index, setIndex] = useState<number>(0);

  const handleNext = () => {
    setIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const handleBack = () => {
    setIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
  };

  return (
    <div className="w-full">
      <div className={twMerge("flex justify-center", className)}>
        {renderItem(items[index])}
      </div>
      <div className="w-full flex items-center justify-between mt-4">
        <button
          onClick={handleBack}
          disabled={items.length === 0}
          className="border px-4 py-2 rounded-md disabled:opacity-50"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          disabled={items.length === 0}
          className="border px-4 py-2 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

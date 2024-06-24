/**
 * `Card` is a component that wraps its children in a card-like container.
 *
 * @param children The children to be wrapped in the card.
 * @returns A card component.
 */
export const Card = ({
  children,
}: Readonly<{
  readonly children: React.ReactNode;
}>): JSX.Element => (
  <div className="p-6 bg-neutral-900 border-neutral-700 border text-neutral-300 rounded-lg">
    {children}
  </div>
);

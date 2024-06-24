import { Link } from "react-router-dom";
import { Card } from "./Card";

export type PersonCardProps = Readonly<{
  readonly name: string;
  readonly id: string;
  readonly homeworld: string;
  readonly height: string | number;
  readonly mass: string | number;
  readonly hairColor: string;
}>;

/**
 * `PersonCard` is a card component that displays information about a Star Wars person.
 *
 * @param name The name of the person.
 * @param id The unique identifier of the person.
 * @param homeworld The homeworld of the person.
 * @param height The height of the person.
 * @param mass The mass of the person.
 * @param hairColor The hair color of the person.
 * @returns A card component displaying information about a Star Wars person.
 *
 **/
export const PersonCard = ({
  name,
  id,
  homeworld,
  height,
  mass,
  hairColor,
}: PersonCardProps): JSX.Element => {
  return (
    <Card>
      <Link to={`/person/${id}`}>
        <p className="text-xl text-center font-semibold mb-3 text-white hover:text-blue-500 transition-colors duration-300">
          {name}
        </p>
      </Link>
      <p className="text-lg font-medium mb-3">Details</p>
      <ul className="list-disc list-inside">
        <li className="ml-3">
          <span className="font-semibold">Homeworld:</span> {homeworld}{" "}
        </li>
        <li className="ml-3">
          <span className="font-semibold">Height:</span> {height} cm
        </li>
        <li className="ml-3">
          <span className="font-semibold">Mass:</span> {mass} kg
        </li>
        <li className="ml-3">
          <span className="font-semibold">Hair Color:</span> {hairColor}
        </li>
      </ul>
      <div className="h-px bg-neutral-700 my-6" />
      <Link to={`/person/${id}`}>
        <button className="border-blue-500 border p-1 px-4 text-neutral-200 font-medium rounded-md hover:bg-blue-500 hover:text-neutral-200 transition-colors duration-300">
          See Details
        </button>
      </Link>
    </Card>
  );
};

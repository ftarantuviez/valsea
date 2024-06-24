import { gql, useQuery } from "urql";
import { HomeQuery } from "../generated/graphql";
import { PersonCard, PersonCardProps } from "../ui/PersonCard";
import { useMemo } from "react";
import { Undefined } from "../common/Undefined";
import { SyncLoader } from "react-spinners";

const HOME_DOC = gql`
  query Home {
    allPeople {
      edges {
        node {
          id
          name
          homeworld {
            name
          }
          height
          mass
          hairColor
        }
      }
    }
  }
`;

const HomePage = (): JSX.Element => {
  const [data] = useQuery<HomeQuery>({ query: HOME_DOC });

  const safeCharacters = useMemo(
    () => getFormattedData(data.data?.allPeople),
    [data]
  );

  return (
    <div className="min-h-screen w-screen bg-neutral-950 p-20">
      {data.fetching ? (
        <div className="flex justify-center w-full h-40 items-end">
          <SyncLoader color="#3b82f6" size={35} />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {safeCharacters.map((node) => (
            <PersonCard key={node.id} {...node} />
          ))}
        </div>
      )}
    </div>
  );
};

/**
 * A helper function to format the data from the query.
 *
 * @param allPeople The data from the query.
 * @returns The formatted data.
 */
function getFormattedData(
  allPeople: HomeQuery["allPeople"]
): ReadonlyArray<PersonCardProps> {
  if (!allPeople?.edges) {
    return [];
  }

  const result: PersonCardProps[] = [];
  for (const edge of allPeople.edges) {
    // Filter out any null nodes
    if (Undefined.isNotNullish(edge) && Undefined.isNotNullish(edge.node)) {
      result.push({
        name: edge.node.name ?? "unknown",
        id: edge.node.id ?? "unknown",
        homeworld: edge.node.homeworld?.name ?? "unknown",
        height: edge.node.height ?? "unknown",
        mass: edge.node.mass ?? "unknown",
        hairColor: edge.node.hairColor ?? "unknown",
      });
    }
  }

  return result;
}

export default HomePage;

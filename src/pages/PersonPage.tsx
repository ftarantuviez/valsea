import { useParams } from "react-router-dom";
import { gql, useQuery } from "urql";
import { PersonQuery } from "../generated/graphql";
import { useMemo } from "react";
import { Card } from "../ui/Card";
import { Carousel } from "../ui/Carousel";
import { SyncLoader } from "react-spinners";

const PERSON_DOC = gql`
  query Person($personId: ID!) {
    person(id: $personId) {
      created
      name
      birthYear
      filmConnection {
        films {
          producers
          title
          releaseDate
          planetConnection {
            planets {
              surfaceWater
            }
          }
        }
      }
      species {
        averageHeight
      }
    }
  }
`;

const PersonPage = (): JSX.Element => {
  const { personId } = useParams();
  const [data] = useQuery<PersonQuery>({
    query: PERSON_DOC,
    variables: { personId: personId },
  });

  // Person data is memoized to prevent unnecessary re-renders.
  const person = useMemo(() => {
    if (!data?.data?.person) {
      return null;
    }

    return {
      name: data.data.person.name,
      birthYear: data.data.person.birthYear,
      producerCount: countProducers(data.data.person),
      speciesAverageHeight:
        data.data.person.species?.averageHeight ?? "unknown",
      films: getFormattedFilms(data.data.person),
    };
  }, [data]);

  return (
    <div className="min-h-screen w-screen bg-neutral-950 p-20 flex justify-center">
      {data.fetching && (
        <div className="flex justify-center w-full h-40 items-end">
          <SyncLoader color="#3b82f6" size={35} />
        </div>
      )}
      {person && (
        <div className="flex w-full flex-col gap-6 md:w-4/5 lg:w-4/5 xl:w-3/5 2xl:w-2/5">
          <p className="text-white text-4xl font-semibold text-center hover:text-blue-500 transition-colors duration-300">
            {person.name}
          </p>
          <p className="text-neutral-300 text-center text-2xl">
            {person.birthYear}
          </p>
          <div className="h-px bg-neutral-700 my-6" />

          <Card>
            <p className="text-2xl text-medium mb-3">
              Producers{" "}
              <span className="text-sm font-medium text-neutral-500">
                (This person has worked with the following producers)
              </span>
            </p>
            <div className="h-px bg-neutral-700 my-6" />
            <ul className="text-lg bg-neutral-900 list-disc ml-3">
              {Object.entries(person.producerCount).map(([producer, count]) => (
                <li key={producer} className="py-2">
                  <span className="font-medium"> {producer}</span>: {count}{" "}
                  times
                </li>
              ))}{" "}
            </ul>
          </Card>
          <Card>
            <p className="text-2xl text-medium mb-3">Species Average Height </p>
            <div className="h-px bg-neutral-700 my-6" />
            <p className="text-lg font-medium">
              {person.speciesAverageHeight === "unknown"
                ? "unkown data"
                : `${person.speciesAverageHeight} cm`}
            </p>
          </Card>
          <Card>
            <p className="text-2xl text-medium mb-3">Films</p>
            <div className="h-px bg-neutral-700 my-6" />
            <Carousel
              items={person.films}
              renderItem={(film) => (
                <div className="flex flex-col gap-3 text-center border rounded-lg p-8 border-blue-400 bg-blue-950 w-full">
                  <p className="text-2xl font-semibold text-blue-400">
                    {film.title}
                  </p>
                  <p className="text-lg">Released on {film.releaseDate}</p>
                  <p className="text-lg">
                    Planets with water: {film.planetsWithWater}
                  </p>
                </div>
              )}
              className="py-4"
            />
          </Card>
        </div>
      )}
    </div>
  );
};

/**
 * `countProducers` is a function that counts the number of films produced by each producer.
 *
 * @param person The person whose films are being counted.
 * @returns A record of producers and the number of films they produced.
 *
 **/
function countProducers(person: PersonQuery["person"]): Record<string, number> {
  const producerCount: Record<string, number> = {};

  if (!person || !person.filmConnection || !person.filmConnection.films) {
    return producerCount;
  }
  const films = person.filmConnection.films;

  films.forEach((film) => {
    if (film && film.producers) {
      film.producers.forEach((producer) => {
        if (producer) {
          if (producerCount[producer]) {
            producerCount[producer]++;
          } else {
            producerCount[producer] = 1;
          }
        }
      });
    }
  });

  return producerCount;
}

/**
 * `getFormattedFilms` is a function that formats the films of a person.
 *
 * @param person The person whose films are being formatted.
 * @returns An array of formatted films.
 */
function getFormattedFilms(person: PersonQuery["person"]): Array<{
  title: string;
  releaseDate: string;
  planetsWithWater: number | string;
}> {
  if (!person || !person.filmConnection || !person.filmConnection.films) {
    return [];
  }
  const films = person.filmConnection.films;
  const result: ReturnType<typeof getFormattedFilms> = [];
  for (const film of films) {
    if (!film) continue;
    const planetsWithWater = film.planetConnection?.planets?.filter(
      (planet) => planet && planet.surfaceWater && planet.surfaceWater > 0
    ).length;
    result.push({
      title: film.title ?? "unknown",
      releaseDate: film.releaseDate ?? "unknown",
      planetsWithWater: planetsWithWater ?? "unknown",
    });
  }
  return result;
}

export default PersonPage;

import { useState } from "react";
import Card from "../components/shared/card";
import { useQuery } from "@tanstack/react-query";
import { getAllPlanets } from "../services/planetService";
import Default from "../layouts/default";

export default function Planets() {
  const [currentPage, setCurrentPage] = useState<string | undefined>();

  const { data, isFetching, isInitialLoading, isError, error } = useQuery({
    queryKey: ["planets", currentPage],
    queryFn: () => getAllPlanets(currentPage),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const prevPageHandler = () => {
    setCurrentPage(data?.previous ?? undefined);
  };

  const nextPageHandler = () => [setCurrentPage(data?.next ?? undefined)];

  if (!data && isInitialLoading) {
    return <div>Loading planets...</div>;
  }

  if (isError) {
    return <div>{`Error on loading planets: ${error}`}</div>;
  }

  return (
    <Default
      page="Planets"
      placeholder="planet"
      prevPageHandler={prevPageHandler}
      nextPageHandler={nextPageHandler}
    >
      {data?.results.map((e) => (
        <Card name={e.name} url={e.url} cardClass={isFetching ? 'loading' : ''} page="planets"/>
      ))}
    </Default>
  );
}

import { useState } from "react";
import Card from "../components/shared/card";
import { useQuery } from "@tanstack/react-query";
import { getAllStarships } from '../services/starshipsService';
import Default from "../layouts/default";

export default function Starships() {
  const [currentPage, setCurrentPage] = useState<string | undefined>();

  const { data, isFetching, isInitialLoading, isError, error } = useQuery({
      queryKey: ['starships', currentPage],
      queryFn: () => getAllStarships(currentPage),
      keepPreviousData: true,
      refetchOnWindowFocus: false,
  });

  const prevPageHandler = () => {
    setCurrentPage(data?.previous ?? undefined)
  }

  const nextPageHandler = () => [
    setCurrentPage(data?.next ?? undefined)
  ]

  if (!data && isInitialLoading) {
      return <div>Loading starships...</div>;
  }

  if (isError) {
      return <div>{`Error on loading starships: ${error}`}</div>;
  }

  return (
    <Default page="Starships" placeholder="starship" prevPageHandler={prevPageHandler} nextPageHandler={nextPageHandler}>
      {data?.results.map(e =>(
        <Card name={e.name} url={e.url} cardClass={isFetching ? 'loading' : ''} page="starships"/>
      ))}
    </Default>
  );
}

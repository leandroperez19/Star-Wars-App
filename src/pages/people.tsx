import { useState } from "react";
import Card from "../components/shared/card";
import { useQuery } from "@tanstack/react-query";
import { getAllPeople } from "../services/peopleService";
import Default from "../layouts/default";

export default function People() {
  const [currentPage, setCurrentPage] = useState<string | undefined>();

  const { data, isFetching, isInitialLoading, isError, error } = useQuery({
    queryKey: ["people", currentPage],
    queryFn: () => getAllPeople(currentPage),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const prevPageHandler = () => {
    setCurrentPage(data?.previous ?? undefined);
  };

  const nextPageHandler = () => [setCurrentPage(data?.next ?? undefined)];

  if (!data && isInitialLoading) {
    return <div>Loading people...</div>;
  }

  if (isError) {
    return <div>{`Error on loading people: ${error}`}</div>;
  }
  return (
    <Default
      page="People"
      placeholder="person"
      prevPageHandler={prevPageHandler}
      nextPageHandler={nextPageHandler}
    >
      {data?.results.map((e) => (
        <Card name={e.name} cardClass={isFetching ? 'loading' : ''}/>
      ))}
    </Default>
  );
}

import { useState } from "react";
import Card from "../components/shared/card";
import { useQuery } from "@tanstack/react-query";
import { getAllPlanets } from "../services/planetService";
import Default from "../layouts/default";
import Pagination from "../components/shared/pagination";
import styled from "styled-components";
import Loader from "../components/shared/loader";

export default function Planets() {
  const [currentPage, setCurrentPage] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const [inputValue, setInputValue] = useState<string | undefined>();

  const { data, isFetching, isInitialLoading, isError, error } = useQuery({
    queryKey: ["planets", currentPage, search],
    queryFn: () =>
      getAllPlanets(search ? `/planets/?search=${search}` : currentPage),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const prevPageHandler = () => {
    setCurrentPage(data?.previous ?? undefined);
  };

  const nextPageHandler = () => [setCurrentPage(data?.next ?? undefined)];

  if (!data && isInitialLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{`Error on loading planets: ${error}`}</div>;
  }

  return (
    <Default
      page="Planets"
      prevPageHandler={prevPageHandler}
      nextPageHandler={nextPageHandler}
    >
      <div className="search-bar">
        <input
          type="text"
          name="search"
          id="search"
          placeholder={`Search for a planet`}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="material-symbols-outlined"
          onClick={() => setSearch(inputValue)}
        >
          search
        </button>
      </div>
      <CardsContainer>
        {data?.results.map((e: any) => (
          <Card
            name={e.name}
            url={e.url}
            cardClass={isFetching ? "loading" : ""}
            page="planets"
          />
        ))}
      </CardsContainer>
      {data && data.results.length > 9 ? (
        <Pagination
          nextPageHandler={nextPageHandler}
          prevPageHandler={prevPageHandler}
        />
      ) : (
        ""
      )}
    </Default>
  );
}

const CardsContainer = styled.div`
  margin-top: 20px;
  display: grid;
  gap: 20px;
  color: ${({ theme }) => theme.font};
  background-color: ${({ theme }) => theme.bg};

  @media (768px <= width) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

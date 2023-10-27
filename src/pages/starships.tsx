import { useState } from "react";
import Card from "../components/shared/card";
import { useQuery } from "@tanstack/react-query";
import { getAllStarships } from "../services/starshipsService";
import Default from "../layouts/default";
import styled from "styled-components";
import Pagination from "../components/shared/pagination";
import Loader from "../components/shared/loader";

export default function Starships() {
  const [currentPage, setCurrentPage] = useState<string | undefined>();
  const [search, setSearch] = useState<string | undefined>();
  const [inputValue, setInputValue] = useState<string | undefined>();

  const { data, isFetching, isInitialLoading, isError, error } = useQuery({
    queryKey: ["starships", currentPage, search],
    queryFn: () =>
      getAllStarships(search ? `/starships/?search=${search}` : currentPage),
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
    return <div>{`Error on loading starships: ${error}`}</div>;
  }

  return (
    <Default
      page="Starships"
      prevPageHandler={prevPageHandler}
      nextPageHandler={nextPageHandler}
    >
      <div className="search-bar">
        <input
          type="text"
          name="search"
          id="search"
          placeholder={`Search for a starship`}
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
            page="starships"
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

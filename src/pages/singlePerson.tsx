import { useQuery } from "@tanstack/react-query";
import { getPeopleById } from "../services/peopleService";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import SingleItem from "../layouts/singleItem";
import { useTheme } from "../context/themeContext";
import Loader from "../components/shared/loader";

export default function SinglePerson() {
  const { id } = useParams();
  const { data, isInitialLoading, isError, error } = useQuery({
    queryKey: ["people", "details", id],
    queryFn: () => getPeopleById(id ? id : ""),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { theme } = useTheme();

  if (!data && isInitialLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div>{`Error on loading person: ${error}`}</div>;
  }

  const homewordRoute = data?.homeworld.match(/\/(\d+)\/$/);

  return (
    <SingleItem name={data?.name ? data.name : ""}>
      <Info theme={theme}>
        <div className="data-container">
          <div className="data-row">
            <div className="data-label">Name:</div>
            <div className="data-value">{data?.name}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Height:</div>
            <div className="data-value">{data?.height}cm</div>
          </div>
          <div className="data-row">
            <div className="data-label">Mass:</div>
            <div className="data-value">{data?.mass}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Hair Color:</div>
            <div className="data-value">{data?.hair_color}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Skin Color:</div>
            <div className="data-value">{data?.skin_color}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Eye Color:</div>
            <div className="data-value">{data?.eye_color}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Birth Year:</div>
            <div className="data-value">{data?.birth_year}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Gender:</div>
            <div className="data-value">{data?.gender}</div>
          </div>
          <div className="homeword">
            <div className="data-value">
              <Link to={`/planets/${homewordRoute ? homewordRoute[1] : ""}`}>
                Go to homeword
              </Link>
            </div>
          </div>
        </div>
      </Info>
    </SingleItem>
  );
}

const Info = styled.div`
  margin: 0 auto;
  width: fit-content;

  .data-container {
    margin-top: 20px;
  }

  .data-row {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    border: 1px solid ${({ theme }) => theme.font};
    height: 50px;
  }

  .data-label,
  .data-value {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    color: ${({ theme }) => theme.font};
  }

  .data-label {
    border-right: 1px solid ${({ theme }) => theme.font};
  }
  .homeword {
    border: 1px solid ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.darkBg};
    transition: background-color .3s cubic-bezier(0.165, 0.84, 0.44, 1);

    &:hover {
      background-color: ${({ theme }) => theme.bg};
    }

    .data-value a {
      height: 100%;
      width: 100%;
      padding: 15px;
      text-align: center;
      color: ${({ theme }) => theme.font};
    }
  }
`;

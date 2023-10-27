import { useQuery } from "@tanstack/react-query";
import { getPlanetById } from "../services/planetService";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SingleItem from "../layouts/singleItem";
import { useTheme } from "../context/themeContext";

export default function SinglePlanet() {
  const { id } = useParams();
  const { data, isInitialLoading, isError, error } = useQuery({
    queryKey: ["planet", "details", id],
    queryFn: () => getPlanetById(id ? id : ""),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

  const { theme } = useTheme();

  if (!data && isInitialLoading) {
    return <div>Loading starship...</div>;
  }

  if (isError) {
    return <div>{`Error on loading starship: ${error}`}</div>;
  }

  return (
    <SingleItem name={data?.name ? data.name : ""}>
      <Info theme={theme}>
        <div className="data-container">
          <div className="data-row">
            <div className="data-label">Name:</div>
            <div className="data-value">{data?.name}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Rotation Period:</div>
            <div className="data-value">{data?.rotation_period}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Orbital Period:</div>
            <div className="data-value">{data?.orbital_period}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Diameter:</div>
            <div className="data-value">{data?.diameter}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Climate:</div>
            <div className="data-value">{data?.climate}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Gravity:</div>
            <div className="data-value">{data?.gravity}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Terrain:</div>
            <div className="data-value">{data?.terrain}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Surface water:</div>
            <div className="data-value">{data?.surface_water}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Population:</div>
            <div className="data-value">{data?.population}</div>
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
    min-width: 250px;
    color: ${({ theme }) => theme.font};
  }

  .data-label {
    border-right: 1px solid ${({ theme }) => theme.font};
  }
`;

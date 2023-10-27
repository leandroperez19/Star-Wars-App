import { useQuery } from "@tanstack/react-query";
import { getStarshipById } from "../services/starshipsService";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import SingleItem from "../layouts/singleItem";
import { useTheme } from "../context/themeContext";

export default function SingleStarship() {
  const { id } = useParams();
  const { data, isInitialLoading, isError, error } = useQuery({
    queryKey: ["starship", "details", id],
    queryFn: () => getStarshipById(id ? id : ""),
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
            <div className="data-label">Model:</div>
            <div className="data-value">{data?.model}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Manufacturer:</div>
            <div className="data-value">{data?.manufacturer}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Cost in credits:</div>
            <div className="data-value">{data?.cost_in_credits}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Length:</div>
            <div className="data-value">{data?.length}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Max Atmosphering speed:</div>
            <div className="data-value">{data?.max_atmosphering_speed}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Crew:</div>
            <div className="data-value">{data?.crew}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Passengers:</div>
            <div className="data-value">{data?.passengers}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Cargo Capacity:</div>
            <div className="data-value">{data?.cargo_capacity}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Consumables:</div>
            <div className="data-value">{data?.consumables}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Hyperdrive rating:</div>
            <div className="data-value">{data?.hyperdrive_rating}</div>
          </div>
          <div className="data-row">
            <div className="data-label">MGLT:</div>
            <div className="data-value">{data?.MGLT}</div>
          </div>
          <div className="data-row">
            <div className="data-label">Starship Class:</div>
            <div className="data-value">{data?.starship_class}</div>
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

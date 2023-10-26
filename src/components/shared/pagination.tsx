import styled from "styled-components";
import { useTheme } from "../../context/themeContext";

export default function Pagination() {
  const { theme } = useTheme();

  return (
    <PaginationComponent theme={theme}>
      <div className="page">
        <span className="material-symbols-outlined">navigate_before</span>
      </div>
      <div className="page">
        <span className="material-symbols-outlined">navigate_next</span>
      </div>
    </PaginationComponent>
  );
}

const PaginationComponent = styled.div`
  margin: 40px auto;
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;

  .page {
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
    text-align: center;
    border: none;
    outline: 1px solid ${({ theme }) => theme.font};
    color: ${({ theme }) => theme.font};
    background-color: ${({ theme }) => theme.darkBg};
    cursor: pointer;

    &:hover {
      background-color: ${({ theme }) => theme.bg};
    }
  }
`;

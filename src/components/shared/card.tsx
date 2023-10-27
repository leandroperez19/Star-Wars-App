import styled from "styled-components";
import { useTheme } from "../../context/themeContext";
import { useNavigate } from "react-router-dom";

export default function Card({
  name,
  cardClass,
  url,
  page
}: {
  name: string;
  cardClass: string | undefined;
  url: string;
  page: string;
}) {
  const { theme } = useTheme();
  const route: string[] = url ? url.match(/\/(\d+)\/$/) ?? [''] : [''];
  const navigate = useNavigate();

  const navigateToRoute = () => {
    navigate(`/${page}/${route[1]}`);
  }

  return (
    <CardWrapper theme={theme} className={cardClass} onClick={navigateToRoute}>
      {name}
    </CardWrapper>
  );
}

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: ${({ theme }) => theme.darkBg};
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.19, 1, 0.22, 1);
  color: ${({ theme }) => theme.font};

  &.loading {
    opacity: 0.9;
    pointer-events: none;
    animation: fadeInOut 1s infinite;
    @keyframes fadeInOut {
      0% {
        filter: brightness(1);
      }
      50% {
        filter: brightness(.7);
      }
      100% {
        filter: brightness(1);
      }
    }
  }

  &:hover {
    background-color: ${({ theme }) => theme.bg};
    outline: 1px solid ${({ theme }) => theme.font};
  }
`;

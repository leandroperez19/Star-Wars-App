import styled from "styled-components";
import { useTheme } from "../context/themeContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { theme } = useTheme();
  const navigate = useNavigate();

  const navigateToRoute = (route: string) => {
    navigate(route);
  };

  return (
    <HomePage theme={theme}>
      <img src="https://pngimg.com/d/star_wars_logo_PNG34.png" alt="logo" className="logo"/>
      <h1>Where would you like to go?</h1>
      <div className="options">
        <div
          className="people option-card"
          onClick={() => navigateToRoute("/people")}
        >
          <img
            src="https://cdn.icon-icons.com/icons2/318/PNG/512/Darth-Vader-icon_34501.png"
            alt="darth-vader"
          />
          <h2>People</h2>
        </div>
        <div
          className="planets option-card"
          onClick={() => navigateToRoute("/planets")}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Ice_planet.png/640px-Ice_planet.png"
            alt="planet"
          />
          <h2>Planets</h2>
        </div>
        <div
          className="starships option-card"
          onClick={() => navigateToRoute("/starships")}
        >
          <img
            src="https://freepngimg.com/thumb/star_wars/5-2-star-wars-ship-vector-png.png"
            alt="starship"
          />
          <h2>Starships</h2>
        </div>
      </div>
    </HomePage>
  );
}

const HomePage = styled.div`
  min-height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  color: ${({ theme }) => theme.font};

  img.logo {
    height: 12em;
  }

  h1 {
    margin-bottom: 20px;
    text-align: center;
  }

  .options {
    display: grid;
    gap: 20px;

    @media (768px <= width) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (1024px <= width) {
      grid-template-columns: repeat(3, 1fr);
    }

    .option-card {
      text-align: center;
      padding: 40px;
      border-radius: 8px;
      background-color: ${({ theme }) => theme.darkBg};
      cursor: pointer;

      &:hover {
        img {
          transform: scale(1.1);
        }
      }

      img {
        width: 120px;
        height: 120px;
        transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);

        @media (1024px <= width) {
          width: 180px;
          height: 180px;
        }
      }

      h2 {
        margin-top: 20px;
        color: ${({ theme }) => theme.font};
      }
    }
  }
`;

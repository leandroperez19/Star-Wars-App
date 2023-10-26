import Navbar from "../components/navbar";
import Pagination from "../components/shared/pagination";
import { useTheme } from "../context/themeContext";
import Link from "../types/links";
import styled from "styled-components";

export default function Default({
  children,
  page,
  placeholder,
  prevPageHandler,
  nextPageHandler
}: {
  children: any;
  page: string;
  placeholder: string,
  prevPageHandler: any,
  nextPageHandler: any
}) {
  const links: Link[] = [
    { name: "People", route: "/people" },
    { name: "Planets", route: "/planets" },
    { name: "Starships", route: "/starships" },
  ];

  const { theme } = useTheme();

  return (
    <DefaultLayout theme={theme}>
      <Navbar links={links} />
      <div className="content">
        <input
          type="text"
          name="search"
          id="search"
          placeholder={`Search for a ${placeholder}`}
        />
        <h1>{page}</h1>
        <div className="cards-container">{children}</div>
        <Pagination nextPageHandler={nextPageHandler} prevPageHandler={prevPageHandler} />
      </div>
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div`
  background-color: ${({theme})=>theme.bg};
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  .content {
    margin: 0 auto;
    padding: 8em 20px 4em;
    max-width: 1400px;;
    

    @media (768px <= width) {
      padding: 8em 40px 4em;
    }

    #search {
      width: 100%;
      font-size: 14px;
      background-color: ${({theme})=>theme.darkBg};
      border: none;
      outline: none;
      border-radius: 4px;
      padding: 20px 10px;
      max-width: 600px;
      transition: all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

      &::placeholder {
        color: ${({theme})=>theme.font};
        opacity: .7;
      }

      &:focus {
        background-color: ${({theme})=>theme.bg};
        outline: 1px solid ${({theme})=>theme.font};
      }
    }

    h1 {
      margin-top: 20px;
      font-size: 28px;
      color: ${({theme})=>theme.font};
    }

    .cards-container {
      margin-top: 20px;
      display: grid;
      gap: 20px;
      color: ${({theme})=>theme.font};
      background-color: ${({theme})=>theme.bg};

      @media (768px <= width) {
        grid-template-columns: repeat(2, 1fr);
      }
    }
  }
`;

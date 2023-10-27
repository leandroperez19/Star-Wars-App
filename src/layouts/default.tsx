import Navbar from "../components/navbar";
import { useTheme } from "../context/themeContext";
import Link from "../types/links";
import styled from "styled-components";

export default function Default({
  children,
  page,
  prevPageHandler,
  nextPageHandler,
}: {
  children: any;
  page: string;
  prevPageHandler: any;
  nextPageHandler: any;
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
        <h1>{page}</h1>
        {children}
      </div>
    </DefaultLayout>
  );
}

const DefaultLayout = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  .content {
    margin: 0 auto;
    padding: 8em 20px 4em;
    max-width: 1400px;
    width: 80%;

    @media (768px <= width) {
      padding: 8em 40px 4em;
    }

    .search-bar {
      display: flex;
      align-items: center;
      max-width: 600px;
      width: 100%;
      position: relative;
      height: fit-content;
      margin-top: 20px;

      #search {
        flex-basis: 80%;
        font-size: 14px;
        background-color: ${({ theme }) => theme.darkBg};
        border: none;
        outline: none;
        border-radius: 4px 0 0 4px;
        padding: 20px 10px;
        transition: background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);
        outline: 1px solid ${({ theme }) => theme.font};
        color: ${({ theme }) => theme.font};

        &::placeholder {
          color: ${({ theme }) => theme.font};
          opacity: 0.7;
        }

        &:focus {
          background-color: ${({ theme }) => theme.bg};
        }
      }

      button {
        height: 56.8px;
        outline: none;
        border: none;
        padding: 0 10px;
        color: ${({ theme }) => theme.font};
        background-color: ${({ theme }) => theme.bg};
        outline: 1px solid ${({ theme }) => theme.font};
        border-radius: 0 4px 4px 0;
        cursor: pointer;
        transition: background-color 0.3s cubic-bezier(0.215, 0.61, 0.355, 1);

        &:hover {
          background-color: ${({ theme }) => theme.darkBg};
        }
      }
    }

    h1 {
      margin-top: 20px;
      font-size: 28px;
      color: ${({ theme }) => theme.font};
    }
  }
`;

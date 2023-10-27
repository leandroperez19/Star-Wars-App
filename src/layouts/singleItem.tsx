import styled from "styled-components";
import Navbar from "../components/navbar";
import Link from "../types/links";
import { useTheme } from "../context/themeContext";

export default function SingleItem({
  children,
  name,
}: {
  children: any;
  name: string;
}) {
  const links: Link[] = [
    { name: "People", route: "/people" },
    { name: "Planets", route: "/planets" },
    { name: "Starships", route: "/starships" },
  ];
  const { theme } = useTheme();

  return (
    <Wrapper theme={theme}>
      <Navbar links={links} />
      <h1>{name}</h1>
      <div className="content">{children}</div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100vw;
  min-height: 100vh;
  height: fit-content;
  
  h1 {
    padding-top: 4em;
    text-align: center;
    color: ${({theme})=>theme.font};
  }
  .content {
    margin: 0 auto;
    max-width: 1400px;
  }
`;

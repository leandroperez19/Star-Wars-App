import styled from "styled-components";
import { useTheme } from "../../context/themeContext";

export default function Card({ name }: { name: string }) {
  const { theme } = useTheme();

  return <CardWrapper theme={theme}>{name}</CardWrapper>;
}

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 20px;
  background-color: ${({theme})=>theme.darkBg};
  border-radius: 4px;
  cursor: pointer;
  transition: all .3s cubic-bezier(0.19, 1, 0.22, 1);
  color: ${({theme})=>theme.font};

  &:hover {
    background-color: ${({theme})=>theme.bg};
    outline: 1px solid ${({theme})=>theme.font};
  }
`;

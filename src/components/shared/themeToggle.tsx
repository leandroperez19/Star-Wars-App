import { BsFillSunFill, BsFillMoonFill } from "react-icons/bs";
import styled from "styled-components";
import { useTheme } from "../../context/themeContext";

export default function ThemeToggle() {
  const { theme, themeHandler, choose } = useTheme();

  return (
    <Toggle theme={theme}>
      <BsFillSunFill className={choose && 'selected'}/>
      <div className={`toggle ${choose ? 'light' : 'dark'}`} onClick={themeHandler}>
        <div className="thumb"></div>
      </div>
      <BsFillMoonFill className={!choose ? 'selected' : ''}/>
    </Toggle>
  );
}

const Toggle = styled.div`
  display: flex;
  align-items: center;

  svg {
    padding: 5px;
    border-radius: 50%;
    height: 22px;
    width: 22px;
    fill: ${({theme})=> theme.font};

    &.selected {
      box-shadow: 0px 0px 10px #f2f230fe;
      fill: #f2f230fe;
    }
  }

  .toggle {
    height: 20px;
    width: 40px;
    background-color: #444;
    padding: 2px 4px;
    border-radius: 20px;
    margin: 0 10px;
    display: flex;
    align-items: center;
    cursor: pointer;

    &.dark {
      justify-content: end;
    }

    &.light {
      justify-content: start;
    }

    .thumb {
      width: 50%;
      height: 100%;
      background-color: #fff;
      border-radius: 50%;
    }
  }
`;

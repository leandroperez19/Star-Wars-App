import { createContext, useContext, useEffect, useState } from "react";

export const themeContext = createContext<any>(true);
export const useTheme = () => {
  const context = useContext(themeContext);
  return context;
};

export default function ThemeProvider({ children }: any) {
  const [theme, setTheme] = useState<any>();
  const [choose, setChoose] = useState<boolean>(false);
  const darkTheme = {
    bg: "#2B2C37",
    darkBg: "#20212C",
    font: "#fff",
    font2: "#000",
  };
  const lightTheme = {
    bg: "#e3f1f8",
    darkBg: "#c1c7d3",
    font: "#000",
    font2: "#fff",
  };
  const themeHandler = () => {
    if (!choose) {
      setTheme(lightTheme);
      localStorage.setItem("theme", "light");
      setChoose(true);
    } else {
      setTheme(darkTheme);
      localStorage.setItem("theme", "dark");
      setChoose(false);
    }
  };

  const initializeTheme = () => {
    if (localStorage.getItem("theme")) {
      if (localStorage.getItem("theme") === "dark") {
        setTheme(darkTheme);
        setChoose(false);
      } else {
        setTheme(lightTheme);
        setChoose(true);
      }
    } else {
      const pcTheme = window.matchMedia("(prefers-color-scheme: dark)");
      if (pcTheme.matches) {
        setTheme(darkTheme);
        setChoose(false);
      } else {
        setTheme(lightTheme);
        setChoose(true);
      }
    }
  };

  useEffect(() => {
    initializeTheme();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <themeContext.Provider
      value={{
        theme,
        themeHandler,
        choose,
      }}
    >
      {children}
    </themeContext.Provider>
  );
}

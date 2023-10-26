import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { GlobalStyles } from "./styles/globalStyles";
import ThemeProvider from "./context/themeContext";
import People from "./pages/people";
import Planets from "./pages/planets";
import Starships from "./pages/starships";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <GlobalStyles/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />}/>
          <Route path="/people/page/:page" element={<People />}/>
          <Route path="/planets" element={<Planets />}/>
          <Route path="/planets/page/:page" element={<Planets />}/>
          <Route path="/starships" element={<Starships />}/>
          <Route path="/starships/page/:page" element={<Starships />}/>
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

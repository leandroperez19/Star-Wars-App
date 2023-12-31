import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import { GlobalStyles } from "./styles/globalStyles";
import ThemeProvider from "./context/themeContext";
import People from "./pages/people";
import Planets from "./pages/planets";
import Starships from "./pages/starships";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SinglePerson from "./pages/singlePerson";
import SingleStarship from "./pages/singleStarship";
import SinglePlanet from "./pages/singlePlanet";

const queryClient = new QueryClient();

function App() {
  return (
    <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <GlobalStyles/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/people" element={<People />}/>
          <Route path="/planets" element={<Planets />}/>
          <Route path="/starships" element={<Starships />}/>
          <Route path="/starships/:id" element={<SingleStarship />}/>
          <Route path="/people/:id" element={<SinglePerson />}/>
          <Route path="/planets/:id" element={<SinglePlanet />}/>
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;

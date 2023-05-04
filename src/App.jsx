import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Pokedex from "./pages/Pokedex";
import ProtectedAuth from "./components/auth/ProtectedAuth";
import PokemonId from "./pages/PokemonId";
import Move from "./pages/Move";


function App() {
  return (
    <section className="overflow-hidden font-Roboto">
      <Routes>

        <Route path="/" element={<Home />} />
        <Route element={<ProtectedAuth />}>
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/pokedex/:id" element={<PokemonId />} />
          <Route path="/pokedex/:id/:name" element={<Move />} />
        </Route>
      </Routes>
    </section>
  );
}

export default App;

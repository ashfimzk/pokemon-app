import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "./component/navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Detail from "./pages/pokemonDetail";

function App() {
  const [data, setData] = useState([]);

  let getData = async () => {
    try {
      let result = await axios.get("https://pokeapi.co/api/v2/pokemon/");
      setData(result.data.results);
      getPokemonTypes(result.data.results);
    } catch (error) {
      // console.error(error);
    }
  };

  const getPokemonImage = async (url) => {
    try {
      let response = await axios.get(url);
      // console.log(response.data);
      return response.data.sprites.other.dream_world.front_default;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const getPokemonTypes = async (pokemonData) => {
    try {
      const updatedData = await Promise.all(
        pokemonData.map(async (pokemon) => {
          const response = await axios.get(pokemon.url);
          const types = response.data.types;
          const imageUrl = await getPokemonImage(pokemon.url);
          const speciesData = await axios.get(response.data.species.url);
          const color = speciesData.data.color.name;
          return { ...pokemon, imageUrl, types, color };
        })
      );
      setData(updatedData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home state={{data}}/>}/>
        <Route path="/:name" element={<Detail/>}/>

      </Routes>
   
    </div>
  );
}

export default App;

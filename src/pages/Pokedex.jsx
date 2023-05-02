import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";

const Pokedex = () => {
  const nameTrainer = useSelector((store) => store.nametrainer);

  const [pokemons, setPokemons] = useState([]);
  const [pokemonName, setPokemonName] = useState();
  const [types, setTypes] = useState([]);
  const [currentType, setCurrentType] = useState();
  const [currentPage, setCurrentPage] = useState(1)

  const paginationLogic = () => {
    //cantidad de pokemons x pagina//
    const POKEMONS_X_PAGE = 12
    const sliceStar = (currentPage-1) * POKEMONS_X_PAGE
    const sliceEnd = sliceStar + POKEMONS_X_PAGE

    const pokemonsInPage = pokemons.slice(sliceStar,sliceEnd)
    //necesitamos saber cual es la ultima pagina//
    const lastPage = Math.ceil(pokemons.length/POKEMONS_X_PAGE)
    //incluir || en caso el valor sea 0 para asigarle 1//

    //bloqueactual//
    const PAGES_X_BLOCK = 5
    const actualBlock = Math.ceil(currentPage/PAGES_X_BLOCK)
    //paginas que se mostratan en el bloque actual//
    const pagesInBlock = []
    const minPage = (actualBlock-1) *PAGES_X_BLOCK +1
    const maxPage = actualBlock * PAGES_X_BLOCK

    for (let i = minPage; i <= maxPage; i++) {
      if ( i<= lastPage) {
        pagesInBlock.push(i)
      }
    }
    return {pokemonsInPage,lastPage, pagesInBlock}
  }

  const {pokemonsInPage,lastPage, pagesInBlock} = paginationLogic()

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase());
    e.target.pokemonName.value =""
    //posiblemente crear useeffect de pokemonnamepara setear currentpage//
  };

  useEffect(() => {
    const pokemonByName = pokemons.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(pokemonName)
    );
    setPokemons(pokemonByName);
  }, [pokemonName]);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=1281";
    axios
      .get(url)
      .then((res) => {
        setPokemons(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/type";
    axios
      .get(url)
      .then((res) => {
        const newTypes = res.data.results.map((type) => type.name);
        setTypes(newTypes);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (currentType) {
      const url = `https://pokeapi.co/api/v2/type/${currentType}/`;
      axios
        .get(url)
        .then((res) => {
          const pokemonByType = res.data.pokemon.map(
            (pokemon) => pokemon.pokemon
          );
          setPokemons(pokemonByType);
        })
        .catch((err) => console.log(err));
    }
  }, [currentType]);

  useEffect(() => {
    setCurrentPage(1)
  }, [pokemonName,currentType])
  

  return (
    <section className="min-h-screen">
      <Header />
      <section className="w-full max-w-[1024px] mx-auto p-3 flex flex-col gap-5">
        <h3 className="text-3xl">
            <span className="text-red-600">Welcome {nameTrainer}, </span> here
            you can find your pokemon
        </h3>
        <section>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-5 justify-center">
            <div className="grid grid-cols-[1fr,_auto] flex-grow">
              <input
                id="pokemonName"
                type="text"
                placeholder="search your pokemon"
                className="shadow-md shadow-gray-500/20 px-3"
              />
              <button className="h-[60px] w-[150px] bg-red-600">search</button>
            </div>
            <select
              onChange={(e) => setCurrentType(e.target.value)}
              className="w-[100%] sm:w-[40%] h-[60px] shadow-md shadow-gray-500/20"
            >
              {types?.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))}
            </select>
          </form>
        </section>

        {/* paginacion */}
        <div>
          <ul className="flex gap-5 justify-center">

            {
              pagesInBlock.map( (numberPage) => 
              <li key={numberPage} onClick={()=> setCurrentPage(numberPage)} className={`cursor-pointer ${numberPage == currentPage && "bg-red-500"}`}>
                {numberPage}
              </li> )
            }

          </ul>
        </div>


        <section className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] content-center items-center justify-center justify-items-center gap-5">
          {pokemonsInPage?.map((pokemon) => (
            <PokemonCard pokemonurl={pokemon.url} key={pokemon.url} />
          ))}
        </section>
      </section>
    </section>
  );
};

export default Pokedex;

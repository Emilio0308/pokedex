import React, { useEffect, useState } from "react";
import Header from "../components/pokedex/Header";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import PokemonCard from "../components/pokedex/PokemonCard";
import { setNameTrainer } from "../store/slices/nametrainer.slice";

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

    const pokemonsInPage = pokemons.length >= 1 ? pokemons.slice(sliceStar,sliceEnd) : null
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

  const handleChangePage = (e) => {
    const newPage = currentPage + eval(e.target.value)
    if (newPage > 0 && newPage <= lastPage) {
      setCurrentPage(newPage)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setPokemonName(e.target.pokemonName.value.toLowerCase());
    e.target.pokemonName.value =""
  };

  const dispatch = useDispatch()
  const handleLogOut = () => {
    dispatch(setNameTrainer(""))
  }

  // useEffect(() => {
  //   console.log("modifica pokemons")
  //   const pokemonByName = pokemons.filter((pokemon) =>
  //     pokemon.name.toLowerCase().includes(pokemonName)
  //   );
  //   setPokemons(pokemonByName);
  // }, [pokemonName]);

  // efecto para buscar por nombre dentro de todos los pokemons//
  useEffect(() => {
    if (pokemonName) {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=1281";
      axios
        .get(url)
        .then((res) => {
          const pokemonByName = res.data.results.filter((pokemon) =>
          pokemon.name.toLowerCase().includes(pokemonName)
          );
          setPokemons(pokemonByName);
        })
        .catch((err) => console.log(err));
    }
  }, [pokemonName]);

  //efecto para obtener todos los pokemons//
  useEffect(() => {
    const url = "https://pokeapi.co/api/v2/pokemon?limit=1281";
    axios
      .get(url)
      .then((res) => {
        setPokemons(res.data.results);
      })
      .catch((err) => console.log(err));
  }, []);

  // efecto para obtener los types de los pokemons//
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

  // efecto para obtener filtrar por types entre todos los pokemons//
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
        <div className="flex justify-between gap-2">
          <h3 className="text-3xl">
              <span className="text-red-600 capitalize">Welcome {nameTrainer}, </span> here
              you can find your pokemon
          </h3>
          <i className='bx bx-log-out-circle text-3xl cursor-pointer' onClick={handleLogOut}></i>
        </div>
        
        <section>
          <form onSubmit={handleSubmit} className="flex flex-wrap gap-5 justify-center">
            <div className="flex flex-wrap gap-2 flex-grow">
              <input
                id="pokemonName"
                type="text"
                placeholder="search your pokemon"
                className="shadow-md shadow-gray-500/20 px-3 h-[60px] flex-grow"
              />
              <button className="h-[60px] w-[150px] bg-red-600">search</button>
            </div>
            <select
              onChange={(e) => setCurrentType(e.target.value)}
              className="w-[100%] sm:w-[40%] h-[60px] shadow-md shadow-gray-500/20"
            >
              {
              types?.map((type) => (
                <option value={type} key={type}>
                  {type}
                </option>
              ))
              }
            </select>
          </form>
        </section>

        {/* paginacion */}
        <div>
          <ul className="flex gap-2 justify-center">
            <button onClick={ () => setCurrentPage(1)}>{"<<"}</button>
            <button onClick={handleChangePage} value={-1}>{"<"}</button>
            {
              pagesInBlock.map( (numberPage) => 
              <div key={numberPage} onClick={()=> setCurrentPage(numberPage)} 
              className={`cursor-pointer ${numberPage == currentPage? "bg-red-500 ": "bg-gray-400"} w-[24px] h-[24px]  p-1  flex justify-center items-center rounded-md hover:bg-red-400`}>
                {numberPage}
              </div> )
            }
            <button onClick={handleChangePage} value={1}>{">"}</button>
            <button onClick={() => setCurrentPage(lastPage)}>{">>"}</button>
          </ul>
        </div>


        <section className="grid grid-cols-[repeat(auto-fill,_minmax(250px,_1fr))] content-center items-center justify-center justify-items-center gap-5">
          {
          pokemonsInPage ?  pokemonsInPage?.map((pokemon) => (
            <PokemonCard pokemonurl={pokemon.url} key={pokemon.url} /> 
            ))
            :<div className="w-full col-span-3 p-3 font-semibold text-center">
              <span>We can´t find your pokemon</span>
              <img  src="/imagenes/pikachudetective.jpg" alt="" />
            </div>
          }
        </section>
      </section>
    </section>
  );
};

export default Pokedex;

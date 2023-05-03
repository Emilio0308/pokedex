import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/pokedex/Header";

const Move = () => {
  const { name } = useParams();
  const [move, setMove] = useState();

  useEffect(() => {
    const url = `https://pokeapi.co/api/v2/move/${name}/`;
    axios
      .get(url)
      .then((res) => setMove(res.data))
      .catch((err) => console.log(err));
  }, []);

  const description = move?.flavor_text_entries.find( (text) => text.language.name == "en")

  return (
    <section className="w-full bg-[url(/imagenes/movefondo.jpeg)] bg-fixed bg-cover bg-center bg-no-repeat">
        <Header/>
      <section className="w-full max-w-[750px] p-3 m-auto">
        <div className="flex flex-col gap-4 justify-center items-center m-auto sm:grid sm:grid-cols-2 sm:grid-rows-3">
          <h3 className="sm:col-span-2 w-full capitalize text-center text-4xl bg-stone-600/80 p-2 text-gray-100 shadow-md shadow-stone-700 font-semibold">
            {name} <span> #{move?.id}</span>
          </h3>
          <div className="grid grid-rows-2 grid-cols-2 w-full text-center gap-3">
            <span className="rounded-md font-medium bg-red-600 h-[40px]">Accuracy: </span>{" "}
            <span className="rounded-md bg-gray-300 h-[40px]">
              {move?.accuracy}%
            </span>
            <span className="rounded-md font-medium bg-red-600 h-[40px]">Power: </span>{" "}
            <span className="rounded-md bg-gray-300 h-[40px]">
              {move?.power}
            </span>
          </div>
          <div className="grid grid-rows-2 w-full text-center grid-cols-2 gap-3">
            <span className="rounded-md font-medium bg-red-600 h-[40px]">Category: </span>{" "}
            <span className="rounded-md bg-gray-300 h-[40px]">
              {move?.meta.category.name}
            </span>
            <span className="rounded-md font-medium bg-red-600 h-[40px]">Type: </span>{" "}
            <span className="rounded-md bg-gray-300 h-[40px]">
              {move?.type.name}
            </span>
          </div>
          <div className="grid grid-rows-2 w-full text-center grid-cols-2 gap-3">
            <span className="rounded-md font-medium bg-red-600 h-[40px]">Priority: </span>{" "}
            <span className="rounded-md bg-gray-300 h-[40px]">
              {move?.priority}
            </span>
          </div>
        </div>

        <article className="text-center text-gray-100 bg-stone-600/80 p-2">
          <h4>Target: {move?.target.name}</h4>
          <p>Description: {description?.flavor_text}</p>
        </article>

        <article className="flex flex-col text-center gap-5 m-auto mt-4">
          <h4 className="text-gray-100 bg-stone-600/80 p-2">
            This move is learned by the following Pokémons
          </h4>
          <div className="grid auto-rows-auto grid-cols-[repeat(auto-fill,minmax(160px,_1fr))] gap-3 justify-items-center">
            {move?.learned_by_pokemon.map((pokemon) => (
              <div
                className="capitalize h-[40px] bg-gray-400 w-full max-w-[220px] text-center p-1"
                key={pokemon.url}
              >
                {pokemon.name}
              </div>
            ))}
          </div>
        </article>
      </section>
    </section>
  );
};

export default Move;

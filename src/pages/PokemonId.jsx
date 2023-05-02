import React, { useEffect, useState } from 'react'
import Header from '../components/pokedex/Header'
import { useParams } from 'react-router-dom'
import axios from 'axios'

const PokemonId = () => {
  const { id } = useParams()
  const [pokemonById, setPokemonById] = useState()

  const colorByType = {
    normal:"from-[#a4acaf] to-[#a4acaf]/70",
    fighting:"from-[#d56723] to-[#d56723]/70",
    flying:"from-[#3dc7ef] to-[#3dc7ef]/70",
    poison:"from-[#b97fc9] to-[#b97fc9]/70",
    ground:"from-[#ab9842]/60 to-[#ab9842]/40",
    rock:"from-[#a38c21] to-[#a38c21]/70",
    bug:"from-lime-400 to-lime-400/50",
    ghost:"from-[#7b62a3] to-[#7b62a3]/70",
    steel:"from-[#9eb7b8] to-[#9eb7b8]/70",
    fire:"from-[#fd7d24] to-[#fd7d24]/70",
    water:"from-[#4592c4] to-[#4592c4]/70",
    grass:"from-[#9bcc50] to-[#9bcc50]/70",
    electric:"from-[#eed535] to-[#eed535]/70",
    psychic:"from-[#f366b9] to-[#f366b9]/70",
    ice:"from-[#51c4e7] to-[#51c4e7]/70",
    dragon:"from-[#53a4cf]/70 to-[#53a4cf]/50",
    dark:"from-[#707070] to-[#707070]/70",
    fairy:"from-[#fdb9e9] to-[#fdb9e9]/70",
    unknown:"from-[0000000] to-[0000000]/70",
    shadow:"from-[0000000] to-[0000000]/70",
  }


  const handleShiny = () => {
    setOnShiny(!onShiny)
  }
  const [onShiny, setOnShiny] = useState(false)
    useEffect(() => {
      const url = `https://pokeapi.co/api/v2/pokemon/${id}`
      axios.get(url)
      .then( (res) => {
        console.log(res.data)
        setPokemonById(res.data)
      })
      .catch( (err) => console.log(err))
    }, [])
    
  return (
    <section className='w-full'>
        <Header/>
        <section className='w-full max-w-[1024px] p-3 mx-auto'>
          <div className={`w-full aspect-[5/2] flex justify-center relative items-center gap-4 bg-gradient-to-b ${colorByType[pokemonById?.types[0].type.name]}`}>

            <div className='w-[40%] max-w-[400px] absolute bottom-[-25%]'>
              <img className='w-full object-cover' src={onShiny?pokemonById?.sprites.other["official-artwork"].front_shiny:
                pokemonById?.sprites.other.dream_world.front_default ?? pokemonById?.sprites.other["official-artwork"].front_default } alt="" />
            </div>

            <div className='w-[10%] absolute left-[70%] flex flex-col items-center'>
              <img className='object-cover border-[2px] border-gray-600 shadow-sm shadow-slate-600' src={onShiny ? pokemonById?.sprites.other["official-artwork"].front_default :
              pokemonById?.sprites.other["official-artwork"].front_shiny}
              alt="" />
              <i onClick={handleShiny} className='bx bx-sync cursor-pointer text-3xl'></i>
            </div>
          </div>

          <article className='flex flex-col gap-2 justify-center items-center mt-[10%]'>
            <h2 className='text-4xl px-2 border-gray-400 border-[1px]'><span>#</span>{pokemonById?.id}</h2>
            <h3 className='text-3xl uppercase'>{pokemonById?.name}</h3>
            <div className='grid grid-cols-2 gap-6'>
              <div className='grid grid-rows-2 p-2 justify-items-center'><span>peso</span>{pokemonById?.weight}</div>
              <div className='grid grid-rows-2 p-2 justify-items-center'><span>altura</span>{pokemonById?.height}</div>
            </div>
            <article className='w-full grid grid-cols-2 gap-4'>
                <div className='grid grid-rows-3 gap-3 justify-items-center sm:grid-rows-2 sm:grid-cols-2'>
                  <h4 className='sm:col-span-2 text-2xl font-semibold'>Tipo</h4>
                  {
                      pokemonById?.types.map( (type)=> (
                        <div className='w-full text-center py-2 capitalize' key={type.type.name}>
                          {type.type.name}
                        </div>))
                    }
                </div>
                <div className='grid grid-rows-3 gap-3 justify-items-center sm:grid-rows-2 sm:grid-cols-2'>
                  <h4 className='sm:col-span-2 text-2xl font-semibold'>Habilidades</h4>
                  {
                    pokemonById?.abilities.map( (ability)=> ( <div className='w-full text-center py-2 capitalize border-[1px] border-gray-200' key={ability.ability.name}>{ability.ability.name} </div>))
                  }
                </div>
            </article>
          </article>


          <section>
            <h3 className='text-5xl'>stats</h3>
            <section>
              {
                pokemonById?.stats.map( (stat) => {
                  let pokeStat = stat.base_stat*100/255 + "%"
                  return ( 
                    <article key={stat.stat.name}>
                      <section className='flex justify-between'>
                        <span>{stat.stat.name}</span>
                        <span>{ stat.base_stat}/255</span>
                      </section>
                      <div className='bg-gray-100 h-6 rounded-sm w-full'>
                        <div className='bg-yellow-400 h-6' style={{width:pokeStat}}>
                        </div>
                      </div>
                    </article>
                    )
                })
              }
            </section>
          </section>
        </section>
    </section>
  )
}

export default PokemonId
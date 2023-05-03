import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const PokemonCard = ( {pokemonurl}) => {
    const [pokemon, setPokemon] = useState()

    const types = pokemon?.types?.map((type) => type.type.name).join(" / ")


    const borderByType = {
        normal:"border-[#a4acaf]",
        fighting:"border-[#d56723]",
        flying:"border-[#3dc7ef]",
        poison:"border-[#b97fc9]",
        ground:"border-[#ab9842]/60",
        rock:"border-[#a38c21]",
        bug:"border-lime-400",
        ghost:"border-[#7b62a3]",
        steel:"border-[#9eb7b8]",
        fire:"border-[#fd7d24]",
        water:"border-[#4592c4]",
        grass:"border-[#9bcc50]",
        electric:"border-yellow-400",
        psychic:"border-[#f366b9]",
        ice:"border-[#51c4e7]",
        dragon:"border-[#53a4cf]/70",
        dark:"border-[#707070]",
        fairy:"border-[#fdb9e9]",
        unknown:"border-[000]",
        shadow:"border-[000]",
    }
    const colorByType = {
        normal:"from-[#a4acaf] to-[#a4acaf]/70",
        fighting:"from-[#d56723] to-[#d56723]/70",
        flying:"from-[#3dc7ef] to-[#3dc7ef]/70",
        poison:"from-[#b97fc9] to-[#b97fc9]/70",
        ground:"from-[#ab9842]/60 to-[#ab9842]/40",
        rock:"from-[#a38c21] to-[#a38c21]/70",
        bug:"from-lime-400 to-lime-400/70",
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
    useEffect(() => {
      axios.get(pokemonurl)
      .then( (res)=> {
        setPokemon(res.data)
    })
      .catch( (err) => console.log(err))
    }, [])
    
  return (
    <Link to={`/pokedex/${pokemon?.id}`} className={`text-center border-8 rounded-md ${borderByType[pokemon?.types[0].type.name]} grid grid-rows-[150px,_1fr] max-w-[360px] bg-`}>
        {/* seccion superior */}
        <section className={`bg-gradient-to-b ${colorByType[pokemon?.types[0].type.name]} relative`}>
            <div className='absolute h-[120%] w-full left-[50%] translate-x-[-50%] translate-y-[12%]'>
                <img loading="lazy" className='h-full object-cover mx-auto' src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
            </div>
        </section>
        {/* seccion 2 contenido */}
        <section className='mt-16 pb-5'>
            <h3 className='capitalize'>{pokemon?.name}</h3>
            <h4 className='capitalize'>{types}</h4>
            <span className='text-sm text-gray-700/80'>type</span>
            <hr className='my-2' />
            <section className='grid grid-cols-3 grid-rows-2 text-sm'>
                {
                    pokemon?.stats.map( (stat) => (
                        <div key={stat.stat.name}>
                            <div>{stat.stat.name}</div>
                            <div>{stat.base_stat}</div>
                        </div>
                    ))
                }
            </section>
        </section>
    </Link>
  )
}

export default PokemonCard
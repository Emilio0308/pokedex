import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PokemonMove = ( { move }) => {
  const {id} =  useParams()

  return (
    <Link to={`/pokedex/${id}/${move.move.name}`} title="Click me more info"  className='capitalize h-[40px] bg-gray-400 w-full max-w-[220px] text-center p-1 hover:tracking-widest hover:bg-gray-300'>
         {move.move.name}
    </Link>
  )
}

export default PokemonMove
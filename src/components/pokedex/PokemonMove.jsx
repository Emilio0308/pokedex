import React from 'react'
import { Link, useParams } from 'react-router-dom'

const PokemonMove = ( { move }) => {
  const {id} =  useParams()

  return (
    <Link to={`/pokedex/${id}/${move.move.name}`}  className='capitalize h-[40px] bg-gray-400 w-full max-w-[220px] text-center p-1'>
         {move.move.name}
    </Link>
  )
}

export default PokemonMove
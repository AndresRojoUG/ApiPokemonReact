import React from 'react'
import './Buscador.css'
import { Buscar } from './Icons'
export default function Buscador({busqueda,setBusqueda,buscarPokemon}) {
  return (
   <>
   <h3 className='titulo'>Mas de 1000 pokemons!!!</h3>
   <p className='titulo'>Busca por nombre o por numero</p>
   <form onSubmit={buscarPokemon} className='container-buscar'>
    <input value={busqueda} onChange={(e)=>{
     setBusqueda( e.target.value)
    }} type="text" placeholder='Buscar Pokemon...' className='input-buscar' />
    <button className='btn-buscar'>Buscar pokemon <Buscar/> </button>
   </form>
   </>
  )
}

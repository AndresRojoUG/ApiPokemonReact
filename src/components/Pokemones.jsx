
import './pokemones.css'
import usePokemones from '../hooks/usePokemones'
import InfiniteScroll from 'react-infinite-scroll-component';
import Cargando from './Cargando';
import { useState } from "react";
import DetallePoke from './DetallePoke';
import { Buscar } from './Icons';
import Buscador from './Buscador';
function Pokemon({id,nombre,imagen,tipo,verPokemon}){

  
    return (
        <div className='pokemon-card' onClick={verPokemon}>
        <img className='pokemon-imagen' src={imagen} alt={nombre} />

      <p className='pokemon-titulo'>
      <span>#{id}</span>
      <span>{nombre}</span>
      
      </p>
      <div  className='tiposPokemon'>
     
      {tipo[0]?  <div className='tipo1'>
              <span>{tipo[0].type.name}</span>
              </div>:null  }

              {tipo[1]?  <div className='tipo2'>
              <span>{tipo[1].type.name}</span>
              </div>:null  }
             
     
        

      </div>
     
      </div>
    )
}
export default function Pokemones() {

  const { pokemonnses,masPokemones,verMas,searchPokemon} = usePokemones()
  const [mostrar, setMostrar] = useState({mostrar:false,pokemon:{}})
  const [busqueda, setBusqueda] = useState('')

    const verPokemon = (pokemon) => setMostrar({ mostrar: true, pokemon })

  const noVerPokemon = () => {
    setMostrar({ mostrar: false, pokemon: {}})
    setBusqueda("")
   
  }
  const buscarPokemon = async (e) => {
    e.preventDefault()

    if (!busqueda) return

    const pokemon = await searchPokemon(busqueda)
    console.log(pokemon);
    setMostrar({ mostrar: true, pokemon })
  }
    
  return (
   <>
   <DetallePoke {...mostrar} cerrar={noVerPokemon}/>
   <Buscador busqueda={busqueda} setBusqueda={setBusqueda} buscarPokemon={buscarPokemon}/>
    <InfiniteScroll 
    dataLength={pokemonnses.length}
    next={masPokemones}
    hasMore={verMas}
    loader={<Cargando/>  }
    endMessage={
      <h3 className='titulo' style={{ gridColumn: '1/6' }}>Lo siento, no hay más pokemones</h3>
    }
    className='pokemon-container'>
      {
        pokemonnses.map(pokemon => 
        
           <Pokemon  key={pokemon.id} {...pokemon}  verPokemon={() => verPokemon(pokemon)}/>

        )
      }
    </InfiniteScroll>
   
   </>
  )
}

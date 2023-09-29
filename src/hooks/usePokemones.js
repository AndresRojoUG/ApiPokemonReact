import {useEffect,useState} from 'react';
const URL_DEFAULT='https://pokeapi.co/api/v2/pokemon?limit=12&offset=0'
const URL_ENDPOINT = 'https://pokeapi.co/api/v2/pokemon/'
export default function usePokemones(){

    const [pokemonnses, setPokemonnses] = useState([])
    const [siguienteUrl, setSiguienteUrl] = useState('')
    const [verMas, setVerMas] = useState(true)
    const fetchPokemon=async (url)=>{
  
      const response = await fetch(url)
      const poke = await response.json()
      const abilities = poke.abilities.map(a => a.ability.name)
      const stats = poke.stats.map(s => { return { name: s.stat.name, base: s.base_stat }})
      
      return {
        id: poke.id,
        nombre: poke.name,
        imagen: poke.sprites.other.dream_world.front_default || poke.sprites.front_default,
        tipo:poke.types,
        abilities,
        stats
      }
    }
    //USEEFECT PARA OBTENER LOS POKEMONS

    const getPokemones = async (url='https://pokeapi.co/api/v2/pokemon?limit=12&offset=0') => {
        ///recuperamos el listado de pokemones
        const response = await fetch(url)
        const data = await response.json()
        const {next, results } = data
        const newPokemones = await Promise.all(results.map( (pokemon) =>  fetchPokemon(pokemon.url))
          
          )
        return {next,newPokemones}
      }

      const obtenerPokemones = async () => {
        const { next, newPokemones } = await getPokemones()
        setPokemonnses(newPokemones)
        setSiguienteUrl(next)
      }
    
      const masPokemones = async () => { 
        const { next, newPokemones } = await getPokemones(siguienteUrl)
        setPokemonnses(prev => [...prev, ...newPokemones])
        next === null && setVerMas(false)
        setSiguienteUrl(next)
      }
    
      const searchPokemon = async (busqueda) => {
        const url = `${URL_ENDPOINT}${busqueda.toLocaleLowerCase()}`
        return await fetchPokemon(url)
      }


      useEffect(() => {obtenerPokemones()

      }, [])

      return {pokemonnses,masPokemones,verMas,searchPokemon}
}

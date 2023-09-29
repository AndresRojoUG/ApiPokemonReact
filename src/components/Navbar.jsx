import React, { useState,useEffect } from 'react'
import {Logo, Luna, PokemonLogo, Sol} from './Icons';
import './Navbar.css'

export default function Navbar() {
  const [tema, setTema] = useState('claro')
  const handleChange=(e)=> setTema(e.target.checked?'oscuro':'claro')
  useEffect(() => {
   document.body.setAttribute('data-tema',tema)

  }, [tema])
  
  return (
    <nav>
        <div className="logos">
        <Logo className="logo1"/>
        <PokemonLogo className="logo1"/>

        </div>
       
        <div className='switch'>
            <Sol/>
            <label >
                <input onChange={handleChange} className='check-switch' type="checkbox" hidden/>
                <span className='slider'></span>
            </label>
            <Luna/>
        </div>
    </nav>
  )
}

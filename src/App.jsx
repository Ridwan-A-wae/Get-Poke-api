import { useState, useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import axios from 'axios';
import './App.css';

function App() {

  const [poke,setPoke] = useState()
  const [load,setLoad] = useState(false)
  const [error,setError] = useState()


 useEffect(() => {
  let abortController = new AbortController();

  const loadPoke = async () => {
    try {
      setLoad(true)
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/1` , {
        signal: abortController.signal
      })
      setPoke(response.data);
    }catch(err) {
      setError('Something went wrong.')
    }finally {
      setLoad(false)
    }
  }
  loadPoke();
  return () => abortController.abort();
 },[])


  console.log(poke)
  return <>

<h1> {poke?.species.name} </h1>
  <img src={poke?.sprites.other.home.front_default} alt="{poke?.species.name}" />
  <ul> {poke?.abilities.map((abi,idx) => (
    <li key={idx} style={{listStyle:"none"}}> {abi.ability.name}  </li>
  ))} </ul>



  </>;
}

export default App;

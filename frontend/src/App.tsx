import { useEffect, useState } from 'react'
import './App.css'
import Unit from './Unit'

function App() {
  const [pageTitle, setPageTitle] = useState('Loading...');
  
  const [units, setUnits] = useState<number[]>([]);
  useEffect(() => {
    setTimeout(() => {
      console.log('Page chargée');
      setPageTitle('StarWars Legion Companion');
      setUnits([1, 2, 3]);
    }, 1000);
  }, []);
  
  return (
    <>
      <h1>{pageTitle}</h1>
      <h2>{units.length > 0 ? 'Liste des unités' : 'Aucune unité disponible'}</h2>
      <div>
        {units.map((id) => (
          <Unit key={id} id={id} />
        ))}
      </div>
    </>
  )
}

export default App

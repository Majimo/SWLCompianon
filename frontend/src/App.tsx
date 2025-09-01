import { useEffect, useState } from 'react'
import './App.css'
import Unit from './Unit'

function App() {
  const [pageTitle, setPageTitle] = useState('Loading...');
  
  const [units, setUnits] = useState<number[]>([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/units')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response error');
        }
        return response.json()
      })
      .then((data) => {
        setUnits(data);
        setPageTitle('StarWars Legion Companion');
      })
      .catch((error) => {
        console.error('Error fetching units:', error);
      });
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

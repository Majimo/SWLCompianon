import { useEffect, useState } from 'react'
import './App.css'
import Unit, { type UnitProps } from './components/unit/Unit';
import Button from './components/shared/button/Button';

function App() {
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [units, setUnits] = useState<UnitProps[]>([]);

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
        {units.map((unit) => (
          <Unit key={unit.id} id={unit.id} name={unit.name} points={unit.points} />
        ))}
      </div>
      <div>
        <Button onClick={() => createUnit({ id: units.length + 1, name: `Unit ${units.length + 1}`, points: (units.length + 1) * 100 })}>
          Ajouter une nouvelle unité
        </Button>
      </div>
    </>
  );

  function createUnit(newUnit: UnitProps) {
    fetch('http://localhost:8000/api/units', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
    },
      body: JSON.stringify(newUnit),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response error');
        }
        return response.json();
      })
      .then((data) => {
        setUnits((prevUnits) => [...prevUnits, data]);
      })
      .catch((error) => {
        console.error('Error creating unit:', error);
      });
  }
}

export default App;

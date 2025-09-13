import { useEffect, useState } from 'react'
import './App.css'
import Unit, { type UnitProps } from './components/unit/Unit';
import Button from './components/shared/button/Button';
import api from './interceptors/api';

function App() {
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [units, setUnits] = useState<UnitProps[]>([]);

  useEffect(() => {
    const params = new URLSearchParams();
    params.append('username', 'pierre');
    params.append('password', 'secret');

    api.post('/token', params, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(response => {
        sessionStorage.setItem('accessToken', response.data.access_token);
        return api.get('/api/units');
      })
      .then(response => {
        return response.data;
      })
      .then(data => {
        setUnits(data);
        setPageTitle('StarWars Legion Companion');
      })
      .catch(error => {
        console.error('Error during initial data load:', error);
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
    api.post('/api/units', newUnit)
      .then((response) => {
        if (!response.status || response.status !== 200) {
          throw new Error('Network response error');
        }
        return response.data;
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

import { useEffect, useState } from 'react';
import './App.css';
import Unit, { type UnitProps } from './components/unit/Unit';
import Button from './components/shared/button/Button';
import { login } from './services/authService';
import { getUnits, createUnit as createUnitService } from './services/unitService';

function App() {
  const [pageTitle, setPageTitle] = useState('Loading...');
  const [units, setUnits] = useState<UnitProps[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        await login('pierre', 'secret');
        const fetchedUnits = await getUnits();
        setUnits(fetchedUnits);
        setPageTitle('StarWars Legion Companion');
      } catch (error) {
        console.error('Error during initial data load:', error);
      }
    };

    loadInitialData();
  }, []);

  const handleCreateUnit = async () => {
    try {
      const newUnitData = { id: units.length + 1, name: `Unit ${units.length + 1}`, points: (units.length + 1) * 100 };
      const createdUnit = await createUnitService(newUnitData);
      setUnits((prevUnits) => [...prevUnits, createdUnit]);
    } catch (error) {
      console.error('Error creating unit:', error);
    }
  };
  
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
        <Button onClick={handleCreateUnit}>
          Ajouter une nouvelle unité
        </Button>
      </div>
    </>
  );
}

export default App;

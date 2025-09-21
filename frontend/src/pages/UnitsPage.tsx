import '../App.css';
import Unit from '../components/unit/Unit';
import Button from '../components/shared/button/Button';
import { useUnits } from '../hooks/useUnits';

function UnitsPage() {
  const { units, isLoading, error, createUnit } = useUnits();

  const pageTitle = 'StarWars Legion Companion';

  return (
    <>
      <h1>{pageTitle}</h1>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {!isLoading && !error && (
        <>
          <h2>{units.length > 0 ? 'Liste des unités' : 'Aucune unité disponible'}</h2>
          <div>
            {units.map((unit) => (
              <Unit key={unit.id} id={unit.id} name={unit.name} points={unit.points} />
            ))}
          </div>
          <div>
            <Button onClick={createUnit}>
              Ajouter une nouvelle unité
            </Button>
          </div>
        </>
      )}
    </>
  );
}

export default UnitsPage;

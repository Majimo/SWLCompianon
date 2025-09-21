import { useState, useEffect, useCallback } from 'react';
import { useUnitStore } from '../store/unitStore';
import { getUnits, createUnit as createUnitService } from '../services/unitService';

export const useUnits = () => {
  const { units, setUnits, addUnit } = useUnitStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /** Charger les unités depuis l'API */
  const fetchUnits = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const fetchedUnits = await getUnits();
      setUnits(fetchedUnits);
    } catch (err) {
      setError('Failed to load units.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [setUnits]);

  /** Créer une nouvelle unité */
  const createUnit = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const newUnitData = { id: units.length + 1, name: `Unit ${units.length + 1}`, points: (units.length + 1) * 100 };
      const createdUnit = await createUnitService(newUnitData);
      addUnit(createdUnit);
    } catch (err) {
      setError('Failed to create unit.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUnits();
  }, [fetchUnits]);

  return { units, isLoading, error, createUnit };
};

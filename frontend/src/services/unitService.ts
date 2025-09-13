import api from "../interceptors/api";
import { type UnitProps } from "../components/unit/Unit";

export const getUnits = async () => {
  const response = await api.get('/api/units');
  return response.data;
};

export const createUnit = async (newUnit: UnitProps) => {
  const response = await api.post('/api/units', newUnit);
  return response.data;
};

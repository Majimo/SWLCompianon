import { create } from 'zustand';
import { type UnitProps } from '../components/unit/Unit';

interface UnitState {
  units: UnitProps[];
  setUnits: (units: UnitProps[]) => void;
  addUnit: (unit: UnitProps) => void;
}

export const useUnitStore = create<UnitState>((set) => ({
  units: [],

  setUnits: (units) => set({ units }),

  addUnit: (unit) => set((state) => ({ units: [...state.units, unit] })),
}));

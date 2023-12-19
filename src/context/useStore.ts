import { create } from "zustand";
import { IUnits } from "../interfaces/IUnits";

interface StoreState {
  data: IUnits[];
  addItems: (newItems: IUnits[]) => void;
}

const useStore = create<StoreState>((set) => ({
  data: [],

  addItems: (newItems) =>
    set((state) => ({ data: [...state.data, ...newItems] })),
}));

export default useStore;

import { create } from "zustand";

interface ServiceState {
  services: string[];
  setServices: (services: string[]) => void;
  clearServices: () => void;
}

export const useServiceStore = create<ServiceState>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
  clearServices: () => set({ services: [] }),
}));

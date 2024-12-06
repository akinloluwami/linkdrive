import { create } from "zustand";

interface GlobalModalStoreProps {
  isOpen: boolean;
  setOpen: (isOpen: boolean) => void;
}

const useGlobalModalStore = create<GlobalModalStoreProps>((set) => ({
  isOpen: false,
  setOpen: (isOpen) => set({ isOpen }),
}));

export default useGlobalModalStore;

import { create } from "zustand";

interface GlobalModalStoreProps {
  activeModal: "add-new" | "add-new-link" | "create-collection" | null;
  setActiveModal: (
    activeModal: "add-new" | "add-new-link" | "create-collection" | null
  ) => void;
}

const useGlobalModalStore = create<GlobalModalStoreProps>((set) => ({
  activeModal: null,
  setActiveModal: (activeModal) => set({ activeModal }),
}));

export default useGlobalModalStore;

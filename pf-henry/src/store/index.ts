import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ISafeStockStore {
  userData: any;
  isHydrated: boolean;
  sucursales: any[];

  setSucursales: (sucursales: any[]) => void;
  setUserData: (data: any) => void;
  setHydrated: (state: boolean) => void;
  clearUserData: () => void;
}

// Add isHydrated flag to track when the store has been hydrated from storage
const useUserDataStore = create<ISafeStockStore>()(
  devtools(
    persist(
      (set) => ({
        sucursales: [],
        userData: null,
        isHydrated: false,

        setSucursales: (sucursales) => set({ sucursales }),
        setUserData: (data) => set({ userData: data }),
        setHydrated: (state) => set({ isHydrated: state }),
        clearUserData: () =>
          set({ userData: null, isHydrated: false, sucursales: [] }),
      }),
      {
        name: "safeStock-store",
        storage: createJSONStorage(() => localStorage),
        onRehydrateStorage: () => (state) => {
          // When storage rehydration is complete, set hydrated to true
          if (state) {
            state.setHydrated(true);
          }
        },
      }
    )
  )
);

export default useUserDataStore;

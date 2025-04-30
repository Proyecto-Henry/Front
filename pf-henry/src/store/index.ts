import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

interface ISafeStockStore {
  userData: any;
  isHydrated: boolean;

  setUserData: (data: any) => void;
  setHydrated: (state: boolean) => void;
}

// Add isHydrated flag to track when the store has been hydrated from storage
const useUserDataStore = create<ISafeStockStore>()(
  devtools(
    persist(
      (set) => ({
        userData: null,
        isHydrated: false,

        setUserData: (data) => set({ userData: data }),
        setHydrated: (state) => set({ isHydrated: state }),
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

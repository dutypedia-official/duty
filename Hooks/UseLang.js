import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useLang = create()(
  persist(
    (set, get) => ({
      language: "Bn",
      setLanguage: (lang) => set({ language: lang }),
    }),
    {
      name: "lang-storage",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useLang;

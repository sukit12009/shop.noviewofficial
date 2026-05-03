import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export type Lang = 'TH' | 'EN';

interface LangState {
  lang: Lang;
  setLang: (lang: Lang) => void;
}

export const useLangStore = create<LangState>()(
  devtools(
    persist(
      (set) => ({
        lang: 'TH',
        setLang: (lang) => set({ lang }),
      }),
      { name: 'lang-storage' },
    ),
    { name: 'LangStore' },
  ),
);

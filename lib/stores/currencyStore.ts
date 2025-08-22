// lib\stores\currencyStore.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ExchangeInfo {
  from: string;
  to: string;
  rate: number;
  result: number;
}

interface CurrencyStore {
  baseCurrency: string;
  setBaseCurrency: (currency: string) => void;
  exchangeInfo: ExchangeInfo | null;
  rates: [string, number][];
  filter: string;
  isLoading: boolean;
  isError: string | null;
  hasHydrated: boolean;
  setExchangeInfo: (info: ExchangeInfo | null) => void;
  setRates: (rates: [string, number][]) => void;
  setFilter: (filter: string) => void;
  setIsLoading: (isLoading: boolean) => void;
  setIsError: (isError: string | null) => void;
  setHasHydrated: (hasHydrated: boolean) => void;
}

export const useCurrencyStore = create<CurrencyStore>()(
  persist(
    (set) => ({
      baseCurrency: '',
      exchangeInfo: null,
      rates: [],
      filter: '',
      isLoading: false,
      isError: null,
      hasHydrated: false,
      setBaseCurrency: (currency: string) => set({ baseCurrency: currency }),
      setExchangeInfo: (info: ExchangeInfo | null) => set({ exchangeInfo: info }),
      setRates: (rates: [string, number][]) => set({ rates }),
      setFilter: (filter: string) => set({ filter }),
      setIsLoading: (isLoading: boolean) => set({ isLoading }),
      setIsError: (isError: string | null) => set({ isError }),
      setHasHydrated: (hasHydrated: boolean) => set({ hasHydrated }),
    }),
    {
      name: 'currency-store',
      partialize: (state) => ({ baseCurrency: state.baseCurrency }),
      onRehydrateStorage: () => (state) => state?.setHasHydrated(true),
    }
  )
);

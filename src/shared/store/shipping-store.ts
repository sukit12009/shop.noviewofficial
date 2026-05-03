import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

export interface ShippingAddress {
  name: string;
  phone: string;
  address: string;
  district: string;
  province: string;
  postalCode: string;
}

interface ShippingState {
  address: ShippingAddress | null;
  setAddress: (address: ShippingAddress) => void;
  clearAddress: () => void;
}

export const useShippingStore = create<ShippingState>()(
  devtools(
    persist(
      (set) => ({
        address: null,
        setAddress: (address) => set({ address }),
        clearAddress: () => set({ address: null }),
      }),
      { name: 'shipping-storage' },
    ),
    { name: 'ShippingStore' },
  ),
);

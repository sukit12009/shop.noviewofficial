import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import type { Order } from '@/core/entities/order';

interface OrderState {
  orders: Order[];
  addOrder: (order: Order) => void;
}

export const useOrderStore = create<OrderState>()(
  devtools(
    persist(
      (set) => ({
        orders: [],
        addOrder: (order) =>
          set((state) => ({ orders: [order, ...state.orders] })),
      }),
      { name: 'order-storage' },
    ),
    { name: 'OrderStore' },
  ),
);

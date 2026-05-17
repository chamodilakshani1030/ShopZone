import { create } from 'zustand'

export const useCartStore = create((set, get) => ({
  items: [],
  
  addItem: (product) => {
    set((state) => {
      const existingItem = state.items.find((item) => item.id === product.id)
      
      if (existingItem) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, qty: item.qty + 1 }
              : item
          ),
        }
      }
      
      return {
        items: [...state.items, { ...product, qty: 1 }],
      }
    })
  },
  
  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }))
  },
  
  updateQty: (id, qty) => {
    set((state) => {
      if (qty <= 0) {
        return {
          items: state.items.filter((item) => item.id !== id),
        }
      }
      
      return {
        items: state.items.map((item) =>
          item.id === id
            ? { ...item, qty }
            : item
        ),
      }
    })
  },
  
  clearCart: () => {
    set({ items: [] })
  },
  
  get totalItems() {
    return get().items.reduce((sum, item) => sum + item.qty, 0)
  },
  
  get totalPrice() {
    const total = get().items.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    )
    return parseFloat(total.toFixed(2))
  },
}))

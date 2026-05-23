import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { CartItem, Product, ProductVariant } from '@/types'
import {
  FREE_SHIPPING_THRESHOLD,
  STANDARD_SHIPPING_COST,
  GST_RATE,
} from '@/lib/constants'

interface CartState {
  items: CartItem[]
  couponCode: string | null
  discountAmount: number

  // Computed
  itemCount: number
  subtotal: number
  shipping: number
  tax: number
  total: number

  // Actions
  addItem: (
    product: Product,
    quantity?: number,
    variant?: ProductVariant,
  ) => void
  removeItem: (productId: string, variantId?: string) => void
  updateQuantity: (
    productId: string,
    quantity: number,
    variantId?: string,
  ) => void
  clearCart: () => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
}

function computeTotals(items: CartItem[], discountAmount: number) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  )
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING_COST
  const taxable = Math.max(0, subtotal - discountAmount)
  const tax = Math.round(taxable * GST_RATE)
  const total = taxable + shipping + tax
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)

  return { subtotal, shipping, tax, total, itemCount }
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      couponCode: null,
      discountAmount: 0,
      itemCount: 0,
      subtotal: 0,
      shipping: 0,
      tax: 0,
      total: 0,

      addItem: (product, quantity = 1, variant) => {
        set((state) => {
          const existingIndex = state.items.findIndex(
            (item) =>
              item.product.id === product.id &&
              item.variant?.id === variant?.id,
          )

          let newItems: CartItem[]

          if (existingIndex >= 0) {
            newItems = state.items.map((item, i) =>
              i === existingIndex
                ? { ...item, quantity: item.quantity + quantity }
                : item,
            )
          } else {
            newItems = [...state.items, { product, quantity, variant }]
          }

          return {
            items: newItems,
            ...computeTotals(newItems, state.discountAmount),
          }
        })
      },

      removeItem: (productId, variantId) => {
        set((state) => {
          const newItems = state.items.filter(
            (item) =>
              !(
                item.product.id === productId && item.variant?.id === variantId
              ),
          )
          return {
            items: newItems,
            ...computeTotals(newItems, state.discountAmount),
          }
        })
      },

      updateQuantity: (productId, quantity, variantId) => {
        if (quantity <= 0) {
          get().removeItem(productId, variantId)
          return
        }
        set((state) => {
          const newItems = state.items.map((item) =>
            item.product.id === productId && item.variant?.id === variantId
              ? { ...item, quantity }
              : item,
          )
          return {
            items: newItems,
            ...computeTotals(newItems, state.discountAmount),
          }
        })
      },

      clearCart: () =>
        set({
          items: [],
          couponCode: null,
          discountAmount: 0,
          itemCount: 0,
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
        }),

      applyCoupon: (code, discount) => {
        set((state) => ({
          couponCode: code,
          discountAmount: discount,
          ...computeTotals(state.items, discount),
        }))
      },

      removeCoupon: () => {
        set((state) => ({
          couponCode: null,
          discountAmount: 0,
          ...computeTotals(state.items, 0),
        }))
      },
    }),
    {
      name: 'apex-cart',
    },
  ),
)

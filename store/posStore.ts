import { create } from 'zustand'
import type { POSCartItem, POSSession, Product, ProductVariant } from '@/types'
import { GST_RATE } from '@/lib/constants'

// ─── Types ────────────────────────────────────────────────────────────────────
export interface POSCustomer {
  id: string
  name: string
  email?: string
  phone?: string
  totalOrders: number
  totalSpent: number
  lastOrder?: string
  marketingOptIn: boolean
}

export interface SavedCart {
  id: string
  name: string
  items: POSCartItem[]
  customer: POSCustomer | null
  note: string
  savedAt: string
  total: number
}

export interface CashMovement {
  id: string
  amount: number
  type: 'in' | 'out'
  reason: string
  time: string
}

export interface CashDrawer {
  id: string
  openedAt: string
  closedAt?: string
  openingCash: number
  closingCash?: number
  expectedCash?: number
  variance?: number
  movements: CashMovement[]
  cashier: string
}

export interface ReturnItem {
  productId: string
  name: string
  quantity: number
  price: number
  reason: string
}

export interface CompletedOrder {
  id: string
  items: POSCartItem[]
  customer: POSCustomer | null
  subtotal: number
  discountTotal: number
  tax: number
  total: number
  paymentMethod: string
  note: string
  cashier: string
  completedAt: string
  returned: boolean
}

// ─── New: Staff ───────────────────────────────────────────────────────────────
export type StaffRole = 'owner' | 'manager' | 'cashier'

export interface POSStaffMember {
  id: string
  name: string
  initials: string
  email?: string
  phone?: string
  role: StaffRole
  pin: string
  shift?: string
  isActive: boolean
  createdAt: string
  totalSales: number
  totalOrders: number
}

// ─── New: Revenue ─────────────────────────────────────────────────────────────
export type SalesChannel = 'both' | 'online_only' | 'pos_only'

export interface RevenueEntry {
  source: 'online' | 'pos'
  amount: number
  orderId: string
  cashier?: string
  timestamp: string
}

// ─── State interface ──────────────────────────────────────────────────────────
interface POSState {
  // ── Session ────────────────────────────────────────────────────────────────
  session: POSSession | null
  isSessionOpen: boolean

  // ── Cart ───────────────────────────────────────────────────────────────────
  items: POSCartItem[]
  customDiscount: number
  couponCode: string | null
  couponDiscount: number
  paymentMethod: string
  customerName: string
  customerPhone: string
  note: string

  // ── Customer ───────────────────────────────────────────────────────────────
  customer: POSCustomer | null

  // ── Saved carts ────────────────────────────────────────────────────────────
  savedCarts: SavedCart[]

  // ── Cash drawer ────────────────────────────────────────────────────────────
  cashDrawer: CashDrawer | null

  // ── Completed orders ───────────────────────────────────────────────────────
  completedOrders: CompletedOrder[]

  // ── Order note ────────────────────────────────────────────────────────────
  orderNote: string

  // ── Staff management ───────────────────────────────────────────────────────
  staffList: POSStaffMember[]

  // ── Revenue tracking ───────────────────────────────────────────────────────
  revenueLog: RevenueEntry[]

  // ── Computed ───────────────────────────────────────────────────────────────
  subtotal: number
  discountTotal: number
  tax: number
  total: number
  itemCount: number

  // ── Existing actions ───────────────────────────────────────────────────────
  openSession: (
    cashierId: string,
    cashierName: string,
    openingCash: number,
  ) => void
  closeSession: (closingCash: number) => void
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
  setItemDiscount: (
    productId: string,
    discount: number,
    variantId?: string,
  ) => void
  setCustomDiscount: (discount: number) => void
  applyCoupon: (code: string, discount: number) => void
  removeCoupon: () => void
  setPaymentMethod: (method: string) => void
  setCustomer: (name: string, phone: string) => void
  setNote: (note: string) => void
  clearCart: () => void

  // ── Customer actions ───────────────────────────────────────────────────────
  attachCustomer: (customer: POSCustomer) => void
  detachCustomer: () => void

  // ── Order note actions ─────────────────────────────────────────────────────
  setOrderNote: (note: string) => void
  clearOrderNote: () => void

  // ── Saved cart actions ─────────────────────────────────────────────────────
  saveCart: (name: string) => void
  loadCart: (id: string) => void
  deleteSavedCart: (id: string) => void

  // ── Cash drawer actions ────────────────────────────────────────────────────
  openCashDrawer: (openingCash: number, cashier: string) => void
  closeCashDrawer: (closingCash: number) => void
  addCashMovement: (amount: number, type: 'in' | 'out', reason: string) => void

  // ── Return actions ─────────────────────────────────────────────────────────
  completeOrder: (orderId: string, cashier: string) => void
  processReturn: (orderId: string, returnItems: ReturnItem[]) => void

  // ── Void action ────────────────────────────────────────────────────────────
  voidSale: () => void

  // ── Discount actions ───────────────────────────────────────────────────────
  applyFixedDiscount: (amount: number) => void
  applyPercentageDiscount: (percent: number) => void

  // ── Staff actions ──────────────────────────────────────────────────────────
  addStaff: (
    staff: Omit<
      POSStaffMember,
      'id' | 'createdAt' | 'totalSales' | 'totalOrders'
    >,
  ) => void
  updateStaff: (id: string, data: Partial<POSStaffMember>) => void
  removeStaff: (id: string) => void
  updateStaffPin: (id: string, pin: string) => void
  incrementStaffSales: (name: string, amount: number) => void

  // ── Revenue actions ────────────────────────────────────────────────────────
  addRevenueEntry: (entry: Omit<RevenueEntry, 'timestamp'>) => void
  getTotalRevenue: () => number
  getOnlineRevenue: () => number
  getPOSRevenue: () => number
}

// ─── Compute totals ───────────────────────────────────────────────────────────
function computePOSTotals(
  items: POSCartItem[],
  customDiscount: number,
  couponDiscount: number,
) {
  const subtotal = items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity - (item.discount ?? 0),
    0,
  )
  const discountTotal = customDiscount + couponDiscount
  const taxable = Math.max(0, subtotal - discountTotal)
  const tax = Math.round(taxable * GST_RATE)
  const total = taxable + tax
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0)
  return { subtotal, discountTotal, tax, total, itemCount }
}

// ─── Store ────────────────────────────────────────────────────────────────────
export const usePOSStore = create<POSState>()((set, get) => ({
  // ── Initial state ──────────────────────────────────────────────────────────
  session: null,
  isSessionOpen: false,
  items: [],
  customDiscount: 0,
  couponCode: null,
  couponDiscount: 0,
  paymentMethod: 'cash',
  customerName: '',
  customerPhone: '',
  note: '',
  customer: null,
  savedCarts: [],
  cashDrawer: null,
  completedOrders: [],
  orderNote: '',
  subtotal: 0,
  discountTotal: 0,
  tax: 0,
  total: 0,
  itemCount: 0,
  revenueLog: [],

  // ── Initial staff list ─────────────────────────────────────────────────────
  staffList: [
    {
      id: '1',
      name: 'Ramesh Kumar',
      initials: 'RK',
      role: 'cashier',
      pin: '1234',
      shift: 'Morning',
      isActive: true,
      createdAt: new Date().toISOString(),
      totalSales: 0,
      totalOrders: 0,
    },
    {
      id: '2',
      name: 'Amit Kumar',
      initials: 'AK',
      role: 'owner',
      pin: '9999',
      shift: 'Full day',
      isActive: true,
      createdAt: new Date().toISOString(),
      totalSales: 0,
      totalOrders: 0,
    },
    {
      id: '3',
      name: 'Suresh Patel',
      initials: 'SP',
      role: 'cashier',
      pin: '5678',
      shift: 'Evening',
      isActive: true,
      createdAt: new Date().toISOString(),
      totalSales: 0,
      totalOrders: 0,
    },
  ],

  // ── Existing actions (unchanged) ───────────────────────────────────────────
  openSession: (cashierId, cashierName, openingCash) =>
    set({
      session: {
        id: `session-${Date.now()}`,
        cashierId,
        cashierName,
        openedAt: new Date().toISOString(),
        openingCash,
        totalSales: 0,
        totalOrders: 0,
      },
      isSessionOpen: true,
    }),

  closeSession: (closingCash) =>
    set((state) => ({
      session: state.session
        ? { ...state.session, closedAt: new Date().toISOString(), closingCash }
        : null,
      isSessionOpen: false,
    })),

  addItem: (product, quantity = 1, variant) => {
    set((state) => {
      const existingIndex = state.items.findIndex(
        (item) =>
          item.product.id === product.id && item.variant?.id === variant?.id,
      )
      let newItems: POSCartItem[]
      if (existingIndex >= 0) {
        newItems = state.items.map((item, i) =>
          i === existingIndex
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        )
      } else {
        newItems = [...state.items, { product, quantity, variant, discount: 0 }]
      }
      return {
        items: newItems,
        ...computePOSTotals(
          newItems,
          state.customDiscount,
          state.couponDiscount,
        ),
      }
    })
  },

  removeItem: (productId, variantId) => {
    set((state) => {
      const newItems = state.items.filter(
        (item) =>
          !(item.product.id === productId && item.variant?.id === variantId),
      )
      return {
        items: newItems,
        ...computePOSTotals(
          newItems,
          state.customDiscount,
          state.couponDiscount,
        ),
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
        ...computePOSTotals(
          newItems,
          state.customDiscount,
          state.couponDiscount,
        ),
      }
    })
  },

  setItemDiscount: (productId, discount, variantId) => {
    set((state) => {
      const newItems = state.items.map((item) =>
        item.product.id === productId && item.variant?.id === variantId
          ? { ...item, discount }
          : item,
      )
      return {
        items: newItems,
        ...computePOSTotals(
          newItems,
          state.customDiscount,
          state.couponDiscount,
        ),
      }
    })
  },

  setCustomDiscount: (discount) => {
    set((state) => ({
      customDiscount: discount,
      ...computePOSTotals(state.items, discount, state.couponDiscount),
    }))
  },

  applyCoupon: (code, discount) => {
    set((state) => ({
      couponCode: code,
      couponDiscount: discount,
      ...computePOSTotals(state.items, state.customDiscount, discount),
    }))
  },

  removeCoupon: () => {
    set((state) => ({
      couponCode: null,
      couponDiscount: 0,
      ...computePOSTotals(state.items, state.customDiscount, 0),
    }))
  },

  setPaymentMethod: (method) => set({ paymentMethod: method }),

  setCustomer: (name, phone) =>
    set({ customerName: name, customerPhone: phone }),

  setNote: (note) => set({ note }),

  clearCart: () =>
    set((state) => ({
      items: [],
      customDiscount: 0,
      couponCode: null,
      couponDiscount: 0,
      customerName: '',
      customerPhone: '',
      note: '',
      orderNote: '',
      customer: null,
      paymentMethod: 'cash',
      ...computePOSTotals([], 0, 0),
      session: state.session
        ? {
            ...state.session,
            totalOrders: state.session.totalOrders + 1,
            totalSales: state.session.totalSales + state.total,
          }
        : null,
    })),

  // ── Customer ───────────────────────────────────────────────────────────────
  attachCustomer: (customer) =>
    set({
      customer,
      customerName: customer.name,
      customerPhone: customer.phone ?? '',
    }),

  detachCustomer: () =>
    set({ customer: null, customerName: '', customerPhone: '' }),

  // ── Order note ─────────────────────────────────────────────────────────────
  setOrderNote: (note) => set({ orderNote: note }),
  clearOrderNote: () => set({ orderNote: '' }),

  // ── Discounts ──────────────────────────────────────────────────────────────
  applyFixedDiscount: (amount) => {
    set((state) => ({
      customDiscount: amount,
      ...computePOSTotals(state.items, amount, state.couponDiscount),
    }))
  },

  applyPercentageDiscount: (percent) => {
    set((state) => {
      const subtotal = state.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0,
      )
      const amount = Math.round((subtotal * percent) / 100)
      return {
        customDiscount: amount,
        ...computePOSTotals(state.items, amount, state.couponDiscount),
      }
    })
  },

  // ── Saved carts ────────────────────────────────────────────────────────────
  saveCart: (name) => {
    set((state) => {
      if (!state.items.length) return state
      const saved: SavedCart = {
        id: `cart-${Date.now()}`,
        name,
        items: [...state.items],
        customer: state.customer,
        note: state.orderNote,
        savedAt: new Date().toISOString(),
        total: state.total,
      }
      return { savedCarts: [...state.savedCarts, saved] }
    })
  },

  loadCart: (id) => {
    set((state) => {
      const cart = state.savedCarts.find((c) => c.id === id)
      if (!cart) return state
      return {
        items: cart.items,
        customer: cart.customer,
        customerName: cart.customer?.name ?? '',
        customerPhone: cart.customer?.phone ?? '',
        orderNote: cart.note,
        customDiscount: 0,
        couponCode: null,
        couponDiscount: 0,
        savedCarts: state.savedCarts.filter((c) => c.id !== id),
        ...computePOSTotals(cart.items, 0, 0),
      }
    })
  },

  deleteSavedCart: (id) =>
    set((state) => ({
      savedCarts: state.savedCarts.filter((c) => c.id !== id),
    })),

  // ── Cash drawer ────────────────────────────────────────────────────────────
  openCashDrawer: (openingCash, cashier) =>
    set({
      cashDrawer: {
        id: `drawer-${Date.now()}`,
        openedAt: new Date().toISOString(),
        openingCash,
        movements: [],
        cashier,
      },
    }),

  closeCashDrawer: (closingCash) => {
    set((state) => {
      if (!state.cashDrawer) return state
      const cashIn = state.cashDrawer.movements
        .filter((m) => m.type === 'in')
        .reduce((s, m) => s + m.amount, 0)
      const cashOut = state.cashDrawer.movements
        .filter((m) => m.type === 'out')
        .reduce((s, m) => s + m.amount, 0)
      const cashSales = state.session?.totalSales ?? 0
      const expectedCash =
        state.cashDrawer.openingCash + cashSales + cashIn - cashOut
      const variance = closingCash - expectedCash
      return {
        cashDrawer: {
          ...state.cashDrawer,
          closedAt: new Date().toISOString(),
          closingCash,
          expectedCash: Math.round(expectedCash),
          variance: Math.round(variance),
        },
      }
    })
  },

  addCashMovement: (amount, type, reason) => {
    set((state) => {
      if (!state.cashDrawer) return state
      const movement: CashMovement = {
        id: `movement-${Date.now()}`,
        amount,
        type,
        reason,
        time: new Date().toISOString(),
      }
      return {
        cashDrawer: {
          ...state.cashDrawer,
          movements: [...state.cashDrawer.movements, movement],
        },
      }
    })
  },

  // ── Completed orders & returns ─────────────────────────────────────────────
  completeOrder: (orderId, cashier) => {
    set((state) => {
      const order: CompletedOrder = {
        id: orderId,
        items: [...state.items],
        customer: state.customer,
        subtotal: state.subtotal,
        discountTotal: state.discountTotal,
        tax: state.tax,
        total: state.total,
        paymentMethod: state.paymentMethod,
        note: state.orderNote,
        cashier,
        completedAt: new Date().toISOString(),
        returned: false,
      }
      return { completedOrders: [order, ...state.completedOrders] }
    })
  },

  processReturn: (orderId, returnItems) => {
    set((state) => ({
      completedOrders: state.completedOrders.map((order) =>
        order.id === orderId ? { ...order, returned: true } : order,
      ),
    }))
  },

  // ── Void ───────────────────────────────────────────────────────────────────
  voidSale: () => {
    set({
      items: [],
      customDiscount: 0,
      couponCode: null,
      couponDiscount: 0,
      customerName: '',
      customerPhone: '',
      note: '',
      orderNote: '',
      customer: null,
      paymentMethod: 'cash',
      ...computePOSTotals([], 0, 0),
    })
  },

  // ── Staff management ───────────────────────────────────────────────────────
  addStaff: (staff) =>
    set((state) => ({
      staffList: [
        ...state.staffList,
        {
          ...staff,
          id: `staff-${Date.now()}`,
          createdAt: new Date().toISOString(),
          totalSales: 0,
          totalOrders: 0,
          initials:
            staff.initials ||
            staff.name
              .split(' ')
              .map((n) => n[0])
              .join('')
              .toUpperCase()
              .slice(0, 2),
        },
      ],
    })),

  updateStaff: (id, data) =>
    set((state) => ({
      staffList: state.staffList.map((s) =>
        s.id === id ? { ...s, ...data } : s,
      ),
    })),

  removeStaff: (id) =>
    set((state) => ({
      staffList: state.staffList.filter((s) => s.id !== id),
    })),

  updateStaffPin: (id, pin) =>
    set((state) => ({
      staffList: state.staffList.map((s) => (s.id === id ? { ...s, pin } : s)),
    })),

  incrementStaffSales: (name, amount) =>
    set((state) => ({
      staffList: state.staffList.map((s) =>
        s.name === name
          ? {
              ...s,
              totalSales: s.totalSales + amount,
              totalOrders: s.totalOrders + 1,
            }
          : s,
      ),
    })),

  // ── Revenue tracking ───────────────────────────────────────────────────────
  addRevenueEntry: (entry) =>
    set((state) => {
      const newEntry: RevenueEntry = {
        ...entry,
        timestamp: new Date().toISOString(),
      }
      // Also update staff sales
      const updatedStaff = entry.cashier
        ? state.staffList.map((s) =>
            s.name === entry.cashier
              ? {
                  ...s,
                  totalSales: s.totalSales + entry.amount,
                  totalOrders: s.totalOrders + 1,
                }
              : s,
          )
        : state.staffList
      return {
        revenueLog: [newEntry, ...state.revenueLog],
        staffList: updatedStaff,
      }
    }),

  getTotalRevenue: () => get().revenueLog.reduce((s, e) => s + e.amount, 0),
  getOnlineRevenue: () =>
    get()
      .revenueLog.filter((e) => e.source === 'online')
      .reduce((s, e) => s + e.amount, 0),
  getPOSRevenue: () =>
    get()
      .revenueLog.filter((e) => e.source === 'pos')
      .reduce((s, e) => s + e.amount, 0),
}))

// ─── User & Auth ───────────────────────────────────────────────
export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'manager' | 'cashier' | 'customer'
  avatar?: string
  createdAt: string
}

// ─── Product ────────────────────────────────────────────────────
export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  parentId?: string
}

export interface ProductVariant {
  id: string
  size?: string
  color?: string
  sku: string
  stock: number
  price: number
}

export interface Product {
  id: string
  name: string
  slug: string
  description: string
  brand: string
  sport: string
  categoryId: string
  price: number
  originalPrice?: number
  images: string[]
  variants?: ProductVariant[]
  stock: number
  sku: string
  rating: number
  reviewCount: number
  badge?: 'NEW' | 'SALE' | 'BESTSELLER' | 'LIMITED'
  inStock: boolean
  tags: string[]
  seo?: {
    title?: string
    description?: string
    keywords?: string[]
  }
  createdAt: string
  updatedAt: string
}

// ─── Cart ───────────────────────────────────────────────────────
export interface CartItem {
  product: Product
  quantity: number
  variant?: ProductVariant
}

export interface Cart {
  items: CartItem[]
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
}

// ─── Order ──────────────────────────────────────────────────────
export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type PaymentMethod = 'card' | 'upi' | 'cash' | 'cod' | 'wallet'

export interface OrderItem {
  productId: string
  productName: string
  sku: string
  quantity: number
  price: number
  total: number
  variant?: ProductVariant
}

export interface ShippingAddress {
  name: string
  phone: string
  line1: string
  line2?: string
  city: string
  state: string
  pincode: string
  country: string
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  customerName: string
  customerEmail: string
  items: OrderItem[]
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: PaymentMethod
  shippingAddress: ShippingAddress
  subtotal: number
  discount: number
  shipping: number
  tax: number
  total: number
  notes?: string
  source: 'website' | 'pos' | 'dashboard'
  createdAt: string
  updatedAt: string
}

// ─── Customer ───────────────────────────────────────────────────
export interface Customer {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  totalOrders: number
  totalSpent: number
  address?: ShippingAddress
  tags: string[]
  createdAt: string
}

// ─── POS ────────────────────────────────────────────────────────
export interface POSCartItem {
  product: Product
  quantity: number
  variant?: ProductVariant
  discount?: number
}

export interface POSSession {
  id: string
  cashierId: string
  cashierName: string
  openedAt: string
  closedAt?: string
  openingCash: number
  closingCash?: number
  totalSales: number
  totalOrders: number
}

// ─── Discount ───────────────────────────────────────────────────
export type DiscountType =
  | 'percentage'
  | 'fixed'
  | 'free_shipping'
  | 'buy_x_get_y'

export interface Discount {
  id: string
  code: string
  type: DiscountType
  value: number
  minOrderAmount?: number
  maxUses?: number
  usedCount: number
  startsAt: string
  expiresAt?: string
  isActive: boolean
  applicableProducts?: string[]
  applicableCategories?: string[]
}

// ─── SEO ────────────────────────────────────────────────────────
export interface SEOMeta {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  ogType?: 'website' | 'product' | 'article'
  canonical?: string
  noIndex?: boolean
}

// ─── Analytics ──────────────────────────────────────────────────
export interface SalesData {
  date: string
  revenue: number
  orders: number
  avgOrderValue: number
}

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalCustomers: number
  totalProducts: number
  revenueChange: number
  ordersChange: number
  customersChange: number
  productsChange: number
}

// ─── API Response ───────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T
  message?: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
}

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

// ─── Staff ────────────────────────────────────────────────────────────────────
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
  // Sales stats
  totalSales: number
  totalOrders: number
}

// ─── Revenue ──────────────────────────────────────────────────────────────────
export interface RevenueEntry {
  source: 'online' | 'pos'
  amount: number
  orderId: string
  timestamp: string
  cashier?: string
}

// ─── Product channel ──────────────────────────────────────────────────────────
export type SalesChannel = 'both' | 'online_only' | 'pos_only'

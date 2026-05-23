'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { usePOSStore } from '@/store/posStore'
import ProductSearch from '@/components/pos/ProductSearch'
import CategoryFilter from '@/components/pos/CategoryFilter'
import ProductGrid, { POSProduct } from '@/components/pos/ProductGrid'
import BillingCart from '@/components/pos/BillingCart'
import PaymentModal from '@/components/pos/PaymentModal'
import Receipt from '@/components/pos/Receipt'
import CustomerSearch from '@/components/pos/CustomerSearch'
import DiscountModal from '@/components/pos/DiscountModal'
import NoteModal from '@/components/pos/NoteModal'
import VoidModal from '@/components/pos/VoidModal'
import SavedCarts from '@/components/pos/SavedCarts'
import CashDrawer from '@/components/pos/CashDrawer'
import ReturnModal from '@/components/pos/ReturnModal'
import AnalyticsTab from '@/components/pos/AnalyticsTab'
import StaffManagement from '@/components/pos/StaffManagement'
import { SITE_NAME } from '@/lib/constants'
import { generateOrderNumber } from '@/lib/utils'

// ─── Mock products ────────────────────────────────────────────────────────────
const MOCK_PRODUCTS: POSProduct[] = [
  // ── Online + POS ───────────────────────────────────────────────────────────
  { id:'1',  name:'Astrox 99 Pro',      brand:'Yonex',   sku:'YX-AX99P',  price:12999, stock:8,  category:'Rackets',     channel:'both'     },
  { id:'2',  name:'Turbo X90 II',       brand:'Li-Ning', sku:'LL-TX90',   price:8499,  stock:3,  category:'Rackets',     channel:'both'     },
  { id:'3',  name:'Hypernano X800',     brand:'Victor',  sku:'VC-HX800',  price:6999,  stock:15, category:'Rackets',     channel:'both'     },
  { id:'4',  name:'Nanoflare 800',      brand:'Yonex',   sku:'YX-NF800',  price:9499,  stock:5,  category:'Rackets',     channel:'both'     },
  { id:'5',  name:'Power Cushion 65Z',  brand:'Yonex',   sku:'YX-PC65Z',  price:5499,  stock:12, category:'Shoes',       channel:'both'     },
  { id:'6',  name:'Adizero Ubersonic',  brand:'Adidas',  sku:'AD-ADZU',   price:4999,  stock:0,  category:'Shoes',       channel:'both'     },
  { id:'7',  name:'Mavis 350 Shuttle',  brand:'Yonex',   sku:'YX-M350',   price:449,   stock:2,  category:'Balls',       channel:'both'     },
  { id:'8',  name:'Pro Staff Ball',     brand:'Wilson',  sku:'WL-PSB',    price:699,   stock:50, category:'Balls',       channel:'both'     },
  { id:'9',  name:'Pro Player Jersey',  brand:'Nivia',   sku:'NV-PPJ',    price:999,   stock:20, category:'Clothing',    channel:'both'     },
  { id:'10', name:'Kit Bag Pro',        brand:'Yonex',   sku:'YX-KBP',    price:2499,  stock:7,  category:'Bags',        channel:'both'     },
  { id:'11', name:'Overgrip Pack',      brand:'Yonex',   sku:'YX-OGP',    price:299,   stock:40, category:'Accessories', channel:'both'     },
  { id:'12', name:'Sport Socks 3pk',    brand:'Nivia',   sku:'NV-SS3',    price:199,   stock:60, category:'Accessories', channel:'both'     },
  { id:'13', name:'Knee Guard Pro',     brand:'Nivia',   sku:'NV-KGP',    price:799,   stock:6,  category:'Protection',  channel:'both'     },

  // ── POS only ───────────────────────────────────────────────────────────────
  { id:'14', name:'Demo Racket (Floor)', brand:'Yonex',  sku:'YX-DEMO1',  price:3999,  stock:3,  category:'Rackets',     channel:'pos_only' },
  { id:'15', name:'Stringing Service',   brand:'Store',  sku:'SVC-STR',   price:499,   stock:99, category:'Services',    channel:'pos_only' },
  { id:'16', name:'Grip Replacement',    brand:'Store',  sku:'SVC-GRP',   price:150,   stock:99, category:'Services',    channel:'pos_only' },
  { id:'17', name:'Racket Bag (Used)',   brand:'Yonex',  sku:'YX-UBG1',   price:899,   stock:2,  category:'Bags',        channel:'pos_only' },
]

const CATEGORIES = [
  'Rackets', 'Shoes', 'Balls',
  'Clothing', 'Bags', 'Accessories', 'Protection', 'Services',
]

type Tab    = 'billing' | 'orders' | 'products' | 'analytics'
type Screen = 'terminal' | 'receipt'

// ─── Topbar ───────────────────────────────────────────────────────────────────
function POSTopbar({
  user,
  tab,
  setTab,
  itemCount,
  onLogout,
  onCashDrawer,
  onStaffManagement,
  cashDrawerOpen,
}: {
  user: any
  tab: Tab
  setTab: (t: Tab) => void
  itemCount: number
  onLogout: () => void
  onCashDrawer: () => void
  onStaffManagement: () => void
  cashDrawerOpen: boolean
}) {
  const [time, setTime] = useState('')

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }))
    update()
    const t = setInterval(update, 10000)
    return () => clearInterval(t)
  }, [])

  const TABS: { id: Tab; label: string }[] = [
    { id: 'billing',   label: 'Billing'   },
    { id: 'orders',    label: 'Orders'    },
    { id: 'products',  label: 'Products'  },
    { id: 'analytics', label: 'Analytics' },
  ]

  return (
    <header
      className='shrink-0'
      style={{ background: '#FFFFFF', borderBottom: '1px solid #E1E3E5' }}
    >
      <div className='flex items-center justify-between px-4 h-12'>

        {/* Logo */}
        <div className='flex items-center gap-2'>
          <svg width='22' height='22' viewBox='0 0 28 28' fill='none'>
            <rect width='28' height='28' rx='6' fill='#008060' />
            <path d='M8 14.5L12 18.5L20 10' stroke='white' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
          </svg>
          <span className='text-sm font-semibold hidden sm:block' style={{ color: '#202223' }}>
            {SITE_NAME} POS
          </span>
        </div>

        {/* Tabs */}
        <div className='flex items-center gap-1'>
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className='relative px-3 py-1.5 text-xs font-medium rounded-lg transition-all'
              style={{
                background: tab === t.id ? '#F2F7F5' : 'transparent',
                color:      tab === t.id ? '#008060' : '#6D7175',
              }}
            >
              {t.label}
              {t.id === 'billing' && itemCount > 0 && (
                <span
                  className='absolute -top-1 -right-1 w-4 h-4 rounded-full text-[9px] font-bold flex items-center justify-center'
                  style={{ background: '#008060', color: '#FFFFFF' }}
                >
                  {itemCount}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Right */}
        <div className='flex items-center gap-2'>

          {/* Time */}
          <div className='hidden sm:flex items-center gap-1.5 text-xs' style={{ color: '#8C9196' }}>
            <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              <circle cx='12' cy='12' r='10' /><polyline points='12 6 12 12 16 14' />
            </svg>
            {time}
          </div>

          {/* Cash drawer */}
          <button
            onClick={onCashDrawer}
            className='hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:border-[#008060]'
            style={{
              background:  cashDrawerOpen ? '#F2F7F5' : '#FFFFFF',
              borderColor: cashDrawerOpen ? '#008060' : '#E1E3E5',
              color:       cashDrawerOpen ? '#008060' : '#6D7175',
            }}
          >
            <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
              <rect x='2' y='7' width='20' height='14' rx='2' />
              <path d='M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2' />
              <line x1='12' y1='12' x2='12' y2='16' />
              <line x1='10' y1='14' x2='14' y2='14' />
            </svg>
            {cashDrawerOpen ? 'Drawer open' : 'Open drawer'}
          </button>

          {/* Staff management — owner/manager only */}
          {(user?.role === 'Owner' || user?.role === 'Manager') && (
            <button
              onClick={onStaffManagement}
              className='hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:border-[#008060] hover:text-[#008060]'
              style={{ background: '#FFFFFF', borderColor: '#E1E3E5', color: '#6D7175' }}
            >
              <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
                <circle cx='9' cy='7' r='4' />
                <path d='M23 21v-2a4 4 0 00-3-3.87' />
                <path d='M16 3.13a4 4 0 010 7.75' />
              </svg>
              Staff
            </button>
          )}

          {/* Staff pill */}
          <div
            className='flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg'
            style={{ background: '#F6F6F7', border: '1px solid #E1E3E5' }}
          >
            <div
              className='w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0'
              style={{ background: '#008060', color: '#FFFFFF' }}
            >
              {user?.initials || 'S'}
            </div>
            <span className='text-xs font-medium hidden sm:block' style={{ color: '#202223' }}>
              {user?.name || 'Staff'}
            </span>
          </div>

          {/* Logout */}
          <button
            onClick={onLogout}
            className='w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[#F6F6F7]'
            style={{ color: '#6D7175' }}
            title='Sign out'
          >
            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
              <path d='M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4' />
              <polyline points='16 17 21 12 16 7' />
              <line x1='21' y1='12' x2='9' y2='12' />
            </svg>
          </button>
        </div>
      </div>
    </header>
  )
}

// ─── Orders Tab ───────────────────────────────────────────────────────────────
function OrdersTab({ onReturn }: { onReturn: () => void }) {
  const { completedOrders } = usePOSStore()

  const MOCK_ORDERS = [
    { id:'POS-09312', customer:'Walk-in',     time:'Today 10:32', items:3, total:4147,  status:'completed'  },
    { id:'POS-09311', customer:'Walk-in',     time:'Today 09:15', items:1, total:8499,  status:'completed'  },
    { id:'AS-18741',  customer:'Priya Nair',  time:'Today 08:50', items:2, total:13448, status:'processing' },
    { id:'POS-09310', customer:'Walk-in',     time:'Yesterday',   items:4, total:2196,  status:'completed'  },
    { id:'AS-18740',  customer:'Karan Singh', time:'Yesterday',   items:1, total:6999,  status:'shipped'    },
  ]

  const statusStyle: Record<string, { bg: string; color: string }> = {
    completed:  { bg: '#E3F1EB', color: '#008060' },
    processing: { bg: '#FFF3CD', color: '#B7791F' },
    shipped:    { bg: '#E8F0FD', color: '#2C6ECB' },
  }

  return (
    <div className='flex-1 overflow-y-auto p-4'>
      <div className='flex justify-end mb-3'>
        <button
          onClick={onReturn}
          className='flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors hover:border-[#008060] hover:text-[#008060]'
          style={{ borderColor: '#E1E3E5', color: '#6D7175', background: '#FFFFFF' }}
        >
          <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
            <polyline points='1 4 1 10 7 10' />
            <path d='M3.51 15a9 9 0 102.13-9.36L1 10' />
          </svg>
          Process return
        </button>
      </div>

      <div className='rounded-xl overflow-hidden' style={{ background: '#FFFFFF', border: '1px solid #E1E3E5' }}>
        <div
          className='grid grid-cols-6 px-4 py-2.5 text-[11px] font-medium uppercase tracking-wide'
          style={{ background: '#F6F6F7', color: '#8C9196', borderBottom: '1px solid #E1E3E5' }}
        >
          <span>Order ID</span>
          <span>Customer</span>
          <span>Time</span>
          <span>Items</span>
          <span>Total</span>
          <span>Status</span>
        </div>

        {/* Live completed orders */}
        {completedOrders.map((o) => (
          <div
            key={o.id}
            className='grid grid-cols-6 px-4 py-3 text-sm items-center transition-colors hover:bg-[#F6F6F7]'
            style={{ borderBottom: '1px solid #F6F6F7' }}
          >
            <span className='font-medium' style={{ color: '#008060' }}>{o.id}</span>
            <span style={{ color: '#202223' }}>{o.customer?.name || 'Walk-in'}</span>
            <span style={{ color: '#8C9196', fontSize: 12 }}>
              {new Date(o.completedAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
            </span>
            <span style={{ color: '#6D7175' }}>{o.items.length}</span>
            <span className='font-medium' style={{ color: '#202223' }}>₹{o.total.toLocaleString('en-IN')}</span>
            <span
              className='text-[11px] px-2 py-0.5 rounded-full font-medium w-fit'
              style={{ background: o.returned ? '#F6F6F7' : '#E3F1EB', color: o.returned ? '#6D7175' : '#008060' }}
            >
              {o.returned ? 'Returned' : 'Completed'}
            </span>
          </div>
        ))}

        {/* Mock historical orders */}
        {MOCK_ORDERS.map((o, i) => (
          <div
            key={o.id}
            className='grid grid-cols-6 px-4 py-3 text-sm items-center transition-colors hover:bg-[#F6F6F7]'
            style={{ borderBottom: i < MOCK_ORDERS.length - 1 ? '1px solid #F6F6F7' : 'none' }}
          >
            <span className='font-medium' style={{ color: '#008060' }}>{o.id}</span>
            <span style={{ color: '#202223' }}>{o.customer}</span>
            <span style={{ color: '#8C9196', fontSize: 12 }}>{o.time}</span>
            <span style={{ color: '#6D7175' }}>{o.items}</span>
            <span className='font-medium' style={{ color: '#202223' }}>₹{o.total.toLocaleString('en-IN')}</span>
            <span
              className='text-[11px] px-2 py-0.5 rounded-full font-medium w-fit'
              style={statusStyle[o.status]}
            >
              {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Products Tab ─────────────────────────────────────────────────────────────
function ProductsTab() {
  const [search, setSearch] = useState('')
  const [cat, setCat]       = useState('All')

  const filtered = MOCK_PRODUCTS.filter((p) => {
    const matchCat    = cat === 'All' || p.category === cat
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-3'>
      <ProductSearch value={search} onChange={setSearch} />
      <CategoryFilter categories={CATEGORIES} selected={cat} onChange={setCat} />
      <div className='rounded-xl overflow-hidden' style={{ background: '#FFFFFF', border: '1px solid #E1E3E5' }}>
        <div
          className='grid grid-cols-6 px-4 py-2.5 text-[11px] font-medium uppercase tracking-wide'
          style={{ background: '#F6F6F7', color: '#8C9196', borderBottom: '1px solid #E1E3E5' }}
        >
          <span className='col-span-2'>Product</span>
          <span>SKU</span>
          <span>Price</span>
          <span>Stock</span>
          <span>Channel</span>
        </div>
        {filtered.map((p, i) => {
          const isOut = p.stock === 0
          const isLow = p.stock > 0 && p.stock <= 3
          return (
            <div
              key={p.id}
              className='grid grid-cols-6 px-4 py-3 text-sm items-center'
              style={{ borderBottom: i < filtered.length - 1 ? '1px solid #F6F6F7' : 'none' }}
            >
              <div className='col-span-2'>
                <p className='font-medium' style={{ color: '#202223' }}>{p.name}</p>
                <p className='text-xs' style={{ color: '#8C9196' }}>{p.brand}</p>
              </div>
              <span className='text-xs' style={{ color: '#8C9196' }}>{p.sku}</span>
              <span className='font-medium' style={{ color: '#202223' }}>₹{p.price.toLocaleString('en-IN')}</span>
              <span className='text-xs font-medium' style={{ color: isOut ? '#D82C0D' : isLow ? '#B7791F' : '#008060' }}>
                {isOut ? 'Out' : isLow ? `${p.stock} left` : `${p.stock}`}
              </span>
              {/* Channel badge */}
              <span
                className='text-[10px] px-1.5 py-0.5 rounded font-medium w-fit'
                style={{
                  background: p.channel === 'pos_only' ? '#FFF3CD' : '#F6F6F7',
                  color:      p.channel === 'pos_only' ? '#B7791F' : '#6D7175',
                }}
              >
                {p.channel === 'pos_only' ? 'POS only' : 'All channels'}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Main Terminal ────────────────────────────────────────────────────────────
export default function POSTerminal() {
  const router = useRouter()

  // ── Auth ────────────────────────────────────────────────────────────────────
  const [user, setUser] = useState<any>(null)
  useEffect(() => {
    const auth = sessionStorage.getItem('pos_authenticated')
    if (!auth) { router.replace('/pos'); return }
    const u = sessionStorage.getItem('pos_user')
    if (u) setUser(JSON.parse(u))
  }, [])

  // ── UI state ────────────────────────────────────────────────────────────────
  const [tab, setTab]         = useState<Tab>('billing')
  const [screen, setScreen]   = useState<Screen>('terminal')
  const [orderId, setOrderId] = useState('')
  const [products, setProducts] = useState<POSProduct[]>(MOCK_PRODUCTS)
  const [search, setSearch]   = useState('')
  const [cat, setCat]         = useState('All')

  // ── Modal state ─────────────────────────────────────────────────────────────
  const [showPayment,    setShowPayment]    = useState(false)
  const [showCustomer,   setShowCustomer]   = useState(false)
  const [showDiscount,   setShowDiscount]   = useState(false)
  const [showNote,       setShowNote]       = useState(false)
  const [showVoid,       setShowVoid]       = useState(false)
  const [showSavedCarts, setShowSavedCarts] = useState(false)
  const [showCashDrawer, setShowCashDrawer] = useState(false)
  const [showReturn,     setShowReturn]     = useState(false)
  const [showStaff,      setShowStaff]      = useState(false)

  // ── Zustand store ───────────────────────────────────────────────────────────
  const {
    items,
    itemCount,
    subtotal,
    discountTotal,
    tax,
    total,
    customDiscount,
    couponCode,
    paymentMethod,
    customer,
    orderNote,
    cashDrawer,
    addItem,
    removeItem,
    updateQuantity,
    setCustomDiscount,
    setPaymentMethod,
    clearCart,
    voidSale,
    completeOrder,
    addRevenueEntry,
  } = usePOSStore()

  // ── Filtered products ───────────────────────────────────────────────────────
  const filtered = products.filter((p) => {
    const matchCat    = cat === 'All' || p.category === cat
    const matchSearch = !search || p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  // ── Add product ─────────────────────────────────────────────────────────────
  const handleAdd = useCallback(
    (p: POSProduct) => {
      addItem({
        id:                p.id,
        name:              p.name,
        brand:             p.brand,
        price:             p.price,
        stock:             p.stock,
        sku:               p.sku,
        category:          p.category,
        images:            [],
        slug:              p.id,
        description:       '',
        isActive:          true,
        isOutOfStock:      p.stock === 0,
        lowStockThreshold: 3,
        tags:              [],
      } as any)
    },
    [addItem],
  )

  // ── Confirm payment ─────────────────────────────────────────────────────────
  const handleConfirmPayment = (method: any) => {
    setPaymentMethod(method)
    // Deduct stock locally
    setProducts((prev) =>
      prev.map((p) => {
        const item = items.find((i) => i.product.id === p.id)
        return item ? { ...p, stock: Math.max(0, p.stock - item.quantity) } : p
      }),
    )
    const id = `POS-${generateOrderNumber()}`
    setOrderId(id)
    // Save to completed orders history (for returns)
    completeOrder(id, user?.name || 'Staff')
    // Track revenue — POS source
    addRevenueEntry({
      source:  'pos',
      amount:  total,
      orderId: id,
      cashier: user?.name || 'Staff',
    })
    setShowPayment(false)
    setScreen('receipt')
  }

  // ── Void sale ───────────────────────────────────────────────────────────────
  const handleVoidConfirm = () => {
    voidSale()
    setShowVoid(false)
  }

  // ── New sale ────────────────────────────────────────────────────────────────
  const handleNewSale = () => {
    clearCart()
    setScreen('terminal')
    setOrderId('')
  }

  // ── Logout ──────────────────────────────────────────────────────────────────
  const handleLogout = () => {
    sessionStorage.removeItem('pos_authenticated')
    sessionStorage.removeItem('pos_user')
    router.replace('/pos')
  }

  return (
    <div className='flex flex-col h-screen overflow-hidden' style={{ background: '#F6F6F7' }}>

      {/* Topbar */}
      <POSTopbar
        user={user}
        tab={tab}
        setTab={setTab}
        itemCount={itemCount}
        onLogout={handleLogout}
        onCashDrawer={() => setShowCashDrawer(true)}
        onStaffManagement={() => setShowStaff(true)}
        cashDrawerOpen={!!cashDrawer && !cashDrawer.closedAt}
      />

      {/* Receipt screen */}
      {screen === 'receipt' ? (
        <Receipt
          orderId={orderId}
          items={items.map((i) => ({
            id:       i.product.id,
            name:     i.product.name,
            brand:    i.product.brand    ?? '',
            price:    i.product.price,
            quantity: i.quantity,
            sku:      i.product.sku      ?? '',
            stock:    i.product.stock    ?? 0,
            category: i.product.category ?? '',
          }))}
          subtotal={subtotal}
          discount={customDiscount}
          discountAmount={discountTotal}
          gst={tax}
          total={total}
          payMethod={paymentMethod}
          cashier={user?.name || 'Staff'}
          onNewSale={handleNewSale}
          onPrint={() => window.print()}
          onEmail={() => alert('Email receipt coming soon!')}
        />
      ) : (
        <>
          {/* ── Billing tab ──────────────────────────────────────────────── */}
          {tab === 'billing' && (
            <div className='flex-1 flex flex-col md:flex-row overflow-hidden'>

              {/* Left — products */}
              <div className='flex-1 flex flex-col overflow-hidden p-3 gap-3'>
                <ProductSearch
                  value={search}
                  onChange={setSearch}
                  onScan={() => {
                    const inStock = products.filter((p) => p.stock > 0)
                    if (inStock.length > 0) {
                      const random = inStock[Math.floor(Math.random() * inStock.length)]
                      handleAdd(random)
                    }
                  }}
                />
                <CategoryFilter categories={CATEGORIES} selected={cat} onChange={setCat} />
                <div className='flex-1 overflow-y-auto'>
                  <ProductGrid products={filtered} onAdd={handleAdd} />
                </div>
              </div>

              {/* Right — cart */}
              <div
                className='w-full md:w-72 lg:w-80 shrink-0 flex flex-col border-t md:border-t-0'
                style={{ borderColor: '#E1E3E5' }}
              >
                {/* Cart action buttons */}
                <div
                  className='flex items-center gap-1.5 px-3 py-2 shrink-0'
                  style={{ background: '#FFFFFF', borderBottom: '1px solid #E1E3E5' }}
                >
                  {/* Customer */}
                  <button
                    onClick={() => setShowCustomer(true)}
                    className='flex items-center gap-1 px-2 py-1.5 rounded text-xs border transition-colors hover:border-[#008060] hover:text-[#008060] flex-1'
                    style={{
                      borderColor: customer ? '#008060' : '#E1E3E5',
                      color:       customer ? '#008060' : '#6D7175',
                      background:  customer ? '#F2F7F5' : '#FFFFFF',
                    }}
                  >
                    <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                      <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' /><circle cx='12' cy='7' r='4' />
                    </svg>
                    <span className='truncate'>{customer ? customer.name : 'Customer'}</span>
                  </button>

                  {/* Note */}
                  <button
                    onClick={() => setShowNote(true)}
                    className='p-1.5 rounded border transition-colors hover:border-[#008060] hover:text-[#008060]'
                    style={{
                      borderColor: orderNote ? '#008060' : '#E1E3E5',
                      color:       orderNote ? '#008060' : '#6D7175',
                      background:  orderNote ? '#F2F7F5' : '#FFFFFF',
                    }}
                    title='Add note'
                  >
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
                      <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
                    </svg>
                  </button>

                  {/* Discount */}
                  <button
                    onClick={() => setShowDiscount(true)}
                    className='p-1.5 rounded border transition-colors hover:border-[#008060] hover:text-[#008060]'
                    style={{
                      borderColor: customDiscount > 0 || couponCode ? '#008060' : '#E1E3E5',
                      color:       customDiscount > 0 || couponCode ? '#008060' : '#6D7175',
                      background:  customDiscount > 0 || couponCode ? '#F2F7F5' : '#FFFFFF',
                    }}
                    title='Add discount'
                  >
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                      <path d='M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z' />
                      <line x1='7' y1='7' x2='7.01' y2='7' />
                    </svg>
                  </button>

                  {/* Saved carts */}
                  <button
                    onClick={() => setShowSavedCarts(true)}
                    className='p-1.5 rounded border transition-colors hover:border-[#008060] hover:text-[#008060]'
                    style={{ borderColor: '#E1E3E5', color: '#6D7175', background: '#FFFFFF' }}
                    title='Saved carts'
                  >
                    <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                      <path d='M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z' />
                      <polyline points='17 21 17 13 7 13 7 21' />
                      <polyline points='7 3 7 8 15 8' />
                    </svg>
                  </button>

                  {/* Void */}
                  {items.length > 0 && (
                    <button
                      onClick={() => setShowVoid(true)}
                      className='p-1.5 rounded border transition-colors hover:border-[#D82C0D] hover:text-[#D82C0D]'
                      style={{ borderColor: '#E1E3E5', color: '#6D7175', background: '#FFFFFF' }}
                      title='Void sale'
                    >
                      <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round'>
                        <circle cx='12' cy='12' r='10' />
                        <line x1='4.93' y1='4.93' x2='19.07' y2='19.07' />
                      </svg>
                    </button>
                  )}
                </div>

                {/* Order note indicator */}
                {orderNote && (
                  <div
                    className='px-3 py-1.5 flex items-center gap-2 text-xs shrink-0'
                    style={{ background: '#FFFBEB', borderBottom: '1px solid #FDE68A' }}
                  >
                    <svg width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='#B7791F' strokeWidth='2' strokeLinecap='round'>
                      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
                      <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
                    </svg>
                    <span className='truncate flex-1' style={{ color: '#B7791F' }}>{orderNote}</span>
                  </div>
                )}

                {/* Billing cart */}
                <div className='flex-1 overflow-hidden'>
                  <BillingCart
                    items={items.map((i) => ({
                      id:       i.product.id,
                      name:     i.product.name,
                      brand:    i.product.brand    ?? '',
                      price:    i.product.price,
                      quantity: i.quantity,
                      sku:      i.product.sku      ?? '',
                      stock:    i.product.stock    ?? 0,
                      category: i.product.category ?? '',
                    }))}
                    discount={customDiscount}
                    discountAmount={discountTotal}
                    gst={tax}
                    total={total}
                    subtotal={subtotal}
                    onIncrease={(id) => {
                      const item = items.find((i) => i.product.id === id)
                      if (item) updateQuantity(id, item.quantity + 1)
                    }}
                    onDecrease={(id) => {
                      const item = items.find((i) => i.product.id === id)
                      if (item) updateQuantity(id, item.quantity - 1)
                    }}
                    onRemove={(id) => removeItem(id)}
                    onDiscountChange={setCustomDiscount}
                    onCharge={() => setShowPayment(true)}
                    onClear={clearCart}
                  />
                </div>
              </div>
            </div>
          )}

          {/* ── Orders tab ───────────────────────────────────────────────── */}
          {tab === 'orders' && (
            <div className='flex-1 flex flex-col overflow-hidden'>
              <OrdersTab onReturn={() => setShowReturn(true)} />
            </div>
          )}

          {/* ── Products tab ─────────────────────────────────────────────── */}
          {tab === 'products' && (
            <div className='flex-1 flex flex-col overflow-hidden'>
              <ProductsTab />
            </div>
          )}

          {/* ── Analytics tab ────────────────────────────────────────────── */}
          {tab === 'analytics' && (
            <div className='flex-1 flex flex-col overflow-hidden'>
              <AnalyticsTab />
            </div>
          )}
        </>
      )}

      {/* ── Modals ───────────────────────────────────────────────────────────── */}
      {showPayment    && <PaymentModal    total={total}              onConfirm={handleConfirmPayment}    onClose={() => setShowPayment(false)}    />}
      {showCustomer   && <CustomerSearch                             onClose={() => setShowCustomer(false)}                                       />}
      {showDiscount   && <DiscountModal                              onClose={() => setShowDiscount(false)}                                        />}
      {showNote       && <NoteModal                                  onClose={() => setShowNote(false)}                                            />}
      {showVoid       && <VoidModal       onConfirm={handleVoidConfirm} onClose={() => setShowVoid(false)}                                        />}
      {showSavedCarts && <SavedCarts      onClose={() => setShowSavedCarts(false)} onSave={() => setShowSavedCarts(false)}                         />}
      {showCashDrawer && <CashDrawer                                 onClose={() => setShowCashDrawer(false)}                                      />}
      {showReturn     && <ReturnModal                                onClose={() => setShowReturn(false)}                                          />}
      {showStaff      && <StaffManagement                            onClose={() => setShowStaff(false)}                                           />}
    </div>
  )
}
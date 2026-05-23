'use client'

import { Suspense, useState } from 'react'
import Link from 'next/link'
import { useSearchParams, useRouter } from 'next/navigation'

const Icons = {
  search: (
    <svg
      width='13'
      height='13'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#8C9196'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='11' cy='11' r='8' />
      <line x1='21' y1='21' x2='16.65' y2='16.65' />
    </svg>
  ),
  eye: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  ),
  print: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='6 9 6 2 18 2 18 9' />
      <path d='M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2' />
      <rect x='6' y='14' width='12' height='8' />
    </svg>
  ),
  cancel: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <line x1='15' y1='9' x2='9' y2='15' />
      <line x1='9' y1='9' x2='15' y2='15' />
    </svg>
  ),
  close: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='18' y1='6' x2='6' y2='18' />
      <line x1='6' y1='6' x2='18' y2='18' />
    </svg>
  ),
  plus: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='12' y1='5' x2='12' y2='19' />
      <line x1='5' y1='12' x2='19' y2='12' />
    </svg>
  ),
  download: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' />
      <polyline points='7 10 12 15 17 10' />
      <line x1='12' y1='15' x2='12' y2='3' />
    </svg>
  ),
  mail: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' />
      <polyline points='22,6 12,13 2,6' />
    </svg>
  ),
  cart: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='9' cy='21' r='1' />
      <circle cx='20' cy='21' r='1' />
      <path d='M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6' />
    </svg>
  ),
  clock: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='10' />
      <polyline points='12 6 12 12 16 14' />
    </svg>
  ),
}

// ── Types ─────────────────────────────────────────────────────────────────────

type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'
type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

interface Order {
  id: string
  orderNumber: string
  customer: string
  email: string
  phone: string
  amount: number
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  items: number
  source: 'website' | 'pos' | 'dashboard'
  date: string
  city: string
}

interface DraftOrder {
  id: string
  customer: string
  email: string
  amount: number
  items: number
  date: string
  note: string
}

interface AbandonedCheckout {
  id: string
  customer: string
  email: string
  phone: string
  amount: number
  items: number
  abandonedAt: string
  recoveryEmailSent: boolean
  stage: 'cart' | 'shipping' | 'payment'
}

// ── Data ──────────────────────────────────────────────────────────────────────

const ORDERS: Order[] = [
  {
    id: '1',
    orderNumber: 'AS-482910',
    customer: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    phone: '+91 98765 43210',
    amount: 4999,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    items: 2,
    source: 'website',
    date: 'May 17, 2025',
    city: 'Mumbai',
  },
  {
    id: '2',
    orderNumber: 'AS-482909',
    customer: 'Priya Mehta',
    email: 'priya@gmail.com',
    phone: '+91 87654 32109',
    amount: 12499,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    items: 3,
    source: 'website',
    date: 'May 17, 2025',
    city: 'Delhi',
  },
  {
    id: '3',
    orderNumber: 'AS-482908',
    customer: 'Arjun Singh',
    email: 'arjun@gmail.com',
    phone: '+91 76543 21098',
    amount: 3499,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    items: 1,
    source: 'website',
    date: 'May 16, 2025',
    city: 'Bangalore',
  },
  {
    id: '4',
    orderNumber: 'AS-482907',
    customer: 'Sneha Patel',
    email: 'sneha@gmail.com',
    phone: '+91 65432 10987',
    amount: 8999,
    status: 'pending',
    paymentStatus: 'pending',
    paymentMethod: 'COD',
    items: 4,
    source: 'website',
    date: 'May 16, 2025',
    city: 'Ahmedabad',
  },
  {
    id: '5',
    orderNumber: 'AS-482906',
    customer: 'Vikram Nair',
    email: 'vikram@gmail.com',
    phone: '+91 54321 09876',
    amount: 2199,
    status: 'cancelled',
    paymentStatus: 'refunded',
    paymentMethod: 'Card',
    items: 1,
    source: 'website',
    date: 'May 15, 2025',
    city: 'Chennai',
  },
  {
    id: '6',
    orderNumber: 'AS-482905',
    customer: 'Anjali Gupta',
    email: 'anjali@gmail.com',
    phone: '+91 43210 98765',
    amount: 6799,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    items: 2,
    source: 'pos',
    date: 'May 15, 2025',
    city: 'Pune',
  },
  {
    id: '7',
    orderNumber: 'AS-482904',
    customer: 'Rohit Kumar',
    email: 'rohit@gmail.com',
    phone: '+91 32109 87654',
    amount: 15999,
    status: 'confirmed',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    items: 5,
    source: 'website',
    date: 'May 14, 2025',
    city: 'Hyderabad',
  },
  {
    id: '8',
    orderNumber: 'AS-482903',
    customer: 'Kavya Reddy',
    email: 'kavya@gmail.com',
    phone: '+91 21098 76543',
    amount: 3299,
    status: 'shipped',
    paymentStatus: 'paid',
    paymentMethod: 'Wallet',
    items: 1,
    source: 'website',
    date: 'May 14, 2025',
    city: 'Kolkata',
  },
  {
    id: '9',
    orderNumber: 'AS-482902',
    customer: 'Amit Joshi',
    email: 'amit@gmail.com',
    phone: '+91 10987 65432',
    amount: 9499,
    status: 'processing',
    paymentStatus: 'paid',
    paymentMethod: 'UPI',
    items: 3,
    source: 'pos',
    date: 'May 13, 2025',
    city: 'Jaipur',
  },
  {
    id: '10',
    orderNumber: 'AS-482901',
    customer: 'Meera Iyer',
    email: 'meera@gmail.com',
    phone: '+91 09876 54321',
    amount: 4599,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'Card',
    items: 2,
    source: 'website',
    date: 'May 13, 2025',
    city: 'Surat',
  },
  {
    id: '11',
    orderNumber: 'AS-482900',
    customer: 'Suresh Babu',
    email: 'suresh@gmail.com',
    phone: '+91 98765 12345',
    amount: 7299,
    status: 'refunded',
    paymentStatus: 'refunded',
    paymentMethod: 'UPI',
    items: 2,
    source: 'website',
    date: 'May 12, 2025',
    city: 'Lucknow',
  },
  {
    id: '12',
    orderNumber: 'AS-482899',
    customer: 'Divya Sharma',
    email: 'divya@gmail.com',
    phone: '+91 87654 23456',
    amount: 2899,
    status: 'delivered',
    paymentStatus: 'paid',
    paymentMethod: 'COD',
    items: 1,
    source: 'website',
    date: 'May 12, 2025',
    city: 'Bhopal',
  },
]

const DRAFT_ORDERS: DraftOrder[] = [
  {
    id: 'D-001',
    customer: 'Walk-in Customer',
    email: '',
    amount: 5499,
    items: 2,
    date: 'May 17, 2025',
    note: 'Football boots + shin guards',
  },
  {
    id: 'D-002',
    customer: 'Ravi Verma',
    email: 'ravi@gmail.com',
    amount: 12999,
    items: 3,
    date: 'May 16, 2025',
    note: 'Cricket kit bundle',
  },
  {
    id: 'D-003',
    customer: 'Neha Kapoor',
    email: 'neha@gmail.com',
    amount: 3499,
    items: 1,
    date: 'May 15, 2025',
    note: 'Tennis racket, awaiting size confirmation',
  },
  {
    id: 'D-004',
    customer: 'Walk-in Customer',
    email: '',
    amount: 1899,
    items: 2,
    date: 'May 14, 2025',
    note: 'Running accessories',
  },
]

const ABANDONED_CHECKOUTS: AbandonedCheckout[] = [
  {
    id: 'AC-001',
    customer: 'Rahul M.',
    email: 'rahulm@gmail.com',
    phone: '+91 99887 76655',
    amount: 8999,
    items: 3,
    abandonedAt: '2h ago',
    recoveryEmailSent: true,
    stage: 'payment',
  },
  {
    id: 'AC-002',
    customer: 'Pooja Singh',
    email: 'pooja@gmail.com',
    phone: '+91 88776 65544',
    amount: 4599,
    items: 2,
    abandonedAt: '4h ago',
    recoveryEmailSent: false,
    stage: 'shipping',
  },
  {
    id: 'AC-003',
    customer: 'Guest User',
    email: 'guest123@gmail.com',
    phone: '',
    amount: 2199,
    items: 1,
    abandonedAt: '6h ago',
    recoveryEmailSent: false,
    stage: 'cart',
  },
  {
    id: 'AC-004',
    customer: 'Arun Nair',
    email: 'arun@gmail.com',
    phone: '+91 77665 54433',
    amount: 15499,
    items: 4,
    abandonedAt: '1d ago',
    recoveryEmailSent: true,
    stage: 'payment',
  },
  {
    id: 'AC-005',
    customer: 'Simi Thomas',
    email: 'simi@gmail.com',
    phone: '+91 66554 43322',
    amount: 6799,
    items: 2,
    abandonedAt: '1d ago',
    recoveryEmailSent: true,
    stage: 'shipping',
  },
]

// ── Styles / constants ────────────────────────────────────────────────────────

const ORDER_STATUS_STYLES: Record<OrderStatus, string> = {
  pending: 'bg-[#FFC453]/20 text-[#916A00]',
  confirmed: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
  processing: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-[#008060]/10 text-[#008060]',
  cancelled: 'bg-[#D82C0D]/10 text-[#D82C0D]',
  refunded: 'bg-[#6D7175]/10 text-[#6D7175]',
}

const PAYMENT_STATUS_STYLES: Record<PaymentStatus, string> = {
  pending: 'bg-[#FFC453]/20 text-[#916A00]',
  paid: 'bg-[#008060]/10 text-[#008060]',
  failed: 'bg-[#D82C0D]/10 text-[#D82C0D]',
  refunded: 'bg-[#6D7175]/10 text-[#6D7175]',
}

const SOURCE_ICONS: Record<string, string> = {
  website: '🌐',
  pos: '🖥️',
  dashboard: '⚙️',
}

const STAGE_STYLES: Record<string, string> = {
  cart: 'bg-[#6D7175]/10 text-[#6D7175]',
  shipping: 'bg-[#FFC453]/20 text-[#916A00]',
  payment: 'bg-[#D82C0D]/10 text-[#D82C0D]',
}

const ALL_STATUSES = [
  'All',
  'Pending',
  'Confirmed',
  'Processing',
  'Shipped',
  'Delivered',
  'Cancelled',
  'Refunded',
]

// ── Helpers ───────────────────────────────────────────────────────────────────

function formatCurrency(n: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

function statusDot(status: OrderStatus): string {
  if (status === 'delivered') return 'bg-[#008060]'
  if (status === 'shipped') return 'bg-purple-500'
  if (status === 'processing' || status === 'confirmed') return 'bg-[#2C6ECB]'
  if (status === 'pending') return 'bg-[#FFC453]'
  return 'bg-[#D82C0D]'
}

// ── Main content (uses useSearchParams — must be inside Suspense) ──────────────

function OrdersPageContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const statusParam = searchParams.get('status')
  const view =
    statusParam === 'draft'
      ? 'draft'
      : statusParam === 'abandoned'
        ? 'abandoned'
        : 'all'

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const [dateRange, setDateRange] = useState('last30')
  const pageSize = 8

  function setTab(tab: string) {
    setSearch('')
    setSelectedIds([])
    setPage(1)
    if (tab === 'all') router.push('/dashboard/orders')
    else router.push(`/dashboard/orders?status=${tab}`)
  }

  const filteredOrders = ORDERS.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.city.toLowerCase().includes(search.toLowerCase())
    const matchStatus =
      statusFilter === 'All' || o.status === statusFilter.toLowerCase()
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filteredOrders.length / pageSize)
  const paginatedOrders = filteredOrders.slice(
    (page - 1) * pageSize,
    page * pageSize,
  )

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  const toggleAll = () =>
    setSelectedIds(
      selectedIds.length === paginatedOrders.length
        ? []
        : paginatedOrders.map((o) => o.id),
    )

  const totalRevenue = ORDERS.reduce(
    (s, o) => s + (o.paymentStatus === 'paid' ? o.amount : 0),
    0,
  )
  const pendingOrders = ORDERS.filter((o) => o.status === 'pending').length
  const avgOrder = Math.round(
    totalRevenue / ORDERS.filter((o) => o.paymentStatus === 'paid').length,
  )

  const TABS = [
    { id: 'all', label: 'All Orders', count: ORDERS.length },
    { id: 'draft', label: 'Drafts', count: DRAFT_ORDERS.length },
    {
      id: 'abandoned',
      label: 'Abandoned Checkouts',
      count: ABANDONED_CHECKOUTS.length,
    },
  ]

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Orders
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            {ORDERS.length} orders total
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className='px-3 py-2 border border-[#E1E3E5] bg-white rounded-lg text-[13px] text-[#202223] outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            <option value='today'>Today</option>
            <option value='last7'>Last 7 days</option>
            <option value='last30'>Last 30 days</option>
            <option value='last90'>Last 90 days</option>
          </select>
          <button className='flex items-center gap-1.5 px-3 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg cursor-pointer transition-colors'>
            {Icons.download} Export
          </button>
          <button className='flex items-center gap-1.5 px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer transition-colors'>
            {Icons.plus} Create Order
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
        {[
          {
            label: 'Total Revenue',
            value: formatCurrency(totalRevenue),
            color: 'text-[#008060]',
            bg: 'bg-[#008060]/10',
            change: '+12.5%',
          },
          {
            label: 'Total Orders',
            value: ORDERS.length,
            color: 'text-[#2C6ECB]',
            bg: 'bg-[#2C6ECB]/10',
            change: '+8.2%',
          },
          {
            label: 'Pending Orders',
            value: pendingOrders,
            color: 'text-[#916A00]',
            bg: 'bg-[#FFC453]/20',
            change: '-3.1%',
          },
          {
            label: 'Avg Order Value',
            value: formatCurrency(avgOrder),
            color: 'text-[#202223]',
            bg: 'bg-[#F6F6F7]',
            change: '+5.4%',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className='bg-white border border-[#E1E3E5] rounded-xl p-5'
          >
            <div className='flex items-center justify-between mb-2'>
              <div className={`w-9 h-9 ${stat.bg} rounded-lg`} />
              <span
                className={`text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${stat.change.startsWith('+') ? 'bg-[#008060]/10 text-[#008060]' : 'bg-[#D82C0D]/10 text-[#D82C0D]'}`}
              >
                {stat.change}
              </span>
            </div>
            <p className='text-[12.5px] text-[#6D7175] mb-1'>{stat.label}</p>
            <p
              className={`font-sora text-[22px] font-bold leading-tight ${stat.color}`}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        {/* Tabs */}
        <div className='flex items-center border-b border-[#E1E3E5] px-4 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`px-4 py-3 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${view === tab.id ? 'border-b-[#008060] text-[#008060]' : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'}`}
            >
              {tab.label}{' '}
              <span className='ml-1.5 text-[10.5px] text-[#8C9196]'>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── All Orders ── */}
        {view === 'all' && (
          <>
            {/* Search + filter */}
            <div className='flex items-center gap-3 px-4 py-3 border-b border-[#E1E3E5] flex-wrap'>
              <div className='flex items-center gap-2 flex-1 min-w-[200px] px-3 py-2 border border-[#E1E3E5] rounded-lg bg-[#F6F6F7] focus-within:border-[#008060] focus-within:bg-white transition-all'>
                {Icons.search}
                <input
                  type='text'
                  placeholder='Search orders, customers...'
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value)
                    setPage(1)
                  }}
                  className='flex-1 bg-transparent text-[13px] text-[#202223] placeholder-[#8C9196] outline-none'
                />
                {search && (
                  <button
                    onClick={() => setSearch('')}
                    className='text-[#8C9196] bg-transparent border-none cursor-pointer'
                  >
                    {Icons.close}
                  </button>
                )}
              </div>
              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value)
                  setPage(1)
                }}
                className='px-3 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
              >
                {ALL_STATUSES.map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Status sub-tabs */}
            <div className='flex items-center border-b border-[#E1E3E5] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden px-4'>
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatusFilter(s)
                    setPage(1)
                  }}
                  className={`px-3 py-2.5 text-[12.5px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${statusFilter === s ? 'border-b-[#008060] text-[#008060]' : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'}`}
                >
                  {s}{' '}
                  <span className='ml-1 text-[10.5px] text-[#8C9196]'>
                    {s === 'All'
                      ? ORDERS.length
                      : ORDERS.filter((o) => o.status === s.toLowerCase())
                          .length}
                  </span>
                </button>
              ))}
            </div>

            {/* Bulk actions */}
            {selectedIds.length > 0 && (
              <div className='flex items-center gap-3 px-4 py-2.5 bg-[#008060]/[0.08] border-b border-[#008060]/20'>
                <span className='text-[13px] font-medium text-[#008060]'>
                  {selectedIds.length} selected
                </span>
                <div className='flex gap-2'>
                  {[
                    'Mark Delivered',
                    'Mark Cancelled',
                    'Print Labels',
                    'Export',
                  ].map((a) => (
                    <button
                      key={a}
                      className='px-3 py-1.5 text-[12px] border border-[#E1E3E5] text-[#202223] rounded-lg hover:bg-white bg-transparent cursor-pointer transition-colors'
                    >
                      {a}
                    </button>
                  ))}
                </div>
                <button
                  onClick={() => setSelectedIds([])}
                  className='ml-auto text-[#6D7175] bg-transparent border-none cursor-pointer'
                >
                  {Icons.close}
                </button>
              </div>
            )}

            {/* Table */}
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
                    <th className='w-10 px-4 py-3'>
                      <input
                        type='checkbox'
                        checked={
                          selectedIds.length === paginatedOrders.length &&
                          paginatedOrders.length > 0
                        }
                        onChange={toggleAll}
                        className='w-4 h-4 rounded accent-[#008060] cursor-pointer'
                      />
                    </th>
                    {[
                      'Order',
                      'Customer',
                      'Date',
                      'Amount',
                      'Status',
                      'Payment',
                      'Source',
                      'Actions',
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide ${i === 7 ? 'text-right' : 'text-left'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-[#F1F1F1]'>
                  {paginatedOrders.length === 0 ? (
                    <tr>
                      <td colSpan={9} className='px-4 py-16 text-center'>
                        <p className='text-[14px] font-medium text-[#202223]'>
                          No orders found
                        </p>
                        <p className='text-[13px] text-[#6D7175]'>
                          Try adjusting your filters
                        </p>
                      </td>
                    </tr>
                  ) : (
                    paginatedOrders.map((order) => (
                      <tr
                        key={order.id}
                        className={`hover:bg-[#F6F6F7] transition-colors ${selectedIds.includes(order.id) ? 'bg-[#F2F7F5]' : ''}`}
                      >
                        <td className='px-4 py-3'>
                          <input
                            type='checkbox'
                            checked={selectedIds.includes(order.id)}
                            onChange={() => toggleSelect(order.id)}
                            className='w-4 h-4 rounded accent-[#008060] cursor-pointer'
                          />
                        </td>
                        <td className='px-4 py-3'>
                          <Link
                            href={`/dashboard/orders/${order.id}`}
                            className='text-[13px] font-semibold text-[#2C6ECB] hover:text-[#1a4f9e] no-underline'
                          >
                            {order.orderNumber}
                          </Link>
                          <p className='text-[11px] text-[#8C9196]'>
                            {order.items} item{order.items > 1 ? 's' : ''}
                          </p>
                        </td>
                        <td className='px-4 py-3'>
                          <div className='flex items-center gap-2.5'>
                            <div className='w-7 h-7 rounded-full bg-[#008060]/10 flex items-center justify-center text-[#008060] text-[11px] font-bold shrink-0'>
                              {order.customer.charAt(0)}
                            </div>
                            <div className='min-w-0'>
                              <p className='text-[13px] font-medium text-[#202223] truncate'>
                                {order.customer}
                              </p>
                              <p className='text-[11px] text-[#8C9196]'>
                                {order.city}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className='px-4 py-3'>
                          <span className='text-[12.5px] text-[#6D7175]'>
                            {order.date}
                          </span>
                        </td>
                        <td className='px-4 py-3'>
                          <span className='text-[13px] font-semibold text-[#202223]'>
                            {formatCurrency(order.amount)}
                          </span>
                        </td>
                        <td className='px-4 py-3'>
                          <span
                            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${ORDER_STATUS_STYLES[order.status]}`}
                          >
                            <span
                              className={`w-1.5 h-1.5 rounded-full ${statusDot(order.status)}`}
                            />
                            {order.status}
                          </span>
                        </td>
                        <td className='px-4 py-3'>
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium capitalize ${PAYMENT_STATUS_STYLES[order.paymentStatus]}`}
                          >
                            {order.paymentStatus}
                          </span>
                          <p className='text-[10.5px] text-[#8C9196] mt-0.5'>
                            {order.paymentMethod}
                          </p>
                        </td>
                        <td className='px-4 py-3'>
                          <span className='text-base'>
                            {SOURCE_ICONS[order.source]}
                          </span>
                        </td>
                        <td className='px-4 py-3'>
                          <div className='flex items-center justify-end gap-1'>
                            <Link
                              href={`/dashboard/orders/${order.id}`}
                              className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg no-underline transition-all'
                              title='View'
                            >
                              {Icons.eye}
                            </Link>
                            <button
                              className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
                              title='Print'
                            >
                              {Icons.print}
                            </button>
                            <button
                              className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#D82C0D] hover:bg-[#D82C0D]/5 rounded-lg bg-transparent border-none cursor-pointer'
                              title='Cancel'
                            >
                              {Icons.cancel}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className='flex items-center justify-between px-4 py-3 border-t border-[#E1E3E5]'>
              <p className='text-[12.5px] text-[#6D7175]'>
                Showing{' '}
                <span className='font-medium text-[#202223]'>
                  {Math.min((page - 1) * pageSize + 1, filteredOrders.length)}–
                  {Math.min(page * pageSize, filteredOrders.length)}
                </span>{' '}
                of{' '}
                <span className='font-medium text-[#202223]'>
                  {filteredOrders.length}
                </span>
              </p>
              <div className='flex items-center gap-1'>
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className='px-3 py-1.5 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#6D7175] bg-white cursor-pointer hover:bg-[#F6F6F7] disabled:opacity-40 transition-colors'
                >
                  ← Prev
                </button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setPage(i + 1)}
                    className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium cursor-pointer transition-colors ${page === i + 1 ? 'bg-[#008060] text-white border-none' : 'border border-[#E1E3E5] text-[#6D7175] bg-white hover:bg-[#F6F6F7]'}`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className='px-3 py-1.5 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#6D7175] bg-white cursor-pointer hover:bg-[#F6F6F7] disabled:opacity-40 transition-colors'
                >
                  Next →
                </button>
              </div>
            </div>
          </>
        )}

        {/* ── Draft Orders ── */}
        {view === 'draft' && (
          <div>
            <div className='px-5 py-4 border-b border-[#E1E3E5] bg-[#FFC453]/5'>
              <p className='text-[13px] text-[#916A00] flex items-center gap-2'>
                <span>{Icons.clock}</span>Draft orders are saved but not yet
                confirmed. Complete or delete them.
              </p>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
                    {[
                      'Draft ID',
                      'Customer',
                      'Date',
                      'Items',
                      'Amount',
                      'Note',
                      'Actions',
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide ${i === 6 ? 'text-right' : 'text-left'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-[#F1F1F1]'>
                  {DRAFT_ORDERS.map((draft) => (
                    <tr
                      key={draft.id}
                      className='hover:bg-[#F6F6F7] transition-colors'
                    >
                      <td className='px-4 py-3'>
                        <span className='text-[13px] font-semibold text-[#202223]'>
                          {draft.id}
                        </span>
                        <span className='ml-2 px-2 py-0.5 bg-[#FFC453]/20 text-[#916A00] text-[10px] font-semibold rounded-full'>
                          Draft
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <p className='text-[13px] font-medium text-[#202223]'>
                          {draft.customer}
                        </p>
                        {draft.email && (
                          <p className='text-[11.5px] text-[#8C9196]'>
                            {draft.email}
                          </p>
                        )}
                      </td>
                      <td className='px-4 py-3'>
                        <span className='text-[12.5px] text-[#6D7175]'>
                          {draft.date}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <span className='text-[13px] text-[#202223]'>
                          {draft.items}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <span className='text-[13px] font-semibold text-[#202223]'>
                          {formatCurrency(draft.amount)}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <p className='text-[12px] text-[#6D7175] max-w-[180px] truncate'>
                          {draft.note}
                        </p>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center justify-end gap-2'>
                          <button className='px-3 py-1.5 bg-[#008060] hover:bg-[#006e52] text-white text-[12px] font-medium rounded-lg border-none cursor-pointer transition-colors'>
                            Complete
                          </button>
                          <button className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#D82C0D] hover:bg-[#D82C0D]/5 rounded-lg bg-transparent border-none cursor-pointer'>
                            {Icons.cancel}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='px-4 py-3 border-t border-[#E1E3E5]'>
              <p className='text-[12.5px] text-[#6D7175]'>
                {DRAFT_ORDERS.length} draft orders · Total value:{' '}
                <span className='font-medium text-[#202223]'>
                  {formatCurrency(
                    DRAFT_ORDERS.reduce((s, d) => s + d.amount, 0),
                  )}
                </span>
              </p>
            </div>
          </div>
        )}

        {/* ── Abandoned Checkouts ── */}
        {view === 'abandoned' && (
          <div>
            <div className='px-5 py-4 border-b border-[#E1E3E5] bg-[#D82C0D]/5'>
              <div className='flex items-center justify-between'>
                <p className='text-[13px] text-[#D82C0D] flex items-center gap-2'>
                  <span>{Icons.cart}</span>
                  {ABANDONED_CHECKOUTS.length} customers left without completing
                  their purchase. Send recovery emails to win them back.
                </p>
                <button className='flex items-center gap-1.5 px-3 py-1.5 bg-[#D82C0D] hover:bg-[#be2209] text-white text-[12.5px] font-medium rounded-lg border-none cursor-pointer transition-colors'>
                  {Icons.mail} Send All Recovery Emails
                </button>
              </div>
            </div>

            {/* Recovery stats */}
            <div className='grid grid-cols-3 divide-x divide-[#E1E3E5] border-b border-[#E1E3E5]'>
              {[
                {
                  label: 'Total Abandoned',
                  value: ABANDONED_CHECKOUTS.length,
                  color: 'text-[#D82C0D]',
                },
                {
                  label: 'Recovery Emails Sent',
                  value: ABANDONED_CHECKOUTS.filter((a) => a.recoveryEmailSent)
                    .length,
                  color: 'text-[#FFC453]',
                },
                {
                  label: 'Total Lost Revenue',
                  value: formatCurrency(
                    ABANDONED_CHECKOUTS.reduce((s, a) => s + a.amount, 0),
                  ),
                  color: 'text-[#202223]',
                },
              ].map((stat) => (
                <div key={stat.label} className='px-6 py-4 text-center'>
                  <p
                    className={`font-sora text-[20px] font-bold ${stat.color}`}
                  >
                    {stat.value}
                  </p>
                  <p className='text-[12px] text-[#6D7175] mt-0.5'>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <div className='overflow-x-auto'>
              <table className='w-full'>
                <thead>
                  <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
                    {[
                      'Customer',
                      'Abandoned',
                      'Stage',
                      'Items',
                      'Value',
                      'Recovery Email',
                      'Actions',
                    ].map((h, i) => (
                      <th
                        key={h}
                        className={`px-4 py-3 text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide ${i === 6 ? 'text-right' : 'text-left'}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className='divide-y divide-[#F1F1F1]'>
                  {ABANDONED_CHECKOUTS.map((checkout) => (
                    <tr
                      key={checkout.id}
                      className='hover:bg-[#F6F6F7] transition-colors'
                    >
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-2.5'>
                          <div className='w-7 h-7 rounded-full bg-[#D82C0D]/10 flex items-center justify-center text-[#D82C0D] text-[11px] font-bold shrink-0'>
                            {checkout.customer.charAt(0)}
                          </div>
                          <div className='min-w-0'>
                            <p className='text-[13px] font-medium text-[#202223]'>
                              {checkout.customer}
                            </p>
                            <p className='text-[11px] text-[#8C9196] truncate'>
                              {checkout.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-1.5 text-[12.5px] text-[#6D7175]'>
                          {Icons.clock} {checkout.abandonedAt}
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <span
                          className={`px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${STAGE_STYLES[checkout.stage]}`}
                        >
                          {checkout.stage === 'cart'
                            ? 'Added to Cart'
                            : checkout.stage === 'shipping'
                              ? 'Shipping Step'
                              : 'Payment Step'}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <span className='text-[13px] text-[#202223]'>
                          {checkout.items}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <span className='text-[13px] font-semibold text-[#202223]'>
                          {formatCurrency(checkout.amount)}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        {checkout.recoveryEmailSent ? (
                          <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#008060]/10 text-[#008060]'>
                            <svg
                              width='10'
                              height='10'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='3'
                            >
                              <polyline points='20 6 9 17 4 12' />
                            </svg>
                            Sent
                          </span>
                        ) : (
                          <span className='text-[12px] text-[#8C9196]'>
                            Not sent
                          </span>
                        )}
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center justify-end gap-2'>
                          {!checkout.recoveryEmailSent && (
                            <button className='flex items-center gap-1 px-3 py-1.5 border border-[#008060] text-[#008060] hover:bg-[#F2F7F5] text-[12px] font-medium rounded-lg bg-transparent cursor-pointer transition-colors'>
                              {Icons.mail} Send Email
                            </button>
                          )}
                          <button className='px-3 py-1.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[12px] font-medium text-[#202223] rounded-lg cursor-pointer transition-colors'>
                            View Cart
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className='px-4 py-3 border-t border-[#E1E3E5]'>
              <p className='text-[12.5px] text-[#6D7175]'>
                {ABANDONED_CHECKOUTS.length} abandoned checkouts · Lost revenue:{' '}
                <span className='font-medium text-[#D82C0D]'>
                  {formatCurrency(
                    ABANDONED_CHECKOUTS.reduce((s, a) => s + a.amount, 0),
                  )}
                </span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ── Fallback ──────────────────────────────────────────────────────────────────

function OrdersPageFallback() {
  return (
    <div className='space-y-5 animate-pulse'>
      <div className='h-8 w-40 bg-[#E1E3E5] rounded-lg' />
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className='h-24 bg-[#E1E3E5] rounded-xl' />
        ))}
      </div>
      <div className='h-[500px] bg-[#E1E3E5] rounded-xl' />
    </div>
  )
}

// ── Default export — Suspense wrapper ─────────────────────────────────────────

export default function OrdersPage() {
  return (
    <Suspense fallback={<OrdersPageFallback />}>
      <OrdersPageContent />
    </Suspense>
  )
}

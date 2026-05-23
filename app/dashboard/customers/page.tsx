'use client'

import { useState } from 'react'
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
  users: (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M23 21v-2a4 4 0 00-3-3.87' />
      <path d='M16 3.13a4 4 0 010 7.75' />
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
  edit: (
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
      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
      <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
    </svg>
  ),
  trash: (
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
      <polyline points='3 6 5 6 21 6' />
      <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
      <path d='M10 11v6M14 11v6' />
      <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
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
  check: (
    <svg
      width='12'
      height='12'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='20 6 9 17 4 12' />
    </svg>
  ),
  spinner: (
    <svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
      <circle
        className='opacity-25'
        cx='12'
        cy='12'
        r='10'
        stroke='currentColor'
        strokeWidth='4'
      />
      <path
        className='opacity-75'
        fill='currentColor'
        d='M4 12a8 8 0 018-8v8H4z'
      />
    </svg>
  ),
  star: (
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
      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
    </svg>
  ),
  rupee: (
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
      <line x1='12' y1='1' x2='12' y2='23' />
      <path d='M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' />
    </svg>
  ),
  tag: (
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
      <path d='M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z' />
      <line x1='7' y1='7' x2='7.01' y2='7' />
    </svg>
  ),
  filter: (
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
      <polygon points='22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3' />
    </svg>
  ),
}

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  city: string
  state: string
  totalOrders: number
  totalSpent: number
  lastOrder: string
  status: 'active' | 'inactive' | 'blocked'
  tags: string[]
  joinedAt: string
  avatar: string
}

interface Segment {
  id: string
  name: string
  description: string
  colorClass: string
  icon: React.ReactNode
  customerCount: number
  avgSpent: number
  conditions: string[]
  isAuto: boolean
}

const CUSTOMERS: Customer[] = [
  {
    id: '1',
    name: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    phone: '+91 98765 43210',
    city: 'Mumbai',
    state: 'Maharashtra',
    totalOrders: 12,
    totalSpent: 48920,
    lastOrder: 'May 17, 2025',
    status: 'active',
    tags: ['VIP', 'Football'],
    joinedAt: 'Jan 5, 2025',
    avatar: 'RS',
  },
  {
    id: '2',
    name: 'Priya Mehta',
    email: 'priya@gmail.com',
    phone: '+91 87654 32109',
    city: 'Delhi',
    state: 'Delhi',
    totalOrders: 8,
    totalSpent: 32100,
    lastOrder: 'May 17, 2025',
    status: 'active',
    tags: ['Cricket'],
    joinedAt: 'Jan 12, 2025',
    avatar: 'PM',
  },
  {
    id: '3',
    name: 'Arjun Singh',
    email: 'arjun@gmail.com',
    phone: '+91 76543 21098',
    city: 'Bangalore',
    state: 'Karnataka',
    totalOrders: 5,
    totalSpent: 19850,
    lastOrder: 'May 16, 2025',
    status: 'active',
    tags: ['Running'],
    joinedAt: 'Feb 3, 2025',
    avatar: 'AS',
  },
  {
    id: '4',
    name: 'Sneha Patel',
    email: 'sneha@gmail.com',
    phone: '+91 65432 10987',
    city: 'Ahmedabad',
    state: 'Gujarat',
    totalOrders: 3,
    totalSpent: 8400,
    lastOrder: 'May 16, 2025',
    status: 'active',
    tags: ['Tennis'],
    joinedAt: 'Feb 20, 2025',
    avatar: 'SP',
  },
  {
    id: '5',
    name: 'Vikram Nair',
    email: 'vikram@gmail.com',
    phone: '+91 54321 09876',
    city: 'Chennai',
    state: 'Tamil Nadu',
    totalOrders: 1,
    totalSpent: 2199,
    lastOrder: 'May 15, 2025',
    status: 'inactive',
    tags: [],
    joinedAt: 'Mar 1, 2025',
    avatar: 'VN',
  },
  {
    id: '6',
    name: 'Anjali Gupta',
    email: 'anjali@gmail.com',
    phone: '+91 43210 98765',
    city: 'Pune',
    state: 'Maharashtra',
    totalOrders: 15,
    totalSpent: 67800,
    lastOrder: 'May 15, 2025',
    status: 'active',
    tags: ['VIP', 'Swimming'],
    joinedAt: 'Jan 8, 2025',
    avatar: 'AG',
  },
  {
    id: '7',
    name: 'Rohit Kumar',
    email: 'rohit@gmail.com',
    phone: '+91 32109 87654',
    city: 'Hyderabad',
    state: 'Telangana',
    totalOrders: 7,
    totalSpent: 28400,
    lastOrder: 'May 14, 2025',
    status: 'active',
    tags: ['Basketball'],
    joinedAt: 'Feb 14, 2025',
    avatar: 'RK',
  },
  {
    id: '8',
    name: 'Kavya Reddy',
    email: 'kavya@gmail.com',
    phone: '+91 21098 76543',
    city: 'Kolkata',
    state: 'West Bengal',
    totalOrders: 4,
    totalSpent: 14200,
    lastOrder: 'May 14, 2025',
    status: 'active',
    tags: ['Cycling'],
    joinedAt: 'Mar 5, 2025',
    avatar: 'KR',
  },
  {
    id: '9',
    name: 'Amit Joshi',
    email: 'amit@gmail.com',
    phone: '+91 10987 65432',
    city: 'Jaipur',
    state: 'Rajasthan',
    totalOrders: 2,
    totalSpent: 9800,
    lastOrder: 'May 13, 2025',
    status: 'inactive',
    tags: [],
    joinedAt: 'Mar 18, 2025',
    avatar: 'AJ',
  },
  {
    id: '10',
    name: 'Meera Iyer',
    email: 'meera@gmail.com',
    phone: '+91 09876 54321',
    city: 'Surat',
    state: 'Gujarat',
    totalOrders: 9,
    totalSpent: 38600,
    lastOrder: 'May 13, 2025',
    status: 'active',
    tags: ['VIP'],
    joinedAt: 'Jan 25, 2025',
    avatar: 'MI',
  },
  {
    id: '11',
    name: 'Suresh Babu',
    email: 'suresh@gmail.com',
    phone: '+91 98765 12345',
    city: 'Lucknow',
    state: 'Uttar Pradesh',
    totalOrders: 0,
    totalSpent: 0,
    lastOrder: '—',
    status: 'blocked',
    tags: [],
    joinedAt: 'Apr 2, 2025',
    avatar: 'SB',
  },
  {
    id: '12',
    name: 'Divya Sharma',
    email: 'divya@gmail.com',
    phone: '+91 87654 23456',
    city: 'Bhopal',
    state: 'Madhya Pradesh',
    totalOrders: 6,
    totalSpent: 22100,
    lastOrder: 'May 12, 2025',
    status: 'active',
    tags: ['Boxing'],
    joinedAt: 'Feb 28, 2025',
    avatar: 'DS',
  },
]

const SEGMENTS: Segment[] = [
  {
    id: '1',
    name: 'VIP Customers',
    description: 'High-value customers who spend above ₹30,000',
    colorClass: 'bg-[#FFC453]/20 text-[#916A00] border-[#FFC453]/30',
    icon: Icons.star,
    customerCount: 3,
    avgSpent: 51773,
    conditions: ['Total spent > ₹30,000', 'Status: Active'],
    isAuto: true,
  },
  {
    id: '2',
    name: 'New Customers',
    description: 'Customers who joined in the last 30 days',
    colorClass: 'bg-[#008060]/10 text-[#008060] border-[#008060]/20',
    icon: Icons.users,
    customerCount: 4,
    avgSpent: 6600,
    conditions: ['Joined in last 30 days'],
    isAuto: true,
  },
  {
    id: '3',
    name: 'At Risk',
    description: "Active customers who haven't ordered in 60+ days",
    colorClass: 'bg-[#D82C0D]/10 text-[#D82C0D] border-[#D82C0D]/20',
    icon: Icons.filter,
    customerCount: 2,
    avgSpent: 14025,
    conditions: ['Last order > 60 days ago', 'Status: Active'],
    isAuto: true,
  },
  {
    id: '4',
    name: 'Football Fans',
    description: 'Customers who purchased football products',
    colorClass: 'bg-[#2C6ECB]/10 text-[#2C6ECB] border-[#2C6ECB]/20',
    icon: Icons.tag,
    customerCount: 2,
    avgSpent: 38920,
    conditions: ['Tag: Football'],
    isAuto: false,
  },
  {
    id: '5',
    name: 'High Frequency',
    description: 'Customers with 5+ orders',
    colorClass: 'bg-purple-100 text-purple-700 border-purple-200',
    icon: Icons.rupee,
    customerCount: 4,
    avgSpent: 44843,
    conditions: ['Total orders ≥ 5'],
    isAuto: false,
  },
  {
    id: '6',
    name: 'Inactive Customers',
    description: "Customers who haven't placed any orders yet",
    colorClass: 'bg-[#6D7175]/10 text-[#6D7175] border-[#6D7175]/20',
    icon: Icons.users,
    customerCount: 1,
    avgSpent: 0,
    conditions: ['Total orders = 0'],
    isAuto: true,
  },
]

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-[#008060]/10 text-[#008060]',
  inactive: 'bg-[#6D7175]/10 text-[#6D7175]',
  blocked: 'bg-[#D82C0D]/10 text-[#D82C0D]',
}

const TAG_STYLES: Record<string, string> = {
  VIP: 'bg-[#FFC453]/20 text-[#916A00]',
  Football: 'bg-[#008060]/10 text-[#008060]',
  Cricket: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
  Running: 'bg-purple-100 text-purple-700',
  Tennis: 'bg-orange-100 text-orange-700',
  Swimming: 'bg-cyan-100 text-cyan-700',
  Basketball: 'bg-red-100 text-red-700',
  Cycling: 'bg-lime-100 text-lime-700',
  Boxing: 'bg-pink-100 text-pink-700',
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

function getSegmentCustomers(segment: Segment): Customer[] {
  if (segment.name === 'VIP Customers')
    return CUSTOMERS.filter((c) => c.totalSpent > 30000)
  if (segment.name === 'New Customers')
    return CUSTOMERS.filter(
      (c) => new Date(c.joinedAt) > new Date('2025-04-17'),
    )
  if (segment.name === 'At Risk')
    return CUSTOMERS.filter((c) => c.status === 'inactive' && c.totalOrders > 0)
  if (segment.name === 'Football Fans')
    return CUSTOMERS.filter((c) => c.tags.includes('Football'))
  if (segment.name === 'High Frequency')
    return CUSTOMERS.filter((c) => c.totalOrders >= 5)
  if (segment.name === 'Inactive Customers')
    return CUSTOMERS.filter((c) => c.totalOrders === 0)
  return []
}

function CustomerDrawer({
  customer,
  onClose,
}: {
  customer: Customer
  onClose: () => void
}) {
  return (
    <div className='fixed inset-0 z-50 flex justify-end'>
      <div
        className='absolute inset-0 bg-black/30 backdrop-blur-sm'
        onClick={onClose}
      />
      <div className='relative bg-white w-full max-w-100 h-full shadow-2xl overflow-y-auto flex flex-col'>
        <div className='flex items-center justify-between px-6 py-4 border-b border-[#E1E3E5] shrink-0'>
          <h2 className='font-sora text-[16px] font-semibold text-[#202223]'>
            Customer Details
          </h2>
          <button
            onClick={onClose}
            className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
          >
            {Icons.close}
          </button>
        </div>
        <div className='px-6 py-5 border-b border-[#E1E3E5]'>
          <div className='flex items-center gap-4 mb-4'>
            <div className='w-14 h-14 rounded-full bg-[#008060] flex items-center justify-center text-white text-[18px] font-bold shrink-0'>
              {customer.avatar}
            </div>
            <div>
              <h3 className='font-sora text-[17px] font-semibold text-[#202223]'>
                {customer.name}
              </h3>
              <p className='text-[13px] text-[#6D7175]'>{customer.email}</p>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold capitalize mt-1 ${STATUS_STYLES[customer.status]}`}
              >
                {customer.status}
              </span>
            </div>
          </div>
          {customer.tags.length > 0 && (
            <div className='flex flex-wrap gap-1.5'>
              {customer.tags.map((tag) => (
                <span
                  key={tag}
                  className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${TAG_STYLES[tag] ?? 'bg-[#F6F6F7] text-[#6D7175]'}`}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className='grid grid-cols-3 divide-x divide-[#E1E3E5] border-b border-[#E1E3E5]'>
          {[
            { label: 'Orders', value: customer.totalOrders },
            { label: 'Spent', value: formatCurrency(customer.totalSpent) },
            {
              label: 'Avg',
              value:
                customer.totalOrders > 0
                  ? formatCurrency(
                      Math.round(customer.totalSpent / customer.totalOrders),
                    )
                  : '—',
            },
          ].map((stat) => (
            <div key={stat.label} className='px-4 py-4 text-center'>
              <p className='font-sora text-[18px] font-bold text-[#202223]'>
                {stat.value}
              </p>
              <p className='text-[11.5px] text-[#6D7175] mt-0.5'>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
        <div className='px-6 py-5 space-y-3 flex-1'>
          {[
            { label: 'Phone', value: customer.phone },
            { label: 'City', value: `${customer.city}, ${customer.state}` },
            { label: 'Last Order', value: customer.lastOrder },
            { label: 'Member Since', value: customer.joinedAt },
          ].map((item) => (
            <div key={item.label} className='flex items-center justify-between'>
              <span className='text-[12.5px] text-[#6D7175]'>{item.label}</span>
              <span className='text-[12.5px] font-medium text-[#202223]'>
                {item.value}
              </span>
            </div>
          ))}
        </div>
        <div className='px-6 py-4 border-t border-[#E1E3E5] flex gap-2 shrink-0'>
          <Link
            href={`/dashboard/customers/${customer.id}`}
            className='flex-1 py-2.5 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg no-underline text-center transition-colors'
          >
            View Profile
          </Link>
          <button className='px-4 py-2.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg cursor-pointer transition-colors'>
            Email
          </button>
        </div>
      </div>
    </div>
  )
}

export default function CustomersPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const view = searchParams.get('view') ?? 'customers'

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(
    null,
  )
  const [selectedSegment, setSelectedSegment] = useState<Segment | null>(null)
  const [showSegmentModal, setShowSegmentModal] = useState(false)
  const [saving, setSaving] = useState(false)
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [page, setPage] = useState(1)
  const pageSize = 8

  const ALL_STATUSES = ['All', 'Active', 'Inactive', 'Blocked']

  const setTab = (tab: string) => {
    if (tab === 'customers') router.push('/dashboard/customers')
    else router.push(`/dashboard/customers?view=${tab}`)
  }

  const filtered = CUSTOMERS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.city.toLowerCase().includes(search.toLowerCase())
    const matchStatus =
      statusFilter === 'All' || c.status === statusFilter.toLowerCase()
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize)

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  const toggleAll = () =>
    setSelectedIds(
      selectedIds.length === paginated.length ? [] : paginated.map((c) => c.id),
    )

  const totalRevenue = CUSTOMERS.reduce((s, c) => s + c.totalSpent, 0)
  const vipCustomers = CUSTOMERS.filter((c) => c.tags.includes('VIP')).length

  const handleSaveSegment = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))
    setSaving(false)
    setShowSegmentModal(false)
  }

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Customers
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            {CUSTOMERS.length} customers total
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'>
            Export
          </button>
          {view === 'segments' ? (
            <button
              onClick={() => setShowSegmentModal(true)}
              className='flex items-center gap-1.5 px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg transition-colors border-none cursor-pointer'
            >
              {Icons.plus} Create Segment
            </button>
          ) : (
            <button className='flex items-center gap-1.5 px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg transition-colors border-none cursor-pointer'>
              {Icons.plus} Add Customer
            </button>
          )}
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
        {[
          {
            label: 'Total Customers',
            value: CUSTOMERS.length,
            icon: Icons.users,
            color: 'text-[#2C6ECB]',
            bg: 'bg-[#2C6ECB]/10',
          },
          {
            label: 'Active',
            value: CUSTOMERS.filter((c) => c.status === 'active').length,
            icon: Icons.check,
            color: 'text-[#008060]',
            bg: 'bg-[#008060]/10',
          },
          {
            label: 'VIP Customers',
            value: vipCustomers,
            icon: Icons.star,
            color: 'text-[#916A00]',
            bg: 'bg-[#FFC453]/20',
          },
          {
            label: 'Total Revenue',
            value: formatCurrency(totalRevenue),
            icon: Icons.rupee,
            color: 'text-[#202223]',
            bg: 'bg-[#F6F6F7]',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className='bg-white border border-[#E1E3E5] rounded-xl p-5 flex items-center gap-4'
          >
            <div
              className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center shrink-0`}
            >
              {stat.icon}
            </div>
            <div>
              <p className={`font-sora text-[22px] font-bold ${stat.color}`}>
                {stat.value}
              </p>
              <p className='text-[12px] text-[#6D7175]'>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Main card */}
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        {/* Tabs */}
        <div className='flex items-center border-b border-[#E1E3E5] px-4'>
          {[
            {
              id: 'customers',
              label: 'All Customers',
              count: CUSTOMERS.length,
            },
            { id: 'segments', label: 'Segments', count: SEGMENTS.length },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`px-4 py-3 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${view === tab.id ? 'border-b-[#008060] text-[#008060]' : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'}`}
            >
              {tab.label}{' '}
              <span className='ml-1 text-[10.5px] text-[#8C9196]'>
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── All Customers ── */}
        {view === 'customers' && (
          <>
            <div className='flex items-center gap-3 px-4 py-3 border-b border-[#E1E3E5] flex-wrap'>
              <div className='flex items-center gap-2 flex-1 min-w-50 px-3 py-2 border border-[#E1E3E5] rounded-lg bg-[#F6F6F7] focus-within:border-[#008060] focus-within:bg-white transition-all'>
                {Icons.search}
                <input
                  type='text'
                  placeholder='Search customers...'
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
              <div className='flex items-center border border-[#E1E3E5] rounded-lg overflow-hidden'>
                <button
                  onClick={() => setViewMode('table')}
                  className={`px-3 py-2 text-[13px] border-none cursor-pointer transition-colors ${viewMode === 'table' ? 'bg-[#008060] text-white' : 'bg-white text-[#6D7175] hover:bg-[#F6F6F7]'}`}
                >
                  ☰
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`px-3 py-2 text-[13px] border-none cursor-pointer transition-colors ${viewMode === 'grid' ? 'bg-[#008060] text-white' : 'bg-white text-[#6D7175] hover:bg-[#F6F6F7]'}`}
                >
                  ⊞
                </button>
              </div>
            </div>

            <div className='flex items-center border-b border-[#E1E3E5] overflow-x-auto scrollbar-none px-4'>
              {ALL_STATUSES.map((s) => (
                <button
                  key={s}
                  onClick={() => {
                    setStatusFilter(s)
                    setPage(1)
                  }}
                  className={`px-4 py-2.5 text-[12.5px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${statusFilter === s ? 'border-b-[#008060] text-[#008060]' : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'}`}
                >
                  {s}{' '}
                  <span className='ml-1 text-[10.5px] text-[#8C9196]'>
                    {s === 'All'
                      ? CUSTOMERS.length
                      : CUSTOMERS.filter((c) => c.status === s.toLowerCase())
                          .length}
                  </span>
                </button>
              ))}
            </div>

            {selectedIds.length > 0 && (
              <div className='flex items-center gap-3 px-4 py-2.5 bg-[#008060]/8 border-b border-[#008060]/20'>
                <span className='text-[13px] font-medium text-[#008060]'>
                  {selectedIds.length} selected
                </span>
                <div className='flex gap-2'>
                  {['Send Email', 'Export', 'Block', 'Delete'].map((a) => (
                    <button
                      key={a}
                      className={`px-3 py-1.5 text-[12px] border rounded-lg bg-transparent cursor-pointer transition-colors ${a === 'Delete' || a === 'Block' ? 'border-[#D82C0D]/30 text-[#D82C0D]' : 'border-[#E1E3E5] text-[#202223] hover:bg-white'}`}
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

            {viewMode === 'table' ? (
              <div className='overflow-x-auto'>
                <table className='w-full'>
                  <thead>
                    <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
                      <th className='w-10 px-4 py-3'>
                        <input
                          type='checkbox'
                          checked={
                            selectedIds.length === paginated.length &&
                            paginated.length > 0
                          }
                          onChange={toggleAll}
                          className='w-4 h-4 rounded accent-[#008060] cursor-pointer'
                        />
                      </th>
                      <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                        Customer
                      </th>
                      <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                        Location
                      </th>
                      <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                        Orders
                      </th>
                      <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                        Total Spent
                      </th>
                      <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                        Last Order
                      </th>
                      <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                        Tags
                      </th>
                      <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                        Status
                      </th>
                      <th className='px-4 py-3 text-right text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className='divide-y divide-[#F1F1F1]'>
                    {paginated.length === 0 ? (
                      <tr>
                        <td colSpan={9} className='px-4 py-16 text-center'>
                          <p className='text-[14px] font-medium text-[#202223]'>
                            No customers found
                          </p>
                        </td>
                      </tr>
                    ) : (
                      paginated.map((customer) => (
                        <tr
                          key={customer.id}
                          className={`hover:bg-[#F6F6F7] transition-colors ${selectedIds.includes(customer.id) ? 'bg-[#F2F7F5]' : ''}`}
                        >
                          <td className='px-4 py-3'>
                            <input
                              type='checkbox'
                              checked={selectedIds.includes(customer.id)}
                              onChange={() => toggleSelect(customer.id)}
                              className='w-4 h-4 rounded accent-[#008060] cursor-pointer'
                            />
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex items-center gap-3'>
                              <div className='w-8 h-8 rounded-full bg-[#008060] flex items-center justify-center text-white text-[11px] font-bold shrink-0'>
                                {customer.avatar}
                              </div>
                              <div className='min-w-0'>
                                <button
                                  onClick={() => setSelectedCustomer(customer)}
                                  className='text-[13px] font-medium text-[#202223] hover:text-[#008060] bg-transparent border-none cursor-pointer p-0 text-left'
                                >
                                  {customer.name}
                                </button>
                                <p className='text-[11px] text-[#8C9196] truncate'>
                                  {customer.email}
                                </p>
                              </div>
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            <p className='text-[13px] text-[#202223]'>
                              {customer.city}
                            </p>
                            <p className='text-[11px] text-[#8C9196]'>
                              {customer.state}
                            </p>
                          </td>
                          <td className='px-4 py-3'>
                            <span className='text-[13px] font-semibold text-[#202223]'>
                              {customer.totalOrders}
                            </span>
                          </td>
                          <td className='px-4 py-3'>
                            <span className='text-[13px] font-semibold text-[#202223]'>
                              {formatCurrency(customer.totalSpent)}
                            </span>
                          </td>
                          <td className='px-4 py-3'>
                            <span className='text-[12.5px] text-[#6D7175]'>
                              {customer.lastOrder}
                            </span>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex flex-wrap gap-1'>
                              {customer.tags.slice(0, 2).map((tag) => (
                                <span
                                  key={tag}
                                  className={`px-2 py-0.5 rounded-full text-[10.5px] font-semibold ${TAG_STYLES[tag] ?? 'bg-[#F6F6F7] text-[#6D7175]'}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className='px-4 py-3'>
                            <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${STATUS_STYLES[customer.status]}`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${customer.status === 'active' ? 'bg-[#008060]' : customer.status === 'inactive' ? 'bg-[#6D7175]' : 'bg-[#D82C0D]'}`}
                              />
                              {customer.status}
                            </span>
                          </td>
                          <td className='px-4 py-3'>
                            <div className='flex items-center justify-end gap-1'>
                              <button
                                onClick={() => setSelectedCustomer(customer)}
                                className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
                              >
                                {Icons.eye}
                              </button>
                              <Link
                                href={`/dashboard/customers/${customer.id}`}
                                className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg no-underline transition-all'
                              >
                                {Icons.edit}
                              </Link>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className='p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3'>
                {paginated.map((customer) => (
                  <button
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className='text-left border border-[#E1E3E5] rounded-xl p-4 hover:border-[#008060]/30 hover:shadow-md transition-all bg-white cursor-pointer'
                  >
                    <div className='flex items-center gap-3 mb-3'>
                      <div className='w-10 h-10 rounded-full bg-[#008060] flex items-center justify-center text-white text-[12px] font-bold shrink-0'>
                        {customer.avatar}
                      </div>
                      <span
                        className={`text-[10.5px] font-semibold px-2 py-0.5 rounded-full capitalize ${STATUS_STYLES[customer.status]}`}
                      >
                        {customer.status}
                      </span>
                    </div>
                    <p className='text-[13px] font-semibold text-[#202223] truncate'>
                      {customer.name}
                    </p>
                    <p className='text-[11.5px] text-[#8C9196] truncate mb-2'>
                      {customer.city}
                    </p>
                    <div className='flex items-center justify-between text-[12px]'>
                      <span className='text-[#6D7175]'>
                        {customer.totalOrders} orders
                      </span>
                      <span className='font-semibold text-[#202223]'>
                        {formatCurrency(customer.totalSpent)}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            )}

            <div className='flex items-center justify-between px-4 py-3 border-t border-[#E1E3E5]'>
              <p className='text-[12.5px] text-[#6D7175]'>
                Showing{' '}
                <span className='font-medium text-[#202223]'>
                  {Math.min((page - 1) * pageSize + 1, filtered.length)}–
                  {Math.min(page * pageSize, filtered.length)}
                </span>{' '}
                of{' '}
                <span className='font-medium text-[#202223]'>
                  {filtered.length}
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
                {[...Array(totalPages)].map((_, i) => (
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

        {/* ── Segments ── */}
        {view === 'segments' && (
          <div className='p-5 space-y-5'>
            <div className='grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
              {SEGMENTS.map((segment) => {
                const segCustomers = getSegmentCustomers(segment)
                const isSelected = selectedSegment?.id === segment.id
                return (
                  <div
                    key={segment.id}
                    onClick={() =>
                      setSelectedSegment(isSelected ? null : segment)
                    }
                    className={`border rounded-xl p-5 cursor-pointer transition-all hover:shadow-md ${isSelected ? 'ring-2 ring-[#008060] ring-offset-2 border-[#008060]/30' : 'border-[#E1E3E5] hover:border-[#008060]/30'}`}
                  >
                    <div className='flex items-start justify-between mb-3'>
                      <div
                        className={`flex items-center gap-2 px-2.5 py-1 border rounded-full text-[11.5px] font-semibold ${segment.colorClass}`}
                      >
                        {segment.icon} {segment.name}
                      </div>
                      {segment.isAuto && (
                        <span className='text-[10px] px-2 py-0.5 bg-[#F6F6F7] border border-[#E1E3E5] rounded-full text-[#6D7175]'>
                          Auto
                        </span>
                      )}
                    </div>
                    <p className='text-[12.5px] text-[#6D7175] mb-4 leading-relaxed'>
                      {segment.description}
                    </p>
                    <div className='flex items-center justify-between mb-3'>
                      <div>
                        <p className='font-sora text-[22px] font-bold text-[#202223] leading-none'>
                          {segCustomers.length}
                        </p>
                        <p className='text-[11.5px] text-[#6D7175] mt-0.5'>
                          customers
                        </p>
                      </div>
                      <div className='text-right'>
                        <p className='font-sora text-[16px] font-bold text-[#008060] leading-none'>
                          {formatCurrency(segment.avgSpent)}
                        </p>
                        <p className='text-[11.5px] text-[#6D7175] mt-0.5'>
                          avg spent
                        </p>
                      </div>
                    </div>
                    <div className='space-y-1 mb-4'>
                      {segment.conditions.map((c, i) => (
                        <div
                          key={i}
                          className='flex items-center gap-1.5 text-[11.5px] text-[#6D7175]'
                        >
                          <span className='text-[#008060]'>{Icons.check}</span>
                          {c}
                        </div>
                      ))}
                    </div>
                    <div className='flex items-center justify-between pt-3 border-t border-[#E1E3E5]'>
                      <button
                        onClick={(e) => e.stopPropagation()}
                        className='flex items-center gap-1.5 text-[12px] text-[#008060] hover:text-[#006e52] bg-transparent border-none cursor-pointer font-medium'
                      >
                        {Icons.mail} Email All
                      </button>
                      <div className='flex items-center gap-1'>
                        {!segment.isAuto && (
                          <button
                            onClick={(e) => e.stopPropagation()}
                            className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
                          >
                            {Icons.edit}
                          </button>
                        )}
                        <button
                          onClick={(e) => e.stopPropagation()}
                          className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#D82C0D] hover:bg-[#D82C0D]/5 rounded-lg bg-transparent border-none cursor-pointer'
                        >
                          {Icons.trash}
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Segment customers */}
            {selectedSegment && (
              <div className='border border-[#E1E3E5] rounded-xl overflow-hidden'>
                <div className='flex items-center justify-between px-5 py-4 bg-[#F6F6F7] border-b border-[#E1E3E5]'>
                  <div className='flex items-center gap-2'>
                    <div
                      className={`flex items-center gap-1.5 px-2.5 py-1 border rounded-full text-[11.5px] font-semibold ${selectedSegment.colorClass}`}
                    >
                      {selectedSegment.icon} {selectedSegment.name}
                    </div>
                    <span className='text-[12.5px] text-[#6D7175]'>
                      — {getSegmentCustomers(selectedSegment).length} customers
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedSegment(null)}
                    className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-white rounded-lg bg-transparent border-none cursor-pointer'
                  >
                    {Icons.close}
                  </button>
                </div>
                <div className='divide-y divide-[#F1F1F1]'>
                  {getSegmentCustomers(selectedSegment).map((customer) => (
                    <div
                      key={customer.id}
                      className='flex items-center gap-4 px-5 py-3.5 hover:bg-[#F6F6F7] transition-colors'
                    >
                      <div className='w-8 h-8 rounded-full bg-[#008060] flex items-center justify-center text-white text-[11px] font-bold shrink-0'>
                        {customer.avatar}
                      </div>
                      <div className='flex-1 min-w-0'>
                        <p className='text-[13px] font-medium text-[#202223]'>
                          {customer.name}
                        </p>
                        <p className='text-[11.5px] text-[#8C9196]'>
                          {customer.email}
                        </p>
                      </div>
                      <div className='text-right shrink-0'>
                        <p className='text-[13px] font-semibold text-[#202223]'>
                          {formatCurrency(customer.totalSpent)}
                        </p>
                        <p className='text-[11px] text-[#8C9196]'>
                          {customer.totalOrders} orders
                        </p>
                      </div>
                      <button
                        onClick={() => setSelectedCustomer(customer)}
                        className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
                      >
                        {Icons.eye}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Customer drawer */}
      {selectedCustomer && (
        <CustomerDrawer
          customer={selectedCustomer}
          onClose={() => setSelectedCustomer(null)}
        />
      )}

      {/* Create Segment Modal */}
      {showSegmentModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setShowSegmentModal(false)}
          />
          <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-130 overflow-hidden'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-[#E1E3E5]'>
              <h2 className='font-sora text-[16px] font-semibold text-[#202223]'>
                Create Segment
              </h2>
              <button
                onClick={() => setShowSegmentModal(false)}
                className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
              >
                {Icons.close}
              </button>
            </div>
            <div className='px-6 py-5 space-y-4'>
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Segment Name <span className='text-[#D82C0D]'>*</span>
                </label>
                <input
                  type='text'
                  placeholder='e.g. High Value Customers'
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                />
              </div>
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Description
                </label>
                <textarea
                  placeholder='Describe this segment...'
                  rows={2}
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all resize-none'
                />
              </div>
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-2'>
                  Conditions
                </label>
                <div className='space-y-2'>
                  {[
                    'Total spent',
                    'Total orders',
                    'Last order date',
                    'Customer tag',
                    'Location',
                    'Status',
                  ].map((condition) => (
                    <div
                      key={condition}
                      className='flex items-center gap-3 p-3 border border-[#E1E3E5] rounded-lg'
                    >
                      <input
                        type='checkbox'
                        className='w-4 h-4 accent-[#008060] cursor-pointer'
                      />
                      <span className='text-[13px] text-[#202223] flex-1'>
                        {condition}
                      </span>
                      <select className='px-2 py-1 border border-[#E1E3E5] rounded text-[12px] text-[#202223] bg-white outline-none cursor-pointer'>
                        <option>is greater than</option>
                        <option>is less than</option>
                        <option>equals</option>
                      </select>
                      <input
                        type='text'
                        placeholder='value'
                        className='w-20 px-2 py-1 border border-[#E1E3E5] rounded text-[12px] outline-none focus:border-[#008060] transition-all'
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[#E1E3E5] bg-[#F6F6F7]/50'>
              <button
                onClick={() => setShowSegmentModal(false)}
                className='px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg cursor-pointer transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={handleSaveSegment}
                disabled={saving}
                className='px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg border-none cursor-pointer transition-colors disabled:opacity-50 flex items-center gap-2'
              >
                {saving ? Icons.spinner : null}
                {saving ? 'Saving...' : 'Create Segment'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

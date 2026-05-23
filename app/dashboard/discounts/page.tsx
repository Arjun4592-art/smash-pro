'use client'

import { useState } from 'react'

// ─── SVG Icons ───────────────────────────────────────────────────
const Icons = {
  tag: (
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
      <path d='M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z' />
      <line x1='7' y1='7' x2='7.01' y2='7' />
    </svg>
  ),
  plus: (
    <svg
      width='16'
      height='16'
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
  copy: (
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
      <rect x='9' y='9' width='13' height='13' rx='2' ry='2' />
      <path d='M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1' />
    </svg>
  ),
  search: (
    <svg
      width='14'
      height='14'
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
  percent: (
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
      <line x1='19' y1='5' x2='5' y2='19' />
      <circle cx='6.5' cy='6.5' r='2.5' />
      <circle cx='17.5' cy='17.5' r='2.5' />
    </svg>
  ),
  rupee: (
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
      <line x1='12' y1='1' x2='12' y2='23' />
      <path d='M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' />
    </svg>
  ),
  shipping: (
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
      <rect x='1' y='3' width='15' height='13' />
      <polygon points='16 8 20 8 23 11 23 16 16 16 16 8' />
      <circle cx='5.5' cy='18.5' r='2.5' />
      <circle cx='18.5' cy='18.5' r='2.5' />
    </svg>
  ),
  gift: (
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
      <polyline points='20 12 20 22 4 22 4 12' />
      <rect x='2' y='7' width='20' height='5' />
      <line x1='12' y1='22' x2='12' y2='7' />
      <path d='M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z' />
      <path d='M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z' />
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
  warning: (
    <svg
      width='20'
      height='20'
      viewBox='0 0 24 24'
      fill='none'
      stroke='#D82C0D'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z' />
      <line x1='12' y1='9' x2='12' y2='13' />
      <line x1='12' y1='17' x2='12.01' y2='17' />
    </svg>
  ),
  calendar: (
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
      <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
      <line x1='16' y1='2' x2='16' y2='6' />
      <line x1='8' y1='2' x2='8' y2='6' />
      <line x1='3' y1='10' x2='21' y2='10' />
    </svg>
  ),
}

// ─── Types ────────────────────────────────────────────────────────
type DiscountType = 'percentage' | 'fixed' | 'free_shipping' | 'buy_x_get_y'

interface Discount {
  id: string
  code: string
  type: DiscountType
  value: number
  minOrderAmount: number
  maxUses: number | null
  usedCount: number
  startsAt: string
  expiresAt: string | null
  isActive: boolean
  description: string
}

// ─── Mock Data ────────────────────────────────────────────────────
const INITIAL_DISCOUNTS: Discount[] = [
  {
    id: '1',
    code: 'APEX10',
    type: 'percentage',
    value: 10,
    minOrderAmount: 999,
    maxUses: 500,
    usedCount: 284,
    startsAt: '2025-05-01',
    expiresAt: '2025-05-31',
    isActive: true,
    description: '10% off for new customers',
  },
  {
    id: '2',
    code: 'FLAT200',
    type: 'fixed',
    value: 200,
    minOrderAmount: 1499,
    maxUses: 200,
    usedCount: 198,
    startsAt: '2025-05-01',
    expiresAt: '2025-05-20',
    isActive: false,
    description: 'Flat ₹200 off on orders above ₹1499',
  },
  {
    id: '3',
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    minOrderAmount: 499,
    maxUses: null,
    usedCount: 412,
    startsAt: '2025-04-01',
    expiresAt: null,
    isActive: true,
    description: 'Free shipping on orders above ₹499',
  },
  {
    id: '4',
    code: 'SPORT25',
    type: 'percentage',
    value: 25,
    minOrderAmount: 2999,
    maxUses: 100,
    usedCount: 67,
    startsAt: '2025-05-15',
    expiresAt: '2025-05-30',
    isActive: true,
    description: '25% off on sports equipment',
  },
  {
    id: '5',
    code: 'BUY2GET1',
    type: 'buy_x_get_y',
    value: 0,
    minOrderAmount: 0,
    maxUses: null,
    usedCount: 89,
    startsAt: '2025-05-01',
    expiresAt: '2025-06-30',
    isActive: true,
    description: 'Buy 2 get 1 free on selected items',
  },
  {
    id: '6',
    code: 'SUMMER50',
    type: 'fixed',
    value: 500,
    minOrderAmount: 2999,
    maxUses: 50,
    usedCount: 12,
    startsAt: '2025-06-01',
    expiresAt: '2025-06-30',
    isActive: false,
    description: 'Summer sale ₹500 off',
  },
]

const TYPE_CONFIG: Record<
  DiscountType,
  { label: string; color: string; bg: string; icon: React.ReactNode }
> = {
  percentage: {
    label: 'Percentage',
    color: 'text-[#008060]',
    bg: 'bg-[#008060]/10',
    icon: Icons.percent,
  },
  fixed: {
    label: 'Fixed Amount',
    color: 'text-[#2C6ECB]',
    bg: 'bg-[#2C6ECB]/10',
    icon: Icons.rupee,
  },
  free_shipping: {
    label: 'Free Shipping',
    color: 'text-purple-700',
    bg: 'bg-purple-100',
    icon: Icons.shipping,
  },
  buy_x_get_y: {
    label: 'Buy X Get Y',
    color: 'text-[#916A00]',
    bg: 'bg-[#FFC453]/20',
    icon: Icons.gift,
  },
}

const emptyForm = {
  code: '',
  type: 'percentage' as DiscountType,
  value: '',
  minOrderAmount: '',
  maxUses: '',
  startsAt: '',
  expiresAt: '',
  description: '',
  isActive: true,
}

// ─── Helper ───────────────────────────────────────────────────────
function formatValue(discount: Discount) {
  if (discount.type === 'percentage') return `${discount.value}% off`
  if (discount.type === 'fixed') return `₹${discount.value} off`
  if (discount.type === 'free_shipping') return 'Free shipping'
  return 'Buy X Get Y'
}

function usagePct(discount: Discount) {
  if (!discount.maxUses) return null
  return Math.round((discount.usedCount / discount.maxUses) * 100)
}

function isExpired(discount: Discount) {
  if (!discount.expiresAt) return false
  return new Date(discount.expiresAt) < new Date()
}

function generateCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  return Array.from(
    { length: 8 },
    () => chars[Math.floor(Math.random() * chars.length)],
  ).join('')
}

// ─── Main Page ────────────────────────────────────────────────────
export default function DiscountsPage() {
  const [discounts, setDiscounts] = useState<Discount[]>(INITIAL_DISCOUNTS)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [saving, setSaving] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  // Filter
  const filtered = discounts.filter((d) => {
    const matchSearch =
      d.code.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase())
    const matchType = typeFilter === 'All' || d.type === typeFilter
    const matchStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Active' && d.isActive && !isExpired(d)) ||
      (statusFilter === 'Inactive' && !d.isActive) ||
      (statusFilter === 'Expired' && isExpired(d))
    return matchSearch && matchType && matchStatus
  })

  // Stats
  const activeCount = discounts.filter(
    (d) => d.isActive && !isExpired(d),
  ).length
  const totalUsed = discounts.reduce((s, d) => s + d.usedCount, 0)
  const expiredCount = discounts.filter((d) => isExpired(d)).length

  const openAdd = () => {
    setEditingId(null)
    setForm({ ...emptyForm })
    setShowModal(true)
  }

  const openEdit = (d: Discount) => {
    setEditingId(d.id)
    setForm({
      code: d.code,
      type: d.type,
      value: d.value.toString(),
      minOrderAmount: d.minOrderAmount.toString(),
      maxUses: d.maxUses?.toString() ?? '',
      startsAt: d.startsAt,
      expiresAt: d.expiresAt ?? '',
      description: d.description,
      isActive: d.isActive,
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.code) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 700))

    const data: Discount = {
      id: editingId ?? Date.now().toString(),
      code: form.code.toUpperCase(),
      type: form.type,
      value: parseFloat(form.value || '0'),
      minOrderAmount: parseFloat(form.minOrderAmount || '0'),
      maxUses: form.maxUses ? parseInt(form.maxUses) : null,
      usedCount: editingId
        ? discounts.find((d) => d.id === editingId)!.usedCount
        : 0,
      startsAt: form.startsAt || new Date().toISOString().split('T')[0],
      expiresAt: form.expiresAt || null,
      isActive: form.isActive,
      description: form.description,
    }

    if (editingId) {
      setDiscounts((prev) => prev.map((d) => (d.id === editingId ? data : d)))
    } else {
      setDiscounts((prev) => [data, ...prev])
    }

    setSaving(false)
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setDiscounts((prev) => prev.filter((d) => d.id !== id))
    setDeleteId(null)
  }

  const toggleActive = (id: string) => {
    setDiscounts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, isActive: !d.isActive } : d)),
    )
  }

  const copyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code).catch(() => {})
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const TYPE_FILTERS = [
    'All',
    'percentage',
    'fixed',
    'free_shipping',
    'buy_x_get_y',
  ]
  const STATUS_FILTERS = ['All', 'Active', 'Inactive', 'Expired']

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Discounts
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            {discounts.length} discount codes total
          </p>
        </div>
        <button
          onClick={openAdd}
          className='flex items-center gap-2 px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg transition-colors border-none cursor-pointer'
        >
          {Icons.plus} Create Discount
        </button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
        {[
          {
            label: 'Total Discounts',
            value: discounts.length,
            icon: Icons.tag,
            color: 'text-[#2C6ECB]',
            bg: 'bg-[#2C6ECB]/10',
          },
          {
            label: 'Active',
            value: activeCount,
            icon: Icons.check,
            color: 'text-[#008060]',
            bg: 'bg-[#008060]/10',
          },
          {
            label: 'Total Used',
            value: totalUsed,
            icon: Icons.percent,
            color: 'text-[#916A00]',
            bg: 'bg-[#FFC453]/20',
          },
          {
            label: 'Expired',
            value: expiredCount,
            icon: Icons.warning,
            color: 'text-[#D82C0D]',
            bg: 'bg-[#D82C0D]/10',
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

      {/* Table card */}
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        {/* Filters */}
        <div className='flex items-center gap-3 px-4 py-3 border-b border-[#E1E3E5] flex-wrap'>
          <div className='flex items-center gap-2 flex-1 min-w-50 px-3 py-2 border border-[#E1E3E5] rounded-lg bg-[#F6F6F7] focus-within:border-[#008060] focus-within:bg-white transition-all'>
            {Icons.search}
            <input
              type='text'
              placeholder='Search discounts...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='flex-1 bg-transparent text-[13px] text-[#202223] placeholder-[#8C9196] outline-none'
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className='text-[#8C9196] hover:text-[#202223] bg-transparent border-none cursor-pointer'
              >
                {Icons.close}
              </button>
            )}
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className='px-3 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            {TYPE_FILTERS.map((t) => (
              <option key={t} value={t}>
                {t === 'All'
                  ? 'All Types'
                  : t === 'percentage'
                    ? 'Percentage'
                    : t === 'fixed'
                      ? 'Fixed Amount'
                      : t === 'free_shipping'
                        ? 'Free Shipping'
                        : 'Buy X Get Y'}
              </option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className='px-3 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            {STATUS_FILTERS.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        {/* Status tabs */}
        <div className='flex items-center border-b border-[#E1E3E5] overflow-x-auto scrollbar-none px-4'>
          {STATUS_FILTERS.map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-4 py-2.5 text-[12.5px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${
                statusFilter === s
                  ? 'border-b-[#008060] text-[#008060]'
                  : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'
              }`}
            >
              {s}
              <span className='ml-1.5 text-[10.5px] text-[#8C9196]'>
                {s === 'All'
                  ? discounts.length
                  : s === 'Active'
                    ? activeCount
                    : s === 'Inactive'
                      ? discounts.filter((d) => !d.isActive).length
                      : expiredCount}
              </span>
            </button>
          ))}
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Code
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Type
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Value
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Usage
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Min Order
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Expires
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
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className='px-4 py-16 text-center'>
                    <div className='flex flex-col items-center gap-3'>
                      <div className='w-12 h-12 bg-[#F6F6F7] rounded-full flex items-center justify-center text-[#8C9196]'>
                        {Icons.tag}
                      </div>
                      <p className='text-[14px] font-medium text-[#202223]'>
                        No discounts found
                      </p>
                      <p className='text-[13px] text-[#6D7175]'>
                        Create your first discount code to get started
                      </p>
                      <button
                        onClick={openAdd}
                        className='px-4 py-2 bg-[#008060] text-white text-[13px] rounded-lg hover:bg-[#006e52] transition-colors border-none cursor-pointer'
                      >
                        Create Discount
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((discount) => {
                  const config = TYPE_CONFIG[discount.type]
                  const pct = usagePct(discount)
                  const expired = isExpired(discount)

                  return (
                    <tr
                      key={discount.id}
                      className='hover:bg-[#F6F6F7] transition-colors'
                    >
                      {/* Code */}
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-2'>
                          <code className='text-[13px] font-bold text-[#202223] bg-[#F6F6F7] border border-[#E1E3E5] px-2.5 py-1 rounded-lg tracking-wider'>
                            {discount.code}
                          </code>
                          <button
                            onClick={() => copyCode(discount.id, discount.code)}
                            className='w-6 h-6 flex items-center justify-center text-[#6D7175] hover:text-[#008060] hover:bg-[#F2F7F5] rounded transition-all bg-transparent border-none cursor-pointer'
                            title='Copy code'
                          >
                            {copiedId === discount.id ? (
                              <span className='text-[#008060]'>
                                {Icons.check}
                              </span>
                            ) : (
                              Icons.copy
                            )}
                          </button>
                        </div>
                        <p className='text-[11px] text-[#8C9196] mt-1 max-w-50 truncate'>
                          {discount.description}
                        </p>
                      </td>

                      {/* Type */}
                      <td className='px-4 py-3'>
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-medium ${config.bg} ${config.color}`}
                        >
                          {config.icon}
                          {config.label}
                        </span>
                      </td>

                      {/* Value */}
                      <td className='px-4 py-3'>
                        <span className='text-[13px] font-semibold text-[#202223]'>
                          {formatValue(discount)}
                        </span>
                      </td>

                      {/* Usage */}
                      <td className='px-4 py-3'>
                        <div className='space-y-1.5'>
                          <div className='flex items-center gap-1.5'>
                            <span className='text-[13px] font-medium text-[#202223]'>
                              {discount.usedCount}
                            </span>
                            {discount.maxUses && (
                              <span className='text-[11.5px] text-[#8C9196]'>
                                / {discount.maxUses}
                              </span>
                            )}
                          </div>
                          {pct !== null && (
                            <div className='w-24 h-1.5 bg-[#E1E3E5] rounded-full overflow-hidden'>
                              <div
                                className={`h-full rounded-full ${pct >= 90 ? 'bg-[#D82C0D]' : pct >= 70 ? 'bg-[#FFC453]' : 'bg-[#008060]'}`}
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Min Order */}
                      <td className='px-4 py-3'>
                        <span className='text-[12.5px] text-[#202223]'>
                          {discount.minOrderAmount > 0
                            ? `₹${discount.minOrderAmount}`
                            : 'None'}
                        </span>
                      </td>

                      {/* Expires */}
                      <td className='px-4 py-3'>
                        {discount.expiresAt ? (
                          <div>
                            <span
                              className={`text-[12.5px] ${expired ? 'text-[#D82C0D]' : 'text-[#202223]'}`}
                            >
                              {new Date(discount.expiresAt).toLocaleDateString(
                                'en-IN',
                                {
                                  day: 'numeric',
                                  month: 'short',
                                  year: 'numeric',
                                },
                              )}
                            </span>
                            {expired && (
                              <p className='text-[10.5px] text-[#D82C0D] font-medium'>
                                Expired
                              </p>
                            )}
                          </div>
                        ) : (
                          <span className='text-[12.5px] text-[#8C9196]'>
                            No expiry
                          </span>
                        )}
                      </td>

                      {/* Status toggle */}
                      <td className='px-4 py-3'>
                        <button
                          onClick={() => toggleActive(discount.id)}
                          disabled={expired}
                          className={`relative w-9 h-5 rounded-full transition-colors border-none cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
                            discount.isActive && !expired
                              ? 'bg-[#008060]'
                              : 'bg-[#8C9196]'
                          }`}
                        >
                          <span
                            className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                              discount.isActive && !expired
                                ? 'translate-x-4'
                                : 'translate-x-0.5'
                            }`}
                          />
                        </button>
                      </td>

                      {/* Actions */}
                      <td className='px-4 py-3'>
                        <div className='flex items-center justify-end gap-1'>
                          <button
                            onClick={() => openEdit(discount)}
                            className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg transition-all bg-transparent border-none cursor-pointer'
                            title='Edit'
                          >
                            {Icons.edit}
                          </button>
                          <button
                            onClick={() => setDeleteId(discount.id)}
                            className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#D82C0D] hover:bg-[#D82C0D]/5 rounded-lg transition-all bg-transparent border-none cursor-pointer'
                            title='Delete'
                          >
                            {Icons.trash}
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className='px-4 py-3 border-t border-[#E1E3E5]'>
          <p className='text-[12.5px] text-[#6D7175]'>
            Showing{' '}
            <span className='font-medium text-[#202223]'>
              {filtered.length}
            </span>{' '}
            of{' '}
            <span className='font-medium text-[#202223]'>
              {discounts.length}
            </span>{' '}
            discounts
          </p>
        </div>
      </div>

      {/* ── Add/Edit Modal ── */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setShowModal(false)}
          />
          <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-140 overflow-hidden max-h-[90vh] flex flex-col'>
            {/* Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-[#E1E3E5] shrink-0'>
              <h2 className='font-sora text-[16px] font-semibold text-[#202223]'>
                {editingId ? 'Edit Discount' : 'Create Discount'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
              >
                {Icons.close}
              </button>
            </div>

            {/* Body */}
            <div className='px-6 py-5 space-y-4 overflow-y-auto'>
              {/* Code */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Discount Code <span className='text-[#D82C0D]'>*</span>
                </label>
                <div className='flex gap-2'>
                  <input
                    type='text'
                    value={form.code}
                    onChange={(e) =>
                      setForm((f) => ({
                        ...f,
                        code: e.target.value.toUpperCase(),
                      }))
                    }
                    placeholder='e.g. APEX10'
                    className='flex-1 px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all font-mono tracking-wider uppercase'
                  />
                  <button
                    onClick={() =>
                      setForm((f) => ({ ...f, code: generateCode() }))
                    }
                    className='px-3 py-2.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[12.5px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer whitespace-nowrap'
                  >
                    Generate
                  </button>
                </div>
              </div>

              {/* Type */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-2'>
                  Discount Type
                </label>
                <div className='grid grid-cols-2 gap-2'>
                  {(
                    Object.entries(TYPE_CONFIG) as [
                      DiscountType,
                      (typeof TYPE_CONFIG)[DiscountType],
                    ][]
                  ).map(([type, config]) => (
                    <button
                      key={type}
                      onClick={() => setForm((f) => ({ ...f, type }))}
                      className={`flex items-center gap-2.5 p-3 border rounded-lg text-left transition-all cursor-pointer ${
                        form.type === type
                          ? 'border-[#008060] bg-[#F2F7F5]'
                          : 'border-[#E1E3E5] bg-white hover:bg-[#F6F6F7]'
                      }`}
                    >
                      <span
                        className={`${form.type === type ? config.color : 'text-[#6D7175]'}`}
                      >
                        {config.icon}
                      </span>
                      <span
                        className={`text-[12.5px] font-medium ${form.type === type ? 'text-[#008060]' : 'text-[#202223]'}`}
                      >
                        {config.label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Value */}
              {(form.type === 'percentage' || form.type === 'fixed') && (
                <div>
                  <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                    {form.type === 'percentage'
                      ? 'Discount %'
                      : 'Discount Amount (₹)'}
                  </label>
                  <div className='relative'>
                    <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D7175] text-[13px]'>
                      {form.type === 'percentage' ? '%' : '₹'}
                    </span>
                    <input
                      type='number'
                      value={form.value}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, value: e.target.value }))
                      }
                      placeholder={form.type === 'percentage' ? '10' : '200'}
                      min='0'
                      max={form.type === 'percentage' ? '100' : undefined}
                      className='w-full pl-8 pr-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                    />
                  </div>
                </div>
              )}

              {/* Min order + Max uses */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                    Min Order Amount (₹)
                  </label>
                  <input
                    type='number'
                    value={form.minOrderAmount}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, minOrderAmount: e.target.value }))
                    }
                    placeholder='0'
                    min='0'
                    className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                  />
                </div>
                <div>
                  <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                    Max Uses
                    <span className='ml-1 text-[11px] text-[#8C9196] font-normal'>
                      (leave blank for unlimited)
                    </span>
                  </label>
                  <input
                    type='number'
                    value={form.maxUses}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, maxUses: e.target.value }))
                    }
                    placeholder='Unlimited'
                    min='1'
                    className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                  />
                </div>
              </div>

              {/* Dates */}
              <div className='grid grid-cols-2 gap-4'>
                <div>
                  <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                    Start Date
                  </label>
                  <div className='relative'>
                    <input
                      type='date'
                      value={form.startsAt}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, startsAt: e.target.value }))
                      }
                      className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                    />
                  </div>
                </div>
                <div>
                  <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                    End Date
                    <span className='ml-1 text-[11px] text-[#8C9196] font-normal'>
                      (optional)
                    </span>
                  </label>
                  <input
                    type='date'
                    value={form.expiresAt}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, expiresAt: e.target.value }))
                    }
                    className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Description
                </label>
                <input
                  type='text'
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder='Internal note about this discount'
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                />
              </div>

              {/* Active toggle */}
              <div className='flex items-center justify-between p-3 border border-[#E1E3E5] rounded-lg'>
                <div>
                  <p className='text-[13px] font-medium text-[#202223]'>
                    Active
                  </p>
                  <p className='text-[11.5px] text-[#6D7175]'>
                    Enable this discount immediately
                  </p>
                </div>
                <button
                  onClick={() =>
                    setForm((f) => ({ ...f, isActive: !f.isActive }))
                  }
                  className={`relative w-10 h-6 rounded-full transition-colors border-none cursor-pointer ${form.isActive ? 'bg-[#008060]' : 'bg-[#8C9196]'}`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.isActive ? 'translate-x-4' : 'translate-x-0.5'}`}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[#E1E3E5] bg-[#F6F6F7]/50 shrink-0'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.code}
                className='px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50 cursor-pointer border-none flex items-center gap-2'
              >
                {saving ? (
                  <>
                    <svg
                      className='animate-spin w-3.5 h-3.5'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
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
                    Saving...
                  </>
                ) : editingId ? (
                  'Save Changes'
                ) : (
                  'Create Discount'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Modal ── */}
      {deleteId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setDeleteId(null)}
          />
          <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-95 p-6'>
            <div className='w-12 h-12 bg-[#D82C0D]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
              {Icons.warning}
            </div>
            <h3 className='font-sora text-[16px] font-semibold text-[#202223] text-center mb-2'>
              Delete Discount
            </h3>
            <p className='text-[13px] text-[#6D7175] text-center leading-relaxed mb-6'>
              Are you sure you want to delete{' '}
              <strong className='text-[#202223] font-mono'>
                {discounts.find((d) => d.id === deleteId)?.code}
              </strong>
              ? This cannot be undone.
            </p>
            <div className='flex gap-3'>
              <button
                onClick={() => setDeleteId(null)}
                className='flex-1 py-2.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className='flex-1 py-2.5 bg-[#D82C0D] hover:bg-[#be2209] text-white text-[13px] font-semibold rounded-lg transition-colors border-none cursor-pointer'
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

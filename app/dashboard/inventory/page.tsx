'use client'

import { useState } from 'react'

// ─── Types ───────────────────────────────────────────────────────
interface InventoryItem {
  id: string
  name: string
  sku: string
  sport: string
  brand: string
  category: string
  icon: string
  stock: number
  lowStockThreshold: number
  reserved: number
  incoming: number
  price: number
  costPrice: number
  lastUpdated: string
}

// ─── Mock Data ───────────────────────────────────────────────────
const INITIAL_INVENTORY: InventoryItem[] = [
  {
    id: '1',
    name: 'Pro Strike Football Boots',
    sku: 'FB-001',
    sport: 'Football',
    brand: 'Nike',
    category: 'Footwear',
    icon: '⚽',
    stock: 48,
    lowStockThreshold: 10,
    reserved: 5,
    incoming: 0,
    price: 4999,
    costPrice: 2800,
    lastUpdated: '2h ago',
  },
  {
    id: '2',
    name: 'Championship Cricket Bat',
    sku: 'CR-001',
    sport: 'Cricket',
    brand: 'MRF',
    category: 'Equipment',
    icon: '🏏',
    stock: 3,
    lowStockThreshold: 10,
    reserved: 1,
    incoming: 20,
    price: 3499,
    costPrice: 1800,
    lastUpdated: '1d ago',
  },
  {
    id: '3',
    name: 'Speed Runner Pro X',
    sku: 'RN-001',
    sport: 'Running',
    brand: 'Adidas',
    category: 'Footwear',
    icon: '👟',
    stock: 22,
    lowStockThreshold: 10,
    reserved: 3,
    incoming: 0,
    price: 7999,
    costPrice: 4200,
    lastUpdated: '3h ago',
  },
  {
    id: '4',
    name: 'Tennis Racket Elite 300',
    sku: 'TN-001',
    sport: 'Tennis',
    brand: 'Wilson',
    category: 'Equipment',
    icon: '🎾',
    stock: 0,
    lowStockThreshold: 5,
    reserved: 0,
    incoming: 15,
    price: 5999,
    costPrice: 3200,
    lastUpdated: '2d ago',
  },
  {
    id: '5',
    name: 'Boxing Gloves Pro 16oz',
    sku: 'BX-001',
    sport: 'Boxing',
    brand: 'Everlast',
    category: 'Protection',
    icon: '🥊',
    stock: 15,
    lowStockThreshold: 8,
    reserved: 2,
    incoming: 0,
    price: 2499,
    costPrice: 1200,
    lastUpdated: '5h ago',
  },
  {
    id: '6',
    name: 'Basketball Indoor Pro',
    sku: 'BB-001',
    sport: 'Basketball',
    brand: 'Spalding',
    category: 'Equipment',
    icon: '🏀',
    stock: 0,
    lowStockThreshold: 5,
    reserved: 0,
    incoming: 0,
    price: 3299,
    costPrice: 1800,
    lastUpdated: '3d ago',
  },
  {
    id: '7',
    name: 'Swimming Goggles Elite',
    sku: 'SW-001',
    sport: 'Swimming',
    brand: 'Speedo',
    category: 'Accessories',
    icon: '🏊',
    stock: 67,
    lowStockThreshold: 15,
    reserved: 4,
    incoming: 0,
    price: 1299,
    costPrice: 600,
    lastUpdated: '1h ago',
  },
  {
    id: '8',
    name: 'Cycling Helmet Pro',
    sku: 'CY-001',
    sport: 'Cycling',
    brand: 'Giro',
    category: 'Protection',
    icon: '🚴',
    stock: 11,
    lowStockThreshold: 8,
    reserved: 1,
    incoming: 10,
    price: 4599,
    costPrice: 2400,
    lastUpdated: '6h ago',
  },
  {
    id: '9',
    name: 'Football Shin Guards',
    sku: 'FB-002',
    sport: 'Football',
    brand: 'Nike',
    category: 'Protection',
    icon: '🦺',
    stock: 94,
    lowStockThreshold: 20,
    reserved: 8,
    incoming: 0,
    price: 899,
    costPrice: 400,
    lastUpdated: '30m ago',
  },
  {
    id: '10',
    name: 'Cricket Batting Pads',
    sku: 'CR-002',
    sport: 'Cricket',
    brand: 'SS',
    category: 'Protection',
    icon: '🏏',
    stock: 5,
    lowStockThreshold: 8,
    reserved: 1,
    incoming: 12,
    price: 1899,
    costPrice: 950,
    lastUpdated: '4h ago',
  },
]

const SPORTS = [
  'All',
  'Football',
  'Cricket',
  'Running',
  'Tennis',
  'Boxing',
  'Basketball',
  'Swimming',
  'Cycling',
]
const STOCK_FILTERS = ['All', 'In Stock', 'Low Stock', 'Out of Stock']

function getStockStatus(item: InventoryItem): 'out' | 'low' | 'ok' {
  if (item.stock === 0) return 'out'
  if (item.stock <= item.lowStockThreshold) return 'low'
  return 'ok'
}

function StockBar({ item }: { item: InventoryItem }) {
  const max = Math.max(
    item.stock + item.reserved,
    item.lowStockThreshold * 3,
    20,
  )
  const pct = Math.min((item.stock / max) * 100, 100)
  const status = getStockStatus(item)
  return (
    <div className='w-24'>
      <div className='h-1.5 bg-[#E1E3E5] rounded-full overflow-hidden'>
        <div
          className={`h-full rounded-full transition-all ${
            status === 'out'
              ? 'bg-[#D82C0D]'
              : status === 'low'
                ? 'bg-[#FFC453]'
                : 'bg-[#008060]'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>(INITIAL_INVENTORY)
  const [search, setSearch] = useState('')
  const [sportFilter, setSportFilter] = useState('All')
  const [stockFilter, setStockFilter] = useState('All')
  const [adjustId, setAdjustId] = useState<string | null>(null)
  const [adjustQty, setAdjustQty] = useState('')
  const [adjustType, setAdjustType] = useState<'add' | 'remove' | 'set'>('add')
  const [adjustReason, setAdjustReason] = useState('restock')
  const [saving, setSaving] = useState(false)

  // Filtered
  const filtered = inventory.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase())
    const matchSport = sportFilter === 'All' || item.sport === sportFilter
    const status = getStockStatus(item)
    const matchStock =
      stockFilter === 'All' ||
      (stockFilter === 'In Stock' && status === 'ok') ||
      (stockFilter === 'Low Stock' && status === 'low') ||
      (stockFilter === 'Out of Stock' && status === 'out')
    return matchSearch && matchSport && matchStock
  })

  // Stats
  const outOfStock = inventory.filter((i) => i.stock === 0).length
  const lowStock = inventory.filter(
    (i) => i.stock > 0 && i.stock <= i.lowStockThreshold,
  ).length
  const inStock = inventory.filter((i) => i.stock > i.lowStockThreshold).length
  const totalValue = inventory.reduce((s, i) => s + i.stock * i.costPrice, 0)

  const adjustItem = inventory.find((i) => i.id === adjustId)

  const handleAdjust = async () => {
    if (!adjustId || !adjustQty) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))

    const qty = parseInt(adjustQty)
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== adjustId) return item
        let newStock = item.stock
        if (adjustType === 'add') newStock = Math.max(0, item.stock + qty)
        if (adjustType === 'remove') newStock = Math.max(0, item.stock - qty)
        if (adjustType === 'set') newStock = Math.max(0, qty)
        return { ...item, stock: newStock, lastUpdated: 'Just now' }
      }),
    )

    setSaving(false)
    setAdjustId(null)
    setAdjustQty('')
  }

  const formatCurrency = (n: number) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(n)

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Inventory
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            Track and manage your product stock levels
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'>
            Export CSV
          </button>
          <button className='px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg transition-colors border-none cursor-pointer'>
            Bulk Adjust
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 xl:grid-cols-4 gap-4'>
        {[
          {
            label: 'In Stock',
            value: inStock,
            icon: '✅',
            color: 'text-[#008060]',
            bg: 'bg-[#008060]/10',
            bar: 'bg-[#008060]',
            pct: (inStock / inventory.length) * 100,
          },
          {
            label: 'Low Stock',
            value: lowStock,
            icon: '⚠️',
            color: 'text-[#916A00]',
            bg: 'bg-[#FFC453]/20',
            bar: 'bg-[#FFC453]',
            pct: (lowStock / inventory.length) * 100,
          },
          {
            label: 'Out of Stock',
            value: outOfStock,
            icon: '❌',
            color: 'text-[#D82C0D]',
            bg: 'bg-[#D82C0D]/10',
            bar: 'bg-[#D82C0D]',
            pct: (outOfStock / inventory.length) * 100,
          },
          {
            label: 'Inventory Value',
            value: formatCurrency(totalValue),
            icon: '💰',
            color: 'text-[#2C6ECB]',
            bg: 'bg-[#2C6ECB]/10',
            bar: 'bg-[#2C6ECB]',
            pct: 100,
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className='bg-white border border-[#E1E3E5] rounded-xl p-5'
          >
            <div className='flex items-center justify-between mb-3'>
              <div
                className={`w-9 h-9 ${stat.bg} rounded-lg flex items-center justify-center text-lg`}
              >
                {stat.icon}
              </div>
              <span className={`font-sora text-[22px] font-bold ${stat.color}`}>
                {stat.value}
              </span>
            </div>
            <p className='text-[12.5px] text-[#6D7175] mb-2'>{stat.label}</p>
            <div className='h-1.5 bg-[#E1E3E5] rounded-full overflow-hidden'>
              <div
                className={`h-full rounded-full ${stat.bar}`}
                style={{ width: `${stat.pct}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Low stock alert */}
      {lowStock + outOfStock > 0 && (
        <div className='flex items-center gap-3 px-4 py-3 bg-[#FFC453]/10 border border-[#FFC453]/30 rounded-xl'>
          <span className='text-xl shrink-0'>⚠️</span>
          <p className='text-[13px] text-[#202223]'>
            <strong>{outOfStock} products are out of stock</strong> and{' '}
            <strong>{lowStock} are running low.</strong> Review and restock to
            avoid missed sales.
          </p>
          <button
            onClick={() => setStockFilter('Low Stock')}
            className='ml-auto px-3 py-1.5 bg-white border border-[#E1E3E5] text-[12.5px] font-medium text-[#202223] rounded-lg hover:bg-[#F6F6F7] transition-colors shrink-0 cursor-pointer'
          >
            View Low Stock
          </button>
        </div>
      )}

      {/* Table card */}
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        {/* Filters */}
        <div className='flex items-center gap-3 px-4 py-3 border-b border-[#E1E3E5] flex-wrap'>
          <div className='flex items-center gap-2 flex-1 min-w-45 px-3 py-2 border border-[#E1E3E5] rounded-lg bg-[#F6F6F7] focus-within:border-[#008060] focus-within:bg-white transition-all'>
            <svg
              width='14'
              height='14'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#8C9196'
              strokeWidth='2'
            >
              <circle cx='11' cy='11' r='8' />
              <line x1='21' y1='21' x2='16.65' y2='16.65' />
            </svg>
            <input
              type='text'
              placeholder='Search by name, SKU, brand...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className='flex-1 bg-transparent text-[13px] text-[#202223] placeholder-[#8C9196] outline-none'
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className='text-[#8C9196] hover:text-[#202223] bg-transparent border-none cursor-pointer'
              >
                ✕
              </button>
            )}
          </div>
          <select
            value={sportFilter}
            onChange={(e) => setSportFilter(e.target.value)}
            className='px-3 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            {SPORTS.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Sports' : s}
              </option>
            ))}
          </select>
          <select
            value={stockFilter}
            onChange={(e) => setStockFilter(e.target.value)}
            className='px-3 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            {STOCK_FILTERS.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>

        {/* Stock filter tabs */}
        <div className='flex items-center border-b border-[#E1E3E5] overflow-x-auto scrollbar-none px-4'>
          {STOCK_FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStockFilter(f)}
              className={`px-4 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${
                stockFilter === f
                  ? 'border-b-[#008060] text-[#008060]'
                  : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'
              }`}
            >
              {f}
              <span className='ml-1.5 text-[11px] text-[#8C9196]'>
                {f === 'All'
                  ? inventory.length
                  : f === 'In Stock'
                    ? inStock
                    : f === 'Low Stock'
                      ? lowStock
                      : outOfStock}
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
                  Product
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  SKU
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Stock
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Reserved
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Incoming
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Value
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Updated
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
                    <div className='flex flex-col items-center gap-2'>
                      <span className='text-4xl'>📦</span>
                      <p className='text-[14px] font-medium text-[#202223]'>
                        No items found
                      </p>
                      <p className='text-[13px] text-[#6D7175]'>
                        Try adjusting your search or filters
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((item) => {
                  const status = getStockStatus(item)
                  const stockValue = item.stock * item.costPrice
                  return (
                    <tr
                      key={item.id}
                      className='hover:bg-[#F6F6F7] transition-colors'
                    >
                      {/* Product */}
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-3'>
                          <div className='w-9 h-9 bg-[#F6F6F7] border border-[#E1E3E5] rounded-lg flex items-center justify-center text-lg shrink-0'>
                            {item.icon}
                          </div>
                          <div className='min-w-0'>
                            <p className='text-[13px] font-medium text-[#202223] truncate max-w-45'>
                              {item.name}
                            </p>
                            <p className='text-[11.5px] text-[#8C9196]'>
                              {item.brand} · {item.sport}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* SKU */}
                      <td className='px-4 py-3'>
                        <code className='text-[11.5px] text-[#6D7175] bg-[#F6F6F7] px-2 py-0.5 rounded'>
                          {item.sku}
                        </code>
                      </td>

                      {/* Stock */}
                      <td className='px-4 py-3'>
                        <div className='space-y-1.5'>
                          <div className='flex items-center gap-2'>
                            <span
                              className={`text-[13px] font-semibold ${
                                status === 'out'
                                  ? 'text-[#D82C0D]'
                                  : status === 'low'
                                    ? 'text-[#916A00]'
                                    : 'text-[#202223]'
                              }`}
                            >
                              {item.stock}
                            </span>
                            <span
                              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                                status === 'out'
                                  ? 'bg-[#D82C0D]/10 text-[#D82C0D]'
                                  : status === 'low'
                                    ? 'bg-[#FFC453]/20 text-[#916A00]'
                                    : 'bg-[#008060]/10 text-[#008060]'
                              }`}
                            >
                              {status === 'out'
                                ? 'Out'
                                : status === 'low'
                                  ? 'Low'
                                  : 'OK'}
                            </span>
                          </div>
                          <StockBar item={item} />
                          <p className='text-[10.5px] text-[#8C9196]'>
                            Threshold: {item.lowStockThreshold}
                          </p>
                        </div>
                      </td>

                      {/* Reserved */}
                      <td className='px-4 py-3'>
                        <span className='text-[13px] text-[#202223]'>
                          {item.reserved}
                        </span>
                        <p className='text-[11px] text-[#8C9196]'>in orders</p>
                      </td>

                      {/* Incoming */}
                      <td className='px-4 py-3'>
                        {item.incoming > 0 ? (
                          <div>
                            <span className='text-[13px] font-medium text-[#2C6ECB]'>
                              +{item.incoming}
                            </span>
                            <p className='text-[11px] text-[#8C9196]'>
                              on the way
                            </p>
                          </div>
                        ) : (
                          <span className='text-[13px] text-[#8C9196]'>—</span>
                        )}
                      </td>

                      {/* Value */}
                      <td className='px-4 py-3'>
                        <span className='text-[13px] font-medium text-[#202223]'>
                          {formatCurrency(stockValue)}
                        </span>
                        <p className='text-[11px] text-[#8C9196]'>cost value</p>
                      </td>

                      {/* Updated */}
                      <td className='px-4 py-3'>
                        <span className='text-[12.5px] text-[#6D7175]'>
                          {item.lastUpdated}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className='px-4 py-3'>
                        <div className='flex items-center justify-end gap-1'>
                          <button
                            onClick={() => {
                              setAdjustId(item.id)
                              setAdjustQty('')
                              setAdjustType('add')
                              setAdjustReason('restock')
                            }}
                            className='px-2.5 py-1.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[12px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer flex items-center gap-1'
                          >
                            <svg
                              width='12'
                              height='12'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2.5'
                            >
                              <line x1='12' y1='5' x2='12' y2='19' />
                              <line x1='5' y1='12' x2='19' y2='12' />
                            </svg>
                            Adjust
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
        <div className='flex items-center justify-between px-4 py-3 border-t border-[#E1E3E5]'>
          <p className='text-[12.5px] text-[#6D7175]'>
            Showing{' '}
            <span className='font-medium text-[#202223]'>
              {filtered.length}
            </span>{' '}
            of{' '}
            <span className='font-medium text-[#202223]'>
              {inventory.length}
            </span>{' '}
            items · Total value:{' '}
            <span className='font-medium text-[#202223]'>
              {formatCurrency(totalValue)}
            </span>
          </p>
          <div className='flex items-center gap-1'>
            <button
              className='px-3 py-1.5 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#6D7175] bg-white cursor-pointer hover:bg-[#F6F6F7] disabled:opacity-40 transition-colors'
              disabled
            >
              ← Prev
            </button>
            <button className='px-3 py-1.5 bg-[#008060] text-white rounded-lg text-[12.5px] font-medium border-none cursor-pointer'>
              1
            </button>
            <button className='px-3 py-1.5 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#6D7175] bg-white cursor-pointer hover:bg-[#F6F6F7] transition-colors'>
              Next →
            </button>
          </div>
        </div>
      </div>

      {/* ── Adjust Stock Modal ── */}
      {adjustId && adjustItem && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setAdjustId(null)}
          />
          <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-110 overflow-hidden'>
            {/* Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-[#E1E3E5]'>
              <h2 className='font-sora text-[16px] font-semibold text-[#202223]'>
                Adjust Stock
              </h2>
              <button
                onClick={() => setAdjustId(null)}
                className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg transition-all bg-transparent border-none cursor-pointer'
              >
                ✕
              </button>
            </div>

            <div className='px-6 py-5 space-y-4'>
              {/* Product info */}
              <div className='flex items-center gap-3 p-3 bg-[#F6F6F7] rounded-lg border border-[#E1E3E5]'>
                <div className='w-10 h-10 bg-white border border-[#E1E3E5] rounded-lg flex items-center justify-center text-xl shrink-0'>
                  {adjustItem.icon}
                </div>
                <div className='min-w-0'>
                  <p className='text-[13px] font-medium text-[#202223] truncate'>
                    {adjustItem.name}
                  </p>
                  <p className='text-[11.5px] text-[#6D7175]'>
                    SKU: {adjustItem.sku} · Current stock:{' '}
                    <strong>{adjustItem.stock}</strong>
                  </p>
                </div>
              </div>

              {/* Adjustment type */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-2'>
                  Adjustment Type
                </label>
                <div className='grid grid-cols-3 gap-2'>
                  {[
                    { value: 'add', label: 'Add Stock', icon: '+' },
                    { value: 'remove', label: 'Remove', icon: '−' },
                    { value: 'set', label: 'Set to', icon: '=' },
                  ].map((t) => (
                    <button
                      key={t.value}
                      onClick={() =>
                        setAdjustType(t.value as 'add' | 'remove' | 'set')
                      }
                      className={`flex flex-col items-center gap-1 p-3 border rounded-lg text-[12px] font-medium transition-all cursor-pointer ${
                        adjustType === t.value
                          ? 'border-[#008060] bg-[#F2F7F5] text-[#008060]'
                          : 'border-[#E1E3E5] bg-white text-[#6D7175] hover:bg-[#F6F6F7]'
                      }`}
                    >
                      <span className='text-[18px] leading-none font-bold'>
                        {t.icon}
                      </span>
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Quantity
                </label>
                <input
                  type='number'
                  value={adjustQty}
                  onChange={(e) => setAdjustQty(e.target.value)}
                  placeholder='Enter quantity'
                  min='0'
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                />
                {adjustQty && (
                  <p className='text-[12px] text-[#6D7175] mt-1.5'>
                    New stock will be:{' '}
                    <strong className='text-[#202223]'>
                      {adjustType === 'add'
                        ? Math.max(
                            0,
                            adjustItem.stock + parseInt(adjustQty || '0'),
                          )
                        : adjustType === 'remove'
                          ? Math.max(
                              0,
                              adjustItem.stock - parseInt(adjustQty || '0'),
                            )
                          : parseInt(adjustQty || '0')}
                    </strong>
                  </p>
                )}
              </div>

              {/* Reason */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Reason
                </label>
                <select
                  value={adjustReason}
                  onChange={(e) => setAdjustReason(e.target.value)}
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all cursor-pointer'
                >
                  <option value='restock'>Restock / New shipment</option>
                  <option value='return'>Customer return</option>
                  <option value='damaged'>Damaged / Defective</option>
                  <option value='correction'>Inventory correction</option>
                  <option value='transfer'>Store transfer</option>
                  <option value='other'>Other</option>
                </select>
              </div>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[#E1E3E5] bg-[#F6F6F7]/50'>
              <button
                onClick={() => setAdjustId(null)}
                className='px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={handleAdjust}
                disabled={saving || !adjustQty}
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
                ) : (
                  'Apply Adjustment'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

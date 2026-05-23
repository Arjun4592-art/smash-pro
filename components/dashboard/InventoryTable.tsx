'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface InventoryRow {
  id: string
  name: string
  sku: string
  sport: string
  brand: string
  icon: string
  stock: number
  lowStockThreshold: number
  reserved: number
  incoming: number
  costPrice: number
  lastUpdated: string
}

interface InventoryTableProps {
  items: InventoryRow[]
  showFilters?: boolean
  showPagination?: boolean
  limit?: number
  title?: string
  viewAllHref?: string
  loading?: boolean
  onAdjust?: (
    id: string,
    qty: number,
    type: 'add' | 'remove' | 'set',
    reason: string,
  ) => void
}

function getStockStatus(item: InventoryRow): 'out' | 'low' | 'ok' {
  if (item.stock === 0) return 'out'
  if (item.stock <= item.lowStockThreshold) return 'low'
  return 'ok'
}

function StockBar({ item }: { item: InventoryRow }) {
  const max = Math.max(
    item.stock + item.reserved,
    item.lowStockThreshold * 3,
    20,
  )
  const pct = Math.min((item.stock / max) * 100, 100)
  const status = getStockStatus(item)
  return (
    <div className='w-20'>
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

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

export default function InventoryTable({
  items,
  showFilters = true,
  showPagination = true,
  limit,
  title,
  viewAllHref,
  loading = false,
  onAdjust,
}: InventoryTableProps) {
  const [search, setSearch] = useState('')
  const [stockFilter, setStockFilter] = useState('All')
  const [adjustId, setAdjustId] = useState<string | null>(null)
  const [adjustQty, setAdjustQty] = useState('')
  const [adjustType, setAdjustType] = useState<'add' | 'remove' | 'set'>('add')
  const [adjustReason, setAdjustReason] = useState('restock')
  const [saving, setSaving] = useState(false)
  const [page, setPage] = useState(1)
  const pageSize = limit ?? 10

  const STOCK_FILTERS = ['All', 'In Stock', 'Low Stock', 'Out of Stock']

  const filtered = items.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.sku.toLowerCase().includes(search.toLowerCase())
    const status = getStockStatus(item)
    const matchStock =
      stockFilter === 'All' ||
      (stockFilter === 'In Stock' && status === 'ok') ||
      (stockFilter === 'Low Stock' && status === 'low') ||
      (stockFilter === 'Out of Stock' && status === 'out')
    return matchSearch && matchStock
  })

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = limit
    ? filtered.slice(0, limit)
    : filtered.slice((page - 1) * pageSize, page * pageSize)

  const adjustItem = items.find((i) => i.id === adjustId)

  const handleAdjust = async () => {
    if (!adjustId || !adjustQty) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 600))
    onAdjust?.(adjustId, parseInt(adjustQty), adjustType, adjustReason)
    setSaving(false)
    setAdjustId(null)
    setAdjustQty('')
  }

  if (loading) {
    return (
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden animate-pulse'>
        <div className='px-5 py-4 border-b border-[#E1E3E5]'>
          <div className='w-32 h-4 bg-[#E1E3E5] rounded' />
        </div>
        <div className='divide-y divide-[#F1F1F1]'>
          {[...Array(5)].map((_, i) => (
            <div key={i} className='px-5 py-4 flex items-center gap-4'>
              <div className='w-9 h-9 bg-[#E1E3E5] rounded-lg shrink-0' />
              <div className='flex-1 space-y-2'>
                <div className='w-40 h-3 bg-[#E1E3E5] rounded' />
                <div className='w-24 h-3 bg-[#E1E3E5] rounded' />
              </div>
              <div className='w-16 h-3 bg-[#E1E3E5] rounded' />
              <div className='w-20 h-3 bg-[#E1E3E5] rounded' />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <>
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        {/* Header */}
        {(title || viewAllHref) && (
          <div className='flex items-center justify-between px-5 py-4 border-b border-[#E1E3E5]'>
            {title && (
              <h3 className='font-sora text-[15px] font-semibold text-[#202223]'>
                {title}
              </h3>
            )}
            {viewAllHref && (
              <Link
                href={viewAllHref}
                className='text-[12.5px] text-[#008060] hover:text-[#006e52] no-underline font-medium transition-colors'
              >
                View all →
              </Link>
            )}
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <>
            <div className='flex items-center gap-3 px-4 py-3 border-b border-[#E1E3E5] flex-wrap'>
              <div className='flex items-center gap-2 flex-1 min-w-45 px-3 py-2 border border-[#E1E3E5] rounded-lg bg-[#F6F6F7] focus-within:border-[#008060] focus-within:bg-white transition-all'>
                <svg
                  width='13'
                  height='13'
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
                  placeholder='Search inventory...'
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
                    className='text-[#8C9196] bg-transparent border-none cursor-pointer text-sm'
                  >
                    ✕
                  </button>
                )}
              </div>
              <select
                value={stockFilter}
                onChange={(e) => {
                  setStockFilter(e.target.value)
                  setPage(1)
                }}
                className='px-3 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
              >
                {STOCK_FILTERS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* Stock tabs */}
            <div className='flex items-center border-b border-[#E1E3E5] overflow-x-auto scrollbar-none px-4'>
              {STOCK_FILTERS.map((f) => {
                const count =
                  f === 'All'
                    ? items.length
                    : f === 'In Stock'
                      ? items.filter((i) => getStockStatus(i) === 'ok').length
                      : f === 'Low Stock'
                        ? items.filter((i) => getStockStatus(i) === 'low')
                            .length
                        : items.filter((i) => getStockStatus(i) === 'out')
                            .length
                return (
                  <button
                    key={f}
                    onClick={() => {
                      setStockFilter(f)
                      setPage(1)
                    }}
                    className={`px-4 py-2.5 text-[12.5px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${
                      stockFilter === f
                        ? 'border-b-[#008060] text-[#008060]'
                        : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'
                    }`}
                  >
                    {f}{' '}
                    <span className='ml-1 text-[10.5px] text-[#8C9196]'>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </>
        )}

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
              {paginated.length === 0 ? (
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
                paginated.map((item) => {
                  const status = getStockStatus(item)
                  return (
                    <tr
                      key={item.id}
                      className='hover:bg-[#F6F6F7] transition-colors'
                    >
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
                      <td className='px-4 py-3'>
                        <code className='text-[11.5px] text-[#6D7175] bg-[#F6F6F7] px-2 py-0.5 rounded'>
                          {item.sku}
                        </code>
                      </td>
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
                        </div>
                      </td>
                      <td className='px-4 py-3'>
                        <span className='text-[13px] text-[#202223]'>
                          {item.reserved}
                        </span>
                        <p className='text-[11px] text-[#8C9196]'>in orders</p>
                      </td>
                      <td className='px-4 py-3'>
                        {item.incoming > 0 ? (
                          <span className='text-[13px] font-medium text-[#2C6ECB]'>
                            +{item.incoming}
                          </span>
                        ) : (
                          <span className='text-[13px] text-[#8C9196]'>—</span>
                        )}
                      </td>
                      <td className='px-4 py-3'>
                        <span className='text-[13px] font-medium text-[#202223]'>
                          {formatCurrency(item.stock * item.costPrice)}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <span className='text-[12.5px] text-[#6D7175]'>
                          {item.lastUpdated}
                        </span>
                      </td>
                      <td className='px-4 py-3'>
                        <div className='flex items-center justify-end'>
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
                              width='11'
                              height='11'
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

        {/* Pagination */}
        {showPagination && !limit && totalPages > 1 && (
          <div className='flex items-center justify-between px-4 py-3 border-t border-[#E1E3E5]'>
            <p className='text-[12.5px] text-[#6D7175]'>
              Showing{' '}
              <span className='font-medium text-[#202223]'>
                {(page - 1) * pageSize + 1}–
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
                  className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer ${page === i + 1 ? 'bg-[#008060] text-white border-none' : 'border border-[#E1E3E5] text-[#6D7175] bg-white hover:bg-[#F6F6F7]'}`}
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
        )}
      </div>

      {/* Adjust Modal */}
      {adjustId && adjustItem && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setAdjustId(null)}
          />
          <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-105 overflow-hidden'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-[#E1E3E5]'>
              <h2 className='font-sora text-[16px] font-semibold text-[#202223]'>
                Adjust Stock
              </h2>
              <button
                onClick={() => setAdjustId(null)}
                className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
              >
                ✕
              </button>
            </div>
            <div className='px-6 py-5 space-y-4'>
              <div className='flex items-center gap-3 p-3 bg-[#F6F6F7] rounded-lg'>
                <div className='w-10 h-10 bg-white border border-[#E1E3E5] rounded-lg flex items-center justify-center text-xl'>
                  {adjustItem.icon}
                </div>
                <div>
                  <p className='text-[13px] font-medium text-[#202223]'>
                    {adjustItem.name}
                  </p>
                  <p className='text-[11.5px] text-[#6D7175]'>
                    Current: <strong>{adjustItem.stock}</strong>
                  </p>
                </div>
              </div>
              <div className='grid grid-cols-3 gap-2'>
                {[
                  { value: 'add', label: 'Add', icon: '+' },
                  { value: 'remove', label: 'Remove', icon: '−' },
                  { value: 'set', label: 'Set to', icon: '=' },
                ].map((t) => (
                  <button
                    key={t.value}
                    onClick={() =>
                      setAdjustType(t.value as 'add' | 'remove' | 'set')
                    }
                    className={`flex flex-col items-center gap-1 p-3 border rounded-lg text-[12px] font-medium cursor-pointer transition-all ${adjustType === t.value ? 'border-[#008060] bg-[#F2F7F5] text-[#008060]' : 'border-[#E1E3E5] bg-white text-[#6D7175] hover:bg-[#F6F6F7]'}`}
                  >
                    <span className='text-lg font-bold'>{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
              <input
                type='number'
                value={adjustQty}
                onChange={(e) => setAdjustQty(e.target.value)}
                placeholder='Enter quantity'
                min='0'
                className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
              />
              {adjustQty && (
                <p className='text-[12px] text-[#6D7175]'>
                  New stock:{' '}
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
              <select
                value={adjustReason}
                onChange={(e) => setAdjustReason(e.target.value)}
                className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none focus:border-[#008060] transition-all cursor-pointer'
              >
                <option value='restock'>Restock / New shipment</option>
                <option value='return'>Customer return</option>
                <option value='damaged'>Damaged / Defective</option>
                <option value='correction'>Inventory correction</option>
                <option value='transfer'>Store transfer</option>
                <option value='other'>Other</option>
              </select>
            </div>
            <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[#E1E3E5] bg-[#F6F6F7]/50'>
              <button
                onClick={() => setAdjustId(null)}
                className='px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg cursor-pointer transition-colors'
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
                  'Apply'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

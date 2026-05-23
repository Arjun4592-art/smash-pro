'use client'

import { useState } from 'react'
import Link from 'next/link'

export interface Order {
  id: string
  orderNumber: string
  customer: string
  email: string
  amount: number
  status:
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: string
  items: number
  source: 'website' | 'pos' | 'dashboard'
  date: string
}

interface OrdersTableProps {
  orders: Order[]
  showFilters?: boolean
  showPagination?: boolean
  limit?: number
  title?: string
  viewAllHref?: string
  loading?: boolean
}

const ORDER_STATUS_STYLES: Record<string, string> = {
  pending: 'bg-[#FFC453]/20 text-[#916A00]',
  confirmed: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
  processing: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
  shipped: 'bg-purple-100 text-purple-700',
  delivered: 'bg-[#008060]/10 text-[#008060]',
  cancelled: 'bg-[#D82C0D]/10 text-[#D82C0D]',
  refunded: 'bg-[#6D7175]/10 text-[#6D7175]',
}

const PAYMENT_STATUS_STYLES: Record<string, string> = {
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

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function OrdersTable({
  orders,
  showFilters = true,
  showPagination = true,
  limit,
  title,
  viewAllHref,
  loading = false,
}: OrdersTableProps) {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [page, setPage] = useState(1)
  const pageSize = limit ?? 10

  const filtered = orders.filter((o) => {
    const matchSearch =
      o.orderNumber.toLowerCase().includes(search.toLowerCase()) ||
      o.customer.toLowerCase().includes(search.toLowerCase()) ||
      o.email.toLowerCase().includes(search.toLowerCase())
    const matchStatus =
      statusFilter === 'All' || o.status === statusFilter.toLowerCase()
    return matchSearch && matchStatus
  })

  const totalPages = Math.ceil(filtered.length / pageSize)
  const paginated = limit
    ? filtered.slice(0, limit)
    : filtered.slice((page - 1) * pageSize, page * pageSize)

  const toggleSelect = (id: string) =>
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )

  const toggleAll = () =>
    setSelectedIds(
      selectedIds.length === paginated.length ? [] : paginated.map((o) => o.id),
    )

  if (loading) {
    return (
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        {title && (
          <div className='px-5 py-4 border-b border-[#E1E3E5]'>
            <div className='w-32 h-4 bg-[#E1E3E5] rounded animate-pulse' />
          </div>
        )}
        <div className='divide-y divide-[#F1F1F1]'>
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className='px-5 py-4 flex items-center gap-4 animate-pulse'
            >
              <div className='w-8 h-8 bg-[#E1E3E5] rounded-full shrink-0' />
              <div className='flex-1 space-y-2'>
                <div className='w-32 h-3 bg-[#E1E3E5] rounded' />
                <div className='w-24 h-3 bg-[#E1E3E5] rounded' />
              </div>
              <div className='w-20 h-3 bg-[#E1E3E5] rounded' />
              <div className='w-16 h-5 bg-[#E1E3E5] rounded-full' />
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
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
            <div className='flex items-center gap-2 flex-1 min-w-50 px-3 py-2 border border-[#E1E3E5] rounded-lg bg-[#F6F6F7] focus-within:border-[#008060] focus-within:bg-white transition-all'>
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
                placeholder='Search orders...'
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
                  className='text-[#8C9196] hover:text-[#202223] bg-transparent border-none cursor-pointer text-sm'
                >
                  ✕
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
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Status tabs */}
          <div className='flex items-center border-b border-[#E1E3E5] overflow-x-auto scrollbar-none px-4'>
            {ALL_STATUSES.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setStatusFilter(s)
                  setPage(1)
                }}
                className={`px-3 py-2.5 text-[12.5px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${
                  statusFilter === s
                    ? 'border-b-[#008060] text-[#008060]'
                    : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'
                }`}
              >
                {s}
                <span className='ml-1 text-[10.5px] text-[#8C9196]'>
                  {s === 'All'
                    ? orders.length
                    : orders.filter((o) => o.status === s.toLowerCase()).length}
                </span>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Bulk action bar */}
      {selectedIds.length > 0 && (
        <div className='flex items-center gap-3 px-4 py-2.5 bg-[#008060]/8 border-b border-[#008060]/20'>
          <span className='text-[13px] font-medium text-[#008060]'>
            {selectedIds.length} selected
          </span>
          <div className='flex gap-2'>
            {['Mark Delivered', 'Mark Cancelled', 'Export'].map((a) => (
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
            className='ml-auto text-[#6D7175] bg-transparent border-none cursor-pointer text-base'
          >
            ✕
          </button>
        </div>
      )}

      {/* Table */}
      <div className='overflow-x-auto'>
        <table className='w-full'>
          <thead>
            <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
              {showFilters && (
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
              )}
              <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                Order
              </th>
              <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                Customer
              </th>
              <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                Date
              </th>
              <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                Amount
              </th>
              <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                Status
              </th>
              <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                Payment
              </th>
              <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                Source
              </th>
              <th className='px-4 py-3 text-right text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='divide-y divide-[#F1F1F1]'>
            {paginated.length === 0 ? (
              <tr>
                <td
                  colSpan={showFilters ? 9 : 8}
                  className='px-4 py-16 text-center'
                >
                  <div className='flex flex-col items-center gap-2'>
                    <span className='text-4xl'>📦</span>
                    <p className='text-[14px] font-medium text-[#202223]'>
                      No orders found
                    </p>
                    <p className='text-[13px] text-[#6D7175]'>
                      Try adjusting your search or filters
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              paginated.map((order) => (
                <tr
                  key={order.id}
                  className={`hover:bg-[#F6F6F7] transition-colors ${
                    selectedIds.includes(order.id) ? 'bg-[#F2F7F5]' : ''
                  }`}
                >
                  {/* Checkbox */}
                  {showFilters && (
                    <td className='px-4 py-3'>
                      <input
                        type='checkbox'
                        checked={selectedIds.includes(order.id)}
                        onChange={() => toggleSelect(order.id)}
                        className='w-4 h-4 rounded accent-[#008060] cursor-pointer'
                      />
                    </td>
                  )}

                  {/* Order */}
                  <td className='px-4 py-3'>
                    <Link
                      href={`/dashboard/orders/${order.id}`}
                      className='text-[13px] font-semibold text-[#2C6ECB] hover:text-[#1a4f9e] no-underline transition-colors'
                    >
                      {order.orderNumber}
                    </Link>
                    <p className='text-[11px] text-[#8C9196]'>
                      {order.items} item{order.items > 1 ? 's' : ''}
                    </p>
                  </td>

                  {/* Customer */}
                  <td className='px-4 py-3'>
                    <div className='flex items-center gap-2'>
                      <div className='w-7 h-7 rounded-full bg-[#008060]/10 flex items-center justify-center text-[#008060] text-[11px] font-bold shrink-0'>
                        {order.customer.charAt(0)}
                      </div>
                      <div className='min-w-0'>
                        <p className='text-[13px] font-medium text-[#202223] truncate'>
                          {order.customer}
                        </p>
                        <p className='text-[11px] text-[#8C9196] truncate'>
                          {order.email}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Date */}
                  <td className='px-4 py-3'>
                    <span className='text-[12.5px] text-[#6D7175]'>
                      {order.date}
                    </span>
                  </td>

                  {/* Amount */}
                  <td className='px-4 py-3'>
                    <span className='text-[13px] font-semibold text-[#202223]'>
                      {formatCurrency(order.amount)}
                    </span>
                  </td>

                  {/* Order Status */}
                  <td className='px-4 py-3'>
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold capitalize ${ORDER_STATUS_STYLES[order.status]}`}
                    >
                      {order.status}
                    </span>
                  </td>

                  {/* Payment Status */}
                  <td className='px-4 py-3'>
                    <div>
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10.5px] font-medium capitalize ${PAYMENT_STATUS_STYLES[order.paymentStatus]}`}
                      >
                        {order.paymentStatus}
                      </span>
                      <p className='text-[10.5px] text-[#8C9196] mt-0.5 capitalize'>
                        {order.paymentMethod}
                      </p>
                    </div>
                  </td>

                  {/* Source */}
                  <td className='px-4 py-3'>
                    <span className='text-[13px]' title={order.source}>
                      {SOURCE_ICONS[order.source]}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className='px-4 py-3'>
                    <div className='flex items-center justify-end gap-1'>
                      <Link
                        href={`/dashboard/orders/${order.id}`}
                        className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg transition-all no-underline'
                        title='View'
                      >
                        <svg
                          width='14'
                          height='14'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                          <circle cx='12' cy='12' r='3' />
                        </svg>
                      </Link>
                      <button
                        className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg transition-all bg-transparent border-none cursor-pointer'
                        title='Print'
                      >
                        <svg
                          width='14'
                          height='14'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <polyline points='6 9 6 2 18 2 18 9' />
                          <path d='M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2' />
                          <rect x='6' y='14' width='12' height='8' />
                        </svg>
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
            </span>{' '}
            orders
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
                className={`px-3 py-1.5 rounded-lg text-[12.5px] font-medium transition-colors cursor-pointer ${
                  page === i + 1
                    ? 'bg-[#008060] text-white border-none'
                    : 'border border-[#E1E3E5] text-[#6D7175] bg-white hover:bg-[#F6F6F7]'
                }`}
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
  )
}

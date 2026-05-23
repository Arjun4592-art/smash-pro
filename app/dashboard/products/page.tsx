'use client'

import { useState } from 'react'
import Link from 'next/link'

// ─── Mock Data ───────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: '1',
    name: 'Pro Strike Football Boots',
    sku: 'FB-001',
    category: 'Football',
    brand: 'Nike',
    price: 4999,
    stock: 48,
    status: 'active',
    image: null,
    badge: 'BESTSELLER',
  },
  {
    id: '2',
    name: 'Championship Cricket Bat',
    sku: 'CR-001',
    category: 'Cricket',
    brand: 'MRF',
    price: 3499,
    stock: 3,
    status: 'active',
    image: null,
    badge: 'LOW STOCK',
  },
  {
    id: '3',
    name: 'Speed Runner Pro X',
    sku: 'RN-001',
    category: 'Running',
    brand: 'Adidas',
    price: 7999,
    stock: 22,
    status: 'active',
    image: null,
    badge: 'NEW',
  },
  {
    id: '4',
    name: 'Tennis Racket Elite 300',
    sku: 'TN-001',
    category: 'Tennis',
    brand: 'Wilson',
    price: 5999,
    stock: 0,
    status: 'draft',
    image: null,
    badge: null,
  },
  {
    id: '5',
    name: 'Boxing Gloves Pro 16oz',
    sku: 'BX-001',
    category: 'Boxing',
    brand: 'Everlast',
    price: 2499,
    stock: 15,
    status: 'active',
    image: null,
    badge: null,
  },
  {
    id: '6',
    name: 'Basketball Indoor Pro',
    sku: 'BB-001',
    category: 'Basketball',
    brand: 'Spalding',
    price: 3299,
    stock: 0,
    status: 'archived',
    image: null,
    badge: null,
  },
  {
    id: '7',
    name: 'Swimming Goggles Elite',
    sku: 'SW-001',
    category: 'Swimming',
    brand: 'Speedo',
    price: 1299,
    stock: 67,
    status: 'active',
    image: null,
    badge: null,
  },
  {
    id: '8',
    name: 'Cycling Helmet Pro',
    sku: 'CY-001',
    category: 'Cycling',
    brand: 'Giro',
    price: 4599,
    stock: 11,
    status: 'active',
    image: null,
    badge: 'SALE',
  },
  {
    id: '9',
    name: 'Football Shin Guards',
    sku: 'FB-002',
    category: 'Football',
    brand: 'Nike',
    price: 899,
    stock: 94,
    status: 'active',
    image: null,
    badge: null,
  },
  {
    id: '10',
    name: 'Cricket Batting Pads',
    sku: 'CR-002',
    category: 'Cricket',
    brand: 'SS',
    price: 1899,
    stock: 5,
    status: 'active',
    image: null,
    badge: null,
  },
]

const CATEGORIES = [
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
const STATUSES = ['All', 'Active', 'Draft', 'Archived']

const STATUS_STYLES: Record<string, string> = {
  active: 'bg-[#008060]/10 text-[#008060]',
  draft: 'bg-[#6D7175]/10 text-[#6D7175]',
  archived: 'bg-[#D82C0D]/10 text-[#D82C0D]',
}

const BADGE_STYLES: Record<string, string> = {
  BESTSELLER: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
  'LOW STOCK': 'bg-[#FFC453]/20 text-[#916A00]',
  NEW: 'bg-[#008060]/10 text-[#008060]',
  SALE: 'bg-[#D82C0D]/10 text-[#D82C0D]',
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

export default function ProductsPage() {
  const [search, setSearch] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedStatus, setSelectedStatus] = useState('All')
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [view, setView] = useState<'table' | 'grid'>('table')
  const [sortBy, setSortBy] = useState('name')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('asc')

  // Filter
  const filtered = PRODUCTS.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.sku.toLowerCase().includes(search.toLowerCase()) ||
      p.brand.toLowerCase().includes(search.toLowerCase())
    const matchCategory =
      selectedCategory === 'All' || p.category === selectedCategory
    const matchStatus =
      selectedStatus === 'All' || p.status === selectedStatus.toLowerCase()
    return matchSearch && matchCategory && matchStatus
  }).sort((a, b) => {
    let valA: string | number = a[sortBy as keyof typeof a] as string | number
    let valB: string | number = b[sortBy as keyof typeof b] as string | number
    if (typeof valA === 'string') valA = valA.toLowerCase()
    if (typeof valB === 'string') valB = valB.toLowerCase()
    if (valA < valB) return sortDir === 'asc' ? -1 : 1
    if (valA > valB) return sortDir === 'asc' ? 1 : -1
    return 0
  })

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    )
  }

  const toggleAll = () => {
    setSelectedIds(
      selectedIds.length === filtered.length ? [] : filtered.map((p) => p.id),
    )
  }

  const handleSort = (col: string) => {
    if (sortBy === col) setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    else {
      setSortBy(col)
      setSortDir('asc')
    }
  }

  const SortIcon = ({ col }: { col: string }) => (
    <span
      className={`ml-1 text-[10px] ${sortBy === col ? 'text-[#008060]' : 'text-[#8C9196]'}`}
    >
      {sortBy === col ? (sortDir === 'asc' ? '↑' : '↓') : '↕'}
    </span>
  )

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Products
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            {PRODUCTS.length} products total
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <button className='px-3 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] text-[#202223] font-medium rounded-lg transition-colors'>
            Import
          </button>
          <button className='px-3 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] text-[#202223] font-medium rounded-lg transition-colors'>
            Export
          </button>
          <Link
            href='/dashboard/products/new'
            className='px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg transition-colors no-underline flex items-center gap-1.5'
          >
            <span className='text-lg leading-none'>+</span> Add Product
          </Link>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.length > 0 && (
        <div className='flex items-center gap-3 px-4 py-2.5 bg-[#008060]/8 border border-[#008060]/20 rounded-lg'>
          <span className='text-[13px] font-medium text-[#008060]'>
            {selectedIds.length} selected
          </span>
          <div className='flex items-center gap-2 ml-2'>
            {['Set as Active', 'Set as Draft', 'Archive', 'Delete'].map(
              (action) => (
                <button
                  key={action}
                  className={`px-3 py-1.5 text-[12px] font-medium rounded-lg border transition-colors ${
                    action === 'Delete'
                      ? 'border-[#D82C0D]/30 text-[#D82C0D] hover:bg-[#D82C0D]/5'
                      : 'border-[#E1E3E5] text-[#202223] hover:bg-white bg-transparent'
                  } bg-transparent cursor-pointer`}
                >
                  {action}
                </button>
              ),
            )}
          </div>
          <button
            className='ml-auto text-[#6D7175] hover:text-[#202223] bg-transparent border-none cursor-pointer text-lg'
            onClick={() => setSelectedIds([])}
          >
            ✕
          </button>
        </div>
      )}

      {/* Filters */}
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        {/* Filter bar */}
        <div className='flex items-center gap-3 px-4 py-3 border-b border-[#E1E3E5] flex-wrap'>
          {/* Search */}
          <div className='flex items-center gap-2 flex-1 min-w-50 px-3 py-2 border border-[#E1E3E5] rounded-lg bg-[#F6F6F7] focus-within:border-[#008060] focus-within:bg-white transition-all'>
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
              placeholder='Search products...'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className='px-3 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Categories' : c}
              </option>
            ))}
          </select>

          {/* Status filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className='px-3 py-2 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s === 'All' ? 'All Statuses' : s}
              </option>
            ))}
          </select>

          {/* View toggle */}
          <div className='flex items-center border border-[#E1E3E5] rounded-lg overflow-hidden ml-auto'>
            <button
              onClick={() => setView('table')}
              className={`px-3 py-2 text-[13px] transition-colors border-none cursor-pointer ${
                view === 'table'
                  ? 'bg-[#008060] text-white'
                  : 'bg-white text-[#6D7175] hover:bg-[#F6F6F7]'
              }`}
            >
              ☰
            </button>
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-2 text-[13px] transition-colors border-none cursor-pointer ${
                view === 'grid'
                  ? 'bg-[#008060] text-white'
                  : 'bg-white text-[#6D7175] hover:bg-[#F6F6F7]'
              }`}
            >
              ⊞
            </button>
          </div>
        </div>

        {/* Category tabs */}
        <div className='flex items-center gap-0 border-b border-[#E1E3E5] overflow-x-auto scrollbar-none px-4'>
          {STATUSES.map((s) => (
            <button
              key={s}
              onClick={() => setSelectedStatus(s)}
              className={`px-4 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${
                selectedStatus === s
                  ? 'border-b-[#008060] text-[#008060]'
                  : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'
              }`}
            >
              {s}
              <span className='ml-1.5 text-[11px] text-[#8C9196]'>
                {s === 'All'
                  ? PRODUCTS.length
                  : PRODUCTS.filter((p) => p.status === s.toLowerCase()).length}
              </span>
            </button>
          ))}
        </div>

        {/* Table view */}
        {view === 'table' && (
          <div className='overflow-x-auto'>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
                  <th className='w-10 px-4 py-3'>
                    <input
                      type='checkbox'
                      checked={
                        selectedIds.length === filtered.length &&
                        filtered.length > 0
                      }
                      onChange={toggleAll}
                      className='w-4 h-4 rounded accent-[#008060] cursor-pointer'
                    />
                  </th>
                  <th className='px-4 py-3 text-left'>
                    <button
                      onClick={() => handleSort('name')}
                      className='flex items-center text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide bg-transparent border-none cursor-pointer hover:text-[#202223]'
                    >
                      Product <SortIcon col='name' />
                    </button>
                  </th>
                  <th className='px-4 py-3 text-left'>
                    <button
                      onClick={() => handleSort('status')}
                      className='flex items-center text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide bg-transparent border-none cursor-pointer hover:text-[#202223]'
                    >
                      Status <SortIcon col='status' />
                    </button>
                  </th>
                  <th className='px-4 py-3 text-left'>
                    <button
                      onClick={() => handleSort('category')}
                      className='flex items-center text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide bg-transparent border-none cursor-pointer hover:text-[#202223]'
                    >
                      Category <SortIcon col='category' />
                    </button>
                  </th>
                  <th className='px-4 py-3 text-left'>
                    <button
                      onClick={() => handleSort('stock')}
                      className='flex items-center text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide bg-transparent border-none cursor-pointer hover:text-[#202223]'
                    >
                      Stock <SortIcon col='stock' />
                    </button>
                  </th>
                  <th className='px-4 py-3 text-left'>
                    <button
                      onClick={() => handleSort('price')}
                      className='flex items-center text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide bg-transparent border-none cursor-pointer hover:text-[#202223]'
                    >
                      Price <SortIcon col='price' />
                    </button>
                  </th>
                  <th className='px-4 py-3 text-right text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-[#F1F1F1]'>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className='px-4 py-16 text-center'>
                      <div className='flex flex-col items-center gap-2'>
                        <span className='text-4xl'>📦</span>
                        <p className='text-[14px] font-medium text-[#202223]'>
                          No products found
                        </p>
                        <p className='text-[13px] text-[#6D7175]'>
                          Try adjusting your search or filters
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr
                      key={product.id}
                      className={`hover:bg-[#F6F6F7] transition-colors ${
                        selectedIds.includes(product.id) ? 'bg-[#F2F7F5]' : ''
                      }`}
                    >
                      {/* Checkbox */}
                      <td className='px-4 py-3'>
                        <input
                          type='checkbox'
                          checked={selectedIds.includes(product.id)}
                          onChange={() => toggleSelect(product.id)}
                          className='w-4 h-4 rounded accent-[#008060] cursor-pointer'
                        />
                      </td>

                      {/* Product */}
                      <td className='px-4 py-3'>
                        <div className='flex items-center gap-3'>
                          {/* Image placeholder */}
                          <div className='w-10 h-10 bg-[#F6F6F7] border border-[#E1E3E5] rounded-lg flex items-center justify-center text-[18px] shrink-0'>
                            {product.category === 'Football'
                              ? '⚽'
                              : product.category === 'Cricket'
                                ? '🏏'
                                : product.category === 'Running'
                                  ? '👟'
                                  : product.category === 'Tennis'
                                    ? '🎾'
                                    : product.category === 'Boxing'
                                      ? '🥊'
                                      : product.category === 'Basketball'
                                        ? '🏀'
                                        : product.category === 'Swimming'
                                          ? '🏊'
                                          : '🚴'}
                          </div>
                          <div className='min-w-0'>
                            <Link
                              href={`/dashboard/products/${product.id}`}
                              className='text-[13px] font-medium text-[#202223] hover:text-[#008060] no-underline transition-colors truncate block'
                            >
                              {product.name}
                            </Link>
                            <div className='flex items-center gap-2 mt-0.5'>
                              <span className='text-[11.5px] text-[#8C9196]'>
                                {product.sku}
                              </span>
                              {product.badge && (
                                <span
                                  className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${BADGE_STYLES[product.badge] ?? 'bg-gray-100 text-gray-600'}`}
                                >
                                  {product.badge}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Status */}
                      <td className='px-4 py-3'>
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11.5px] font-medium capitalize ${STATUS_STYLES[product.status]}`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              product.status === 'active'
                                ? 'bg-[#008060]'
                                : product.status === 'draft'
                                  ? 'bg-[#6D7175]'
                                  : 'bg-[#D82C0D]'
                            }`}
                          />
                          {product.status}
                        </span>
                      </td>

                      {/* Category */}
                      <td className='px-4 py-3'>
                        <span className='text-[13px] text-[#202223]'>
                          {product.category}
                        </span>
                        <p className='text-[11.5px] text-[#8C9196]'>
                          {product.brand}
                        </p>
                      </td>

                      {/* Stock */}
                      <td className='px-4 py-3'>
                        <span
                          className={`text-[13px] font-medium ${
                            product.stock === 0
                              ? 'text-[#D82C0D]'
                              : product.stock <= 5
                                ? 'text-[#916A00]'
                                : 'text-[#202223]'
                          }`}
                        >
                          {product.stock === 0
                            ? 'Out of stock'
                            : `${product.stock} in stock`}
                        </span>
                      </td>

                      {/* Price */}
                      <td className='px-4 py-3'>
                        <span className='text-[13px] font-semibold text-[#202223]'>
                          {formatCurrency(product.price)}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className='px-4 py-3'>
                        <div className='flex items-center justify-end gap-1'>
                          <Link
                            href={`/dashboard/products/${product.id}`}
                            className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg transition-all no-underline'
                            title='Edit'
                          >
                            <svg
                              width='14'
                              height='14'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                            >
                              <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
                              <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
                            </svg>
                          </Link>
                          <button
                            className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#D82C0D] hover:bg-[#D82C0D]/5 rounded-lg transition-all bg-transparent border-none cursor-pointer'
                            title='Delete'
                          >
                            <svg
                              width='14'
                              height='14'
                              viewBox='0 0 24 24'
                              fill='none'
                              stroke='currentColor'
                              strokeWidth='2'
                            >
                              <polyline points='3 6 5 6 21 6' />
                              <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
                              <path d='M10 11v6M14 11v6' />
                              <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
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
        )}

        {/* Grid view */}
        {view === 'grid' && (
          <div className='p-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3'>
            {filtered.map((product) => (
              <Link
                key={product.id}
                href={`/dashboard/products/${product.id}`}
                className='no-underline group'
              >
                <div className='border border-[#E1E3E5] rounded-xl overflow-hidden hover:border-[#008060]/30 hover:shadow-md transition-all'>
                  <div className='aspect-square bg-[#F6F6F7] flex items-center justify-center text-4xl'>
                    {product.category === 'Football'
                      ? '⚽'
                      : product.category === 'Cricket'
                        ? '🏏'
                        : product.category === 'Running'
                          ? '👟'
                          : product.category === 'Tennis'
                            ? '🎾'
                            : product.category === 'Boxing'
                              ? '🥊'
                              : product.category === 'Basketball'
                                ? '🏀'
                                : product.category === 'Swimming'
                                  ? '🏊'
                                  : '🚴'}
                  </div>
                  <div className='p-3'>
                    <p className='text-[12.5px] font-medium text-[#202223] truncate group-hover:text-[#008060] transition-colors'>
                      {product.name}
                    </p>
                    <p className='text-[11.5px] text-[#8C9196] mt-0.5'>
                      {product.sku}
                    </p>
                    <div className='flex items-center justify-between mt-2'>
                      <span className='text-[13px] font-semibold text-[#202223]'>
                        {formatCurrency(product.price)}
                      </span>
                      <span
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full capitalize ${STATUS_STYLES[product.status]}`}
                      >
                        {product.status}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className='flex items-center justify-between px-4 py-3 border-t border-[#E1E3E5]'>
          <p className='text-[12.5px] text-[#6D7175]'>
            Showing{' '}
            <span className='font-medium text-[#202223]'>
              {filtered.length}
            </span>{' '}
            of{' '}
            <span className='font-medium text-[#202223]'>
              {PRODUCTS.length}
            </span>{' '}
            products
          </p>
          <div className='flex items-center gap-1'>
            <button
              className='px-3 py-1.5 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#6D7175] hover:bg-[#F6F6F7] disabled:opacity-40 bg-white cursor-pointer transition-colors'
              disabled
            >
              ← Prev
            </button>
            <button className='px-3 py-1.5 bg-[#008060] text-white rounded-lg text-[12.5px] font-medium border-none cursor-pointer'>
              1
            </button>
            <button className='px-3 py-1.5 border border-[#E1E3E5] rounded-lg text-[12.5px] text-[#6D7175] hover:bg-[#F6F6F7] bg-white cursor-pointer transition-colors'>
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

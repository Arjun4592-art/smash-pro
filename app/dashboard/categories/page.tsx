'use client'

import { useState } from 'react'

// ─── Types ───────────────────────────────────────────────────────
interface Category {
  id: string
  name: string
  slug: string
  description: string
  sport: string
  productCount: number
  status: 'active' | 'inactive'
  icon: string
  createdAt: string
}

// ─── Mock Data ───────────────────────────────────────────────────
const INITIAL_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Football Boots',
    slug: 'football-boots',
    description: 'Professional and amateur football footwear',
    sport: 'Football',
    productCount: 24,
    status: 'active',
    icon: '👟',
    createdAt: 'Jan 12, 2025',
  },
  {
    id: '2',
    name: 'Cricket Bats',
    slug: 'cricket-bats',
    description: 'English willow and Kashmir willow bats',
    sport: 'Cricket',
    productCount: 18,
    status: 'active',
    icon: '🏏',
    createdAt: 'Jan 15, 2025',
  },
  {
    id: '3',
    name: 'Running Shoes',
    slug: 'running-shoes',
    description: 'Road, trail and track running footwear',
    sport: 'Running',
    productCount: 31,
    status: 'active',
    icon: '👟',
    createdAt: 'Jan 18, 2025',
  },
  {
    id: '4',
    name: 'Tennis Rackets',
    slug: 'tennis-rackets',
    description: 'Rackets for all levels of play',
    sport: 'Tennis',
    productCount: 12,
    status: 'active',
    icon: '🎾',
    createdAt: 'Feb 2, 2025',
  },
  {
    id: '5',
    name: 'Boxing Gloves',
    slug: 'boxing-gloves',
    description: 'Training and competition boxing gloves',
    sport: 'Boxing',
    productCount: 9,
    status: 'active',
    icon: '🥊',
    createdAt: 'Feb 10, 2025',
  },
  {
    id: '6',
    name: 'Basketball Shoes',
    slug: 'basketball-shoes',
    description: 'High-top and low-top basketball footwear',
    sport: 'Basketball',
    productCount: 7,
    status: 'inactive',
    icon: '🏀',
    createdAt: 'Feb 20, 2025',
  },
  {
    id: '7',
    name: 'Swimming Goggles',
    slug: 'swimming-goggles',
    description: 'Competitive and recreational goggles',
    sport: 'Swimming',
    productCount: 14,
    status: 'active',
    icon: '🏊',
    createdAt: 'Mar 1, 2025',
  },
  {
    id: '8',
    name: 'Cycling Helmets',
    slug: 'cycling-helmets',
    description: 'Road, MTB and urban cycling helmets',
    sport: 'Cycling',
    productCount: 6,
    status: 'active',
    icon: '🚴',
    createdAt: 'Mar 5, 2025',
  },
  {
    id: '9',
    name: 'Shin Guards',
    slug: 'shin-guards',
    description: 'Football and hockey shin protection',
    sport: 'Football',
    productCount: 11,
    status: 'active',
    icon: '🦵',
    createdAt: 'Mar 12, 2025',
  },
  {
    id: '10',
    name: 'Cricket Pads',
    slug: 'cricket-pads',
    description: 'Batting and wicket-keeping pads',
    sport: 'Cricket',
    productCount: 8,
    status: 'inactive',
    icon: '🏏',
    createdAt: 'Mar 18, 2025',
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
const SPORT_ICONS: Record<string, string> = {
  Football: '⚽',
  Cricket: '🏏',
  Running: '🏃',
  Tennis: '🎾',
  Boxing: '🥊',
  Basketball: '🏀',
  Swimming: '🏊',
  Cycling: '🚴',
}

const emptyForm = {
  name: '',
  slug: '',
  description: '',
  sport: '',
  icon: '📦',
  status: 'active' as 'active' | 'inactive',
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES)
  const [search, setSearch] = useState('')
  const [sportFilter, setSportFilter] = useState('All')
  const [showModal, setShowModal] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState({ ...emptyForm })
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  // Filter
  const filtered = categories.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.slug.toLowerCase().includes(search.toLowerCase())
    const matchSport = sportFilter === 'All' || c.sport === sportFilter
    return matchSearch && matchSport
  })

  // Helpers
  const openAdd = () => {
    setEditingId(null)
    setForm({ ...emptyForm })
    setShowModal(true)
  }

  const openEdit = (cat: Category) => {
    setEditingId(cat.id)
    setForm({
      name: cat.name,
      slug: cat.slug,
      description: cat.description,
      sport: cat.sport,
      icon: cat.icon,
      status: cat.status,
    })
    setShowModal(true)
  }

  const handleSave = async () => {
    if (!form.name || !form.sport) return
    setSaving(true)
    await new Promise((r) => setTimeout(r, 800))

    if (editingId) {
      setCategories((prev) =>
        prev.map((c) => (c.id === editingId ? { ...c, ...form } : c)),
      )
    } else {
      const newCat: Category = {
        id: Date.now().toString(),
        ...form,
        productCount: 0,
        createdAt: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
      }
      setCategories((prev) => [newCat, ...prev])
    }

    setSaving(false)
    setShowModal(false)
  }

  const handleDelete = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id))
    setDeleteId(null)
  }

  const toggleStatus = (id: string) => {
    setCategories((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' }
          : c,
      ),
    )
  }

  const autoSlug = (name: string) =>
    name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Categories
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            {categories.length} categories ·{' '}
            {categories.filter((c) => c.status === 'active').length} active
          </p>
        </div>
        <button
          onClick={openAdd}
          className='px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg transition-colors flex items-center gap-1.5 border-none cursor-pointer'
        >
          <span className='text-lg leading-none'>+</span> Add Category
        </button>
      </div>

      {/* Stats row */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
        {[
          {
            label: 'Total Categories',
            value: categories.length,
            icon: '📂',
            color: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
          },
          {
            label: 'Active',
            value: categories.filter((c) => c.status === 'active').length,
            icon: '✅',
            color: 'bg-[#008060]/10 text-[#008060]',
          },
          {
            label: 'Inactive',
            value: categories.filter((c) => c.status === 'inactive').length,
            icon: '⏸️',
            color: 'bg-[#6D7175]/10 text-[#6D7175]',
          },
          {
            label: 'Total Products',
            value: categories.reduce((s, c) => s + c.productCount, 0),
            icon: '📦',
            color: 'bg-[#FFC453]/20 text-[#916A00]',
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className='bg-white border border-[#E1E3E5] rounded-xl p-4 flex items-center gap-3'
          >
            <div
              className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg ${stat.color}`}
            >
              {stat.icon}
            </div>
            <div>
              <p className='font-sora text-[20px] font-bold text-[#202223] leading-tight'>
                {stat.value}
              </p>
              <p className='text-[11.5px] text-[#6D7175]'>{stat.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Table card */}
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        {/* Filters */}
        <div className='flex items-center gap-3 px-4 py-3 border-b border-[#E1E3E5] flex-wrap'>
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
              placeholder='Search categories...'
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
        </div>

        {/* Sport tabs */}
        <div className='flex items-center border-b border-[#E1E3E5] overflow-x-auto scrollbar-none px-4'>
          {SPORTS.map((s) => (
            <button
              key={s}
              onClick={() => setSportFilter(s)}
              className={`px-4 py-2.5 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer flex items-center gap-1.5 ${
                sportFilter === s
                  ? 'border-b-[#008060] text-[#008060]'
                  : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'
              }`}
            >
              {s !== 'All' && <span>{SPORT_ICONS[s]}</span>}
              {s}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className='overflow-x-auto'>
          <table className='w-full'>
            <thead>
              <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Category
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Sport
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Slug
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Products
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Status
                </th>
                <th className='px-4 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Created
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
                      <span className='text-4xl'>📂</span>
                      <p className='text-[14px] font-medium text-[#202223]'>
                        No categories found
                      </p>
                      <p className='text-[13px] text-[#6D7175]'>
                        Try adjusting your search or filters
                      </p>
                      <button
                        onClick={openAdd}
                        className='mt-2 px-4 py-2 bg-[#008060] text-white text-[13px] rounded-lg hover:bg-[#006e52] transition-colors border-none cursor-pointer'
                      >
                        Add Category
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((cat) => (
                  <tr
                    key={cat.id}
                    className='hover:bg-[#F6F6F7] transition-colors'
                  >
                    {/* Category */}
                    <td className='px-4 py-3'>
                      <div className='flex items-center gap-3'>
                        <div className='w-9 h-9 bg-[#F6F6F7] border border-[#E1E3E5] rounded-lg flex items-center justify-center text-lg shrink-0'>
                          {cat.icon}
                        </div>
                        <div>
                          <p className='text-[13px] font-medium text-[#202223]'>
                            {cat.name}
                          </p>
                          <p className='text-[11.5px] text-[#8C9196] truncate max-w-45'>
                            {cat.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Sport */}
                    <td className='px-4 py-3'>
                      <span className='inline-flex items-center gap-1.5 text-[12.5px] text-[#202223]'>
                        <span>{SPORT_ICONS[cat.sport]}</span>
                        {cat.sport}
                      </span>
                    </td>

                    {/* Slug */}
                    <td className='px-4 py-3'>
                      <code className='text-[11.5px] text-[#6D7175] bg-[#F6F6F7] px-2 py-0.5 rounded'>
                        /{cat.slug}
                      </code>
                    </td>

                    {/* Products */}
                    <td className='px-4 py-3'>
                      <span className='text-[13px] font-medium text-[#202223]'>
                        {cat.productCount}
                      </span>
                      <span className='text-[11.5px] text-[#8C9196] ml-1'>
                        products
                      </span>
                    </td>

                    {/* Status toggle */}
                    <td className='px-4 py-3'>
                      <button
                        onClick={() => toggleStatus(cat.id)}
                        className={`relative w-9 h-5 rounded-full transition-colors border-none cursor-pointer ${
                          cat.status === 'active'
                            ? 'bg-[#008060]'
                            : 'bg-[#8C9196]'
                        }`}
                        title={
                          cat.status === 'active'
                            ? 'Click to deactivate'
                            : 'Click to activate'
                        }
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                            cat.status === 'active' ? 'right-0.5' : 'left-0.5'
                          }`}
                        />
                      </button>
                    </td>

                    {/* Created */}
                    <td className='px-4 py-3'>
                      <span className='text-[12.5px] text-[#6D7175]'>
                        {cat.createdAt}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className='px-4 py-3'>
                      <div className='flex items-center justify-end gap-1'>
                        <button
                          onClick={() => openEdit(cat)}
                          className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg transition-all bg-transparent border-none cursor-pointer'
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
                        </button>
                        <button
                          onClick={() => setDeleteId(cat.id)}
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

        {/* Pagination */}
        <div className='flex items-center justify-between px-4 py-3 border-t border-[#E1E3E5]'>
          <p className='text-[12.5px] text-[#6D7175]'>
            Showing{' '}
            <span className='font-medium text-[#202223]'>
              {filtered.length}
            </span>{' '}
            of{' '}
            <span className='font-medium text-[#202223]'>
              {categories.length}
            </span>{' '}
            categories
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

      {/* ── Add/Edit Modal ── */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          {/* Backdrop */}
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setShowModal(false)}
          />

          {/* Modal */}
          <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-125 overflow-hidden'>
            {/* Header */}
            <div className='flex items-center justify-between px-6 py-4 border-b border-[#E1E3E5]'>
              <h2 className='font-sora text-[16px] font-semibold text-[#202223]'>
                {editingId ? 'Edit Category' : 'Add Category'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg transition-all bg-transparent border-none cursor-pointer'
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div className='px-6 py-5 space-y-4'>
              {/* Icon picker */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-2'>
                  Icon
                </label>
                <div className='flex flex-wrap gap-2'>
                  {[
                    '📦',
                    '⚽',
                    '🏏',
                    '🏀',
                    '🎾',
                    '🥊',
                    '🏊',
                    '🚴',
                    '🏃',
                    '👟',
                    '🦺',
                    '🧤',
                    '⛑️',
                    '🥅',
                  ].map((icon) => (
                    <button
                      key={icon}
                      onClick={() => setForm((f) => ({ ...f, icon }))}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg text-lg border transition-all cursor-pointer ${
                        form.icon === icon
                          ? 'border-[#008060] bg-[#F2F7F5]'
                          : 'border-[#E1E3E5] bg-white hover:bg-[#F6F6F7]'
                      }`}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Name */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Category Name <span className='text-[#D82C0D]'>*</span>
                </label>
                <input
                  type='text'
                  value={form.name}
                  onChange={(e) => {
                    const name = e.target.value
                    setForm((f) => ({ ...f, name, slug: autoSlug(name) }))
                  }}
                  placeholder='e.g. Football Boots'
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                />
              </div>

              {/* Slug */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Slug
                </label>
                <div className='flex items-center border border-[#E1E3E5] rounded-lg overflow-hidden focus-within:border-[#008060] focus-within:ring-2 focus-within:ring-[#008060]/15 transition-all'>
                  <span className='px-3 py-2.5 bg-[#F6F6F7] border-r border-[#E1E3E5] text-[12.5px] text-[#6D7175] shrink-0'>
                    /shop/
                  </span>
                  <input
                    type='text'
                    value={form.slug}
                    onChange={(e) =>
                      setForm((f) => ({ ...f, slug: e.target.value }))
                    }
                    className='flex-1 px-3 py-2.5 text-[13px] text-[#202223] outline-none bg-white'
                  />
                </div>
              </div>

              {/* Sport */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Sport <span className='text-[#D82C0D]'>*</span>
                </label>
                <select
                  value={form.sport}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, sport: e.target.value }))
                  }
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] bg-white outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all cursor-pointer'
                >
                  <option value=''>Select sport</option>
                  {SPORTS.filter((s) => s !== 'All').map((s) => (
                    <option key={s} value={s}>
                      {SPORT_ICONS[s]} {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Description
                </label>
                <textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder='Brief description of this category...'
                  rows={3}
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all resize-none'
                />
              </div>

              {/* Status */}
              <div className='flex items-center justify-between p-3 border border-[#E1E3E5] rounded-lg'>
                <div>
                  <p className='text-[13px] font-medium text-[#202223]'>
                    Active
                  </p>
                  <p className='text-[11.5px] text-[#6D7175]'>
                    Visible in shop navigation
                  </p>
                </div>
                <button
                  onClick={() =>
                    setForm((f) => ({
                      ...f,
                      status: f.status === 'active' ? 'inactive' : 'active',
                    }))
                  }
                  className={`relative w-10 h-6 rounded-full transition-colors border-none cursor-pointer ${
                    form.status === 'active' ? 'bg-[#008060]' : 'bg-[#8C9196]'
                  }`}
                >
                  <span
                    className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                      form.status === 'active'
                        ? 'translate-x-4'
                        : 'translate-x-0.5'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[#E1E3E5] bg-[#F6F6F7]/50'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving || !form.name || !form.sport}
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
                  'Add Category'
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Delete Confirm Modal ── */}
      {deleteId && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setDeleteId(null)}
          />
          <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-95 p-6'>
            <div className='w-12 h-12 bg-[#D82C0D]/10 rounded-full flex items-center justify-center mx-auto mb-4'>
              <svg
                width='22'
                height='22'
                viewBox='0 0 24 24'
                fill='none'
                stroke='#D82C0D'
                strokeWidth='2'
              >
                <polyline points='3 6 5 6 21 6' />
                <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
                <path d='M10 11v6M14 11v6' />
                <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
              </svg>
            </div>
            <h3 className='font-sora text-[16px] font-semibold text-[#202223] text-center mb-2'>
              Delete Category
            </h3>
            <p className='text-[13px] text-[#6D7175] text-center leading-relaxed mb-6'>
              Are you sure you want to delete{' '}
              <strong className='text-[#202223]'>
                {categories.find((c) => c.id === deleteId)?.name}
              </strong>
              ? This action cannot be undone.
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

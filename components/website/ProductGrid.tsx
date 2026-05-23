'use client'

import { useState, useMemo } from 'react'
import ProductCard from '@/components/website/ProductCard'
import type { Product } from '@/types'
import {
  GridIcon,
  ListIcon,
  FilterIcon,
  ChevronDownIcon,
} from '@/components/ui/Icons'
import { SPORTS } from '@/lib/constants'

interface ProductGridProps {
  products: Product[]
  title?: string
  showFilters?: boolean
  showSort?: boolean
  showViewToggle?: boolean
  columns?: 2 | 3 | 4
}

const SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'discount', label: 'Biggest Discount' },
]

const BADGE_FILTERS = [
  { value: 'ALL', label: 'All' },
  { value: 'NEW', label: '🆕 New' },
  { value: 'SALE', label: '🔥 Sale' },
  { value: 'BESTSELLER', label: '⭐ Bestseller' },
  { value: 'LIMITED', label: '⚡ Limited' },
]

export default function ProductGrid({
  products,
  title,
  showFilters = false,
  showSort = true,
  showViewToggle = true,
  columns = 4,
}: ProductGridProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const [sort, setSort] = useState('featured')
  const [sortOpen, setSortOpen] = useState(false)
  const [activeSport, setActiveSport] = useState('ALL')
  const [activeBadge, setActiveBadge] = useState('ALL')
  const [filtersOpen, setFiltersOpen] = useState(false)

  // ── Filter + Sort ───────────────────────────────────────────
  const filtered = useMemo(() => {
    let result = [...products]

    // Sport filter
    if (activeSport !== 'ALL') {
      result = result.filter((p) => p.sport === activeSport)
    }

    // Badge filter
    if (activeBadge !== 'ALL') {
      result = result.filter((p) => p.badge === activeBadge)
    }

    // Sort
    switch (sort) {
      case 'newest':
        result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        break
      case 'price-asc':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      case 'discount':
        result.sort((a, b) => {
          const discA = a.originalPrice
            ? ((a.originalPrice - a.price) / a.originalPrice) * 100
            : 0
          const discB = b.originalPrice
            ? ((b.originalPrice - b.price) / b.originalPrice) * 100
            : 0
          return discB - discA
        })
        break
      default:
        break
    }

    return result
  }, [products, activeSport, activeBadge, sort])

  const currentSort = SORT_OPTIONS.find((o) => o.value === sort)

  const gridCols = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  }[columns]

  return (
    <div>
      {/* ── Header ── */}
      {(title || showSort || showViewToggle) && (
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
          {title && (
            <div>
              <h2 className='font-montserrat font-black text-2xl text-[#0A1F44]'>
                {title}
              </h2>
              <p className='text-sm text-gray-400 font-lato mt-0.5'>
                {filtered.length} product{filtered.length !== 1 ? 's' : ''}
              </p>
            </div>
          )}

          <div className='flex items-center gap-3 ml-auto'>
            {/* Mobile filter toggle */}
            {showFilters && (
              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className='sm:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-[#0A1F44] hover:border-[#E8553A]/40 transition-colors font-lato'
              >
                <FilterIcon size={16} />
                Filters
              </button>
            )}

            {/* Sort Dropdown */}
            {showSort && (
              <div className='relative'>
                <button
                  onClick={() => setSortOpen(!sortOpen)}
                  className='flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl text-sm font-medium text-[#0A1F44] hover:border-[#E8553A]/40 transition-colors font-lato bg-white min-w-40 justify-between'
                >
                  <span>{currentSort?.label}</span>
                  <ChevronDownIcon
                    size={15}
                    className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                {sortOpen && (
                  <>
                    <div
                      className='fixed inset-0 z-10'
                      onClick={() => setSortOpen(false)}
                    />
                    <div className='absolute right-0 top-full mt-1 w-48 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden'>
                      {SORT_OPTIONS.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => {
                            setSort(option.value)
                            setSortOpen(false)
                          }}
                          className={`w-full text-left px-4 py-2.5 text-sm font-lato transition-colors ${
                            sort === option.value
                              ? 'bg-[#E8553A]/10 text-[#E8553A] font-semibold'
                              : 'text-[#0A1F44] hover:bg-gray-50'
                          }`}
                        >
                          {option.value === sort && '✓ '}
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* View Toggle */}
            {showViewToggle && (
              <div className='flex items-center border border-gray-200 rounded-xl overflow-hidden'>
                <button
                  onClick={() => setView('grid')}
                  className={`p-2.5 transition-colors ${
                    view === 'grid'
                      ? 'bg-[#0A1F44] text-white'
                      : 'bg-white text-gray-400 hover:text-[#0A1F44]'
                  }`}
                  aria-label='Grid view'
                >
                  <GridIcon size={16} />
                </button>
                <button
                  onClick={() => setView('list')}
                  className={`p-2.5 transition-colors ${
                    view === 'list'
                      ? 'bg-[#0A1F44] text-white'
                      : 'bg-white text-gray-400 hover:text-[#0A1F44]'
                  }`}
                  aria-label='List view'
                >
                  <ListIcon size={16} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Filters ── */}
      {showFilters && (
        <div
          className={`mb-6 space-y-3 ${
            filtersOpen ? 'block' : 'hidden sm:block'
          }`}
        >
          {/* Sport filter pills */}
          <div>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 font-montserrat'>
              Sport
            </p>
            <div className='flex flex-wrap gap-2'>
              <button
                onClick={() => setActiveSport('ALL')}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all font-lato ${
                  activeSport === 'ALL'
                    ? 'bg-[#0A1F44] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All Sports
              </button>
              {SPORTS.map((sport) => (
                <button
                  key={sport.slug}
                  onClick={() => setActiveSport(sport.slug)}
                  className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all font-lato ${
                    activeSport === sport.slug
                      ? 'bg-[#E8553A] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{sport.icon}</span>
                  <span>{sport.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Badge filter pills */}
          <div>
            <p className='text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2 font-montserrat'>
              Filter By
            </p>
            <div className='flex flex-wrap gap-2'>
              {BADGE_FILTERS.map((badge) => (
                <button
                  key={badge.value}
                  onClick={() => setActiveBadge(badge.value)}
                  className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all font-lato ${
                    activeBadge === badge.value
                      ? 'bg-[#0A1F44] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {badge.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Active Filters Summary ── */}
      {(activeSport !== 'ALL' || activeBadge !== 'ALL') && (
        <div className='flex items-center gap-2 mb-4 flex-wrap'>
          <span className='text-xs text-gray-400 font-lato'>
            Active filters:
          </span>
          {activeSport !== 'ALL' && (
            <span className='flex items-center gap-1.5 px-3 py-1 bg-[#E8553A]/10 text-[#E8553A] rounded-full text-xs font-semibold font-lato'>
              {SPORTS.find((s) => s.slug === activeSport)?.icon}{' '}
              {SPORTS.find((s) => s.slug === activeSport)?.label}
              <button
                onClick={() => setActiveSport('ALL')}
                className='ml-1 hover:text-[#D4441F]'
              >
                ✕
              </button>
            </span>
          )}
          {activeBadge !== 'ALL' && (
            <span className='flex items-center gap-1.5 px-3 py-1 bg-[#0A1F44]/10 text-[#0A1F44] rounded-full text-xs font-semibold font-lato'>
              {activeBadge}
              <button
                onClick={() => setActiveBadge('ALL')}
                className='ml-1 hover:text-[#E8553A]'
              >
                ✕
              </button>
            </span>
          )}
          <button
            onClick={() => {
              setActiveSport('ALL')
              setActiveBadge('ALL')
            }}
            className='text-xs text-gray-400 hover:text-[#E8553A] font-lato underline'
          >
            Clear all
          </button>
        </div>
      )}

      {/* ── Products ── */}
      {filtered.length === 0 ? (
        <div className='text-center py-20'>
          <p className='text-5xl mb-4'>🔍</p>
          <h3 className='font-montserrat font-bold text-xl text-[#0A1F44] mb-2'>
            No products found
          </h3>
          <p className='text-gray-400 font-lato mb-6'>
            Try adjusting your filters
          </p>
          <button
            onClick={() => {
              setActiveSport('ALL')
              setActiveBadge('ALL')
            }}
            className='px-6 py-2.5 bg-[#E8553A] text-white rounded-xl text-sm font-semibold font-montserrat hover:bg-[#D4441F] transition-colors'
          >
            Clear Filters
          </button>
        </div>
      ) : view === 'list' ? (
        <div className='space-y-4'>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} view='list' />
          ))}
        </div>
      ) : (
        <div className={`grid ${gridCols} gap-5`}>
          {filtered.map((product) => (
            <ProductCard key={product.id} product={product} view='grid' />
          ))}
        </div>
      )}
    </div>
  )
}

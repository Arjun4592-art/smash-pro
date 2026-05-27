'use client'

import { useMemo } from 'react'
import { SPORTS } from '@/lib/constants'
import { products as allProducts } from '@/lib/mockData'
import type { Product } from '@/types'

export interface FilterState {
  sports: string[]
  brands: string[]
  badges: string[]
  minPrice: number
  maxPrice: number
  minRating: number
  inStockOnly: boolean
}

export const DEFAULT_FILTERS: FilterState = {
  sports: [],
  brands: [],
  badges: [],
  minPrice: 0,
  maxPrice: 100000,
  minRating: 0,
  inStockOnly: false,
}

const BADGE_OPTIONS = [
  { value: 'NEW', label: '🆕 New' },
  { value: 'SALE', label: '🔥 Sale' },
  { value: 'BESTSELLER', label: '⭐ Bestseller' },
  { value: 'LIMITED', label: '⚡ Limited' },
]

const RATING_OPTIONS = [
  { value: 4.5, label: '4.5 & above' },
  { value: 4, label: '4.0 & above' },
  { value: 3.5, label: '3.5 & above' },
  { value: 3, label: '3.0 & above' },
]

interface FilterSidebarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  resultCount: number
  // optional: pass products to derive available brands/price range dynamically
  products?: Product[]
}

export default function FilterSidebar({
  filters,
  onChange,
  resultCount,
  products = allProducts,
}: FilterSidebarProps) {
  // Derive brands and price range from products
  const { brands, priceMin, priceMax } = useMemo(() => {
    const brandSet = new Set(products.map((p) => p.brand))
    const prices = products.map((p) => p.price)
    return {
      brands: Array.from(brandSet).sort(),
      priceMin: Math.min(...prices),
      priceMax: Math.max(...prices),
    }
  }, [products])

  const activeCount =
    filters.sports.length +
    filters.brands.length +
    filters.badges.length +
    (filters.minRating > 0 ? 1 : 0) +
    (filters.inStockOnly ? 1 : 0) +
    (filters.minPrice > priceMin || filters.maxPrice < priceMax ? 1 : 0)

  // ── Toggle helpers ──────────────────────────────────────────
  const toggleArr = (key: 'sports' | 'brands' | 'badges', value: string) => {
    const cur = filters[key]
    onChange({
      ...filters,
      [key]: cur.includes(value)
        ? cur.filter((v) => v !== value)
        : [...cur, value],
    })
  }

  const Section = ({
    title,
    children,
  }: {
    title: string
    children: React.ReactNode
  }) => (
    <div className='border-b border-gray-100 pb-5 mb-5 last:border-0 last:mb-0 last:pb-0'>
      <p className='font-montserrat font-black text-xs uppercase tracking-widest text-[#0A1F44] mb-3'>
        {title}
      </p>
      {children}
    </div>
  )

  const Pill = ({
    active,
    onClick,
    children,
  }: {
    active: boolean
    onClick: () => void
    children: React.ReactNode
  }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold font-lato transition-all duration-150 border ${
        active
          ? 'bg-[#0A1F44] text-white border-[#0A1F44]'
          : 'bg-white text-gray-600 border-gray-200 hover:border-[#0A1F44]/40 hover:text-[#0A1F44]'
      }`}
    >
      {children}
    </button>
  )

  return (
    <aside className='w-64 shrink-0'>
      <div className='bg-white border border-gray-100 rounded-2xl p-5 sticky top-32'>
        {/* Header */}
        <div className='flex items-center justify-between mb-5'>
          <div>
            <h2 className='font-montserrat font-black text-sm text-[#0A1F44]'>
              Filters
            </h2>
            <p className='text-xs text-gray-400 font-lato mt-0.5'>
              {resultCount} result{resultCount !== 1 ? 's' : ''}
            </p>
          </div>
          {activeCount > 0 && (
            <button
              onClick={() =>
                onChange({ ...DEFAULT_FILTERS, maxPrice: priceMax })
              }
              className='text-xs font-semibold text-[#E8553A] font-lato hover:underline flex items-center gap-1'
            >
              Clear all
              <span className='bg-[#E8553A] text-white rounded-full w-4 h-4 flex items-center justify-center text-[10px] font-bold'>
                {activeCount}
              </span>
            </button>
          )}
        </div>

        {/* ── Sport ── */}
        <Section title='Sport'>
          <div className='flex flex-wrap gap-1.5'>
            {SPORTS.map((s) => (
              <Pill
                key={s.slug}
                active={filters.sports.includes(s.slug)}
                onClick={() => toggleArr('sports', s.slug)}
              >
                {s.icon} {s.label}
              </Pill>
            ))}
          </div>
        </Section>

        {/* ── Brand ── */}
        <Section title='Brand'>
          <div className='space-y-2'>
            {brands.map((brand) => (
              <label
                key={brand}
                className='flex items-center gap-2.5 cursor-pointer group'
              >
                <span
                  onClick={() => toggleArr('brands', brand)}
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center shrink-0 transition-all ${
                    filters.brands.includes(brand)
                      ? 'bg-[#0A1F44] border-[#0A1F44]'
                      : 'border-gray-300 group-hover:border-[#0A1F44]/50'
                  }`}
                >
                  {filters.brands.includes(brand) && (
                    <svg width='9' height='9' viewBox='0 0 10 8' fill='none'>
                      <path
                        d='M1 4L3.5 6.5L9 1'
                        stroke='white'
                        strokeWidth='1.8'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}
                </span>
                <span
                  onClick={() => toggleArr('brands', brand)}
                  className='text-sm font-lato text-gray-700 group-hover:text-[#0A1F44] transition-colors'
                >
                  {brand}
                </span>
              </label>
            ))}
          </div>
        </Section>

        {/* ── Price Range ── */}
        <Section title='Price Range'>
          <div className='space-y-3'>
            <div className='flex items-center justify-between text-xs font-semibold font-lato text-[#0A1F44]'>
              <span>₹{filters.minPrice.toLocaleString()}</span>
              <span>₹{filters.maxPrice.toLocaleString()}</span>
            </div>
            {/* Min price slider */}
            <div className='relative'>
              <input
                type='range'
                min={priceMin}
                max={priceMax}
                step={500}
                value={filters.minPrice}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val < filters.maxPrice)
                    onChange({ ...filters, minPrice: val })
                }}
                className='w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#E8553A]'
              />
            </div>
            {/* Max price slider */}
            <div className='relative'>
              <input
                type='range'
                min={priceMin}
                max={priceMax}
                step={500}
                value={filters.maxPrice}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val > filters.minPrice)
                    onChange({ ...filters, maxPrice: val })
                }}
                className='w-full h-1.5 rounded-full appearance-none cursor-pointer accent-[#E8553A]'
              />
            </div>
            <div className='flex gap-2'>
              <input
                type='number'
                value={filters.minPrice}
                min={priceMin}
                max={filters.maxPrice - 1}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val >= priceMin && val < filters.maxPrice)
                    onChange({ ...filters, minPrice: val })
                }}
                className='w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-lato text-[#0A1F44] focus:outline-none focus:border-[#0A1F44]/40'
                placeholder='Min'
              />
              <span className='text-gray-300 self-center'>—</span>
              <input
                type='number'
                value={filters.maxPrice}
                min={filters.minPrice + 1}
                max={priceMax}
                onChange={(e) => {
                  const val = Number(e.target.value)
                  if (val <= priceMax && val > filters.minPrice)
                    onChange({ ...filters, maxPrice: val })
                }}
                className='w-full border border-gray-200 rounded-lg px-2 py-1.5 text-xs font-lato text-[#0A1F44] focus:outline-none focus:border-[#0A1F44]/40'
                placeholder='Max'
              />
            </div>
          </div>
        </Section>

        {/* ── Rating ── */}
        <Section title='Rating'>
          <div className='space-y-2'>
            {RATING_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                onClick={() =>
                  onChange({
                    ...filters,
                    minRating: filters.minRating === opt.value ? 0 : opt.value,
                  })
                }
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-lato transition-all border ${
                  filters.minRating === opt.value
                    ? 'bg-amber-50 border-amber-300 text-amber-700 font-semibold'
                    : 'bg-white border-gray-100 text-gray-600 hover:border-amber-200 hover:bg-amber-50/50'
                }`}
              >
                <span className='flex'>
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      width='11'
                      height='11'
                      viewBox='0 0 24 24'
                      fill={i < Math.floor(opt.value) ? '#F59E0B' : 'none'}
                      stroke='#F59E0B'
                      strokeWidth='2'
                    >
                      <polygon points='12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2' />
                    </svg>
                  ))}
                </span>
                {opt.label}
              </button>
            ))}
          </div>
        </Section>

        {/* ── Badge ── */}
        <Section title='Product Type'>
          <div className='flex flex-wrap gap-1.5'>
            {BADGE_OPTIONS.map((b) => (
              <Pill
                key={b.value}
                active={filters.badges.includes(b.value)}
                onClick={() => toggleArr('badges', b.value)}
              >
                {b.label}
              </Pill>
            ))}
          </div>
        </Section>

        {/* ── In Stock ── */}
        <Section title='Availability'>
          <label className='flex items-center gap-3 cursor-pointer group'>
            <button
              role='switch'
              aria-checked={filters.inStockOnly}
              onClick={() =>
                onChange({ ...filters, inStockOnly: !filters.inStockOnly })
              }
              className={`relative w-10 h-5 rounded-full transition-colors duration-200 ${
                filters.inStockOnly ? 'bg-[#0A1F44]' : 'bg-gray-200'
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform duration-200 ${
                  filters.inStockOnly ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
            <span className='text-sm font-lato text-gray-700 group-hover:text-[#0A1F44] transition-colors'>
              In Stock Only
            </span>
          </label>
        </Section>
      </div>
    </aside>
  )
}

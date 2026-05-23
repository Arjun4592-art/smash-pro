'use client'

import { useSearchParams } from 'next/navigation'
import { useMemo } from 'react'
import { products } from '@/lib/mockData'
import ProductGrid from '@/components/website/ProductGrid'
import { SPORTS } from '@/lib/constants'
import Link from 'next/link'

export default function ShopClient() {
  const searchParams = useSearchParams()
  const sport = searchParams.get('sport') ?? ''
  const badge = searchParams.get('badge') ?? ''
  const q = searchParams.get('q') ?? ''

  const filtered = useMemo(() => {
    let result = [...products]
    if (sport) result = result.filter((p) => p.sport === sport)
    if (badge) result = result.filter((p) => p.badge === badge)
    if (q)
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q.toLowerCase()) ||
          p.brand.toLowerCase().includes(q.toLowerCase()) ||
          p.sport.toLowerCase().includes(q.toLowerCase()),
      )
    return result
  }, [sport, badge, q])

  const activeSport = SPORTS.find((s) => s.slug === sport)

  const pageTitle = q
    ? `Search: "${q}"`
    : activeSport
      ? `${activeSport.icon} ${activeSport.label}`
      : badge
        ? badge.charAt(0) + badge.slice(1).toLowerCase()
        : 'All Products'

  return (
    <div className='min-h-screen bg-white'>
      {/* Page Header */}
      <div className='bg-[#0A1F44] py-12'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          {/* Breadcrumb */}
          <div className='flex items-center gap-2 text-white/60 text-sm font-lato mb-4'>
            <Link href='/' className='hover:text-white transition-colors'>
              Home
            </Link>
            <span>/</span>
            <Link href='/shop' className='hover:text-white transition-colors'>
              Shop
            </Link>
            {(sport || badge || q) && (
              <>
                <span>/</span>
                <span className='text-white'>{pageTitle}</span>
              </>
            )}
          </div>
          <h1 className='font-montserrat font-black text-3xl sm:text-4xl text-white mb-2'>
            {pageTitle}
          </h1>
          <p className='font-lato text-white/70'>
            {filtered.length} product{filtered.length !== 1 ? 's' : ''} found
          </p>
        </div>
      </div>

      {/* Sport filter pills */}
      <div className='border-b border-gray-100 bg-white sticky top-26 z-30'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3'>
          <div className='flex items-center gap-2 overflow-x-auto scrollbar-none'>
            <Link
              href='/shop'
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all font-lato ${
                !sport && !badge
                  ? 'bg-[#0A1F44] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              All
            </Link>
            {SPORTS.map((s) => (
              <Link
                key={s.slug}
                href={`/shop?sport=${s.slug}`}
                className={`shrink-0 flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all font-lato ${
                  sport === s.slug
                    ? 'bg-[#E8553A] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <ProductGrid
          products={filtered}
          showFilters={true}
          showSort={true}
          showViewToggle={true}
          columns={4}
        />
      </div>
    </div>
  )
}

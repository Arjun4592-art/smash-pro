'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import type { Product } from '@/types'
import { HeartIcon, CartIcon, StarIcon, EyeIcon } from '@/components/ui/Icons'

const BADGE_STYLES: Record<string, string> = {
  NEW: 'bg-[#0A1F44] text-white',
  SALE: 'bg-[#E8553A] text-white',
  BESTSELLER: 'bg-amber-500 text-white',
  LIMITED: 'bg-purple-600 text-white',
}

interface ProductCardProps {
  product: Product
  view?: 'grid' | 'list'
}

export default function ProductCard({
  product,
  view = 'grid',
}: ProductCardProps) {
  const [wishlisted, setWishlisted] = useState(false)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)

  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : 0

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (adding || added) return
    setAdding(true)
    await new Promise((r) => setTimeout(r, 400))
    addItem(product, 1)
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setWishlisted((w) => !w)
  }

  // ── List View ──────────────────────────────────────────────
  if (view === 'list') {
    return (
      <Link href={`/shop/${product.slug}`} className='group block'>
        <div className='flex gap-4 bg-white border border-gray-100 rounded-2xl p-4 hover:shadow-md hover:border-[#E8553A]/20 transition-all duration-300'>
          {/* Image */}
          <div className='relative w-28 h-28 sm:w-36 sm:h-36 rounded-xl overflow-hidden bg-gray-50 shrink-0'>
            <img
              src={product.images[0]}
              alt={product.name}
              className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500'
            />
            {product.badge && (
              <span
                className={`absolute top-2 left-2 text-[10px] font-bold px-2 py-0.5 rounded-full font-montserrat ${
                  BADGE_STYLES[product.badge]
                }`}
              >
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className='flex-1 min-w-0'>
            <div className='flex items-start justify-between gap-2'>
              <div className='min-w-0'>
                <p className='text-xs text-[#E8553A] font-semibold font-lato uppercase tracking-wider mb-1'>
                  {product.brand} · {product.sport}
                </p>
                <h3 className='font-montserrat font-bold text-[#0A1F44] text-base leading-snug truncate'>
                  {product.name}
                </h3>
              </div>
              <button
                onClick={handleWishlist}
                className='p-1.5 shrink-0'
                aria-label='Wishlist'
              >
                <HeartIcon
                  size={18}
                  filled={wishlisted}
                  className={wishlisted ? 'text-[#E8553A]' : 'text-gray-300'}
                />
              </button>
            </div>

            {/* Rating */}
            <div className='flex items-center gap-1.5 mt-1.5 mb-3'>
              <div className='flex items-center gap-0.5'>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={12}
                    filled={i < Math.floor(product.rating)}
                    className={
                      i < Math.floor(product.rating)
                        ? 'text-amber-400'
                        : 'text-gray-200'
                    }
                  />
                ))}
              </div>
              <span className='text-xs text-gray-400 font-lato'>
                {product.rating} ({product.reviewCount})
              </span>
            </div>

            {/* Description */}
            <p className='text-xs text-gray-500 font-lato line-clamp-2 mb-3 hidden sm:block'>
              {product.description}
            </p>

            {/* Price + Cart */}
            <div className='flex items-center justify-between gap-3'>
              <div className='flex items-center gap-2'>
                <span className='font-montserrat font-black text-lg text-[#0A1F44]'>
                  {formatCurrency(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className='text-sm text-gray-400 line-through font-lato'>
                      {formatCurrency(product.originalPrice)}
                    </span>
                    <span className='text-xs font-bold text-[#E8553A] bg-[#E8553A]/10 px-1.5 py-0.5 rounded-full font-montserrat'>
                      -{discount}%
                    </span>
                  </>
                )}
              </div>
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold font-montserrat transition-all duration-200 ${
                  !product.inStock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : added
                      ? 'bg-green-500 text-white'
                      : 'bg-[#0A1F44] hover:bg-[#E8553A] text-white'
                }`}
              >
                <CartIcon size={15} />
                {!product.inStock
                  ? 'Out of Stock'
                  : adding
                    ? 'Adding...'
                    : added
                      ? 'Added ✓'
                      : 'Add to Cart'}
              </button>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  // ── Grid View ──────────────────────────────────────────────
  return (
    <Link href={`/shop/${product.slug}`} className='group block'>
      <div className='bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-xl hover:border-[#E8553A]/20 transition-all duration-300 hover:-translate-y-1'>
        {/* ── Image Container ── */}
        <div className='relative aspect-square bg-gray-50 overflow-hidden'>
          <img
            src={product.images[0]}
            alt={product.name}
            className='w-full h-full object-cover group-hover:scale-108 transition-transform duration-700'
          />

          {/* Overlay on hover */}
          <div className='absolute inset-0 bg-[#0A1F44]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3'>
            {/* Quick view */}
            <Link
              href={`/shop/${product.slug}`}
              onClick={(e) => e.stopPropagation()}
              className='w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#0A1F44] hover:bg-[#E8553A] hover:text-white transition-all shadow-lg translate-y-4 group-hover:translate-y-0 duration-300'
              aria-label='Quick view'
            >
              <svg
                width={16}
                height={16}
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
            </Link>

            {/* Add to cart */}
            <button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-lg translate-y-4 group-hover:translate-y-0 duration-500 ${
                added
                  ? 'bg-green-500 text-white'
                  : 'bg-white text-[#0A1F44] hover:bg-[#E8553A] hover:text-white'
              }`}
              aria-label='Add to cart'
            >
              {added ? (
                <svg
                  width={16}
                  height={16}
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <polyline points='20 6 9 17 4 12' />
                </svg>
              ) : (
                <CartIcon size={16} />
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={handleWishlist}
              className='w-10 h-10 bg-white rounded-full flex items-center justify-center transition-all shadow-lg translate-y-4 group-hover:translate-y-0 duration-700'
              aria-label='Wishlist'
            >
              <HeartIcon
                size={16}
                filled={wishlisted}
                className={wishlisted ? 'text-[#E8553A]' : 'text-[#0A1F44]'}
              />
            </button>
          </div>

          {/* Badge */}
          {product.badge && (
            <span
              className={`absolute top-3 left-3 text-[10px] font-black px-2.5 py-1 rounded-full font-montserrat tracking-wide ${
                BADGE_STYLES[product.badge]
              }`}
            >
              {product.badge}
            </span>
          )}

          {/* Discount badge */}
          {discount > 0 && (
            <span className='absolute top-3 right-3 text-[10px] font-black px-2 py-1 rounded-full bg-[#E8553A] text-white font-montserrat'>
              -{discount}%
            </span>
          )}

          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className='absolute inset-0 bg-white/70 flex items-center justify-center'>
              <span className='font-montserrat font-bold text-sm text-gray-500 bg-white px-4 py-2 rounded-full border border-gray-200'>
                Out of Stock
              </span>
            </div>
          )}
        </div>

        {/* ── Info ── */}
        <div className='p-4'>
          {/* Brand + Sport */}
          <div className='flex items-center justify-between mb-1.5'>
            <p className='text-[11px] text-[#E8553A] font-semibold font-lato uppercase tracking-wider'>
              {product.brand}
            </p>
            <p className='text-[11px] text-gray-400 font-lato capitalize'>
              {product.sport}
            </p>
          </div>

          {/* Name */}
          <h3 className='font-montserrat font-bold text-[#0A1F44] text-sm leading-snug mb-2 line-clamp-2 group-hover:text-[#E8553A] transition-colors'>
            {product.name}
          </h3>

          {/* Rating */}
          <div className='flex items-center gap-1.5 mb-3'>
            <div className='flex items-center gap-0.5'>
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  size={11}
                  filled={i < Math.floor(product.rating)}
                  className={
                    i < Math.floor(product.rating)
                      ? 'text-amber-400'
                      : 'text-gray-200'
                  }
                />
              ))}
            </div>
            <span className='text-[11px] text-gray-400 font-lato'>
              ({product.reviewCount})
            </span>
          </div>

          {/* Price */}
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-2 flex-wrap'>
              <span className='font-montserrat font-black text-base text-[#0A1F44]'>
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className='text-xs text-gray-400 line-through font-lato'>
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            {product.stock <= 5 && product.inStock && (
              <span className='text-[10px] text-[#E8553A] font-semibold font-lato'>
                Only {product.stock} left!
              </span>
            )}
          </div>
        </div>

        {/* ── Add to Cart Bottom Bar ── */}
        <div className='px-4 pb-4'>
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`w-full py-2.5 rounded-xl text-sm font-bold font-montserrat transition-all duration-200 ${
              !product.inStock
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : added
                  ? 'bg-green-500 text-white'
                  : adding
                    ? 'bg-[#0A1F44]/80 text-white'
                    : 'bg-[#0A1F44] hover:bg-[#E8553A] text-white'
            }`}
          >
            {!product.inStock
              ? 'Out of Stock'
              : adding
                ? 'Adding...'
                : added
                  ? '✓ Added to Cart'
                  : 'Add to Cart'}
          </button>
        </div>
      </div>
    </Link>
  )
}

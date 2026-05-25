'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import type { Product } from '@/types'
import { formatCurrency, calculateDiscount } from '@/lib/utils'
import ProductGrid from '@/components/website/ProductGrid'
import {
  StarIcon,
  HeartIcon,
  CartIcon,
  TruckIcon,
  ShieldIcon,
  RefreshIcon,
  ChevronRightIcon,
  MinusIcon,
  PlusIcon,
} from '@/components/ui/Icons'

interface Props {
  product: Product
  related: Product[]
}

const BADGE_STYLES: Record<string, string> = {
  NEW: 'bg-[#0A1F44] text-white',
  SALE: 'bg-[#E8553A] text-white',
  BESTSELLER: 'bg-amber-500 text-white',
  LIMITED: 'bg-purple-600 text-white',
}

export default function ProductDetailClient({ product, related }: Props) {
  const [activeImage, setActiveImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [wishlisted, setWishlisted] = useState(false)
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const addItem = useCartStore((s) => s.addItem)
  const [activeTab, setActiveTab] = useState<
    'description' | 'specs' | 'shipping'
  >('description')

  const discount = product.originalPrice
    ? calculateDiscount(product.price, product.originalPrice)
    : 0

  const handleAddToCart = async () => {
    if (adding || added) return
    setAdding(true)
    await new Promise((r) => setTimeout(r, 500))
    addItem(product, quantity)
    setAdding(false)
    setAdded(true)
    setTimeout(() => setAdded(false), 3000)
  }

  return (
    <div className='min-h-screen bg-white'>
      {/* Breadcrumb */}
      <div className='bg-[#F2F4F7] border-b border-gray-100'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3'>
          <div className='flex items-center gap-2 text-sm font-lato text-gray-500'>
            <Link href='/' className='hover:text-[#E8553A] transition-colors'>
              Home
            </Link>
            <ChevronRightIcon size={14} />
            <Link
              href='/shop'
              className='hover:text-[#E8553A] transition-colors'
            >
              Shop
            </Link>
            <ChevronRightIcon size={14} />
            <Link
              href={`/shop?sport=${product.sport}`}
              className='hover:text-[#E8553A] transition-colors capitalize'
            >
              {product.sport}
            </Link>
            <ChevronRightIcon size={14} />
            <span className='text-[#0A1F44] font-medium truncate max-w-xs'>
              {product.name}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-12'>
          {/* ── Images ── */}
          <div className='space-y-4'>
            {/* Main Image */}
            <div className='relative aspect-square bg-[#F2F4F7] rounded-2xl overflow-hidden'>
              <img
                src={product.images[activeImage]}
                alt={product.name}
                className='w-full h-full object-cover'
              />
              {product.badge && (
                <span
                  className={`absolute top-4 left-4 text-xs font-black px-3 py-1.5 rounded-full font-montserrat ${
                    BADGE_STYLES[product.badge]
                  }`}
                >
                  {product.badge}
                </span>
              )}
              {discount > 0 && (
                <span className='absolute top-4 right-4 text-xs font-black px-3 py-1.5 rounded-full bg-[#E8553A] text-white font-montserrat'>
                  -{discount}%
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {product.images.length > 1 && (
              <div className='flex gap-3'>
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      activeImage === i
                        ? 'border-[#E8553A]'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.name} ${i + 1}`}
                      className='w-full h-full object-cover'
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ── Product Info ── */}
          <div>
            {/* Brand + Sport */}
            <div className='flex items-center gap-3 mb-3'>
              <span className='text-sm font-bold text-[#E8553A] font-lato uppercase tracking-wider'>
                {product.brand}
              </span>
              <span className='w-1 h-1 rounded-full bg-gray-300' />
              <span className='text-sm text-gray-400 font-lato capitalize'>
                {product.sport}
              </span>
            </div>

            {/* Name */}
            <h1 className='font-montserrat font-black text-3xl text-[#0A1F44] mb-4 leading-tight'>
              {product.name}
            </h1>

            {/* Rating */}
            <div className='flex items-center gap-3 mb-5'>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    size={16}
                    filled={i < Math.floor(product.rating)}
                    className={
                      i < Math.floor(product.rating)
                        ? 'text-amber-400'
                        : 'text-gray-200'
                    }
                  />
                ))}
              </div>
              <span className='font-montserrat font-bold text-[#0A1F44]'>
                {product.rating}
              </span>
              <span className='text-gray-400 font-lato text-sm'>
                ({product.reviewCount} reviews)
              </span>
            </div>

            {/* Price */}
            <div className='flex items-center gap-4 mb-6 pb-6 border-b border-gray-100'>
              <span className='font-montserrat font-black text-4xl text-[#0A1F44]'>
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className='text-xl text-gray-400 line-through font-lato'>
                    {formatCurrency(product.originalPrice)}
                  </span>
                  <span className='bg-[#E8553A]/10 text-[#E8553A] font-montserrat font-black text-sm px-3 py-1 rounded-full'>
                    Save {discount}%
                  </span>
                </>
              )}
            </div>

            {/* Tabs */}
            <div className='mb-6'>
              <div className='flex border-b border-gray-200 mb-4'>
                {(['description', 'specs', 'shipping'] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2.5 text-sm font-semibold font-montserrat capitalize transition-all border-b-2 -mb-px ${
                      activeTab === tab
                        ? 'border-[#E8553A] text-[#E8553A]'
                        : 'border-transparent text-gray-400 hover:text-[#0A1F44]'
                    }`}
                  >
                    {tab === 'specs'
                      ? 'Specifications'
                      : tab === 'shipping'
                        ? 'Shipping & Returns'
                        : 'Description'}
                  </button>
                ))}
              </div>

              {activeTab === 'description' && (
                <div>
                  <p className='font-lato text-gray-600 leading-relaxed mb-4'>
                    {product.description}
                  </p>
                  <div className='flex flex-wrap gap-2'>
                    {product.tags.map((tag) => (
                      <span
                        key={tag}
                        className='px-3 py-1 bg-gray-100 text-gray-500 text-xs rounded-full font-lato'
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div>
                  {product.specs && product.specs.length > 0 ? (
                    <div className='rounded-xl overflow-hidden border border-gray-100'>
                      {product.specs.map((spec, i) => (
                        <div
                          key={spec.label}
                          className={`flex items-center px-4 py-3 ${
                            i % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                          }`}
                        >
                          <span className='w-1/2 text-sm font-semibold text-[#0A1F44] font-lato'>
                            {spec.label}
                          </span>
                          <span className='w-1/2 text-sm text-gray-600 font-lato'>
                            {spec.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className='text-sm text-gray-400 font-lato'>
                      No specifications available.
                    </p>
                  )}
                </div>
              )}

              {activeTab === 'shipping' && (
                <div className='space-y-4'>
                  {[
                    {
                      title: 'Free Delivery',
                      desc: 'Free shipping on all orders above ₹999. Standard delivery in 3–5 business days.',
                    },
                    {
                      title: '7-Day Returns',
                      desc: 'Not satisfied? Return within 7 days of delivery for a full refund. Items must be unused and in original packaging.',
                    },
                    {
                      title: '100% Authentic',
                      desc: 'All products are sourced directly from official brand distributors. Authenticity guaranteed.',
                    },
                    {
                      title: 'Cash on Delivery',
                      desc: 'COD available on orders up to ₹10,000 across 20,000+ pin codes in India.',
                    },
                  ].map((item) => (
                    <div key={item.title} className='flex gap-3'>
                      <div className='w-1.5 h-1.5 rounded-full bg-[#E8553A] mt-2 shrink-0' />
                      <div>
                        <p className='text-sm font-semibold text-[#0A1F44] font-montserrat mb-0.5'>
                          {item.title}
                        </p>
                        <p className='text-sm text-gray-500 font-lato'>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Stock */}
            <div className='flex items-center gap-2 mb-6'>
              {product.inStock ? (
                <>
                  <div className='w-2 h-2 rounded-full bg-green-500' />
                  <span className='text-sm text-green-600 font-semibold font-lato'>
                    In Stock
                    {product.stock <= 10 && ` — Only ${product.stock} left`}
                  </span>
                </>
              ) : (
                <>
                  <div className='w-2 h-2 rounded-full bg-red-500' />
                  <span className='text-sm text-red-500 font-semibold font-lato'>
                    Out of Stock
                  </span>
                </>
              )}
            </div>

            {/* Quantity + Actions */}
            <div className='flex items-center gap-4 mb-6'>
              {/* Quantity */}
              <div className='flex items-center border border-gray-200 rounded-xl overflow-hidden'>
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className='w-11 h-11 flex items-center justify-center text-[#0A1F44] hover:bg-gray-50 transition-colors'
                >
                  <MinusIcon size={16} />
                </button>
                <span className='w-12 text-center font-montserrat font-bold text-[#0A1F44]'>
                  {quantity}
                </span>
                <button
                  onClick={() =>
                    setQuantity(Math.min(product.stock, quantity + 1))
                  }
                  className='w-11 h-11 flex items-center justify-center text-[#0A1F44] hover:bg-gray-50 transition-colors'
                >
                  <PlusIcon size={16} />
                </button>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || adding}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-montserrat font-black text-sm transition-all duration-200 ${
                  !product.inStock
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : added
                      ? 'bg-green-500 text-white'
                      : 'bg-[#E8553A] hover:bg-[#D4441F] text-white shadow-lg hover:shadow-[#E8553A]/30 hover:-translate-y-0.5'
                }`}
              >
                <CartIcon size={18} />
                {!product.inStock
                  ? 'Out of Stock'
                  : adding
                    ? 'Adding...'
                    : added
                      ? '✓ Added to Cart'
                      : 'Add to Cart'}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => setWishlisted((w) => !w)}
                className={`w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all ${
                  wishlisted
                    ? 'border-[#E8553A] bg-[#E8553A]/10 text-[#E8553A]'
                    : 'border-gray-200 text-gray-400 hover:border-[#E8553A]/40'
                }`}
              >
                <HeartIcon size={20} filled={wishlisted} />
              </button>
            </div>

            {/* SKU */}
            <p className='text-xs text-gray-400 font-lato mb-6'>
              SKU: <span className='font-semibold'>{product.sku}</span>
            </p>

            {/* Trust badges */}
            <div className='grid grid-cols-3 gap-3 pt-6 border-t border-gray-100'>
              {[
                { icon: <TruckIcon size={18} />, text: 'Free Delivery' },
                { icon: <ShieldIcon size={18} />, text: '100% Authentic' },
                { icon: <RefreshIcon size={18} />, text: '7-Day Returns' },
              ].map((badge) => (
                <div
                  key={badge.text}
                  className='flex flex-col items-center gap-1.5 p-3 bg-gray-50 rounded-xl text-center'
                >
                  <span className='text-[#E8553A]'>{badge.icon}</span>
                  <span className='text-xs font-semibold text-[#0A1F44] font-lato'>
                    {badge.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <div className='mt-20'>
            <ProductGrid
              products={related}
              title='You Might Also Like'
              showSort={false}
              showViewToggle={false}
              columns={4}
            />
          </div>
        )}
      </div>
    </div>
  )
}

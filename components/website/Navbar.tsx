'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { SITE_NAME, SPORTS } from '@/lib/constants'
import {
  SearchIcon,
  CartIcon,
  UserIcon,
  MenuIcon,
  CloseIcon,
  ChevronDownIcon,
  HeartIcon,
} from '@/components/ui/Icons'
import { useAuthStore } from '@/store/authStore'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'All Products', href: '/shop' },
  { label: 'New Arrivals', href: '/shop?badge=NEW' },
  { label: 'Sale', href: '/shop?badge=SALE', highlight: true },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [sportsOpen, setSportsOpen] = useState(false)
  const [mobileSportsOpen, setMobileSportsOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [mounted, setMounted] = useState(false)
  const searchRef = useRef<HTMLInputElement>(null)
  const itemCount = useCartStore((s) => s.itemCount)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (searchOpen) {
      searchRef.current?.focus()
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [searchOpen])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleSearch = () => {
    if (searchQuery.trim()) {
      window.location.href = `/shop?q=${encodeURIComponent(searchQuery.trim())}`
      setSearchOpen(false)
      setSearchQuery('')
    }
  }

  const user = useAuthStore((s) => s.user)
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return (
    <>
      {/* ── Announcement Bar ── */}
      <div className='bg-[#0A1F44] text-white text-xs py-2.5 text-center font-lato tracking-wide'>
        <span className='hidden sm:inline'>
          🚚 Free shipping on orders above ₹999 &nbsp;·&nbsp; Use code{' '}
          <span className='text-[#E8553A] font-bold'> Smash10 </span> for 10%
          off &nbsp;·&nbsp; 🏆 India&apos;s #1 Sports Store
        </span>
        <span className='sm:hidden'>
          🚚 Free shipping above ₹999 · Code{' '}
          <span className='text-[#E8553A] font-bold'>APEX10</span>
        </span>
      </div>

      {/* ── Main Header ── */}
      <header
        className={`sticky top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-white shadow-sm'
        }`}
      >
        <nav className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center justify-between h-16 lg:h-18'>
            {/* ── Logo ── */}
            <Link href='/' className='flex items-center gap-2.5 shrink-0 group'>
              <div className='w-9 h-9 bg-[#E8553A] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform'>
                <span className='text-white font-montserrat font-black text-base'>
                  A
                </span>
              </div>
              <div className='flex flex-col leading-none'>
                <span className='font-montserrat font-black text-xl text-[#0A1F44] tracking-tight'>
                  {SITE_NAME}
                </span>
                <span className='text-[10px] text-[#E8553A] font-lato font-medium tracking-widest uppercase'>
                  Sports Store
                </span>
              </div>
            </Link>

            {/* ── Desktop Nav ── */}
            <div className='hidden lg:flex items-center gap-1'>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all font-lato ${
                    link.highlight
                      ? 'text-[#E8553A] hover:bg-[#E8553A]/10 font-bold'
                      : 'text-[#0A1F44] hover:bg-gray-50 hover:text-[#E8553A]'
                  }`}
                >
                  {link.label}
                  {link.highlight && ' 🔥'}
                </Link>
              ))}

              {/* Sports Mega Dropdown */}
              <div
                className='relative'
                onMouseEnter={() => setSportsOpen(true)}
                onMouseLeave={() => setSportsOpen(false)}
              >
                <button
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-[#0A1F44] hover:bg-gray-50 hover:text-[#E8553A] transition-all font-lato ${
                    sportsOpen ? 'bg-gray-50 text-[#E8553A]' : ''
                  }`}
                >
                  Sports
                  <ChevronDownIcon
                    size={15}
                    className={`transition-transform duration-200 ${
                      sportsOpen ? 'rotate-180 text-[#E8553A]' : ''
                    }`}
                  />
                </button>

                {/* Mega Menu */}
                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden transition-all duration-200 ${
                    sportsOpen
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className='p-2'>
                    <p className='text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 py-2 font-montserrat'>
                      Browse by Sport
                    </p>
                    <div className='grid grid-cols-2 gap-1'>
                      {SPORTS.map((sport) => (
                        <Link
                          key={sport.slug}
                          href={`/shop?sport=${sport.slug}`}
                          className='flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm text-[#0A1F44] hover:bg-[#E8553A]/8 hover:text-[#E8553A] transition-all font-lato group'
                        >
                          <span className='text-base'>{sport.icon}</span>
                          <span className='font-medium'>{sport.label}</span>
                        </Link>
                      ))}
                    </div>
                    <div className='border-t border-gray-100 mt-2 pt-2 px-1'>
                      <Link
                        href='/shop'
                        className='flex items-center justify-center gap-2 w-full py-2.5 bg-[#0A1F44] text-white text-sm font-semibold rounded-xl hover:bg-[#0A1F44]/90 transition-colors font-montserrat'
                      >
                        View All Products →
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── Desktop Actions ── */}
            <div className='hidden lg:flex items-center gap-1'>
              {/* Search */}
              <button
                onClick={() => setSearchOpen(true)}
                className='p-2.5 text-[#0A1F44] hover:text-[#E8553A] hover:bg-gray-50 rounded-lg transition-all'
                aria-label='Search'
              >
                <SearchIcon size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href='/wishlist'
                className='p-2.5 text-[#0A1F44] hover:text-[#E8553A] hover:bg-gray-50 rounded-lg transition-all'
                aria-label='Wishlist'
              >
                <HeartIcon size={20} />
              </Link>

              {/* Account */}
              {/* Account */}
              {isAuthenticated ? (
                <Link
                  href='/profile'
                  className='flex items-center gap-2 p-2 text-[#0A1F44] hover:text-[#E8553A] hover:bg-gray-50 rounded-lg transition-all'
                >
                  <div className='w-7 h-7 bg-[#0A1F44] text-white rounded-full flex items-center justify-center text-xs font-montserrat font-bold'>
                    {user?.name?.slice(0, 2).toUpperCase() ?? 'U'}
                  </div>
                </Link>
              ) : (
                <Link
                  href='/login'
                  className='p-2.5 text-[#0A1F44] hover:text-[#E8553A] hover:bg-gray-50 rounded-lg transition-all'
                  aria-label='Account'
                >
                  <UserIcon size={20} />
                </Link>
              )}

              {/* Cart */}
              <Link
                href='/cart'
                className='relative flex items-center gap-2 ml-1 bg-[#0A1F44] hover:bg-[#E8553A] text-white px-4 py-2.5 rounded-xl transition-all duration-200 group'
                aria-label='Cart'
              >
                <CartIcon size={18} />
                <span className='text-sm font-semibold font-montserrat'>
                  Cart
                </span>
                {mounted && itemCount > 0 && (
                  <span className='absolute -top-2 -right-2 w-5 h-5 bg-[#E8553A] group-hover:bg-white group-hover:text-[#E8553A] text-white text-[10px] font-bold rounded-full flex items-center justify-center transition-colors'>
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>
            </div>

            {/* ── Mobile Actions ── */}
            <div className='flex lg:hidden items-center gap-2'>
              <button
                onClick={() => setSearchOpen(true)}
                className='p-2 text-[#0A1F44]'
                aria-label='Search'
              >
                <SearchIcon size={20} />
              </button>

              <Link href='/cart' className='relative p-2 text-[#0A1F44]'>
                <CartIcon size={20} />
                {mounted && itemCount > 0 && (
                  <span className='absolute -top-1 -right-1 w-5 h-5 bg-[#E8553A] text-white text-[10px] font-bold rounded-full flex items-center justify-center'>
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className='p-2 text-[#0A1F44]'
                aria-label='Toggle menu'
              >
                {mobileOpen ? <CloseIcon size={22} /> : <MenuIcon size={22} />}
              </button>
            </div>
          </div>
        </nav>

        {/* ── Mobile Menu ── */}
        <div
          className={`lg:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className='px-4 py-4 space-y-1 max-h-[80vh] overflow-y-auto'>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-colors font-lato ${
                  link.highlight
                    ? 'text-[#E8553A] bg-[#E8553A]/5 font-bold'
                    : 'text-[#0A1F44] hover:bg-gray-50'
                }`}
              >
                {link.label} {link.highlight && '🔥'}
              </Link>
            ))}

            {/* Mobile Sports Toggle */}
            <button
              onClick={() => setMobileSportsOpen(!mobileSportsOpen)}
              className='flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-medium text-[#0A1F44] hover:bg-gray-50 transition-colors font-lato'
            >
              <span>Browse Sports</span>
              <ChevronDownIcon
                size={16}
                className={`transition-transform duration-200 ${
                  mobileSportsOpen ? 'rotate-180' : ''
                }`}
              />
            </button>

            {/* Mobile Sports Grid */}
            {mobileSportsOpen && (
              <div className='grid grid-cols-2 gap-1.5 px-2 pb-2'>
                {SPORTS.map((sport) => (
                  <Link
                    key={sport.slug}
                    href={`/shop?sport=${sport.slug}`}
                    onClick={() => setMobileOpen(false)}
                    className='flex items-center gap-2 px-3 py-2.5 bg-gray-50 hover:bg-[#E8553A]/10 hover:text-[#E8553A] rounded-xl text-sm text-[#0A1F44] transition-colors font-lato'
                  >
                    <span>{sport.icon}</span>
                    <span className='font-medium'>{sport.label}</span>
                  </Link>
                ))}
              </div>
            )}

            {/* Mobile bottom links */}
            <div className='border-t border-gray-100 pt-3 mt-3 space-y-1'>
              <Link
                href='/login'
                onClick={() => setMobileOpen(false)}
                className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#0A1F44] hover:bg-gray-50 transition-colors font-lato'
              >
                <UserIcon size={18} />
                My Account
              </Link>
              <Link
                href='/wishlist'
                onClick={() => setMobileOpen(false)}
                className='flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-[#0A1F44] hover:bg-gray-50 transition-colors font-lato'
              >
                <HeartIcon size={18} />
                Wishlist
              </Link>
              <Link
                href='/cart'
                onClick={() => setMobileOpen(false)}
                className='flex items-center justify-center gap-2 w-full py-3 bg-[#0A1F44] text-white rounded-xl text-sm font-semibold font-montserrat mt-2'
              >
                <CartIcon size={18} />
                View Cart
                {mounted && itemCount > 0 && (
                  <span className='bg-[#E8553A] text-white text-xs font-bold px-2 py-0.5 rounded-full'>
                    {itemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* ── Search Overlay ── */}
      {searchOpen && (
        <div
          className='fixed inset-0 z-60 bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4'
          onClick={() => setSearchOpen(false)}
        >
          <div
            className='w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden'
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search input */}
            <div className='flex items-center gap-3 px-5 py-4'>
              <SearchIcon size={20} className='text-gray-400 shrink-0' />
              <input
                ref={searchRef}
                type='text'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder='Search products, brands, sports...'
                className='flex-1 text-base outline-none text-[#0A1F44] placeholder-gray-400 font-lato'
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSearch()
                  if (e.key === 'Escape') setSearchOpen(false)
                }}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className='p-1 text-gray-400 hover:text-gray-600'
                >
                  <CloseIcon size={16} />
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className='p-1.5 text-gray-400 hover:text-gray-600 border-l border-gray-200 pl-3'
              >
                <CloseIcon size={18} />
              </button>
            </div>

            {/* Quick links */}
            <div className='px-5 pb-5 border-t border-gray-100 pt-4'>
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 font-montserrat'>
                Popular Categories
              </p>
              <div className='flex flex-wrap gap-2 mb-4'>
                {SPORTS.map((sport) => (
                  <Link
                    key={sport.slug}
                    href={`/shop?sport=${sport.slug}`}
                    onClick={() => setSearchOpen(false)}
                    className='flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-[#E8553A]/10 hover:text-[#E8553A] border border-gray-200 hover:border-[#E8553A]/30 rounded-full text-sm text-[#0A1F44] transition-all font-lato'
                  >
                    <span>{sport.icon}</span>
                    <span>{sport.label}</span>
                  </Link>
                ))}
              </div>

              {/* Popular searches */}
              <p className='text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2 font-montserrat'>
                Popular Searches
              </p>
              <div className='flex flex-wrap gap-2'>
                {[
                  'Cricket Bat',
                  'Football Boots',
                  'Tennis Racket',
                  'Running Shoes',
                  'Boxing Gloves',
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      setSearchQuery(term)
                      setTimeout(handleSearch, 100)
                    }}
                    className='px-3 py-1.5 text-sm text-gray-500 hover:text-[#E8553A] transition-colors font-lato'
                  >
                    🔍 {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Search button */}
            {searchQuery && (
              <div className='px-5 pb-4'>
                <button
                  onClick={handleSearch}
                  className='w-full bg-[#E8553A] hover:bg-[#D4441F] text-white py-3 rounded-xl text-sm font-semibold font-montserrat transition-colors'
                >
                  Search for &quot;{searchQuery}&quot;
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}

'use client'

import { useState, useRef, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { products } from '@/lib/mockData'
import { formatCurrency } from '@/lib/utils'
import { SearchIcon, CloseIcon } from '@/components/ui/Icons'
import { SPORTS } from '@/lib/constants'
import Link from 'next/link'

interface SearchBarProps {
  placeholder?: string
  className?: string
  autoFocus?: boolean
}

export default function SearchBar({
  placeholder = 'Search products, brands, sports...',
  className = '',
  autoFocus = false,
}: SearchBarProps) {
  const [query, setQuery] = useState('')
  const [focused, setFocused] = useState(false)
  const [results, setResults] = useState(products.slice(0, 0))
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus()
  }, [autoFocus])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }
    const q = query.toLowerCase()
    const found = products
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.sport.toLowerCase().includes(q) ||
          p.tags.some((t) => t.includes(q)),
      )
      .slice(0, 5)
    setResults(found)
  }, [query])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setFocused(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = () => {
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`)
      setFocused(false)
      setQuery('')
    }
  }

  const showDropdown = focused && (query.length >= 2 || results.length === 0)

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Input */}
      <div
        className={`flex items-center gap-2 bg-white border rounded-xl px-4 py-2.5 transition-all duration-200 ${
          focused
            ? 'border-[#E8553A] shadow-md shadow-[#E8553A]/10'
            : 'border-gray-200 hover:border-gray-300'
        }`}
      >
        <SearchIcon size={18} className='text-gray-400 shrink-0' />
        <input
          ref={inputRef}
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          placeholder={placeholder}
          className='flex-1 outline-none text-sm text-[#0A1F44] placeholder-gray-400 font-lato bg-transparent'
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleSearch()
            if (e.key === 'Escape') {
              setFocused(false)
              setQuery('')
            }
          }}
        />
        {query && (
          <button
            onClick={() => {
              setQuery('')
              inputRef.current?.focus()
            }}
            className='text-gray-400 hover:text-gray-600 shrink-0'
          >
            <CloseIcon size={16} />
          </button>
        )}
        <button
          onClick={handleSearch}
          className='bg-[#E8553A] hover:bg-[#D4441F] text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors font-montserrat shrink-0'
        >
          Search
        </button>
      </div>

      {/* Dropdown */}
      {focused && (
        <div className='absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-xl border border-gray-100 z-50 overflow-hidden'>
          {/* Search results */}
          {results.length > 0 ? (
            <div>
              <p className='text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-4 pt-3 pb-2 font-montserrat'>
                Products
              </p>
              {results.map((product) => (
                <Link
                  key={product.id}
                  href={`/shop/${product.slug}`}
                  onClick={() => {
                    setFocused(false)
                    setQuery('')
                  }}
                  className='flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 transition-colors'
                >
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className='w-10 h-10 rounded-lg object-cover shrink-0 border border-gray-100'
                  />
                  <div className='flex-1 min-w-0'>
                    <p className='text-sm font-semibold text-[#0A1F44] font-montserrat truncate'>
                      {product.name}
                    </p>
                    <p className='text-xs text-gray-400 font-lato'>
                      {product.brand} · {product.sport}
                    </p>
                  </div>
                  <span className='text-sm font-black text-[#0A1F44] font-montserrat shrink-0'>
                    {formatCurrency(product.price)}
                  </span>
                </Link>
              ))}
              <div className='px-4 py-3 border-t border-gray-50'>
                <button
                  onClick={handleSearch}
                  className='text-sm text-[#E8553A] font-semibold font-lato hover:underline'
                >
                  See all results for &quot;{query}&quot; →
                </button>
              </div>
            </div>
          ) : query.length >= 2 ? (
            <div className='px-4 py-8 text-center'>
              <p className='text-gray-400 font-lato text-sm'>
                No results for &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div className='p-4'>
              <p className='text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-3 font-montserrat'>
                Popular Sports
              </p>
              <div className='flex flex-wrap gap-2'>
                {SPORTS.map((sport) => (
                  <Link
                    key={sport.slug}
                    href={`/shop?sport=${sport.slug}`}
                    onClick={() => setFocused(false)}
                    className='flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-[#E8553A]/10 hover:text-[#E8553A] rounded-full text-sm text-[#0A1F44] transition-colors font-lato border border-gray-100'
                  >
                    <span>{sport.icon}</span>
                    <span>{sport.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

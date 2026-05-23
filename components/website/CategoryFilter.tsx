'use client'

import { useState } from 'react'
import Link from 'next/link'
import { SPORTS } from '@/lib/constants'

const CATEGORIES = [
  {
    sport: 'football',
    icon: '⚽',
    label: 'Football',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&q=80',
    count: 45,
    color: 'from-green-900/80',
  },
  {
    sport: 'cricket',
    icon: '🏏',
    label: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=600&q=80',
    count: 62,
    color: 'from-amber-900/80',
  },
  {
    sport: 'basketball',
    icon: '🏀',
    label: 'Basketball',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600&q=80',
    count: 28,
    color: 'from-orange-900/80',
  },
  {
    sport: 'tennis',
    icon: '🎾',
    label: 'Tennis',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=600&q=80',
    count: 38,
    color: 'from-yellow-900/80',
  },
  {
    sport: 'swimming',
    icon: '🏊',
    label: 'Swimming',
    image: 'https://images.unsplash.com/photo-1519315901367-f34ff9154487?w=600&q=80',
    count: 22,
    color: 'from-blue-900/80',
  },
  {
    sport: 'running',
    icon: '🏃',
    label: 'Running',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    count: 54,
    color: 'from-red-900/80',
  },
  {
    sport: 'cycling',
    icon: '🚴',
    label: 'Cycling',
    image: 'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=600&q=80',
    count: 19,
    color: 'from-purple-900/80',
  },
  {
    sport: 'boxing',
    icon: '🥊',
    label: 'Boxing',
    image: 'https://images.unsplash.com/photo-1552072092-7f9b8d63efcb?w=600&q=80',
    count: 31,
    color: 'from-gray-900/80',
  },
]

export default function CategoryFilter() {
  const [hovered, setHovered] = useState<string | null>(null)

  return (
    <section className="py-16 bg-[#F2F4F7]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold text-[#E8553A] uppercase tracking-widest font-montserrat mb-2">
            Browse by Sport
          </p>
          <h2 className="font-montserrat font-black text-3xl sm:text-4xl text-[#0A1F44]">
            What Do You Play?
          </h2>
          <p className="text-gray-500 font-lato mt-3 max-w-lg mx-auto">
            From cricket pitches to running tracks — we have premium gear for
            every sport and every level.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.sport}
              href={`/shop?sport=${cat.sport}`}
              onMouseEnter={() => setHovered(cat.sport)}
              onMouseLeave={() => setHovered(null)}
              className="group relative rounded-2xl overflow-hidden aspect-4/3 block"
            >
              {/* Background image */}
              <img
                src={cat.image}
                alt={cat.label}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              {/* Gradient overlay */}
              <div
                className={`absolute inset-0 bg-linear-to-t ${cat.color} via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300`}
              />

              {/* Navy overlay on hover */}
              <div className="absolute inset-0 bg-[#0A1F44]/20 group-hover:bg-[#0A1F44]/40 transition-all duration-300" />

              {/* Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <span className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">
                  {cat.icon}
                </span>
                <h3 className="font-montserrat font-black text-white text-lg">
                  {cat.label}
                </h3>
                <p className="text-white/70 text-xs font-lato mt-1">
                  {cat.count}+ products
                </p>

                {/* Shop now pill */}
                <div
                  className={`mt-3 px-4 py-1.5 bg-[#E8553A] text-white text-xs font-semibold rounded-full font-montserrat transition-all duration-300 ${
                    hovered === cat.sport
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-2'
                  }`}
                >
                  Shop Now →
                </div>
              </div>

              {/* Border on hover */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-[#E8553A]/60 transition-all duration-300" />
            </Link>
          ))}
        </div>

        {/* View all link */}
        <div className="text-center mt-8">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 bg-[#0A1F44] hover:bg-[#E8553A] text-white font-montserrat font-bold px-8 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:-translate-y-0.5"
          >
            Browse All Products
            <span>→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
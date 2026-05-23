'use client'

import { useRef } from 'react'

const BRANDS = [
  { name: 'Nike', logo: '🟠', description: 'Football & Running' },
  { name: 'Adidas', logo: '⚫', description: 'Football & Tennis' },
  { name: 'Yonex', logo: '🔴', description: 'Badminton & Tennis' },
  { name: 'Wilson', logo: '🔵', description: 'Tennis & Squash' },
  { name: 'Babolat', logo: '🟡', description: 'Tennis' },
  { name: 'SS', logo: '🟢', description: 'Cricket' },
  { name: 'SG', logo: '🔴', description: 'Cricket' },
  { name: 'Kookaburra', logo: '🟤', description: 'Cricket' },
  { name: 'Spalding', logo: '🟠', description: 'Basketball' },
  { name: 'Speedo', logo: '🔵', description: 'Swimming' },
  { name: 'Everlast', logo: '⚫', description: 'Boxing' },
  { name: 'Trek', logo: '🟢', description: 'Cycling' },
  { name: 'Garmin', logo: '🔵', description: 'Running' },
  { name: 'Victor', logo: '🔴', description: 'Badminton' },
  { name: 'Head', logo: '⚫', description: 'Tennis & Squash' },
  { name: 'Puma', logo: '🟡', description: 'Football & Running' },
]

// Duplicate for seamless loop
const BRANDS_DOUBLED = [...BRANDS, ...BRANDS]

export default function BrandsBar() {
  const scrollRef = useRef<HTMLDivElement>(null)

  return (
    <section className="py-14 bg-white border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest font-montserrat mb-2">
          Trusted Brands
        </p>
        <h2 className="font-montserrat font-black text-2xl text-[#0A1F44]">
          We Stock The World&apos;s Best
        </h2>
      </div>

      {/* ── Scrolling Track ── */}
      <div className="relative">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Track */}
        <div
          ref={scrollRef}
          className="flex items-center gap-6 overflow-hidden"
        >
          <div className="flex items-center gap-6 animate-scroll">
            {BRANDS_DOUBLED.map((brand, i) => (
              <div
                key={`${brand.name}-${i}`}
                className="shrink-0 group cursor-pointer"
              >
                <div className="flex flex-col items-center gap-2 px-6 py-4 rounded-2xl border border-gray-100 hover:border-[#E8553A]/30 hover:shadow-md transition-all duration-300 bg-white min-w-30">
                  {/* Brand initial styled as logo placeholder */}
                  <div className="w-12 h-12 rounded-xl bg-gray-50 group-hover:bg-[#E8553A]/5 flex items-center justify-center transition-colors">
                    <span className="font-montserrat font-black text-xl text-[#0A1F44] group-hover:text-[#E8553A] transition-colors">
                      {brand.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div className="text-center">
                    <p className="font-montserrat font-bold text-sm text-[#0A1F44] group-hover:text-[#E8553A] transition-colors whitespace-nowrap">
                      {brand.name}
                    </p>
                    <p className="font-lato text-[10px] text-gray-400 whitespace-nowrap">
                      {brand.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Second row — reverse scroll ── */}
      <div className="relative mt-4">
        {/* Left fade */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-linear-to-r from-white to-transparent z-10 pointer-events-none" />
        {/* Right fade */}
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-linear-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-6 overflow-hidden">
          <div className="flex items-center gap-6 animate-scroll-reverse">
            {[...BRANDS_DOUBLED].reverse().map((brand, i) => (
              <div
                key={`${brand.name}-rev-${i}`}
                className="shrink-0 group cursor-pointer"
              >
                <div className="flex items-center gap-3 px-5 py-3 rounded-full border border-gray-100 hover:border-[#E8553A]/30 hover:bg-[#E8553A]/5 transition-all duration-300 bg-white min-w-32.5">
                  <div className="w-8 h-8 rounded-lg bg-[#0A1F44]/5 group-hover:bg-[#E8553A]/10 flex items-center justify-center transition-colors shrink-0">
                    <span className="font-montserrat font-black text-xs text-[#0A1F44] group-hover:text-[#E8553A] transition-colors">
                      {brand.name.slice(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <span className="font-montserrat font-bold text-sm text-[#0A1F44] group-hover:text-[#E8553A] transition-colors whitespace-nowrap">
                    {brand.name}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── View All Brands CTA ── */}
      <div className="text-center mt-8">
        <a
          href="/shop"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#E8553A] hover:text-[#D4441F] font-montserrat transition-colors group"
        >
          Shop all brands
          <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
        </a>
      </div>

      {/* ── Keyframe Animations ── */}
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-reverse {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
          width: max-content;
        }
        .animate-scroll-reverse {
          animation: scroll-reverse 30s linear infinite;
          width: max-content;
        }
        .animate-scroll:hover,
        .animate-scroll-reverse:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}
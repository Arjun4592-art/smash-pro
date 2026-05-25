'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { SPORTS } from '@/lib/constants'
import {
  ArrowRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@/components/ui/Icons'

const SLIDES = [
  {
    id: 1,
    badge: '🏏 New Season Collection',
    heading: 'Play Like\nA Champion',
    subheading: 'Premium cricket gear for every level — from gully to ground.',
    cta: { label: 'Shop Cricket', href: '/shop?sport=cricket' },
    secondaryCta: { label: 'View All', href: '/shop' },
    sport: 'cricket',
    image:
      'https://images.unsplash.com/photo-1531415074968-036ba1b575da?w=1200&q=80',
    accent: '#E8553A',
    stats: [
      { value: '500+', label: 'Cricket Products' },
      { value: '20+', label: 'Top Brands' },
      { value: '4.9★', label: 'Avg Rating' },
    ],
  },
  {
    id: 2,
    badge: '⚽ Football Season',
    heading: 'Dominate\nThe Field',
    subheading: 'Elite football boots and gear from Nike, Adidas & more.',
    cta: { label: 'Shop Football', href: '/shop?sport=football' },
    secondaryCta: { label: 'View All', href: '/shop' },
    sport: 'football',
    image:
      'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    accent: '#E8553A',
    stats: [
      { value: '300+', label: 'Football Products' },
      { value: '15+', label: 'Top Brands' },
      { value: '48hr', label: 'Fast Delivery' },
    ],
  },
  {
    id: 3,
    badge: '🎾 Tennis & Rackets',
    heading: 'Ace Every\nShot',
    subheading:
      "Wilson, Babolat, Head — the world's best rackets, delivered to you.",
    cta: { label: 'Shop Tennis', href: '/shop?sport=tennis' },
    secondaryCta: { label: 'View All', href: '/shop' },
    sport: 'tennis',
    image:
      'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=80',
    accent: '#E8553A',
    stats: [
      { value: '200+', label: 'Racket Products' },
      { value: '10+', label: 'Top Brands' },
      { value: '100%', label: 'Authentic' },
    ],
  },
  {
    id: 4,
    badge: '🏃 Running Gear',
    heading: 'Run Further\nRun Faster',
    subheading:
      'Premium running shoes and gear for every terrain and distance.',
    cta: { label: 'Shop Running', href: '/shop?sport=running' },
    secondaryCta: { label: 'View All', href: '/shop' },
    sport: 'running',
    image:
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&q=80',
    accent: '#E8553A',
    stats: [
      { value: '400+', label: 'Running Products' },
      { value: '25+', label: 'Top Brands' },
      { value: 'Free', label: 'Returns' },
    ],
  },
]

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [autoplay, setAutoplay] = useState(true)

  const slide = SLIDES[current]

  const goTo = (index: number) => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrent(index)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const prev = () => goTo((current - 1 + SLIDES.length) % SLIDES.length)
  const next = () => goTo((current + 1) % SLIDES.length)

  // Autoplay
  useEffect(() => {
    if (!autoplay) return
    const interval = setInterval(next, 5000)
    return () => clearInterval(interval)
  }, [current, autoplay])

  return (
    <section className='relative w-full overflow-hidden bg-[#0A1F44]'>
      {/* ── Background Image ── */}
      <div className='absolute inset-0 z-0'>
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={s.image}
              alt={s.sport}
              className='w-full h-full object-cover'
            />
            {/* Dark overlay */}
            <div className='absolute inset-0 bg-linear-to-r from-[#0A1F44]/90 via-[#0A1F44]/60 to-[#0A1F44]/20' />
          </div>
        ))}
      </div>

      {/* ── Content ── */}
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='min-h-[85vh] flex items-center'>
          <div className='w-full lg:w-3/5'>
            {/* Badge */}
            <div
              key={`badge-${current}`}
              className='inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 text-white text-sm font-lato px-4 py-2 rounded-full mb-6 animate-fade-in'
            >
              {slide.badge}
            </div>

            {/* Heading */}
            <h1
              key={`heading-${current}`}
              className='font-montserrat font-black text-white mb-5 animate-slide-up'
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)', lineHeight: 1.1 }}
            >
              {slide.heading.split('\n').map((line, i) => (
                <span key={i} className='block'>
                  {i === 1 ? (
                    <span className='text-[#E8553A]'>{line}</span>
                  ) : (
                    line
                  )}
                </span>
              ))}
            </h1>

            {/* Subheading */}
            <p
              key={`sub-${current}`}
              className='text-white/75 font-lato text-lg mb-8 max-w-lg leading-relaxed animate-slide-up'
            >
              {slide.subheading}
            </p>

            {/* CTA Buttons */}
            <div
              key={`cta-${current}`}
              className='flex flex-wrap items-center gap-4 mb-12 animate-slide-up'
            >
              <Link
                href={slide.cta.href}
                className='flex items-center gap-2 bg-[#E8553A] hover:bg-[#D4441F] text-white font-montserrat font-bold px-7 py-3.5 rounded-full transition-all duration-200 shadow-lg hover:shadow-[#E8553A]/30 hover:shadow-xl hover:-translate-y-0.5 group'
              >
                {slide.cta.label}
                <ArrowRightIcon
                  size={18}
                  className='group-hover:translate-x-1 transition-transform'
                />
              </Link>
              <Link
                href={slide.secondaryCta.href}
                className='flex items-center gap-2 bg-white/15 hover:bg-white/25 backdrop-blur-sm text-white font-montserrat font-semibold px-7 py-3.5 rounded-full border border-white/30 transition-all duration-200'
              >
                {slide.secondaryCta.label}
              </Link>
            </div>

            {/* Stats */}
            <div
              key={`stats-${current}`}
              className='flex items-center gap-8 animate-slide-up'
            >
              {slide.stats.map((stat, i) => (
                <div key={i} className='text-center'>
                  <p className='font-montserrat font-black text-2xl text-[#E8553A]'>
                    {stat.value}
                  </p>
                  <p className='font-lato text-xs text-white/60 mt-0.5'>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sport Pills ── */}
      <div className='relative z-10 border-t border-white/10 bg-[#0A1F44]/80 backdrop-blur-sm'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-2 py-3 overflow-x-auto scrollbar-none'>
            <span className='text-white/40 text-xs font-lato whitespace-nowrap mr-2'>
              Browse:
            </span>
            {SPORTS.map((sport) => (
              <Link
                key={sport.slug}
                href={`/shop?sport=${sport.slug}`}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all font-lato ${
                  slide.sport === sport.slug
                    ? 'bg-[#E8553A] text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span>{sport.icon}</span>
                <span>{sport.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Slider Controls ── */}
      <div className='absolute bottom-20 right-8 z-20 hidden lg:flex items-center gap-3'>
        {/* Prev */}
        <button
          onClick={() => {
            setAutoplay(false)
            prev()
          }}
          className='w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all'
          aria-label='Previous slide'
        >
          <ChevronLeftIcon size={18} />
        </button>

        {/* Dots */}
        <div className='flex items-center gap-2'>
          {SLIDES.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setAutoplay(false)
                goTo(i)
              }}
              className={`transition-all duration-300 rounded-full ${
                i === current
                  ? 'w-8 h-2.5 bg-[#E8553A]'
                  : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
              }`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>

        {/* Next */}
        <button
          onClick={() => {
            setAutoplay(false)
            next()
          }}
          className='w-10 h-10 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-sm border border-white/20 text-white flex items-center justify-center transition-all'
          aria-label='Next slide'
        >
          <ChevronRightIcon size={18} />
        </button>
      </div>

      {/* ── Progress Bar ── */}
      {autoplay && (
        <div className='absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10'>
          <div key={current} className='h-full bg-[#E8553A] animate-progress' />
        </div>
      )}

      {/* ── Keyframe Animations ── */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
        .animate-fade-in {
          animation: fade-in 0.6s ease forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease forwards;
        }
        .animate-progress {
          animation: progress 5s linear forwards;
        }
      `}</style>
    </section>
  )
}

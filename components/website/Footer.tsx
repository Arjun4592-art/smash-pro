import Link from 'next/link'
import {
  InstagramIcon,
  TwitterIcon,
  FacebookIcon,
  YoutubeIcon,
  PhoneIcon,
  MailIcon,
  MapPinIcon,
  TruckIcon,
  ShieldIcon,
  RefreshIcon,
  HeartIcon,
} from '@/components/ui/Icons'
import {
  SITE_NAME,
  SPORTS,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  FREE_SHIPPING_THRESHOLD,
} from '@/lib/constants'
import { formatCurrency } from '@/lib/utils'

const QUICK_LINKS = [
  { label: 'All Products', href: '/shop' },
  { label: 'New Arrivals', href: '/shop?badge=NEW' },
  { label: 'Best Sellers', href: '/shop?badge=BESTSELLER' },
  { label: 'Sale', href: '/shop?badge=SALE' },
  { label: 'My Orders', href: '/orders' },
  { label: 'My Account', href: '/login' },
  { label: 'Track Order', href: '/orders' },
  { label: 'Gift Cards', href: '/gift-cards' },
]

const POLICY_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Shipping Policy', href: '/shipping' },
  { label: 'Return Policy', href: '/returns' },
]

const TRUST_BADGES = [
  {
    icon: <TruckIcon size={22} />,
    title: `Free Shipping`,
    subtitle: `On orders above ${formatCurrency(FREE_SHIPPING_THRESHOLD)}`,
  },
  {
    icon: <ShieldIcon size={22} />,
    title: '100% Authentic',
    subtitle: 'Genuine products only',
  },
  {
    icon: <RefreshIcon size={22} />,
    title: 'Easy Returns',
    subtitle: '7-day hassle-free returns',
  },
  {
    icon: <HeartIcon size={22} />,
    title: 'Expert Support',
    subtitle: 'By sports enthusiasts',
  },
]

const SOCIAL_LINKS = [
  {
    icon: <InstagramIcon size={18} />,
    href: 'https://instagram.com/apexsport',
    label: 'Instagram',
  },
  {
    icon: <FacebookIcon size={18} />,
    href: 'https://facebook.com/apexsport',
    label: 'Facebook',
  },
  {
    icon: <TwitterIcon size={18} />,
    href: 'https://twitter.com/apexsport',
    label: 'Twitter',
  },
  {
    icon: <YoutubeIcon size={18} />,
    href: 'https://youtube.com/apexsport',
    label: 'YouTube',
  },
]

export default function Footer() {
  return (
    <footer className='bg-[#2C2C3E]'>
      {/* ── Trust Badges Strip ── */}
      <div className='border-b border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          <div className='grid grid-cols-2 lg:grid-cols-4 gap-6'>
            {TRUST_BADGES.map((badge) => (
              <div key={badge.title} className='flex items-center gap-3 group'>
                <div className='w-11 h-11 rounded-xl bg-[#E8553A]/15 text-[#E8553A] flex items-center justify-center shrink-0 group-hover:bg-[#E8553A] group-hover:text-white transition-all duration-200'>
                  {badge.icon}
                </div>
                <div>
                  <p className='text-sm font-semibold text-white font-montserrat'>
                    {badge.title}
                  </p>
                  <p className='text-xs text-gray-400 font-lato mt-0.5'>
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA Strip ── */}
      <div className='bg-[#E8553A]'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div>
            <p className='font-montserrat font-black text-white text-lg'>
              Get 10% off your first order!
            </p>
            <p className='text-white/80 text-sm font-lato mt-0.5'>
              Join 50,000+ athletes already shopping with us
            </p>
          </div>
          <Link
            href='/register'
            className='bg-white text-[#E8553A] font-montserrat font-bold text-sm px-7 py-3 rounded-full hover:bg-gray-100 transition-colors whitespace-nowrap shadow-lg'
          >
            Create Free Account →
          </Link>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14'>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10'>
          {/* ── Brand Column ── */}
          <div className='lg:col-span-1'>
            {/* Logo */}
            <Link href='/' className='flex items-center gap-2.5 mb-5 group'>
              <div className='w-9 h-9 bg-[#E8553A] rounded-xl flex items-center justify-center shadow-md group-hover:scale-105 transition-transform'>
                <span className='text-white font-montserrat font-black text-base'>
                  A
                </span>
              </div>
              <div className='flex flex-col leading-none'>
                <span className='font-montserrat font-black text-xl text-white tracking-tight'>
                  {SITE_NAME}
                </span>
                <span className='text-[10px] text-[#E8553A] font-lato font-medium tracking-widest uppercase'>
                  Sports Store
                </span>
              </div>
            </Link>

            <p className='text-sm text-gray-400 font-lato leading-relaxed mb-6'>
              Premium sports equipment for every athlete. From beginners to
              professionals — we have the gear you need to perform at your
              absolute best.
            </p>

            {/* Social Icons */}
            <div className='flex items-center gap-2.5 mb-6'>
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target='_blank'
                  rel='noopener noreferrer'
                  aria-label={social.label}
                  className='w-9 h-9 rounded-xl bg-white/10 hover:bg-[#E8553A] flex items-center justify-center text-gray-400 hover:text-white transition-all duration-200'
                >
                  {social.icon}
                </a>
              ))}
            </div>

            {/* App badges */}
            <div className='flex flex-col gap-2'>
              <p className='text-xs text-gray-500 font-lato uppercase tracking-wider'>
                Download App
              </p>
              <div className='flex gap-2'>
                <div className='px-3 py-1.5 bg-white/10 rounded-lg text-xs text-gray-300 font-lato border border-white/10 hover:border-[#E8553A]/50 transition-colors cursor-pointer'>
                  🍎 App Store
                </div>
                <div className='px-3 py-1.5 bg-white/10 rounded-lg text-xs text-gray-300 font-lato border border-white/10 hover:border-[#E8553A]/50 transition-colors cursor-pointer'>
                  🤖 Play Store
                </div>
              </div>
            </div>
          </div>

          {/* ── Sports Column ── */}
          <div>
            <h4 className='font-montserrat font-bold text-sm uppercase tracking-wider text-white mb-5'>
              Shop by Sport
            </h4>
            <ul className='space-y-2.5'>
              {SPORTS.map((sport) => (
                <li key={sport.slug}>
                  <Link
                    href={`/shop?sport=${sport.slug}`}
                    className='flex items-center gap-2.5 text-sm text-gray-400 hover:text-[#E8553A] transition-colors font-lato group'
                  >
                    <span className='text-base group-hover:scale-110 transition-transform inline-block'>
                      {sport.icon}
                    </span>
                    <span>{sport.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Quick Links Column ── */}
          <div>
            <h4 className='font-montserrat font-bold text-sm uppercase tracking-wider text-white mb-5'>
              Quick Links
            </h4>
            <ul className='space-y-2.5'>
              {QUICK_LINKS.map((link) => (
                <li key={link.href + link.label}>
                  <Link
                    href={link.href}
                    className='text-sm text-gray-400 hover:text-[#E8553A] transition-colors font-lato flex items-center gap-1.5 group'
                  >
                    <span className='w-1 h-1 rounded-full bg-gray-600 group-hover:bg-[#E8553A] transition-colors shrink-0' />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* ── Contact + Newsletter Column ── */}
          <div>
            <h4 className='font-montserrat font-bold text-sm uppercase tracking-wider text-white mb-5'>
              Contact Us
            </h4>

            <ul className='space-y-3.5 mb-7'>
              <li className='flex items-start gap-3'>
                <MapPinIcon
                  size={17}
                  className='text-[#E8553A] shrink-0 mt-0.5'
                />
                <span className='text-sm text-gray-400 font-lato leading-relaxed'>
                  42 Sport Complex, MG Road,
                  <br />
                  Bengaluru, Karnataka 560001
                </span>
              </li>
              <li className='flex items-center gap-3'>
                <PhoneIcon size={17} className='text-[#E8553A] shrink-0' />
                <a
                  href={`tel:${CONTACT_PHONE}`}
                  className='text-sm text-gray-400 hover:text-[#E8553A] transition-colors font-lato'
                >
                  {CONTACT_PHONE}
                </a>
              </li>
              <li className='flex items-center gap-3'>
                <MailIcon size={17} className='text-[#E8553A] shrink-0' />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className='text-sm text-gray-400 hover:text-[#E8553A] transition-colors font-lato'
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
            </ul>

            {/* Newsletter */}
            <div>
              <p className='text-sm font-bold text-white mb-1 font-montserrat'>
                Stay Updated
              </p>
              <p className='text-xs text-gray-500 font-lato mb-3'>
                Get deals, new arrivals & tips
              </p>
              <div className='flex gap-2'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='flex-1 bg-white/10 border border-white/15 rounded-xl px-3 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-[#E8553A] transition-colors font-lato min-w-0'
                />
                <button className='bg-[#E8553A] hover:bg-[#D4441F] text-white text-sm font-bold px-4 py-2.5 rounded-xl transition-colors font-montserrat whitespace-nowrap'>
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Bar ── */}
      <div className='border-t border-white/10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5'>
          <div className='flex flex-col md:flex-row items-center justify-between gap-4'>
            {/* Copyright */}
            <p className='text-xs text-gray-500 font-lato text-center md:text-left'>
              © {new Date().getFullYear()}{' '}
              <span className='text-gray-400 font-semibold'>{SITE_NAME}</span>.
              All rights reserved. Made with ❤️ for athletes.
            </p>

            {/* Policy links */}
            <div className='flex items-center gap-4 flex-wrap justify-center'>
              {POLICY_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className='text-xs text-gray-500 hover:text-gray-300 transition-colors font-lato'
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Payment methods */}
            <div className='flex items-center gap-2'>
              {['UPI', 'Visa', 'MC', 'RuPay', 'EMI'].map((method) => (
                <span
                  key={method}
                  className='px-2.5 py-1 bg-white/10 rounded-lg text-[10px] text-gray-400 font-montserrat font-bold tracking-wide border border-white/10'
                >
                  {method}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

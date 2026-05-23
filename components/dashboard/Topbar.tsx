'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const BREADCRUMB_MAP: Record<string, string> = {
  '/dashboard': 'Overview',
  '/dashboard/orders': 'Orders',
  '/dashboard/products': 'Products',
  '/dashboard/products/new': 'Add Product',
  '/dashboard/categories': 'Categories',
  '/dashboard/inventory': 'Inventory',
  '/dashboard/customers': 'Customers',
  '/dashboard/sales': 'Sales',
  '/dashboard/discounts': 'Discounts',
  '/dashboard/discounts/add': 'Add Discount',
  '/dashboard/seo': 'SEO',
  '/dashboard/settings': 'Settings',
  '/dashboard/settings/billing': 'Billing',
  '/dashboard/settings/shipping': 'Shipping',
  '/dashboard/settings/notifications': 'Notifications',
}

const NOTIFICATIONS = [
  {
    id: 1,
    text: 'New order #AS-482910 received',
    time: '2 min ago',
    unread: true,
  },
  {
    id: 2,
    text: 'Low stock: Football Boots (3 left)',
    time: '15 min ago',
    unread: true,
  },
  {
    id: 3,
    text: 'Payment confirmed for #AS-482908',
    time: '1h ago',
    unread: false,
  },
  { id: 4, text: 'New customer registered', time: '2h ago', unread: false },
]

export default function Topbar() {
  const pathname = usePathname()
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)

  const pageTitle = BREADCRUMB_MAP[pathname] ?? 'Dashboard'
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length

  // Build breadcrumbs
  const segments = pathname.split('/').filter(Boolean)
  const breadcrumbs = segments.map((seg, i) => {
    const href = '/' + segments.slice(0, i + 1).join('/')
    return {
      label: BREADCRUMB_MAP[href] ?? seg.charAt(0).toUpperCase() + seg.slice(1),
      href,
    }
  })

  return (
    <header className='h-14 bg-white border-b border-[#E1E3E5] flex items-center justify-between px-6 shrink-0 relative z-20'>
      {/* Left — breadcrumbs */}
      <div className='flex items-center gap-1.5 text-[13px] min-w-0'>
        {breadcrumbs.map((crumb, i) => (
          <div key={crumb.href} className='flex items-center gap-1.5 min-w-0'>
            {i > 0 && <span className='text-[#8C9196] text-[11px]'>/</span>}
            {i === breadcrumbs.length - 1 ? (
              <span className='font-semibold text-[#202223] truncate'>
                {crumb.label}
              </span>
            ) : (
              <Link
                href={crumb.href}
                className='text-[#6D7175] hover:text-[#202223] no-underline transition-colors truncate'
              >
                {crumb.label}
              </Link>
            )}
          </div>
        ))}
      </div>

      {/* Right — actions */}
      <div className='flex items-center gap-1 shrink-0'>
        {/* View store */}
        <Link
          href='/'
          target='_blank'
          className='hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-[12.5px] text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg no-underline transition-all'
        >
          <svg
            width='13'
            height='13'
            viewBox='0 0 24 24'
            fill='none'
            stroke='currentColor'
            strokeWidth='2'
          >
            <path d='M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6' />
            <polyline points='15 3 21 3 21 9' />
            <line x1='10' y1='14' x2='21' y2='3' />
          </svg>
          View Store
        </Link>

        {/* Notifications */}
        <div className='relative'>
          <button
            onClick={() => {
              setShowNotifications(!showNotifications)
              setShowProfile(false)
            }}
            className='relative w-8 h-8 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg transition-all bg-transparent border-none cursor-pointer'
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
            >
              <path d='M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9' />
              <path d='M13.73 21a2 2 0 01-3.46 0' />
            </svg>
            {unreadCount > 0 && (
              <span className='absolute top-1 right-1 w-3.5 h-3.5 bg-[#D82C0D] text-white text-[8px] font-bold rounded-full flex items-center justify-center leading-none'>
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notifications dropdown */}
          {showNotifications && (
            <div className='absolute right-0 top-full mt-2 w-[320px] bg-white border border-[#E1E3E5] rounded-xl shadow-lg overflow-hidden z-50'>
              <div className='flex items-center justify-between px-4 py-3 border-b border-[#E1E3E5]'>
                <span className='font-sora text-[13px] font-semibold text-[#202223]'>
                  Notifications
                </span>
                <button className='text-[12px] text-[#008060] hover:text-[#006e52] bg-transparent border-none cursor-pointer'>
                  Mark all read
                </button>
              </div>
              <div className='divide-y divide-[#F1F1F1] max-h-75 overflow-y-auto'>
                {NOTIFICATIONS.map((n) => (
                  <div
                    key={n.id}
                    className={`flex items-start gap-3 px-4 py-3 hover:bg-[#F6F6F7] transition-colors cursor-pointer ${
                      n.unread ? 'bg-[#F2F7F5]/50' : ''
                    }`}
                  >
                    <span
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        n.unread ? 'bg-[#008060]' : 'bg-transparent'
                      }`}
                    />
                    <div className='flex-1 min-w-0'>
                      <p className='text-[12.5px] text-[#202223] leading-snug'>
                        {n.text}
                      </p>
                      <p className='text-[11px] text-[#8C9196] mt-0.5'>
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className='px-4 py-2.5 border-t border-[#E1E3E5] text-center'>
                <Link
                  href='/dashboard/notifications'
                  className='text-[12.5px] text-[#008060] hover:text-[#006e52] no-underline font-medium'
                  onClick={() => setShowNotifications(false)}
                >
                  View all notifications
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className='relative'>
          <button
            onClick={() => {
              setShowProfile(!showProfile)
              setShowNotifications(false)
            }}
            className='flex items-center gap-2 px-2 py-1.5 hover:bg-[#F6F6F7] rounded-lg transition-all bg-transparent border-none cursor-pointer'
          >
            <div className='w-7 h-7 rounded-full bg-[#008060] flex items-center justify-center text-white text-[11px] font-bold shrink-0'>
              A
            </div>
            <span className='hidden sm:block text-[12.5px] font-medium text-[#202223]'>
              Admin
            </span>
            <svg
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#8C9196'
              strokeWidth='2.5'
            >
              <polyline points='6 9 12 15 18 9' />
            </svg>
          </button>

          {/* Profile dropdown */}
          {showProfile && (
            <div className='absolute right-0 top-full mt-2 w-50 bg-white border border-[#E1E3E5] rounded-xl shadow-lg overflow-hidden z-50'>
              <div className='px-4 py-3 border-b border-[#E1E3E5]'>
                <p className='text-[13px] font-semibold text-[#202223]'>
                  Admin User
                </p>
                <p className='text-[11.5px] text-[#8C9196] mt-0.5'>
                  admin@apexsport.in
                </p>
              </div>
              <div className='py-1'>
                {[
                  { label: 'My Profile', href: '/dashboard/settings' },
                  { label: 'Settings', href: '/dashboard/settings' },
                  { label: 'Billing', href: '/dashboard/settings/billing' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className='flex items-center px-4 py-2 text-[13px] text-[#202223] hover:bg-[#F6F6F7] no-underline transition-colors'
                    onClick={() => setShowProfile(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className='border-t border-[#E1E3E5] py-1'>
                <button
                  className='w-full flex items-center px-4 py-2 text-[13px] text-[#D82C0D] hover:bg-[#F6F6F7] transition-colors bg-transparent border-none cursor-pointer text-left'
                  onClick={() => {
                    setShowProfile(false)
                    // Add your logout logic here
                  }}
                >
                  Sign out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Click outside to close */}
      {(showNotifications || showProfile) && (
        <div
          className='fixed inset-0 z-40'
          onClick={() => {
            setShowNotifications(false)
            setShowProfile(false)
          }}
        />
      )}
    </header>
  )
}

'use client'

import { useAuthStore } from '@/store/authStore'
import { useCartStore } from '@/store/cartStore'
import { orders } from '@/lib/mockData'
import { formatCurrency, formatDate, getOrderStatusColor } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  UserIcon,
  PackageIcon,
  ChevronRightIcon,
  MapPinIcon,
  HeartIcon,
  ShieldIcon,
} from '@/components/ui/Icons'

const PROFILE_TABS = [
  { id: 'overview', label: 'Overview', icon: '⊞' },
  { id: 'orders', label: 'My Orders', icon: '📦' },
  { id: 'addresses', label: 'Addresses', icon: '📍' },
  { id: 'wishlist', label: 'Wishlist', icon: '❤️' },
  { id: 'security', label: 'Security', icon: '🔒' },
]

export default function ProfilePage() {
  const { user, logout } = useAuthStore()
  const clearCart = useCartStore((s) => s.clearCart)
  const router = useRouter()

  const handleLogout = () => {
    logout()
    clearCart()
    // Clear cookie
    document.cookie =
      'apex-auth=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT'
    router.push('/')
  }

  if (!user) return null

  const userOrders = orders.filter((o) => o.customerName === user.name)
  const totalSpent = userOrders.reduce((s, o) => s + o.total, 0)

  return (
    <div className='min-h-screen bg-[#F2F4F7]'>
      {/* Header */}
      <div className='bg-[#0A1F44] py-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-2 text-white/60 text-sm font-lato mb-4'>
            <Link href='/' className='hover:text-white'>
              Home
            </Link>
            <ChevronRightIcon size={14} />
            <span className='text-white'>My Profile</span>
          </div>
          <div className='flex items-center gap-4'>
            {/* Avatar */}
            <div className='w-16 h-16 bg-[#E8553A] rounded-2xl flex items-center justify-center text-white font-montserrat font-black text-2xl shadow-lg'>
              {user.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <h1 className='font-montserrat font-black text-2xl text-white'>
                {user.name}
              </h1>
              <p className='text-white/60 font-lato text-sm'>{user.email}</p>
              <span className='inline-block mt-1 px-3 py-0.5 bg-[#E8553A]/20 text-[#E8553A] text-xs font-semibold rounded-full font-montserrat capitalize'>
                {user.role}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
          {/* ── Sidebar ── */}
          <div className='space-y-4'>
            {/* Stats */}
            <div className='bg-white rounded-2xl border border-gray-100 p-5'>
              <div className='grid grid-cols-2 gap-4'>
                <div className='text-center p-3 bg-[#0A1F44]/5 rounded-xl'>
                  <p className='font-montserrat font-black text-2xl text-[#0A1F44]'>
                    {userOrders.length}
                  </p>
                  <p className='text-xs text-gray-400 font-lato mt-0.5'>
                    Orders
                  </p>
                </div>
                <div className='text-center p-3 bg-[#E8553A]/5 rounded-xl'>
                  <p className='font-montserrat font-black text-lg text-[#E8553A]'>
                    {formatCurrency(totalSpent)}
                  </p>
                  <p className='text-xs text-gray-400 font-lato mt-0.5'>
                    Spent
                  </p>
                </div>
              </div>
            </div>

            {/* Nav */}
            <div className='bg-white rounded-2xl border border-gray-100 overflow-hidden'>
              {PROFILE_TABS.map((tab, i) => (
                <a
                  key={tab.id}
                  href={`#${tab.id}`}
                  className={`flex items-center gap-3 px-5 py-3.5 text-sm font-lato text-[#0A1F44] hover:bg-gray-50 hover:text-[#E8553A] transition-colors ${
                    i > 0 ? 'border-t border-gray-50' : ''
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span className='font-medium'>{tab.label}</span>
                  <ChevronRightIcon
                    size={14}
                    className='ml-auto text-gray-300'
                  />
                </a>
              ))}
            </div>

            {/* Logout */}
            <button
              onClick={handleLogout}
              className='w-full py-3 bg-white border border-red-200 text-red-500 rounded-2xl text-sm font-semibold font-montserrat hover:bg-red-50 transition-colors'
            >
              Sign Out
            </button>
          </div>

          {/* ── Main Content ── */}
          <div className='lg:col-span-3 space-y-6'>
            {/* Overview */}
            <div
              id='overview'
              className='bg-white rounded-2xl border border-gray-100 p-6'
            >
              <h2 className='font-montserrat font-black text-xl text-[#0A1F44] mb-5'>
                Account Overview
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6'>
                {[
                  {
                    icon: <PackageIcon size={20} />,
                    label: 'Total Orders',
                    value: userOrders.length,
                    color: 'text-[#0A1F44]',
                    bg: 'bg-[#0A1F44]/5',
                  },
                  {
                    icon: <HeartIcon size={20} />,
                    label: 'Wishlist Items',
                    value: 0,
                    color: 'text-[#E8553A]',
                    bg: 'bg-[#E8553A]/5',
                  },
                  {
                    icon: <MapPinIcon size={20} />,
                    label: 'Saved Addresses',
                    value: 1,
                    color: 'text-green-600',
                    bg: 'bg-green-50',
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className={`${stat.bg} rounded-xl p-4 flex items-center gap-3`}
                  >
                    <span className={stat.color}>{stat.icon}</span>
                    <div>
                      <p className='font-montserrat font-black text-xl text-[#0A1F44]'>
                        {stat.value}
                      </p>
                      <p className='text-xs text-gray-400 font-lato'>
                        {stat.label}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Personal info */}
              <div className='border border-gray-100 rounded-xl p-5'>
                <div className='flex items-center justify-between mb-4'>
                  <h3 className='font-montserrat font-bold text-[#0A1F44]'>
                    Personal Information
                  </h3>
                  <button className='text-xs text-[#E8553A] font-semibold font-lato hover:underline'>
                    Edit
                  </button>
                </div>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                  {[
                    { label: 'Full Name', value: user.name },
                    { label: 'Email', value: user.email },
                    { label: 'Phone', value: 'Not added' },
                    {
                      label: 'Member Since',
                      value: formatDate(user.createdAt),
                    },
                  ].map((info) => (
                    <div key={info.label}>
                      <p className='text-xs text-gray-400 font-lato uppercase tracking-wider mb-1'>
                        {info.label}
                      </p>
                      <p className='font-lato font-semibold text-[#0A1F44] text-sm'>
                        {info.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Orders */}
            <div
              id='orders'
              className='bg-white rounded-2xl border border-gray-100 p-6'
            >
              <div className='flex items-center justify-between mb-5'>
                <h2 className='font-montserrat font-black text-xl text-[#0A1F44]'>
                  My Orders
                </h2>
                <Link
                  href='/orders'
                  className='text-sm text-[#E8553A] font-semibold font-lato hover:underline'
                >
                  View All →
                </Link>
              </div>

              {userOrders.length === 0 ? (
                <div className='text-center py-10'>
                  <PackageIcon
                    size={40}
                    className='text-gray-200 mx-auto mb-3'
                  />
                  <p className='font-montserrat font-bold text-[#0A1F44] mb-1'>
                    No orders yet
                  </p>
                  <p className='text-gray-400 font-lato text-sm mb-4'>
                    Start shopping to see your orders here
                  </p>
                  <Link
                    href='/shop'
                    className='bg-[#E8553A] text-white font-montserrat font-bold px-5 py-2 rounded-full text-sm hover:bg-[#D4441F] transition-colors'
                  >
                    Shop Now
                  </Link>
                </div>
              ) : (
                <div className='space-y-3'>
                  {userOrders.slice(0, 3).map((order) => (
                    <div
                      key={order.id}
                      className='flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-[#E8553A]/20 transition-colors'
                    >
                      <div className='flex items-center gap-3'>
                        <div className='w-10 h-10 bg-[#0A1F44]/5 rounded-xl flex items-center justify-center'>
                          <PackageIcon size={18} className='text-[#0A1F44]' />
                        </div>
                        <div>
                          <p className='font-montserrat font-bold text-sm text-[#0A1F44]'>
                            #{order.orderNumber}
                          </p>
                          <p className='text-xs text-gray-400 font-lato'>
                            {formatDate(order.createdAt)} · {order.items.length}{' '}
                            item
                            {order.items.length > 1 ? 's' : ''}
                          </p>
                        </div>
                      </div>
                      <div className='text-right flex items-center gap-3'>
                        <div>
                          <p className='font-montserrat font-black text-sm text-[#0A1F44]'>
                            {formatCurrency(order.total)}
                          </p>
                          <span
                            className={`text-xs font-bold px-2 py-0.5 rounded-full font-montserrat ${getOrderStatusColor(order.status)}`}
                          >
                            {order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)}
                          </span>
                        </div>
                        <ChevronRightIcon size={16} className='text-gray-300' />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Addresses */}
            <div
              id='addresses'
              className='bg-white rounded-2xl border border-gray-100 p-6'
            >
              <div className='flex items-center justify-between mb-5'>
                <h2 className='font-montserrat font-black text-xl text-[#0A1F44]'>
                  Saved Addresses
                </h2>
                <button className='text-sm text-[#E8553A] font-semibold font-lato hover:underline'>
                  + Add New
                </button>
              </div>

              <div className='border border-gray-100 rounded-xl p-4 relative'>
                <span className='absolute top-3 right-3 text-xs bg-[#0A1F44] text-white px-2 py-0.5 rounded-full font-montserrat font-bold'>
                  Default
                </span>
                <div className='flex items-start gap-3'>
                  <MapPinIcon size={18} className='text-[#E8553A] mt-0.5' />
                  <div>
                    <p className='font-montserrat font-bold text-[#0A1F44] text-sm'>
                      {user.name}
                    </p>
                    <p className='font-lato text-gray-500 text-sm mt-1'>
                      42 MG Road, Bengaluru
                      <br />
                      Karnataka 560001, India
                    </p>
                    <div className='flex gap-3 mt-3'>
                      <button className='text-xs text-[#E8553A] font-semibold font-lato hover:underline'>
                        Edit
                      </button>
                      <button className='text-xs text-gray-400 font-semibold font-lato hover:underline'>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Security */}
            <div
              id='security'
              className='bg-white rounded-2xl border border-gray-100 p-6'
            >
              <h2 className='font-montserrat font-black text-xl text-[#0A1F44] mb-5'>
                Security
              </h2>
              <div className='space-y-3'>
                {[
                  {
                    label: 'Change Password',
                    desc: 'Update your password regularly',
                    icon: '🔑',
                  },
                  {
                    label: 'Two-Factor Auth',
                    desc: 'Add an extra layer of security',
                    icon: '📱',
                  },
                  {
                    label: 'Login History',
                    desc: 'See recent login activity',
                    icon: '📋',
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className='flex items-center justify-between p-4 border border-gray-100 rounded-xl hover:border-[#E8553A]/20 cursor-pointer transition-colors group'
                  >
                    <div className='flex items-center gap-3'>
                      <span className='text-xl'>{item.icon}</span>
                      <div>
                        <p className='font-montserrat font-bold text-sm text-[#0A1F44] group-hover:text-[#E8553A] transition-colors'>
                          {item.label}
                        </p>
                        <p className='text-xs text-gray-400 font-lato'>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                    <ChevronRightIcon size={16} className='text-gray-300' />
                  </div>
                ))}
              </div>

              <div className='mt-5 p-4 bg-red-50 border border-red-100 rounded-xl'>
                <div className='flex items-center justify-between'>
                  <div>
                    <p className='font-montserrat font-bold text-red-600 text-sm'>
                      Delete Account
                    </p>
                    <p className='text-xs text-red-400 font-lato mt-0.5'>
                      This action is irreversible
                    </p>
                  </div>
                  <button className='text-xs text-red-500 font-semibold font-lato hover:underline'>
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

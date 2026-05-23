'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts'

// ─── Mock Data ───────────────────────────────────────────────────
const salesData = [
  { date: 'May 1', revenue: 12400, orders: 24 },
  { date: 'May 5', revenue: 18200, orders: 31 },
  { date: 'May 10', revenue: 15800, orders: 28 },
  { date: 'May 15', revenue: 24600, orders: 42 },
  { date: 'May 20', revenue: 21000, orders: 38 },
  { date: 'May 25', revenue: 28400, orders: 51 },
  { date: 'May 30', revenue: 32000, orders: 58 },
]

const topProducts = [
  {
    name: 'Pro Strike Football Boots',
    sport: 'Football',
    sold: 142,
    revenue: 709958,
  },
  {
    name: 'Championship Cricket Bat',
    sport: 'Cricket',
    sold: 98,
    revenue: 342902,
  },
  { name: 'Speed Runner Pro X', sport: 'Running', sold: 87, revenue: 695913 },
  {
    name: 'Tennis Racket Elite 300',
    sport: 'Tennis',
    sold: 64,
    revenue: 383936,
  },
  { name: 'Boxing Gloves Pro', sport: 'Boxing', sold: 52, revenue: 129948 },
]

const recentOrders = [
  {
    id: 'AS-482910',
    customer: 'Rahul Sharma',
    email: 'rahul@gmail.com',
    amount: 4999,
    status: 'delivered',
    date: '2 min ago',
    items: 2,
  },
  {
    id: 'AS-482909',
    customer: 'Priya Mehta',
    email: 'priya@gmail.com',
    amount: 12499,
    status: 'processing',
    date: '15 min ago',
    items: 3,
  },
  {
    id: 'AS-482908',
    customer: 'Arjun Singh',
    email: 'arjun@gmail.com',
    amount: 3499,
    status: 'shipped',
    date: '1h ago',
    items: 1,
  },
  {
    id: 'AS-482907',
    customer: 'Sneha Patel',
    email: 'sneha@gmail.com',
    amount: 8999,
    status: 'pending',
    date: '2h ago',
    items: 4,
  },
  {
    id: 'AS-482906',
    customer: 'Vikram Nair',
    email: 'vikram@gmail.com',
    amount: 2199,
    status: 'cancelled',
    date: '3h ago',
    items: 1,
  },
]

const sportBreakdown = [
  { sport: 'Football', orders: 312, color: '#008060' },
  { sport: 'Cricket', orders: 248, color: '#2C6ECB' },
  { sport: 'Running', orders: 198, color: '#FFC453' },
  { sport: 'Tennis', orders: 156, color: '#8B5CF6' },
  { sport: 'Boxing', orders: 98, color: '#D82C0D' },
]

// ─── Helpers ─────────────────────────────────────────────────────
const STATUS_STYLES: Record<string, string> = {
  delivered: 'bg-[#008060]/10 text-[#008060]',
  processing: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
  shipped: 'bg-purple-100 text-purple-700',
  pending: 'bg-[#FFC453]/20 text-[#916A00]',
  cancelled: 'bg-[#D82C0D]/10 text-[#D82C0D]',
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

// ─── Sub Components ───────────────────────────────────────────────
function StatCard({
  title,
  value,
  change,
  positive,
  icon,
  subtitle,
}: {
  title: string
  value: string
  change: string
  positive: boolean
  icon: string
  subtitle?: string
}) {
  return (
    <div className='bg-white border border-[#E1E3E5] rounded-xl p-5 hover:shadow-md transition-shadow'>
      <div className='flex items-start justify-between mb-4'>
        <div className='w-9 h-9 bg-[#F6F6F7] rounded-lg flex items-center justify-center text-lg'>
          {icon}
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[12px] font-medium px-2 py-0.5 rounded-full ${
            positive
              ? 'bg-[#008060]/10 text-[#008060]'
              : 'bg-[#D82C0D]/10 text-[#D82C0D]'
          }`}
        >
          {positive ? '↑' : '↓'} {change}
        </span>
      </div>
      <p className='text-[12.5px] text-[#6D7175] mb-1'>{title}</p>
      <p className='font-sora text-[24px] font-bold text-[#202223] leading-tight'>
        {value}
      </p>
      {subtitle && (
        <p className='text-[11.5px] text-[#8C9196] mt-1'>{subtitle}</p>
      )}
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────
export default function DashboardPage() {
  const [dateRange, setDateRange] = useState('last30')

  return (
    <div className='space-y-6'>
      {/* Page header */}
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Overview
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            Welcome back! Here's what's happening with your store.
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className='px-3 py-2 bg-white border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            <option value='today'>Today</option>
            <option value='last7'>Last 7 days</option>
            <option value='last30'>Last 30 days</option>
            <option value='last90'>Last 90 days</option>
            <option value='thisyear'>This year</option>
          </select>
          <button className='px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg transition-colors'>
            Export
          </button>
        </div>
      </div>

      {/* Stats grid */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4'>
        <StatCard
          title='Total Revenue'
          value='₹8,42,340'
          change='12.5%'
          positive={true}
          icon='💰'
          subtitle='vs last month'
        />
        <StatCard
          title='Total Orders'
          value='1,284'
          change='8.2%'
          positive={true}
          icon='📦'
          subtitle='vs last month'
        />
        <StatCard
          title='Total Customers'
          value='3,920'
          change='5.1%'
          positive={true}
          icon='👥'
          subtitle='vs last month'
        />
        <StatCard
          title='Avg Order Value'
          value='₹2,340'
          change='3.4%'
          positive={false}
          icon='📊'
          subtitle='vs last month'
        />
      </div>

      {/* Charts row */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
        {/* Revenue chart */}
        <div className='xl:col-span-2 bg-white border border-[#E1E3E5] rounded-xl p-5'>
          <div className='flex items-center justify-between mb-5'>
            <div>
              <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
                Revenue Overview
              </h2>
              <p className='text-[12px] text-[#6D7175] mt-0.5'>
                Daily revenue for the selected period
              </p>
            </div>
            <div className='flex items-center gap-3 text-[12px] text-[#6D7175]'>
              <span className='flex items-center gap-1.5'>
                <span className='w-2.5 h-2.5 rounded-full bg-[#008060] inline-block' />
                Revenue
              </span>
            </div>
          </div>
          <ResponsiveContainer width='100%' height={220}>
            <AreaChart data={salesData}>
              <defs>
                <linearGradient id='revenueGrad' x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor='#008060' stopOpacity={0.12} />
                  <stop offset='95%' stopColor='#008060' stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray='3 3'
                stroke='#F1F1F1'
                vertical={false}
              />
              <XAxis
                dataKey='date'
                tick={{ fontSize: 11, fill: '#8C9196' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: '#8C9196' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}K`}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #E1E3E5',
                  borderRadius: '8px',
                  fontSize: '12px',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                }}
                formatter={(value) => [
                  (value as number).toLocaleString(),
                  'Revenue',
                ]}
              />
              <Area
                type='monotone'
                dataKey='revenue'
                stroke='#008060'
                strokeWidth={2}
                fill='url(#revenueGrad)'
                dot={false}
                activeDot={{ r: 4, fill: '#008060' }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Orders by sport */}
        <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
          <div className='mb-5'>
            <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
              Orders by Sport
            </h2>
            <p className='text-[12px] text-[#6D7175] mt-0.5'>
              Category breakdown
            </p>
          </div>
          <ResponsiveContainer width='100%' height={160}>
            <BarChart data={sportBreakdown} layout='vertical'>
              <XAxis type='number' hide />
              <YAxis
                type='category'
                dataKey='sport'
                tick={{ fontSize: 12, fill: '#6D7175' }}
                axisLine={false}
                tickLine={false}
                width={60}
              />
              <Tooltip
                contentStyle={{
                  background: '#fff',
                  border: '1px solid #E1E3E5',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value) => [
                  (value as number).toLocaleString(),
                  'Orders',
                ]}
              />
              <Bar
                dataKey='orders'
                fill='#008060'
                radius={[0, 4, 4, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>

          <div className='mt-4 space-y-2.5 pt-4 border-t border-[#E1E3E5]'>
            {sportBreakdown.map((s) => (
              <div key={s.sport} className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <span
                    className='w-2 h-2 rounded-full shrink-0'
                    style={{ background: s.color }}
                  />
                  <span className='text-[12.5px] text-[#202223]'>
                    {s.sport}
                  </span>
                </div>
                <span className='text-[12.5px] font-medium text-[#202223]'>
                  {s.orders}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom row */}
      <div className='grid grid-cols-1 xl:grid-cols-3 gap-4'>
        {/* Recent orders */}
        <div className='xl:col-span-2 bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
          <div className='flex items-center justify-between px-5 py-4 border-b border-[#E1E3E5]'>
            <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
              Recent Orders
            </h2>
            <Link
              href='/dashboard/orders'
              className='text-[12.5px] text-[#008060] hover:text-[#006e52] no-underline font-medium transition-colors'
            >
              View all →
            </Link>
          </div>
          <div className='divide-y divide-[#F1F1F1]'>
            {recentOrders.map((order) => (
              <div
                key={order.id}
                className='flex items-center gap-4 px-5 py-3.5 hover:bg-[#F6F6F7] transition-colors'
              >
                {/* Avatar */}
                <div className='w-8 h-8 rounded-full bg-[#008060]/10 flex items-center justify-center text-[#008060] text-[12px] font-bold shrink-0'>
                  {order.customer.charAt(0)}
                </div>

                {/* Info */}
                <div className='flex-1 min-w-0'>
                  <p className='text-[13px] font-medium text-[#202223] truncate'>
                    {order.customer}
                  </p>
                  <p className='text-[11.5px] text-[#8C9196] truncate'>
                    {order.id} · {order.items} item{order.items > 1 ? 's' : ''}
                  </p>
                </div>

                {/* Amount */}
                <div className='text-right shrink-0'>
                  <p className='text-[13px] font-semibold text-[#202223]'>
                    {formatCurrency(order.amount)}
                  </p>
                  <p className='text-[11px] text-[#8C9196]'>{order.date}</p>
                </div>

                {/* Status */}
                <span
                  className={`px-2.5 py-1 rounded-full text-[11px] font-medium capitalize shrink-0 ${
                    STATUS_STYLES[order.status]
                  }`}
                >
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Top products + Quick actions */}
        <div className='space-y-4'>
          {/* Quick actions */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
            <h2 className='font-sora text-[15px] font-semibold text-[#202223] mb-3'>
              Quick Actions
            </h2>
            <div className='grid grid-cols-2 gap-2'>
              {[
                {
                  label: 'Add Product',
                  href: '/dashboard/products/new',
                  icon: '➕',
                },
                { label: 'New Order', href: '/dashboard/orders', icon: '📦' },
                {
                  label: 'Add Customer',
                  href: '/dashboard/customers',
                  icon: '👤',
                },
                {
                  label: 'Add Discount',
                  href: '/dashboard/discounts/add',
                  icon: '🎟️',
                },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className='flex flex-col items-center gap-1.5 p-3 border border-[#E1E3E5] rounded-lg hover:bg-[#F6F6F7] hover:border-[#8C9196] transition-all no-underline text-center'
                >
                  <span className='text-xl'>{action.icon}</span>
                  <span className='text-[11.5px] font-medium text-[#202223]'>
                    {action.label}
                  </span>
                </Link>
              ))}
            </div>
          </div>

          {/* Top products */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
            <div className='flex items-center justify-between px-5 py-4 border-b border-[#E1E3E5]'>
              <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
                Top Products
              </h2>
              <Link
                href='/dashboard/products'
                className='text-[12.5px] text-[#008060] hover:text-[#006e52] no-underline font-medium transition-colors'
              >
                View all →
              </Link>
            </div>
            <div className='divide-y divide-[#F1F1F1]'>
              {topProducts.slice(0, 4).map((product, i) => (
                <div
                  key={product.name}
                  className='flex items-center gap-3 px-5 py-3 hover:bg-[#F6F6F7] transition-colors'
                >
                  <span className='text-[12px] font-bold text-[#8C9196] w-4 shrink-0'>
                    {i + 1}
                  </span>
                  <div className='flex-1 min-w-0'>
                    <p className='text-[12.5px] font-medium text-[#202223] truncate'>
                      {product.name}
                    </p>
                    <p className='text-[11px] text-[#8C9196]'>
                      {product.sold} sold
                    </p>
                  </div>
                  <p className='text-[12.5px] font-semibold text-[#202223] shrink-0'>
                    {formatCurrency(product.revenue)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Low stock alert */}
      <div className='bg-[#FFC453]/10 border border-[#FFC453]/30 rounded-xl p-4 flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <span className='text-xl'>⚠️</span>
          <div>
            <p className='text-[13px] font-semibold text-[#202223]'>
              Low Stock Alert
            </p>
            <p className='text-[12px] text-[#6D7175]'>
              8 products are running low on inventory. Restock soon to avoid
              missed sales.
            </p>
          </div>
        </div>
        <Link
          href='/dashboard/inventory'
          className='px-4 py-2 bg-white border border-[#E1E3E5] rounded-lg text-[12.5px] font-medium text-[#202223] no-underline hover:bg-[#F6F6F7] transition-colors shrink-0'
        >
          View Inventory
        </Link>
      </div>
    </div>
  )
}

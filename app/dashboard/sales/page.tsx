'use client'

import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts'

const Icons = {
  revenue: (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='12' y1='1' x2='12' y2='23' />
      <path d='M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6' />
    </svg>
  ),
  orders: (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z' />
      <line x1='3' y1='6' x2='21' y2='6' />
      <path d='M16 10a4 4 0 01-8 0' />
    </svg>
  ),
  customers: (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2' />
      <circle cx='9' cy='7' r='4' />
      <path d='M23 21v-2a4 4 0 00-3-3.87' />
      <path d='M16 3.13a4 4 0 010 7.75' />
    </svg>
  ),
  avgOrder: (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='18' y1='20' x2='18' y2='10' />
      <line x1='12' y1='20' x2='12' y2='4' />
      <line x1='6' y1='20' x2='6' y2='14' />
      <line x1='2' y1='20' x2='22' y2='20' />
    </svg>
  ),
  conversion: (
    <svg
      width='18'
      height='18'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='22 12 18 12 15 21 9 3 6 12 2 12' />
    </svg>
  ),
  arrowUp: (
    <svg
      width='10'
      height='10'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='18 15 12 9 6 15' />
    </svg>
  ),
  arrowDown: (
    <svg
      width='10'
      height='10'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='6 9 12 15 18 9' />
    </svg>
  ),
  download: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4' />
      <polyline points='7 10 12 15 17 10' />
      <line x1='12' y1='15' x2='12' y2='3' />
    </svg>
  ),
  calendar: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
      <line x1='16' y1='2' x2='16' y2='6' />
      <line x1='8' y1='2' x2='8' y2='6' />
      <line x1='3' y1='10' x2='21' y2='10' />
    </svg>
  ),
  trophy: (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M6 9H4.5a2.5 2.5 0 010-5H6' />
      <path d='M18 9h1.5a2.5 2.5 0 000-5H18' />
      <path d='M4 22h16' />
      <path d='M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22' />
      <path d='M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22' />
      <path d='M18 2H6v7a6 6 0 0012 0V2z' />
    </svg>
  ),
  map: (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polygon points='3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21' />
      <line x1='9' y1='3' x2='9' y2='18' />
      <line x1='15' y1='6' x2='15' y2='21' />
    </svg>
  ),
  live: (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='12' cy='12' r='2' />
      <path d='M16.24 7.76a6 6 0 010 8.49m-8.48-.01a6 6 0 010-8.49m11.31-2.82a10 10 0 010 14.14m-14.14 0a10 10 0 010-14.14' />
    </svg>
  ),
  report: (
    <svg
      width='16'
      height='16'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z' />
      <polyline points='14 2 14 8 20 8' />
      <line x1='16' y1='13' x2='8' y2='13' />
      <line x1='16' y1='17' x2='8' y2='17' />
      <polyline points='10 9 9 9 8 9' />
    </svg>
  ),
  user: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2' />
      <circle cx='12' cy='7' r='4' />
    </svg>
  ),
  cart: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <circle cx='9' cy='21' r='1' />
      <circle cx='20' cy='21' r='1' />
      <path d='M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6' />
    </svg>
  ),
  eye: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
      <circle cx='12' cy='12' r='3' />
    </svg>
  ),
}

const DAILY_DATA = [
  { label: 'May 1', revenue: 12400, orders: 24, customers: 18 },
  { label: 'May 5', revenue: 18200, orders: 31, customers: 24 },
  { label: 'May 10', revenue: 15800, orders: 28, customers: 21 },
  { label: 'May 15', revenue: 24600, orders: 42, customers: 35 },
  { label: 'May 20', revenue: 21000, orders: 38, customers: 29 },
  { label: 'May 25', revenue: 28400, orders: 51, customers: 42 },
  { label: 'May 30', revenue: 32000, orders: 58, customers: 48 },
]

const MONTHLY_DATA = [
  { label: 'Jan', revenue: 142000, orders: 248, customers: 186 },
  { label: 'Feb', revenue: 168000, orders: 291, customers: 214 },
  { label: 'Mar', revenue: 195000, orders: 334, customers: 256 },
  { label: 'Apr', revenue: 224000, orders: 388, customers: 298 },
  { label: 'May', revenue: 248000, orders: 421, customers: 334 },
]

const SPORT_DATA = [
  { name: 'Football', value: 312, color: '#008060' },
  { name: 'Cricket', value: 248, color: '#2C6ECB' },
  { name: 'Running', value: 198, color: '#FFC453' },
  { name: 'Tennis', value: 156, color: '#8B5CF6' },
  { name: 'Boxing', value: 98, color: '#D82C0D' },
  { name: 'Others', value: 88, color: '#8C9196' },
]

const TOP_PRODUCTS = [
  {
    rank: 1,
    name: 'Pro Strike Football Boots',
    sport: 'Football',
    sold: 142,
    revenue: 709958,
    growth: 12.4,
  },
  {
    rank: 2,
    name: 'Championship Cricket Bat',
    sport: 'Cricket',
    sold: 98,
    revenue: 342902,
    growth: 8.1,
  },
  {
    rank: 3,
    name: 'Speed Runner Pro X',
    sport: 'Running',
    sold: 87,
    revenue: 695913,
    growth: -2.3,
  },
  {
    rank: 4,
    name: 'Tennis Racket Elite 300',
    sport: 'Tennis',
    sold: 64,
    revenue: 383936,
    growth: 15.7,
  },
  {
    rank: 5,
    name: 'Boxing Gloves Pro 16oz',
    sport: 'Boxing',
    sold: 52,
    revenue: 129948,
    growth: 5.2,
  },
]

const TOP_CITIES = [
  { city: 'Mumbai', orders: 184, revenue: 821600, pct: 22 },
  { city: 'Delhi', orders: 156, revenue: 698400, pct: 18 },
  { city: 'Bangalore', orders: 132, revenue: 591200, pct: 15 },
  { city: 'Hyderabad', orders: 98, revenue: 438400, pct: 11 },
  { city: 'Chennai', orders: 87, revenue: 389400, pct: 10 },
  { city: 'Others', orders: 243, revenue: 1087800, pct: 24 },
]

const CHANNEL_DATA = [
  { label: 'Jan', website: 82000, pos: 38000, dashboard: 22000 },
  { label: 'Feb', website: 96000, pos: 44000, dashboard: 28000 },
  { label: 'Mar', website: 112000, pos: 51000, dashboard: 32000 },
  { label: 'Apr', website: 128000, pos: 58000, dashboard: 38000 },
  { label: 'May', website: 142000, pos: 64000, dashboard: 42000 },
]

const REPORTS_LIST = [
  {
    name: 'Sales Summary Report',
    description: 'Overview of total revenue, orders and avg order value',
    period: 'May 2025',
    size: '124 KB',
    type: 'PDF',
  },
  {
    name: 'Product Performance Report',
    description: 'Top and bottom performing products by revenue',
    period: 'May 2025',
    size: '256 KB',
    type: 'XLSX',
  },
  {
    name: 'Customer Acquisition Report',
    description: 'New vs returning customers breakdown',
    period: 'May 2025',
    size: '98 KB',
    type: 'PDF',
  },
  {
    name: 'Inventory Status Report',
    description: 'Current stock levels and low stock alerts',
    period: 'May 2025',
    size: '312 KB',
    type: 'XLSX',
  },
  {
    name: 'Channel Performance Report',
    description: 'Revenue split by website, POS and dashboard',
    period: 'Apr 2025',
    size: '88 KB',
    type: 'PDF',
  },
  {
    name: 'Geographic Sales Report',
    description: 'Sales breakdown by city and state',
    period: 'Apr 2025',
    size: '142 KB',
    type: 'XLSX',
  },
]

const LIVE_VISITORS = [
  {
    id: 1,
    page: '/shop/football',
    location: 'Mumbai',
    duration: '2m 14s',
    device: 'Mobile',
    action: 'Browsing',
  },
  {
    id: 2,
    page: '/shop/product/1',
    location: 'Delhi',
    duration: '4m 52s',
    device: 'Desktop',
    action: 'Shopping',
  },
  {
    id: 3,
    page: '/cart',
    location: 'Bangalore',
    duration: '1m 03s',
    device: 'Mobile',
    action: 'Checkout',
  },
  {
    id: 4,
    page: '/shop/cricket',
    location: 'Pune',
    duration: '0m 45s',
    device: 'Tablet',
    action: 'Browsing',
  },
  {
    id: 5,
    page: '/shop/product/3',
    location: 'Hyderabad',
    duration: '3m 21s',
    device: 'Desktop',
    action: 'Shopping',
  },
  {
    id: 6,
    page: '/',
    location: 'Chennai',
    duration: '0m 12s',
    device: 'Mobile',
    action: 'Browsing',
  },
  {
    id: 7,
    page: '/checkout',
    location: 'Kolkata',
    duration: '5m 40s',
    device: 'Desktop',
    action: 'Purchasing',
  },
]

function formatCurrency(n: number) {
  if (n >= 100000) return `₹${(n / 100000).toFixed(1)}L`
  if (n >= 1000) return `₹${(n / 1000).toFixed(0)}K`
  return `₹${n}`
}

function formatCurrencyFull(n: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(n)
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className='bg-white border border-[#E1E3E5] rounded-xl shadow-lg p-3 min-w-37.5'>
      <p className='text-[11.5px] font-semibold text-[#6D7175] mb-2'>{label}</p>
      {payload.map((entry: any) => (
        <div
          key={entry.dataKey}
          className='flex items-center justify-between gap-4'
        >
          <div className='flex items-center gap-1.5'>
            <span
              className='w-2 h-2 rounded-full'
              style={{ background: entry.color }}
            />
            <span className='text-[11.5px] text-[#6D7175] capitalize'>
              {entry.dataKey}
            </span>
          </div>
          <span className='text-[12px] font-semibold text-[#202223]'>
            {['revenue', 'website', 'pos', 'dashboard'].includes(entry.dataKey)
              ? formatCurrency(entry.value)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

function StatCard({
  title,
  value,
  change,
  icon,
  color,
}: {
  title: string
  value: string
  change: number
  icon: React.ReactNode
  color: string
}) {
  const isPos = change >= 0
  return (
    <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
      <div className='flex items-start justify-between mb-4'>
        <div
          className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}
        >
          {icon}
        </div>
        <span
          className={`inline-flex items-center gap-1 text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${isPos ? 'bg-[#008060]/10 text-[#008060]' : 'bg-[#D82C0D]/10 text-[#D82C0D]'}`}
        >
          {isPos ? Icons.arrowUp : Icons.arrowDown}
          {Math.abs(change)}%
        </span>
      </div>
      <p className='text-[12.5px] text-[#6D7175] mb-1'>{title}</p>
      <p className='font-sora text-[24px] font-bold text-[#202223] leading-tight'>
        {value}
      </p>
    </div>
  )
}

export default function DashboardSalesPage() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const view = searchParams.get('view') ?? 'overview'

  const [dateRange, setDateRange] = useState('last30')
  const [chartType, setChartType] = useState<'area' | 'bar' | 'line'>('area')
  const [chartMetric, setChartMetric] = useState<
    'revenue' | 'orders' | 'customers'
  >('revenue')
  const [liveCount, setLiveCount] = useState(7)

  useEffect(() => {
    if (view !== 'live') return
    const interval = setInterval(() => {
      setLiveCount((c) =>
        Math.max(3, Math.min(20, c + Math.floor(Math.random() * 3) - 1)),
      )
    }, 3000)
    return () => clearInterval(interval)
  }, [view])

  const chartData = dateRange === 'last30' ? DAILY_DATA : MONTHLY_DATA

  const TABS = [
    { id: 'overview', label: 'Overview' },
    { id: 'reports', label: 'Reports' },
    { id: 'live', label: 'Live View', isLive: true },
  ]

  const setTab = (id: string) => {
    if (id === 'overview') router.push('/dashboard/sales')
    else router.push(`/dashboard/sales?view=${id}`)
  }

  return (
    <div className='space-y-5'>
      {/* Header */}
      <div className='flex items-center justify-between flex-wrap gap-3'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Sales & Analytics
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            Track your store performance and growth
          </p>
        </div>
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1.5 px-3 py-2 border border-[#E1E3E5] bg-white rounded-lg text-[#6D7175]'>
            {Icons.calendar}
          </div>
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className='px-3 py-2 border border-[#E1E3E5] bg-white rounded-lg text-[13px] text-[#202223] outline-none cursor-pointer hover:border-[#8C9196] transition-colors'
          >
            <option value='today'>Today</option>
            <option value='last7'>Last 7 days</option>
            <option value='last30'>Last 30 days</option>
            <option value='last90'>Last 90 days</option>
            <option value='thisyear'>This year</option>
          </select>
          <button className='flex items-center gap-1.5 px-3 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'>
            {Icons.download} Export
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 xl:grid-cols-5 gap-4'>
        <StatCard
          title='Total Revenue'
          value='₹8,42,340'
          change={12.5}
          icon={Icons.revenue}
          color='bg-[#008060]/10 text-[#008060]'
        />
        <StatCard
          title='Total Orders'
          value='1,284'
          change={8.2}
          icon={Icons.orders}
          color='bg-[#2C6ECB]/10 text-[#2C6ECB]'
        />
        <StatCard
          title='New Customers'
          value='394'
          change={5.1}
          icon={Icons.customers}
          color='bg-purple-100 text-purple-700'
        />
        <StatCard
          title='Avg Order Value'
          value='₹2,340'
          change={-3.4}
          icon={Icons.avgOrder}
          color='bg-[#FFC453]/20 text-[#916A00]'
        />
        <StatCard
          title='Conversion Rate'
          value='3.8%'
          change={1.2}
          icon={Icons.conversion}
          color='bg-[#D82C0D]/10 text-[#D82C0D]'
        />
      </div>

      {/* Tabbed card */}
      <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
        <div className='flex items-center border-b border-[#E1E3E5] px-4 overflow-x-auto scrollbar-none'>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-[13px] font-medium whitespace-nowrap border-b-2 transition-all bg-transparent border-l-0 border-r-0 border-t-0 cursor-pointer ${view === tab.id ? 'border-b-[#008060] text-[#008060]' : 'border-b-transparent text-[#6D7175] hover:text-[#202223]'}`}
            >
              {tab.label}
              {tab.isLive && (
                <span className='flex items-center gap-1 px-1.5 py-0.5 bg-[#D82C0D] text-white text-[9px] font-bold rounded-full'>
                  <span className='w-1 h-1 rounded-full bg-white animate-pulse' />{' '}
                  LIVE
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── Overview ── */}
        {view === 'overview' && (
          <div className='p-5 space-y-5'>
            <div className='flex items-center justify-between flex-wrap gap-3'>
              <div className='flex items-center gap-2'>
                {(['revenue', 'orders', 'customers'] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setChartMetric(m)}
                    className={`px-3 py-1.5 text-[12.5px] font-medium rounded-lg transition-colors capitalize cursor-pointer border ${chartMetric === m ? 'bg-[#008060] text-white border-[#008060]' : 'bg-white text-[#6D7175] border-[#E1E3E5] hover:bg-[#F6F6F7]'}`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className='flex items-center border border-[#E1E3E5] rounded-lg overflow-hidden'>
                {(['area', 'bar', 'line'] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setChartType(t)}
                    className={`px-3 py-1.5 text-[12px] font-medium capitalize transition-colors cursor-pointer border-none ${chartType === t ? 'bg-[#008060] text-white' : 'bg-white text-[#6D7175] hover:bg-[#F6F6F7]'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <ResponsiveContainer width='100%' height={260}>
              {chartType === 'bar' ? (
                <BarChart
                  data={chartData}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='#F1F1F1'
                    vertical={false}
                  />
                  <XAxis
                    dataKey='label'
                    tick={{ fontSize: 11, fill: '#8C9196' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#8C9196' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      chartMetric === 'revenue' ? formatCurrency(v) : v
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey={chartMetric}
                    fill='#008060'
                    radius={[4, 4, 0, 0]}
                    maxBarSize={40}
                  />
                </BarChart>
              ) : chartType === 'line' ? (
                <LineChart
                  data={chartData}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='#F1F1F1'
                    vertical={false}
                  />
                  <XAxis
                    dataKey='label'
                    tick={{ fontSize: 11, fill: '#8C9196' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#8C9196' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      chartMetric === 'revenue' ? formatCurrency(v) : v
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type='monotone'
                    dataKey={chartMetric}
                    stroke='#008060'
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4, fill: '#008060' }}
                  />
                </LineChart>
              ) : (
                <AreaChart
                  data={chartData}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id='grad' x1='0' y1='0' x2='0' y2='1'>
                      <stop
                        offset='5%'
                        stopColor='#008060'
                        stopOpacity={0.12}
                      />
                      <stop offset='95%' stopColor='#008060' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='#F1F1F1'
                    vertical={false}
                  />
                  <XAxis
                    dataKey='label'
                    tick={{ fontSize: 11, fill: '#8C9196' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#8C9196' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(v) =>
                      chartMetric === 'revenue' ? formatCurrency(v) : v
                    }
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    type='monotone'
                    dataKey={chartMetric}
                    stroke='#008060'
                    strokeWidth={2}
                    fill='url(#grad)'
                    dot={false}
                    activeDot={{ r: 4, fill: '#008060' }}
                  />
                </AreaChart>
              )}
            </ResponsiveContainer>

            <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 pt-4 border-t border-[#E1E3E5]'>
              <div>
                <p className='font-sora text-[14px] font-semibold text-[#202223] mb-4'>
                  Orders by Sport
                </p>
                <div className='flex items-center gap-4'>
                  <ResponsiveContainer width={140} height={140}>
                    <PieChart>
                      <Pie
                        data={SPORT_DATA}
                        cx='50%'
                        cy='50%'
                        innerRadius={40}
                        outerRadius={65}
                        dataKey='value'
                        paddingAngle={2}
                      >
                        {SPORT_DATA.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(v: number) => [v, 'Orders']}
                        contentStyle={{
                          fontSize: 12,
                          border: '1px solid #E1E3E5',
                          borderRadius: 8,
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className='flex-1 space-y-2'>
                    {SPORT_DATA.map((item) => {
                      const total = SPORT_DATA.reduce((s, d) => s + d.value, 0)
                      return (
                        <div
                          key={item.name}
                          className='flex items-center gap-2'
                        >
                          <span
                            className='w-2.5 h-2.5 rounded-full shrink-0'
                            style={{ background: item.color }}
                          />
                          <span className='text-[12px] text-[#202223] flex-1'>
                            {item.name}
                          </span>
                          <span className='text-[12px] font-semibold text-[#202223]'>
                            {item.value}
                          </span>
                          <span className='text-[11px] text-[#8C9196] w-8 text-right'>
                            {Math.round((item.value / total) * 100)}%
                          </span>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </div>
              <div>
                <p className='font-sora text-[14px] font-semibold text-[#202223] mb-4'>
                  Period Summary
                </p>
                <div className='space-y-3'>
                  {[
                    {
                      label: 'Gross Revenue',
                      value: '₹8,42,340',
                      sub: 'before refunds',
                    },
                    { label: 'Refunds', value: '₹12,400', sub: '14 orders' },
                    {
                      label: 'Net Revenue',
                      value: '₹8,29,940',
                      sub: 'after refunds',
                      bold: true,
                    },
                    {
                      label: 'Shipping Collected',
                      value: '₹18,200',
                      sub: 'from customers',
                    },
                    {
                      label: 'GST Collected',
                      value: '₹1,31,564',
                      sub: '18% GST',
                    },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className={`flex items-center justify-between py-2 ${item.bold ? 'border-t border-[#E1E3E5] pt-3' : ''}`}
                    >
                      <div>
                        <p
                          className={`text-[13px] ${item.bold ? 'font-semibold text-[#202223]' : 'text-[#6D7175]'}`}
                        >
                          {item.label}
                        </p>
                        <p className='text-[11px] text-[#8C9196]'>{item.sub}</p>
                      </div>
                      <p
                        className={`text-[13px] ${item.bold ? 'font-bold text-[#008060]' : 'font-medium text-[#202223]'}`}
                      >
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Products */}
            <div className='pt-4 border-t border-[#E1E3E5]'>
              <div className='flex items-center gap-2 mb-4'>
                <div className='text-[#008060]'>{Icons.trophy}</div>
                <p className='font-sora text-[14px] font-semibold text-[#202223]'>
                  Top Products
                </p>
              </div>
              <div className='divide-y divide-[#F1F1F1]'>
                {TOP_PRODUCTS.map((product) => (
                  <div
                    key={product.rank}
                    className='flex items-center gap-4 py-3 hover:bg-[#F6F6F7] px-2 rounded-lg transition-colors'
                  >
                    <span className='w-6 text-[13px] font-bold text-[#8C9196] shrink-0 text-center'>
                      {product.rank}
                    </span>
                    <div className='flex-1 min-w-0'>
                      <p className='text-[13px] font-medium text-[#202223] truncate'>
                        {product.name}
                      </p>
                      <div className='flex items-center gap-2 mt-1.5'>
                        <div className='flex-1 h-1.5 bg-[#E1E3E5] rounded-full overflow-hidden'>
                          <div
                            className='h-full bg-[#008060] rounded-full'
                            style={{
                              width: `${(product.revenue / TOP_PRODUCTS[0].revenue) * 100}%`,
                            }}
                          />
                        </div>
                        <span className='text-[11px] text-[#8C9196] shrink-0'>
                          {product.sold} sold
                        </span>
                      </div>
                    </div>
                    <div className='text-right shrink-0'>
                      <p className='text-[13px] font-semibold text-[#202223]'>
                        {formatCurrencyFull(product.revenue)}
                      </p>
                      <span
                        className={`inline-flex items-center gap-0.5 text-[11px] font-semibold ${product.growth >= 0 ? 'text-[#008060]' : 'text-[#D82C0D]'}`}
                      >
                        {product.growth >= 0 ? Icons.arrowUp : Icons.arrowDown}
                        {Math.abs(product.growth)}%
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geography */}
            <div className='pt-4 border-t border-[#E1E3E5]'>
              <div className='flex items-center gap-2 mb-4'>
                <div className='text-[#6D7175]'>{Icons.map}</div>
                <p className='font-sora text-[14px] font-semibold text-[#202223]'>
                  Sales by City
                </p>
              </div>
              <div className='space-y-3'>
                {TOP_CITIES.map((city) => (
                  <div key={city.city} className='flex items-center gap-4'>
                    <p className='text-[13px] font-medium text-[#202223] w-24 shrink-0'>
                      {city.city}
                    </p>
                    <div className='flex-1 h-2 bg-[#E1E3E5] rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-[#008060] rounded-full'
                        style={{ width: `${city.pct}%` }}
                      />
                    </div>
                    <span className='text-[12px] text-[#8C9196] w-8 text-right shrink-0'>
                      {city.pct}%
                    </span>
                    <span className='text-[12.5px] font-semibold text-[#202223] w-28 text-right shrink-0'>
                      {formatCurrencyFull(city.revenue)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Channels */}
            <div className='pt-4 border-t border-[#E1E3E5]'>
              <p className='font-sora text-[14px] font-semibold text-[#202223] mb-4'>
                Revenue by Channel
              </p>
              <ResponsiveContainer width='100%' height={200}>
                <BarChart
                  data={CHANNEL_DATA}
                  margin={{ top: 4, right: 4, left: 0, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray='3 3'
                    stroke='#F1F1F1'
                    vertical={false}
                  />
                  <XAxis
                    dataKey='label'
                    tick={{ fontSize: 11, fill: '#8C9196' }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: '#8C9196' }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatCurrency}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar
                    dataKey='website'
                    name='Website'
                    fill='#008060'
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                    stackId='a'
                  />
                  <Bar
                    dataKey='pos'
                    name='POS'
                    fill='#2C6ECB'
                    maxBarSize={28}
                    stackId='a'
                  />
                  <Bar
                    dataKey='dashboard'
                    name='Dashboard'
                    fill='#FFC453'
                    radius={[4, 4, 0, 0]}
                    maxBarSize={28}
                    stackId='a'
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* ── Reports ── */}
        {view === 'reports' && (
          <div className='p-5 space-y-5'>
            <div className='flex items-center justify-between'>
              <div>
                <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
                  Generated Reports
                </h2>
                <p className='text-[12.5px] text-[#6D7175] mt-0.5'>
                  Download detailed reports for your store
                </p>
              </div>
              <button className='flex items-center gap-1.5 px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-medium rounded-lg border-none cursor-pointer transition-colors'>
                {Icons.report} Generate Report
              </button>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
              {[
                {
                  label: 'Sales Report',
                  icon: Icons.revenue,
                  color: 'bg-[#008060]/10 text-[#008060]',
                  desc: 'Revenue & orders',
                },
                {
                  label: 'Product Report',
                  icon: Icons.trophy,
                  color: 'bg-[#2C6ECB]/10 text-[#2C6ECB]',
                  desc: 'Performance metrics',
                },
                {
                  label: 'Customer Report',
                  icon: Icons.customers,
                  color: 'bg-purple-100 text-purple-700',
                  desc: 'Acquisition & retention',
                },
                {
                  label: 'Inventory Report',
                  icon: Icons.avgOrder,
                  color: 'bg-[#FFC453]/20 text-[#916A00]',
                  desc: 'Stock levels & value',
                },
              ].map((r) => (
                <button
                  key={r.label}
                  className='flex flex-col items-start gap-3 p-4 border border-[#E1E3E5] rounded-xl hover:border-[#008060]/30 hover:bg-[#F2F7F5] transition-all cursor-pointer bg-white text-left'
                >
                  <div
                    className={`w-9 h-9 rounded-lg flex items-center justify-center ${r.color}`}
                  >
                    {r.icon}
                  </div>
                  <div>
                    <p className='text-[13px] font-semibold text-[#202223]'>
                      {r.label}
                    </p>
                    <p className='text-[11.5px] text-[#6D7175]'>{r.desc}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className='border border-[#E1E3E5] rounded-xl overflow-hidden'>
              <div className='px-5 py-3 bg-[#F6F6F7] border-b border-[#E1E3E5]'>
                <p className='text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Recent Reports
                </p>
              </div>
              <div className='divide-y divide-[#F1F1F1]'>
                {REPORTS_LIST.map((report) => (
                  <div
                    key={report.name}
                    className='flex items-center gap-4 px-5 py-4 hover:bg-[#F6F6F7] transition-colors'
                  >
                    <div className='w-9 h-9 bg-[#F6F6F7] border border-[#E1E3E5] rounded-lg flex items-center justify-center text-[#6D7175] shrink-0'>
                      {Icons.report}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-[13px] font-medium text-[#202223]'>
                        {report.name}
                      </p>
                      <p className='text-[11.5px] text-[#6D7175] truncate'>
                        {report.description}
                      </p>
                    </div>
                    <div className='text-right shrink-0'>
                      <p className='text-[12.5px] text-[#202223]'>
                        {report.period}
                      </p>
                      <p className='text-[11px] text-[#8C9196]'>
                        {report.size} · {report.type}
                      </p>
                    </div>
                    <button className='flex items-center gap-1.5 px-3 py-1.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[12px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer shrink-0'>
                      {Icons.download} Download
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
              <h3 className='font-sora text-[14px] font-semibold text-[#202223] mb-4'>
                Scheduled Reports
              </h3>
              <div className='space-y-3'>
                {[
                  {
                    name: 'Daily Sales Summary',
                    freq: 'Every day at 8:00 AM',
                    channel: 'Email',
                    active: true,
                  },
                  {
                    name: 'Weekly Performance Report',
                    freq: 'Every Monday at 9:00 AM',
                    channel: 'Email',
                    active: true,
                  },
                  {
                    name: 'Monthly Revenue Report',
                    freq: '1st of every month',
                    channel: 'Email + SMS',
                    active: false,
                  },
                ].map((s) => (
                  <div
                    key={s.name}
                    className='flex items-center justify-between p-3 border border-[#E1E3E5] rounded-lg'
                  >
                    <div>
                      <p className='text-[13px] font-medium text-[#202223]'>
                        {s.name}
                      </p>
                      <p className='text-[11.5px] text-[#6D7175]'>
                        {s.freq} · {s.channel}
                      </p>
                    </div>
                    <button
                      className={`relative w-10 h-6 rounded-full transition-colors border-none cursor-pointer ${s.active ? 'bg-[#008060]' : 'bg-[#8C9196]'}`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${s.active ? 'translate-x-4' : 'translate-x-0.5'}`}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ── Live View ── */}
        {view === 'live' && (
          <div className='p-5 space-y-5'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-3'>
                <div className='flex items-center gap-2 px-3 py-1.5 bg-[#D82C0D]/10 border border-[#D82C0D]/20 rounded-full'>
                  <span className='w-2 h-2 rounded-full bg-[#D82C0D] animate-pulse' />
                  <span className='text-[12px] font-semibold text-[#D82C0D]'>
                    LIVE
                  </span>
                </div>
                <p className='text-[13px] text-[#6D7175]'>
                  Real-time store activity
                </p>
              </div>
              <p className='text-[12px] text-[#8C9196]'>
                Updates every 30 seconds
              </p>
            </div>

            <div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
              {[
                {
                  label: 'Active Visitors',
                  value: liveCount,
                  icon: Icons.eye,
                  color: 'text-[#D82C0D]',
                  bg: 'bg-[#D82C0D]/10',
                  pulse: true,
                },
                {
                  label: 'Carts Active',
                  value: 3,
                  icon: Icons.cart,
                  color: 'text-[#916A00]',
                  bg: 'bg-[#FFC453]/20',
                },
                {
                  label: 'Checkouts',
                  value: 1,
                  icon: Icons.orders,
                  color: 'text-[#008060]',
                  bg: 'bg-[#008060]/10',
                },
                {
                  label: "Today's Orders",
                  value: 24,
                  icon: Icons.revenue,
                  color: 'text-[#2C6ECB]',
                  bg: 'bg-[#2C6ECB]/10',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className='bg-white border border-[#E1E3E5] rounded-xl p-4 flex items-center gap-3'
                >
                  <div
                    className={`w-10 h-10 ${stat.bg} ${stat.color} rounded-lg flex items-center justify-center shrink-0`}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p
                      className={`font-sora text-[24px] font-bold ${stat.color} leading-none ${stat.pulse ? 'animate-pulse' : ''}`}
                    >
                      {stat.value}
                    </p>
                    <p className='text-[11.5px] text-[#6D7175] mt-0.5'>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className='border border-[#E1E3E5] rounded-xl overflow-hidden'>
              <div className='flex items-center gap-2 px-5 py-3 bg-[#F6F6F7] border-b border-[#E1E3E5]'>
                <span className='w-1.5 h-1.5 rounded-full bg-[#D82C0D] animate-pulse' />
                <p className='text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                  Active Visitors ({liveCount})
                </p>
              </div>
              <div className='divide-y divide-[#F1F1F1]'>
                {LIVE_VISITORS.slice(0, liveCount).map((visitor) => (
                  <div
                    key={visitor.id}
                    className='flex items-center gap-4 px-5 py-3 hover:bg-[#F6F6F7] transition-colors'
                  >
                    <div className='w-7 h-7 rounded-full bg-[#008060]/10 flex items-center justify-center text-[#008060] shrink-0'>
                      {Icons.user}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-[13px] font-medium text-[#202223] truncate'>
                        {visitor.page}
                      </p>
                      <p className='text-[11.5px] text-[#8C9196]'>
                        {visitor.location} · {visitor.device}
                      </p>
                    </div>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${visitor.action === 'Purchasing' ? 'bg-[#008060]/10 text-[#008060]' : visitor.action === 'Checkout' ? 'bg-[#FFC453]/20 text-[#916A00]' : visitor.action === 'Shopping' ? 'bg-[#2C6ECB]/10 text-[#2C6ECB]' : 'bg-[#F6F6F7] text-[#6D7175]'}`}
                    >
                      {visitor.action}
                    </span>
                    <span className='text-[12px] text-[#8C9196] shrink-0'>
                      {visitor.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
              <p className='font-sora text-[14px] font-semibold text-[#202223] mb-4'>
                Today's Activity Timeline
              </p>
              <div className='space-y-3'>
                {[
                  {
                    time: '2 min ago',
                    event: 'New order #AS-482910 — Rahul Sharma — ₹4,999',
                    type: 'order',
                  },
                  {
                    time: '8 min ago',
                    event: 'New customer registered — priya@gmail.com',
                    type: 'customer',
                  },
                  {
                    time: '15 min ago',
                    event: 'Order #AS-482909 shipped — tracking added',
                    type: 'shipping',
                  },
                  {
                    time: '32 min ago',
                    event:
                      'Low stock alert — Championship Cricket Bat (3 left)',
                    type: 'warning',
                  },
                  {
                    time: '1h ago',
                    event: 'Payment received — ₹12,499 via Card',
                    type: 'payment',
                  },
                  {
                    time: '2h ago',
                    event: 'Order #AS-482908 delivered successfully',
                    type: 'delivered',
                  },
                ].map((item, i) => (
                  <div key={i} className='flex items-start gap-3'>
                    <div
                      className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${item.type === 'warning' ? 'bg-[#FFC453]' : item.type === 'customer' ? 'bg-[#2C6ECB]' : 'bg-[#008060]'}`}
                    />
                    <p className='text-[12.5px] text-[#202223] flex-1'>
                      {item.event}
                    </p>
                    <span className='text-[11.5px] text-[#8C9196] shrink-0'>
                      {item.time}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

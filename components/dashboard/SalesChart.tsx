'use client'

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
  Legend,
} from 'recharts'

export interface SalesChartData {
  label: string
  revenue?: number
  orders?: number
  customers?: number
  [key: string]: string | number | undefined
}

interface SalesChartProps {
  data: SalesChartData[]
  type?: 'area' | 'bar' | 'line'
  height?: number
  showOrders?: boolean
  showRevenue?: boolean
  showCustomers?: boolean
  title?: string
  subtitle?: string
  loading?: boolean
}

const CHART_COLORS = {
  revenue: '#008060',
  orders: '#2C6ECB',
  customers: '#FFC453',
}

function formatCurrency(value: number) {
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`
  return `₹${value}`
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null
  return (
    <div className='bg-white border border-[#E1E3E5] rounded-xl shadow-lg p-3 min-w-35'>
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
            {entry.dataKey === 'revenue'
              ? formatCurrency(entry.value)
              : entry.value}
          </span>
        </div>
      ))}
    </div>
  )
}

export default function SalesChart({
  data,
  type = 'area',
  height = 220,
  showOrders = false,
  showRevenue = true,
  showCustomers = false,
  title,
  subtitle,
  loading = false,
}: SalesChartProps) {
  if (loading) {
    return (
      <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
        {title && (
          <div className='mb-5 space-y-2 animate-pulse'>
            <div className='w-40 h-4 bg-[#E1E3E5] rounded' />
            <div className='w-24 h-3 bg-[#E1E3E5] rounded' />
          </div>
        )}
        <div
          className='animate-pulse bg-[#F6F6F7] rounded-lg'
          style={{ height }}
        />
      </div>
    )
  }

  const commonAxisProps = {
    tick: { fontSize: 11, fill: '#8C9196' },
    axisLine: false,
    tickLine: false,
  }

  const gradientDefs = (
    <defs>
      <linearGradient id='revenueGrad' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='5%' stopColor={CHART_COLORS.revenue} stopOpacity={0.12} />
        <stop offset='95%' stopColor={CHART_COLORS.revenue} stopOpacity={0} />
      </linearGradient>
      <linearGradient id='ordersGrad' x1='0' y1='0' x2='0' y2='1'>
        <stop offset='5%' stopColor={CHART_COLORS.orders} stopOpacity={0.12} />
        <stop offset='95%' stopColor={CHART_COLORS.orders} stopOpacity={0} />
      </linearGradient>
      <linearGradient id='customersGrad' x1='0' y1='0' x2='0' y2='1'>
        <stop
          offset='5%'
          stopColor={CHART_COLORS.customers}
          stopOpacity={0.12}
        />
        <stop offset='95%' stopColor={CHART_COLORS.customers} stopOpacity={0} />
      </linearGradient>
    </defs>
  )

  const sharedProps = {
    data,
    margin: { top: 4, right: 4, left: 0, bottom: 0 },
  }

  const renderChart = () => {
    if (type === 'bar') {
      return (
        <BarChart {...sharedProps}>
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#F1F1F1'
            vertical={false}
          />
          <XAxis dataKey='label' {...commonAxisProps} />
          <YAxis
            {...commonAxisProps}
            tickFormatter={(v) => (showRevenue ? formatCurrency(v) : v)}
          />
          <Tooltip content={<CustomTooltip />} />
          {(showRevenue || showOrders || showCustomers) && (
            <Legend wrapperStyle={{ fontSize: 11, color: '#6D7175' }} />
          )}
          {showRevenue && (
            <Bar
              dataKey='revenue'
              fill={CHART_COLORS.revenue}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          )}
          {showOrders && (
            <Bar
              dataKey='orders'
              fill={CHART_COLORS.orders}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          )}
          {showCustomers && (
            <Bar
              dataKey='customers'
              fill={CHART_COLORS.customers}
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            />
          )}
        </BarChart>
      )
    }

    if (type === 'line') {
      return (
        <LineChart {...sharedProps}>
          {gradientDefs}
          <CartesianGrid
            strokeDasharray='3 3'
            stroke='#F1F1F1'
            vertical={false}
          />
          <XAxis dataKey='label' {...commonAxisProps} />
          <YAxis
            {...commonAxisProps}
            tickFormatter={(v) => (showRevenue ? formatCurrency(v) : v)}
          />
          <Tooltip content={<CustomTooltip />} />
          {(showRevenue || showOrders || showCustomers) && (
            <Legend wrapperStyle={{ fontSize: 11, color: '#6D7175' }} />
          )}
          {showRevenue && (
            <Line
              type='monotone'
              dataKey='revenue'
              stroke={CHART_COLORS.revenue}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: CHART_COLORS.revenue }}
            />
          )}
          {showOrders && (
            <Line
              type='monotone'
              dataKey='orders'
              stroke={CHART_COLORS.orders}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: CHART_COLORS.orders }}
            />
          )}
          {showCustomers && (
            <Line
              type='monotone'
              dataKey='customers'
              stroke={CHART_COLORS.customers}
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: CHART_COLORS.customers }}
            />
          )}
        </LineChart>
      )
    }

    // Default: area
    return (
      <AreaChart {...sharedProps}>
        {gradientDefs}
        <CartesianGrid
          strokeDasharray='3 3'
          stroke='#F1F1F1'
          vertical={false}
        />
        <XAxis dataKey='label' {...commonAxisProps} />
        <YAxis
          {...commonAxisProps}
          tickFormatter={(v) => (showRevenue ? formatCurrency(v) : v)}
        />
        <Tooltip content={<CustomTooltip />} />
        {(showRevenue || showOrders || showCustomers) && (
          <Legend wrapperStyle={{ fontSize: 11, color: '#6D7175' }} />
        )}
        {showRevenue && (
          <Area
            type='monotone'
            dataKey='revenue'
            stroke={CHART_COLORS.revenue}
            strokeWidth={2}
            fill='url(#revenueGrad)'
            dot={false}
            activeDot={{ r: 4, fill: CHART_COLORS.revenue }}
          />
        )}
        {showOrders && (
          <Area
            type='monotone'
            dataKey='orders'
            stroke={CHART_COLORS.orders}
            strokeWidth={2}
            fill='url(#ordersGrad)'
            dot={false}
            activeDot={{ r: 4, fill: CHART_COLORS.orders }}
          />
        )}
        {showCustomers && (
          <Area
            type='monotone'
            dataKey='customers'
            stroke={CHART_COLORS.customers}
            strokeWidth={2}
            fill='url(#customersGrad)'
            dot={false}
            activeDot={{ r: 4, fill: CHART_COLORS.customers }}
          />
        )}
      </AreaChart>
    )
  }

  return (
    <div className='bg-white border border-[#E1E3E5] rounded-xl p-5'>
      {(title || subtitle) && (
        <div className='flex items-start justify-between mb-5'>
          <div>
            {title && (
              <h3 className='font-sora text-[15px] font-semibold text-[#202223]'>
                {title}
              </h3>
            )}
            {subtitle && (
              <p className='text-[12px] text-[#6D7175] mt-0.5'>{subtitle}</p>
            )}
          </div>

          {/* Legend indicators */}
          <div className='flex items-center gap-3 text-[11.5px] text-[#6D7175]'>
            {showRevenue && (
              <span className='flex items-center gap-1.5'>
                <span
                  className='w-2.5 h-2.5 rounded-full'
                  style={{ background: CHART_COLORS.revenue }}
                />
                Revenue
              </span>
            )}
            {showOrders && (
              <span className='flex items-center gap-1.5'>
                <span
                  className='w-2.5 h-2.5 rounded-full'
                  style={{ background: CHART_COLORS.orders }}
                />
                Orders
              </span>
            )}
            {showCustomers && (
              <span className='flex items-center gap-1.5'>
                <span
                  className='w-2.5 h-2.5 rounded-full'
                  style={{ background: CHART_COLORS.customers }}
                />
                Customers
              </span>
            )}
          </div>
        </div>
      )}

      <ResponsiveContainer width='100%' height={height}>
        {renderChart()}
      </ResponsiveContainer>
    </div>
  )
}

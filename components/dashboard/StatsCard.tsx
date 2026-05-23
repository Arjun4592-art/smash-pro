import Link from 'next/link'

interface StatsCardProps {
  title: string
  value: string | number
  change?: number
  changeLabel?: string
  icon: string
  href?: string
  color?: 'green' | 'blue' | 'yellow' | 'red' | 'default'
  loading?: boolean
}

const COLOR_MAP = {
  green: { bg: 'bg-[#008060]/10', text: 'text-[#008060]', dot: 'bg-[#008060]' },
  blue: { bg: 'bg-[#2C6ECB]/10', text: 'text-[#2C6ECB]', dot: 'bg-[#2C6ECB]' },
  yellow: {
    bg: 'bg-[#FFC453]/20',
    text: 'text-[#916A00]',
    dot: 'bg-[#FFC453]',
  },
  red: { bg: 'bg-[#D82C0D]/10', text: 'text-[#D82C0D]', dot: 'bg-[#D82C0D]' },
  default: { bg: 'bg-[#F6F6F7]', text: 'text-[#202223]', dot: 'bg-[#6D7175]' },
}

export default function StatsCard({
  title,
  value,
  change,
  changeLabel = 'vs last month',
  icon,
  href,
  color = 'default',
  loading = false,
}: StatsCardProps) {
  const colors = COLOR_MAP[color]
  const isPositive = change !== undefined && change >= 0

  const content = (
    <div className='bg-white border border-[#E1E3E5] rounded-xl p-5 hover:shadow-md transition-all group'>
      {loading ? (
        <div className='space-y-3 animate-pulse'>
          <div className='flex items-center justify-between'>
            <div className='w-9 h-9 bg-[#E1E3E5] rounded-lg' />
            <div className='w-16 h-5 bg-[#E1E3E5] rounded-full' />
          </div>
          <div className='w-24 h-3 bg-[#E1E3E5] rounded' />
          <div className='w-32 h-7 bg-[#E1E3E5] rounded' />
          <div className='w-20 h-3 bg-[#E1E3E5] rounded' />
        </div>
      ) : (
        <>
          <div className='flex items-start justify-between mb-4'>
            {/* Icon */}
            <div
              className={`w-9 h-9 ${colors.bg} rounded-lg flex items-center justify-center text-lg shrink-0`}
            >
              {icon}
            </div>

            {/* Change badge */}
            {change !== undefined && (
              <span
                className={`inline-flex items-center gap-1 text-[11.5px] font-semibold px-2 py-0.5 rounded-full ${
                  isPositive
                    ? 'bg-[#008060]/10 text-[#008060]'
                    : 'bg-[#D82C0D]/10 text-[#D82C0D]'
                }`}
              >
                {isPositive ? (
                  <svg
                    width='10'
                    height='10'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                  >
                    <polyline points='18 15 12 9 6 15' />
                  </svg>
                ) : (
                  <svg
                    width='10'
                    height='10'
                    viewBox='0 0 24 24'
                    fill='none'
                    stroke='currentColor'
                    strokeWidth='3'
                  >
                    <polyline points='6 9 12 15 18 9' />
                  </svg>
                )}
                {Math.abs(change)}%
              </span>
            )}
          </div>

          {/* Label */}
          <p className='text-[12.5px] text-[#6D7175] mb-1.5'>{title}</p>

          {/* Value */}
          <p
            className={`font-sora text-[26px] font-bold leading-tight ${colors.text} group-hover:scale-[1.01] transition-transform origin-left`}
          >
            {value}
          </p>

          {/* Change label */}
          {change !== undefined && (
            <p className='text-[11.5px] text-[#8C9196] mt-1.5 flex items-center gap-1'>
              <span className={`w-1.5 h-1.5 rounded-full ${colors.dot}`} />
              {changeLabel}
            </p>
          )}

          {/* Link arrow */}
          {href && (
            <p className='text-[11.5px] text-[#008060] mt-2 opacity-0 group-hover:opacity-100 transition-opacity'>
              View details →
            </p>
          )}
        </>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className='no-underline block'>
        {content}
      </Link>
    )
  }

  return content
}

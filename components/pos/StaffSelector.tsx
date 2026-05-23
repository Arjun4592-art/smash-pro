import { POS_STAFF } from '@/lib/constants'

interface Props {
  selected: (typeof POS_STAFF)[number]
  onSelect: (staff: (typeof POS_STAFF)[number]) => void
}

export default function StaffSelector({ selected, onSelect }: Props) {
  return (
    <div className='space-y-2'>
      {POS_STAFF.map((staff) => {
        const isSelected = selected.id === staff.id
        return (
          <button
            key={staff.id}
            onClick={() => onSelect(staff)}
            className='w-full flex items-center gap-3 p-3 rounded-lg border text-left transition-all'
            style={{
              background: isSelected ? '#F2F7F5' : '#FFFFFF',
              borderColor: isSelected ? '#008060' : '#E1E3E5',
            }}
          >
            {/* Avatar */}
            <div
              className='w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0'
              style={{
                background: isSelected ? '#008060' : '#F6F6F7',
                color: isSelected ? '#FFFFFF' : '#6D7175',
              }}
            >
              {staff.initials}
            </div>

            {/* Info */}
            <div className='flex-1 min-w-0'>
              <div className='text-sm font-medium' style={{ color: '#202223' }}>
                {staff.name}
              </div>
              <div className='text-xs mt-0.5' style={{ color: '#8C9196' }}>
                {staff.shift}
              </div>
            </div>

            {/* Role badge */}
            <span
              className='text-[10px] px-2 py-0.5 rounded-full font-medium flex-shrink-0'
              style={{
                background: staff.role === 'Owner' ? '#FFF3CD' : '#E3F1EB',
                color: staff.role === 'Owner' ? '#B7791F' : '#008060',
              }}
            >
              {staff.role}
            </span>

            {/* Check */}
            {isSelected && (
              <svg
                width='16'
                height='16'
                viewBox='0 0 16 16'
                fill='none'
                className='flex-shrink-0'
              >
                <circle cx='8' cy='8' r='8' fill='#008060' />
                <path
                  d='M4.5 8L7 10.5L11.5 6'
                  stroke='white'
                  strokeWidth='1.5'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                />
              </svg>
            )}
          </button>
        )
      })}
    </div>
  )
}

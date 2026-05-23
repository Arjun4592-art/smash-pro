import { useState } from 'react'
import { CURRENCY_SYMBOL } from '@/lib/constants'

type PayMethod = 'cash' | 'card' | 'upi' | 'split'

interface Props {
  total: number
  onConfirm: (method: PayMethod) => void
  onClose: () => void
}

const fmt = (n: number) =>
  CURRENCY_SYMBOL + Math.round(n).toLocaleString('en-IN')

const METHODS: {
  id: PayMethod
  label: string
  sub: string
  icon: React.ReactNode
}[] = [
  {
    id: 'cash',
    label: 'Cash',
    sub: 'Pay with cash',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
      >
        <rect x='2' y='6' width='20' height='12' rx='2' />
        <circle cx='12' cy='12' r='3' />
        <path d='M6 12h.01M18 12h.01' />
      </svg>
    ),
  },
  {
    id: 'card',
    label: 'Card',
    sub: 'Debit / Credit card',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
      >
        <rect x='2' y='5' width='20' height='14' rx='2' />
        <line x1='2' y1='10' x2='22' y2='10' />
      </svg>
    ),
  },
  {
    id: 'upi',
    label: 'UPI',
    sub: 'GPay · PhonePe · Paytm',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
      >
        <rect x='5' y='2' width='14' height='20' rx='2' />
        <line x1='12' y1='18' x2='12.01' y2='18' />
      </svg>
    ),
  },
  {
    id: 'split',
    label: 'Split',
    sub: 'Multiple methods',
    icon: (
      <svg
        width='20'
        height='20'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.8'
        strokeLinecap='round'
      >
        <path d='M16 3h5v5M8 3H3v5M3 16v5h5M21 16v5h-5M3 12h18' />
      </svg>
    ),
  },
]

export default function PaymentModal({ total, onConfirm, onClose }: Props) {
  const [selected, setSelected] = useState<PayMethod>('cash')

  return (
    <div
      className='fixed inset-0 flex items-center justify-center z-50 p-4'
      style={{ background: 'rgba(0,0,0,0.4)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        className='w-full max-w-sm rounded-xl overflow-hidden'
        style={{
          background: '#FFFFFF',
          border: '1px solid #E1E3E5',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
        }}
      >
        {/* Header */}
        <div
          className='flex items-center justify-between px-5 py-4'
          style={{ borderBottom: '1px solid #E1E3E5' }}
        >
          <div>
            <h3
              className='text-base font-semibold'
              style={{ color: '#202223' }}
            >
              Select payment method
            </h3>
            <p className='text-sm mt-0.5' style={{ color: '#6D7175' }}>
              Total:{' '}
              <span className='font-semibold' style={{ color: '#202223' }}>
                {fmt(total)}
              </span>
            </p>
          </div>
          <button
            onClick={onClose}
            className='w-8 h-8 flex items-center justify-center rounded-lg transition-colors hover:bg-[#F6F6F7]'
            style={{ color: '#6D7175' }}
          >
            <svg
              width='16'
              height='16'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
            >
              <line x1='18' y1='6' x2='6' y2='18' />
              <line x1='6' y1='6' x2='18' y2='18' />
            </svg>
          </button>
        </div>

        {/* Payment options */}
        <div className='p-4 grid grid-cols-2 gap-2'>
          {METHODS.map((m) => {
            const isActive = selected === m.id
            return (
              <button
                key={m.id}
                onClick={() => setSelected(m.id)}
                className='flex flex-col items-start gap-2 p-3 rounded-lg border transition-all text-left'
                style={{
                  background: isActive ? '#F2F7F5' : '#FFFFFF',
                  borderColor: isActive ? '#008060' : '#E1E3E5',
                  color: isActive ? '#008060' : '#6D7175',
                }}
              >
                {m.icon}
                <div>
                  <p
                    className='text-sm font-medium'
                    style={{ color: isActive ? '#008060' : '#202223' }}
                  >
                    {m.label}
                  </p>
                  <p className='text-[11px]' style={{ color: '#8C9196' }}>
                    {m.sub}
                  </p>
                </div>
              </button>
            )
          })}
        </div>

        {/* Confirm */}
        <div className='px-4 pb-4 flex gap-2'>
          <button
            onClick={onClose}
            className='flex-1 py-2.5 rounded-lg text-sm font-medium border transition-colors hover:bg-[#F6F6F7]'
            style={{ borderColor: '#E1E3E5', color: '#6D7175' }}
          >
            Cancel
          </button>
          <button
            onClick={() => onConfirm(selected)}
            className='flex-2 py-2.5 px-6 rounded-lg text-sm font-semibold transition-colors'
            style={{ background: '#008060', color: '#FFFFFF', flex: 2 }}
          >
            Confirm {fmt(total)}
          </button>
        </div>
      </div>
    </div>
  )
}

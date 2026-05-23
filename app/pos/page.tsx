'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { POS_STAFF } from '@/lib/constants'
import StaffSelector from '@/components/pos/StaffSelector'
import PinDots from '@/components/pos/PinDots'
import PinPad from '@/components/pos/PinPad'

type Staff = (typeof POS_STAFF)[number]

export default function POSPinPage() {
  const router = useRouter()
  const [selected, setSelected] = useState<Staff>(POS_STAFF[0])
  const [pin, setPin] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  // ── Check if already authenticated ─────────────────────────────────────────
  useEffect(() => {
    const isAuth = sessionStorage.getItem('pos_authenticated')
    if (isAuth) router.replace('/pos/terminal')
  }, [])

  // ── Select staff ────────────────────────────────────────────────────────────
  const handleSelect = (staff: Staff) => {
    setSelected(staff)
    setPin('')
    setError(false)
    setSuccess(false)
  }

  // ── Press number ────────────────────────────────────────────────────────────
  const handlePress = (num: string) => {
    if (pin.length >= 4 || success) return
    const newPin = pin + num
    setPin(newPin)
    setError(false)

    if (newPin.length === 4) {
      setTimeout(() => {
        if (newPin === selected.pin) {
          setSuccess(true)
          sessionStorage.setItem('pos_authenticated', 'true')
          sessionStorage.setItem(
            'pos_user',
            JSON.stringify({
              id: selected.id,
              name: selected.name,
              role: selected.role,
              initials: selected.initials,
              shift: selected.shift,
            }),
          )
          setTimeout(() => router.push('/pos/terminal'), 700)
        } else {
          setError(true)
          setTimeout(() => {
            setPin('')
            setError(false)
          }, 1000)
        }
      }, 150)
    }
  }

  // ── Delete ──────────────────────────────────────────────────────────────────
  const handleDelete = () => {
    if (success) return
    setPin((p) => p.slice(0, -1))
    setError(false)
  }

  return (
    <div
      className='min-h-screen flex items-center justify-center p-4'
      style={{ background: '#F6F6F7' }}
    >
      <div className='w-full max-w-sm'>
        {/* ── Logo ─────────────────────────────────────────────────────────── */}
        <div className='text-center mb-6'>
          <div className='flex items-center justify-center gap-2 mb-3'>
            {/* Logo icon SVG */}
            <svg width='28' height='28' viewBox='0 0 28 28' fill='none'>
              <rect width='28' height='28' rx='6' fill='#008060' />
              <path
                d='M8 14.5L12 18.5L20 10'
                stroke='white'
                strokeWidth='2.5'
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <span
              className='text-lg font-semibold'
              style={{ color: '#202223', fontFamily: 'Inter, sans-serif' }}
            >
              Smash Pro POS
            </span>
          </div>
          <h1
            className='text-xl font-semibold mb-1'
            style={{ color: '#202223' }}
          >
            Select your profile
          </h1>
          <p className='text-sm' style={{ color: '#6D7175' }}>
            Choose your account then enter your PIN
          </p>
        </div>

        {/* ── Card ─────────────────────────────────────────────────────────── */}
        <div
          className='rounded-xl p-5 border'
          style={{
            background: '#FFFFFF',
            borderColor: '#E1E3E5',
            boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
          }}
        >
          {/* Staff list */}
          <StaffSelector selected={selected} onSelect={handleSelect} />

          {/* Divider */}
          <div className='h-px my-4' style={{ background: '#E1E3E5' }} />

          {/* PIN label */}
          <p className='text-xs text-center mb-3' style={{ color: '#6D7175' }}>
            Enter PIN for{' '}
            <span className='font-semibold' style={{ color: '#202223' }}>
              {selected.name}
            </span>
          </p>

          {/* PIN dots */}
          <div className='mb-2'>
            <PinDots pin={pin} error={error} success={success} />
          </div>

          {/* Status messages */}
          <div className='h-5 flex items-center justify-center mb-3'>
            {error && (
              <p className='text-xs font-medium' style={{ color: '#D82C0D' }}>
                Incorrect PIN. Please try again.
              </p>
            )}
            {success && (
              <p className='text-xs font-medium' style={{ color: '#008060' }}>
                Access granted! Opening terminal...
              </p>
            )}
          </div>

          {/* Numpad */}
          <PinPad
            onPress={handlePress}
            onDelete={handleDelete}
            disabled={success}
          />

          {/* Hint */}
          <p className='text-xs text-center mt-4' style={{ color: '#8C9196' }}>
            Cashier PIN: 1234 · Owner PIN: 9999
          </p>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────────── */}
        <p className='text-xs text-center mt-4' style={{ color: '#8C9196' }}>
          Smash Pro · POS Terminal
        </p>
      </div>
    </div>
  )
}

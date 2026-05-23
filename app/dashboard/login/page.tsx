'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function DashboardLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (email === 'admin@apexsport.in' && password === 'admin123') {
      // Set auth cookie so middleware allows access
      document.cookie = 'apex-auth=admin-token; path=/; max-age=86400'
      router.push('/dashboard')
    } else {
      setError('Invalid email or password. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen bg-[#F6F6F7] flex flex-col'>
      {/* Top bar */}
      <div className='flex items-center justify-between px-8 py-4'>
        <Link href='/' className='flex items-center gap-2.5 no-underline'>
          <div className='w-8 h-8 bg-[#008060] rounded-md flex items-center justify-center text-white text-[11px] font-bold tracking-wider'>
            AS
          </div>
          <span className='font-sora text-[15px] font-semibold text-[#202223]'>
            Apex Sport
          </span>
        </Link>
        <Link
          href='/'
          className='text-[13px] text-[#6D7175] hover:text-[#202223] no-underline transition-colors'
        >
          ← Back to store
        </Link>
      </div>

      {/* Main */}
      <div className='flex-1 flex items-center justify-center px-4 py-12'>
        <div className='w-full max-w-105'>
          {/* Card */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl shadow-sm overflow-hidden'>
            {/* Card header */}
            <div className='px-8 pt-8 pb-6 border-b border-[#E1E3E5]'>
              <div className='flex items-center gap-3 mb-6'>
                <div className='w-10 h-10 bg-[#008060] rounded-lg flex items-center justify-center shrink-0'>
                  <svg width='20' height='20' viewBox='0 0 24 24' fill='none'>
                    <path
                      d='M12 2L2 7l10 5 10-5-10-5z'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M2 17l10 5 10-5'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinejoin='round'
                    />
                    <path
                      d='M2 12l10 5 10-5'
                      stroke='white'
                      strokeWidth='2'
                      strokeLinejoin='round'
                    />
                  </svg>
                </div>
                <div>
                  <h1 className='font-sora text-[18px] font-semibold text-[#202223] leading-tight'>
                    Admin Login
                  </h1>
                  <p className='text-[12px] text-[#6D7175] mt-0.5'>
                    Apex Sport Dashboard
                  </p>
                </div>
              </div>
              <p className='text-[13px] text-[#6D7175] leading-relaxed'>
                Sign in to manage your store, orders, products, and customers.
              </p>
            </div>

            {/* Form */}
            <div className='px-8 py-6'>
              {/* Error */}
              {error && (
                <div className='flex items-start gap-2.5 p-3 mb-5 bg-[#D82C0D]/8 border border-[#D82C0D]/20 rounded-lg'>
                  <span className='text-[#D82C0D] text-sm mt-px shrink-0'>
                    ⚠
                  </span>
                  <p className='text-[12.5px] text-[#D82C0D] leading-relaxed'>
                    {error}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* Email */}
                <div>
                  <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                    Email address
                  </label>
                  <input
                    type='email'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='admin@apexsport.in'
                    required
                    className='w-full px-3.5 py-2.5 bg-white border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none transition-all focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15'
                  />
                </div>

                {/* Password */}
                <div>
                  <div className='flex items-center justify-between mb-1.5'>
                    <label className='block text-[12.5px] font-medium text-[#202223]'>
                      Password
                    </label>
                    <Link
                      href='/dashboard/forgot-password'
                      className='text-[12px] text-[#008060] hover:text-[#006e52] no-underline transition-colors'
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className='relative'>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder='••••••••••'
                      required
                      className='w-full px-3.5 py-2.5 pr-10 bg-white border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none transition-all focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15'
                    />
                    <button
                      type='button'
                      onClick={() => setShowPassword(!showPassword)}
                      className='absolute right-3 top-1/2 -translate-y-1/2 text-[#8C9196] hover:text-[#6D7175] transition-colors bg-transparent border-none cursor-pointer p-0'
                    >
                      {showPassword ? (
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94' />
                          <path d='M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19' />
                          <line x1='1' y1='1' x2='23' y2='23' />
                        </svg>
                      ) : (
                        <svg
                          width='16'
                          height='16'
                          viewBox='0 0 24 24'
                          fill='none'
                          stroke='currentColor'
                          strokeWidth='2'
                        >
                          <path d='M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z' />
                          <circle cx='12' cy='12' r='3' />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <div className='flex items-center gap-2.5'>
                  <input
                    type='checkbox'
                    id='remember'
                    className='w-4 h-4 rounded border-[#E1E3E5] accent-[#008060] cursor-pointer'
                  />
                  <label
                    htmlFor='remember'
                    className='text-[12.5px] text-[#6D7175] cursor-pointer select-none'
                  >
                    Keep me signed in for 30 days
                  </label>
                </div>

                {/* Submit */}
                <button
                  type='submit'
                  disabled={loading}
                  className='w-full py-2.5 bg-[#008060] hover:bg-[#006e52] disabled:opacity-60 disabled:cursor-not-allowed text-white text-[13px] font-semibold rounded-lg transition-all mt-2 flex items-center justify-center gap-2'
                >
                  {loading ? (
                    <>
                      <svg
                        className='animate-spin w-4 h-4'
                        viewBox='0 0 24 24'
                        fill='none'
                      >
                        <circle
                          className='opacity-25'
                          cx='12'
                          cy='12'
                          r='10'
                          stroke='currentColor'
                          strokeWidth='4'
                        />
                        <path
                          className='opacity-75'
                          fill='currentColor'
                          d='M4 12a8 8 0 018-8v8H4z'
                        />
                      </svg>
                      Signing in...
                    </>
                  ) : (
                    'Sign in to Dashboard'
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Security note */}
          <div className='flex items-center justify-center gap-2 mt-6'>
            <svg
              width='12'
              height='12'
              viewBox='0 0 24 24'
              fill='none'
              stroke='#8C9196'
              strokeWidth='2'
            >
              <rect x='3' y='11' width='18' height='11' rx='2' ry='2' />
              <path d='M7 11V7a5 5 0 0110 0v4' />
            </svg>
            <p className='text-[11.5px] text-[#8C9196]'>
              Secured with 256-bit SSL encryption
            </p>
          </div>

          {/* Role badges */}
          <div className='flex items-center justify-center gap-2 mt-3'>
            {['Admin', 'Manager', 'Cashier'].map((role) => (
              <span
                key={role}
                className='px-2.5 py-1 bg-white border border-[#E1E3E5] rounded-full text-[11px] text-[#6D7175]'
              >
                {role}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className='px-8 py-4 border-t border-[#E1E3E5] flex items-center justify-between'>
        <p className='text-[11.5px] text-[#8C9196]'>
          © {new Date().getFullYear()} Apex Sport. All rights reserved.
        </p>
        <div className='flex items-center gap-4'>
          <Link
            href='/privacy'
            className='text-[11.5px] text-[#8C9196] hover:text-[#6D7175] no-underline transition-colors'
          >
            Privacy
          </Link>
          <Link
            href='/terms'
            className='text-[11.5px] text-[#8C9196] hover:text-[#6D7175] no-underline transition-colors'
          >
            Terms
          </Link>
        </div>
      </div>
    </div>
  )
}

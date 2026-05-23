'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SITE_NAME } from '@/lib/constants'
import { ShieldIcon } from '@/components/ui/Icons'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types'

export default function RegisterPage() {
  const router = useRouter()
  const login = useAuthStore((s) => s.login)

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirm) {
      setError('Passwords do not match')
      return
    }
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 1000))

    // Create mock user
    const newUser: User = {
      id: `user-${Date.now()}`,
      name: form.name,
      email: form.email,
      role: 'customer',
      createdAt: new Date().toISOString(),
    }

    login(newUser, `mock-token-${newUser.id}`)

    // Set cookie for middleware
    document.cookie = `apex-auth=${JSON.stringify({
      state: { isAuthenticated: true },
    })}; path=/; max-age=${60 * 60 * 24 * 30}`

    setLoading(false)
    router.push('/profile')
  }

  return (
    <div className='min-h-screen bg-[#F2F4F7] flex items-center justify-center px-4 py-16'>
      <div className='w-full max-w-md'>
        {/* Logo */}
        <div className='text-center mb-8'>
          <Link href='/' className='inline-flex items-center gap-2 mb-4'>
            <div className='w-10 h-10 bg-[#E8553A] rounded-xl flex items-center justify-center shadow-md'>
              <span className='text-white font-montserrat font-black text-lg'>
                A
              </span>
            </div>
            <span className='font-montserrat font-black text-2xl text-[#0A1F44]'>
              {SITE_NAME}
            </span>
          </Link>
          <h1 className='font-montserrat font-black text-2xl text-[#0A1F44]'>
            Create an account
          </h1>
          <p className='text-gray-500 font-lato text-sm mt-1'>
            Get 10% off your first order 🎉
          </p>
        </div>

        <div className='bg-white rounded-2xl shadow-sm border border-gray-100 p-8'>
          <form onSubmit={handleSubmit} className='space-y-4'>
            {[
              {
                name: 'name',
                label: 'Full Name',
                type: 'text',
                placeholder: 'Arjun Sharma',
              },
              {
                name: 'email',
                label: 'Email Address',
                type: 'email',
                placeholder: 'you@example.com',
              },
              {
                name: 'password',
                label: 'Password',
                type: 'password',
                placeholder: '••••••••',
              },
              {
                name: 'confirm',
                label: 'Confirm Password',
                type: 'password',
                placeholder: '••••••••',
              },
            ].map((field) => (
              <div key={field.name}>
                <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-montserrat'>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={(form as any)[field.name]}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, [field.name]: e.target.value }))
                  }
                  placeholder={field.placeholder}
                  className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E8553A] transition-colors font-lato'
                  required
                />
              </div>
            ))}

            {error && <p className='text-xs text-red-500 font-lato'>{error}</p>}

            <button
              type='submit'
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-montserrat font-black text-white transition-all mt-2 ${
                loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#E8553A] hover:bg-[#D4441F] shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {loading ? 'Creating Account...' : 'Create Free Account'}
            </button>
          </form>

          <div className='mt-6 text-center'>
            <p className='text-sm text-gray-500 font-lato'>
              Already have an account?{' '}
              <Link
                href='/login'
                className='text-[#E8553A] font-semibold hover:underline'
              >
                Sign in
              </Link>
            </p>
          </div>

          <div className='flex items-center justify-center gap-1.5 mt-4'>
            <ShieldIcon size={13} className='text-gray-400' />
            <p className='text-xs text-gray-400 font-lato'>
              Protected by 256-bit SSL
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

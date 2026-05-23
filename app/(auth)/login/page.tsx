'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { SITE_NAME } from '@/lib/constants'
import { MailIcon, ShieldIcon } from '@/components/ui/Icons'
import { useAuthStore } from '@/store/authStore'
import type { User } from '@/types'
import { Suspense } from 'react'

// Mock users for demo
const MOCK_USERS: (User & { password: string })[] = [
  {
    id: 'user-001',
    name: 'Arjun Sharma',
    email: 'arjun@example.com',
    password: '123456',
    role: 'customer',
    avatar: 'AS',
    createdAt: '2023-11-10T10:00:00Z',
  },
  {
    id: 'user-002',
    name: 'Priya Patel',
    email: 'priya@example.com',
    password: '123456',
    role: 'customer',
    avatar: 'PP',
    createdAt: '2024-01-15T10:00:00Z',
  },
]

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') ?? '/profile'
  const login = useAuthStore((s) => s.login)

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    await new Promise((r) => setTimeout(r, 800))

    const user = MOCK_USERS.find(
      (u) => u.email === form.email && u.password === form.password,
    )

    if (!user) {
      setError('Invalid email or password. Try arjun@example.com / 123456')
      setLoading(false)
      return
    }

    const { password: _, ...userWithoutPassword } = user
    login(userWithoutPassword, `mock-token-${user.id}`)

    // Set cookie for middleware
    document.cookie = `apex-auth=${JSON.stringify({
      state: { isAuthenticated: true },
    })}; path=/; max-age=${60 * 60 * 24 * 30}`

    router.push(redirect)
  }

  return (
    <div className="min-h-screen bg-[#F2F4F7] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-[#E8553A] rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-montserrat font-black text-lg">
                A
              </span>
            </div>
            <span className="font-montserrat font-black text-2xl text-[#0A1F44]">
              {SITE_NAME}
            </span>
          </Link>
          <h1 className="font-montserrat font-black text-2xl text-[#0A1F44]">
            Welcome back
          </h1>
          <p className="text-gray-500 font-lato text-sm mt-1">
            Sign in to your account
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          {/* Demo credentials hint */}
          <div className="bg-[#0A1F44]/5 border border-[#0A1F44]/10 rounded-xl p-3 mb-5">
            <p className="text-xs font-montserrat font-bold text-[#0A1F44] mb-1">
              Demo Credentials
            </p>
            <p className="text-xs text-gray-500 font-lato">
              Email: <span className="font-semibold">arjun@example.com</span>
            </p>
            <p className="text-xs text-gray-500 font-lato">
              Password: <span className="font-semibold">123456</span>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-montserrat">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, email: e.target.value }))
                  }
                  placeholder="you@example.com"
                  className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:border-[#E8553A] transition-colors font-lato"
                  required
                />
                <MailIcon
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-montserrat">
                Password
              </label>
              <input
                type="password"
                value={form.password}
                onChange={(e) =>
                  setForm((f) => ({ ...f, password: e.target.value }))
                }
                placeholder="••••••••"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E8553A] transition-colors font-lato"
                required
              />
              <div className="text-right mt-1.5">
                <a
                  href="/forgot-password"
                  className="text-xs text-[#E8553A] hover:underline font-lato"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3">
                <p className="text-xs text-red-600 font-lato">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-montserrat font-black text-white transition-all ${
                loading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-[#E8553A] hover:bg-[#D4441F] shadow-lg hover:-translate-y-0.5'
              }`}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500 font-lato">
              Don&apos;t have an account?{' '}
              <Link
                href="/register"
                className="text-[#E8553A] font-semibold hover:underline"
              >
                Create one free
              </Link>
            </p>
          </div>

          <div className="flex items-center justify-center gap-1.5 mt-5">
            <ShieldIcon size={13} className="text-gray-400" />
            <p className="text-xs text-gray-400 font-lato">
              Protected by 256-bit SSL
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F2F4F7]" />}>
      <LoginForm />
    </Suspense>
  )
}
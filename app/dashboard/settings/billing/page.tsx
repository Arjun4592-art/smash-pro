'use client'

import { useState } from 'react'
import Link from 'next/link'

const Icons = {
  card: (
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
      <rect x='1' y='4' width='22' height='16' rx='2' ry='2' />
      <line x1='1' y1='10' x2='23' y2='10' />
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
  check: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='20 6 9 17 4 12' />
    </svg>
  ),
  zap: (
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
      <polygon points='13 2 3 14 12 14 11 22 21 10 12 10 13 2' />
    </svg>
  ),
  spinner: (
    <svg className='animate-spin w-4 h-4' viewBox='0 0 24 24' fill='none'>
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
  ),
  plus: (
    <svg
      width='14'
      height='14'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2.5'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <line x1='12' y1='5' x2='12' y2='19' />
      <line x1='5' y1='12' x2='19' y2='12' />
    </svg>
  ),
  trash: (
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
      <polyline points='3 6 5 6 21 6' />
      <path d='M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6' />
      <path d='M10 11v6M14 11v6' />
      <path d='M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2' />
    </svg>
  ),
}

const SETTINGS_NAV = [
  { label: 'General', href: '/dashboard/settings' },
  { label: 'Billing', href: '/dashboard/settings/billing', active: true },
  { label: 'Shipping', href: '/dashboard/settings/shipping' },
  { label: 'Notifications', href: '/dashboard/settings/notifications' },
]

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    price: 999,
    features: [
      'Up to 100 products',
      'Basic analytics',
      'Email support',
      '1 staff account',
    ],
    color: 'border-[#E1E3E5]',
    badge: '',
  },
  {
    id: 'growth',
    name: 'Growth',
    price: 2499,
    features: [
      'Up to 1000 products',
      'Advanced analytics',
      'Priority support',
      '5 staff accounts',
      'POS terminal',
      'Discount codes',
    ],
    color: 'border-[#008060]',
    badge: 'Current Plan',
    recommended: true,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    price: 4999,
    features: [
      'Unlimited products',
      'Full analytics suite',
      '24/7 dedicated support',
      'Unlimited staff',
      'Multi-location POS',
      'Custom integrations',
      'API access',
    ],
    color: 'border-[#2C6ECB]',
    badge: '',
  },
]

const INVOICES = [
  {
    id: 'INV-2025-05',
    date: 'May 1, 2025',
    amount: 2499,
    status: 'paid',
    plan: 'Growth',
  },
  {
    id: 'INV-2025-04',
    date: 'Apr 1, 2025',
    amount: 2499,
    status: 'paid',
    plan: 'Growth',
  },
  {
    id: 'INV-2025-03',
    date: 'Mar 1, 2025',
    amount: 2499,
    status: 'paid',
    plan: 'Growth',
  },
  {
    id: 'INV-2025-02',
    date: 'Feb 1, 2025',
    amount: 999,
    status: 'paid',
    plan: 'Starter',
  },
  {
    id: 'INV-2025-01',
    date: 'Jan 1, 2025',
    amount: 999,
    status: 'paid',
    plan: 'Starter',
  },
]

export default function BillingPage() {
  const [saving, setSaving] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('growth')
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>(
    'monthly',
  )

  const handleUpgrade = async (planId: string) => {
    setSaving(true)
    setSelectedPlan(planId)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
  }

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Billing
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            Manage your subscription and payment methods
          </p>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-[200px_1fr] gap-5'>
        {/* Sidebar */}
        <div className='bg-white border border-[#E1E3E5] rounded-xl p-2 h-fit'>
          {SETTINGS_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-3 py-2 rounded-lg text-[13px] font-medium no-underline transition-colors ${item.active ? 'bg-[#F2F7F5] text-[#008060]' : 'text-[#6D7175] hover:bg-[#F6F6F7] hover:text-[#202223]'}`}
            >
              {item.label}
            </Link>
          ))}
        </div>

        <div className='space-y-5'>
          {/* Current plan banner */}
          <div className='bg-[#F2F7F5] border border-[#008060]/20 rounded-xl p-5 flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-[#008060] rounded-lg flex items-center justify-center text-white'>
                {Icons.zap}
              </div>
              <div>
                <p className='font-sora text-[15px] font-semibold text-[#202223]'>
                  Growth Plan — Active
                </p>
                <p className='text-[12.5px] text-[#6D7175]'>
                  Next billing: June 1, 2025 · ₹2,499/month
                </p>
              </div>
            </div>
            <button className='px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'>
              Cancel Plan
            </button>
          </div>

          {/* Plan selector */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-6'>
            <div className='flex items-center justify-between mb-5'>
              <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
                Choose a Plan
              </h2>
              <div className='flex items-center border border-[#E1E3E5] rounded-lg overflow-hidden'>
                {(['monthly', 'annual'] as const).map((cycle) => (
                  <button
                    key={cycle}
                    onClick={() => setBillingCycle(cycle)}
                    className={`px-3 py-1.5 text-[12.5px] font-medium capitalize transition-colors border-none cursor-pointer ${billingCycle === cycle ? 'bg-[#008060] text-white' : 'bg-white text-[#6D7175] hover:bg-[#F6F6F7]'}`}
                  >
                    {cycle}
                    {cycle === 'annual' && (
                      <span className='ml-1 text-[10px] font-bold'>-20%</span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
              {PLANS.map((plan) => {
                const price =
                  billingCycle === 'annual'
                    ? Math.round(plan.price * 0.8)
                    : plan.price
                const isCurrent = selectedPlan === plan.id
                return (
                  <div
                    key={plan.id}
                    className={`border-2 rounded-xl p-5 transition-all ${isCurrent ? plan.color : 'border-[#E1E3E5]'} ${plan.recommended ? 'relative' : ''}`}
                  >
                    {plan.recommended && (
                      <div className='absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#008060] text-white text-[11px] font-bold rounded-full'>
                        CURRENT
                      </div>
                    )}
                    <h3 className='font-sora text-[16px] font-bold text-[#202223] mb-1'>
                      {plan.name}
                    </h3>
                    <div className='flex items-baseline gap-1 mb-4'>
                      <span className='font-sora text-[28px] font-bold text-[#202223]'>
                        ₹{price.toLocaleString()}
                      </span>
                      <span className='text-[12px] text-[#6D7175]'>/month</span>
                    </div>
                    <div className='space-y-2 mb-5'>
                      {plan.features.map((f) => (
                        <div
                          key={f}
                          className='flex items-center gap-2 text-[12.5px] text-[#6D7175]'
                        >
                          <span className='text-[#008060] shrink-0'>
                            {Icons.check}
                          </span>
                          {f}
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={() => handleUpgrade(plan.id)}
                      disabled={isCurrent || saving}
                      className={`w-full py-2.5 rounded-lg text-[13px] font-semibold transition-colors cursor-pointer border-none ${
                        isCurrent
                          ? 'bg-[#008060]/10 text-[#008060] cursor-default'
                          : 'bg-[#008060] hover:bg-[#006e52] text-white'
                      } disabled:opacity-60`}
                    >
                      {isCurrent ? 'Current Plan' : `Switch to ${plan.name}`}
                    </button>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Payment method */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-6'>
            <div className='flex items-center justify-between mb-5'>
              <h2 className='font-sora text-[15px] font-semibold text-[#202223] flex items-center gap-2'>
                <span className='text-[#6D7175]'>{Icons.card}</span> Payment
                Methods
              </h2>
              <button className='flex items-center gap-1.5 px-3 py-1.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[12.5px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'>
                {Icons.plus} Add Card
              </button>
            </div>

            <div className='space-y-3'>
              {[
                {
                  type: 'Visa',
                  last4: '4242',
                  expiry: '12/27',
                  isDefault: true,
                },
                {
                  type: 'Mastercard',
                  last4: '5555',
                  expiry: '08/26',
                  isDefault: false,
                },
              ].map((card) => (
                <div
                  key={card.last4}
                  className={`flex items-center justify-between p-4 border rounded-xl ${card.isDefault ? 'border-[#008060]/30 bg-[#F2F7F5]' : 'border-[#E1E3E5]'}`}
                >
                  <div className='flex items-center gap-3'>
                    <div className='w-10 h-7 bg-[#202223] rounded flex items-center justify-center'>
                      <span className='text-white text-[10px] font-bold'>
                        {card.type.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className='text-[13px] font-medium text-[#202223]'>
                        •••• •••• •••• {card.last4}
                      </p>
                      <p className='text-[11.5px] text-[#6D7175]'>
                        Expires {card.expiry}
                      </p>
                    </div>
                    {card.isDefault && (
                      <span className='px-2 py-0.5 bg-[#008060]/10 text-[#008060] text-[10.5px] font-semibold rounded-full'>
                        Default
                      </span>
                    )}
                  </div>
                  <div className='flex items-center gap-2'>
                    {!card.isDefault && (
                      <button className='text-[12px] text-[#6D7175] hover:text-[#202223] bg-transparent border-none cursor-pointer'>
                        Set default
                      </button>
                    )}
                    <button className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#D82C0D] hover:bg-[#D82C0D]/5 rounded-lg bg-transparent border-none cursor-pointer transition-all'>
                      {Icons.trash}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Invoice history */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
            <div className='px-6 py-4 border-b border-[#E1E3E5]'>
              <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
                Invoice History
              </h2>
            </div>
            <table className='w-full'>
              <thead>
                <tr className='border-b border-[#E1E3E5] bg-[#F6F6F7]/50'>
                  <th className='px-6 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                    Invoice
                  </th>
                  <th className='px-6 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                    Date
                  </th>
                  <th className='px-6 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                    Plan
                  </th>
                  <th className='px-6 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                    Amount
                  </th>
                  <th className='px-6 py-3 text-left text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                    Status
                  </th>
                  <th className='px-6 py-3 text-right text-[12px] font-semibold text-[#6D7175] uppercase tracking-wide'>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-[#F1F1F1]'>
                {INVOICES.map((inv) => (
                  <tr
                    key={inv.id}
                    className='hover:bg-[#F6F6F7] transition-colors'
                  >
                    <td className='px-6 py-3'>
                      <span className='text-[13px] font-medium text-[#202223]'>
                        {inv.id}
                      </span>
                    </td>
                    <td className='px-6 py-3'>
                      <span className='text-[12.5px] text-[#6D7175]'>
                        {inv.date}
                      </span>
                    </td>
                    <td className='px-6 py-3'>
                      <span className='text-[12.5px] text-[#202223]'>
                        {inv.plan}
                      </span>
                    </td>
                    <td className='px-6 py-3'>
                      <span className='text-[13px] font-semibold text-[#202223]'>
                        ₹{inv.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className='px-6 py-3'>
                      <span className='inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[#008060]/10 text-[#008060]'>
                        {Icons.check} Paid
                      </span>
                    </td>
                    <td className='px-6 py-3 text-right'>
                      <button className='flex items-center gap-1.5 px-3 py-1.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[12px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer ml-auto'>
                        {Icons.download} PDF
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

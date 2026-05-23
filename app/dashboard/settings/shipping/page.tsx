'use client'

import { useState } from 'react'
import Link from 'next/link'

const Icons = {
  truck: (
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
      <rect x='1' y='3' width='15' height='13' />
      <polygon points='16 8 20 8 23 11 23 16 16 16 16 8' />
      <circle cx='5.5' cy='18.5' r='2.5' />
      <circle cx='18.5' cy='18.5' r='2.5' />
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
  edit: (
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
      <path d='M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7' />
      <path d='M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z' />
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
  save: (
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
      <path d='M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v11a2 2 0 01-2 2z' />
      <polyline points='17 21 17 13 7 13 7 21' />
      <polyline points='7 3 7 8 15 8' />
    </svg>
  ),
  check: (
    <svg
      width='12'
      height='12'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='3'
      strokeLinecap='round'
      strokeLinejoin='round'
    >
      <polyline points='20 6 9 17 4 12' />
    </svg>
  ),
  close: (
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
      <line x1='18' y1='6' x2='6' y2='18' />
      <line x1='6' y1='6' x2='18' y2='18' />
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
}

const SETTINGS_NAV = [
  { label: 'General', href: '/dashboard/settings' },
  { label: 'Billing', href: '/dashboard/settings/billing' },
  { label: 'Shipping', href: '/dashboard/settings/shipping', active: true },
  { label: 'Notifications', href: '/dashboard/settings/notifications' },
]

interface ShippingZone {
  id: string
  name: string
  regions: string[]
  rates: { name: string; price: number; minOrder?: number }[]
}

const INITIAL_ZONES: ShippingZone[] = [
  {
    id: '1',
    name: 'Domestic — India',
    regions: ['All of India'],
    rates: [
      { name: 'Standard Shipping (5-7 days)', price: 99, minOrder: 0 },
      { name: 'Express Shipping (2-3 days)', price: 199, minOrder: 0 },
      { name: 'Free Shipping', price: 0, minOrder: 999 },
    ],
  },
  {
    id: '2',
    name: 'Metro Cities',
    regions: ['Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Chennai'],
    rates: [
      { name: 'Same Day Delivery', price: 299, minOrder: 0 },
      { name: 'Next Day Delivery', price: 149, minOrder: 0 },
    ],
  },
]

export default function ShippingPage() {
  const [zones, setZones] = useState<ShippingZone[]>(INITIAL_ZONES)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [freeShippingThreshold, setFreeShippingThreshold] = useState('999')
  const [defaultWeight, setDefaultWeight] = useState('500')
  const [packagingFee, setPackagingFee] = useState('0')

  const handleSave = async () => {
    setSaving(true)
    await new Promise((r) => setTimeout(r, 1000))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className='space-y-5'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='font-sora text-[22px] font-semibold text-[#202223]'>
            Shipping
          </h1>
          <p className='text-[13px] text-[#6D7175] mt-0.5'>
            Configure shipping zones and rates
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className='flex items-center gap-2 px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50 border-none cursor-pointer'
        >
          {saving ? Icons.spinner : saved ? Icons.check : Icons.save}
          {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
        </button>
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
          {/* General shipping settings */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-6 space-y-5'>
            <h2 className='font-sora text-[15px] font-semibold text-[#202223] flex items-center gap-2'>
              <span className='text-[#6D7175]'>{Icons.truck}</span> General
              Shipping Settings
            </h2>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Free Shipping Threshold (₹)
                </label>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D7175] text-[13px]'>
                    ₹
                  </span>
                  <input
                    type='number'
                    value={freeShippingThreshold}
                    onChange={(e) => setFreeShippingThreshold(e.target.value)}
                    className='w-full pl-8 pr-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                  />
                </div>
                <p className='text-[11.5px] text-[#6D7175] mt-1'>
                  Orders above this get free shipping
                </p>
              </div>
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Default Package Weight (g)
                </label>
                <input
                  type='number'
                  value={defaultWeight}
                  onChange={(e) => setDefaultWeight(e.target.value)}
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                />
                <p className='text-[11.5px] text-[#6D7175] mt-1'>
                  Used when product weight is not set
                </p>
              </div>
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Packaging Fee (₹)
                </label>
                <div className='relative'>
                  <span className='absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6D7175] text-[13px]'>
                    ₹
                  </span>
                  <input
                    type='number'
                    value={packagingFee}
                    onChange={(e) => setPackagingFee(e.target.value)}
                    className='w-full pl-8 pr-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                  />
                </div>
                <p className='text-[11.5px] text-[#6D7175] mt-1'>
                  Added to every order
                </p>
              </div>
            </div>
          </div>

          {/* Shipping zones */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl overflow-hidden'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-[#E1E3E5]'>
              <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
                Shipping Zones
              </h2>
              <button
                onClick={() => setShowModal(true)}
                className='flex items-center gap-1.5 px-3 py-1.5 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[12.5px] font-medium text-[#202223] rounded-lg transition-colors cursor-pointer'
              >
                {Icons.plus} Add Zone
              </button>
            </div>

            <div className='divide-y divide-[#E1E3E5]'>
              {zones.map((zone) => (
                <div key={zone.id} className='p-6'>
                  <div className='flex items-center justify-between mb-4'>
                    <div>
                      <h3 className='font-sora text-[14px] font-semibold text-[#202223]'>
                        {zone.name}
                      </h3>
                      <p className='text-[12px] text-[#6D7175] mt-0.5'>
                        {zone.regions.join(', ')}
                      </p>
                    </div>
                    <div className='flex items-center gap-2'>
                      <button className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer transition-all'>
                        {Icons.edit}
                      </button>
                      <button
                        onClick={() =>
                          setZones((z) => z.filter((z) => z.id !== zone.id))
                        }
                        className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#D82C0D] hover:bg-[#D82C0D]/5 rounded-lg bg-transparent border-none cursor-pointer transition-all'
                      >
                        {Icons.trash}
                      </button>
                    </div>
                  </div>

                  {/* Rates */}
                  <div className='space-y-2'>
                    {zone.rates.map((rate, i) => (
                      <div
                        key={i}
                        className='flex items-center justify-between p-3 bg-[#F6F6F7] border border-[#E1E3E5] rounded-lg'
                      >
                        <div>
                          <p className='text-[13px] font-medium text-[#202223]'>
                            {rate.name}
                          </p>
                          {rate.minOrder !== undefined && rate.minOrder > 0 && (
                            <p className='text-[11.5px] text-[#6D7175]'>
                              Min order: ₹{rate.minOrder}
                            </p>
                          )}
                        </div>
                        <div className='flex items-center gap-3'>
                          <span className='text-[13px] font-semibold text-[#202223]'>
                            {rate.price === 0 ? 'FREE' : `₹${rate.price}`}
                          </span>
                          <button className='w-6 h-6 flex items-center justify-center text-[#6D7175] hover:text-[#202223] bg-transparent border-none cursor-pointer'>
                            {Icons.edit}
                          </button>
                          <button className='w-6 h-6 flex items-center justify-center text-[#6D7175] hover:text-[#D82C0D] bg-transparent border-none cursor-pointer'>
                            {Icons.trash}
                          </button>
                        </div>
                      </div>
                    ))}
                    <button className='flex items-center gap-1.5 text-[12.5px] text-[#008060] hover:text-[#006e52] bg-transparent border-none cursor-pointer transition-colors mt-1'>
                      {Icons.plus} Add rate
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* COD Settings */}
          <div className='bg-white border border-[#E1E3E5] rounded-xl p-6 space-y-4'>
            <h2 className='font-sora text-[15px] font-semibold text-[#202223]'>
              Cash on Delivery (COD)
            </h2>
            <div className='space-y-3'>
              {[
                {
                  label: 'Enable COD',
                  desc: 'Allow customers to pay on delivery',
                  key: 'cod',
                },
                {
                  label: 'COD fee',
                  desc: 'Charge extra for COD orders',
                  key: 'codFee',
                },
                {
                  label: 'COD availability',
                  desc: 'Only for orders below ₹5,000',
                  key: 'codLimit',
                },
              ].map((item) => (
                <div
                  key={item.key}
                  className='flex items-center justify-between p-3 border border-[#E1E3E5] rounded-lg'
                >
                  <div>
                    <p className='text-[13px] font-medium text-[#202223]'>
                      {item.label}
                    </p>
                    <p className='text-[11.5px] text-[#6D7175]'>{item.desc}</p>
                  </div>
                  <button className='relative w-10 h-6 rounded-full transition-colors border-none cursor-pointer bg-[#008060]'>
                    <span className='absolute top-0.5 right-0.5 w-5 h-5 bg-white rounded-full shadow' />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add Zone Modal */}
      {showModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center p-4'>
          <div
            className='absolute inset-0 bg-black/40 backdrop-blur-sm'
            onClick={() => setShowModal(false)}
          />
          <div className='relative bg-white rounded-2xl shadow-2xl w-full max-w-120 overflow-hidden'>
            <div className='flex items-center justify-between px-6 py-4 border-b border-[#E1E3E5]'>
              <h2 className='font-sora text-[16px] font-semibold text-[#202223]'>
                Add Shipping Zone
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className='w-7 h-7 flex items-center justify-center text-[#6D7175] hover:text-[#202223] hover:bg-[#F6F6F7] rounded-lg bg-transparent border-none cursor-pointer'
              >
                {Icons.close}
              </button>
            </div>
            <div className='px-6 py-5 space-y-4'>
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-1.5'>
                  Zone Name
                </label>
                <input
                  type='text'
                  placeholder='e.g. South India'
                  className='w-full px-3.5 py-2.5 border border-[#E1E3E5] rounded-lg text-[13px] text-[#202223] placeholder-[#8C9196] outline-none focus:border-[#008060] focus:ring-2 focus:ring-[#008060]/15 transition-all'
                />
              </div>
              <div>
                <label className='block text-[12.5px] font-medium text-[#202223] mb-2'>
                  Regions
                </label>
                <div className='grid grid-cols-3 gap-2 max-h-50 overflow-y-auto'>
                  {[
                    'Maharashtra',
                    'Delhi',
                    'Karnataka',
                    'Tamil Nadu',
                    'Gujarat',
                    'Rajasthan',
                    'West Bengal',
                    'Telangana',
                    'Uttar Pradesh',
                    'Kerala',
                    'Madhya Pradesh',
                    'Punjab',
                  ].map((state) => (
                    <label
                      key={state}
                      className='flex items-center gap-2 cursor-pointer text-[12.5px] text-[#202223] p-2 border border-[#E1E3E5] rounded-lg hover:bg-[#F6F6F7] transition-colors'
                    >
                      <input
                        type='checkbox'
                        className='accent-[#008060] w-3.5 h-3.5'
                      />
                      {state}
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <div className='flex items-center justify-end gap-2 px-6 py-4 border-t border-[#E1E3E5] bg-[#F6F6F7]/50'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 border border-[#E1E3E5] bg-white hover:bg-[#F6F6F7] text-[13px] font-medium text-[#202223] rounded-lg cursor-pointer transition-colors'
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 bg-[#008060] hover:bg-[#006e52] text-white text-[13px] font-semibold rounded-lg border-none cursor-pointer transition-colors'
              >
                Add Zone
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

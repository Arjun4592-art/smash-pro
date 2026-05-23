'use client'

import { useState } from 'react'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import Link from 'next/link'
import { ChevronRightIcon, ShieldIcon } from '@/components/ui/Icons'

const PAYMENT_METHODS = [
  { value: 'upi', label: 'UPI', icon: '📱' },
  { value: 'card', label: 'Credit / Debit Card', icon: '💳' },
  { value: 'cod', label: 'Cash on Delivery', icon: '💵' },
  { value: 'wallet', label: 'Wallet', icon: '👝' },
]

export default function CheckoutPage() {
  const { items, subtotal, shipping, tax, total, discountAmount, couponCode } =
    useCartStore()
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [placing, setPlacing] = useState(false)
  const [placed, setPlaced] = useState(false)

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    pincode: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handlePlaceOrder = async () => {
    setPlacing(true)
    await new Promise((r) => setTimeout(r, 1500))
    setPlacing(false)
    setPlaced(true)
  }

  if (placed) {
    return (
      <div className='min-h-screen bg-white flex flex-col items-center justify-center py-20 px-4 text-center'>
        <div className='w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mb-6 text-5xl'>
          ✅
        </div>
        <h1 className='font-montserrat font-black text-3xl text-[#0A1F44] mb-3'>
          Order Placed!
        </h1>
        <p className='font-lato text-gray-500 max-w-sm mb-8'>
          Thank you for your order. You&apos;ll receive a confirmation email
          shortly with tracking details.
        </p>
        <div className='flex gap-4'>
          <Link
            href='/orders'
            className='bg-[#0A1F44] text-white font-montserrat font-bold px-6 py-3 rounded-full hover:bg-[#E8553A] transition-colors'
          >
            View Orders
          </Link>
          <Link
            href='/shop'
            className='border-2 border-[#0A1F44] text-[#0A1F44] font-montserrat font-bold px-6 py-3 rounded-full hover:bg-[#0A1F44] hover:text-white transition-colors'
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='min-h-screen bg-[#F2F4F7]'>
      {/* Header */}
      <div className='bg-[#0A1F44] py-10'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
          <div className='flex items-center gap-2 text-white/60 text-sm font-lato mb-3'>
            <Link href='/' className='hover:text-white'>
              Home
            </Link>
            <ChevronRightIcon size={14} />
            <Link href='/cart' className='hover:text-white'>
              Cart
            </Link>
            <ChevronRightIcon size={14} />
            <span className='text-white'>Checkout</span>
          </div>
          <h1 className='font-montserrat font-black text-3xl text-white'>
            Checkout
          </h1>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* ── Form ── */}
          <div className='lg:col-span-2 space-y-5'>
            {/* Shipping */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100'>
              <h2 className='font-montserrat font-black text-xl text-[#0A1F44] mb-5'>
                Shipping Address
              </h2>
              <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                {[
                  {
                    name: 'name',
                    label: 'Full Name',
                    placeholder: 'Arjun Sharma',
                  },
                  {
                    name: 'email',
                    label: 'Email',
                    placeholder: 'arjun@example.com',
                  },
                  {
                    name: 'phone',
                    label: 'Phone',
                    placeholder: '+91 98765 43210',
                  },
                  { name: 'pincode', label: 'Pincode', placeholder: '560001' },
                  {
                    name: 'line1',
                    label: 'Address Line 1',
                    placeholder: '42 MG Road',
                    colSpan: true,
                  },
                  {
                    name: 'line2',
                    label: 'Address Line 2 (Optional)',
                    placeholder: 'Apartment, floor',
                    colSpan: true,
                  },
                  { name: 'city', label: 'City', placeholder: 'Bengaluru' },
                  { name: 'state', label: 'State', placeholder: 'Karnataka' },
                ].map((field) => (
                  <div
                    key={field.name}
                    className={(field as any).colSpan ? 'sm:col-span-2' : ''}
                  >
                    <label className='block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5 font-montserrat'>
                      {field.label}
                    </label>
                    <input
                      type='text'
                      name={field.name}
                      value={(form as any)[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className='w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-[#E8553A] transition-colors font-lato text-[#0A1F44]'
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div className='bg-white rounded-2xl p-6 border border-gray-100'>
              <h2 className='font-montserrat font-black text-xl text-[#0A1F44] mb-5'>
                Payment Method
              </h2>
              <div className='grid grid-cols-2 gap-3'>
                {PAYMENT_METHODS.map((method) => (
                  <button
                    key={method.value}
                    onClick={() => setPaymentMethod(method.value)}
                    className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all text-left ${
                      paymentMethod === method.value
                        ? 'border-[#E8553A] bg-[#E8553A]/5'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className='text-2xl'>{method.icon}</span>
                    <span
                      className={`font-lato font-semibold text-sm ${
                        paymentMethod === method.value
                          ? 'text-[#E8553A]'
                          : 'text-[#0A1F44]'
                      }`}
                    >
                      {method.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Order Summary ── */}
          <div>
            <div className='bg-white rounded-2xl p-5 border border-gray-100 sticky top-28'>
              <h3 className='font-montserrat font-bold text-[#0A1F44] mb-4'>
                Order Summary
              </h3>

              {/* Items */}
              <div className='space-y-3 mb-5 max-h-48 overflow-y-auto'>
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className='flex items-center gap-3'
                  >
                    <div className='w-12 h-12 rounded-lg overflow-hidden bg-gray-50 shrink-0 border border-gray-100'>
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className='w-full h-full object-cover'
                      />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='text-xs font-semibold text-[#0A1F44] font-montserrat truncate'>
                        {item.product.name}
                      </p>
                      <p className='text-xs text-gray-400 font-lato'>
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <span className='text-sm font-black font-montserrat text-[#0A1F44]'>
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className='space-y-2.5 text-sm font-lato border-t border-gray-100 pt-4'>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Subtotal</span>
                  <span className='font-semibold'>
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className='flex justify-between text-green-600'>
                    <span>Discount</span>
                    <span>-{formatCurrency(discountAmount)}</span>
                  </div>
                )}
                <div className='flex justify-between'>
                  <span className='text-gray-500'>Shipping</span>
                  <span
                    className={
                      shipping === 0
                        ? 'text-green-600 font-semibold'
                        : 'font-semibold'
                    }
                  >
                    {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                  </span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-gray-500'>GST (18%)</span>
                  <span className='font-semibold'>{formatCurrency(tax)}</span>
                </div>
                <div className='flex justify-between border-t border-gray-100 pt-3 text-base'>
                  <span className='font-montserrat font-black text-[#0A1F44]'>
                    Total
                  </span>
                  <span className='font-montserrat font-black text-[#0A1F44] text-xl'>
                    {formatCurrency(total)}
                  </span>
                </div>
              </div>

              {/* Place order */}
              <button
                onClick={handlePlaceOrder}
                disabled={placing || items.length === 0}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-montserrat font-black text-base mt-5 transition-all ${
                  placing
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-[#E8553A] hover:bg-[#D4441F] text-white shadow-lg hover:-translate-y-0.5'
                }`}
              >
                {placing ? 'Placing Order...' : `Pay ${formatCurrency(total)}`}
              </button>

              <div className='flex items-center justify-center gap-1.5 mt-3'>
                <ShieldIcon size={14} className='text-gray-400' />
                <p className='text-xs text-gray-400 font-lato'>
                  Secured by 256-bit SSL encryption
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

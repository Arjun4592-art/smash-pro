'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useCartStore } from '@/store/cartStore'
import { formatCurrency } from '@/lib/utils'
import {
  CloseIcon,
  TrashIcon,
  PlusIcon,
  MinusIcon,
  CartIcon,
  TruckIcon,
} from '@/components/ui/Icons'
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_COST } from '@/lib/constants'

interface CartDrawerProps {
  open: boolean
  onClose: () => void
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, subtotal, shipping, tax, total, removeItem, updateQuantity } =
    useCartStore()
  const drawerRef = useRef<HTMLDivElement>(null)

  const shippingProgress = Math.min(
    (subtotal / FREE_SHIPPING_THRESHOLD) * 100,
    100,
  )
  const amountToFreeShipping = FREE_SHIPPING_THRESHOLD - subtotal

  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-70 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 bottom-0 z-80 w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <CartIcon size={20} className="text-[#0A1F44]" />
            <h2 className="font-montserrat font-black text-lg text-[#0A1F44]">
              Your Cart
            </h2>
            {items.length > 0 && (
              <span className="bg-[#E8553A] text-white text-xs font-bold px-2 py-0.5 rounded-full font-montserrat">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Free shipping progress */}
        {items.length > 0 && (
          <div className="px-5 py-3 bg-[#0A1F44]/5 border-b border-gray-100">
            {amountToFreeShipping > 0 ? (
              <p className="text-xs text-[#0A1F44] font-lato mb-2">
                Add{' '}
                <span className="font-bold text-[#E8553A]">
                  {formatCurrency(amountToFreeShipping)}
                </span>{' '}
                more for free shipping 🚚
              </p>
            ) : (
              <p className="text-xs text-green-600 font-lato mb-2 font-semibold">
                ✓ You qualify for free shipping!
              </p>
            )}
            <div className="w-full bg-gray-200 rounded-full h-1.5">
              <div
                className="bg-[#E8553A] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${shippingProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                <CartIcon size={32} className="text-gray-300" />
              </div>
              <h3 className="font-montserrat font-bold text-lg text-[#0A1F44] mb-2">
                Your cart is empty
              </h3>
              <p className="text-gray-400 font-lato text-sm mb-6">
                Looks like you haven&apos;t added anything yet
              </p>
              <button
                onClick={onClose}
                className="bg-[#E8553A] text-white font-montserrat font-bold px-6 py-2.5 rounded-full hover:bg-[#D4441F] transition-colors"
              >
                Start Shopping →
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.variant?.id}`}
                className="flex gap-3 bg-gray-50 rounded-2xl p-3"
              >
                {/* Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-white shrink-0 border border-gray-100">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] text-[#E8553A] font-semibold font-lato uppercase tracking-wider">
                    {item.product.brand}
                  </p>
                  <h4 className="font-montserrat font-bold text-sm text-[#0A1F44] leading-snug line-clamp-2 mt-0.5">
                    {item.product.name}
                  </h4>
                  {item.variant && (
                    <p className="text-xs text-gray-400 font-lato mt-0.5">
                      {item.variant.size} {item.variant.color}
                    </p>
                  )}

                  <div className="flex items-center justify-between mt-2">
                    {/* Price */}
                    <span className="font-montserrat font-black text-sm text-[#0A1F44]">
                      {formatCurrency(item.product.price * item.quantity)}
                    </span>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.variant?.id,
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:border-[#E8553A] flex items-center justify-center transition-colors"
                      >
                        <MinusIcon size={12} />
                      </button>
                      <span className="w-8 text-center text-sm font-bold font-montserrat text-[#0A1F44]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.variant?.id,
                          )
                        }
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:border-[#E8553A] flex items-center justify-center transition-colors"
                      >
                        <PlusIcon size={12} />
                      </button>

                      {/* Remove */}
                      <button
                        onClick={() =>
                          removeItem(item.product.id, item.variant?.id)
                        }
                        className="w-7 h-7 rounded-lg bg-white border border-gray-200 hover:border-red-300 hover:text-red-500 flex items-center justify-center transition-colors ml-1"
                      >
                        <TrashIcon size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-4 space-y-3 bg-white">
            {/* Order summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm font-lato">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-[#0A1F44] font-semibold">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-lato">
                <span className="text-gray-500">Shipping</span>
                <span
                  className={
                    shipping === 0
                      ? 'text-green-600 font-semibold'
                      : 'text-[#0A1F44] font-semibold'
                  }
                >
                  {shipping === 0 ? 'FREE' : formatCurrency(shipping)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-lato">
                <span className="text-gray-500">GST (18%)</span>
                <span className="text-[#0A1F44] font-semibold">
                  {formatCurrency(tax)}
                </span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-100 pt-2">
                <span className="font-montserrat font-black text-[#0A1F44]">
                  Total
                </span>
                <span className="font-montserrat font-black text-xl text-[#0A1F44]">
                  {formatCurrency(total)}
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="flex items-center justify-center gap-2 w-full bg-[#E8553A] hover:bg-[#D4441F] text-white font-montserrat font-black py-3.5 rounded-xl transition-colors shadow-lg"
            >
              Proceed to Checkout →
            </Link>
            <Link
              href="/cart"
              onClick={onClose}
              className="flex items-center justify-center w-full border border-gray-200 hover:border-[#0A1F44] text-[#0A1F44] font-montserrat font-semibold py-3 rounded-xl transition-colors text-sm"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
'use client'

import { orders } from '@/lib/mockData'
import { formatCurrency, formatDate, getOrderStatusColor } from '@/lib/utils'
import Link from 'next/link'
import { PackageIcon, ChevronRightIcon } from '@/components/ui/Icons'

export default function OrdersPage() {
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
            <span className='text-white'>My Orders</span>
          </div>
          <h1 className='font-montserrat font-black text-3xl text-white'>
            My Orders
          </h1>
          <p className='text-white/70 font-lato mt-1'>{orders.length} orders</p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-4'>
        {orders.length === 0 ? (
          <div className='bg-white rounded-2xl p-16 text-center border border-gray-100'>
            <PackageIcon size={48} className='text-gray-300 mx-auto mb-4' />
            <h2 className='font-montserrat font-bold text-xl text-[#0A1F44] mb-2'>
              No orders yet
            </h2>
            <p className='text-gray-400 font-lato mb-6'>
              Start shopping to see your orders here
            </p>
            <Link
              href='/shop'
              className='bg-[#E8553A] text-white font-montserrat font-bold px-6 py-3 rounded-full hover:bg-[#D4441F] transition-colors'
            >
              Shop Now →
            </Link>
          </div>
        ) : (
          orders.map((order) => (
            <div
              key={order.id}
              className='bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow'
            >
              {/* Order Header */}
              <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 px-6 py-4 border-b border-gray-100 bg-gray-50'>
                <div className='flex items-center gap-4 flex-wrap'>
                  <div>
                    <p className='text-xs text-gray-400 font-lato uppercase tracking-wider'>
                      Order Number
                    </p>
                    <p className='font-montserrat font-black text-[#0A1F44]'>
                      #{order.orderNumber}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 font-lato uppercase tracking-wider'>
                      Placed On
                    </p>
                    <p className='font-lato font-semibold text-[#0A1F44] text-sm'>
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                  <div>
                    <p className='text-xs text-gray-400 font-lato uppercase tracking-wider'>
                      Total
                    </p>
                    <p className='font-montserrat font-black text-[#0A1F44]'>
                      {formatCurrency(order.total)}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-bold font-montserrat ${getOrderStatusColor(order.status)}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              {/* Order Items */}
              <div className='px-6 py-4 space-y-3'>
                {order.items.map((item) => (
                  <div key={item.productId} className='flex items-center gap-3'>
                    <div className='w-12 h-12 rounded-xl bg-gray-100 shrink-0 flex items-center justify-center'>
                      <PackageIcon size={20} className='text-gray-400' />
                    </div>
                    <div className='flex-1 min-w-0'>
                      <p className='font-montserrat font-bold text-sm text-[#0A1F44] truncate'>
                        {item.productName}
                      </p>
                      <p className='text-xs text-gray-400 font-lato'>
                        SKU: {item.sku} · Qty: {item.quantity}
                      </p>
                    </div>
                    <span className='font-montserrat font-black text-sm text-[#0A1F44]'>
                      {formatCurrency(item.total)}
                    </span>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className='flex items-center justify-between px-6 py-3 border-t border-gray-100'>
                <p className='text-xs text-gray-400 font-lato capitalize'>
                  via {order.paymentMethod} · {order.source}
                </p>
                <Link
                  href={`/orders/${order.id}`}
                  className='text-sm font-semibold text-[#E8553A] hover:underline font-lato flex items-center gap-1'
                >
                  View Details
                  <ChevronRightIcon size={14} />
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

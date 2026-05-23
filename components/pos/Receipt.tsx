import { CURRENCY_SYMBOL, SITE_NAME } from '@/lib/constants'
import { POSItem } from '@/store/posStore'

interface Props {
  orderId: string
  items: POSItem[]
  subtotal: number
  discount: number
  discountAmount: number
  gst: number
  total: number
  payMethod: string
  cashier: string
  onNewSale: () => void
  onPrint: () => void
  onEmail: () => void
}

const fmt = (n: number) =>
  CURRENCY_SYMBOL + Math.round(n).toLocaleString('en-IN')

const PAY_LABELS: Record<string, string> = {
  cash:  'Cash',
  card:  'Card',
  upi:   'UPI',
  split: 'Split payment',
}

export default function Receipt({
  orderId,
  items,
  subtotal,
  discount,
  discountAmount,
  gst,
  total,
  payMethod,
  cashier,
  onNewSale,
  onPrint,
  onEmail,
}: Props) {
  const now = new Date()
  const dateStr = now.toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  })
  const timeStr = now.toLocaleTimeString('en-IN', {
    hour: '2-digit', minute: '2-digit',
  })
  const change =
    payMethod === 'cash'
      ? Math.ceil(total / 100) * 100 - total
      : 0

  return (
    <div
      className="flex flex-col h-full items-center justify-center p-6"
      style={{ background: '#F6F6F7' }}
    >
      <div
        className="w-full max-w-sm rounded-xl overflow-hidden"
        style={{
          background: '#FFFFFF',
          border: '1px solid #E1E3E5',
          boxShadow: '0 1px 3px rgba(0,0,0,0.08)',
        }}
      >
        {/* Success header */}
        <div
          className="flex flex-col items-center py-6 px-4"
          style={{ background: '#F2F7F5', borderBottom: '1px solid #E1E3E5' }}
        >
          {/* Check circle SVG */}
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mb-3"
            style={{ background: '#008060' }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>
          <h2
            className="text-lg font-semibold mb-0.5"
            style={{ color: '#202223' }}
          >
            Payment successful
          </h2>
          <p className="text-sm" style={{ color: '#6D7175' }}>
            {PAY_LABELS[payMethod] || payMethod}
            {change > 0 && (
              <span style={{ color: '#008060' }}>
                {' '}· Change: {fmt(change)}
              </span>
            )}
          </p>
        </div>

        {/* Receipt body */}
        <div className="px-5 py-4">
          {/* Store + order info */}
          <div
            className="text-center pb-3 mb-3"
            style={{ borderBottom: '1px dashed #E1E3E5' }}
          >
            <p
              className="text-sm font-semibold"
              style={{ color: '#202223' }}
            >
              {SITE_NAME}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#8C9196' }}>
              {dateStr} · {timeStr}
            </p>
            <p className="text-xs mt-0.5" style={{ color: '#8C9196' }}>
              {orderId} · {cashier}
            </p>
          </div>

          {/* Items */}
          <div
            className="space-y-1.5 pb-3 mb-3"
            style={{ borderBottom: '1px dashed #E1E3E5' }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="flex justify-between text-xs"
                style={{ color: '#6D7175' }}
              >
                <span className="flex-1 truncate pr-2">
                  {item.name}{' '}
                  <span style={{ color: '#8C9196' }}>×{item.quantity}</span>
                </span>
                <span className="flex-shrink-0">
                  {fmt(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="space-y-1.5">
            <div
              className="flex justify-between text-xs"
              style={{ color: '#6D7175' }}
            >
              <span>Subtotal</span>
              <span>{fmt(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div
                className="flex justify-between text-xs"
                style={{ color: '#008060' }}
              >
                <span>Discount ({discount}%)</span>
                <span>-{fmt(discountAmount)}</span>
              </div>
            )}
            <div
              className="flex justify-between text-xs"
              style={{ color: '#6D7175' }}
            >
              <span>GST (18%)</span>
              <span>{fmt(gst)}</span>
            </div>
            <div
              className="flex justify-between pt-2 mt-1"
              style={{ borderTop: '1px solid #E1E3E5' }}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: '#202223' }}
              >
                Total
              </span>
              <span
                className="text-base font-bold"
                style={{ color: '#202223' }}
              >
                {fmt(total)}
              </span>
            </div>
          </div>

          <p
            className="text-center text-xs mt-4"
            style={{ color: '#8C9196' }}
          >
            Thank you for shopping at {SITE_NAME}!
          </p>
        </div>

        {/* Actions */}
        <div
          className="px-4 pb-4 space-y-2"
          style={{ borderTop: '1px solid #E1E3E5', paddingTop: '12px' }}
        >
          {/* Print + Email */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={onPrint}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-colors hover:bg-[#F6F6F7]"
              style={{ borderColor: '#E1E3E5', color: '#6D7175' }}
            >
              {/* Printer SVG */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <polyline points="6 9 6 2 18 2 18 9" />
                <path d="M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2" />
                <rect x="6" y="14" width="12" height="8" />
              </svg>
              Print
            </button>
            <button
              onClick={onEmail}
              className="flex items-center justify-center gap-1.5 py-2 rounded-lg border text-xs font-medium transition-colors hover:bg-[#F6F6F7]"
              style={{ borderColor: '#E1E3E5', color: '#6D7175' }}
            >
              {/* Mail SVG */}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              Email
            </button>
          </div>

          {/* New sale */}
          <button
            onClick={onNewSale}
            className="w-full py-2.5 rounded-lg text-sm font-semibold transition-colors"
            style={{ background: '#008060', color: '#FFFFFF' }}
          >
            New sale
          </button>
        </div>
      </div>
    </div>
  )
}
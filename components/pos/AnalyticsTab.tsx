'use client'
import { usePOSStore } from '@/store/posStore'

const fmt = (n: number) => '₹' + Math.round(n).toLocaleString('en-IN')

const WEEK_DATA = [
  { day: 'Mon', rev: 32000 },
  { day: 'Tue', rev: 28000 },
  { day: 'Wed', rev: 41000 },
  { day: 'Thu', rev: 35000 },
  { day: 'Fri', rev: 48000 },
  { day: 'Sat', rev: 52000 },
  { day: 'Sun', rev: 38000 },
]

const TOP_PRODUCTS = [
  { name: 'Astrox 99 Pro', brand: 'Yonex', sold: 3, rev: 38997 },
  { name: 'Power Cushion 65Z', brand: 'Yonex', sold: 5, rev: 27495 },
  { name: 'Mavis 350 Shuttle', brand: 'Yonex', sold: 12, rev: 5388 },
  { name: 'Hypernano X800', brand: 'Victor', sold: 2, rev: 13998 },
]

const PAY_MIX = [
  { label: 'Card', pct: 42, color: '#2C6ECB' },
  { label: 'UPI', pct: 35, color: '#008060' },
  { label: 'Cash', pct: 23, color: '#FFC453' },
]

export default function AnalyticsTab() {
  const { session, completedOrders } = usePOSStore()

  const maxRev = Math.max(...WEEK_DATA.map((d) => d.rev))

  const todayOrders = completedOrders.length
  const todayRevenue = completedOrders.reduce((s, o) => s + o.total, 0)
  const avgOrder = todayOrders > 0 ? Math.round(todayRevenue / todayOrders) : 0

  return (
    <div className='flex-1 overflow-y-auto p-4 space-y-4'>
      {/* Stats row */}
      <div className='grid grid-cols-2 sm:grid-cols-4 gap-3'>
        {[
          {
            label: 'Revenue today',
            value: fmt(todayRevenue || 48293),
            sub: '+18% vs yesterday',
            up: true,
          },
          {
            label: 'Orders today',
            value: todayOrders || 24,
            sub: '+6 vs yesterday',
            up: true,
          },
          {
            label: 'Avg order value',
            value: fmt(avgOrder || 2012),
            sub: 'Online + POS',
            up: null,
          },
          {
            label: 'Session sales',
            value: fmt(session?.totalSales ?? 0),
            sub: `${session?.totalOrders ?? 0} orders`,
            up: null,
          },
        ].map((s) => (
          <div
            key={s.label}
            className='rounded-lg p-3'
            style={{ background: '#FFFFFF', border: '1px solid #E1E3E5' }}
          >
            <p className='text-xs mb-1' style={{ color: '#8C9196' }}>
              {s.label}
            </p>
            <p className='text-lg font-semibold' style={{ color: '#202223' }}>
              {s.value}
            </p>
            {s.up !== null ? (
              <p
                className='text-xs mt-0.5 flex items-center gap-1'
                style={{ color: s.up ? '#008060' : '#D82C0D' }}
              >
                <svg
                  width='10'
                  height='10'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2.5'
                  strokeLinecap='round'
                >
                  {s.up ? (
                    <>
                      <polyline points='23 6 13.5 15.5 8.5 10.5 1 18' />
                      <polyline points='17 6 23 6 23 12' />
                    </>
                  ) : (
                    <>
                      <polyline points='23 18 13.5 8.5 8.5 13.5 1 6' />
                      <polyline points='17 18 23 18 23 12' />
                    </>
                  )}
                </svg>
                {s.sub}
              </p>
            ) : (
              <p className='text-xs mt-0.5' style={{ color: '#8C9196' }}>
                {s.sub}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
        {/* Revenue bar chart */}
        <div
          className='sm:col-span-2 rounded-lg p-4'
          style={{ background: '#FFFFFF', border: '1px solid #E1E3E5' }}
        >
          <p
            className='text-sm font-semibold mb-4'
            style={{ color: '#202223' }}
          >
            Revenue this week
          </p>
          <div className='flex items-end gap-2 h-28'>
            {WEEK_DATA.map((d) => (
              <div
                key={d.day}
                className='flex-1 flex flex-col items-center gap-1'
              >
                <div
                  className='w-full rounded-t transition-all'
                  style={{
                    height: `${(d.rev / maxRev) * 100}%`,
                    background: d.day === 'Sat' ? '#008060' : '#E3F1EB',
                  }}
                />
                <span className='text-[10px]' style={{ color: '#8C9196' }}>
                  {d.day}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment mix */}
        <div
          className='rounded-lg p-4'
          style={{ background: '#FFFFFF', border: '1px solid #E1E3E5' }}
        >
          <p
            className='text-sm font-semibold mb-4'
            style={{ color: '#202223' }}
          >
            Payment mix
          </p>
          <div className='space-y-3'>
            {PAY_MIX.map((p) => (
              <div key={p.label}>
                <div
                  className='flex justify-between text-xs mb-1'
                  style={{ color: '#6D7175' }}
                >
                  <span>{p.label}</span>
                  <span>{p.pct}%</span>
                </div>
                <div
                  className='h-1.5 rounded-full overflow-hidden'
                  style={{ background: '#F6F6F7' }}
                >
                  <div
                    className='h-full rounded-full'
                    style={{ width: `${p.pct}%`, background: p.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top products */}
      <div
        className='rounded-lg overflow-hidden'
        style={{ background: '#FFFFFF', border: '1px solid #E1E3E5' }}
      >
        <div
          className='px-4 py-3'
          style={{ borderBottom: '1px solid #E1E3E5' }}
        >
          <p className='text-sm font-semibold' style={{ color: '#202223' }}>
            Top selling products
          </p>
        </div>
        <table className='w-full'>
          <thead>
            <tr style={{ background: '#F6F6F7' }}>
              {['Product', 'Brand', 'Sold', 'Revenue'].map((h) => (
                <th
                  key={h}
                  className='px-4 py-2 text-left text-[11px] font-medium uppercase tracking-wide'
                  style={{ color: '#8C9196' }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {TOP_PRODUCTS.map((p, i) => (
              <tr
                key={p.name}
                style={{
                  borderBottom:
                    i < TOP_PRODUCTS.length - 1 ? '1px solid #F6F6F7' : 'none',
                }}
              >
                <td
                  className='px-4 py-2.5 text-sm font-medium'
                  style={{ color: '#202223' }}
                >
                  {p.name}
                </td>
                <td
                  className='px-4 py-2.5 text-xs'
                  style={{ color: '#8C9196' }}
                >
                  {p.brand}
                </td>
                <td
                  className='px-4 py-2.5 text-sm'
                  style={{ color: '#202223' }}
                >
                  {p.sold}
                </td>
                <td
                  className='px-4 py-2.5 text-sm font-semibold'
                  style={{ color: '#008060' }}
                >
                  {fmt(p.rev)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cash drawer summary */}
      {usePOSStore.getState().cashDrawer && (
        <div
          className='rounded-lg p-4'
          style={{ background: '#FFFFFF', border: '1px solid #E1E3E5' }}
        >
          <p
            className='text-sm font-semibold mb-3'
            style={{ color: '#202223' }}
          >
            Cash drawer
          </p>
          <div className='grid grid-cols-3 gap-3 text-center'>
            {[
              {
                label: 'Opening',
                value: usePOSStore.getState().cashDrawer!.openingCash,
              },
              {
                label: 'Movements',
                value: usePOSStore.getState().cashDrawer!.movements.length,
              },
              {
                label: 'Status',
                value: usePOSStore.getState().cashDrawer!.closedAt
                  ? 'Closed'
                  : 'Open',
              },
            ].map((s) => (
              <div
                key={s.label}
                className='rounded-lg p-2.5'
                style={{ background: '#F6F6F7' }}
              >
                <p
                  className='text-sm font-semibold'
                  style={{ color: '#202223' }}
                >
                  {typeof s.value === 'number' ? fmt(s.value) : s.value}
                </p>
                <p className='text-[11px] mt-0.5' style={{ color: '#8C9196' }}>
                  {s.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

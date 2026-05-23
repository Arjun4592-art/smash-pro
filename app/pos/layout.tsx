import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Apex Sport POS',
  description: 'Point of Sale terminal for Apex Sport',
}

export default function POSLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${inter.variable} font-sans`}
      style={{
        background: '#F6F6F7',
        minHeight: '100vh',
      }}
    >
      {children}
    </div>
  )
}

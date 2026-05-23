import { Suspense } from 'react'
import ShopClient from './ShopClient'

export const metadata = {
  title: 'Shop All Products',
  description:
    'Browse premium sports equipment for football, cricket, basketball, tennis and more.',
}

export default function ShopPage() {
  return (
    <Suspense fallback={<div className='min-h-screen bg-white' />}>
      <ShopClient />
    </Suspense>
  )
}

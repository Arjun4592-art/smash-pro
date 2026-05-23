import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts } from '@/lib/mockData'
import ProductDetailClient from './ProductDetailClient'
import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL } from '@/lib/constants'
import { generateProductSchema } from '@/lib/seo'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProductBySlug(params.slug)
  if (!product) return { title: 'Product Not Found' }
  return {
    title: product.seo?.title ?? `${product.name} | ${SITE_NAME}`,
    description: product.seo?.description ?? product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.images[0], width: 800, height: 800 }],
      url: `${SITE_URL}/shop/${product.slug}`,
    },
  }
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug)
  console.log('Product:', product)
  if (!product) notFound()
  const related = getRelatedProducts(product, 4)

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateProductSchema(product)),
        }}
      />
      <ProductDetailClient product={product} related={related} />
    </>
  )
}

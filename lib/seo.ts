import type { Metadata } from 'next'
import { SITE_NAME, SITE_URL, SITE_OG_IMAGE, DEFAULT_SEO } from './constants'
import type { Product, SEOMeta } from '@/types'

// ─── Base metadata generator ────────────────────────────────────
export function generateMetadata(seo: Partial<SEOMeta>): Metadata {
  const title = seo.title ? `${seo.title} | ${SITE_NAME}` : DEFAULT_SEO.title

  const description = seo.description ?? DEFAULT_SEO.description
  const ogImage = seo.ogImage ?? SITE_OG_IMAGE
  const canonical = seo.canonical ?? SITE_URL

  return {
    title,
    description,
    keywords: seo.keywords?.join(', ') ?? DEFAULT_SEO.keywords.join(', '),
    metadataBase: new URL(SITE_URL),
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: (seo.ogType as 'website' | 'article') ?? 'website',
      locale: 'en_IN',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
    robots: seo.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  }
}

// ─── Product page metadata ──────────────────────────────────────
export function generateProductMetadata(product: Product): Metadata {
  const title = product.seo?.title ?? product.name
  const description =
    product.seo?.description ??
    `Buy ${product.name} by ${product.brand}. ${product.description.slice(0, 120)}`

  return generateMetadata({
    title,
    description,
    keywords: [
      ...(product.seo?.keywords ?? []),
      product.name,
      product.brand,
      product.sport,
      'sports equipment',
      'buy online india',
    ],
    ogImage: product.images?.[0] ?? SITE_OG_IMAGE,
    ogType: 'product',
    canonical: `${SITE_URL}/shop/product/${product.slug}`,
  })
}

// ─── Sport category metadata ────────────────────────────────────
export function generateCategoryMetadata(sport: string): Metadata {
  return generateMetadata({
    title: `${sport} Equipment & Gear`,
    description: `Shop premium ${sport.toLowerCase()} equipment and gear at Apex Sport. Professional quality products for every level.`,
    keywords: [
      `${sport.toLowerCase()} equipment`,
      `${sport.toLowerCase()} gear`,
      `buy ${sport.toLowerCase()} online`,
      'india sports shop',
      'apex sport',
    ],
    canonical: `${SITE_URL}/shop/${sport.toLowerCase()}`,
  })
}

// ─── JSON-LD schemas ────────────────────────────────────────────
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/icons/logo.png`,
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+91-98765-43210',
      contactType: 'customer service',
      areaServed: 'IN',
      availableLanguage: ['English', 'Hindi'],
    },
    sameAs: [
      'https://www.instagram.com/apexsport',
      'https://www.facebook.com/apexsport',
      'https://twitter.com/apexsport',
    ],
  }
}

export function generateProductSchema(product: Product) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'INR',
      availability: product.inStock
        ? 'https://schema.org/InStock'
        : 'https://schema.org/OutOfStock',
      url: `${SITE_URL}/shop/product/${product.slug}`,
      seller: {
        '@type': 'Organization',
        name: SITE_NAME,
      },
    },
    aggregateRating:
      product.reviewCount > 0
        ? {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
            bestRating: 5,
            worstRating: 1,
          }
        : undefined,
    image: product.images,
    sku: product.sku,
  }
}

export function generateBreadcrumbSchema(
  crumbs: { label: string; href: string }[],
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.label,
      item: `${SITE_URL}${crumb.href}`,
    })),
  }
}

export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/shop?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  }
}

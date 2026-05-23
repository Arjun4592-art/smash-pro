import type { MetadataRoute } from 'next'
import { SITE_URL, SPORTS } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: SITE_URL, priority: 1.0, changeFrequency: 'daily' as const },
    {
      url: `${SITE_URL}/shop`,
      priority: 0.9,
      changeFrequency: 'daily' as const,
    },
    {
      url: `${SITE_URL}/cart`,
      priority: 0.5,
      changeFrequency: 'never' as const,
    },
    {
      url: `${SITE_URL}/checkout`,
      priority: 0.5,
      changeFrequency: 'never' as const,
    },
    {
      url: `${SITE_URL}/about`,
      priority: 0.6,
      changeFrequency: 'monthly' as const,
    },
  ]

  const sportPages = SPORTS.map((sport) => ({
    url: `${SITE_URL}/shop/${sport.slug}`,
    priority: 0.8,
    changeFrequency: 'weekly' as const,
  }))

  return [
    ...staticPages.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
    ...sportPages.map((page) => ({
      url: page.url,
      lastModified: new Date(),
      changeFrequency: page.changeFrequency,
      priority: page.priority,
    })),
  ]
}

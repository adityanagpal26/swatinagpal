import type { MetadataRoute } from 'next'
import { absoluteUrl } from '@/lib/seo'
import { getPayloadInstance } from '@/lib/payload'

export const revalidate = 3600

const STATIC_ROUTES: { path: string; priority: number; changeFrequency: 'monthly' | 'weekly' | 'daily' }[] = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/services', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/articles', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/book', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.7, changeFrequency: 'monthly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticEntries: MetadataRoute.Sitemap = STATIC_ROUTES.map((r) => ({
    url: absoluteUrl(r.path),
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  let articleEntries: MetadataRoute.Sitemap = []
  try {
    const payload = await getPayloadInstance()
    const { docs } = await payload.find({
      collection: 'articles',
      limit: 500,
      depth: 0,
      sort: '-publishedAt',
    })
    articleEntries = docs
      .filter((d: any) => d.slug)
      .map((d: any) => ({
        url: absoluteUrl(`/articles/${d.slug}`),
        lastModified: d.updatedAt ? new Date(d.updatedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
  } catch (err) {
    console.warn('[sitemap] Could not load articles', err)
  }

  return [...staticEntries, ...articleEntries]
}

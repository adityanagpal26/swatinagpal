import { SITE } from './utils'

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'http://localhost:3000'

export const SITE_NAME = 'Dr. Swati Nagpal Physiotherapy'

export const SITE_DESCRIPTION =
  'Dr. Swati Nagpal (PT) — MPT Musculoskeletal & Dry Needling Specialist with 8+ years of experience. Expert physiotherapy for neck, back, shoulder, knee, ankle and joint pain.'

export const SITE_KEYWORDS = [
  'physiotherapist',
  'physiotherapy',
  'Dr. Swati Nagpal',
  'MPT Musculoskeletal',
  'dry needling specialist',
  'musculoskeletal physiotherapy',
  'neck pain treatment',
  'back pain treatment',
  'shoulder pain treatment',
  'knee pain treatment',
  'arthritis physiotherapy',
  'tendonitis treatment',
  'sprain physiotherapy',
  'manual therapy',
  'sports injury rehabilitation',
  'posture correction',
  'India physiotherapist',
]

export const absoluteUrl = (path = '/'): string =>
  `${SITE_URL}${path.startsWith('/') ? path : `/${path}`}`

/** Build canonical + OpenGraph metadata for a page. */
export function pageMetadata({
  title,
  description,
  path,
  ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
  noindex = false,
  keywords,
}: {
  title: string
  description: string
  path: string
  ogImage?: string
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  noindex?: boolean
  keywords?: string[]
}) {
  const url = absoluteUrl(path)
  const image = ogImage || absoluteUrl('/opengraph-image')

  return {
    title,
    description,
    keywords: keywords && keywords.length > 0 ? keywords : SITE_KEYWORDS,
    alternates: { canonical: url },
    robots: noindex
      ? { index: false, follow: false, nocache: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, 'max-image-preview': 'large' as const, 'max-video-preview': -1, 'max-snippet': -1 } },
    openGraph: {
      type,
      url,
      title,
      description,
      siteName: SITE_NAME,
      locale: 'en_IN',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      ...(type === 'article' && publishedTime
        ? { publishedTime, modifiedTime: modifiedTime || publishedTime, authors: [SITE.doctor.name] }
        : {}),
    },
    twitter: {
      card: 'summary_large_image' as const,
      title,
      description,
      images: [image],
    },
  }
}

import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from '@/lib/seo'
import { SITE } from '@/lib/utils'

type JsonLdProps = { data: Record<string, unknown> | Record<string, unknown>[] }

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // Server-rendered string; safe because we control the input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Physician + MedicalBusiness identity used site-wide. */
export function physicianSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': ['Physician', 'MedicalBusiness'],
    '@id': absoluteUrl('/#physician'),
    name: SITE.doctor.name,
    alternateName: 'Dr. Swati Nagpal',
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/'),
    image: absoluteUrl('/opengraph-image'),
    medicalSpecialty: ['PhysicalTherapy', 'Musculoskeletal'],
    knowsAbout: [
      'Musculoskeletal Physiotherapy',
      'Dry Needling',
      'Manual Therapy',
      'Sports Injury Rehabilitation',
      'Posture Correction',
      'Chronic Pain Management',
    ],
    telephone: SITE.doctor.phone,
    email: SITE.doctor.email,
    priceRange: '₹₹',
    hasCredential: [
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'MPT Musculoskeletal' },
      { '@type': 'EducationalOccupationalCredential', credentialCategory: 'Dry Needling Specialist' },
    ],
    sameAs: [],
  }
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': absoluteUrl('/#website'),
    url: absoluteUrl('/'),
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: 'en-IN',
    publisher: { '@id': absoluteUrl('/#physician') },
  }
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.href),
    })),
  }
}

export function articleSchema({
  title,
  description,
  slug,
  publishedAt,
  updatedAt,
  imageUrl,
}: {
  title: string
  description?: string
  slug: string
  publishedAt?: string
  updatedAt?: string
  imageUrl?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    mainEntityOfPage: { '@type': 'WebPage', '@id': absoluteUrl(`/articles/${slug}`) },
    headline: title,
    description: description || SITE_DESCRIPTION,
    image: imageUrl ? [imageUrl] : [absoluteUrl('/opengraph-image')],
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: { '@type': 'Person', name: SITE.doctor.name, url: absoluteUrl('/about') },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      logo: { '@type': 'ImageObject', url: absoluteUrl('/opengraph-image') },
    },
  }
}

export function medicalServiceSchema(serviceName: string, description?: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalTherapy',
    name: serviceName,
    description,
    provider: { '@id': absoluteUrl('/#physician') },
  }
}

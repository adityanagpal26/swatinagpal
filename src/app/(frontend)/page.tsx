import type { Metadata } from 'next'
import { Hero } from '@/components/Hero'
import { Highlights } from '@/components/Highlights'
import { Testimonials } from '@/components/Testimonials'
import { LatestArticles } from '@/components/LatestArticles'
import { JsonLd, medicalServiceSchema } from '@/components/StructuredData'
import { pageMetadata } from '@/lib/seo'
import { SITE } from '@/lib/utils'

export const metadata: Metadata = pageMetadata({
  title: `${SITE.doctor.name} — Musculoskeletal Physiotherapist | MPT, DN Specialist`,
  description:
    'Expert physiotherapy by Dr. Swati Nagpal (MPT Musculoskeletal, Dry Needling Specialist). 8+ years treating neck, back, shoulder, knee and joint pain. Book an appointment today.',
  path: '/',
})

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <Testimonials />
      <LatestArticles />
      <JsonLd
        data={[
          medicalServiceSchema(
            'Musculoskeletal Physiotherapy',
            'Comprehensive assessment and treatment of musculoskeletal conditions.'
          ),
          medicalServiceSchema(
            'Dry Needling',
            'Precise dry needling for myofascial trigger points and chronic pain relief.'
          ),
          medicalServiceSchema(
            'Manual Therapy',
            'Hands-on joint mobilisation and soft tissue release.'
          ),
        ]}
      />
    </>
  )
}

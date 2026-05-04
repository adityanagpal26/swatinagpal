import type { Metadata } from 'next'
import { getPayloadInstance } from '@/lib/payload'
import {
  CONDITION_OPTIONS,
  SYMPTOM_OPTIONS,
} from '@/collections/Treatments'
import { ServicesClient } from './ServicesClient'
import { pageMetadata } from '@/lib/seo'
import { JsonLd, breadcrumbSchema } from '@/components/StructuredData'

export const metadata: Metadata = pageMetadata({
  title: 'Services & Conditions Treated',
  description:
    'Physiotherapy treatments for neck pain, back pain, shoulder pain, knee pain, ankle pain, leg pain, arthritis, tendonitis and sprain/strain. Personalised plans by Dr. Swati Nagpal.',
  path: '/services',
  keywords: [
    'physiotherapy services',
    'neck pain treatment',
    'back pain treatment',
    'shoulder pain treatment',
    'knee pain treatment',
    'ankle pain treatment',
    'leg pain treatment',
    'arthritis treatment',
    'tendonitis treatment',
    'sprain strain treatment',
    'manual therapy',
    'dry needling',
  ],
})

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  let docs: any[] = []
  try {
    const payload = await getPayloadInstance()
    const result = await payload.find({ collection: 'treatments', limit: 200 })
    docs = result.docs
  } catch (err) {
    console.warn('[ServicesPage] Could not load treatments', err)
  }

  const treatments = docs.map((d: any) => ({
    id: String(d.id),
    symptom: d.symptom,
    condition: d.condition,
    recommendedTreatment: d.recommendedTreatment,
    description: d.description,
  }))

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Services', href: '/services' },
        ])}
      />
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
          Services & Conditions
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Find the right treatment for you
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Select your symptoms and conditions to see recommended physiotherapy treatments.
        </p>
      </div>

      <div className="mt-12">
        <ServicesClient
          symptomOptions={SYMPTOM_OPTIONS as unknown as { label: string; value: string }[]}
          conditionOptions={CONDITION_OPTIONS as unknown as { label: string; value: string }[]}
          treatments={treatments}
        />
      </div>
    </section>
    </>
  )
}

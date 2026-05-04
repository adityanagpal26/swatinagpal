import { Activity, HeartPulse, Sparkles, Stethoscope } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const items = [
  {
    icon: Stethoscope,
    title: 'Expert Diagnosis',
    desc: 'Detailed musculoskeletal assessment to find the root cause of your pain.',
  },
  {
    icon: Activity,
    title: 'Manual Therapy',
    desc: 'Hands-on techniques including joint mobilisation, soft tissue release & stretching.',
  },
  {
    icon: Sparkles,
    title: 'Dry Needling (DN)',
    desc: 'Targeted dry needling to release trigger points and accelerate recovery.',
  },
  {
    icon: HeartPulse,
    title: 'Tailored Recovery',
    desc: 'Personalised exercise plans and posture correction to prevent recurrence.',
  },
]

export function Highlights() {
  return (
    <section className="container py-16 md:py-20">
      <SectionHeading
        eyebrow="Specializations"
        title="Comprehensive physiotherapy care"
        description="Evidence-based techniques for lasting relief and improved mobility."
      />
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 transition group-hover:bg-brand-600 group-hover:text-white">
              <Icon className="h-6 w-6" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">{title}</h3>
            <p className="mt-1 text-sm text-slate-600">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

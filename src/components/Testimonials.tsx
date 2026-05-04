import { Quote, Star } from 'lucide-react'
import { SectionHeading } from './SectionHeading'

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Chronic Back Pain',
    text:
      'After 6 sessions with Dr. Swati, my chronic back pain is finally gone. Her expertise in dry needling is incredible.',
  },
  {
    name: 'Rajesh Kumar',
    role: 'Frozen Shoulder',
    text:
      'I had limited shoulder mobility for months. Dr. Swati’s personalised therapy plan helped me regain full range in weeks.',
  },
  {
    name: 'Anita Devi',
    role: 'Knee Arthritis',
    text:
      'Compassionate, knowledgeable and very effective. My knee pain has reduced dramatically. Highly recommended.',
  },
]

export function Testimonials() {
  return (
    <section className="bg-brand-50/40 py-16 md:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Patient Stories"
          title="What our patients say"
          description="Real recoveries from real people we’ve helped."
        />
        <div className="grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="rounded-2xl border border-brand-100 bg-white p-6 shadow-sm"
            >
              <Quote className="h-6 w-6 text-brand-300" />
              <blockquote className="mt-3 text-slate-700">{t.text}</blockquote>
              <div className="mt-4 flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <figcaption className="mt-3 text-sm">
                <div className="font-semibold text-slate-900">{t.name}</div>
                <div className="text-slate-500">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

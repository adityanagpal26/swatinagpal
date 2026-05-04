import type { Metadata } from 'next'
import { Phone, MessageCircle } from 'lucide-react'
import { BookingForm } from './BookingForm'
import { SITE, telLink, whatsappLink } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Book Appointment',
  description: `Book a physiotherapy appointment with ${SITE.doctor.name}.`,
}

export default function BookPage() {
  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
          Book Appointment
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Schedule a visit
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Fill in the form below and we’ll confirm your appointment with {SITE.doctor.name}.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1fr_320px]">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <BookingForm />
        </div>

        <aside className="space-y-5">
          <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-6">
            <h3 className="font-semibold text-slate-900">Need to talk first?</h3>
            <p className="mt-1 text-sm text-slate-600">
              Call or WhatsApp us directly — we’re happy to help.
            </p>
            <div className="mt-4 space-y-2">
              <a
                href={telLink()}
                className="flex items-center gap-2 text-sm font-semibold text-brand-700 hover:underline"
              >
                <Phone className="h-4 w-4" /> {SITE.doctor.phone}
              </a>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm font-semibold text-emerald-700 hover:underline"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="font-semibold text-slate-900">What to expect</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>• Detailed musculoskeletal assessment</li>
              <li>• Personalised treatment plan</li>
              <li>• Manual therapy & dry needling (as needed)</li>
              <li>• Home exercise program</li>
            </ul>
          </div>
        </aside>
      </div>
    </section>
  )
}

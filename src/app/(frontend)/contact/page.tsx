import type { Metadata } from 'next'
import Link from 'next/link'
import { Phone, MessageCircle, Mail, CalendarCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, telLink, whatsappLink } from '@/lib/utils'
import { pageMetadata } from '@/lib/seo'
import { JsonLd, breadcrumbSchema } from '@/components/StructuredData'

export const metadata: Metadata = pageMetadata({
  title: 'Contact Dr. Swati Nagpal — Call, WhatsApp & Email',
  description: `Get in touch with ${SITE.doctor.name}. Call ${SITE.doctor.phone}, message on WhatsApp, or email ${SITE.doctor.email}.`,
  path: '/contact',
})

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', href: '/' },
          { name: 'Contact', href: '/contact' },
        ])}
      />
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
          Contact
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Get in touch
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Have a question or want to schedule a session? Reach out via your preferred channel.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-4xl gap-5 md:grid-cols-2">
        <a
          href={telLink()}
          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
            <Phone className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Call directly</h3>
            <p className="mt-1 text-sm text-slate-600">{SITE.doctor.phone}</p>
            <span className="mt-2 inline-block text-sm font-semibold text-brand-700">
              Click to call →
            </span>
          </div>
        </a>

        <a
          href={whatsappLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-[#25D366]/40 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#25D366]/10 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white">
            <MessageCircle className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">WhatsApp</h3>
            <p className="mt-1 text-sm text-slate-600">Chat instantly with the clinic</p>
            <span className="mt-2 inline-block text-sm font-semibold text-[#1ebe5b]">
              Open chat →
            </span>
          </div>
        </a>

        <a
          href={`mailto:${SITE.doctor.email}`}
          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
            <Mail className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Email</h3>
            <p className="mt-1 text-sm text-slate-600 break-all">{SITE.doctor.email}</p>
            <span className="mt-2 inline-block text-sm font-semibold text-brand-700">
              Send a message →
            </span>
          </div>
        </a>

        <Link
          href="/book"
          className="group flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:border-brand-200 hover:shadow-md"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-brand-700 group-hover:bg-brand-600 group-hover:text-white">
            <CalendarCheck className="h-6 w-6" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Book online</h3>
            <p className="mt-1 text-sm text-slate-600">Request a date and time online</p>
            <span className="mt-2 inline-block text-sm font-semibold text-brand-700">
              Open form →
            </span>
          </div>
        </Link>
      </div>

      <div className="mx-auto mt-12 max-w-4xl rounded-2xl border border-brand-100 bg-brand-50/40 p-6 text-center">
        <h3 className="text-lg font-semibold text-slate-900">Prefer a quick chat?</h3>
        <p className="mt-1 text-sm text-slate-600">
          WhatsApp is the fastest way to reach us during clinic hours.
        </p>
        <div className="mt-4 flex justify-center gap-3">
          <Button asChild variant="whatsapp">
            <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
              <MessageCircle className="h-4 w-4" /> WhatsApp Now
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href={telLink()}>
              <Phone className="h-4 w-4" /> Call
            </a>
          </Button>
        </div>
      </div>
    </section>
    </>
  )
}

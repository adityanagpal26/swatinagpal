import Link from 'next/link'
import { Phone, Mail, MessageCircle, Stethoscope } from 'lucide-react'
import { SITE, telLink, whatsappLink } from '@/lib/utils'

export function Footer() {
  return (
    <footer className="border-t border-brand-100 bg-brand-50/40 mt-16">
      <div className="container grid gap-8 py-12 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2 font-semibold text-brand-700">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-brand-100">
              <Stethoscope className="h-5 w-5" />
            </span>
            <span>{SITE.doctor.name}</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-slate-600">
            {SITE.doctor.qualification} — {SITE.doctor.experience} of expert physiotherapy
            care for musculoskeletal recovery.
          </p>
        </div>
        <div className="text-sm">
          <h4 className="mb-3 font-semibold text-slate-900">Quick Links</h4>
          <ul className="space-y-2 text-slate-600">
            <li><Link href="/about" className="hover:text-brand-700">About</Link></li>
            <li><Link href="/services" className="hover:text-brand-700">Services</Link></li>
            <li><Link href="/articles" className="hover:text-brand-700">Articles</Link></li>
            <li><Link href="/book" className="hover:text-brand-700">Book Appointment</Link></li>
            <li><Link href="/contact" className="hover:text-brand-700">Contact</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <h4 className="mb-3 font-semibold text-slate-900">Contact</h4>
          <ul className="space-y-2 text-slate-600">
            <li>
              <a href={telLink()} className="inline-flex items-center gap-2 hover:text-brand-700">
                <Phone className="h-4 w-4" /> {SITE.doctor.phone}
              </a>
            </li>
            <li>
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-brand-700"
              >
                <MessageCircle className="h-4 w-4" /> WhatsApp
              </a>
            </li>
            <li>
              <a
                href={`mailto:${SITE.doctor.email}`}
                className="inline-flex items-center gap-2 hover:text-brand-700"
              >
                <Mail className="h-4 w-4" /> {SITE.doctor.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-brand-100 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.doctor.name}. All rights reserved.
      </div>
    </footer>
  )
}

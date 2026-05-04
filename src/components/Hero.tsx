import Link from 'next/link'
import Image from 'next/image'
import { CalendarCheck, MessageCircle, ShieldCheck, Award } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { SITE, whatsappLink } from '@/lib/utils'

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      <div className="container grid gap-10 py-16 md:grid-cols-2 md:items-center md:py-24">
        <div className="animate-fade-in">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
            <ShieldCheck className="h-4 w-4" /> Trusted Musculoskeletal Care
          </span>
          <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Move better. <span className="text-brand-600">Live pain-free.</span>
          </h1>
          <p className="mt-5 max-w-xl text-lg text-slate-600">
            {SITE.doctor.name} — {SITE.doctor.qualification}. {SITE.doctor.experience} of
            specialised physiotherapy for neck, back, shoulder, knee, and joint conditions.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link href="/book">
                <CalendarCheck className="h-5 w-5" /> Book Appointment
              </Link>
            </Button>
            <Button asChild size="lg" variant="whatsapp">
              <a href={whatsappLink()} target="_blank" rel="noopener noreferrer">
                <MessageCircle className="h-5 w-5" /> Contact on WhatsApp
              </a>
            </Button>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:max-w-md">
            <div className="rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-brand-700">
                <Award className="h-5 w-5" />
                <span className="text-sm font-semibold">Experience</span>
              </div>
              <div className="mt-1 text-2xl font-bold text-slate-900">8+ Years</div>
            </div>
            <div className="rounded-xl border border-brand-100 bg-white p-4 shadow-sm">
              <div className="flex items-center gap-2 text-brand-700">
                <ShieldCheck className="h-5 w-5" />
                <span className="text-sm font-semibold">Specialty</span>
              </div>
              <div className="mt-1 text-base font-semibold text-slate-900">
                Musculoskeletal & Dry Needling
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-100 to-brand-50 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&w=1200&q=80"
              alt="Physiotherapist treating a patient"
              width={1200}
              height={1200}
              priority
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

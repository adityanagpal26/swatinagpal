import Image from 'next/image'
import type { Metadata } from 'next'
import { GraduationCap, Award, Briefcase, ShieldCheck } from 'lucide-react'
import { SITE } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'About',
  description:
    'Learn about Dr. Swati Nagpal — MPT Musculoskeletal, Dry Needling Specialist with 8 years of clinical experience.',
}

const qualifications = [
  {
    icon: GraduationCap,
    title: 'MPT — Musculoskeletal',
    desc: 'Master of Physiotherapy specialising in orthopaedic and musculoskeletal conditions.',
  },
  {
    icon: Award,
    title: 'Dry Needling Specialist',
    desc: 'Certified in dry needling — a precise, evidence-based technique for myofascial pain.',
  },
  {
    icon: Briefcase,
    title: '8 Years of Experience',
    desc: 'Hands-on clinical experience treating diverse musculoskeletal conditions.',
  },
  {
    icon: ShieldCheck,
    title: 'Patient-Centred Care',
    desc: 'Personalised treatment plans focused on long-term recovery and pain prevention.',
  },
]

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-brand-50 to-white py-16 md:py-20">
        <div className="container grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              About {SITE.doctor.name}
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              A musculoskeletal physiotherapist with a passion for restoring movement and
              eliminating pain through evidence-based, hands-on care.
            </p>
            <p className="mt-4 text-slate-600">
              With over <strong>{SITE.doctor.experience}</strong> of experience treating
              patients across all age groups, Dr. Swati combines manual therapy, dry needling,
              and tailored rehabilitation programs to deliver lasting results. Every treatment
              starts with a thorough assessment to identify the root cause — not just the
              symptoms.
            </p>
            <p className="mt-4 text-slate-600">
              Her clinical interests include chronic neck and back pain, sports injuries,
              post-surgical rehabilitation, joint mobility issues, and posture-related
              disorders.
            </p>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-100 to-brand-50 blur-2xl" />
            <div className="relative overflow-hidden rounded-[2rem] border border-brand-100 bg-white shadow-xl">
              <Image
                src="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=1000&q=80"
                alt="Physiotherapy treatment session"
                width={1000}
                height={1100}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="container py-16 md:py-20">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Qualifications & Expertise
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {qualifications.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-100 text-brand-700">
                <Icon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{title}</h3>
                <p className="mt-1 text-sm text-slate-600">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container pb-16 md:pb-20">
        <div className="rounded-2xl border border-brand-100 bg-brand-50/50 p-8 md:p-12">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">My Approach</h2>
          <p className="mt-3 text-slate-700">
            I believe healing isn’t just about treating pain — it’s about understanding the body
            holistically. My approach combines:
          </p>
          <ul className="mt-4 grid gap-2 text-slate-700 sm:grid-cols-2">
            <li>• Detailed clinical assessment</li>
            <li>• Manual therapy & joint mobilisation</li>
            <li>• Dry needling for trigger point release</li>
            <li>• Therapeutic exercises tailored to you</li>
            <li>• Posture correction & ergonomic guidance</li>
            <li>• Patient education for long-term wellness</li>
          </ul>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFab } from '@/components/WhatsAppFab'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Dr. Swati Nagpal (PT) — Musculoskeletal Physiotherapist',
    template: '%s — Dr. Swati Nagpal Physio',
  },
  description:
    'Dr. Swati Nagpal — MPT Musculoskeletal, DN Specialist with 8 years of experience. Expert physiotherapy for neck, back, shoulder, knee and joint pain.',
  openGraph: {
    title: 'Dr. Swati Nagpal (PT) — Musculoskeletal Physiotherapist',
    description:
      'Expert physiotherapy for neck, back, shoulder, knee and joint pain. Book an appointment today.',
    type: 'website',
  },
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  )
}

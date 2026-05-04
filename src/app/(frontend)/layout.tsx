import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/Navbar'
import { Footer } from '@/components/Footer'
import { WhatsAppFab } from '@/components/WhatsAppFab'
import {
  JsonLd,
  physicianSchema,
  websiteSchema,
} from '@/components/StructuredData'
import {
  SITE_DESCRIPTION,
  SITE_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  absoluteUrl,
} from '@/lib/seo'
import { SITE } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'], display: 'swap' })

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE.doctor.name} — Musculoskeletal Physiotherapist | MPT, DN Specialist`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: SITE_KEYWORDS,
  authors: [{ name: SITE.doctor.name }],
  creator: SITE.doctor.name,
  publisher: SITE_NAME,
  alternates: { canonical: absoluteUrl('/') },
  applicationName: SITE_NAME,
  category: 'health',
  formatDetection: { telephone: true, email: true, address: true },
  openGraph: {
    type: 'website',
    url: absoluteUrl('/'),
    siteName: SITE_NAME,
    title: `${SITE.doctor.name} — Musculoskeletal Physiotherapist`,
    description: SITE_DESCRIPTION,
    locale: 'en_IN',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.doctor.name} — Musculoskeletal Physiotherapist`,
    description: SITE_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-video-preview': -1,
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-icon.png',
  },
  manifest: '/manifest.webmanifest',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#016fb9' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function FrontendLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>
      <body className="min-h-screen bg-white text-slate-800 antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-brand-700 focus:shadow"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main" className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
        <WhatsAppFab />
        <JsonLd data={[physicianSchema(), websiteSchema()]} />
      </body>
    </html>
  )
}

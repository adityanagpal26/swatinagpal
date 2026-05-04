/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import { RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import '@payloadcms/next/css'
import './custom.scss'

export const metadata: Metadata = {
  title: 'Admin — Dr. Swati Nagpal Physio',
  description: 'Content management for Dr. Swati Nagpal Physio',
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootLayout config={config}>{children}</RootLayout>
}

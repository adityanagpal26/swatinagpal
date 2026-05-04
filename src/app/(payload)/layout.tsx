/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next'
import type { ServerFunctionClient } from 'payload'
import { handleServerFunctions, RootLayout } from '@payloadcms/next/layouts'
import config from '@payload-config'
import '@payloadcms/next/css'
import './custom.scss'
import { importMap } from './admin/importMap.js'

export const metadata: Metadata = {
  title: 'Admin — Dr. Swati Nagpal Physio',
  description: 'Content management for Dr. Swati Nagpal Physio',
  robots: { index: false, follow: false, nocache: true },
}

const serverFunction: ServerFunctionClient = async function (args) {
  'use server'
  return handleServerFunctions({
    ...args,
    config,
    importMap,
  })
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
      {children}
    </RootLayout>
  )
}

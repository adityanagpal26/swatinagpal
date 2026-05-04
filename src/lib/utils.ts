import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const SITE = {
  doctor: {
    name: 'Dr. Swati Nagpal (PT)',
    qualification: 'MPT Musculoskeletal, DN Specialist',
    experience: '8 years',
    phone: process.env.NEXT_PUBLIC_DOCTOR_PHONE || '+917005454553',
    whatsapp: process.env.NEXT_PUBLIC_DOCTOR_WHATSAPP || '917005454553',
    email: process.env.NEXT_PUBLIC_DOCTOR_EMAIL || 'nagpals855@gmail.com',
  },
}

export const whatsappLink = (message?: string) => {
  const text = message ?? 'Hello Doctor, I want to book an appointment.'
  return `https://wa.me/${SITE.doctor.whatsapp}?text=${encodeURIComponent(text)}`
}

export const telLink = () => `tel:${SITE.doctor.phone}`

export function formatDate(input: string | Date): string {
  const date = typeof input === 'string' ? new Date(input) : input
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}

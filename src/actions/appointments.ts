'use server'

import { z } from 'zod'
import { getPayloadInstance } from '@/lib/payload'
import { sendAppointmentEmail } from '@/lib/email'

const ISSUE_VALUES = [
  'neck-pain',
  'shoulder-pain',
  'back-pain',
  'knee-pain',
  'ankle-pain',
  'leg-pain',
  'arthritis',
  'tendonitis',
  'sprain-strain',
  'other',
] as const

const ISSUE_LABELS: Record<(typeof ISSUE_VALUES)[number], string> = {
  'neck-pain': 'Neck pain',
  'shoulder-pain': 'Shoulder pain',
  'back-pain': 'Back pain',
  'knee-pain': 'Knee pain',
  'ankle-pain': 'Ankle pain',
  'leg-pain': 'Leg pain',
  arthritis: 'Arthritis',
  tendonitis: 'Tendonitis',
  'sprain-strain': 'Sprain / Strain',
  other: 'Other',
}

const Schema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.'),
  phone: z
    .string()
    .trim()
    .min(7, 'Please enter a valid phone number.')
    .max(20),
  email: z.string().trim().email('Please enter a valid email.'),
  issue: z.enum(ISSUE_VALUES, { errorMap: () => ({ message: 'Please select an issue.' }) }),
  message: z.string().trim().max(2000).optional().or(z.literal('')),
  datetime: z
    .string()
    .min(1, 'Please choose a preferred date & time.')
    .refine((v) => !Number.isNaN(new Date(v).getTime()), 'Invalid date.'),
})

export type AppointmentFormState =
  | { status: 'idle' }
  | { status: 'success'; message: string }
  | { status: 'error'; message: string; fieldErrors?: Record<string, string> }

export async function submitAppointment(
  _prev: AppointmentFormState,
  formData: FormData
): Promise<AppointmentFormState> {
  const raw = {
    name: String(formData.get('name') || ''),
    phone: String(formData.get('phone') || ''),
    email: String(formData.get('email') || ''),
    issue: String(formData.get('issue') || ''),
    message: String(formData.get('message') || ''),
    datetime: String(formData.get('datetime') || ''),
  }

  const parsed = Schema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? '')
      if (key && !fieldErrors[key]) fieldErrors[key] = issue.message
    }
    return {
      status: 'error',
      message: 'Please fix the errors and try again.',
      fieldErrors,
    }
  }

  const data = parsed.data

  try {
    const payload = await getPayloadInstance()
    await payload.create({
      collection: 'appointments',
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        issue: data.issue,
        message: data.message || undefined,
        datetime: new Date(data.datetime).toISOString(),
        status: 'pending',
      },
    })
  } catch (err) {
    console.error('[appointment] Failed to save', err)
    return {
      status: 'error',
      message: 'We could not save your request. Please try again or call us directly.',
    }
  }

  try {
    await sendAppointmentEmail({
      name: data.name,
      phone: data.phone,
      email: data.email,
      issue: ISSUE_LABELS[data.issue],
      message: data.message || undefined,
      datetime: data.datetime,
    })
  } catch (err) {
    console.error('[appointment] Email send failed (non-fatal)', err)
  }

  return {
    status: 'success',
    message:
      'Thank you! Your appointment request has been received. We will confirm shortly.',
  }
}

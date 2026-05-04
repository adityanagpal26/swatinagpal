'use client'

import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'
import { CalendarCheck, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  submitAppointment,
  type AppointmentFormState,
} from '@/actions/appointments'

const ISSUE_OPTIONS: { label: string; value: string }[] = [
  { label: 'Neck pain', value: 'neck-pain' },
  { label: 'Shoulder pain', value: 'shoulder-pain' },
  { label: 'Back pain', value: 'back-pain' },
  { label: 'Knee pain', value: 'knee-pain' },
  { label: 'Ankle pain', value: 'ankle-pain' },
  { label: 'Leg pain', value: 'leg-pain' },
  { label: 'Arthritis', value: 'arthritis' },
  { label: 'Tendonitis', value: 'tendonitis' },
  { label: 'Sprain / Strain', value: 'sprain-strain' },
  { label: 'Other', value: 'other' },
]

const initialState: AppointmentFormState = { status: 'idle' }

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" size="lg" disabled={pending}>
      {pending ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" /> Submitting…
        </>
      ) : (
        <>
          <CalendarCheck className="h-5 w-5" /> Request Appointment
        </>
      )}
    </Button>
  )
}

export function BookingForm() {
  const [state, formAction] = useActionState(submitAppointment, initialState)
  const fieldErrors =
    state.status === 'error' ? state.fieldErrors ?? {} : ({} as Record<string, string>)

  if (state.status === 'success') {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
          <CheckCircle2 className="h-7 w-7" />
        </div>
        <h3 className="mt-4 text-xl font-semibold text-emerald-900">
          Request received
        </h3>
        <p className="mt-2 text-emerald-800">{state.message}</p>
        <p className="mt-1 text-sm text-emerald-700">
          You’ll receive a confirmation message shortly. For urgent matters, please call or
          WhatsApp us directly.
        </p>
      </div>
    )
  }

  return (
    <form action={formAction} className="grid gap-5">
      {state.status === 'error' && state.message ? (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
          <span>{state.message}</span>
        </div>
      ) : null}

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="name">Full name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            required
            autoComplete="name"
          />
          {fieldErrors.name ? (
            <p className="text-xs text-red-600">{fieldErrors.name}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+91 ..."
            required
            autoComplete="tel"
          />
          {fieldErrors.phone ? (
            <p className="text-xs text-red-600">{fieldErrors.phone}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        {fieldErrors.email ? (
          <p className="text-xs text-red-600">{fieldErrors.email}</p>
        ) : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor="issue">Issue</Label>
          <select
            id="issue"
            name="issue"
            required
            defaultValue=""
            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <option value="" disabled>
              Select an issue
            </option>
            {ISSUE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          {fieldErrors.issue ? (
            <p className="text-xs text-red-600">{fieldErrors.issue}</p>
          ) : null}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="datetime">Preferred date & time</Label>
          <Input
            id="datetime"
            name="datetime"
            type="datetime-local"
            required
            min={new Date().toISOString().slice(0, 16)}
          />
          {fieldErrors.datetime ? (
            <p className="text-xs text-red-600">{fieldErrors.datetime}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="message">Message (optional)</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Briefly describe your symptoms or any details we should know."
          rows={5}
        />
        {fieldErrors.message ? (
          <p className="text-xs text-red-600">{fieldErrors.message}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-3 pt-2">
        <SubmitButton />
        <p className="text-xs text-slate-500">
          We’ll never share your information. By submitting you agree to be contacted about
          your appointment.
        </p>
      </div>
    </form>
  )
}

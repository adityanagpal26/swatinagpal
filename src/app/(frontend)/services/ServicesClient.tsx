'use client'

import { useMemo, useState } from 'react'
import { Activity, Sparkles, ArrowRight } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export type Treatment = {
  id: string
  symptom: string
  condition: string
  recommendedTreatment: string
  description?: string
}

export type Option = { label: string; value: string }

export function ServicesClient({
  symptomOptions,
  conditionOptions,
  treatments,
}: {
  symptomOptions: Option[]
  conditionOptions: Option[]
  treatments: Treatment[]
}) {
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [conditions, setConditions] = useState<string[]>([])

  const matched = useMemo(() => {
    if (symptoms.length === 0 && conditions.length === 0) return []
    return treatments.filter((t) => {
      const symptomMatch = symptoms.length === 0 || symptoms.includes(t.symptom)
      const conditionMatch = conditions.length === 0 || conditions.includes(t.condition)
      return symptomMatch && conditionMatch
    })
  }, [symptoms, conditions, treatments])

  const toggle = (
    list: string[],
    value: string,
    setter: (v: string[]) => void
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value])
  }

  const symptomLabel = (v: string) =>
    symptomOptions.find((o) => o.value === v)?.label ?? v
  const conditionLabel = (v: string) =>
    conditionOptions.find((o) => o.value === v)?.label ?? v

  return (
    <div className="grid gap-8 lg:grid-cols-[360px_1fr]">
      <div className="space-y-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-brand-700">
            <Activity className="h-5 w-5" />
            <h3 className="font-semibold">Symptoms</h3>
          </div>
          <p className="mt-1 text-sm text-slate-500">Select all that apply.</p>
          <div className="mt-4 space-y-3">
            {symptomOptions.map((opt) => (
              <div key={opt.value} className="flex items-center gap-3">
                <Checkbox
                  id={`sym-${opt.value}`}
                  checked={symptoms.includes(opt.value)}
                  onCheckedChange={() => toggle(symptoms, opt.value, setSymptoms)}
                />
                <Label htmlFor={`sym-${opt.value}`} className="cursor-pointer text-sm">
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-brand-700">
            <Sparkles className="h-5 w-5" />
            <h3 className="font-semibold">Conditions</h3>
          </div>
          <p className="mt-1 text-sm text-slate-500">Select all that apply.</p>
          <div className="mt-4 space-y-3">
            {conditionOptions.map((opt) => (
              <div key={opt.value} className="flex items-center gap-3">
                <Checkbox
                  id={`con-${opt.value}`}
                  checked={conditions.includes(opt.value)}
                  onCheckedChange={() => toggle(conditions, opt.value, setConditions)}
                />
                <Label htmlFor={`con-${opt.value}`} className="cursor-pointer text-sm">
                  {opt.label}
                </Label>
              </div>
            ))}
          </div>
        </div>

        {(symptoms.length > 0 || conditions.length > 0) && (
          <Button
            variant="outline"
            onClick={() => {
              setSymptoms([])
              setConditions([])
            }}
          >
            Clear all
          </Button>
        )}
      </div>

      <div>
        <div className="rounded-2xl border border-brand-100 bg-brand-50/40 p-6">
          <h3 className="text-lg font-semibold text-slate-900">Recommended Treatments</h3>
          <p className="mt-1 text-sm text-slate-600">
            {symptoms.length === 0 && conditions.length === 0
              ? 'Select your symptoms and/or conditions to see personalised treatment recommendations.'
              : `${matched.length} treatment${matched.length === 1 ? '' : 's'} matched your selection.`}
          </p>
        </div>

        {matched.length > 0 ? (
          <ul className="mt-6 grid gap-4 md:grid-cols-2">
            {matched.map((t) => (
              <li
                key={t.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <h4 className="text-base font-semibold text-slate-900">
                  {t.recommendedTreatment}
                </h4>
                <div className="mt-2 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-brand-100 px-2.5 py-0.5 text-xs font-medium text-brand-700">
                    {symptomLabel(t.symptom)}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                    {conditionLabel(t.condition)}
                  </span>
                </div>
                {t.description ? (
                  <p className="mt-3 text-sm text-slate-600">{t.description}</p>
                ) : null}
              </li>
            ))}
          </ul>
        ) : (symptoms.length > 0 || conditions.length > 0) ? (
          <div className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-slate-600">
            No specific treatments mapped for this combination yet. Please book a consultation
            for a personalised plan.
          </div>
        ) : null}

        <div className="mt-8 rounded-2xl border border-brand-200 bg-white p-6">
          <h3 className="text-lg font-semibold text-slate-900">
            Not sure? Let’s talk it through.
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Every condition is unique. Book a consultation for a personalised assessment.
          </p>
          <Button asChild className="mt-4">
            <Link href="/book">
              Book Appointment <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

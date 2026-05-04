import type { CollectionConfig } from 'payload'

export const SYMPTOM_OPTIONS = [
  { label: 'Neck pain', value: 'neck-pain' },
  { label: 'Shoulder pain', value: 'shoulder-pain' },
  { label: 'Back pain', value: 'back-pain' },
  { label: 'Knee pain', value: 'knee-pain' },
  { label: 'Ankle pain', value: 'ankle-pain' },
  { label: 'Leg pain', value: 'leg-pain' },
] as const

export const CONDITION_OPTIONS = [
  { label: 'Arthritis', value: 'arthritis' },
  { label: 'Tendonitis', value: 'tendonitis' },
  { label: 'Sprain / Strain', value: 'sprain-strain' },
] as const

export const Treatments: CollectionConfig = {
  slug: 'treatments',
  admin: {
    useAsTitle: 'recommendedTreatment',
    defaultColumns: ['recommendedTreatment', 'symptom', 'condition'],
    description:
      'Mapping of symptom + condition to recommended treatments. Used by the Services page.',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'symptom',
      type: 'select',
      required: true,
      options: SYMPTOM_OPTIONS as unknown as { label: string; value: string }[],
    },
    {
      name: 'condition',
      type: 'select',
      required: true,
      options: CONDITION_OPTIONS as unknown as { label: string; value: string }[],
    },
    {
      name: 'recommendedTreatment',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
  ],
}

export default Treatments

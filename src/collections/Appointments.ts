import type { CollectionConfig } from 'payload'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'phone', 'issue', 'datetime', 'status'],
    description: 'Appointment requests submitted from the website.',
  },
  access: {
    // Public can submit (create) but only admins can read/update/delete.
    read: ({ req: { user } }) => Boolean(user),
    create: () => true,
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'phone', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    {
      name: 'issue',
      type: 'select',
      required: true,
      options: [
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
      ],
    },
    { name: 'message', type: 'textarea' },
    {
      name: 'datetime',
      type: 'date',
      required: true,
      admin: { date: { pickerAppearance: 'dayAndTime' } },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'pending',
      options: [
        { label: 'Pending', value: 'pending' },
        { label: 'Confirmed', value: 'confirmed' },
        { label: 'Cancelled', value: 'cancelled' },
        { label: 'Completed', value: 'completed' },
      ],
      admin: { position: 'sidebar' },
    },
  ],
  timestamps: true,
}

export default Appointments

import 'server-only'
import nodemailer, { type Transporter } from 'nodemailer'

let cached: Transporter | null = null

function getTransporter(): Transporter | null {
  if (cached) return cached

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env
  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASSWORD) {
    return null
  }

  cached = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: Number(SMTP_PORT) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASSWORD },
  })
  return cached
}

export type AppointmentEmailPayload = {
  name: string
  phone: string
  email: string
  issue: string
  message?: string
  datetime: string
}

export async function sendAppointmentEmail(p: AppointmentEmailPayload): Promise<void> {
  const transporter = getTransporter()
  if (!transporter) {
    console.warn('[email] SMTP not configured — skipping email notification.')
    return
  }

  const to = process.env.DOCTOR_EMAIL || 'nagpals855@gmail.com'
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!

  const when = new Date(p.datetime).toLocaleString('en-IN', {
    dateStyle: 'full',
    timeStyle: 'short',
  })

  const html = `
    <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:600px;margin:auto;padding:24px;background:#f8fafc;border-radius:12px;">
      <h2 style="color:#015896;margin-top:0;">New Appointment Request</h2>
      <p style="color:#334155;">A new appointment has been requested through the website.</p>
      <table style="width:100%;border-collapse:collapse;background:white;border-radius:8px;overflow:hidden;">
        <tbody>
          <tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:600;">Name</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${escape(p.name)}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:600;">Phone</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${escape(p.phone)}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:600;">Email</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${escape(p.email)}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:600;">Issue</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${escape(p.issue)}</td></tr>
          <tr><td style="padding:10px;border-bottom:1px solid #e2e8f0;font-weight:600;">Preferred</td><td style="padding:10px;border-bottom:1px solid #e2e8f0;">${escape(when)}</td></tr>
          <tr><td style="padding:10px;font-weight:600;vertical-align:top;">Message</td><td style="padding:10px;">${escape(p.message || '—')}</td></tr>
        </tbody>
      </table>
    </div>
  `

  await transporter.sendMail({
    to,
    from,
    subject: `New Appointment Request — ${p.name}`,
    html,
    text: `New appointment from ${p.name} (${p.phone}, ${p.email}). Preferred: ${when}. Issue: ${p.issue}. Message: ${p.message || '—'}`,
  })
}

function escape(s: string): string {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/utils'

export const runtime = 'edge'
export const alt = `${SITE.doctor.name} — Musculoskeletal Physiotherapist`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          background:
            'linear-gradient(135deg, #f0f9ff 0%, #dbeafe 50%, #bfdbfe 100%)',
          padding: '80px',
          fontFamily: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              background: '#015896',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '36px',
              fontWeight: 700,
            }}
          >
            S
          </div>
          <div style={{ fontSize: '28px', fontWeight: 600, color: '#015896' }}>
            Dr. Swati Nagpal Physiotherapy
          </div>
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div
            style={{
              fontSize: '78px',
              fontWeight: 800,
              color: '#0f172a',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
            }}
          >
            Move better.
          </div>
          <div
            style={{
              fontSize: '78px',
              fontWeight: 800,
              color: '#016fb9',
              lineHeight: 1.05,
              letterSpacing: '-0.02em',
              marginTop: '8px',
            }}
          >
            Live pain-free.
          </div>
          <div
            style={{
              fontSize: '30px',
              color: '#334155',
              marginTop: '32px',
              maxWidth: '900px',
            }}
          >
            MPT Musculoskeletal · Dry Needling Specialist · 8+ years of expert care
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: '#475569',
            fontSize: '24px',
          }}
        >
          <div>{SITE.doctor.phone}</div>
          <div style={{ color: '#015896', fontWeight: 600 }}>Book an appointment →</div>
        </div>
      </div>
    ),
    { ...size }
  )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getPayloadInstance } from '@/lib/payload'
import { formatDate } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Articles',
  description:
    'Physiotherapy tips, exercises, and educational articles by Dr. Swati Nagpal.',
}

export const dynamic = 'force-dynamic'

export default async function ArticlesIndexPage() {
  let docs: any[] = []
  try {
    const payload = await getPayloadInstance()
    const result = await payload.find({
      collection: 'articles',
      limit: 50,
      sort: '-publishedAt',
      depth: 1,
    })
    docs = result.docs
  } catch (err) {
    console.warn('[ArticlesIndexPage] Could not load articles', err)
  }

  return (
    <section className="container py-12 md:py-16">
      <div className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-700">
          Blog
        </span>
        <h1 className="mt-3 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
          Articles & Insights
        </h1>
        <p className="mt-4 text-lg text-slate-600">
          Practical tips and educational content to support your recovery and wellness.
        </p>
      </div>

      {docs.length === 0 ? (
        <div className="mx-auto mt-16 max-w-md rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-600">
          No articles published yet. Please check back soon.
        </div>
      ) : (
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {docs.map((a: any) => {
            const cover = typeof a.coverImage === 'object' ? a.coverImage : null
            return (
              <Link
                key={a.id}
                href={`/articles/${a.slug}`}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-50">
                  {cover?.url ? (
                    <Image
                      src={cover.url}
                      alt={cover.alt || a.title}
                      fill
                      className="object-cover transition group-hover:scale-105"
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-brand-300">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-5">
                  {a.publishedAt ? (
                    <div className="text-xs uppercase tracking-wider text-slate-500">
                      {formatDate(a.publishedAt)}
                    </div>
                  ) : null}
                  <h3 className="mt-2 line-clamp-2 text-lg font-semibold text-slate-900 group-hover:text-brand-700">
                    {a.title}
                  </h3>
                  {a.excerpt ? (
                    <p className="mt-2 line-clamp-3 text-sm text-slate-600">{a.excerpt}</p>
                  ) : null}
                  <div className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700">
                    Read more <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            )
          })}
        </div>
      )}
    </section>
  )
}

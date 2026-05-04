import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { getPayloadInstance } from '@/lib/payload'
import { SectionHeading } from './SectionHeading'
import { formatDate } from '@/lib/utils'

export async function LatestArticles() {
  let docs: any[] = []
  try {
    const payload = await getPayloadInstance()
    const result = await payload.find({
      collection: 'articles',
      limit: 3,
      sort: '-publishedAt',
      depth: 1,
    })
    docs = result.docs
  } catch (err) {
    console.warn('[LatestArticles] Could not load articles', err)
    return null
  }

  if (docs.length === 0) return null

  return (
    <section className="container py-16 md:py-20">
      <SectionHeading
        eyebrow="From the Blog"
        title="Latest articles & insights"
        description="Tips, exercises and guidance to help you on your recovery journey."
      />
      <div className="grid gap-6 md:grid-cols-3">
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
                    sizes="(min-width: 768px) 33vw, 100vw"
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
      <div className="mt-10 text-center">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline"
        >
          View all articles <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </section>
  )
}

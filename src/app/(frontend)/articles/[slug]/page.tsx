import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { getPayloadInstance } from '@/lib/payload'
import { formatDate, SITE } from '@/lib/utils'
import { RichText } from '@/components/RichText'
import { absoluteUrl, pageMetadata } from '@/lib/seo'
import {
  JsonLd,
  articleSchema,
  breadcrumbSchema,
} from '@/components/StructuredData'

type Props = { params: Promise<{ slug: string }> }

async function getArticle(slug: string) {
  try {
    const payload = await getPayloadInstance()
    const { docs } = await payload.find({
      collection: 'articles',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    return docs[0] ?? null
  } catch (err) {
    console.warn('[ArticlePage] Could not load article', err)
    return null
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: 'Article not found', robots: { index: false, follow: false } }

  const cover = typeof article.coverImage === 'object' ? article.coverImage : null
  const ogImage = cover?.url
    ? cover.url.startsWith('http')
      ? cover.url
      : absoluteUrl(cover.url)
    : undefined

  return pageMetadata({
    title: article.title,
    description: article.excerpt || `Read "${article.title}" — physiotherapy insights by ${SITE.doctor.name}.`,
    path: `/articles/${article.slug}`,
    type: 'article',
    publishedTime: article.publishedAt || article.createdAt,
    modifiedTime: article.updatedAt,
    ogImage,
  })
}

export const dynamic = 'force-dynamic'

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) notFound()

  const cover = typeof article.coverImage === 'object' ? article.coverImage : null
  const coverUrl = cover?.url
    ? cover.url.startsWith('http')
      ? cover.url
      : absoluteUrl(cover.url)
    : undefined

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: article.title,
            description: article.excerpt,
            slug: article.slug,
            publishedAt: article.publishedAt || article.createdAt,
            updatedAt: article.updatedAt,
            imageUrl: coverUrl,
          }),
          breadcrumbSchema([
            { name: 'Home', href: '/' },
            { name: 'Articles', href: '/articles' },
            { name: article.title, href: `/articles/${article.slug}` },
          ]),
        ]}
      />

      <article className="container py-12 md:py-16">
        <Link
          href="/articles"
          className="inline-flex items-center gap-1 text-sm font-medium text-brand-700 hover:underline"
        >
          <ArrowLeft className="h-4 w-4" /> Back to articles
        </Link>

        <header className="mx-auto mt-6 max-w-3xl text-center">
          {article.publishedAt ? (
            <time
              dateTime={article.publishedAt}
              className="text-sm uppercase tracking-wider text-slate-500"
            >
              {formatDate(article.publishedAt)}
            </time>
          ) : null}
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="mt-4 text-lg text-slate-600">{article.excerpt}</p>
          ) : null}
          <div className="mt-3 text-sm text-slate-500">
            By <span className="font-medium text-slate-700">{SITE.doctor.name}</span>
          </div>
        </header>

        {cover?.url ? (
          <div className="mx-auto mt-10 max-w-4xl overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <Image
              src={cover.url}
              alt={cover.alt || article.title}
              width={1600}
              height={900}
              className="h-full w-full object-cover"
            />
          </div>
        ) : null}

        <div className="mx-auto mt-10 max-w-3xl">
          <RichText data={article.content} />
        </div>
      </article>
    </>
  )
}

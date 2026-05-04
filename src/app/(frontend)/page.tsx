import { Hero } from '@/components/Hero'
import { Highlights } from '@/components/Highlights'
import { Testimonials } from '@/components/Testimonials'
import { LatestArticles } from '@/components/LatestArticles'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Highlights />
      <Testimonials />
      <LatestArticles />
    </>
  )
}

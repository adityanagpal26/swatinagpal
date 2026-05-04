import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <section className="container flex min-h-[60vh] flex-col items-center justify-center py-16 text-center">
      <span className="text-6xl font-bold text-brand-600">404</span>
      <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900">
        Page not found
      </h1>
      <p className="mt-2 max-w-md text-slate-600">
        The page you’re looking for doesn’t exist or has been moved.
      </p>
      <Button asChild className="mt-6">
        <Link href="/">Go back home</Link>
      </Button>
    </section>
  )
}

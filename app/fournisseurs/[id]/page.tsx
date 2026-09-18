import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { ProductCard } from '@/components/product-card'
import { VerificationBadge } from '@/components/ui/verification-badge'
import { products, suppliers } from '@/lib/data'

export function generateStaticParams() {
  return suppliers.map((s) => ({ id: s.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const supplier = suppliers.find((s) => s.id === id)
  return { title: supplier ? `${supplier.name} — Miabe Afrika` : 'Fournisseur introuvable' }
}

export default async function SupplierPublicPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supplier = suppliers.find((s) => s.id === id)
  if (!supplier) notFound()
  const catalog = products.filter((p) => p.supplierId === supplier.id)

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-6">
        <Link href="/fournisseurs" className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="size-4" /> Annuaire
        </Link>
        <div className="mt-6 max-w-3xl">
          <VerificationBadge v={supplier.verification} />
          <h1 className="mt-3 text-3xl font-bold tracking-tight">{supplier.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {supplier.type} · {supplier.city}, Togo · fondée en {supplier.founded} · {supplier.employees}{' '}
            personnes
          </p>
          <p className="mt-4 font-serif leading-relaxed text-muted-foreground">{supplier.bio}</p>
          <dl className="mt-6 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-muted-foreground">Capacité</dt>
              <dd className="text-sm font-medium">{supplier.capacity}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Délai de réponse</dt>
              <dd className="text-sm font-medium">~{supplier.responseHours} h</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Marchés</dt>
              <dd className="text-sm font-medium">{supplier.markets.join(', ')}</dd>
            </div>
          </dl>
        </div>
        <h2 className="mt-12 text-lg font-bold">Catalogue</h2>
        {catalog.length === 0 ? (
          <p className="mt-4 text-sm text-muted-foreground">Aucun produit publié pour le moment.</p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {catalog.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  )
}

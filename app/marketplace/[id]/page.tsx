import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Boxes, Clock, MapPin, Package, ShieldCheck } from 'lucide-react'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { VerificationBadge } from '@/components/ui/verification-badge'
import { Badge } from '@/components/ui/badge'
import { RfqDialog } from '@/components/marketplace/rfq-dialog'
import { ProductCard } from '@/components/product-card'
import { ProductVisual } from '@/components/product-visual'
import { dualMoney, products, supplierOf, verificationLabels } from '@/lib/data'

export function generateStaticParams() {
  return products.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) return { title: 'Produit introuvable — Miabe Afrika' }
  return {
    title: `${product.name} — Miabe Afrika`,
    description: product.story,
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const product = products.find((p) => p.id === id)
  if (!product) notFound()

  const supplier = supplierOf(product)
  const price = dualMoney(product.price, product.currency)
  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 3)

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-8 md:px-6">
          <Link
            href="/marketplace"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="size-4" /> Retour à la place de marché
          </Link>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <div className="relative aspect-4/3 overflow-hidden rounded-lg border border-border bg-bone">
                <ProductVisual product={product} className="h-full w-full" />
              </div>

              <div className="mt-6 rounded-md border border-border bg-card p-5">
                <h2 className="text-sm font-semibold">Fiche technique</h2>
                <dl className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-dashed border-border py-1.5">
                      <dt className="text-sm text-muted-foreground">{s.label}</dt>
                      <dd className="font-mono text-sm tabular-nums">{s.value}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <InfoRow icon={Package} label="Conditionnement" value={product.packaging} />
                  <InfoRow icon={Boxes} label="Capacité" value={product.capacity} />
                </div>
              </div>

              <div className="mt-6 rounded-md border border-border bg-card p-5">
                <h2 className="text-sm font-semibold">Origine & histoire</h2>
                <p className="mt-2 font-serif leading-relaxed text-muted-foreground">{product.story}</p>
              </div>
            </div>

            {/* buy box */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <div className="rounded-lg border border-border bg-card p-6">
                <p className="text-[11px] tracking-wide text-muted-foreground uppercase">
                  {product.category}
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-tight text-balance">{product.name}</h1>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="size-4" /> {product.origin}
                </p>

                <div className="mt-4">
                  <VerificationBadge v={product.verification} />
                </div>

                <div className="mt-5 flex items-end gap-2 border-t border-border pt-5">
                  <span className="font-mono text-3xl font-bold tabular-nums">{price.primary}</span>
                  <span className="pb-1 text-sm text-muted-foreground">
                    {price.usd} {product.unit}
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-sm bg-bone px-3 py-2">
                    <p className="text-xs text-muted-foreground">MOQ</p>
                    <p className="font-medium">{product.moq}</p>
                  </div>
                  <div className="rounded-sm bg-bone px-3 py-2">
                    <p className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock className="size-3" /> Délai
                    </p>
                    <p className="font-medium">{product.leadTime}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <RfqDialog product={product} />
                </div>

                {product.exportReady.length > 0 && (
                  <div className="mt-5 rounded-sm border border-mangrove/30 bg-mangrove/5 px-3 py-2.5">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-mangrove">
                      <ShieldCheck className="size-3.5" /> Prêt à l’export
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Documentation complète pour : {product.exportReady.join(', ')}
                    </p>
                  </div>
                )}

                {product.certifications.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-1.5 text-xs font-medium text-muted-foreground">Certifications</p>
                    <div className="flex flex-wrap gap-1.5">
                      {product.certifications.map((c) => (
                        <Badge key={c}>{c}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* supplier card */}
              <Link
                href={`/fournisseurs/${supplier.id}`}
                className="mt-4 block rounded-lg border border-border bg-card p-5 transition-colors hover:border-gold/60"
              >
                <p className="text-xs text-muted-foreground">Fournisseur</p>
                <p className="mt-1 font-semibold">{supplier.name}</p>
                <p className="text-sm text-muted-foreground">
                  {supplier.type} · {supplier.city} · depuis {supplier.founded}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span>{verificationLabels[supplier.verification]}</span>
                  <span>·</span>
                  <span>Réponse ~{supplier.responseHours} h</span>
                  <span>·</span>
                  <span>{supplier.employees} employés</span>
                </div>
              </Link>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-lg font-bold tracking-tight">Dans la même catégorie</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

function InfoRow({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Package
  label: string
  value: string
}) {
  return (
    <div className="flex items-start gap-2 rounded-sm bg-bone px-3 py-2">
      <Icon className="mt-0.5 size-4 shrink-0 text-gold" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm">{value}</p>
      </div>
    </div>
  )
}

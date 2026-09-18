import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { VerificationBadge } from '@/components/ui/verification-badge'
import { products, suppliers } from '@/lib/data'

export const metadata: Metadata = {
  title: 'Fournisseurs — Miabe Afrika',
  description: 'Annuaire des fournisseurs togolais vérifiés par TOGOMALL.',
}

export default function SuppliersDirectoryPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Annuaire fournisseurs</h1>
        <p className="mt-2 max-w-2xl font-serif text-muted-foreground">
          Coopératives, transformateurs et marques togolaises — capacité, marchés desservis et statut de
          vérification.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {suppliers.map((s) => {
            const catalog = products.filter((p) => p.supplierId === s.id)
            return (
              <Link
                key={s.id}
                href={`/fournisseurs/${s.id}`}
                className="rounded-md border border-border bg-card p-5 transition-colors hover:border-gold/60"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{s.name}</h2>
                    <p className="text-sm text-muted-foreground">
                      {s.type} · {s.city} · depuis {s.founded}
                    </p>
                  </div>
                  <VerificationBadge v={s.verification} />
                </div>
                <p className="mt-3 font-serif text-sm text-muted-foreground">{s.bio}</p>
                <p className="mt-3 text-xs text-muted-foreground">
                  Capacité {s.capacity} · Réponse ~{s.responseHours} h · {catalog.length} produit
                  {catalog.length > 1 ? 's' : ''}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">Marchés : {s.markets.join(', ')}</p>
              </Link>
            )
          })}
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { corridors, formatMoney, opportunities, products, supplierOf } from '@/lib/data'
import { VerificationBadge } from '@/components/ui/verification-badge'

export function Hero() {
  const featured = products.slice(0, 3)

  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="mx-auto grid max-w-7xl items-start gap-10 px-4 py-16 md:grid-cols-[1.05fr_0.95fr] md:px-6 md:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-sm border border-gold/40 bg-gold/10 px-3 py-1 text-xs font-medium text-laterite">
            <span className="size-1.5 rounded-full bg-laterite" />
            Depuis Lomé, pour toute l’Afrique
          </span>
          <h1 className="mt-5 text-4xl font-bold tracking-tight text-balance md:text-6xl">
            Le système d’exploitation du commerce transfrontalier africain
          </h1>
          <p className="mt-5 max-w-xl font-serif text-lg leading-relaxed text-muted-foreground">
            Miabe Afrika relie les fournisseurs togolais aux acheteurs du continent — de la découverte au
            règlement. Devis, production, contrôle qualité, logistique et douane, sur un seul rail vérifié.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Parcourir le directory
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/register"
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-5 py-3 text-sm font-semibold hover:border-atlantic"
            >
              Devenir fournisseur
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap items-center gap-2">
            <span className="text-xs text-muted-foreground">Corridors actifs :</span>
            {corridors.map((c) => (
              <span
                key={c.id}
                className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-2.5 py-1 text-xs"
              >
                <span className="text-muted-foreground">🇹🇬 {c.from}</span>
                <ArrowRight className="size-3 text-gold" />
                <span className="font-medium">
                  {c.flag} {c.to}
                </span>
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold">Tableau vivant — Lomé</p>
            <span className="font-mono text-[11px] text-mangrove">en direct</span>
          </div>
          <ul className="divide-y divide-border">
            {featured.map((p) => {
              const supplier = supplierOf(p)
              return (
                <li key={p.id}>
                  <Link href={`/marketplace/${p.id}`} className="flex items-center gap-3 px-4 py-3 hover:bg-bone/60">
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">{p.name}</span>
                        <VerificationBadge v={p.verification} />
                      </span>
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {supplier.city} · MOQ {p.moq}
                      </span>
                    </span>
                    <span className="text-right">
                      <span className="block font-mono text-sm font-semibold tabular-nums">
                        {formatMoney(p.price, p.currency)}
                      </span>
                      <span className="text-[11px] text-muted-foreground">{p.unit}</span>
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>
          <div className="border-t border-border bg-bone/40 px-4 py-3">
            <p className="text-xs font-semibold text-muted-foreground">Opportunités ouvertes</p>
            <ul className="mt-2 space-y-2">
              {opportunities.slice(0, 2).map((o) => (
                <li key={o.id} className="flex items-start justify-between gap-3">
                  <Link href="/opportunites" className="text-sm hover:underline">
                    {o.title}
                  </Link>
                  <span className="shrink-0 font-mono text-[11px] text-muted-foreground">{o.closes}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

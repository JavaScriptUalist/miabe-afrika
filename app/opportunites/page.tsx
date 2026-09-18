import type { Metadata } from 'next'
import Link from 'next/link'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Badge } from '@/components/ui/badge'
import { opportunities } from '@/lib/data'
import { railColors } from '@/lib/status'

export const metadata: Metadata = {
  title: 'Opportunités commerciales — Miabe Afrika',
  description: 'Demandes d’acheteurs et offres fournisseurs sur les corridors ouest-africains.',
}

export default function OpportunitiesPage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-10 md:px-6">
        <h1 className="text-3xl font-bold tracking-tight">Opportunités commerciales</h1>
        <p className="mt-2 max-w-2xl font-serif text-muted-foreground">
          Appels d’offres, demandes de sourcing et disponibilités export. Répondez depuis votre espace.
        </p>
        <ul className="mt-8 space-y-3">
          {opportunities.map((o) => (
            <li
              key={o.id}
              className="rail rounded-md border border-border bg-card p-5"
              style={
                {
                  ['--rail-color' as string]:
                    o.kind === 'buyer-request' ? railColors.harbor : railColors.gold,
                } as React.CSSProperties
              }
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                  <h2 className="mt-1 text-lg font-semibold">{o.title}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {o.party} · {o.country} · {o.quantity} → {o.destination}
                  </p>
                  {o.budget && <p className="mt-1 text-sm">Budget {o.budget}</p>}
                </div>
                <div className="text-right">
                  <Badge>{o.kind === 'buyer-request' ? 'Demande acheteur' : 'Offre fournisseur'}</Badge>
                  <p className="mt-2 text-xs text-muted-foreground">Clôture {o.closes}</p>
                  <Link href="/login" className="mt-3 inline-block text-sm text-harbor hover:underline">
                    Répondre
                  </Link>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
      <SiteFooter />
    </div>
  )
}

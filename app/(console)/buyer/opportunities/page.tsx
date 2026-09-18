'use client'

import { useState } from 'react'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import { opportunities } from '@/lib/data'
import { railColors } from '@/lib/status'

export default function BuyerOpportunitiesPage() {
  const [sent, setSent] = useState(false)

  return (
    <>
      <PageHeader
        title="Demandes de sourcing"
        description="Publiez un besoin ou répondez à une offre fournisseur sur le corridor ouest-africain."
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <Panel>
          <PanelHeader title="Nouvelle demande" />
          {sent ? (
            <div className="p-6 text-sm text-mangrove">
              Demande publiée. Les fournisseurs correspondants seront notifiés sous 15 minutes.
            </div>
          ) : (
            <form
              className="space-y-3 p-4"
              onSubmit={(e) => {
                e.preventDefault()
                setSent(true)
              }}
            >
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">Produit recherché</span>
                <input required className="input" placeholder="ex. Miel brut 25 kg" />
              </label>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">Quantité</span>
                  <input required className="input" placeholder="ex. 8 t" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">Destination</span>
                  <select className="input">
                    <option>Nigéria</option>
                    <option>Ghana</option>
                    <option>Côte d’Ivoire</option>
                    <option>Bénin</option>
                  </select>
                </label>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">Emballage</span>
                  <input className="input" placeholder="Fût 25 kg" />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-muted-foreground">Livraison souhaitée</span>
                  <input type="date" className="input" />
                </label>
              </div>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">Certifications exigées</span>
                <input className="input" placeholder="NAFDAC, analyse labo, origine CEDEAO" />
              </label>
              <button className="w-full rounded-sm bg-atlantic px-4 py-2.5 text-sm font-medium text-atlantic-foreground">
                Publier la demande
              </button>
            </form>
          )}
        </Panel>

        <Panel>
          <PanelHeader title="Opportunités du marché" />
          <ul className="divide-y divide-border">
            {opportunities.map((o) => (
              <li
                key={o.id}
                className="rail px-4 py-4"
                style={
                  {
                    ['--rail-color' as string]:
                      o.kind === 'buyer-request' ? railColors.harbor : railColors.gold,
                  } as React.CSSProperties
                }
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">{o.title}</p>
                  <Badge>{o.kind === 'buyer-request' ? 'Demande acheteur' : 'Offre fournisseur'}</Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {o.party} · {o.country} · {o.quantity} → {o.destination}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {o.budget ? `Budget ${o.budget} · ` : ''}Clôture {o.closes}
                </p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}

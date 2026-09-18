'use client'

import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import { formatMoney, offerSupplier, quoteOffers, rfqProduct, rfqs } from '@/lib/data'
import { rfqStatusColor, rfqStatusLabels, verificationColor } from '@/lib/status'
import { cn } from '@/lib/utils'

export default function BuyerRfqsPage() {
  const comparable = rfqs.filter((r) => quoteOffers.some((o) => o.rfqId === r.id))
  const [id, setId] = useState(comparable[0]?.id ?? rfqs[0].id)
  const selected = rfqs.find((r) => r.id === id)!
  const product = rfqProduct(selected)
  const offers = useMemo(() => quoteOffers.filter((o) => o.rfqId === selected.id), [selected.id])
  const [accepted, setAccepted] = useState<string | null>(null)

  return (
    <>
      <PageHeader
        title="RFQ & devis"
        description="Comparez les offres côte à côte : prix, délai, certifications, capacité."
      />
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <Panel>
          <PanelHeader title="Vos RFQ" />
          <ul className="divide-y divide-border">
            {rfqs.map((r) => {
              const p = rfqProduct(r)
              return (
                <li key={r.id}>
                  <button
                    onClick={() => {
                      setId(r.id)
                      setAccepted(null)
                    }}
                    className={cn(
                      'rail w-full px-4 py-3 text-left',
                      r.id === id ? 'bg-bone' : 'hover:bg-bone/60',
                    )}
                    style={{ ['--rail-color' as string]: rfqStatusColor(r.status) } as React.CSSProperties}
                  >
                    <p className="font-mono text-xs text-muted-foreground">{r.id}</p>
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.quantity} → {r.destination}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </Panel>

        <div>
          <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-semibold">{product.name}</h2>
              <p className="text-sm text-muted-foreground">
                {selected.quantity} · {selected.incoterm} · livrable {selected.neededBy}
              </p>
            </div>
            <Badge dotColor={rfqStatusColor(selected.status)}>{rfqStatusLabels[selected.status]}</Badge>
          </div>

          {offers.length === 0 ? (
            <p className="rounded-md border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              Aucun devis reçu pour l’instant. Les fournisseurs ont été notifiés.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {offers.map((o) => {
                const supplier = offerSupplier(o)
                const chosen = accepted === o.supplierId
                return (
                  <Panel key={o.supplierId} className={cn(o.recommended && 'ring-1 ring-gold/50')}>
                    <PanelHeader
                      title={supplier.name}
                      action={
                        o.recommended ? (
                          <span className="text-[11px] font-medium text-gold">Recommandé</span>
                        ) : null
                      }
                    />
                    <div className="space-y-3 p-4">
                      <p className="font-mono text-2xl font-semibold tabular-nums">
                        {formatMoney(o.unitPrice, o.currency)}
                        <span className="text-sm font-normal text-muted-foreground"> / kg</span>
                      </p>
                      <Row label="Délai" value={o.leadTime} />
                      <Row label="Incoterm" value={o.incoterm} />
                      <Row label="Capacité" value={o.capacity} />
                      <Row label="Ville" value={supplier.city} />
                      <div>
                        <p className="text-xs text-muted-foreground">Certifications</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {o.certs.length === 0 && <span className="text-xs text-laterite">Aucune</span>}
                          {o.certs.map((c) => (
                            <Badge key={c}>{c}</Badge>
                          ))}
                        </div>
                      </div>
                      <p className="text-xs" style={{ color: verificationColor(supplier.verification) }}>
                        Réponse ~{supplier.responseHours} h
                      </p>
                      {chosen ? (
                        <p className="flex items-center gap-1.5 text-sm text-mangrove">
                          <Check className="size-4" /> Devis accepté
                        </p>
                      ) : (
                        <button
                          onClick={() => setAccepted(o.supplierId)}
                          className="w-full rounded-sm bg-atlantic px-3 py-2 text-sm font-medium text-atlantic-foreground"
                        >
                          Accepter ce devis
                        </button>
                      )}
                    </div>
                  </Panel>
                )
              })}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3 border-b border-dashed border-border pb-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

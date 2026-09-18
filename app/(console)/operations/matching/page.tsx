'use client'

import { useMemo, useState } from 'react'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import {
  formatMoney,
  rfqBuyer,
  rfqProduct,
  rfqs,
  supplierMatches,
  suppliers,
} from '@/lib/data'
import { rfqStatusColor, rfqStatusLabels, verificationColor } from '@/lib/status'
import { cn } from '@/lib/utils'

export default function MatchingPage() {
  const [id, setId] = useState(rfqs.find((r) => r.status === 'new')?.id ?? rfqs[0].id)
  const selected = rfqs.find((r) => r.id === id)!
  const product = rfqProduct(selected)
  const buyer = rfqBuyer(selected)
  const matches = useMemo(
    () =>
      supplierMatches
        .filter((m) => m.rfqId === selected.id)
        .sort((a, b) => b.score - a.score),
    [selected.id],
  )
  const [assigned, setAssigned] = useState<string | null>(null)

  return (
    <>
      <PageHeader
        title="Matching fournisseurs"
        description="Classez les contreparties par stock, certification, corridor, prix et délai."
      />
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Panel>
          <PanelHeader title="Demandes à matcher" />
          <ul className="divide-y divide-border">
            {rfqs.map((r) => {
              const p = rfqProduct(r)
              const b = rfqBuyer(r)
              return (
                <li key={r.id}>
                  <button
                    onClick={() => {
                      setId(r.id)
                      setAssigned(null)
                    }}
                    className={cn(
                      'rail w-full px-4 py-3 text-left',
                      r.id === id ? 'bg-bone' : 'hover:bg-bone/60',
                    )}
                    style={{ ['--rail-color' as string]: rfqStatusColor(r.status) } as React.CSSProperties}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                      <Badge dotColor={rfqStatusColor(r.status)}>{rfqStatusLabels[r.status]}</Badge>
                    </div>
                    <p className="mt-1 text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {b.name} · {r.quantity} → {r.destination}
                    </p>
                  </button>
                </li>
              )
            })}
          </ul>
        </Panel>

        <div className="space-y-4">
          <Panel>
            <PanelHeader title="Besoin acheteur" />
            <div className="grid gap-3 p-4 sm:grid-cols-2">
              <Field label="Acheteur" value={`${buyer.name} · ${buyer.country}`} />
              <Field label="Produit" value={product.name} />
              <Field label="Quantité" value={selected.quantity} />
              <Field label="Incoterm" value={selected.incoterm} />
              <Field label="Destination" value={selected.destination} />
              <Field label="Livraison" value={selected.neededBy} />
            </div>
          </Panel>

          {matches.length === 0 ? (
            <p className="rounded-md border border-dashed border-border py-12 text-center text-sm text-muted-foreground">
              Aucun fournisseur classé pour cette RFQ. Élargissez les critères (catégorie, corridor).
            </p>
          ) : (
            <ul className="space-y-3">
              {matches.map((m) => {
                const supplier = suppliers.find((s) => s.id === m.supplierId)!
                return (
                  <li key={m.supplierId}>
                    <Panel>
                      <div className="flex flex-wrap items-start gap-4 p-4">
                        <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-sm bg-atlantic text-atlantic-foreground">
                          <span className="font-mono text-lg font-semibold">{m.score}</span>
                          <span className="text-[10px] opacity-70">score</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="text-sm font-semibold">{supplier.name}</p>
                            <span className="text-xs" style={{ color: verificationColor(supplier.verification) }}>
                              {supplier.city}
                            </span>
                          </div>
                          <p className="mt-1 font-mono text-sm tabular-nums">
                            {formatMoney(m.unitPrice, m.currency)} · {m.leadTime} · {m.stock}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {m.reasons.map((r) => (
                              <Badge key={r}>{r}</Badge>
                            ))}
                          </div>
                        </div>
                        {assigned === m.supplierId ? (
                          <span className="text-sm text-mangrove">RFQ transmise</span>
                        ) : (
                          <button
                            onClick={() => setAssigned(m.supplierId)}
                            className="rounded-sm bg-atlantic px-3 py-2 text-sm font-medium text-atlantic-foreground"
                          >
                            Transmettre la RFQ
                          </button>
                        )}
                      </div>
                    </Panel>
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-dashed border-border pb-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}

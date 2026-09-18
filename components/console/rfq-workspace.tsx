'use client'

import { useMemo, useState } from 'react'
import { CheckCircle2, Send } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import { PipelineStepper } from '@/components/ui/pipeline'
import {
  type Currency,
  type RFQ,
  formatMoney,
  rfqBuyer,
  rfqProduct,
  rfqs as seedRfqs,
} from '@/lib/data'
import { rfqStatusColor, rfqStatusLabels } from '@/lib/status'
import { cn } from '@/lib/utils'

type Draft = { unitPrice: string; validity: string }

export function RfqWorkspace() {
  const [list, setList] = useState<RFQ[]>(seedRfqs)
  const [selectedId, setSelectedId] = useState(seedRfqs[0].id)
  const selected = list.find((r) => r.id === selectedId)!
  const product = rfqProduct(selected)
  const buyer = rfqBuyer(selected)

  const [draft, setDraft] = useState<Draft>({ unitPrice: '', validity: '15 jours' })
  const [justSent, setJustSent] = useState(false)

  const currency = product.currency as Currency

  function sendQuote() {
    const price = Number(draft.unitPrice)
    if (!price) return
    setList((prev) =>
      prev.map((r) =>
        r.id === selectedId
          ? {
              ...r,
              status: 'quoted',
              stage: 'quote',
              quote: { unitPrice: price, currency, validity: draft.validity },
            }
          : r,
      ),
    )
    setDraft({ unitPrice: '', validity: '15 jours' })
    setJustSent(true)
    setTimeout(() => setJustSent(false), 2500)
  }

  const counts = useMemo(() => {
    return {
      new: list.filter((r) => r.status === 'new').length,
      negotiating: list.filter((r) => r.status === 'negotiating').length,
      quoted: list.filter((r) => r.status === 'quoted').length,
    }
  }, [list])

  return (
    <div className="grid gap-6 lg:grid-cols-[380px_1fr]">
      <div className="space-y-3">
        <div className="flex gap-2 text-xs">
          <Badge dotColor={rfqStatusColor('new')}>{counts.new} nouvelles</Badge>
          <Badge dotColor={rfqStatusColor('negotiating')}>{counts.negotiating} en négo.</Badge>
          <Badge dotColor={rfqStatusColor('quoted')}>{counts.quoted} devis</Badge>
        </div>
        <Panel>
          <ul className="divide-y divide-border">
            {list.map((r) => {
              const p = rfqProduct(r)
              const b = rfqBuyer(r)
              const isActive = r.id === selectedId
              return (
                <li key={r.id}>
                  <button
                    onClick={() => setSelectedId(r.id)}
                    className={cn(
                      'rail w-full px-4 py-3 text-left transition-colors',
                      isActive ? 'bg-bone' : 'hover:bg-bone/60',
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
      </div>

      <div className="space-y-6">
        <Panel>
          <PanelHeader
            title={
              <span className="flex items-center gap-2">
                <span className="font-mono text-muted-foreground">{selected.id}</span>
                {product.name}
              </span>
            }
            action={<Badge dotColor={rfqStatusColor(selected.status)}>{rfqStatusLabels[selected.status]}</Badge>}
          />
          <div className="grid gap-4 p-4 sm:grid-cols-2">
            <Field label="Acheteur" value={`${buyer.name} · ${buyer.country}`} />
            <Field label="Type d’acheteur" value={buyer.type} />
            <Field label="Quantité demandée" value={selected.quantity} />
            <Field label="Destination" value={selected.destination} />
            <Field label="Incoterm" value={selected.incoterm} />
            <Field label="Livraison souhaitée" value={selected.neededBy} />
            <Field label="Prix catalogue" value={`${formatMoney(product.price, currency)} ${product.unit}`} />
            <Field label="Reçue le" value={selected.createdAt} />
          </div>
        </Panel>

        <div className="grid gap-6 md:grid-cols-2">
          <Panel>
            <PanelHeader title="Suivi du dossier" />
            <div className="p-4">
              <PipelineStepper current={selected.stage} />
            </div>
          </Panel>

          <Panel>
            <PanelHeader title={selected.quote ? 'Devis en cours' : 'Établir un devis'} />
            <div className="p-4">
              {selected.quote && (
                <div className="mb-4 rounded-sm border border-harbor/30 bg-harbor/5 p-3">
                  <p className="text-xs text-muted-foreground">Dernier devis envoyé</p>
                  <p className="font-mono text-xl font-semibold tabular-nums">
                    {formatMoney(selected.quote.unitPrice, selected.quote.currency)}
                    <span className="text-sm font-normal text-muted-foreground"> {product.unit}</span>
                  </p>
                  <p className="text-xs text-muted-foreground">Validité : {selected.quote.validity}</p>
                </div>
              )}

              {justSent ? (
                <div className="flex items-center gap-2 rounded-sm border border-mangrove/30 bg-mangrove/5 p-3 text-sm text-mangrove">
                  <CheckCircle2 className="size-4" /> Devis envoyé à {buyer.name}.
                </div>
              ) : (
                <div className="space-y-3">
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-muted-foreground">
                      Prix unitaire proposé ({currency}) {product.unit}
                    </span>
                    <input
                      type="number"
                      value={draft.unitPrice}
                      onChange={(e) => setDraft((d) => ({ ...d, unitPrice: e.target.value }))}
                      placeholder={String(product.price)}
                      className="w-full rounded-sm border border-border bg-card px-3 py-2 font-mono text-sm outline-none focus:border-gold"
                    />
                  </label>
                  <label className="block">
                    <span className="mb-1 block text-xs font-medium text-muted-foreground">Validité</span>
                    <select
                      value={draft.validity}
                      onChange={(e) => setDraft((d) => ({ ...d, validity: e.target.value }))}
                      className="w-full rounded-sm border border-border bg-card px-3 py-2 text-sm outline-none focus:border-gold"
                    >
                      <option>7 jours</option>
                      <option>15 jours</option>
                      <option>30 jours</option>
                    </select>
                  </label>
                  <button
                    onClick={sendQuote}
                    disabled={!draft.unitPrice}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground disabled:opacity-40"
                  >
                    <Send className="size-4" /> Envoyer le devis
                  </button>
                </div>
              )}
            </div>
          </Panel>
        </div>
      </div>
    </div>
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

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader, Stat } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import { PipelineStepper } from '@/components/ui/pipeline'
import {
  disputes,
  formatMoney,
  inspections,
  orderBuyer,
  orderProduct,
  orderSupplier,
  orders,
  rfqs,
  suppliers,
} from '@/lib/data'
import {
  disputeColor,
  disputeLabels,
  paymentColor,
  paymentLabels,
  qcColor,
  qcLabels,
  railColors,
} from '@/lib/status'

export default function OperationsHome() {
  const pipeline = orders.reduce((a, o) => a + o.value, 0)
  const pendingQc = inspections.filter((i) => i.result === 'pending').length
  const openDisputes = disputes.filter((d) => d.status !== 'resolved').length
  const pendingSuppliers = suppliers.filter((s) => s.verification !== 'verified' && s.verification !== 'export-ready').length

  return (
    <>
      <PageHeader
        title="Centre de commande TOGOMALL"
        description="Visibilité unique sur fournisseurs, matching, qualité, transit et règlements."
        action={
          <Link
            href="/operations/matching"
            className="inline-flex items-center gap-1.5 rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground"
          >
            Ouvrir le matching <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Valeur en cours" value={formatMoney(pipeline, 'XOF')} sub={`${orders.length} transactions`} accent={railColors.mangrove} />
        <Stat label="RFQ actives" value={rfqs.length} sub={`${pendingSuppliers} dossiers fournisseur`} accent={railColors.gold} />
        <Stat label="Contrôles en attente" value={pendingQc} sub="Inspections à confirmer" accent={railColors.harbor} />
        <Stat label="Litiges ouverts" value={openDisputes} sub="Qualité, docs, quantités" accent={railColors.laterite} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelHeader title="Pipeline des transactions" />
          <ul className="divide-y divide-border">
            {orders.map((o) => {
              const product = orderProduct(o)
              const buyer = orderBuyer(o)
              const supplier = orderSupplier(o)
              return (
                <li key={o.id} className="px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">
                        {o.id} · {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {supplier.name} → {buyer.name} · {o.destination}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm tabular-nums">{formatMoney(o.value, o.currency)}</p>
                      <Badge dotColor={paymentColor(o.paymentStatus)} className="mt-1">
                        {paymentLabels[o.paymentStatus]}
                      </Badge>
                    </div>
                  </div>
                  <div className="mt-3">
                    <PipelineStepper current={o.stage} orientation="horizontal" />
                  </div>
                </li>
              )
            })}
          </ul>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHeader title="File de vérification" />
            <ul className="divide-y divide-border">
              {suppliers.map((s) => (
                <li key={s.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{s.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {s.city} · {s.type}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{s.verification}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <PanelHeader title="Contrôles qualité" />
            <ul className="divide-y divide-border">
              {inspections.map((i) => (
                <li key={i.id} className="flex items-center justify-between px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{i.id}</p>
                    <p className="text-xs text-muted-foreground">
                      {i.site} · {i.date}
                    </p>
                  </div>
                  <span className="text-xs font-medium" style={{ color: qcColor(i.result) }}>
                    {qcLabels[i.result]}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel>
            <PanelHeader title="Litiges" />
            <ul className="divide-y divide-border">
              {disputes.map((d) => (
                <li key={d.id} className="px-4 py-3">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-medium">
                      {d.id} · {d.kind}
                    </p>
                    <span className="text-xs" style={{ color: disputeColor(d.status) }}>
                      {disputeLabels[d.status]}
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">{d.summary}</p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}

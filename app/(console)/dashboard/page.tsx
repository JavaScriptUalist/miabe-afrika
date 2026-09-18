import Link from 'next/link'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader, Stat } from '@/components/ui/panel'
import { PipelineStepper } from '@/components/ui/pipeline'
import { Badge } from '@/components/ui/badge'
import { LineChart } from '@/components/ui/charts'
import {
  documents,
  formatMoney,
  intel,
  orderBuyer,
  orderProduct,
  orders,
  rfqBuyer,
  rfqProduct,
  rfqs,
} from '@/lib/data'
import {
  paymentColor,
  paymentLabels,
  railColors,
  rfqStatusColor,
  rfqStatusLabels,
} from '@/lib/status'

export default function SupplierOverview() {
  const openRfqs = rfqs.filter((r) => r.status === 'new' || r.status === 'negotiating' || r.status === 'quoted')
  const activeOrders = orders.filter((o) => o.stage !== 'settlement')
  const pipelineValue = orders.reduce((a, o) => a + o.value, 0)
  const docAlerts = documents.filter((d) => d.status === 'expiring' || d.status === 'expired')

  return (
    <>
      <PageHeader
        title="Vue d’ensemble"
        description="Coopérative Miel des Plateaux · Kpalimé, Togo"
        action={
          <Link
            href="/dashboard/export-readiness"
            className="inline-flex items-center gap-1.5 rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground"
          >
            Préparer un nouvel export <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="RFQ ouvertes" value={openRfqs.length} sub="À traiter cette semaine" accent={railColors.gold} />
        <Stat label="Commandes actives" value={activeOrders.length} sub="En production ou en transit" accent={railColors.harbor} />
        <Stat
          label="Valeur du pipeline"
          value={formatMoney(pipelineValue, 'XOF')}
          sub="Toutes commandes confondues"
          accent={railColors.mangrove}
        />
        <Stat label="Alertes documents" value={docAlerts.length} sub="À renouveler" accent={railColors.laterite} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel>
          <PanelHeader
            title="Commandes en cours"
            action={
              <Link href="/dashboard/orders" className="text-xs text-harbor hover:underline">
                Tout voir
              </Link>
            }
          />
          <ul className="divide-y divide-border">
            {activeOrders.map((o) => {
              const product = orderProduct(o)
              const buyer = orderBuyer(o)
              return (
                <li key={o.id} className="px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">
                        {o.id} · {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {buyer.name} · {buyer.country} · {o.quantity}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-mono text-sm font-semibold tabular-nums">
                        {formatMoney(o.value, o.currency)}
                      </p>
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
            <PanelHeader
              title="Volume de RFQ"
              action={
                <span className="inline-flex items-center gap-1 text-xs text-mangrove">
                  <TrendingUp className="size-3.5" /> +9 % vs oct.
                </span>
              }
            />
            <div className="p-4">
              <LineChart data={intel.rfqVolume} color={railColors.harbor} />
            </div>
          </Panel>

          <Panel>
            <PanelHeader
              title="RFQ récentes"
              action={
                <Link href="/dashboard/rfqs" className="text-xs text-harbor hover:underline">
                  Tout voir
                </Link>
              }
            />
            <ul className="divide-y divide-border">
              {openRfqs.slice(0, 3).map((r) => {
                const product = rfqProduct(r)
                const buyer = rfqBuyer(r)
                return (
                  <li key={r.id} className="rail flex items-center gap-3 px-4 py-3" style={{ ['--rail-color' as string]: rfqStatusColor(r.status) } as React.CSSProperties}>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {buyer.name} · {r.quantity} → {r.destination}
                      </p>
                    </div>
                    <Badge dotColor={rfqStatusColor(r.status)}>{rfqStatusLabels[r.status]}</Badge>
                  </li>
                )
              })}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}

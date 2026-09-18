import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader, Stat } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import { PipelineStepper } from '@/components/ui/pipeline'
import {
  buyers,
  formatMoney,
  invoices,
  opportunities,
  orderProduct,
  orders,
  rfqProduct,
  rfqs,
} from '@/lib/data'
import { invoiceStatusColor, invoiceStatusLabels, paymentColor, paymentLabels, railColors, rfqStatusColor, rfqStatusLabels } from '@/lib/status'

export default function BuyerOverview() {
  const buyer = buyers[0]
  const myRfqs = rfqs.filter((r) => r.buyerId === buyer.id || true)
  const open = myRfqs.filter((r) => r.status !== 'accepted' && r.status !== 'declined')
  const pipeline = orders.reduce((a, o) => a + o.value, 0)
  const due = invoices.filter((i) => i.status === 'sent' || i.status === 'partial')

  return (
    <>
      <PageHeader
        title="Espace acheteur"
        description={`${buyer.name} · ${buyer.country} · ${buyer.type}`}
        action={
          <Link
            href="/buyer/discover"
            className="inline-flex items-center gap-1.5 rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground"
          >
            Sourcer un produit <ArrowRight className="size-4" />
          </Link>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="RFQ ouvertes" value={open.length} sub="En attente de devis ou négo." accent={railColors.gold} />
        <Stat label="Commandes actives" value={orders.length} sub="Production → règlement" accent={railColors.harbor} />
        <Stat label="Valeur engagée" value={formatMoney(pipeline, 'XOF')} sub="Tous corridors" accent={railColors.mangrove} />
        <Stat label="Factures à régler" value={due.length} sub="Hors séquestre déjà payé" accent={railColors.laterite} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Panel>
          <PanelHeader
            title="Suivi des commandes"
            action={
              <Link href="/buyer/orders" className="text-xs text-harbor hover:underline">
                Tout voir
              </Link>
            }
          />
          <ul className="divide-y divide-border">
            {orders.slice(0, 3).map((o) => {
              const product = orderProduct(o)
              return (
                <li key={o.id} className="px-4 py-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <p className="text-sm font-semibold">
                        {o.id} · {product.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {o.quantity} → {o.destination} · ETA {o.eta}
                      </p>
                    </div>
                    <Badge dotColor={paymentColor(o.paymentStatus)}>{paymentLabels[o.paymentStatus]}</Badge>
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
            <PanelHeader title="RFQ en cours" />
            <ul className="divide-y divide-border">
              {open.slice(0, 4).map((r) => {
                const product = rfqProduct(r)
                return (
                  <li
                    key={r.id}
                    className="rail px-4 py-3"
                    style={{ ['--rail-color' as string]: rfqStatusColor(r.status) } as React.CSSProperties}
                  >
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {r.id} · {r.quantity} → {r.destination}
                    </p>
                    <Badge dotColor={rfqStatusColor(r.status)} className="mt-1.5">
                      {rfqStatusLabels[r.status]}
                    </Badge>
                  </li>
                )
              })}
            </ul>
          </Panel>
          <Panel>
            <PanelHeader
              title="Appels d’offres"
              action={
                <Link href="/buyer/opportunities" className="text-xs text-harbor hover:underline">
                  Publier
                </Link>
              }
            />
            <ul className="divide-y divide-border">
              {opportunities.slice(0, 3).map((o) => (
                <li key={o.id} className="px-4 py-3">
                  <p className="text-sm font-medium">{o.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {o.quantity} · clôture {o.closes}
                  </p>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    </>
  )
}

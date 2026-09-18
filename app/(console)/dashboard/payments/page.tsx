import { PageHeader } from '@/components/console/page-header'
import { Panel, Stat } from '@/components/ui/panel'
import { formatMoney, orderProduct, orders, payouts } from '@/lib/data'
import { payoutColor, payoutLabels, railColors } from '@/lib/status'

export default function SupplierPaymentsPage() {
  const due = payouts.filter((p) => p.status !== 'paid').reduce((a, p) => a + p.amount, 0)
  const paid = payouts.filter((p) => p.status === 'paid').reduce((a, p) => a + p.amount, 0)

  return (
    <>
      <PageHeader
        title="Paiements"
        description="Montants dus, séquestres et historique des règlements TOGOMALL."
      />
      <div className="grid gap-3 sm:grid-cols-2">
        <Stat label="À recevoir" value={formatMoney(due, 'XOF')} accent={railColors.gold} />
        <Stat label="Déjà reçu" value={formatMoney(paid, 'XOF')} accent={railColors.mangrove} />
      </div>
      <Panel className="mt-6">
        <ul className="divide-y divide-border">
          {payouts.map((p) => {
            const order = orders.find((o) => o.id === p.orderId)!
            const product = orderProduct(order)
            return (
              <li key={p.id} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{product.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {p.id} · {p.orderId} · {p.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-sm tabular-nums">{formatMoney(p.amount, p.currency)}</p>
                  <p className="text-xs" style={{ color: payoutColor(p.status) }}>
                    {payoutLabels[p.status]}
                  </p>
                </div>
              </li>
            )
          })}
        </ul>
      </Panel>
    </>
  )
}

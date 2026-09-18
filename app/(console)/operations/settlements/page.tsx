import { PageHeader } from '@/components/console/page-header'
import { Panel, Stat } from '@/components/ui/panel'
import { formatMoney, invoiceOrder, invoices, orderProduct, payouts, suppliers } from '@/lib/data'
import { invoiceStatusColor, invoiceStatusLabels, payoutColor, payoutLabels, railColors } from '@/lib/status'

export default function SettlementsPage() {
  const inEscrow = invoices.filter((i) => i.status === 'sent' || i.status === 'partial').reduce((a, i) => a + i.amount, 0)
  const due = payouts.filter((p) => p.status === 'due').reduce((a, p) => a + p.amount, 0)
  const paid = payouts.filter((p) => p.status === 'paid').reduce((a, p) => a + p.amount, 0)

  return (
    <>
      <PageHeader
        title="Règlements"
        description="Paiements acheteurs, marges TOGOMALL et décaissements fournisseurs."
      />
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="En séquestre" value={formatMoney(inEscrow, 'XOF')} accent={railColors.harbor} />
        <Stat label="À verser" value={formatMoney(due, 'XOF')} accent={railColors.laterite} />
        <Stat label="Déjà versé" value={formatMoney(paid, 'XOF')} accent={railColors.mangrove} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <h2 className="border-b border-border px-4 py-3 text-sm font-semibold">Encaissements acheteurs</h2>
          <ul className="divide-y divide-border">
            {invoices.map((i) => {
              const order = invoiceOrder(i)
              const product = orderProduct(order)
              return (
                <li key={i.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{i.id}</p>
                    <p className="text-xs text-muted-foreground">{product.name}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm tabular-nums">{formatMoney(i.amount, i.currency)}</p>
                    <p className="text-xs" style={{ color: invoiceStatusColor(i.status) }}>
                      {invoiceStatusLabels[i.status]}
                    </p>
                  </div>
                </li>
              )
            })}
          </ul>
        </Panel>
        <Panel>
          <h2 className="border-b border-border px-4 py-3 text-sm font-semibold">Décaissements fournisseurs</h2>
          <ul className="divide-y divide-border">
            {payouts.map((p) => {
              const supplier = suppliers.find((s) => s.id === p.supplierId)!
              return (
                <li key={p.id} className="flex items-center justify-between gap-3 px-4 py-3">
                  <div>
                    <p className="text-sm font-medium">{supplier.name}</p>
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
      </div>
    </>
  )
}

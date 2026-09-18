import { PageHeader } from '@/components/console/page-header'
import { Panel } from '@/components/ui/panel'
import { disputes, orderProduct, orders } from '@/lib/data'
import { disputeColor, disputeLabels } from '@/lib/status'

export default function DisputesPage() {
  return (
    <>
      <PageHeader
        title="Litiges"
        description="Qualité, quantité, livraison, documents, paiement et logistique."
      />
      <Panel>
        <ul className="divide-y divide-border">
          {disputes.map((d) => {
            const order = orders.find((o) => o.id === d.orderId)!
            const product = orderProduct(order)
            const color = disputeColor(d.status)
            return (
              <li
                key={d.id}
                className="rail px-4 py-4"
                style={{ ['--rail-color' as string]: color } as React.CSSProperties}
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="text-sm font-semibold">
                    {d.id} · {d.kind}
                  </p>
                  <span className="text-xs font-medium" style={{ color }}>
                    {disputeLabels[d.status]}
                  </span>
                </div>
                <p className="mt-1 text-sm">{d.summary}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {d.orderId} · {product.name} · ouvert le {d.opened}
                </p>
              </li>
            )
          })}
        </ul>
      </Panel>
    </>
  )
}

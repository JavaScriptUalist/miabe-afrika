import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { formatMoney, orderProduct, orders, shipments } from '@/lib/data'
import { railColors } from '@/lib/status'

export default function LogisticsPage() {
  return (
    <>
      <PageHeader
        title="Logistique & douane"
        description="Transitaires, routes, jalons de transit et coûts de corridor."
      />
      <div className="space-y-4">
        {shipments.map((s) => {
          const order = orders.find((o) => o.id === s.orderId)!
          const product = orderProduct(order)
          return (
            <Panel key={s.orderId}>
              <PanelHeader
                title={
                  <span>
                    <span className="font-mono text-muted-foreground">{s.tracking}</span> · {product.name}
                  </span>
                }
                action={
                  <span className="font-mono text-sm tabular-nums">{formatMoney(s.cost, s.currency)}</span>
                }
              />
              <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="Prestataire" value={s.provider} />
                <Field label="Mode" value={s.mode} />
                <Field label="Route" value={s.route} />
                <Field label="Commande" value={s.orderId} />
                <Field label="Destination" value={order.destination} />
                <Field label="Jalons" value={s.milestone} />
              </div>
              <div
                className="rail mx-4 mb-4 rounded-sm border border-border bg-bone/50 px-3 py-2 text-sm"
                style={{ ['--rail-color' as string]: railColors.harbor } as React.CSSProperties}
              >
                Étape courante : {s.milestone}
              </div>
            </Panel>
          )
        })}
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

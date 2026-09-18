import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { inspections, orderProduct, orders } from '@/lib/data'
import { qcColor, qcLabels } from '@/lib/status'

export default function QualityPage() {
  return (
    <>
      <PageHeader
        title="Contrôle qualité"
        description="Inspections, preuves et actions correctives avant expédition."
      />
      <div className="space-y-4">
        {inspections.map((i) => {
          const order = orders.find((o) => o.id === i.orderId)!
          const product = orderProduct(order)
          const color = qcColor(i.result)
          return (
            <Panel key={i.id}>
              <PanelHeader
                title={
                  <span className="flex items-center gap-2">
                    <span className="font-mono text-muted-foreground">{i.id}</span>
                    {product.name}
                  </span>
                }
                action={
                  <span className="text-xs font-medium" style={{ color }}>
                    {qcLabels[i.result]}
                  </span>
                }
              />
              <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-4">
                <Field label="Commande" value={i.orderId} />
                <Field label="Site" value={i.site} />
                <Field label="Date" value={i.date} />
                <Field label="Résultat" value={qcLabels[i.result]} />
              </div>
              <p className="border-t border-border px-4 py-3 text-sm text-muted-foreground">{i.notes}</p>
              {i.result === 'fail' && (
                <div className="border-t border-border bg-laterite/5 px-4 py-3 text-sm text-laterite">
                  Action corrective : reprise de lot et nouvelle inspection avant chargement.
                </div>
              )}
              {i.result === 'pending' && (
                <div className="border-t border-border px-4 py-3">
                  <button className="rounded-sm bg-atlantic px-3 py-2 text-sm font-medium text-atlantic-foreground">
                    Joindre les preuves d’inspection
                  </button>
                </div>
              )}
            </Panel>
          )
        })}
      </div>
    </>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}

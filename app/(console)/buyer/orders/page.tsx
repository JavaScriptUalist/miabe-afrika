import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import { PipelineStepper } from '@/components/ui/pipeline'
import { formatMoney, orderProduct, orderSupplier, orders, workflowStages } from '@/lib/data'
import { paymentColor, paymentLabels } from '@/lib/status'

export default function BuyerOrdersPage() {
  return (
    <>
      <PageHeader
        title="Mes commandes"
        description="Du bon de commande au règlement — production, contrôle, transit et douane."
      />
      <div className="space-y-6">
        {orders.map((o) => {
          const product = orderProduct(o)
          const supplier = orderSupplier(o)
          const stageLabel = workflowStages.find((s) => s.id === o.stage)?.label
          return (
            <Panel key={o.id}>
              <PanelHeader
                title={
                  <span className="flex flex-wrap items-center gap-2">
                    <span className="font-mono text-muted-foreground">{o.id}</span>
                    {product.name}
                  </span>
                }
                action={
                  <Badge dotColor={paymentColor(o.paymentStatus)}>
                    {paymentLabels[o.paymentStatus]}
                  </Badge>
                }
              />
              <div className="grid gap-6 p-4 lg:grid-cols-[1fr_1.3fr]">
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Fournisseur" value={supplier.name} />
                  <Field label="Destination" value={o.destination} />
                  <Field label="Quantité" value={o.quantity} />
                  <Field label="Valeur" value={formatMoney(o.value, o.currency)} />
                  <Field label="Étape" value={stageLabel ?? '—'} />
                  <Field label="ETA" value={o.eta} />
                </div>
                <div className="rounded-sm border border-border bg-bone/40 p-4">
                  <PipelineStepper current={o.stage} />
                </div>
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

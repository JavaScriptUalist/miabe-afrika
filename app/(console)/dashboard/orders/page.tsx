import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import { PipelineStepper } from '@/components/ui/pipeline'
import {
  formatMoney,
  orderBuyer,
  orderProduct,
  orders,
  workflowStages,
} from '@/lib/data'
import { paymentColor, paymentLabels } from '@/lib/status'

export default function OrdersPage() {
  return (
    <>
      <PageHeader
        title="Commandes"
        description="Suivi de bout en bout — de la production au règlement transfrontalier."
      />
      <div className="space-y-6">
        {orders.map((o) => {
          const product = orderProduct(o)
          const buyer = orderBuyer(o)
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
                    Paiement : {paymentLabels[o.paymentStatus]}
                  </Badge>
                }
              />
              <div className="grid gap-6 p-4 lg:grid-cols-[1fr_1.4fr]">
                <div className="grid grid-cols-2 gap-4 self-start">
                  <Field label="Acheteur" value={buyer.name} />
                  <Field label="Destination" value={o.destination} />
                  <Field label="Quantité" value={o.quantity} />
                  <Field label="Valeur" value={formatMoney(o.value, o.currency)} mono />
                  <Field label="Étape courante" value={stageLabel ?? '—'} />
                  <Field label="Livraison estimée" value={o.eta} />
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

function Field({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="border-b border-dashed border-border pb-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={`text-sm font-medium ${mono ? 'font-mono tabular-nums' : ''}`}>{value}</p>
    </div>
  )
}

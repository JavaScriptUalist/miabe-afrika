import { PageHeader } from '@/components/console/page-header'
import { Panel } from '@/components/ui/panel'
import { formatMoney, invoiceBuyer, invoiceOrder, invoices, orderProduct } from '@/lib/data'
import { invoiceStatusColor, invoiceStatusLabels } from '@/lib/status'

export default function BuyerInvoicesPage() {
  return (
    <>
      <PageHeader
        title="Factures"
        description="Proformas, soldes et instructions de paiement sous séquestre TOGOMALL."
      />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Facture</th>
                <th className="px-4 py-3 font-medium">Commande</th>
                <th className="px-4 py-3 font-medium">Produit</th>
                <th className="px-4 py-3 font-medium">Émise</th>
                <th className="px-4 py-3 font-medium">Échéance</th>
                <th className="px-4 py-3 font-medium">Montant</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {invoices.map((i) => {
                const order = invoiceOrder(i)
                const product = orderProduct(order)
                const color = invoiceStatusColor(i.status)
                return (
                  <tr
                    key={i.id}
                    className="rail hover:bg-bone/50"
                    style={{ ['--rail-color' as string]: color } as React.CSSProperties}
                  >
                    <td className="px-4 py-3 font-mono text-xs">{i.id}</td>
                    <td className="px-4 py-3 font-mono text-xs">{i.orderId}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{invoiceBuyer(i).name}</p>
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{i.issued}</td>
                    <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{i.due}</td>
                    <td className="px-4 py-3 font-mono text-sm tabular-nums">
                      {formatMoney(i.amount, i.currency)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-xs font-medium" style={{ color }}>
                        {invoiceStatusLabels[i.status]}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

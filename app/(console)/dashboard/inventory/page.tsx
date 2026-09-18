import { AlertTriangle } from 'lucide-react'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader, Stat } from '@/components/ui/panel'
import { inventory, inventoryProduct } from '@/lib/data'
import { railColors } from '@/lib/status'

export default function InventoryPage() {
  const totalAvailable = inventory.reduce((a, i) => a + i.available, 0)
  const totalReserved = inventory.reduce((a, i) => a + i.reserved, 0)
  const alerts = inventory.filter((i) => i.alert).length

  return (
    <>
      <PageHeader title="Inventaire" description="Stocks disponibles, réservés et entrants par entrepôt." />

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Unités disponibles" value={totalAvailable.toLocaleString('fr-FR')} accent={railColors.mangrove} />
        <Stat label="Unités réservées" value={totalReserved.toLocaleString('fr-FR')} accent={railColors.harbor} />
        <Stat label="Alertes de stock" value={alerts} accent={railColors.laterite} />
      </div>

      <Panel className="mt-6">
        <PanelHeader title="Détail par produit" />
        <div className="divide-y divide-border">
          {inventory.map((i) => {
            const product = inventoryProduct(i)
            const total = i.available + i.reserved + i.incoming
            return (
              <div key={i.productId} className="px-4 py-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold">{product.name}</p>
                    <p className="text-xs text-muted-foreground">{i.warehouse}</p>
                  </div>
                  {i.alert && (
                    <span className="inline-flex items-center gap-1.5 rounded-sm bg-laterite/10 px-2 py-1 text-xs font-medium text-laterite">
                      <AlertTriangle className="size-3.5" /> {i.alert}
                    </span>
                  )}
                </div>
                <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <span className="bg-mangrove" style={{ width: `${(i.available / total) * 100}%` }} />
                  <span className="bg-gold" style={{ width: `${(i.reserved / total) * 100}%` }} />
                  <span className="bg-harbor/50" style={{ width: `${(i.incoming / total) * 100}%` }} />
                </div>
                <div className="mt-2 flex flex-wrap gap-4 text-xs">
                  <Legend color="var(--mangrove)" label="Disponible" value={`${i.available.toLocaleString('fr-FR')} ${i.unit}`} />
                  <Legend color="var(--gold)" label="Réservé" value={`${i.reserved.toLocaleString('fr-FR')} ${i.unit}`} />
                  <Legend color="color-mix(in srgb, var(--harbor) 50%, transparent)" label="Entrant" value={`${i.incoming.toLocaleString('fr-FR')} ${i.unit}`} />
                </div>
              </div>
            )
          })}
        </div>
      </Panel>
    </>
  )
}

function Legend({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <span className="flex items-center gap-1.5 text-muted-foreground">
      <span className="size-2.5 rounded-sm" style={{ backgroundColor: color }} />
      {label} · <span className="font-mono tabular-nums text-foreground">{value}</span>
    </span>
  )
}

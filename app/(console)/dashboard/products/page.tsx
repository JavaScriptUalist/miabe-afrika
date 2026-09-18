import { PageHeader } from '@/components/console/page-header'
import { Panel } from '@/components/ui/panel'
import { Badge } from '@/components/ui/badge'
import { ProductVisual } from '@/components/product-visual'
import { dualMoney, products, supplierOf } from '@/lib/data'
import { VerificationBadge } from '@/components/ui/verification-badge'

export default function SupplierProductsPage() {
  return (
    <>
      <PageHeader
        title="Catalogue produits"
        description="Fiches, variantes, MOQ, délais et préparation à l’export."
        action={
          <button className="rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground">
            Ajouter un produit
          </button>
        }
      />
      <div className="grid gap-4 md:grid-cols-2">
        {products.map((p) => {
          const supplier = supplierOf(p)
          const price = dualMoney(p.price, p.currency)
          return (
            <Panel key={p.id} className="overflow-hidden">
              <div className="grid sm:grid-cols-[140px_1fr]">
                <ProductVisual product={p} className="min-h-32 sm:h-full" />
                <div className="p-4">
                  <VerificationBadge v={p.verification} />
                  <h2 className="mt-2 text-sm font-semibold">{p.name}</h2>
                  <p className="text-xs text-muted-foreground">{supplier.name}</p>
                  <p className="mt-2 font-mono text-lg font-semibold tabular-nums">{price.primary}</p>
                  <p className="text-xs text-muted-foreground">
                    MOQ {p.moq} · {p.leadTime}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {p.exportReady.map((d) => (
                      <Badge key={d}>{d}</Badge>
                    ))}
                    {p.exportReady.length === 0 && (
                      <span className="text-xs text-laterite">Aucun corridor prêt</span>
                    )}
                  </div>
                </div>
              </div>
            </Panel>
          )
        })}
      </div>
    </>
  )
}

import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { type Product, dualMoney, supplierOf } from '@/lib/data'
import { VerificationBadge } from '@/components/ui/verification-badge'
import { ProductVisual } from '@/components/product-visual'

export function ProductCard({ product }: { product: Product }) {
  const supplier = supplierOf(product)
  const price = dualMoney(product.price, product.currency)
  return (
    <Link
      href={`/marketplace/${product.id}`}
      className="group flex flex-col overflow-hidden rounded-md border border-border bg-card transition-colors hover:border-gold/60"
    >
      <div className="relative aspect-4/3 overflow-hidden bg-bone">
        <ProductVisual product={product} className="h-full w-full transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute top-2 left-2">
          <VerificationBadge v={product.verification} className="backdrop-blur" />
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] tracking-wide text-muted-foreground uppercase">{product.category}</p>
        <h3 className="mt-1 text-sm font-semibold leading-snug text-balance">{product.name}</h3>
        <p className="mt-1.5 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="size-3" />
          {product.origin}
        </p>
        <div className="mt-auto flex items-end justify-between pt-4">
          <div>
            <p className="font-mono text-base font-semibold tabular-nums">{price.primary}</p>
            <p className="text-[11px] text-muted-foreground">
              {price.usd} {product.unit}
            </p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-muted-foreground">MOQ</p>
            <p className="text-xs font-medium">{product.moq}</p>
          </div>
        </div>
        <p className="mt-3 truncate border-t border-border pt-2 text-[11px] text-muted-foreground">
          {supplier.name}
        </p>
      </div>
    </Link>
  )
}

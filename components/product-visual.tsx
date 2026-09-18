import { cn } from '@/lib/utils'
import type { Product } from '@/lib/data'

const tones: Record<string, { wash: string; ink: string; grain: string }> = {
  'miel-brut-25': { wash: '#c4a35a', ink: '#161410', grain: '#8a6e2f' },
  'beurre-karite-a': { wash: '#e4d0a4', ink: '#3a2f18', grain: '#c4a35a' },
  'cajou-ww320': { wash: '#d9b48a', ink: '#3a2414', grain: '#9c3b2a' },
  'wax-print-cotton': { wash: '#0e2438', ink: '#eef2f6', grain: '#c4a35a' },
  'ananas-seche': { wash: '#c45a2a', ink: '#f6f1e8', grain: '#f0c36a' },
  'hibiscus-sec': { wash: '#7a1f2b', ink: '#f6f1e8', grain: '#c4a35a' },
}

export function ProductVisual({
  product,
  className,
}: {
  product: Product
  className?: string
}) {
  const tone = tones[product.id] ?? { wash: '#0e2438', ink: '#eef2f6', grain: '#c4a35a' }
  return (
    <div
      className={cn('relative overflow-hidden', className)}
      style={{ background: tone.wash, color: tone.ink }}
      aria-hidden
    >
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage: `repeating-linear-gradient(-18deg, transparent 0 18px, ${tone.grain}22 18px 19px)`,
        }}
      />
      <div
        className="absolute -top-10 -right-8 size-40 rounded-full opacity-30"
        style={{ background: tone.grain }}
      />
      <div
        className="absolute -bottom-12 -left-8 size-32 rounded-full opacity-25"
        style={{ background: tone.grain }}
      />
      <div className="relative flex h-full min-h-40 flex-col justify-end p-4">
        <p className="font-serif text-lg leading-tight text-balance">{product.name}</p>
        <p className="mt-1 text-[11px] opacity-80">{product.origin}</p>
      </div>
    </div>
  )
}

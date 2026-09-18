'use client'

import { useMemo, useState } from 'react'
import { Search, SlidersHorizontal } from 'lucide-react'
import { type Verification, products, verificationLabels } from '@/lib/data'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'

const categories = ['Toutes', ...Array.from(new Set(products.map((p) => p.category)))]
const destinations = ['Toutes', 'Nigéria', 'Ghana', 'Côte d’Ivoire', 'Bénin']
const verifications: (Verification | 'all')[] = [
  'all',
  'export-ready',
  'verified',
  'documents-pending',
  'unverified',
]

export function MarketplaceBrowser({ embedded = false }: { embedded?: boolean }) {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Toutes')
  const [destination, setDestination] = useState('Toutes')
  const [verification, setVerification] = useState<Verification | 'all'>('all')
  const [sort, setSort] = useState<'relevance' | 'price-asc' | 'price-desc'>('relevance')

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      const matchesQuery =
        !query ||
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.origin.toLowerCase().includes(query.toLowerCase())
      const matchesCat = category === 'Toutes' || p.category === category
      const matchesDest = destination === 'Toutes' || p.exportReady.includes(destination)
      const matchesVer = verification === 'all' || p.verification === verification
      return matchesQuery && matchesCat && matchesDest && matchesVer
    })
    if (sort === 'price-asc') list = [...list].sort((a, b) => a.price - b.price)
    if (sort === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    return list
  }, [query, category, destination, verification, sort])

  return (
    <div className={embedded ? 'px-0 py-0' : 'mx-auto max-w-7xl px-4 py-10 md:px-6'}>
      {!embedded && (
      <div className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">Place de marché</h1>
        <p className="mt-2 font-serif text-muted-foreground">
          {products.length} produits togolais prêts pour l’export vers l’Afrique de l’Ouest.
        </p>
      </div>
      )}

      <div className={embedded ? 'mt-0 grid gap-6 lg:grid-cols-[16rem_1fr]' : 'mt-8 grid gap-6 lg:grid-cols-[16rem_1fr]'}>
        {/* filters */}
        <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Rechercher un produit…"
              className="w-full rounded-sm border border-border bg-card py-2 pr-3 pl-9 text-sm outline-none focus:border-gold"
            />
          </div>

          <FilterGroup label="Catégorie">
            {categories.map((c) => (
              <FilterChip key={c} active={category === c} onClick={() => setCategory(c)}>
                {c}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Destination prête à l’export">
            {destinations.map((d) => (
              <FilterChip key={d} active={destination === d} onClick={() => setDestination(d)}>
                {d}
              </FilterChip>
            ))}
          </FilterGroup>

          <FilterGroup label="Vérification">
            {verifications.map((v) => (
              <FilterChip
                key={v}
                active={verification === v}
                onClick={() => setVerification(v)}
              >
                {v === 'all' ? 'Toutes' : verificationLabels[v]}
              </FilterChip>
            ))}
          </FilterGroup>
        </aside>

        {/* results */}
        <div>
          <div className="mb-4 flex items-center justify-between border-b border-border pb-3">
            <p className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="size-4" />
              {filtered.length} résultat{filtered.length > 1 ? 's' : ''}
            </p>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="rounded-sm border border-border bg-card px-2 py-1.5 text-sm outline-none focus:border-gold"
            >
              <option value="relevance">Pertinence</option>
              <option value="price-asc">Prix croissant</option>
              <option value="price-desc">Prix décroissant</option>
            </select>
          </div>

          {filtered.length === 0 ? (
            <p className="rounded-md border border-dashed border-border py-16 text-center text-sm text-muted-foreground">
              Aucun produit ne correspond à ces filtres.
            </p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function FilterGroup({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">{children}</div>
    </div>
  )
}

function FilterChip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-sm border px-2.5 py-1 text-xs transition-colors',
        active
          ? 'border-atlantic bg-atlantic text-atlantic-foreground'
          : 'border-border bg-card text-muted-foreground hover:border-gold hover:text-foreground',
      )}
    >
      {children}
    </button>
  )
}

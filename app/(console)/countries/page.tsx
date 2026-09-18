'use client'

import { useState } from 'react'
import Link from 'next/link'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { countries, exportReadiness, products } from '@/lib/data'
import { checkColor, checkLabels } from '@/lib/status'
import { cn } from '@/lib/utils'

export default function CountriesPage() {
  const [id, setId] = useState(countries[0].id)
  const country = countries.find((c) => c.id === id)!
  const related = exportReadiness.filter((e) => e.destination === country.name)

  return (
    <>
      <PageHeader
        title="Connaissance pays"
        description="Exigences d’importation, documents et préparation à l’export par corridor prioritaire."
      />
      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <Panel>
          <PanelHeader title="Corridors" />
          <ul className="divide-y divide-border">
            {countries.map((c) => (
              <li key={c.id}>
                <button
                  onClick={() => setId(c.id)}
                  className={cn('w-full px-4 py-3 text-left', c.id === id ? 'bg-bone' : 'hover:bg-bone/60')}
                >
                  <p className="text-sm font-medium">
                    {c.flag} {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{c.currency} · droits {c.avgDuty}</p>
                </button>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <PanelHeader
              title={`${country.flag} ${country.name}`}
              action={
                <Link href={`/countries/${country.id}`} className="text-xs text-harbor hover:underline">
                  Fiche complète
                </Link>
              }
            />
            <div className="grid gap-4 p-4 sm:grid-cols-2">
              <Field label="Autorités" value={country.authorities.join(', ')} />
              <Field label="Droits moyens" value={country.avgDuty} />
              <Field
                label="Produits restreints"
                value={country.restricted.length ? country.restricted.join(', ') : 'Aucun signalé'}
              />
              <Field label="Devise" value={country.currency} />
            </div>
            <ul className="divide-y divide-border border-t border-border">
              {country.rules.map((r) => (
                <li key={r.title} className="px-4 py-3">
                  <p className="text-sm font-medium">{r.title}</p>
                  <p className="mt-1 font-serif text-sm text-muted-foreground">{r.detail}</p>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel>
            <PanelHeader title={`Préparation produit × ${country.name}`} />
            {related.length === 0 ? (
              <p className="p-4 text-sm text-muted-foreground">
                Aucune combinaison produit enregistrée pour ce corridor. Ajoutez un diagnostic depuis la
                console fournisseur.
              </p>
            ) : (
              <ul className="divide-y divide-border">
                {related.map((combo) => {
                  const product = products.find((p) => p.id === combo.productId)!
                  const missing = combo.items.filter((i) => i.status !== 'done').length
                  return (
                    <li key={`${combo.productId}-${combo.destination}`} className="px-4 py-4">
                      <p className="text-sm font-semibold">{product.name}</p>
                      <p className="mb-2 text-xs text-muted-foreground">
                        {missing === 0 ? 'Prêt à l’export' : `${missing} exigence(s) manquante(s)`}
                      </p>
                      <ul className="space-y-1.5">
                        {combo.items.map((item) => (
                          <li key={item.label} className="flex items-center justify-between text-sm">
                            <span>{item.label}</span>
                            <span style={{ color: checkColor(item.status) }}>{checkLabels[item.status]}</span>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )
                })}
              </ul>
            )}
          </Panel>
        </div>
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

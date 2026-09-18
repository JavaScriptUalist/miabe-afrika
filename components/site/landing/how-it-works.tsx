import { workflowStages } from '@/lib/data'

const metrics = [
  { value: '10', label: 'étapes couvertes, de l’intérêt au règlement' },
  { value: '4', label: 'corridors ouest-africains actifs' },
  { value: '91 %', label: 'de contrôles qualité conformes' },
  { value: '~11 h', label: 'de délai de réponse moyen' },
]

export function HowItWorks() {
  return (
    <section className="border-b border-border bg-bone/40">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="grid gap-4 md:grid-cols-4">
          {metrics.map((m) => (
            <div key={m.label} className="rail rounded-md border border-border bg-card px-4 py-4" style={{ ['--rail-color' as string]: 'var(--gold)' } as React.CSSProperties}>
              <p className="font-mono text-3xl font-bold tabular-nums">{m.value}</p>
              <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 max-w-2xl">
          <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
            Un seul rail, de la première demande au dernier virement
          </h2>
          <p className="mt-3 font-serif text-muted-foreground">
            Le commerce transfrontalier échoue dans les interstices — devis perdus, documents manquants,
            paiements risqués. Miabe Afrika orchestre chaque étape sur une même piste vérifiée.
          </p>
        </div>

        <ol className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {workflowStages.map((s, i) => (
            <li
              key={s.id}
              className="relative rounded-md border border-border bg-card p-4"
            >
              <span className="font-mono text-xs text-gold">{String(i + 1).padStart(2, '0')}</span>
              <p className="mt-2 text-sm font-semibold">{s.label}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

import Link from 'next/link'
import { Wordmark } from '@/components/brand'

const groups = [
  {
    title: 'Plateforme',
    links: [
      { href: '/marketplace', label: 'Place de marché' },
      { href: '/dashboard', label: 'Console fournisseur' },
      { href: '/buyer', label: 'Espace acheteur' },
      { href: '/operations', label: 'Opérations' },
    ],
  },
  {
    title: 'Renseignements',
    links: [
      { href: '/intelligence', label: 'Tableau de bord' },
      { href: '/countries', label: 'Moteur de connaissance pays' },
      { href: '/countries/nigeria', label: 'Fiche Nigéria' },
      { href: '/countries/ghana', label: 'Fiche Ghana' },
    ],
  },
  {
    title: 'Corridors',
    links: [
      { href: '/marketplace', label: 'Togo → Nigéria' },
      { href: '/marketplace', label: 'Togo → Ghana' },
      { href: '/marketplace', label: 'Togo → Côte d’Ivoire' },
      { href: '/marketplace', label: 'Togo → Bénin' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-atlantic text-atlantic-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div>
          <Wordmark className="[&_span]:text-atlantic-foreground" subtle />
          <p className="mt-4 max-w-xs font-serif text-sm leading-relaxed text-atlantic-foreground/70">
            Le système d’exploitation du commerce transfrontalier pour l’Afrique. Depuis Lomé, nous relions
            les fournisseurs togolais aux acheteurs du continent.
          </p>
          <p className="mt-4 text-xs text-atlantic-foreground/50">
            Lomé, Togo · Prototype de démonstration
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-xs font-semibold tracking-wide text-gold uppercase">{g.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {g.links.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-atlantic-foreground/70 transition-colors hover:text-atlantic-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-2 px-4 py-5 text-xs text-atlantic-foreground/50 md:flex-row md:items-center md:px-6">
          <p>© 2026 Miabe Afrika par TOGOMALL. Tous droits réservés.</p>
          <p className="font-mono">CEDEAO · UEMOA · ZLECAf</p>
        </div>
      </div>
    </footer>
  )
}

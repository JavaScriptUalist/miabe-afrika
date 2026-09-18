import Link from 'next/link'
import { ArrowRight, Building2, Check, Globe2, ShoppingCart } from 'lucide-react'
import { products } from '@/lib/data'
import { ProductCard } from '@/components/product-card'

const supplierPoints = [
  'Vitrine vérifiée avec catalogue, capacité et certifications',
  'Réception structurée des RFQ et gestion des devis',
  'Trousse de préparation à l’export par pays de destination',
  'Coffre-fort documentaire avec alertes d’expiration',
]

const buyerPoints = [
  'Découverte de fournisseurs togolais contrôlés',
  'Demandes de devis multi-fournisseurs en un flux',
  'Suivi de commande de la production à la livraison',
  'Paiement sécurisé sous séquestre jusqu’à réception',
]

export function MarketplacePreview() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-7xl px-4 py-16 md:px-6 md:py-20">
        <div className="flex items-end justify-between gap-4">
          <div className="max-w-xl">
            <h2 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
              Des produits togolais prêts pour l’export
            </h2>
            <p className="mt-3 font-serif text-muted-foreground">
              Miel de forêt, beurre de karité, amandes de cajou, pagne wax — chaque fiche porte prix,
              MOQ, délai et statut de vérification.
            </p>
          </div>
          <Link
            href="/marketplace"
            className="hidden shrink-0 items-center gap-1.5 text-sm font-medium text-harbor hover:underline md:inline-flex"
          >
            Tout voir <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {products.slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  )
}

export function Audiences() {
  return (
    <section className="border-b border-border bg-bone/40">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-16 md:grid-cols-2 md:px-6 md:py-20">
        <div id="suppliers" className="scroll-mt-20 rounded-lg border border-border bg-card p-7">
          <span className="inline-flex size-10 items-center justify-center rounded-md bg-mangrove/10 text-mangrove">
            <Building2 className="size-5" />
          </span>
          <h3 className="mt-4 text-xl font-bold">Pour les fournisseurs togolais</h3>
          <p className="mt-2 font-serif text-sm text-muted-foreground">
            Passez du marché local aux marchés régionaux avec un outillage d’exportation complet.
          </p>
          <ul className="mt-5 space-y-2.5">
            {supplierPoints.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-mangrove" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/dashboard"
            className="mt-6 inline-flex items-center gap-1.5 rounded-sm bg-atlantic px-4 py-2.5 text-sm font-medium text-atlantic-foreground"
          >
            Ouvrir la console fournisseur <ArrowRight className="size-4" />
          </Link>
        </div>

        <div id="buyers" className="scroll-mt-20 rounded-lg border border-border bg-card p-7">
          <span className="inline-flex size-10 items-center justify-center rounded-md bg-harbor/10 text-harbor">
            <ShoppingCart className="size-5" />
          </span>
          <h3 className="mt-4 text-xl font-bold">Pour les acheteurs africains</h3>
          <p className="mt-2 font-serif text-sm text-muted-foreground">
            Sourcez en confiance auprès de fournisseurs vérifiés, avec paiement et logistique intégrés.
          </p>
          <ul className="mt-5 space-y-2.5">
            {buyerPoints.map((p) => (
              <li key={p} className="flex items-start gap-2 text-sm">
                <Check className="mt-0.5 size-4 shrink-0 text-harbor" />
                {p}
              </li>
            ))}
          </ul>
          <Link
            href="/buyer"
            className="mt-6 inline-flex items-center gap-1.5 rounded-sm bg-atlantic px-4 py-2.5 text-sm font-medium text-atlantic-foreground"
          >
            Ouvrir l’espace acheteur <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export function ClosingCta() {
  return (
    <section className="bg-atlantic text-atlantic-foreground">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-6">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-gold">
            <Globe2 className="size-5" />
            <span className="text-sm font-medium">ZLECAf · CEDEAO · UEMOA</span>
          </span>
          <h2 className="mt-4 text-3xl font-bold tracking-tight text-balance md:text-4xl">
            Faites franchir les frontières à votre commerce
          </h2>
          <p className="mt-4 font-serif text-lg text-atlantic-foreground/70">
            Rejoignez le rail de commerce transfrontalier bâti à Lomé pour tout le continent.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/marketplace"
              className="inline-flex items-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground"
            >
              Explorer la place de marché <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/countries"
              className="inline-flex items-center gap-2 rounded-sm border border-white/20 px-5 py-3 text-sm font-semibold text-atlantic-foreground hover:bg-white/5"
            >
              Consulter les règles douanières
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

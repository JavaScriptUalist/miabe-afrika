import type { Metadata } from 'next'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { MarketplaceBrowser } from '@/components/marketplace/marketplace-browser'

export const metadata: Metadata = {
  title: 'Place de marché — Miabe Afrika',
  description:
    'Découvrez des produits togolais vérifiés et prêts pour l’export : miel, karité, cajou, pagne wax et plus.',
}

export default function MarketplacePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <MarketplaceBrowser />
      </main>
      <SiteFooter />
    </div>
  )
}

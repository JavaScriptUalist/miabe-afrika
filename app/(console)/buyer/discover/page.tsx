import { PageHeader } from '@/components/console/page-header'
import { MarketplaceBrowser } from '@/components/marketplace/marketplace-browser'

export default function BuyerDiscoverPage() {
  return (
    <>
      <PageHeader
        title="Découvrir"
        description="Catalogue vérifié — filtres par corridor, certification et préparation à l’export."
      />
      <div className="-mx-4 -mt-2 md:-mx-6">
        <MarketplaceBrowser embedded />
      </div>
    </>
  )
}

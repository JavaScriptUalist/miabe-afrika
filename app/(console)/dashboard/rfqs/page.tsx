import { PageHeader } from '@/components/console/page-header'
import { RfqWorkspace } from '@/components/console/rfq-workspace'

export default function RfqsPage() {
  return (
    <>
      <PageHeader
        title="Demandes de devis"
        description="Répondez aux acheteurs et suivez chaque dossier jusqu’au bon de commande."
      />
      <RfqWorkspace />
    </>
  )
}

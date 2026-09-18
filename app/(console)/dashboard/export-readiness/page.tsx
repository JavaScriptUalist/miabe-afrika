import { PageHeader } from '@/components/console/page-header'
import { ExportReadinessTool } from '@/components/console/export-readiness-tool'

export default function ExportReadinessPage() {
  return (
    <>
      <PageHeader
        title="Préparation à l’export"
        description="Vérifiez les documents requis pour chaque produit et pays de destination."
      />
      <ExportReadinessTool />
    </>
  )
}

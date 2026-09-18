import { FileText, Upload } from 'lucide-react'
import { PageHeader } from '@/components/console/page-header'
import { Panel } from '@/components/ui/panel'
import { documents } from '@/lib/data'
import { checkColor, checkLabels } from '@/lib/status'

export default function DocumentsPage() {
  return (
    <>
      <PageHeader
        title="Documents"
        description="Certificats, permis et analyses — avec suivi des échéances."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground">
            <Upload className="size-4" /> Téléverser un document
          </button>
        }
      />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs text-muted-foreground">
                <th className="px-4 py-3 font-medium">Document</th>
                <th className="px-4 py-3 font-medium">Type</th>
                <th className="px-4 py-3 font-medium">Détenteur</th>
                <th className="px-4 py-3 font-medium">Émis</th>
                <th className="px-4 py-3 font-medium">Expire</th>
                <th className="px-4 py-3 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {documents.map((d) => {
                const color = checkColor(d.status)
                return (
                  <tr
                    key={d.id}
                    className="rail hover:bg-bone/50"
                    style={{ ['--rail-color' as string]: color } as React.CSSProperties}
                  >
                    <td className="px-4 py-3">
                      <span className="flex items-center gap-2 font-medium">
                        <FileText className="size-4 text-muted-foreground" />
                        {d.name}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{d.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{d.owner}</td>
                    <td className="px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground">{d.issued}</td>
                    <td className="px-4 py-3 font-mono text-xs tabular-nums text-muted-foreground">{d.expires}</td>
                    <td className="px-4 py-3">
                      <span
                        className="inline-flex items-center gap-1.5 rounded-sm px-2 py-0.5 text-xs font-medium"
                        style={{ color, backgroundColor: `${color}14` }}
                      >
                        <span className="size-1.5 rounded-full" style={{ backgroundColor: color }} />
                        {checkLabels[d.status]}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  )
}

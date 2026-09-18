import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader, Stat } from '@/components/ui/panel'
import { BarChart, DonutChart, Gauge, HBarChart, LineChart } from '@/components/ui/charts'
import { intel, suppliers } from '@/lib/data'
import { railColors } from '@/lib/status'

export default function IntelligencePage() {
  return (
    <>
      <PageHeader
        title="Renseignements commerciaux"
        description="Valeur des échanges, demande par destination, performance fournisseurs et participation des PME."
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Stat label="Valeur nov. (M XOF)" value={intel.tradeValueByMonth.at(-1)?.value} sub="Corridors ouest-africains" accent={railColors.mangrove} />
        <Stat label="Volume RFQ" value={intel.rfqVolume.at(-1)?.value} sub="Novembre 2026" accent={railColors.harbor} />
        <Stat label="Réponse moyenne" value={`${intel.avgResponseHours} h`} sub="Fournisseurs vérifiés" accent={railColors.gold} />
        <Stat label="PME sur le rail" value={`${intel.smeParticipation} %`} sub="Part des transactions" accent={railColors.laterite} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Valeur échangée (M XOF)" />
          <div className="p-4">
            <LineChart data={intel.tradeValueByMonth} color={railColors.gold} />
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Volume de RFQ" />
          <div className="p-4">
            <BarChart data={intel.rfqVolume} color={railColors.harbor} />
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Demande par destination" />
          <div className="p-4">
            <DonutChart data={intel.demandByDestination} />
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Produits les plus demandés (M XOF)" />
          <div className="p-4">
            <HBarChart data={intel.topProducts} suffix=" M" />
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <Panel>
          <PanelHeader title="Qualité institutionnelle" />
          <div className="flex items-center justify-around p-6">
            <Gauge value={intel.qcSuccess} label="Contrôles conformes" />
            <Gauge value={intel.smeParticipation} label="Participation PME" />
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Performance fournisseurs" />
          <ul className="divide-y divide-border">
            {suppliers.map((s) => (
              <li key={s.id} className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="text-sm font-medium">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.city} · {s.capacity}
                  </p>
                </div>
                <p className="font-mono text-sm tabular-nums">{s.responseHours} h</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}

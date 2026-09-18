import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft } from 'lucide-react'
import { PageHeader } from '@/components/console/page-header'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { countries } from '@/lib/data'

export function generateStaticParams() {
  return countries.map((c) => ({ id: c.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const country = countries.find((c) => c.id === id)
  return { title: country ? `${country.name} — Miabe Afrika` : 'Pays introuvable' }
}

export default async function CountryDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const country = countries.find((c) => c.id === id)
  if (!country) notFound()

  return (
    <>
      <Link href="/countries" className="mb-4 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft className="size-4" /> Tous les corridors
      </Link>
      <PageHeader
        title={`${country.flag} ${country.name}`}
        description={`Règles d’importation, autorités et documentation pour le corridor Togo → ${country.name}.`}
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <Panel>
          <PanelHeader title="Cadre réglementaire" />
          <div className="space-y-3 p-4">
            <Field label="Autorités" value={country.authorities.join(', ')} />
            <Field label="Devise" value={country.currency} />
            <Field label="Droits moyens" value={country.avgDuty} />
            <Field
              label="Restrictions"
              value={country.restricted.length ? country.restricted.join(', ') : 'Aucune restriction listée'}
            />
          </div>
        </Panel>
        <Panel>
          <PanelHeader title="Documents types" />
          <ul className="divide-y divide-border">
            {country.rules.map((r) => (
              <li key={r.title} className="px-4 py-4">
                <p className="text-sm font-semibold">{r.title}</p>
                <p className="mt-1 font-serif text-sm leading-relaxed text-muted-foreground">{r.detail}</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  )
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-dashed border-border pb-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-sm font-medium">{value}</p>
    </div>
  )
}

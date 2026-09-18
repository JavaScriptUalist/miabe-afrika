import { Mail, UserPlus } from 'lucide-react'
import { PageHeader } from '@/components/console/page-header'
import { Panel } from '@/components/ui/panel'
import { team } from '@/lib/data'

function initials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
}

export default function TeamPage() {
  return (
    <>
      <PageHeader
        title="Équipe"
        description="Gérez les accès de votre organisation exportatrice."
        action={
          <button className="inline-flex items-center gap-1.5 rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground">
            <UserPlus className="size-4" /> Inviter un membre
          </button>
        }
      />
      <Panel>
        <ul className="divide-y divide-border">
          {team.map((m) => (
            <li key={m.id} className="flex items-center gap-3 px-4 py-3.5">
              <span className="flex size-10 items-center justify-center rounded-full bg-atlantic text-sm font-semibold text-atlantic-foreground">
                {initials(m.name)}
              </span>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium">{m.name}</p>
                <p className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Mail className="size-3" /> {m.email}
                </p>
              </div>
              <span className="text-sm text-muted-foreground">{m.role}</span>
              <span
                className={
                  m.status === 'active'
                    ? 'rounded-sm bg-mangrove/10 px-2 py-0.5 text-xs font-medium text-mangrove'
                    : 'rounded-sm bg-gold/15 px-2 py-0.5 text-xs font-medium text-gold'
                }
              >
                {m.status === 'active' ? 'Actif' : 'Invité'}
              </span>
            </li>
          ))}
        </ul>
      </Panel>
    </>
  )
}

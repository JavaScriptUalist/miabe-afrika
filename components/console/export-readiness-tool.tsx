'use client'

import { useMemo, useState } from 'react'
import { AlertTriangle, Check, Circle, Upload } from 'lucide-react'
import { Panel, PanelHeader } from '@/components/ui/panel'
import { exportReadiness, products } from '@/lib/data'
import { checkColor, checkLabels } from '@/lib/status'
import { cn } from '@/lib/utils'

export function ExportReadinessTool() {
  const combos = exportReadiness
  const [index, setIndex] = useState(0)
  const active = combos[index]
  const product = products.find((p) => p.id === active.productId)!

  const progress = useMemo(() => {
    const done = active.items.filter((i) => i.status === 'done').length
    return Math.round((done / active.items.length) * 100)
  }, [active])

  return (
    <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
      <div>
        <Panel>
          <PanelHeader title="Combinaisons" />
          <ul className="divide-y divide-border">
            {combos.map((c, i) => {
              const p = products.find((pp) => pp.id === c.productId)!
              return (
                <li key={`${c.productId}-${c.destination}`}>
                  <button
                    onClick={() => setIndex(i)}
                    className={cn(
                      'w-full px-4 py-3 text-left transition-colors',
                      i === index ? 'bg-bone' : 'hover:bg-bone/60',
                    )}
                  >
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">→ {c.destination}</p>
                  </button>
                </li>
              )
            })}
          </ul>
        </Panel>
      </div>

      <Panel>
        <PanelHeader
          title={`${product.name} → ${active.destination}`}
          action={
            <span className="font-mono text-sm font-semibold tabular-nums">{progress}%</span>
          }
        />
        <div className="p-4">
          <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-mangrove transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
          <ul className="space-y-2">
            {active.items.map((item) => {
              const color = checkColor(item.status)
              const Icon =
                item.status === 'done' ? Check : item.status === 'expiring' ? AlertTriangle : Circle
              return (
                <li
                  key={item.label}
                  className="rail flex items-center gap-3 rounded-sm border border-border bg-card px-3 py-2.5"
                  style={{ ['--rail-color' as string]: color } as React.CSSProperties}
                >
                  <span
                    className="flex size-6 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${color}18`, color }}
                  >
                    <Icon className="size-3.5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium">{item.label}</p>
                    {item.note && <p className="text-xs text-muted-foreground">{item.note}</p>}
                  </div>
                  <span className="text-xs font-medium" style={{ color }}>
                    {checkLabels[item.status]}
                  </span>
                  {item.status !== 'done' && (
                    <button className="inline-flex items-center gap-1 rounded-sm border border-border px-2 py-1 text-xs hover:border-gold">
                      <Upload className="size-3" /> Téléverser
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </Panel>
    </div>
  )
}

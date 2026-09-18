'use client'

import { cn } from '@/lib/utils'

const palette = ['#2f6f8f', '#c4a35a', '#1e4d3a', '#9c3b2a', '#0e2438']

export function BarChart({
  data,
  suffix = '',
  color = '#2f6f8f',
}: {
  data: { month?: string; name?: string; value: number }[]
  suffix?: string
  color?: string
}) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <div className="flex h-44 items-end gap-2">
      {data.map((d, i) => (
        <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
          <div className="flex w-full flex-1 items-end">
            <div
              className="w-full rounded-t-sm transition-all"
              style={{ height: `${(d.value / max) * 100}%`, backgroundColor: color }}
              title={`${d.value}${suffix}`}
            />
          </div>
          <span className="text-[10px] text-muted-foreground">{d.month ?? d.name}</span>
        </div>
      ))}
    </div>
  )
}

export function LineChart({
  data,
  color = '#c4a35a',
}: {
  data: { month?: string; value: number }[]
  color?: string
}) {
  const max = Math.max(...data.map((d) => d.value))
  const min = Math.min(...data.map((d) => d.value))
  const w = 100
  const h = 40
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w
    const y = h - ((d.value - min) / (max - min || 1)) * (h - 6) - 3
    return [x, y] as const
  })
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ')
  const area = `${path} L${w},${h} L0,${h} Z`
  return (
    <div className="w-full">
      <svg viewBox={`0 0 ${w} ${h}`} className="h-40 w-full" preserveAspectRatio="none">
        <path d={area} fill={color} opacity={0.12} />
        <path d={path} fill="none" stroke={color} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
        {pts.map((p, i) => (
          <circle key={i} cx={p[0]} cy={p[1]} r={1.4} fill={color} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="mt-1 flex justify-between">
        {data.map((d, i) => (
          <span key={i} className="text-[10px] text-muted-foreground">
            {d.month}
          </span>
        ))}
      </div>
    </div>
  )
}

export function DonutChart({
  data,
}: {
  data: { name: string; value: number }[]
}) {
  const total = data.reduce((a, b) => a + b.value, 0)
  let acc = 0
  const radius = 42
  const circ = 2 * Math.PI * radius
  return (
    <div className="flex items-center gap-5">
      <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
        {data.map((d, i) => {
          const frac = d.value / total
          const dash = frac * circ
          const el = (
            <circle
              key={i}
              cx="50"
              cy="50"
              r={radius}
              fill="none"
              stroke={palette[i % palette.length]}
              strokeWidth="14"
              strokeDasharray={`${dash} ${circ - dash}`}
              strokeDashoffset={-acc * circ}
            />
          )
          acc += frac
          return el
        })}
      </svg>
      <ul className="space-y-1.5 text-sm">
        {data.map((d, i) => (
          <li key={i} className="flex items-center gap-2">
            <span
              className="size-2.5 rounded-sm"
              style={{ backgroundColor: palette[i % palette.length] }}
            />
            <span className="text-foreground">{d.name}</span>
            <span className="ml-auto font-mono text-xs tabular-nums text-muted-foreground">
              {d.value}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function HBarChart({
  data,
  suffix = '',
}: {
  data: { name: string; value: number }[]
  suffix?: string
}) {
  const max = Math.max(...data.map((d) => d.value))
  return (
    <ul className="space-y-2.5">
      {data.map((d, i) => (
        <li key={i} className="grid grid-cols-[9rem_1fr_auto] items-center gap-3">
          <span className="truncate text-sm">{d.name}</span>
          <span className="h-3 rounded-sm bg-muted">
            <span
              className="block h-3 rounded-sm"
              style={{ width: `${(d.value / max) * 100}%`, backgroundColor: palette[i % palette.length] }}
            />
          </span>
          <span className="font-mono text-xs tabular-nums text-muted-foreground">
            {d.value}
            {suffix}
          </span>
        </li>
      ))}
    </ul>
  )
}

export function Gauge({ value, label }: { value: number; label: string }) {
  return (
    <div className={cn('flex flex-col items-center justify-center')}>
      <div className="relative size-24">
        <svg viewBox="0 0 100 100" className="size-24 -rotate-90">
          <circle cx="50" cy="50" r="42" fill="none" stroke="var(--muted)" strokeWidth="10" />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="#1e4d3a"
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(value / 100) * 2 * Math.PI * 42} ${2 * Math.PI * 42}`}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-mono text-lg font-semibold tabular-nums">
          {value}%
        </span>
      </div>
      <span className="mt-1 text-xs text-muted-foreground">{label}</span>
    </div>
  )
}

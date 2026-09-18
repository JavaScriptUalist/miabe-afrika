import { BadgeCheck, Clock, ShieldCheck, ShieldOff } from 'lucide-react'
import { type Verification, verificationLabels } from '@/lib/data'
import { verificationColor } from '@/lib/status'
import { cn } from '@/lib/utils'

export function VerificationBadge({
  v,
  className,
}: {
  v: Verification
  className?: string
}) {
  const color = verificationColor(v)
  const Icon =
    v === 'export-ready'
      ? BadgeCheck
      : v === 'verified'
        ? ShieldCheck
        : v === 'documents-pending'
          ? Clock
          : ShieldOff
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border px-2 py-0.5 text-xs font-medium',
        className,
      )}
      style={{ color, borderColor: `${color}55`, backgroundColor: `${color}12` }}
    >
      <Icon className="size-3.5" aria-hidden />
      {verificationLabels[v]}
    </span>
  )
}

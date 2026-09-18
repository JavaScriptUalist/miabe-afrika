import { cn } from '@/lib/utils'

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-7 items-center justify-center rounded-sm bg-atlantic text-gold',
        className,
      )}
      aria-hidden
    >
      {/* stylized M / trade compass */}
      <svg viewBox="0 0 24 24" className="size-4.5" fill="none">
        <path d="M4 19V6l8 6 8-6v13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </span>
  )
}

export function Wordmark({
  className,
  subtle = false,
}: {
  className?: string
  subtle?: boolean
}) {
  return (
    <span className={cn('flex items-center gap-2', className)}>
      <BrandMark />
      <span className="leading-none">
        <span className="block text-sm font-bold tracking-tight">Miabe Afrika</span>
        <span className={cn('block text-[10px] tracking-wide', subtle ? 'text-muted-foreground' : 'text-gold')}>
          par TOGOMALL
        </span>
      </span>
    </span>
  )
}

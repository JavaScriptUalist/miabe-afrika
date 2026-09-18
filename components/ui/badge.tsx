import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

export function Badge({
  children,
  className,
  dotColor,
}: {
  children: ReactNode
  className?: string
  dotColor?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-sm border border-border bg-card px-2 py-0.5 text-xs font-medium text-foreground',
        className,
      )}
    >
      {dotColor && (
        <span
          className="size-1.5 rounded-full"
          style={{ backgroundColor: dotColor }}
          aria-hidden
        />
      )}
      {children}
    </span>
  )
}

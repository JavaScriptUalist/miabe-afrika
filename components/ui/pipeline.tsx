import { Check } from 'lucide-react'
import { type WorkflowStage, workflowStages } from '@/lib/data'
import { cn } from '@/lib/utils'

export function PipelineStepper({
  current,
  orientation = 'vertical',
}: {
  current: WorkflowStage
  orientation?: 'vertical' | 'horizontal'
}) {
  const currentIndex = workflowStages.findIndex((s) => s.id === current)

  if (orientation === 'horizontal') {
    return (
      <ol className="flex items-center gap-1 overflow-x-auto">
        {workflowStages.map((s, i) => {
          const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo'
          return (
            <li key={s.id} className="flex items-center gap-1">
              <span
                className={cn(
                  'inline-flex items-center gap-1.5 whitespace-nowrap rounded-sm border px-2 py-1 text-xs',
                  state === 'done' && 'border-mangrove/40 bg-mangrove/10 text-mangrove',
                  state === 'current' && 'border-harbor/50 bg-harbor/10 font-semibold text-harbor',
                  state === 'todo' && 'border-border bg-card text-muted-foreground',
                )}
              >
                {state === 'done' && <Check className="size-3" />}
                {s.label}
              </span>
              {i < workflowStages.length - 1 && (
                <span className="h-px w-3 shrink-0 bg-border" aria-hidden />
              )}
            </li>
          )
        })}
      </ol>
    )
  }

  return (
    <ol className="relative">
      {workflowStages.map((s, i) => {
        const state = i < currentIndex ? 'done' : i === currentIndex ? 'current' : 'todo'
        const last = i === workflowStages.length - 1
        return (
          <li key={s.id} className="relative flex gap-3 pb-4 last:pb-0">
            {!last && (
              <span
                className={cn(
                  'absolute top-6 left-[11px] h-full w-px',
                  i < currentIndex ? 'bg-mangrove/50' : 'bg-border',
                )}
                aria-hidden
              />
            )}
            <span
              className={cn(
                'z-10 mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full border text-[10px] font-semibold',
                state === 'done' && 'border-mangrove bg-mangrove text-white',
                state === 'current' && 'border-harbor bg-harbor/10 text-harbor',
                state === 'todo' && 'border-border bg-card text-muted-foreground',
              )}
            >
              {state === 'done' ? <Check className="size-3.5" /> : i + 1}
            </span>
            <div className="pt-0.5">
              <p
                className={cn(
                  'text-sm',
                  state === 'current' ? 'font-semibold text-foreground' : 'text-foreground',
                  state === 'todo' && 'text-muted-foreground',
                )}
              >
                {s.label}
              </p>
              {state === 'current' && (
                <p className="text-xs text-harbor">En cours</p>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}

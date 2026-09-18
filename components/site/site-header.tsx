'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Wordmark } from '@/components/brand'
import { cn } from '@/lib/utils'

const nav = [
  { href: '/marketplace', label: 'Place de marché' },
  { href: '/fournisseurs', label: 'Fournisseurs' },
  { href: '/opportunites', label: 'Opportunités' },
  { href: '/countries', label: 'Pays & douanes' },
  { href: '/intelligence', label: 'Renseignements' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-paper/85 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-6 px-4 md:px-6">
        <Link href="/" aria-label="Miabe Afrika, accueil">
          <Wordmark />
        </Link>

        <nav className="ml-4 hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'rounded-sm px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-bone hover:text-foreground',
                pathname === item.href && 'text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden items-center gap-2 md:flex">
          <button className="rounded-sm border border-border px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground">
            FR / EN
          </button>
          <Link
            href="/login"
            className="rounded-sm px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
          >
            Connexion
          </Link>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-1.5 rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground transition-opacity hover:opacity-90"
          >
            Ouvrir la console
            <ArrowUpRight className="size-4" />
          </Link>
        </div>

        <button
          className="ml-auto md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Menu"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-paper md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-sm px-3 py-2.5 text-sm text-foreground hover:bg-bone"
              >
                {item.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setOpen(false)}
              className="rounded-sm px-3 py-2.5 text-sm text-foreground hover:bg-bone"
            >
              Connexion
            </Link>
            <Link
              href="/dashboard"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-sm bg-atlantic px-4 py-2.5 text-sm font-medium text-atlantic-foreground"
            >
              Ouvrir la console
              <ArrowUpRight className="size-4" />
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

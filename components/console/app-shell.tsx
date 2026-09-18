'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import {
  ArrowLeftRight,
  Banknote,
  Bell,
  Boxes,
  ChevronsUpDown,
  ClipboardList,
  Compass,
  FileCheck2,
  FileText,
  Globe2,
  LayoutDashboard,
  type LucideIcon,
  Menu,
  Package,
  Receipt,
  Scale,
  Search,
  ShieldCheck,
  Ship,
  ShoppingCart,
  Sparkles,
  Truck,
  Users,
  X,
} from 'lucide-react'
import { Wordmark } from '@/components/brand'
import { notifications } from '@/lib/data'
import { cn } from '@/lib/utils'

type NavItem = { href: string; label: string; icon: LucideIcon }
type Workspace = {
  id: string
  label: string
  root: string
  icon: LucideIcon
  items: NavItem[]
}

const workspaces: Workspace[] = [
  {
    id: 'supplier',
    label: 'Console fournisseur',
    root: '/dashboard',
    icon: Package,
    items: [
      { href: '/dashboard', label: 'Vue d’ensemble', icon: LayoutDashboard },
      { href: '/dashboard/products', label: 'Produits', icon: Package },
      { href: '/dashboard/rfqs', label: 'Demandes de devis', icon: ClipboardList },
      { href: '/dashboard/orders', label: 'Commandes', icon: Package },
      { href: '/dashboard/export-readiness', label: 'Préparation export', icon: FileCheck2 },
      { href: '/dashboard/documents', label: 'Documents', icon: FileText },
      { href: '/dashboard/inventory', label: 'Inventaire', icon: Boxes },
      { href: '/dashboard/payments', label: 'Paiements', icon: Banknote },
      { href: '/dashboard/team', label: 'Équipe', icon: Users },
    ],
  },
  {
    id: 'buyer',
    label: 'Espace acheteur',
    root: '/buyer',
    icon: ShoppingCart,
    items: [
      { href: '/buyer', label: 'Vue d’ensemble', icon: LayoutDashboard },
      { href: '/buyer/discover', label: 'Découvrir', icon: Compass },
      { href: '/buyer/opportunities', label: 'Demandes', icon: Sparkles },
      { href: '/buyer/rfqs', label: 'RFQ & devis', icon: ArrowLeftRight },
      { href: '/buyer/orders', label: 'Mes commandes', icon: Package },
      { href: '/buyer/invoices', label: 'Factures', icon: Receipt },
    ],
  },
  {
    id: 'ops',
    label: 'Opérations',
    root: '/operations',
    icon: Ship,
    items: [
      { href: '/operations', label: 'Centre de commande', icon: LayoutDashboard },
      { href: '/operations/matching', label: 'Matching', icon: ArrowLeftRight },
      { href: '/operations/quality', label: 'Qualité', icon: ShieldCheck },
      { href: '/operations/logistics', label: 'Logistique', icon: Truck },
      { href: '/operations/settlements', label: 'Règlements', icon: Banknote },
      { href: '/operations/disputes', label: 'Litiges', icon: Scale },
    ],
  },
]

function useActiveWorkspace() {
  const pathname = usePathname()
  return (
    [...workspaces]
      .sort((a, b) => b.root.length - a.root.length)
      .find((w) => pathname === w.root || pathname.startsWith(w.root + '/')) ?? workspaces[0]
  )
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const active = useActiveWorkspace()
  const [mobileNav, setMobileNav] = useState(false)
  const [switcher, setSwitcher] = useState(false)
  const [notif, setNotif] = useState(false)
  const unread = notifications.filter((n) => n.unread).length

  return (
    <div className="flex min-h-dvh bg-bone/50">
      {/* sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border bg-paper transition-transform md:static md:translate-x-0',
          mobileNav ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link href="/">
            <Wordmark />
          </Link>
          <button className="md:hidden" onClick={() => setMobileNav(false)} aria-label="Fermer">
            <X className="size-5" />
          </button>
        </div>

        {/* workspace switcher */}
        <div className="relative border-b border-border p-3">
          <button
            onClick={() => setSwitcher((v) => !v)}
            className="flex w-full items-center gap-2 rounded-sm border border-border bg-card px-3 py-2 text-left text-sm hover:border-gold"
          >
            <active.icon className="size-4 text-harbor" />
            <span className="flex-1 font-medium">{active.label}</span>
            <ChevronsUpDown className="size-4 text-muted-foreground" />
          </button>
          {switcher && (
            <div className="absolute inset-x-3 top-full z-20 mt-1 overflow-hidden rounded-sm border border-border bg-card shadow-lg">
              {workspaces.map((w) => (
                <Link
                  key={w.id}
                  href={w.root}
                  onClick={() => setSwitcher(false)}
                  className={cn(
                    'flex items-center gap-2 px-3 py-2 text-sm hover:bg-bone',
                    w.id === active.id && 'bg-bone font-medium',
                  )}
                >
                  <w.icon className="size-4 text-harbor" />
                  {w.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <nav className="flex-1 space-y-0.5 overflow-y-auto p-3">
          {active.items.map((item) => {
            const current =
              pathname === item.href ||
              (item.href !== active.root && pathname.startsWith(item.href + '/'))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileNav(false)}
                className={cn(
                  'flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm transition-colors',
                  current
                    ? 'bg-atlantic text-atlantic-foreground'
                    : 'text-muted-foreground hover:bg-bone hover:text-foreground',
                )}
              >
                <item.icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-border p-3">
          <Link
            href="/countries"
            className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-bone hover:text-foreground"
          >
            <Globe2 className="size-4" />
            Connaissance pays
          </Link>
          <Link
            href="/intelligence"
            className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-muted-foreground hover:bg-bone hover:text-foreground"
          >
            <Sparkles className="size-4" />
            Renseignements
          </Link>
        </div>
      </aside>

      {mobileNav && (
        <div className="fixed inset-0 z-40 bg-atlantic/40 md:hidden" onClick={() => setMobileNav(false)} />
      )}

      {/* main */}
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-paper/85 px-4 backdrop-blur md:px-6">
          <button className="md:hidden" onClick={() => setMobileNav(true)} aria-label="Menu">
            <Menu className="size-5" />
          </button>
          <div className="relative hidden max-w-sm flex-1 md:block">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              placeholder="Rechercher RFQ, commande, produit…"
              className="w-full rounded-sm border border-border bg-card py-2 pr-3 pl-9 text-sm outline-none focus:border-gold"
            />
          </div>
          <div className="ml-auto flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setNotif((v) => !v)}
                className="relative flex size-9 items-center justify-center rounded-sm border border-border bg-card hover:border-gold"
                aria-label="Notifications"
              >
                <Bell className="size-4" />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-laterite text-[10px] font-semibold text-white">
                    {unread}
                  </span>
                )}
              </button>
              {notif && (
                <div className="absolute right-0 top-full z-30 mt-1 w-80 overflow-hidden rounded-md border border-border bg-card shadow-lg">
                  <p className="border-b border-border px-4 py-2.5 text-sm font-semibold">Notifications</p>
                  <ul className="max-h-96 divide-y divide-border overflow-y-auto">
                    {notifications.map((n) => (
                      <li key={n.id} className={cn('px-4 py-3', n.unread && 'bg-gold/5')}>
                        <div className="flex items-start gap-2">
                          {n.unread && <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-laterite" />}
                          <div className={cn(!n.unread && 'pl-3.5')}>
                            <p className="text-sm font-medium">{n.title}</p>
                            <p className="text-xs text-muted-foreground">{n.detail}</p>
                            <p className="mt-0.5 text-[10px] text-muted-foreground">{n.time}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex items-center gap-2 rounded-sm border border-border bg-card py-1.5 pr-3 pl-1.5">
              <span className="flex size-6 items-center justify-center rounded-sm bg-atlantic text-xs font-semibold text-atlantic-foreground">
                AK
              </span>
              <span className="hidden text-sm sm:block">Ama Koffi</span>
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}

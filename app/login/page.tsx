'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Wordmark } from '@/components/brand'

const roles = [
  { id: 'supplier', label: 'Fournisseur', href: '/dashboard', hint: 'Catalogue, RFQ, export' },
  { id: 'buyer', label: 'Acheteur', href: '/buyer', hint: 'Sourcing et commandes' },
  { id: 'ops', label: 'Opérations TOGOMALL', href: '/operations', hint: 'Matching et règlements' },
] as const

export default function LoginPage() {
  const router = useRouter()
  const [role, setRole] = useState<(typeof roles)[number]['id']>('supplier')

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <form
          className="w-full max-w-md rounded-lg border border-border bg-card p-6"
          onSubmit={(e) => {
            e.preventDefault()
            const next = roles.find((r) => r.id === role)!
            router.push(next.href)
          }}
        >
          <Wordmark />
          <h1 className="mt-6 text-2xl font-bold tracking-tight">Connexion</h1>
          <p className="mt-1 font-serif text-sm text-muted-foreground">
            Prototype — choisissez un espace pour entrer dans la console.
          </p>
          <div className="mt-6 space-y-2">
            {roles.map((r) => (
              <label
                key={r.id}
                className="flex cursor-pointer items-start gap-3 rounded-sm border border-border px-3 py-2.5 has-[:checked]:border-gold has-[:checked]:bg-gold/5"
              >
                <input
                  type="radio"
                  name="role"
                  checked={role === r.id}
                  onChange={() => setRole(r.id)}
                  className="mt-1"
                />
                <span>
                  <span className="block text-sm font-medium">{r.label}</span>
                  <span className="text-xs text-muted-foreground">{r.hint}</span>
                </span>
              </label>
            ))}
          </div>
          <label className="mt-5 block">
            <span className="mb-1 block text-xs text-muted-foreground">E-mail</span>
            <input className="input" type="email" defaultValue="ama@mielplateaux.tg" />
          </label>
          <label className="mt-3 block">
            <span className="mb-1 block text-xs text-muted-foreground">Mot de passe</span>
            <input className="input" type="password" defaultValue="demo" />
          </label>
          <button className="mt-5 w-full rounded-sm bg-atlantic px-4 py-2.5 text-sm font-medium text-atlantic-foreground">
            Entrer
          </button>
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-harbor hover:underline">
              Créer une organisation
            </Link>
          </p>
        </form>
      </main>
      <SiteFooter />
    </div>
  )
}

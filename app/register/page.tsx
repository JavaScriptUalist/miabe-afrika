'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'

export default function RegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [kind, setKind] = useState<'supplier' | 'buyer'>('supplier')

  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="w-full max-w-lg rounded-lg border border-border bg-card p-6">
          <p className="text-xs text-muted-foreground">Étape {step} / 2</p>
          {step === 1 ? (
            <>
              <h1 className="mt-2 text-2xl font-bold tracking-tight">Créer une organisation</h1>
              <p className="mt-1 font-serif text-sm text-muted-foreground">
                Chaque entreprise reçoit un espace isolé. TOGOMALL supervise l’écosystème.
              </p>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setKind('supplier')}
                  className={`rounded-sm border px-4 py-4 text-left ${kind === 'supplier' ? 'border-gold bg-gold/5' : 'border-border'}`}
                >
                  <p className="text-sm font-semibold">Fournisseur</p>
                  <p className="mt-1 text-xs text-muted-foreground">Producteur, coopérative, transformateur</p>
                </button>
                <button
                  type="button"
                  onClick={() => setKind('buyer')}
                  className={`rounded-sm border px-4 py-4 text-left ${kind === 'buyer' ? 'border-gold bg-gold/5' : 'border-border'}`}
                >
                  <p className="text-sm font-semibold">Acheteur</p>
                  <p className="mt-1 text-xs text-muted-foreground">Grossiste, importateur, institution</p>
                </button>
              </div>
              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full rounded-sm bg-atlantic px-4 py-2.5 text-sm font-medium text-atlantic-foreground"
              >
                Continuer
              </button>
            </>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                router.push(kind === 'supplier' ? '/dashboard' : '/buyer')
              }}
              className="space-y-3"
            >
              <h1 className="text-2xl font-bold tracking-tight">Identité de l’entreprise</h1>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">Raison sociale</span>
                <input required className="input" placeholder="Coopérative Miel des Plateaux" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">Ville</span>
                <input required className="input" placeholder="Kpalimé" />
              </label>
              <label className="block">
                <span className="mb-1 block text-xs text-muted-foreground">E-mail professionnel</span>
                <input required type="email" className="input" placeholder="export@entreprise.tg" />
              </label>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="rounded-sm border border-border px-4 py-2.5 text-sm"
                >
                  Retour
                </button>
                <button className="flex-1 rounded-sm bg-atlantic px-4 py-2.5 text-sm font-medium text-atlantic-foreground">
                  Ouvrir l’espace
                </button>
              </div>
            </form>
          )}
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Déjà inscrit ?{' '}
            <Link href="/login" className="text-harbor hover:underline">
              Connexion
            </Link>
          </p>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

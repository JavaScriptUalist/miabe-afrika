'use client'

import { useState } from 'react'
import { Check, FileText, X } from 'lucide-react'
import type { Product } from '@/lib/data'
import { cn } from '@/lib/utils'

export function RfqDialog({ product }: { product: Product }) {
  const [open, setOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({
    quantity: '',
    destination: 'Nigéria',
    incoterm: 'FOB Lomé',
    neededBy: '',
    message: '',
  })

  function reset() {
    setOpen(false)
    setTimeout(() => setSubmitted(false), 200)
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
      >
        <FileText className="size-4" />
        Demander un devis (RFQ)
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-atlantic/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
          onClick={reset}
        >
          <div
            className="w-full max-w-lg rounded-t-lg border border-border bg-card sm:rounded-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <h2 className="text-sm font-semibold">
                {submitted ? 'Demande envoyée' : 'Demande de devis'}
              </h2>
              <button onClick={reset} aria-label="Fermer" className="text-muted-foreground hover:text-foreground">
                <X className="size-5" />
              </button>
            </div>

            {submitted ? (
              <div className="px-5 py-10 text-center">
                <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-mangrove/10 text-mangrove">
                  <Check className="size-6" />
                </span>
                <p className="mt-4 font-semibold">Votre RFQ a été transmise</p>
                <p className="mx-auto mt-1 max-w-sm font-serif text-sm text-muted-foreground">
                  {product.name} — le fournisseur répond généralement sous 24 h. Suivez l’avancement
                  dans votre espace acheteur.
                </p>
                <button
                  onClick={reset}
                  className="mt-6 rounded-sm border border-border px-4 py-2 text-sm font-medium hover:border-atlantic"
                >
                  Fermer
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  setSubmitted(true)
                }}
                className="space-y-4 px-5 py-5"
              >
                <p className="rounded-sm bg-bone px-3 py-2 text-xs text-muted-foreground">
                  Produit : <span className="font-medium text-foreground">{product.name}</span> · MOQ{' '}
                  {product.moq}
                </p>
                <Field label="Quantité souhaitée">
                  <input
                    required
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: e.target.value })}
                    placeholder="ex. 5 tonnes"
                    className="input"
                  />
                </Field>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Destination">
                    <select
                      value={form.destination}
                      onChange={(e) => setForm({ ...form, destination: e.target.value })}
                      className="input"
                    >
                      {['Nigéria', 'Ghana', 'Côte d’Ivoire', 'Bénin', 'Sénégal'].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Incoterm">
                    <select
                      value={form.incoterm}
                      onChange={(e) => setForm({ ...form, incoterm: e.target.value })}
                      className="input"
                    >
                      {['FOB Lomé', 'CIF', 'EXW', 'DAP'].map((d) => (
                        <option key={d}>{d}</option>
                      ))}
                    </select>
                  </Field>
                </div>
                <Field label="Livraison souhaitée">
                  <input
                    type="date"
                    value={form.neededBy}
                    onChange={(e) => setForm({ ...form, neededBy: e.target.value })}
                    className="input"
                  />
                </Field>
                <Field label="Message (facultatif)">
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    rows={3}
                    placeholder="Précisions sur l’emballage, l’étiquetage, la certification…"
                    className="input resize-none"
                  />
                </Field>
                <button
                  type="submit"
                  className="w-full rounded-sm bg-atlantic px-4 py-2.5 text-sm font-semibold text-atlantic-foreground"
                >
                  Envoyer la demande
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className={cn('block')}>
      <span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>
      {children}
    </label>
  )
}

import type { Verification, WorkflowStage } from './data'

// Maps a semantic status to a hex color used for the left rail on rows,
// plus tailwind text/bg classes for inline chips.

export const railColors = {
  gold: '#c4a35a',
  laterite: '#9c3b2a',
  mangrove: '#1e4d3a',
  harbor: '#2f6f8f',
  muted: '#a89d86',
}

export function verificationColor(v: Verification) {
  switch (v) {
    case 'export-ready':
      return railColors.mangrove
    case 'verified':
      return railColors.harbor
    case 'documents-pending':
      return railColors.gold
    default:
      return railColors.muted
  }
}

export function verificationTextClass(v: Verification) {
  switch (v) {
    case 'export-ready':
      return 'text-mangrove'
    case 'verified':
      return 'text-harbor'
    case 'documents-pending':
      return 'text-gold'
    default:
      return 'text-muted-foreground'
  }
}

export type CheckStatus = 'done' | 'missing' | 'expiring' | 'valid' | 'expired'

export function checkColor(s: CheckStatus) {
  switch (s) {
    case 'done':
    case 'valid':
      return railColors.mangrove
    case 'expiring':
      return railColors.gold
    case 'missing':
    case 'expired':
      return railColors.laterite
    default:
      return railColors.muted
  }
}

export const checkLabels: Record<CheckStatus, string> = {
  done: 'Fait',
  valid: 'Valide',
  expiring: 'Expire bientôt',
  missing: 'Manquant',
  expired: 'Expiré',
}

export function paymentColor(s: 'awaiting' | 'escrow' | 'partial' | 'paid') {
  switch (s) {
    case 'paid':
      return railColors.mangrove
    case 'escrow':
      return railColors.harbor
    case 'partial':
      return railColors.gold
    default:
      return railColors.laterite
  }
}

export const paymentLabels: Record<'awaiting' | 'escrow' | 'partial' | 'paid', string> = {
  awaiting: 'En attente',
  escrow: 'Séquestre',
  partial: 'Partiel',
  paid: 'Payé',
}

export function stageColor(current: WorkflowStage) {
  // in-progress workflow uses harbor
  return railColors.harbor
}

export const invoiceStatusLabels: Record<string, string> = {
  draft: 'Brouillon',
  sent: 'Émise',
  partial: 'Partielle',
  paid: 'Payée',
  overdue: 'En retard',
}

export function invoiceStatusColor(s: string) {
  switch (s) {
    case 'paid':
      return railColors.mangrove
    case 'sent':
      return railColors.harbor
    case 'partial':
      return railColors.gold
    case 'overdue':
      return railColors.laterite
    default:
      return railColors.muted
  }
}

export const payoutLabels: Record<string, string> = {
  due: 'À verser',
  scheduled: 'Planifié',
  paid: 'Versé',
}

export function payoutColor(s: string) {
  switch (s) {
    case 'paid':
      return railColors.mangrove
    case 'scheduled':
      return railColors.harbor
    default:
      return railColors.laterite
  }
}

export const qcLabels: Record<string, string> = {
  pending: 'Programmé',
  pass: 'Conforme',
  fail: 'Non conforme',
}

export function qcColor(s: string) {
  switch (s) {
    case 'pass':
      return railColors.mangrove
    case 'fail':
      return railColors.laterite
    default:
      return railColors.gold
  }
}

export const disputeLabels: Record<string, string> = {
  open: 'Ouvert',
  review: 'En revue',
  resolved: 'Clos',
}

export function disputeColor(s: string) {
  switch (s) {
    case 'resolved':
      return railColors.mangrove
    case 'review':
      return railColors.gold
    default:
      return railColors.laterite
  }
}

export const rfqStatusLabels: Record<string, string> = {
  new: 'Nouveau',
  quoted: 'Devis envoyé',
  negotiating: 'En négociation',
  accepted: 'Accepté',
  declined: 'Refusé',
}

export function rfqStatusColor(s: string) {
  switch (s) {
    case 'accepted':
      return railColors.mangrove
    case 'negotiating':
      return railColors.gold
    case 'quoted':
      return railColors.harbor
    case 'declined':
      return railColors.laterite
    default:
      return railColors.muted
  }
}

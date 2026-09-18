import { SiteHeader } from '@/components/site/site-header'
import { SiteFooter } from '@/components/site/site-footer'
import { Hero } from '@/components/site/landing/hero'
import { HowItWorks } from '@/components/site/landing/how-it-works'
import {
  Audiences,
  ClosingCta,
  MarketplacePreview,
} from '@/components/site/landing/audiences'

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <HowItWorks />
        <MarketplacePreview />
        <Audiences />
        <ClosingCta />
      </main>
      <SiteFooter />
    </div>
  )
}

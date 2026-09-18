import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-paper px-4 text-center">
      <p className="font-mono text-sm text-gold">404</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight">Page introuvable</h1>
      <p className="mt-2 max-w-md font-serif text-muted-foreground">
        Cette route n’existe pas encore sur le rail Miabe Afrika.
      </p>
      <Link
        href="/"
        className="mt-6 rounded-sm bg-atlantic px-4 py-2 text-sm font-medium text-atlantic-foreground"
      >
        Retour à l’accueil
      </Link>
    </div>
  )
}

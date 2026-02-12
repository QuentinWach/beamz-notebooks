import { Link } from 'react-router'

export function NotFoundPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-20 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground text-lg mb-6">Page not found.</p>
      <Link to="/" className="text-primary underline">
        Back to examples
      </Link>
    </div>
  )
}

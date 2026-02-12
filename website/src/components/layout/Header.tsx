import { Link } from 'react-router'
import { BookOpen } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
          <BookOpen className="h-5 w-5" />
          BEAMZ Examples
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="https://github.com/quentinwach/beamz-notebooks"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  )
}

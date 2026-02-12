import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { BookOpen, Github, Star } from 'lucide-react'

export function Header() {
  const [stars, setStars] = useState<number | null>(null)

  useEffect(() => {
    fetch('https://api.github.com/repos/quentinwach/beamz')
      .then(r => r.ok ? r.json() : null)
      .then(data => { if (data?.stargazers_count != null) setStars(data.stargazers_count) })
      .catch(() => {})
  }, [])

  return (
    <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-14 px-4">
        <Link to="/" className="flex items-center gap-2 font-semibold text-lg hover:opacity-80 transition-opacity">
          <BookOpen className="h-5 w-5" />
          BEAMZ Notebooks
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="https://github.com/quentinwach/beamz"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Github className="h-4 w-4" />
            {stars != null && (
              <span className="flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-current" />
                {stars}
              </span>
            )}
          </a>
        </nav>
      </div>
    </header>
  )
}

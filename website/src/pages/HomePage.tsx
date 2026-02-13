import { useState, useMemo } from 'react'
import { notebooks } from '@/data/notebooks.gen'
import { GalleryCard } from '@/components/gallery/GalleryCard'
import { SubmitNotebookCard } from '@/components/gallery/SubmitNotebookCard'
import { Badge } from '@/components/ui/badge'
import { Search, Copy, Check } from 'lucide-react'

function PipInstall() {
  const [copied, setCopied] = useState(false)
  const command = 'pip install beamz'

  function copy() {
    navigator.clipboard.writeText(command)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-md border border-border bg-muted px-4 py-2 text-sm font-mono">
      <span className="select-all">{command}</span>
      <button
        onClick={copy}
        className="text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Copy install command"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  )
}

export function HomePage() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState<string | null>(null)

  const tags = useMemo(
    () => Array.from(new Set(notebooks.flatMap((nb) => nb.tags))),
    []
  )

  const filtered = useMemo(() => {
    const q = query.toLowerCase()
    return notebooks.filter((nb) => {
      if (activeTag && !nb.tags.includes(activeTag)) return false
      if (q && !nb.title.toLowerCase().includes(q) && !nb.description.toLowerCase().includes(q) && !nb.tags.some(t => t.toLowerCase().includes(q))) return false
      return true
    })
  }, [query, activeTag])

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-8 text-center">
        <p className="text-muted-foreground text-lg mb-4">
        Jupyter notebooks demonstrating photonic simulation, <br />
          visualization, and optimization workflows with <a href="https://github.com/QuentinWach/beamz" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-4 hover:text-primary/80">BEAMZ</a>.
        </p>
      </div>

      {/* Search bar */}
      <div className="relative max-w-xl mx-auto mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search examples..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        />
      </div>

      {/* Tag filter pills */}
      {tags.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button onClick={() => setActiveTag(null)}>
            <Badge variant={activeTag === null ? 'default' : 'outline'}>
              All
            </Badge>
          </button>
          {tags.map((tag) => (
            <button key={tag} onClick={() => setActiveTag(tag)}>
              <Badge variant={activeTag === tag ? 'default' : 'outline'}>
                {tag}
              </Badge>
            </button>
          ))}
        </div>
      )}

      {/* Notebook grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <SubmitNotebookCard />
        {filtered.length > 0 ? (
          filtered.map((nb) => (
            <GalleryCard key={nb.slug} notebook={nb} />
          ))
        ) : (
          <p className="text-center text-muted-foreground py-12 col-span-full">
            No examples found matching your filters.
          </p>
        )}
      </div>
    </div>
  )
}

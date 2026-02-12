import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router'
import { ArrowLeft, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { NotebookRenderer } from '@/components/notebook/NotebookRenderer'
import { TableOfContents } from '@/components/layout/TableOfContents'
import { notebooks } from '@/data/notebooks.gen'
import type { ParsedNotebook } from '@/types/notebook'

// Lazy load notebook data modules
const loaders: Record<string, () => Promise<{ default: ParsedNotebook }>> = {
  animation_demo: () => import('@/data/nb-animation_demo.gen'),
  ring_resonator: () => import('@/data/nb-ring_resonator.gen'),
  topo_opt_bend: () => import('@/data/nb-topo_opt_bend.gen'),
}

export function NotebookPage() {
  const { slug } = useParams<{ slug: string }>()
  const [notebook, setNotebook] = useState<ParsedNotebook | null>(null)
  const [loading, setLoading] = useState(true)

  const meta = notebooks.find(nb => nb.slug === slug)

  useEffect(() => {
    if (!slug || !loaders[slug]) {
      setLoading(false)
      return
    }

    setLoading(true)
    loaders[slug]().then(mod => {
      setNotebook(mod.default)
      setLoading(false)
    })
  }, [slug])

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-muted rounded w-2/3" />
          <div className="h-4 bg-muted rounded w-1/2" />
          <div className="h-64 bg-muted rounded" />
        </div>
      </div>
    )
  }

  if (!notebook || !meta) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Notebook not found</h1>
        <Link to="/" className="text-primary underline">Back to examples</Link>
      </div>
    )
  }

  // Find original filename for download
  const filename = `${slug!.replace(/_/g, '_')}.ipynb`

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      <div className="flex gap-8">
        <article className="flex-1 min-w-0 max-w-4xl">
          <div className="mb-6">
            <Link to="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-4">
              <ArrowLeft className="h-4 w-4" />
              Back to examples
            </Link>
            <div className="flex items-center justify-between">
              <div />
              <Button variant="outline" size="sm" asChild>
                <a href={`${import.meta.env.BASE_URL}notebooks/${filename}`} download>
                  <Download className="h-4 w-4 mr-2" />
                  Download .ipynb
                </a>
              </Button>
            </div>
          </div>

          <NotebookRenderer notebook={notebook} />
        </article>

        <TableOfContents entries={notebook.toc} />
      </div>
    </div>
  )
}

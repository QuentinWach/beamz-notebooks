import { Link } from 'react-router'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { NotebookMeta } from '@/types/notebook'

function formatDate(dateStr: string): string {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

export function GalleryCard({ notebook }: { notebook: NotebookMeta }) {
  return (
    <Link to={`/examples/${notebook.slug}`}>
      <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer overflow-hidden">
        {notebook.previewImage && (
          <div className="w-full h-40 overflow-hidden border-b">
            <img
              src={notebook.previewImage}
              alt={`Preview of ${notebook.title}`}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <CardHeader>
          {notebook.tags.length > 0 && (
            <div className="flex items-center gap-2 mb-1">
              {notebook.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
          <CardTitle className="text-base leading-snug">{notebook.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {notebook.description}
          </CardDescription>
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-1">
            <span>{notebook.author}</span>
            <span>·</span>
            <span>{formatDate(notebook.publishedDate)}</span>
            {notebook.beamzVersion && (
              <>
                <span>·</span>
                <span>Beamz {notebook.beamzVersion}</span>
              </>
            )}
          </div>
        </CardHeader>
      </Card>
    </Link>
  )
}

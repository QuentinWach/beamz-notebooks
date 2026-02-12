import { Link } from 'react-router'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { NotebookMeta } from '@/types/notebook'

export function GalleryCard({ notebook }: { notebook: NotebookMeta }) {
  return (
    <Link to={`/examples/${notebook.slug}`}>
      <Card className="h-full hover:border-foreground/20 transition-colors cursor-pointer">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant="secondary" className="text-xs">
              {notebook.category}
            </Badge>
          </div>
          <CardTitle className="text-base leading-snug">{notebook.title}</CardTitle>
          <CardDescription className="line-clamp-2 text-sm">
            {notebook.description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  )
}

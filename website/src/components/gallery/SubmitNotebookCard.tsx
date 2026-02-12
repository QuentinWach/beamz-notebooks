import { Plus, ExternalLink } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'

export function SubmitNotebookCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="h-full border-dashed border-2 hover:border-foreground/20 transition-colors cursor-pointer">
          <CardHeader>
            <div className="flex items-center gap-2 mb-1">
              <Plus className="size-5 text-muted-foreground" />
            </div>
            <CardTitle className="text-base leading-snug">
              Submit a Notebook
            </CardTitle>
            <CardDescription className="line-clamp-2 text-sm">
              Share your work with the community
            </CardDescription>
          </CardHeader>
        </Card>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit a Notebook</DialogTitle>
          <DialogDescription>
            Contribute a Jupyter notebook to the BEAMZ examples gallery via a
            GitHub pull request.
          </DialogDescription>
        </DialogHeader>
        <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
          <li>
            Fork the{' '}
            <a
              href="https://github.com/QuentinWach/beamz-notebooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              beamz-notebooks
            </a>{' '}
            repository on GitHub
          </li>
          <li>
            Add your <code className="bg-muted px-1 rounded text-xs">.ipynb</code> file
            to the <code className="bg-muted px-1 rounded text-xs">notebooks/</code> directory
          </li>
          <li>Open a pull request against the main branch</li>
        </ol>

        <div className="mt-3 rounded-md border bg-muted/50 p-3">
          <p className="text-sm font-medium mb-2">Notebook format</p>
          <p className="text-xs text-muted-foreground mb-2">
            <strong>Cell 1</strong> (markdown) — title as <code className="bg-muted px-1 rounded"># Heading</code> followed by a description paragraph.
          </p>
          <p className="text-xs text-muted-foreground mb-2">
            <strong>Cell 2</strong> (markdown, optional) — metadata:
          </p>
          <pre className="text-xs bg-muted rounded p-2 mb-2 overflow-x-auto"><code>{'**Author:** Your Name\n**Published:** 2025-01-15\n**Updated:** 2025-02-01'}</code></pre>
          <p className="text-xs text-muted-foreground">
            All fields are optional. You can also drag & drop a preview image into this cell. If omitted, the first plot output is used automatically.
          </p>
        </div>
        <Button asChild className="mt-2">
          <a
            href="https://github.com/QuentinWach/beamz-notebooks"
            target="_blank"
            rel="noopener noreferrer"
          >
            Open GitHub Repo
            <ExternalLink className="size-4" />
          </a>
        </Button>
      </DialogContent>
    </Dialog>
  )
}

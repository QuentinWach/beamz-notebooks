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
              href="https://github.com/QuentinWach/beamz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline underline-offset-4 hover:text-primary/80"
            >
              beamz
            </a>{' '}
            repository on GitHub
          </li>
          <li>
            Add your <code className="bg-muted px-1 rounded text-xs">.ipynb</code> file
            to the <code className="bg-muted px-1 rounded text-xs">notebooks/</code> directory
          </li>
          <li>Open a pull request against the main branch</li>
        </ol>
        <Button asChild className="mt-2">
          <a
            href="https://github.com/QuentinWach/beamz"
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

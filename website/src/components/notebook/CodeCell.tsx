import { useState } from 'react'
import { Copy, Check } from 'lucide-react'
import type { ParsedCell } from '@/types/notebook'

export function CodeCell({ cell }: { cell: ParsedCell }) {
  const [copied, setCopied] = useState(false)

  if (!cell.source.trim()) return null

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cell.source)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="group relative my-2">
      <div className="flex items-center justify-between bg-muted/50 border border-border rounded-t-md px-3 py-1 text-xs text-muted-foreground">
        <span>
          {cell.executionCount != null ? `In [${cell.executionCount}]` : 'Python'}
        </span>
        <button
          onClick={handleCopy}
          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-muted rounded"
          title="Copy code"
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
        </button>
      </div>
      <div
        className="border border-t-0 border-border rounded-b-md overflow-x-auto [&_pre]:!m-0 [&_pre]:!rounded-none [&_pre]:!rounded-b-md"
        dangerouslySetInnerHTML={{ __html: cell.highlightedHtml || '' }}
      />
    </div>
  )
}

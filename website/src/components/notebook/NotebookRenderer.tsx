import type { ParsedNotebook } from '@/types/notebook'
import { MarkdownCell } from './MarkdownCell'
import { CodeCell } from './CodeCell'
import { OutputCell } from './OutputCell'

export function NotebookRenderer({ notebook }: { notebook: ParsedNotebook }) {
  return (
    <div className="space-y-1">
      {notebook.cells.map((cell, i) => {
        if (cell.cellType === 'markdown') {
          return <MarkdownCell key={i} cell={cell} />
        }

        return (
          <div key={i}>
            <CodeCell cell={cell} />
            <OutputCell outputs={cell.outputs} />
          </div>
        )
      })}
    </div>
  )
}

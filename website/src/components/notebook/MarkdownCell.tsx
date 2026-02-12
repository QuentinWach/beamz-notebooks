import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import type { Components } from 'react-markdown'
import type { ParsedCell } from '@/types/notebook'

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

const components: Components = {
  h1: ({ children, ...props }) => {
    const text = String(children)
    return <h1 id={slugify(text)} {...props}>{children}</h1>
  },
  h2: ({ children, ...props }) => {
    const text = String(children)
    return <h2 id={slugify(text)} {...props}>{children}</h2>
  },
  h3: ({ children, ...props }) => {
    const text = String(children)
    return <h3 id={slugify(text)} {...props}>{children}</h3>
  },
  h4: ({ children, ...props }) => {
    const text = String(children)
    return <h4 id={slugify(text)} {...props}>{children}</h4>
  },
}

export function MarkdownCell({ cell }: { cell: ParsedCell }) {
  return (
    <div className="notebook-content">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex, rehypeRaw]}
        components={components}
      >
        {cell.source}
      </ReactMarkdown>
    </div>
  )
}

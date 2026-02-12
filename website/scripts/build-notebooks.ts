import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { createHighlighter } from 'shiki'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const NOTEBOOKS_DIR = path.resolve(__dirname, '../../notebooks')
const DATA_DIR = path.resolve(__dirname, '../src/data')
const PUBLIC_NB_DIR = path.resolve(__dirname, '../public/notebooks')

interface RawNotebook {
  cells: RawCell[]
  metadata?: Record<string, unknown>
}

interface RawCell {
  cell_type: 'markdown' | 'code' | 'raw'
  source: string[]
  outputs?: RawOutput[]
  execution_count?: number | null
}

interface RawOutput {
  output_type: string
  text?: string[]
  data?: Record<string, string | string[]>
  ename?: string
  evalue?: string
  traceback?: string[]
}

function slugify(filename: string): string {
  return filename.replace(/\.ipynb$/, '').replace(/[^a-z0-9]+/gi, '_').toLowerCase()
}

function extractMetadata(cells: RawCell[]): { title: string; description: string; category: string; tags: string[] } {
  const firstMd = cells.find(c => c.cell_type === 'markdown')
  if (!firstMd) return { title: 'Untitled', description: '', category: 'General', tags: [] }

  const source = firstMd.source.join('')
  const titleMatch = source.match(/^#\s+(.+)$/m)
  const title = titleMatch ? titleMatch[1].trim() : 'Untitled'

  // Extract first paragraph after the title as description
  const lines = source.split('\n')
  let description = ''
  let pastTitle = false
  for (const line of lines) {
    if (line.startsWith('# ')) { pastTitle = true; continue }
    if (pastTitle && line.trim() === '') continue
    if (pastTitle && line.trim()) {
      description = line.trim()
      break
    }
  }

  // Try to guess category from content
  let category = 'General'
  const lowerSource = source.toLowerCase()
  if (lowerSource.includes('topology') || lowerSource.includes('optimization')) category = 'Optimization'
  else if (lowerSource.includes('animation') || lowerSource.includes('visualization')) category = 'Visualization'
  else if (lowerSource.includes('resonator') || lowerSource.includes('simulation')) category = 'Simulation'

  return { title, description, category, tags: [] }
}

function extractToc(cells: RawCell[]): { id: string; text: string; level: number }[] {
  const toc: { id: string; text: string; level: number }[] = []

  for (const cell of cells) {
    if (cell.cell_type !== 'markdown') continue
    const source = cell.source.join('')
    const headingRegex = /^(#{1,4})\s+(.+)$/gm
    let match
    while ((match = headingRegex.exec(source)) !== null) {
      const level = match[1].length
      const text = match[2].trim()
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
      toc.push({ id, text, level })
    }
  }

  return toc
}

function classifyOutput(output: RawOutput): { type: string; content: string; mimeType?: string } | null {
  if (output.output_type === 'error') {
    const traceback = (output.traceback || []).join('\n')
    return { type: 'error', content: traceback }
  }

  if (output.output_type === 'stream') {
    const text = (output.text || []).join('')
    if (!text.trim()) return null
    return { type: 'text', content: text }
  }

  const data = output.data
  if (!data) return null

  // Check for images first (highest priority)
  for (const mime of ['image/png', 'image/jpeg', 'image/gif', 'image/svg+xml']) {
    if (data[mime]) {
      const content = Array.isArray(data[mime]) ? data[mime].join('') : data[mime]
      if (mime === 'image/svg+xml') {
        return { type: 'html', content: content as string, mimeType: mime }
      }
      return { type: 'image', content: content as string, mimeType: mime }
    }
  }

  // HTML output
  if (data['text/html']) {
    const html = Array.isArray(data['text/html']) ? data['text/html'].join('') : data['text/html']
    return { type: 'html', content: html as string, mimeType: 'text/html' }
  }

  // Plain text
  if (data['text/plain']) {
    const text = Array.isArray(data['text/plain']) ? data['text/plain'].join('') : data['text/plain']
    // Skip trivial output like "<IPython.core.display.HTML object>"
    if ((text as string).includes('IPython.core.display')) return null
    return { type: 'text', content: text as string }
  }

  // Widget placeholder
  if (data['application/vnd.jupyter.widget-view+json']) {
    return { type: 'widget', content: 'Interactive widget (not available in static view)' }
  }

  return null
}

async function main() {
  console.log('Building notebook data...')

  // Clean generated files
  if (fs.existsSync(DATA_DIR)) {
    for (const f of fs.readdirSync(DATA_DIR)) {
      if (f.endsWith('.gen.ts')) fs.unlinkSync(path.join(DATA_DIR, f))
    }
  }
  fs.mkdirSync(DATA_DIR, { recursive: true })
  fs.mkdirSync(PUBLIC_NB_DIR, { recursive: true })

  const highlighter = await createHighlighter({
    themes: ['github-light'],
    langs: ['python'],
  })

  const nbFiles = fs.readdirSync(NOTEBOOKS_DIR).filter(f => f.endsWith('.ipynb'))
  console.log(`Found ${nbFiles.length} notebooks: ${nbFiles.join(', ')}`)

  const allMeta: { slug: string; title: string; description: string; category: string; tags: string[]; date: string }[] = []

  for (const file of nbFiles) {
    const filePath = path.join(NOTEBOOKS_DIR, file)
    const raw: RawNotebook = JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    const slug = slugify(file)

    // Get file modification date
    const stat = fs.statSync(filePath)
    const date = stat.mtime.toISOString().split('T')[0]

    const { title, description, category, tags } = extractMetadata(raw.cells)

    // Process cells
    const cells: unknown[] = []
    for (const cell of raw.cells) {
      if (cell.cell_type === 'raw') continue

      const source = cell.source.join('')

      if (cell.cell_type === 'markdown') {
        cells.push({
          cellType: 'markdown',
          source,
          outputs: [],
        })
        continue
      }

      // Code cell
      if (!source.trim()) continue // skip empty code cells

      let highlightedHtml = ''
      try {
        highlightedHtml = highlighter.codeToHtml(source, {
          lang: 'python',
          theme: 'github-light',
        })
      } catch {
        highlightedHtml = `<pre><code>${source.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
      }

      const outputs: unknown[] = []
      for (const output of cell.outputs || []) {
        const classified = classifyOutput(output)
        if (classified) outputs.push(classified)
      }

      cells.push({
        cellType: 'code',
        source,
        highlightedHtml,
        outputs,
        executionCount: cell.execution_count,
      })
    }

    const toc = extractToc(raw.cells)

    // Write per-notebook data file
    const nbData = { slug, title, description, category, tags, date, cells, toc }
    const nbModule = `// AUTO-GENERATED — do not edit\nimport type { ParsedNotebook } from '@/types/notebook'\n\nconst data: ParsedNotebook = ${JSON.stringify(nbData, null, 2)}\n\nexport default data\n`
    fs.writeFileSync(path.join(DATA_DIR, `nb-${slug}.gen.ts`), nbModule)

    // Copy .ipynb to public
    fs.copyFileSync(filePath, path.join(PUBLIC_NB_DIR, file))

    allMeta.push({ slug, title, description, category, tags, date })
    console.log(`  ✓ ${file} → ${slug} (${cells.length} cells, ${toc.length} TOC entries)`)
  }

  // Write metadata registry
  const metaModule = `// AUTO-GENERATED — do not edit\nimport type { NotebookMeta } from '@/types/notebook'\n\nexport const notebooks: NotebookMeta[] = ${JSON.stringify(allMeta, null, 2)}\n`
  fs.writeFileSync(path.join(DATA_DIR, 'notebooks.gen.ts'), metaModule)

  highlighter.dispose()
  console.log(`Done! Generated data for ${allMeta.length} notebooks.`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})

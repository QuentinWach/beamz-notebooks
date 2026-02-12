export interface TocEntry {
  id: string
  text: string
  level: number
}

export type OutputType = 'image' | 'text' | 'html' | 'error' | 'widget'

export interface ParsedOutput {
  type: OutputType
  content: string
  mimeType?: string
}

export interface ParsedCell {
  cellType: 'markdown' | 'code'
  source: string
  highlightedHtml?: string
  outputs: ParsedOutput[]
  executionCount?: number | null
}

export interface ParsedNotebook {
  slug: string
  title: string
  description: string
  tags: string[]
  author: string
  publishedDate: string
  updatedDate: string
  beamzVersion?: string
  previewImage?: string
  cells: ParsedCell[]
  toc: TocEntry[]
}

export interface NotebookMeta {
  slug: string
  title: string
  description: string
  tags: string[]
  author: string
  publishedDate: string
  updatedDate: string
  beamzVersion?: string
  previewImage?: string
}

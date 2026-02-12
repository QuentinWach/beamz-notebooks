import { useEffect, useState } from 'react'
import type { TocEntry } from '@/types/notebook'

export function TableOfContents({ entries }: { entries: TocEntry[] }) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (observerEntries) => {
        for (const entry of observerEntries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        }
      },
      { rootMargin: '-80px 0px -80% 0px' }
    )

    for (const tocEntry of entries) {
      const el = document.getElementById(tocEntry.id)
      if (el) observer.observe(el)
    }

    return () => observer.disconnect()
  }, [entries])

  if (!entries.length) return null

  return (
    <nav className="hidden xl:block w-56 shrink-0">
      <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto">
        <h4 className="text-sm font-semibold mb-3 text-foreground">On this page</h4>
        <ul className="space-y-1 text-sm">
          {entries.map((entry) => (
            <li key={entry.id} style={{ paddingLeft: `${(entry.level - 1) * 0.75}rem` }}>
              <a
                href={`#${entry.id}`}
                className={`block py-0.5 transition-colors hover:text-foreground ${
                  activeId === entry.id
                    ? 'text-foreground font-medium'
                    : 'text-muted-foreground'
                }`}
              >
                {entry.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

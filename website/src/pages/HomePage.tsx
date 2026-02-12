import { notebooks } from '@/data/notebooks.gen'
import { GalleryCard } from '@/components/gallery/GalleryCard'

export function HomePage() {
  // Group by category
  const categories = new Map<string, typeof notebooks>()
  for (const nb of notebooks) {
    const list = categories.get(nb.category) || []
    list.push(nb)
    categories.set(nb.category, list)
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-2">BEAMZ Examples</h1>
        <p className="text-muted-foreground text-lg">
          Interactive notebooks demonstrating photonic simulation workflows.
        </p>
      </div>

      {Array.from(categories.entries()).map(([category, nbs]) => (
        <section key={category} className="mb-10">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {nbs.map((nb) => (
              <GalleryCard key={nb.slug} notebook={nb} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}

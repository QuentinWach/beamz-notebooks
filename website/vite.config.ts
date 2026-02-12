import { defineConfig, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'
import { execSync } from 'child_process'

function notebookHotReload(): Plugin {
  return {
    name: 'notebook-hot-reload',
    configureServer(server) {
      const nbDir = path.resolve(__dirname, '../notebooks')
      server.watcher.add(nbDir)

      let debounce: ReturnType<typeof setTimeout> | null = null
      server.watcher.on('all', (event, filePath) => {
        if (!filePath.endsWith('.ipynb')) return
        if (!['change', 'add', 'unlink'].includes(event)) return
        if (debounce) clearTimeout(debounce)
        debounce = setTimeout(() => {
          console.log(`\n[notebooks] ${event}: ${path.basename(filePath)} — rebuilding...`)
          try {
            execSync('npx tsx scripts/build-notebooks.ts', { cwd: __dirname, stdio: 'inherit' })
          } catch {
            console.error('[notebooks] Build failed')
          }
        }, 300)
      })
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), notebookHotReload()],
  base: '/beamz-notebooks/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})

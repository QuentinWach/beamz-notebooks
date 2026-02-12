import { useCallback, useSyncExternalStore } from 'react'

type Theme = 'light' | 'dark'

function getTheme(): Theme {
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
}

let listeners: (() => void)[] = []

function subscribe(listener: () => void) {
  listeners.push(listener)
  return () => {
    listeners = listeners.filter(l => l !== listener)
  }
}

function emitChange() {
  for (const listener of listeners) listener()
}

export function useTheme() {
  const theme = useSyncExternalStore(subscribe, getTheme)

  const toggleTheme = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark'
    document.documentElement.classList.toggle('dark', next === 'dark')
    localStorage.setItem('theme', next)
    emitChange()
  }, [theme])

  return { theme, toggleTheme }
}

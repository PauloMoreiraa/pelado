import { CircleUserRound } from 'lucide-react'

export function Header() {
  return (
    <header className="border-b border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2">
          <span className="text-2xl">⚽</span>

          <span className="text-xl font-bold tracking-tight">
            Peladô
          </span>
        </div>

        <button
          type="button"
          aria-label="Perfil"
          className="rounded-full p-2 text-[var(--color-text-secondary)] transition hover:bg-[var(--color-surface-secondary)]"
        >
          <CircleUserRound size={22} />
        </button>
      </div>
    </header>
  )
}
import {
  Trophy,
  UsersRound,
  Lock,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function Home() {
  const navigate = useNavigate()

  return (
    <main className="px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        {/* Hero */}
        <section className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--color-primary)]">
            Peladô
          </p>

          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Organize sua pelada
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-[var(--color-text-muted)] sm:text-lg">
            Cadastre os jogadores, equilibre os times e
            deixe o sorteio por conta do Peladô.
          </p>
        </section>

        {/* Opções */}
        <section className="mt-10 grid gap-5 sm:grid-cols-2">
          {/* Sortear times */}
          <button
            type="button"
            onClick={() => navigate('/jogadores')}
            className="group rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-left shadow-sm transition hover:-translate-y-1 hover:border-[var(--color-primary)] hover:shadow-md"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <UsersRound size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Sortear times
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Cadastre os jogadores, escolha o tamanho
              dos times e sorteie equipes equilibradas.
            </p>

            <span className="mt-5 inline-flex font-bold text-[var(--color-primary)]">
              Começar →
            </span>
          </button>

          {/* Criar competição */}
          <button
            type="button"
            disabled
            className="relative cursor-not-allowed rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 text-left opacity-60"
          >
            <div className="absolute right-5 top-5 flex items-center gap-1.5 rounded-full bg-[var(--color-background)] px-3 py-1.5 text-xs font-bold text-[var(--color-text-muted)]">
              <Lock size={13} />
              Em breve
            </div>

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Trophy size={28} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Criar competição
            </h2>

            <p className="mt-2 text-sm leading-relaxed text-[var(--color-text-muted)]">
              Organize uma liga, mata-mata ou torneio
              completo entre os times.
            </p>

            <span className="mt-5 inline-flex font-bold text-[var(--color-text-muted)]">
              Em breve
            </span>
          </button>
        </section>

        {/* Informativo */}
        <section className="mt-8 rounded-2xl bg-[var(--color-primary-soft)] p-5 text-center">
          <p className="text-sm font-medium text-[var(--color-text-secondary)]">
            ⚽ Primeiro organize os times. Em breve você
            também poderá organizar toda a competição.
          </p>
        </section>
      </div>
    </main>
  )
}
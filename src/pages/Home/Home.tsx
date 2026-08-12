import { Trophy, Users } from 'lucide-react'
import { Button } from '../../components/common/Button'

export function Home() {
  return (
    <section className="px-4 py-10 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-4xl">
        <div className="max-w-2xl">
          <span className="inline-flex rounded-full bg-[var(--color-primary-soft)] px-3 py-1 text-sm font-semibold text-[var(--color-primary)]">
            ⚽ Organizador de peladas
          </span>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-[var(--color-text)] sm:text-5xl">
            Organize sua pelada sem complicação.
          </h1>

          <p className="mt-4 text-lg leading-7 text-[var(--color-text-secondary)]">
            Divida os times, organize partidas e crie competições
            completas com seus amigos.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Users size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Dividir Times
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Cadastre os jogadores, informe os níveis e deixe o
              Peladô montar equipes equilibradas.
            </p>

            <Button className="mt-6 w-full">
              Dividir Times
            </Button>
          </div>

          <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--color-primary-soft)] text-[var(--color-primary)]">
              <Trophy size={24} />
            </div>

            <h2 className="mt-5 text-xl font-bold">
              Criar Competição
            </h2>

            <p className="mt-2 text-sm leading-6 text-[var(--color-text-secondary)]">
              Organize uma Liga, Mata-Mata ou Torneio com seus
              amigos.
            </p>

            <Button variant="secondary" className="mt-6 w-full">
              Criar Competição
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}